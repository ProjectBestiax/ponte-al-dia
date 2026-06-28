"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  count: number;
}

export function LeftSidebarCategories({ categories }: { categories: CategoryItem[] }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("categoria");
  // Preserve current section (/, /tendencia, /subiendo)
  const base = pathname === "/" || pathname === "/tendencia" || pathname === "/subiendo" ? pathname : "/";

  return (
    <nav className="flex flex-col gap-0.5">
      {categories.map((cat) => {
        const selected = activeCategory === cat.slug;
        const href = `${base}?categoria=${cat.slug}`;
        return (
          <Link
            key={cat.id}
            href={selected ? base : href}
            className="flex items-center justify-between h-[38px] px-3.5 rounded-[9px] font-semibold text-[14px] transition-colors hover:bg-zinc-100"
            style={{
              color: selected ? "#0A0A0A" : "#3F3F46",
              background: selected ? "#F4F4F5" : undefined,
              fontWeight: selected ? 700 : undefined,
            }}
          >
            <span>{cat.emoji} {cat.name}</span>
            <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, color: "#A1A1AA" }}>
              {cat.count}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
