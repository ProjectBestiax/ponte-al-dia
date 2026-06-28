"use client";

import { useActionState, useRef, useState } from "react";
import Link from "next/link";
import { updateProfile, type ProfileState } from "@/app/perfil/actions";

interface Props {
  user: {
    name: string | null;
    username: string | null;
    bio: string | null;
    image: string | null;
    email: string;
  };
}

export function EditProfileForm({ user }: Props) {
  const [state, action, isPending] = useActionState<ProfileState, FormData>(updateProfile, null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(user.image);
  const [avatarError, setAvatarError] = useState<string | null>(null);
  const [avatarLoading, setAvatarLoading] = useState(false);
  const [bioLength, setBioLength] = useState((user.bio ?? "").length);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const initial = (user.name ?? user.email ?? "U")[0].toUpperCase();

  async function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarError(null);
    setAvatarLoading(true);

    // Preview
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarPreview(ev.target?.result as string);
    reader.readAsDataURL(file);

    // Upload
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/profile/avatar", { method: "POST", body: fd });
    const json = await res.json();
    setAvatarLoading(false);

    if (!res.ok) {
      setAvatarError(json.error ?? "Error al subir imagen");
      setAvatarPreview(user.image);
    }
  }

  return (
    <div style={{ fontFamily: "var(--font-manrope)" }}>
      {/* Back */}
      <Link
        href="/perfil"
        className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-700 mb-6 transition-colors"
        style={{ fontSize: 13, fontWeight: 600 }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m15 18-6-6 6-6"/>
        </svg>
        Volver al perfil
      </Link>

      <h1 className="font-extrabold text-zinc-950 mb-6" style={{ fontSize: 22 }}>
        Editar perfil
      </h1>

      {/* Avatar */}
      <div className="flex items-center gap-4 mb-8">
        <button
          type="button"
          onClick={() => fileInputRef.current?.click()}
          className="relative group shrink-0"
          disabled={avatarLoading}
        >
          {avatarPreview ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={avatarPreview}
              alt="avatar"
              className="rounded-full object-cover"
              style={{ width: 72, height: 72 }}
            />
          ) : (
            <div
              className="rounded-full flex items-center justify-center text-white font-extrabold"
              style={{ width: 72, height: 72, background: "#0A0A0A", fontSize: 28 }}
            >
              {initial}
            </div>
          )}
          <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            {avatarLoading ? (
              <svg className="animate-spin" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                <path d="M21 12a9 9 0 1 1-6.219-8.56"/>
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="17 8 12 3 7 8"/>
                <line x1="12" y1="3" x2="12" y2="15"/>
              </svg>
            )}
          </div>
        </button>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="hidden"
          onChange={handleAvatarChange}
        />
        <div>
          <p className="font-semibold text-zinc-700" style={{ fontSize: 14 }}>Foto de perfil</p>
          <p className="text-zinc-400 mt-0.5" style={{ fontSize: 12 }}>jpg, png o webp · máx 2MB</p>
          {avatarError && <p className="text-red-500 mt-1" style={{ fontSize: 12 }}>{avatarError}</p>}
        </div>
      </div>

      {/* Profile form */}
      <form action={action} className="flex flex-col gap-5">
        {state?.error && (
          <div className="border border-red-200 bg-red-50 rounded-[10px] px-4 py-3 text-red-600 font-medium" style={{ fontSize: 14 }}>
            {state.error}
          </div>
        )}

        {/* Name */}
        <div>
          <label className="block font-semibold text-zinc-700 mb-1.5" style={{ fontSize: 13 }}>
            Nombre
          </label>
          <input
            name="name"
            type="text"
            defaultValue={user.name ?? ""}
            maxLength={60}
            required
            placeholder="Tu nombre"
            className="w-full border border-zinc-200 rounded-[10px] px-3.5 h-[42px] text-zinc-900 font-medium placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
            style={{ fontSize: 14 }}
          />
        </div>

        {/* Username */}
        <div>
          <label className="block font-semibold text-zinc-700 mb-1.5" style={{ fontSize: 13 }}>
            Username{" "}
            <span className="text-zinc-400 font-normal">(opcional)</span>
          </label>
          <div className="relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400 font-medium select-none" style={{ fontSize: 14 }}>@</span>
            <input
              name="username"
              type="text"
              defaultValue={user.username ?? ""}
              maxLength={20}
              placeholder="tu_username"
              className="w-full border border-zinc-200 rounded-[10px] pl-8 pr-3.5 h-[42px] text-zinc-900 font-medium placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors"
              style={{ fontSize: 14 }}
            />
          </div>
          <p className="text-zinc-400 mt-1" style={{ fontSize: 12 }}>3-20 caracteres: letras, números y _</p>
        </div>

        {/* Bio */}
        <div>
          <label className="block font-semibold text-zinc-700 mb-1.5" style={{ fontSize: 13 }}>
            Bio{" "}
            <span className="text-zinc-400 font-normal">(opcional)</span>
          </label>
          <textarea
            name="bio"
            defaultValue={user.bio ?? ""}
            maxLength={200}
            rows={3}
            placeholder="Cuéntanos algo sobre ti…"
            onChange={(e) => setBioLength(e.target.value.length)}
            className="w-full border border-zinc-200 rounded-[10px] px-3.5 py-3 text-zinc-900 font-medium placeholder:text-zinc-400 focus:outline-none focus:border-zinc-400 transition-colors resize-none"
            style={{ fontSize: 14 }}
          />
          <p className="text-right mt-1" style={{ fontSize: 12, color: bioLength > 180 ? "#e11d48" : "#A1A1AA" }}>
            {bioLength}/200
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 pt-1">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 h-[42px] rounded-[10px] bg-zinc-950 text-white font-bold hover:bg-zinc-800 transition-colors disabled:opacity-50"
            style={{ fontSize: 14 }}
          >
            {isPending ? "Guardando…" : "Guardar cambios"}
          </button>
          <Link
            href="/perfil"
            className="h-[42px] px-5 rounded-[10px] border border-zinc-200 text-zinc-600 font-semibold hover:bg-zinc-50 transition-colors flex items-center"
            style={{ fontSize: 14 }}
          >
            Cancelar
          </Link>
        </div>
      </form>
    </div>
  );
}
