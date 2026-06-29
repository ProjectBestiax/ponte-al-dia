"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Link2, X, ImagePlus } from "lucide-react";
import { detectEmbed } from "@/lib/embed";

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
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const urlTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const embedDetected = currentUrl ? detectEmbed(currentUrl) : null;

  async function fetchMetadata(url: string) {
    if (!url || !url.startsWith("http")) return;
    setFetching(true);
    try {
      const res = await fetch(`/api/og-preview?url=${encodeURIComponent(url)}`);
      if (!res.ok) return;
      const data = await res.json();
      setPreview(data);
      // Siempre rellena (sobrescribe) con los datos de la URL
      if (data.title) setTitle(data.title);
      if (data.description) setDescription(data.description);
    } finally {
      setFetching(false);
    }
  }

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const form = new FormData();
      form.append("file", file);
      const res = await fetch("/api/upload", { method: "POST", body: form });
      if (!res.ok) throw new Error("Error subiendo imagen");
      const { url } = await res.json();
      setUploadedImage(url);
    } catch {
      setError("No se pudo subir la imagen.");
    } finally {
      setUploading(false);
    }
  }

  function handleUrlChange(e: React.ChangeEvent<HTMLInputElement>) {
    const url = e.target.value;
    setCurrentUrl(url);
    if (urlTimer.current) clearTimeout(urlTimer.current);
    setPreview(null);
    if (url) urlTimer.current = setTimeout(() => fetchMetadata(url), 700);
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
      imageUrl: uploadedImage ?? preview?.image ?? null,
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
    <form onSubmit={handleSubmit} className="bg-white border border-zinc-200 rounded-2xl p-6 space-y-5">

      {/* URL con auto-fetch */}
      <div>
        <label htmlFor="url" className="block text-sm font-medium text-zinc-700 mb-1">
          Enlace <span className="text-zinc-400 font-normal">(pega la URL y rellenamos el resto)</span>
        </label>
        <div className="relative">
          <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
          <input
            id="url"
            name="url"
            type="url"
            placeholder="https://..."
            onChange={handleUrlChange}
            className="w-full border border-zinc-300 rounded-lg pl-9 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          {fetching && <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-blue-400 animate-spin" />}
        </div>

        {/* Indicador de embed detectado */}
        {embedDetected && (
          <div className="mt-2 flex items-center gap-2 px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg text-xs text-orange-700 font-medium">
            🎬 Se detectó un vídeo de {embedDetected.type} — se mostrará como reproductor en el post
          </div>
        )}

        {/* Preview OG */}
        {!embedDetected && preview?.image && (
          <div className="mt-2 flex items-center gap-3 p-2.5 bg-zinc-50 border border-zinc-200 rounded-lg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={preview.image} alt="" className="w-14 h-14 object-cover rounded-md flex-shrink-0 border border-zinc-200" />
            <div className="min-w-0">
              <p className="text-xs font-semibold text-zinc-700 truncate">{preview.title}</p>
              <p className="text-xs text-zinc-500 line-clamp-2 mt-0.5">{preview.description}</p>
            </div>
            <button type="button" onClick={() => setPreview(null)} className="flex-shrink-0 text-zinc-400 hover:text-zinc-600">
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Imagen subida manualmente (solo si no hay embed ni OG image) */}
      {!embedDetected && (
        <div>
          <label className="block text-sm font-medium text-zinc-700 mb-1">
            Imagen <span className="text-zinc-400 font-normal">(opcional, si no se detectó una automáticamente)</span>
          </label>
          {uploadedImage ? (
            <div className="relative inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={uploadedImage} alt="Preview" className="h-24 rounded-lg border border-zinc-200 object-cover" />
              <button
                type="button"
                onClick={() => { setUploadedImage(null); if (fileRef.current) fileRef.current.value = ""; }}
                className="absolute -top-2 -right-2 bg-white border border-zinc-300 rounded-full p-0.5 text-zinc-500 hover:text-red-500"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <label className="flex items-center gap-2 w-fit cursor-pointer px-3 py-2 border border-dashed border-zinc-300 rounded-lg text-sm text-zinc-500 hover:border-blue-400 hover:text-blue-600 transition-colors">
              {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
              {uploading ? "Subiendo..." : "Subir imagen"}
              <input ref={fileRef} type="file" accept="image/*" className="sr-only" onChange={handleImageUpload} disabled={uploading} />
            </label>
          )}
        </div>
      )}

      {/* Título */}
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-zinc-700 mb-1">
          Título <span className="text-red-500">*</span>
          {fetching && <span className="ml-2 text-xs text-blue-500 font-normal">Detectando…</span>}
        </label>
        <input
          id="title"
          name="title"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          maxLength={200}
          placeholder="Ej: Claude 4 ya puede usar computadoras de forma autónoma"
          className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      {/* Descripción */}
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-zinc-700 mb-1">
          Descripción breve
        </label>
        <textarea
          id="description"
          name="description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          rows={3}
          maxLength={500}
          placeholder="Explica en 2-3 frases por qué esto es interesante para la comunidad..."
          className="w-full border border-zinc-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      {/* Categoría */}
      <div>
        <label className="block text-sm font-medium text-zinc-700 mb-2">
          Categoría <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat) => (
            <label
              key={cat.id}
              className="flex items-center gap-2 p-2.5 border border-zinc-200 rounded-lg cursor-pointer hover:border-blue-300 has-[:checked]:border-blue-500 has-[:checked]:bg-blue-50 transition-colors"
            >
              <input type="radio" name="categoryId" value={cat.id} className="sr-only" required />
              <span>{cat.emoji}</span>
              <span className="text-sm font-medium text-zinc-700">{cat.name}</span>
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
        className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white font-medium py-2.5 rounded-lg hover:bg-blue-700 disabled:opacity-60 transition-colors"
      >
        {loading && <Loader2 className="w-4 h-4 animate-spin" />}
        {loading ? "Publicando..." : "Publicar"}
      </button>

      <p className="text-xs text-zinc-400 text-center">
        Tu post pasará por moderación antes de aparecer en el feed. Normalmente en menos de 1 hora.
      </p>
    </form>
  );
}
