"use client";

import { Suspense, useEffect } from "react";
import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { usePathname, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";

// build: rebuild para incrustar envs NEXT_PUBLIC (PostHog/Sentry) — 2026-07
const KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;

// Captura manual de pageviews en el App Router (no hay recarga entre rutas).
function PostHogPageview() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!KEY) return;
    let url = window.origin + pathname;
    const qs = searchParams.toString();
    if (qs) url += `?${qs}`;
    posthog.capture("$pageview", { $current_url: url });
  }, [pathname, searchParams]);

  return null;
}

// Asocia los eventos al usuario logueado.
function PostHogIdentify() {
  const { data: session } = useSession();
  useEffect(() => {
    if (!KEY) return;
    const id = session?.user?.id;
    if (id) {
      posthog.identify(id, { name: session?.user?.name ?? undefined });
    }
  }, [session?.user?.id, session?.user?.name]);
  return null;
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  // PostHog se inicializa en instrumentation-client.ts (Next.js 15.3+).
  // Este componente solo provee el contexto React y rastrea pageviews e identidad.
  if (!KEY) return <>{children}</>;

  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageview />
      </Suspense>
      <PostHogIdentify />
      {children}
    </PHProvider>
  );
}
