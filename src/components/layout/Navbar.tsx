"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Brain, PlusCircle, LogIn, LogOut, User, Shield } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const { data: session } = useSession();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-bold text-lg text-indigo-600">
            <Brain className="w-6 h-6" />
            <span>Ponte al <span className="text-gray-900">dIA</span></span>
          </Link>

          {/* Nav links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <Link href="/" className="px-3 py-1.5 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
              Nuevos
            </Link>
            <Link href="/subiendo" className="px-3 py-1.5 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
              Subiendo
            </Link>
            <Link href="/tendencia" className="px-3 py-1.5 rounded-md text-gray-600 hover:bg-gray-100 transition-colors">
              🔥 Tendencia
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {session ? (
              <>
                <Link
                  href="/publicar"
                  className="hidden sm:flex items-center gap-1.5 bg-indigo-600 text-white text-sm font-medium px-3 py-1.5 rounded-md hover:bg-indigo-700 transition-colors"
                >
                  <PlusCircle className="w-4 h-4" />
                  Publicar
                </Link>
                <div className="relative">
                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 p-1.5 rounded-md hover:bg-gray-100"
                  >
                    {session.user?.image ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={session.user.image}
                        alt="avatar"
                        className="w-7 h-7 rounded-full"
                      />
                    ) : (
                      <User className="w-5 h-5" />
                    )}
                  </button>
                  {menuOpen && (
                    <div className="absolute right-0 mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg py-1 z-50">
                      <div className="px-3 py-2 text-xs text-gray-500 border-b border-gray-100">
                        {session.user?.email}
                      </div>
                      <Link
                        href="/perfil"
                        onClick={() => setMenuOpen(false)}
                        className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                      >
                        <User className="w-4 h-4" /> Mi perfil
                      </Link>
                      {/* @ts-expect-error extended session */}
                      {(session.user?.role === "ADMIN" || session.user?.role === "MODERATOR") && (
                        <Link
                          href="/admin"
                          onClick={() => setMenuOpen(false)}
                          className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Shield className="w-4 h-4" /> Moderación
                        </Link>
                      )}
                      <button
                        onClick={() => { setMenuOpen(false); signOut(); }}
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
                className="flex items-center gap-1.5 border border-indigo-600 text-indigo-600 text-sm font-medium px-3 py-1.5 rounded-md hover:bg-indigo-50 transition-colors"
              >
                <LogIn className="w-4 h-4" />
                Entrar
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
