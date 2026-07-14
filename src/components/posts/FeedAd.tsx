"use client";

import { useEffect, useRef } from "react";

// El anuncio in-feed solo se renderiza cuando existe una unidad manual creada
// en AdSense (su slot id va en NEXT_PUBLIC_ADSENSE_FEED_SLOT). Mientras no esté,
// no se pinta nada — así el feed queda limpio y sin huecos hasta la aprobación.
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID ?? "";
const FEED_SLOT = process.env.NEXT_PUBLIC_ADSENSE_FEED_SLOT ?? "";

export function FeedAd() {
  const pushed = useRef(false);

  useEffect(() => {
    if (!ADSENSE_ID || !FEED_SLOT || pushed.current) return;
    try {
      // @ts-expect-error adsbygoogle global
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // el script de AdSense aún no ha cargado
    }
  }, []);

  if (!ADSENSE_ID || !FEED_SLOT) return null;

  return (
    <div className="rounded-2xl border border-zinc-100 bg-zinc-50/40 overflow-hidden">
      <div
        className="px-3.5 pt-2 pb-1 text-[10px] font-medium uppercase tracking-wider text-zinc-300"
        style={{ fontFamily: "var(--font-jetbrains-mono)" }}
      >
        Publicidad
      </div>
      {/* Altura reservada para evitar salto de layout (CLS) al rellenarse. */}
      <div className="px-3.5 pb-3.5" style={{ minHeight: 100 }}>
        <ins
          className="adsbygoogle"
          style={{ display: "block" }}
          data-ad-client={ADSENSE_ID}
          data-ad-slot={FEED_SLOT}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
