"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export function FeedCta() {
  const { data: session, status } = useSession();

  if (status === "loading" || session) return null;

  return (
    <div className="my-3 rounded-xl border border-accent-200 bg-zinc-50 px-4 py-4 sm:px-5">
      <p className="text-sm text-zinc-700">
        ¿Te está gustando?{" "}
        <span className="text-zinc-500">
          Regístrate gratis para votar, comentar y recibir alertas de lo que te interesa.
        </span>
      </p>
      <Link
        href="/registro"
        className="mt-2.5 inline-flex items-center text-sm font-bold text-accent-700 hover:text-accent-900 transition-colors"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        Crear cuenta gratis →
      </Link>
    </div>
  );
}
