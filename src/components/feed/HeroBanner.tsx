"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { Sparkles, Users, Bell } from "lucide-react";

export function HeroBanner() {
  const { data: session, status } = useSession();

  if (status === "loading" || session) return null;

  return (
    <section className="mb-4 rounded-2xl border border-zinc-200 bg-zinc-50 px-5 py-6 sm:px-7 sm:py-8">
      <h1
        className="text-xl sm:text-2xl font-extrabold text-zinc-900 leading-snug"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        Tu filtro diario de IA. En español.
      </h1>
      <p className="mt-2 text-sm sm:text-[15px] text-zinc-600 leading-relaxed max-w-lg">
        La comunidad donde filtramos juntos el ruido de la inteligencia artificial.
        Vota, comenta y descubre solo lo que importa.
      </p>

      <ul className="mt-4 flex flex-col gap-2 text-sm text-zinc-600">
        <li className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-accent-500 shrink-0" />
          Contenido curado 24/7 por 3 IAs
        </li>
        <li className="flex items-center gap-2">
          <Users className="w-4 h-4 text-accent-500 shrink-0" />
          Tú decides qué sube y qué no
        </li>
        <li className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-accent-500 shrink-0" />
          Alertas, digest semanal, premios mensuales
        </li>
      </ul>

      <div className="mt-5 flex items-center gap-3">
        <Link
          href="/registro"
          className="inline-flex items-center justify-center text-white text-sm font-bold px-5 py-2.5 rounded-xl transition-colors"
          style={{ background: "var(--color-accent-500)", fontFamily: "var(--font-manrope)" }}
        >
          Únete gratis
        </Link>
        <span className="text-xs text-zinc-400">Sin tarjeta. Sin spam. Solo IA en español.</span>
      </div>
    </section>
  );
}
