"use client";

import { useState } from "react";
import { Bell, Plus, Check } from "lucide-react";
import Link from "next/link";

export function KeywordAlertCTA({ suggestions }: { suggestions: string[] }) {
  const [saved, setSaved] = useState<Set<string>>(new Set());
  const [saving, setSaving] = useState<string | null>(null);

  async function saveKeyword(kw: string) {
    setSaving(kw);
    try {
      const res = await fetch("/api/alerts/keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: kw }),
      });
      if (res.ok) setSaved((prev) => new Set(prev).add(kw));
    } catch {
      // silent
    } finally {
      setSaving(null);
    }
  }

  if (suggestions.length === 0) return null;

  return (
    <section
      className="mt-8"
      style={{ fontFamily: "var(--font-manrope)" }}
    >
      <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wide mb-3">
        No te pierdas ninguna novedad
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory -mx-1 px-1">
        {suggestions.map((kw) => {
          const isSaved = saved.has(kw);
          const isSaving = saving === kw;
          return (
            <button
              key={kw}
              onClick={() => !isSaved && saveKeyword(kw)}
              disabled={isSaved || isSaving}
              className={`snap-start shrink-0 w-[180px] flex flex-col items-center gap-3 rounded-2xl p-4 transition-all ${
                isSaved
                  ? "bg-accent-100 border-2 border-accent-400"
                  : "bg-white border border-zinc-200 hover:border-accent-300 hover:shadow-sm"
              }`}
            >
              <span className="text-base font-bold text-zinc-900 capitalize text-center line-clamp-2">
                {kw}
              </span>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                  isSaved
                    ? "bg-accent-500 text-white"
                    : "bg-zinc-100 text-zinc-600 group-hover:bg-accent-100"
                }`}
              >
                {isSaved ? (
                  <><Check className="w-3.5 h-3.5" /> Alerta activa</>
                ) : (
                  <><Bell className="w-3.5 h-3.5" />{isSaving ? "..." : "Activar alerta"}</>
                )}
              </span>
            </button>
          );
        })}
        <Link
          href="/alertas"
          className="snap-start shrink-0 w-[180px] flex flex-col items-center justify-center gap-2 rounded-2xl p-4 border border-dashed border-zinc-300 hover:border-accent-400 hover:bg-accent-50/50 transition-all"
        >
          <Plus className="w-5 h-5 text-zinc-400" />
          <span className="text-xs font-semibold text-zinc-500">Gestionar alertas</span>
        </Link>
      </div>
    </section>
  );
}
