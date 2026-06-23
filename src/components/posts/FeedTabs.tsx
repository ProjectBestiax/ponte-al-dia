"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Clock, TrendingUp, Flame } from "lucide-react";

const tabs = [
  { href: "/", label: "Nuevos", icon: Clock },
  { href: "/subiendo", label: "Subiendo", icon: TrendingUp },
  { href: "/tendencia", label: "Tendencia", icon: Flame },
];

export function FeedTabs() {
  const pathname = usePathname();

  return (
    <div className="flex gap-1 border-b border-gray-200 mb-6">
      {tabs.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={cn(
              "flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 -mb-px transition-colors",
              active
                ? "border-indigo-600 text-indigo-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            )}
          >
            <Icon className="w-4 h-4" />
            {label}
          </Link>
        );
      })}
    </div>
  );
}
