"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

interface Category {
  id: string;
  name: string;
  slug: string;
  emoji: string;
  color: string;
}

export function CategoryFilter({ categories }: { categories: Category[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = searchParams.get("categoria");

  function setCategory(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("categoria", slug);
    } else {
      params.delete("categoria");
    }
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="flex gap-2 flex-wrap mb-4">
      <button
        onClick={() => setCategory(null)}
        className={cn(
          "text-xs font-medium px-3 py-1.5 rounded-full border transition-colors",
          !active
            ? "bg-indigo-600 text-white border-indigo-600"
            : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
        )}
      >
        Todo
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => setCategory(cat.slug)}
          className={cn(
            "text-xs font-medium px-3 py-1.5 rounded-full border transition-colors",
            active === cat.slug
              ? "text-white border-transparent"
              : "bg-white text-gray-600 border-gray-200 hover:border-gray-400"
          )}
          style={
            active === cat.slug
              ? { backgroundColor: cat.color, borderColor: cat.color }
              : {}
          }
        >
          {cat.emoji} {cat.name}
        </button>
      ))}
    </div>
  );
}
