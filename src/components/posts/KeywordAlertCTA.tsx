"use client";

import { useState } from "react";
import { Zap, Plus, Check } from "lucide-react";
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
      className="mt-8 bg-accent-50/60 border border-accent-200 rounded-2xl p-5"
      style={{ fontFamily: "var(--font-manrope)" }}
    >
      <div className="flex items-center gap-2 mb-2">
        <Zap className="w-4 h-4 text-accent-600" strokeWidth={2.2} />
        <h3 className="text-sm font-bold text-accent-900">No te pierdas ninguna novedad</h3>
      </div>
      <p className="text-xs text-accent-800 mb-3">
        Activa alertas para recibir notificaciones cuando se publiquen posts sobre estos temas:
      </p>
      <div className="flex flex-wrap gap-2 mb-3">
        {suggestions.map((kw) => {
          const isSaved = saved.has(kw);
          const isSaving = saving === kw;
          return (
            <button
              key={kw}
              onClick={() => !isSaved && saveKeyword(kw)}
              disabled={isSaved || isSaving}
              className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                isSaved
                  ? "bg-accent-200 text-accent-800"
                  : "bg-white border border-accent-300 text-accent-800 hover:bg-accent-100"
              }`}
            >
              {isSaved ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
              {kw}
            </button>
          );
        })}
      </div>
      <Link
        href="/alertas"
        className="text-xs font-semibold text-accent-700 hover:text-accent-900 transition-colors"
      >
        Gestionar todas tus alertas →
      </Link>
    </section>
  );
}
