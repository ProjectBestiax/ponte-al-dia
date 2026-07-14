import * as Sentry from "@sentry/nextjs";

// Inerte si no hay DSN configurado (no envía nada). Se activa poniendo SENTRY_DSN.
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: !!process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  // No mandar PII por defecto (emails, IPs). Cumplimiento y privacidad.
  sendDefaultPii: false,
});
