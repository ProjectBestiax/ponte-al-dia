"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User, Shield, Bell, Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (query.trim()) router.push(`/?q=${encodeURIComponent(query.trim())}`);
  }

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-zinc-100" style={{ height: 68 }}>
      <div className="flex items-center gap-3 sm:gap-7 h-full px-4 sm:px-6 lg:px-9" style={{ maxWidth: 1280, margin: "0 auto" }}>

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div
            className="flex items-center justify-center rounded-[9px] bg-zinc-950 text-white shrink-0"
            style={{ width: 34, height: 34, fontFamily: "var(--font-manrope)", fontWeight: 800, fontSize: 15, letterSpacing: "-0.02em" }}
          >
            d<span style={{ fontWeight: 500 }}>I</span>A
          </div>
          <span className="hidden sm:inline" style={{ fontFamily: "var(--font-manrope)" }}>
            <span className="font-medium text-zinc-500" style={{ fontSize: 16 }}>Ponte al </span>
            <span className="font-extrabold text-zinc-950" style={{ fontSize: 16 }}>dIA</span>
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-[440px] min-w-0">
          <div className="flex items-center gap-2.5 h-[42px] bg-zinc-100 border border-zinc-100 rounded-[11px] px-4">
            <svg className="shrink-0" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#A1A1AA" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/>
            </svg>
            <input
              type="text"
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Buscar…"
              className="flex-1 min-w-0 bg-transparent text-sm text-zinc-500 placeholder-zinc-400 outline-none"
              style={{ fontFamily: "var(--font-manrope)" }}
            />
          </div>
        </form>

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2 sm:gap-3.5 shrink-0">
          {session ? (
            <>
              {/* Bell — hidden on mobile to save space */}
              <button className="relative hidden sm:flex items-center justify-center w-[42px] h-[42px] rounded-[11px] border border-zinc-100 bg-white hover:bg-zinc-50 transition-colors">
                <Bell className="w-[19px] h-[19px] text-zinc-600" strokeWidth={1.8} />
                <span className="absolute top-[9px] right-[10px] w-[7px] h-[7px] rounded-full bg-blue-600 border-[1.5px] border-white" />
              </button>

              {/* Publicar — icon-only on mobile */}
              <Link
                href="/publicar"
                aria-label="Publicar"
                className="flex items-center justify-center sm:justify-start gap-2 text-white text-sm font-bold rounded-[11px] px-3 sm:px-4 h-[42px] transition-colors shrink-0"
                style={{ background: "#2563EB", fontFamily: "var(--font-manrope)", fontSize: 14.5 }}
              >
                <Plus className="w-[17px] h-[17px]" strokeWidth={2.2} />
                <span className="hidden sm:inline">Publicar</span>
              </Link>

              {/* Avatar menu */}
              <div className="relative">
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="flex items-center justify-center w-[42px] h-[42px] rounded-full bg-zinc-950 text-white font-bold text-sm hover:bg-zinc-800 transition-colors"
                  style={{ fontFamily: "var(--font-manrope)" }}
                >
                  {session.user?.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={session.user.image} alt="avatar" className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <span>{(session.user?.name ?? session.user?.email ?? "U")[0].toUpperCase()}</span>
                  )}
                </button>
                {menuOpen && (
                  <div className="absolute right-0 mt-1 w-48 bg-white border border-zinc-200 rounded-lg shadow-lg py-1 z-50">
                    <div className="px-3 py-2 text-xs text-zinc-400 border-b border-zinc-100">
                      {session.user?.email}
                    </div>
                    <Link href="/perfil" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50">
                      <User className="w-4 h-4" /> Mi perfil
                    </Link>
                    {/* @ts-expect-error extended session */}
                    {(session.user?.role === "ADMIN" || session.user?.role === "MODERATOR") && (
                      <Link href="/admin" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-50">
                        <Shield className="w-4 h-4" /> Moderación
                      </Link>
                    )}
                    <button
                      onClick={() => { setMenuOpen(false); signOut({ callbackUrl: "/" }); }}
                      className="flex items-center gap-2 w-full px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                    >
                      <LogOut className="w-4 h-4" /> Cerrar sesión
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link
              href="/login"
              className="flex items-center gap-1.5 border border-zinc-300 text-zinc-700 text-sm font-medium px-3 py-1.5 rounded-md hover:bg-zinc-50 transition-colors"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
