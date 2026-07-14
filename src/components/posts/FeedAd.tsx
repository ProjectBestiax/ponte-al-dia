"use client";

import { useEffect, useRef, useState } from "react";

// El anuncio in-feed solo se renderiza cuando existe una unidad manual creada
// en AdSense (su slot id va en NEXT_PUBLIC_ADSENSE_FEED_SLOT). Mientras no esté,
// no se pinta nada — así el feed queda limpio y sin huecos hasta la aprobación.
const ADSENSE_ID = process.env.NEXT_PUBLIC_ADSENSE_ID ?? "";
const FEED_SLOT = process.env.NEXT_PUBLIC_ADSENSE_FEED_SLOT ?? "";

export function FeedAd() {
  const insRef = useRef<HTMLModElement>(null);
  const pushed = useRef(false);
  // Arrancamos oculto y solo mostramos la caja si Google confirma que la
  // rellenó (data-ad-status="filled"). Así nunca se ven huecos vacíos con la
  // etiqueta "Publicidad" (ni antes de la aprobación, ni en impresiones sin ad).
  const [filled, setFilled] = useState(false);

  useEffect(() => {
    if (!ADSENSE_ID || !FEED_SLOT || pushed.current) return;
    const ins = insRef.current;
    if (!ins) return;

    try {
      // @ts-expect-error adsbygoogle global
      (window.adsbygoogle = window.adsbygoogle || []).push({});
      pushed.current = true;
    } catch {
      // el script de AdSense aún no ha cargado
    }

    // AdSense marca el <ins> con data-ad-status="filled"|"unfilled" al resolver.
    const observer = new MutationObserver(() => {
      const status = ins.getAttribute("data-ad-status");
      if (status === "filled") setFilled(true);
      else if (status === "unfilled") setFilled(false);
    });
    observer.observe(ins, { attributes: true, attributeFilter: ["data-ad-status"] });
    return () => observer.disconnect();
  }, []);

  if (!ADSENSE_ID || !FEED_SLOT) return null;

  // El <ins> SIEMPRE se monta con ancho real (para que AdSense pueda medir y
  // rellenar). El marco visual (borde + etiqueta) solo se muestra cuando hay
  // anuncio; si no se rellena, el <ins> colapsa a 0 y no se ve nada.
  return (
    <div className={filled ? "rounded-2xl border border-zinc-100 bg-zinc-50/40 overflow-hidden" : ""}>
      {filled && (
        <div
          className="px-3.5 pt-2 pb-1 text-[10px] font-medium uppercase tracking-wider text-zinc-300"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          Publicidad
        </div>
      )}
      <div className={filled ? "px-3.5 pb-3.5" : ""}>
        <ins
          ref={insRef}
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
