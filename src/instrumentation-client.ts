import * as Sentry from "@sentry/nextjs";
import posthog from "posthog-js";

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

// Inicialización de PostHog en el navegador (instrumentation-client es el
// enfoque correcto para Next.js 15.3+; no combinar con posthog.init en Provider).
if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: "/ingest",
    ui_host: "https://eu.posthog.com",
    defaults: "2026-01-30",
    capture_exceptions: true,
    capture_pageview: false,  // pageviews manuales via PostHogPageview
    capture_pageleave: true,
    person_profiles: "identified_only",
    debug: process.env.NODE_ENV === "development",
  });
}
