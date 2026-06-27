import Link from "next/link";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { LeftSidebarNav } from "./LeftSidebarNav";

interface LeftSidebarProps {
  activeCategory?: string;
}

export async function LeftSidebar({ activeCategory }: LeftSidebarProps) {
  const session = await auth();

  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { posts: { where: { status: "ACTIVE" } } } } },
  });

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
      <nav className="flex flex-col gap-0.5">
        {categories.map((cat) => {
          const selected = activeCategory === cat.slug;
          return (
            <Link
              key={cat.id}
              href={`/?categoria=${cat.slug}`}
              className="flex items-center justify-between h-[38px] px-3.5 rounded-[9px] font-semibold text-[14px] transition-colors hover:bg-zinc-100"
              style={{
                color: selected ? "#0A0A0A" : "#3F3F46",
                background: selected ? "#F4F4F5" : undefined,
                fontWeight: selected ? 700 : undefined,
              }}
            >
              <span>{cat.emoji} {cat.name}</span>
              <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, color: "#A1A1AA" }}>
                {cat._count.posts}
              </span>
            </Link>
          );
        })}
      </nav>

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
