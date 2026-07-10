import { NextRequest } from "next/server";
import { timingSafeEqual } from "crypto";

/**
 * Comparación de strings en tiempo constante (evita timing attacks sobre el
 * secreto). Devuelve false si las longitudes difieren, sin filtrar por timing.
 */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/**
 * Autoriza las llamadas a endpoints de bots y cron.
 *
 * FAIL-CLOSED: si no hay ningún secreto configurado en el entorno, deniega
 * siempre. Nunca hay un secreto por defecto — un deploy que olvide la variable
 * deja los bots inoperativos (visible), no abiertos al público (silencioso).
 *
 * Acepta dos vías:
 *  - Header `x-bot-secret: <BOT_SECRET>`         → disparo manual/operador
 *  - Header `Authorization: Bearer <CRON_SECRET>` → cron de Vercel (lo añade solo)
 */
export function isBotAuthorized(req: NextRequest): boolean {
  const botSecret = process.env.BOT_SECRET;
  const cronSecret = process.env.CRON_SECRET;

  // Sin secretos configurados no se autoriza a nadie.
  if (!botSecret && !cronSecret) return false;

  if (botSecret) {
    const provided = req.headers.get("x-bot-secret");
    if (provided && safeEqual(provided, botSecret)) return true;
  }

  if (cronSecret) {
    const authHeader = req.headers.get("authorization");
    if (authHeader && safeEqual(authHeader, `Bearer ${cronSecret}`)) return true;
  }

  return false;
}
