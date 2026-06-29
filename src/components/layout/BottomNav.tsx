"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, TrendingUp, Wrench, PlusCircle } from "lucide-react";

const TABS = [
  { href: "/", label: "Feed", icon: Home, match: (p: string) => p === "/" || p === "/tendencias" || p === "/populares" },
  { href: "/ranking", label: "Ranking", icon: TrendingUp, match: (p: string) => p === "/ranking" },
  { href: "/herramientas", label: "Herramientas IA", icon: Wrench, match: (p: string) => p === "/herramientas" },
  { href: "/publicar", label: "Publicar", icon: PlusCircle, match: (p: string) => p === "/publicar" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="sm:hidden fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-zinc-100"
      style={{ paddingBottom: "env(safe-area-inset-bottom)", fontFamily: "var(--font-manrope)" }}
    >
      <div className="flex items-stretch h-[58px]">
        {TABS.map((tab) => {
          const active = tab.match(pathname);
          const Icon = tab.icon;
          const color = active ? "#2563EB" : "#A1A1AA";
          return (
            <Link
              key={tab.href}
              href={tab.href}
              className="flex-1 flex flex-col items-center justify-center gap-1 active:opacity-60 transition-opacity"
            >
              <Icon className="w-[21px] h-[21px]" strokeWidth={active ? 2.3 : 1.9} style={{ color }} />
              <span className="text-[10px] font-semibold whitespace-nowrap" style={{ color }}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
