"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const periods = [
  { value: "day", label: "Día" },
  { value: "week", label: "Semana" },
  { value: "month", label: "Mes" },
  { value: "all", label: "Siempre" },
];

export function TopPeriodFilter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const current = searchParams.get("periodo") ?? "all";
  const categoria = searchParams.get("categoria");

  function handleClick(value: string) {
    const params = new URLSearchParams();
    params.set("periodo", value);
    if (categoria) params.set("categoria", categoria);
    startTransition(() => {
      router.push(`/top?${params.toString()}`);
    });
  }

  return (
    <div className="flex items-center gap-2 mb-3" style={{ fontFamily: "var(--font-manrope)" }}>
      {periods.map(({ value, label }) => {
        const active = current === value;
        return (
          <button
            key={value}
            onClick={() => handleClick(value)}
            className={cn(
              "px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors",
              active
                ? "bg-zinc-900 text-white"
                : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
            )}
          >
            {label}
          </button>
        );
      })}
      {isPending && <Loader2 className="w-4 h-4 text-zinc-400 animate-spin" />}
    </div>
  );
}
