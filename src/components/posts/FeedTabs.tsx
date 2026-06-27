"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const tabs = [
  { href: "/tendencia", label: "Populares" },
  { href: "/", label: "Recientes" },
  { href: "/subiendo", label: "Tendencias" },
];

export function FeedTabs() {
  const pathname = usePathname();

  return (
    <div
      className="flex items-center gap-6 border-b border-zinc-100 mb-1.5"
      style={{ fontFamily: "var(--font-manrope)" }}
    >
      {tabs.map(({ href, label }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "pb-3.5 text-[15px] transition-colors",
              active
                ? "font-bold text-zinc-950 border-b-2 border-zinc-950 -mb-px"
                : "font-semibold text-zinc-400 hover:text-zinc-700"
            )}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
