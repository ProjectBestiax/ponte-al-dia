"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

export function GuideCta({ profession, variant }: { profession: string; variant: "light" | "dark" }) {
  if (variant === "light") {
    return (
      <div className="rounded-2xl bg-zinc-50 border border-accent-200 p-6 text-center">
        <p className="text-zinc-700 mb-4">
          ¿Listo para probar? Únete a la comunidad donde {profession.toLowerCase()} comparten
          prompts, workflows y se ayudan entre sí.
        </p>
        <Link
          href="/registro"
          onClick={() => track("guide_cta_clicked", { profession, variant })}
          className="inline-block px-5 py-2.5 bg-accent-500 text-white text-sm font-semibold rounded-lg hover:bg-accent-600 transition-colors"
        >
          Crear cuenta gratis
        </Link>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-zinc-950 p-8 text-center">
      <h2 className="text-xl font-bold text-white" style={{ fontFamily: "var(--font-manrope)" }}>
        Ya sabes cómo va. Únete a la comunidad
      </h2>
      <p className="mt-2 text-zinc-300">
        Intercambia prompts, debate estrategias y aprende de otros profesionales de tu sector.
      </p>
      <Link
        href="/registro"
        onClick={() => track("guide_cta_clicked", { profession, variant })}
        className="mt-5 inline-block px-6 py-3 bg-white text-zinc-950 text-sm font-bold rounded-lg hover:bg-zinc-100 transition-colors"
      >
        Registrarme gratis
      </Link>
    </div>
  );
}
