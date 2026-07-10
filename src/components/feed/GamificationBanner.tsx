"use client";

import { useState } from "react";
import Link from "next/link";
import { Trophy, X } from "lucide-react";

export function GamificationBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="relative bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-4 overflow-hidden">
      <button
        onClick={() => setDismissed(true)}
        className="absolute top-2 right-2 text-amber-400 hover:text-amber-600 transition-colors"
        aria-label="Cerrar"
      >
        <X className="w-4 h-4" />
      </button>

      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-amber-100 shrink-0">
          <Trophy className="w-5 h-5 text-amber-600" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-bold text-amber-900">
            Premios para los más activos
          </p>
          <p className="text-xs text-amber-700 mt-0.5">
            Publica, vota, comenta y comparte para subir en el ranking. Los top 3 de cada mes ganan licencias Pro, cheques regalo y más.
          </p>
        </div>
        <Link
          href="/ranking"
          className="shrink-0 text-xs font-bold text-amber-800 bg-amber-200 hover:bg-amber-300 px-3 py-1.5 rounded-full transition-colors"
        >
          Ver ranking
        </Link>
      </div>
    </div>
  );
}
