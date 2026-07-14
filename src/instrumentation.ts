import * as Sentry from "@sentry/nextjs";

// Carga la config de Sentry según el runtime. Next llama a register() una vez
// al arrancar cada instancia del servidor.
export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    await import("../sentry.server.config");
  }
  if (process.env.NEXT_RUNTIME === "edge") {
    await import("../sentry.edge.config");
  }
}

// Captura errores de peticiones del servidor (Server Components, route handlers).
export const onRequestError = Sentry.captureRequestError;
