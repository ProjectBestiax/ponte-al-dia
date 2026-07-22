"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  {
    href: "/",
    label: "Inicio",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/>
      </svg>
    ),
  },
  {
    href: "/debates",
    label: "Debates",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>
      </svg>
    ),
  },
  {
    href: "/guias",
    label: "Guías",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
      </svg>
    ),
  },
  {
    href: "/populares",
    label: "Destacados",
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
        <path d="m12 3 2.5 6.5L21 12l-6.5 2.5L12 21l-2.5-6.5L3 12l6.5-2.5z"/>
      </svg>
    ),
  },
  {
    href: "/tendencias",
    label: "Subiendo",
    blue: true,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>
      </svg>
    ),
  },
];

export function LeftSidebarNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const categoria = searchParams.get("categoria");

  return (
    <nav className="flex flex-col gap-[3px]">
      {NAV_ITEMS.map((item) => {
        const active =
          pathname === item.href ||
          (item.href === "/guias" && pathname.startsWith("/guias/"));
        // Inicio always resets to "/" with no filters; other sections preserve category
        const target = item.href === "/" || !categoria ? item.href : `${item.href}?categoria=${categoria}`;
        return (
          <Link
            key={item.href}
            href={target}
            className={cn(
              "flex items-center gap-3 h-[42px] px-3.5 rounded-[10px] text-[14.5px] transition-colors",
              active
                ? "bg-zinc-950 text-white font-bold"
                : item.blue
                ? "text-accent-700 font-semibold hover:bg-zinc-100"
                : "text-zinc-600 font-semibold hover:bg-zinc-100"
            )}
          >
            {item.icon}
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
