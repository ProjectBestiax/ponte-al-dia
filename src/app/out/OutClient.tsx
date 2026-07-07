"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ExternalLink } from "lucide-react";

const COUNTDOWN_SECONDS = 5;
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID ?? "";

export function OutClient({ url, host, favicon }: { url: string; host: string; favicon: string }) {
  const [seconds, setSeconds] = useState(COUNTDOWN_SECONDS);

  useEffect(() => {
    if (seconds <= 0) {
      window.location.href = url;
      return;
    }
    const t = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [seconds, url]);

  useEffect(() => {
    if (!ADSENSE_ID) return;
    try {
      // @ts-expect-error adsbygoogle global
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch {
      // AdSense not loaded
    }
  }, []);

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4">
      <div className="w-full max-w-md text-center">
        {/* Tool info */}
        <div className="mb-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={favicon}
            alt={host}
            width={48}
            height={48}
            className="mx-auto rounded-xl mb-4"
          />
          <h1
            className="text-lg font-bold text-zinc-900 mb-1"
            style={{ fontFamily: "var(--font-manrope)" }}
          >
            Redirigiendo a {host}
          </h1>
          <p className="text-sm text-zinc-500">
            Serás redirigido en {seconds} segundo{seconds !== 1 ? "s" : ""}...
          </p>
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden mb-8">
          <div
            className="h-full bg-accent-400 rounded-full transition-all duration-1000 ease-linear"
            style={{ width: `${((COUNTDOWN_SECONDS - seconds) / COUNTDOWN_SECONDS) * 100}%` }}
          />
        </div>

        {/* AdSense slot — renders when approved */}
        {ADSENSE_ID && (
          <div className="mb-8">
            <ins
              className="adsbygoogle"
              style={{ display: "block" }}
              data-ad-client={ADSENSE_ID}
              data-ad-slot="auto"
              data-ad-format="rectangle"
              data-full-width-responsive="true"
            />
          </div>
        )}

        {/* Skip + go back */}
        <div className="flex items-center justify-center gap-4">
          <a
            href={url}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full bg-accent-400 text-accent-950 font-bold text-sm hover:bg-accent-500 transition-colors"
          >
            <ExternalLink className="w-4 h-4" />
            Ir ahora
          </a>
          <Link
            href="/"
            className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
          >
            Volver al inicio
          </Link>
        </div>

        <p className="mt-10 text-xs text-zinc-400">
          Ponte al dIA no es responsable del contenido externo.
        </p>
      </div>
    </div>
  );
}
