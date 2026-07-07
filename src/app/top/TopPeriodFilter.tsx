"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { cn } from "@/lib/utils";

const periods = [
  { value: "day", label: "Día" },
  { value: "week", label: "Semana" },
  { value: "month", label: "Mes" },
  { value: "all", label: "Siempre" },
];

export function TopPeriodFilter() {
  const searchParams = useSearchParams();
  const current = searchParams.get("periodo") ?? "all";
  const categoria = searchParams.get("categoria");

  return (
    <div className="flex items-center gap-2 mb-3" style={{ fontFamily: "var(--font-manrope)" }}>
      {periods.map(({ value, label }) => {
        const active = current === value;
        const params = new URLSearchParams();
        params.set("periodo", value);
        if (categoria) params.set("categoria", categoria);
        return (
          <Link
            key={value}
            href={`/top?${params.toString()}`}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
              active
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
            )}
          >
            {label}
          </Link>
        );
      })}
    </div>
  );
}
