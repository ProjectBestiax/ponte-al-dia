import Link from "next/link";
import { auth } from "@/lib/auth";
import { getCachedCategories } from "@/lib/cached-data";
import { LeftSidebarNav } from "./LeftSidebarNav";
import { LeftSidebarCategories } from "./LeftSidebarCategories";

export async function LeftSidebar() {
  const [session, categories] = await Promise.all([
    auth(),
    getCachedCategories(),
  ]);

  return (
    <aside style={{ fontFamily: "var(--font-manrope)" }}>
      {/* Main nav — client component for active state */}
      <LeftSidebarNav />

      {/* Divider */}
      <div className="h-px bg-zinc-100 my-5" />

      {/* Categories */}
      <div
        className="px-3.5 mb-2.5 uppercase tracking-widest text-zinc-400"
        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, letterSpacing: "0.08em" }}
      >
        Categorías
      </div>
      <LeftSidebarCategories
        categories={categories
          .filter((cat) => cat._count.posts > 0)
          .map((cat) => ({
            id: cat.id,
            name: cat.name,
            slug: cat.slug,
            emoji: cat.emoji,
            count: cat._count.posts,
          }))}
      />

      {/* CTA card (only when not logged in) */}
      {!session && (
        <div className="mt-6 border border-zinc-100 rounded-[13px] p-[18px]">
          <div className="font-extrabold text-[15px] text-zinc-950 mb-1">Las noticias, lo que nos conecta.</div>
          <div className="text-[13px] leading-relaxed text-zinc-500 mb-3.5">
            Publica, vota y debate la actualidad de la IA con la comunidad.
          </div>
          <Link
            href="/login"
            className="flex items-center justify-center w-full h-[38px] rounded-[9px] border border-zinc-950 bg-zinc-950 text-white font-bold text-[13.5px] hover:bg-zinc-800 transition-colors"
          >
            Crear cuenta
          </Link>
        </div>
      )}
    </aside>
  );
}
