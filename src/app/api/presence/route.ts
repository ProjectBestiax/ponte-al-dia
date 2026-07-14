import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// Offsets de arranque (configurables por env). Damos sensación de comunidad
// viva desde el primer día; se pueden bajar a 0 cuando el tráfico real crezca.
const BASE_ONLINE = Number(process.env.PRESENCE_BASE_ONLINE ?? 38);
const BASE_COMMUNITY = Number(process.env.PRESENCE_BASE_COMMUNITY ?? 31);

const ACTIVE_WINDOW_MS = 90_000; // "en línea" = heartbeat en los últimos 90s

/**
 * Curva horaria (hora de Madrid): más gente de día, menos de madrugada.
 * Devuelve un extra 0..16 sobre la base para que el número respire de forma
 * creíble a lo largo del día en vez de ser plano.
 */
function dailyWave(): number {
  const hourStr = new Intl.DateTimeFormat("en-US", {
    timeZone: "Europe/Madrid",
    hour: "numeric",
    hour12: false,
  }).format(new Date());
  const h = Number(hourStr) % 24;
  // Fase 0 a las 04:00 (valle) → pico ~16:00.
  const phase = (h - 4 + 24) % 24;
  const wave = Math.sin((phase / 24) * Math.PI); // 0 en el valle, ~1 en el pico
  return Math.round(Math.max(0, wave) * 16);
}

/**
 * Movimiento orgánico del contador "en línea". Combina dos ondas sinusoidales
 * de periodos distintos (una marea lenta ~9 min + un rizo más rápido ~2.5 min)
 * más un jitter fino. Es determinista respecto al tiempo, así que se mueve de
 * forma suave y creíble entre pings (nada de saltos bruscos), pero lo bastante
 * como para que el número se sienta vivo aunque aún haya poco tráfico real.
 */
function liveWander(): number {
  const t = Date.now() / 1000; // segundos
  const tide = 6.5 * Math.sin(t / 90); // marea lenta, periodo ~9.4 min
  const ripple = 4 * Math.sin(t / 23 + 1.3); // rizo, periodo ~2.4 min
  const bucket = Math.floor(Date.now() / 8_000);
  const jitter = (bucket % 5) - 2; // -2..+2, cambia cada ~8s
  return tide + ripple + jitter; // ~ -12.5 .. +12.5
}

async function getCounts(): Promise<{ online: number; community: number }> {
  const since = new Date(Date.now() - ACTIVE_WINDOW_MS);

  const [realOnline, realCommunity] = await Promise.all([
    db.presence.count({ where: { lastSeen: { gte: since } } }),
    db.user.count({ where: { isAI: false } }),
  ]);

  const online = Math.max(
    BASE_ONLINE - 12,
    Math.round(BASE_ONLINE + dailyWave() + liveWander()) + realOnline
  );

  return { online, community: BASE_COMMUNITY + realCommunity };
}

export async function POST(req: NextRequest) {
  let clientId: string | undefined;
  try {
    const body = await req.json();
    clientId = typeof body?.clientId === "string" ? body.clientId.slice(0, 64) : undefined;
  } catch {
    // sin body válido: seguimos, solo devolvemos conteos
  }

  if (clientId) {
    try {
      await db.presence.upsert({
        where: { id: clientId },
        create: { id: clientId },
        update: { lastSeen: new Date() },
      });
    } catch {
      // no romper el widget por un fallo de escritura
    }
  }

  // Limpieza oportunista de filas viejas (evita que la tabla crezca sin fin).
  if (Math.random() < 0.1) {
    db.presence
      .deleteMany({ where: { lastSeen: { lt: new Date(Date.now() - 10 * 60_000) } } })
      .catch(() => {});
  }

  const counts = await getCounts();
  return NextResponse.json(counts);
}

// GET para lecturas sin heartbeat (p.ej. render inicial si se quisiera).
export async function GET() {
  const counts = await getCounts();
  return NextResponse.json(counts);
}
