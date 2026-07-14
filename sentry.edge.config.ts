import * as Sentry from "@sentry/nextjs";

// Runtime edge (middleware, rutas edge). Inerte sin DSN.
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  enabled: !!process.env.SENTRY_DSN,
  tracesSampleRate: 0.1,
  sendDefaultPii: false,
});
