"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Link2, X } from "lucide-react";

interface Category {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  color: string;
}

export function PublishForm({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<{ title?: string; description?: string; image?: string } | null>(null);
  const urlTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const descRef = useRef<HTMLTextAreaElement>(null);

  async function fetchMetadata(url: string) {
    if (!url || !url.startsWith("http")) return;
    setFetching(true);
    try {
      const res = await fetch(`/api/og-preview?url=${encodeURIComponent(url)}`);
      if (!res.ok) return;
      const data = await res.json();
      setPreview(data);
      // Auto-rellena si los campos están vacíos
      if (titleRef.current && !titleRef.current.value && data.title) {
        titleRef.current.value = data.title;
      }
      if (descRef.current && !descRef.current.value && data.description) {
        descRef.current.value = data.description;
      }
    } finally {
      setFetching(false);
    }
  }

  function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    const url = e.target.value;
    if (urlTimer.current) clearTimeout(urlTimer.current);
    setPreview(null);
    urlTimer.current = setTimeout(() => fetchMetadata(url), 700);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const form = new FormData(e.currentTarget);
    const data = {
      title: form.get("title") as string,
      url: form.get("url") as string,
      description: form.get("description") as string,
      categoryId: form.get("categoryId") as string,
      imageUrl: preview?.image ?? null,
    };

    if (!data.title || !data.categoryId) {
      setError("El título y la categoría son obligatorios.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error ?? "Error al publicar");
      }

      const { slug } = await res.json();
      router.push(`/p/${slug}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Error inesperado");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white border border-gray-200 rounded-2xl p-6 space-y-5">

      {/* URL con auto-fetch */}
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-1">
          Enlace <span className="text-gray-400 font-normal">(pega la URL y rellenamos el resto)</span>
        </label>
        <div className="relative">
          <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            id="url"
            name="url"
            type="url"
            placeholder="https://..."
            onChange={handleUrlChange}
            className="w-full border border-gray-300 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          {fetching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-indigo-500 animate-spin" />}
        </div>

        {/* Preview de la URL */}
        {preview?.image && (
          <div className="mt-2 flex items-center gap-3 p-2.5 bg-gray-50 border border-gray-200 rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview.image} alt="" className="w-14 h-14 object-cover rounded-md flex-shrink-0 border border-gray-200" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-gray-700 truncate">{preview.title}</p>
              <p className="text-xs text-gray-500 line-clamp-2 mt-0.5">{preview.description}</p>
            </div>
            <button type="button" onClick={() => setPreview(null)} className="flex-shrink-0 text-gray-400 hover:text-gray-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Título */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          id="title"
          name="title"
          type="text"
          ref={titleRef}
          maxLength={200}
          placeholder="Ej: Claude 4 ya puede usar computadoras de forma autónoma"
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          required
        />
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
          Descripción breve
        </label>
        <textarea
          id="description"
          name="description"
          ref={descRef}
          rows={3}
          maxLength={500}
          placeholder="Explica en 2-3 frases por qué esto es interesante para la comunidad..."
          className="w-full border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Categoría <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2 p-2.5 border border-gray-200 rounded-lg cursor-pointer hover:border-indigo-300 has-[:checked]:border-indigo-500 has-[:checked]:bg-indigo-50 transition-colors"
            >
              <input type="radio" name="categoryId" value={cat.id} className="sr-only" required />
              <span>{cat.emoji}</span>
              <span className="text-sm font-medium text-gray-700">{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-600 bg-red-50 rounded-lg px-3 py-2">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-medium py-2.5 rounded-lg hover:bg-indigo-700 disabled:opacity-60 transition-colors"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? "Publicando..." : "Publicar"}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Tu post pasará por moderación antes de aparecer en el feed. Normalmente en menos de 1 hora.
      </p>
    </form>
  );
}
