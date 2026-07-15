"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, X, Plus, Mail, MessageSquare } from "lucide-react";
import { timeAgo } from "@/lib/utils";
import { track } from "@/lib/analytics";

interface Keyword {
  id: string;
  keyword: string;
  notifyEmail: boolean;
  createdAt: Date;
}

interface Alert {
  id: string;
  read: boolean;
  createdAt: Date;
  post: { slug: string; title: string; voteCount: number; commentCount: number } | null;
}

export function AlertasClient({
  initialKeywords,
  initialAlerts,
}: {
  initialKeywords: Keyword[];
  initialAlerts: Alert[];
}) {
  const [keywords, setKeywords] = useState(initialKeywords);
  const [newKeyword, setNewKeyword] = useState("");
  const [notifyEmail, setNotifyEmail] = useState(false);
  const [adding, setAdding] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function addKeyword(e: React.FormEvent) {
    e.preventDefault();
    const kw = newKeyword.trim().toLowerCase();
    if (!kw || kw.length < 2) return;
    setAdding(true);
    setError(null);

    try {
      const res = await fetch("/api/alerts/keywords", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keyword: kw, notifyEmail }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error ?? "Error al crear alerta");
        return;
      }
      const created = await res.json();
      setKeywords((prev) => [created, ...prev]);
      track("keyword_alert_created", { notifyEmail });
      setNewKeyword("");
      setNotifyEmail(false);
    } catch {
      setError("Error de conexión");
    } finally {
      setAdding(false);
    }
  }

  async function removeKeyword(id: string) {
    setKeywords((prev) => prev.filter((k) => k.id !== id));
    try {
      await fetch("/api/alerts/keywords", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {
      // Rollback handled via refetch on next page load
    }
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-6" style={{ fontFamily: "var(--font-manrope)" }}>
      <div className="flex items-center gap-2 mb-6">
        <Zap className="w-5 h-5 text-accent-600" strokeWidth={2.2} />
        <h1 className="text-xl font-bold text-zinc-900">Alertas de palabras clave</h1>
      </div>

      <p className="text-sm text-zinc-500 mb-6">
        Recibe una notificación cuando se publique un post que contenga tus palabras clave.
      </p>

      {/* Add keyword form */}
      <form onSubmit={addKeyword} className="flex flex-col gap-3 mb-8">
        <div className="flex gap-2">
          <input
            type="text"
            value={newKeyword}
            onChange={(e) => setNewKeyword(e.target.value)}
            placeholder='Ej: "gpt-5", "agentes", "fine-tuning"'
            className="flex-1 rounded-xl border border-zinc-200 px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-accent-400 focus:border-transparent"
            maxLength={50}
          />
          <button
            type="submit"
            disabled={adding || newKeyword.trim().length < 2}
            className="flex items-center gap-1.5 rounded-xl bg-accent-400 text-accent-950 px-4 py-2.5 text-sm font-semibold hover:bg-accent-300 disabled:opacity-50 transition-colors"
          >
            <Plus className="w-4 h-4" strokeWidth={2.4} />
            Añadir
          </button>
        </div>
        <label className="flex items-center gap-2 text-sm text-zinc-600 cursor-pointer">
          <input
            type="checkbox"
            checked={notifyEmail}
            onChange={(e) => setNotifyEmail(e.target.checked)}
            className="rounded accent-[var(--color-accent-600)]"
          />
          <Mail className="w-3.5 h-3.5" strokeWidth={1.8} />
          Notificarme también por email
        </label>
        {error && <p className="text-sm text-red-500">{error}</p>}
      </form>

      {/* Current keywords */}
      {keywords.length > 0 && (
        <div className="mb-10">
          <h2 className="text-sm font-bold text-zinc-700 mb-3 uppercase tracking-wider">Tus alertas activas</h2>
          <div className="flex flex-wrap gap-2">
            {keywords.map((k) => (
              <span
                key={k.id}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent-50 border border-accent-200 pl-3 pr-1.5 py-1.5 text-sm font-medium text-accent-800"
              >
                {k.keyword}
                {k.notifyEmail && <Mail className="w-3 h-3 text-accent-500" strokeWidth={1.8} />}
                <button
                  onClick={() => removeKeyword(k.id)}
                  className="flex items-center justify-center w-5 h-5 rounded-full hover:bg-accent-200 transition-colors"
                  aria-label={`Eliminar alerta "${k.keyword}"`}
                >
                  <X className="w-3 h-3" strokeWidth={2.4} />
                </button>
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Matched alerts timeline */}
      <div>
        <h2 className="text-sm font-bold text-zinc-700 mb-3 uppercase tracking-wider">Alertas recibidas</h2>
        {initialAlerts.length === 0 ? (
          <div className="text-center py-12 text-zinc-400">
            <Zap className="w-8 h-8 mx-auto mb-2" strokeWidth={1.5} />
            <p className="text-sm font-medium">Sin alertas todavía</p>
            <p className="text-xs mt-1">Cuando un post coincida con tus palabras clave, aparecerá aquí.</p>
          </div>
        ) : (
          <div className="flex flex-col divide-y divide-zinc-100 border border-zinc-100 rounded-2xl overflow-hidden">
            {initialAlerts.map((a) =>
              a.post ? (
                <Link
                  key={a.id}
                  href={`/p/${a.post.slug}`}
                  className={`flex items-center justify-between gap-3 px-4 py-3 hover:bg-zinc-50 transition-colors ${
                    a.read ? "" : "bg-accent-50/40"
                  }`}
                >
                  <div className="min-w-0">
                    <p className="font-semibold text-zinc-900 leading-snug line-clamp-2" style={{ fontSize: 14 }}>
                      {a.post.title}
                    </p>
                    <span className="text-[11px] text-zinc-400 mt-0.5 block">{timeAgo(new Date(a.createdAt))}</span>
                  </div>
                  <div
                    className="shrink-0 flex items-center gap-3 text-zinc-400"
                    style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12 }}
                  >
                    <span>▲ {a.post.voteCount}</span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3.5 h-3.5" />
                      {a.post.commentCount}
                    </span>
                  </div>
                </Link>
              ) : null
            )}
          </div>
        )}
      </div>
    </div>
  );
}
