import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

/**
 * Rate limiting para proteger endpoints sensibles (login, registro, comentarios,
 * votos) de fuerza bruta y spam.
 *
 * - Con Upstash Redis configurado (UPSTASH_REDIS_REST_URL + _TOKEN) usa una
 *   ventana deslizante compartida entre todas las instancias serverless.
 * - Sin él (p. ej. en dev) cae a un contador en memoria: no es compartido entre
 *   instancias, pero no rompe nada y sirve para desarrollo.
 */

const url = process.env.UPSTASH_REDIS_REST_URL;
const token = process.env.UPSTASH_REDIS_REST_TOKEN;
const redis = url && token ? new Redis({ url, token }) : null;

export type LimitName = "login" | "register" | "comment" | "vote";

type Window = `${number} ${"s" | "m" | "h"}`;

const CONFIG: Record<LimitName, { limit: number; window: Window }> = {
  login: { limit: 8, window: "1 m" }, // 8 intentos/min por IP
  register: { limit: 5, window: "1 h" }, // 5 registros/hora por IP
  comment: { limit: 12, window: "1 m" }, // 12 comentarios/min por usuario
  vote: { limit: 40, window: "1 m" }, // 40 votos/min por usuario
};

// --- Upstash (producción) ---
const limiters = new Map<LimitName, Ratelimit>();
function upstashLimiter(name: LimitName): Ratelimit {
  let l = limiters.get(name);
  if (!l) {
    const c = CONFIG[name];
    l = new Ratelimit({
      redis: redis!,
      limiter: Ratelimit.slidingWindow(c.limit, c.window),
      prefix: `rl:${name}`,
      analytics: false,
    });
    limiters.set(name, l);
  }
  return l;
}

// --- Fallback en memoria (dev) ---
const mem = new Map<string, { count: number; reset: number }>();

function windowMs(w: Window): number {
  const [n, unit] = w.split(" ");
  const mult = unit === "s" ? 1000 : unit === "m" ? 60_000 : 3_600_000;
  return Number(n) * mult;
}

function memoryLimit(name: LimitName, id: string): { ok: boolean; retryAfter: number } {
  const c = CONFIG[name];
  const key = `${name}:${id}`;
  const now = Date.now();
  const entry = mem.get(key);
  if (!entry || now > entry.reset) {
    mem.set(key, { count: 1, reset: now + windowMs(c.window) });
    return { ok: true, retryAfter: 0 };
  }
  entry.count++;
  if (entry.count > c.limit) {
    return { ok: false, retryAfter: Math.ceil((entry.reset - now) / 1000) };
  }
  return { ok: true, retryAfter: 0 };
}

/**
 * Comprueba (y consume) una unidad del límite `name` para el identificador `id`
 * (una IP o un userId). Devuelve `ok:false` con `retryAfter` (segundos) si se
 * ha superado. Fail-open ante errores de red (no bloquea a usuarios legítimos
 * si Redis falla puntualmente).
 */
export async function checkRateLimit(
  name: LimitName,
  id: string
): Promise<{ ok: boolean; retryAfter: number }> {
  try {
    if (redis) {
      const res = await upstashLimiter(name).limit(id);
      return {
        ok: res.success,
        retryAfter: res.success ? 0 : Math.max(1, Math.ceil((res.reset - Date.now()) / 1000)),
      };
    }
    return memoryLimit(name, id);
  } catch {
    // Si el almacén falla, no bloqueamos (fail-open) para no tirar el sitio.
    return { ok: true, retryAfter: 0 };
  }
}

/** Extrae la IP del cliente de una Request/NextRequest detrás del proxy de Vercel. */
export function getClientIp(req: { headers: Headers }): string {
  const xff = req.headers.get("x-forwarded-for");
  if (xff) return xff.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}
