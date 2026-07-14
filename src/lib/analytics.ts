import posthog from "posthog-js";

/**
 * Eventos de producto (embudo de crecimiento). Nombres estables — no los
 * cambies sin migrar los insights de PostHog. Solo cliente.
 */
export type AnalyticsEvent =
  | "signup_completed"
  | "login"
  | "post_voted"
  | "comment_created"
  | "post_published"
  | "keyword_alert_created"
  | "share_clicked";

export function track(event: AnalyticsEvent, props?: Record<string, unknown>): void {
  try {
    posthog.capture(event, props);
  } catch {
    // PostHog no inicializado (sin key) — no-op
  }
}

/** Asocia los eventos a un usuario concreto tras login/registro. */
export function identify(userId: string, props?: Record<string, unknown>): void {
  try {
    posthog.identify(userId, props);
  } catch {
    // no-op
  }
}

/** Limpia la identidad al cerrar sesión. */
export function resetAnalytics(): void {
  try {
    posthog.reset();
  } catch {
    // no-op
  }
}
