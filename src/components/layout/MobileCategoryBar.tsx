import Link from "next/link";
import { db } from "@/lib/db";

interface MobileCategoryBarProps {
  activeCategory?: string;
  basePath?: string;
}

export async function MobileCategoryBar({ activeCategory, basePath = "/" }: MobileCategoryBarProps) {
  const categories = await db.category.findMany({
    orderBy: { name: "asc" },
    select: { id: true, name: true, slug: true, emoji: true },
  });

  const chip = (active: boolean) =>
    `shrink-0 inline-flex items-center gap-1.5 h-[34px] px-3.5 rounded-full text-[13px] font-semibold whitespace-nowrap transition-colors ${
      active ? "bg-zinc-950 text-white" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
    }`;

  return (
    <div
      className="md:hidden flex gap-2 overflow-x-auto no-scrollbar -mx-4 px-4 pb-3 mb-1"
      style={{ fontFamily: "var(--font-manrope)" }}
    >
      <Link href={basePath} className={chip(!activeCategory)}>
        Todas
      </Link>
      {categories.map((cat) => {
        const sep = basePath.includes("?") ? "&" : "?";
        return (
          <Link
            key={cat.id}
            href={`${basePath}${sep}categoria=${cat.slug}`}
            className={chip(activeCategory === cat.slug)}
          >
            <span>{cat.emoji}</span>
            {cat.name}
          </Link>
        );
      })}
    </div>
  );
}
