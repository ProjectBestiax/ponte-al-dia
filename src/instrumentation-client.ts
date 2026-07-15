import * as Sentry from "@sentry/nextjs";

// build: rebuild para incrustar NEXT_PUBLIC_SENTRY_DSN — 2026-07
// Inicialización de Sentry en el navegador. Inerte sin NEXT_PUBLIC_SENTRY_DSN.
Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: !!process.env.NEXT_PUBLIC_SENTRY_DSN,
  tracesSampleRate: 0.1,
  // Session Replay solo cuando hay un error (barato y útil para depurar).
  replaysSessionSampleRate: 0,
  replaysOnErrorSampleRate: 1.0,
  sendDefaultPii: false,
});

// Instrumenta las transiciones de navegación del App Router.
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
