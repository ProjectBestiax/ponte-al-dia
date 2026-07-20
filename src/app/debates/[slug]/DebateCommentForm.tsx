"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Loader2 } from "lucide-react";

export function DebateCommentForm({ debateId }: { debateId: string }) {
  const router = useRouter();
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/debates/${debateId}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim() }),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error ?? "Error al comentar");
      }
      setContent("");
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "No se pudo publicar el comentario. Inténtalo de nuevo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <textarea
        id="content"
        name="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        rows={3}
        placeholder="Aporta al debate…"
        className="w-full border border-zinc-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-accent-500 resize-none"
        maxLength={5000}
      />
      {error && <p className="text-xs text-red-600 mt-1">{error}</p>}
      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-zinc-400">{content.length}/5000</span>
        <button
          type="submit"
          disabled={loading || !content.trim()}
          className="flex items-center gap-1.5 px-4 py-2 bg-accent-400 text-accent-950 text-sm font-semibold rounded-lg hover:bg-accent-500 disabled:opacity-50 transition-colors"
        >
          {loading && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
          Comentar
        </button>
      </div>
      <p className="mt-2 text-xs text-zinc-400">
        Respeta las normas: nada de insultos ni faltas de respeto.{" "}
        <Link href="/debates/normas" className="text-accent-700 hover:underline">
          Ver normas
        </Link>
      </p>
    </form>
  );
}
