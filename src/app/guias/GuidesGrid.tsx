"use client";

import { useState } from "react";
import Link from "next/link";
import type { GuideMeta } from "@/lib/guides/types";

export function GuidesGrid({ guides }: { guides: GuideMeta[] }) {
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filtered = q
    ? guides.filter(
        (g) =>
          g.profession.toLowerCase().includes(q) ||
          g.tagline.toLowerCase().includes(q)
      )
    : guides;

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Busca tu profesión: abogado, diseñador, profesor..."
        className="w-full border border-zinc-200 rounded-xl px-4 py-3 text-sm mb-6 focus:outline-none focus:ring-2 focus:ring-accent-500"
      />

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-zinc-500">
          <p className="text-2xl mb-2">🔍</p>
          <p>No encontramos ninguna guía para &ldquo;{query}&rdquo;.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((g) => (
            <Link
              key={g.slug}
              href={`/guias/ia-para-${g.slug}`}
              className="border border-zinc-200 rounded-xl p-5 hover:border-accent-300 hover:bg-zinc-50 transition-colors"
            >
              <div className="text-3xl mb-2">{g.icon}</div>
              <div className="font-bold text-zinc-900" style={{ fontFamily: "var(--font-manrope)" }}>
                {g.profession}
              </div>
              <p className="text-sm text-zinc-500 mt-1">{g.tagline}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
