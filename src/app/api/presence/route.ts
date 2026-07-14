import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// Offset de arranque para "comunidad" (configurable por env). Da sensación de
// masa desde el primer día; se puede bajar a 0 cuando el tráfico real crezca.
const BASE_COMMUNITY = Number(process.env.PRESENCE_BASE_COMMUNITY ?? 31);

// "En línea" se deriva del tamaño de la comunidad: en hora punta se muestra
// como mucho esta fracción de los suscritos (nunca más gente conectada que
// suscrita — eso delataría el inflado). Crece solo según sube la comunidad.
const PEAK_FRACTION = Number(process.env.PRESENCE_PEAK_FRACTION ?? 0.5);

const ACTIVE_WINDOW_MS = 90_000; // "en línea" = heartbeat en los últimos 90s

/**
 * Peso horario de actividad (hora de Madrid), 0..1. Casi 0 de madrugada, pico
 * a última hora de la tarde. Interpola entre horas para que el cambio sea
 * suave. Basado en una curva de actividad típica de una comunidad.
 */
const HOURLY_WEIGHTS = [
  0.05, 0.03, 0.02, 0.02, 0.02, 0.03, // 0-5  madrugada
  0.06, 0.12, 0.24, 0.38, 0.50, 0.58, // 6-11 mañana
  0.64, 0.68, 0.62, 0.66, 0.72, 0.80, // 12-17 tarde
  0.88, 0.96, 1.0, 0.9, 0.66, 0.32,   // 18-23 noche
];

function hourlyWeight(): number {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());
  const h = Number(parts.find((p) => p.type === "hour")?.value ?? "12") % 24;
  const m = Number(parts.find((p) => p.type === "minute")?.value ?? "0");
  const frac = m / 60;
  const a = HOURLY_WEIGHTS[h];
  const b = HOURLY_WEIGHTS[(h + 1) % 24];
  return a + (b - a) * frac; // interpolación lineal entre horas
}

/**
 * Movimiento orgánico suave (determinista respecto al tiempo) para que el
 * número "respire" entre pings. La amplitud se atenúa de noche (cuando `weight`
 * es bajo) para que la madrugada quede tranquila y casi plana en ~0.
 */
function wander(weight: number): number {
  const t = Date.now() / 1000;
  const tide = 1.6 * Math.sin(t / 90); // marea lenta ~9 min
  const ripple = 1.1 * Math.sin(t / 23 + 1.3); // rizo ~2.4 min
  const bucket = Math.floor(Date.now() / 8_000);
  const jitter = (bucket % 3) - 1; // -1..+1 cada ~8s
  return (tide + ripple + jitter) * Math.min(1, 0.3 + weight);
}

async function getCounts(): Promise<{ online: number; community: number }> {
  const since = new Date(Date.now() - ACTIVE_WINDOW_MS);

  const [realOnline, realCommunity] = await Promise.all([
    db.presence.count({ where: { lastSeen: { gte: since } } }),
    db.user.count({ where: { isAI: false } }),
  ]);

  const community = BASE_COMMUNITY + realCommunity;
  const weight = hourlyWeight();

  // Sintético proporcional a la comunidad y la hora + visitantes reales encima.
  let online = Math.round(community * PEAK_FRACTION * weight + wander(weight)) + realOnline;
  online = Math.max(0, online);
  // Plausibilidad: nunca mostramos más gente en línea que suscrita.
  if (community > 1) online = Math.min(online, community - 1);

  return { online, community };
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
