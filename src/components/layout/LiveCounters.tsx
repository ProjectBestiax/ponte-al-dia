"use client";

import { useEffect, useRef, useState } from "react";

interface Counts {
  online: number;
  community: number;
}

const CID_KEY = "pad_cid";
const PING_MS = 30_000;

function getClientId(): string {
  try {
    let id = localStorage.getItem(CID_KEY);
    if (!id) {
      id =
        (crypto.randomUUID?.() as string | undefined) ??
        Math.random().toString(36).slice(2) + Date.now().toString(36);
      localStorage.setItem(CID_KEY, id);
    }
    return id;
  } catch {
    return Math.random().toString(36).slice(2);
  }
}

/** Anima un número entero hacia su valor objetivo. */
function useAnimatedNumber(target: number | null): number | null {
  const [value, setValue] = useState<number | null>(target);
  const raf = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (target == null) return;
    setValue((prev) => {
      if (prev == null) return target;
      if (prev === target) return prev;
      // paso hacia el objetivo
      const step = () => {
        setValue((v) => {
          if (v == null || v === target) return v;
          const diff = target - v;
          const delta = Math.sign(diff) * Math.max(1, Math.floor(Math.abs(diff) / 4));
          const next = Math.abs(delta) >= Math.abs(diff) ? target : v + delta;
          if (next !== target) raf.current = window.setTimeout(step, 40) as unknown as number;
          return next;
        });
      };
      raf.current = window.setTimeout(step, 40) as unknown as number;
      return prev;
    });
    return () => {
      if (raf.current) clearTimeout(raf.current);
    };
  }, [target]);

  return value;
}

export function LiveCounters({ variant = "card" }: { variant?: "card" | "inline" }) {
  const [counts, setCounts] = useState<Counts | null>(null);

  useEffect(() => {
    const clientId = getClientId();
    let alive = true;

    async function ping() {
      try {
        const res = await fetch("/api/presence", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ clientId }),
        });
        if (!res.ok) return;
        const data = (await res.json()) as Counts;
        if (alive) setCounts(data);
      } catch {
        // silencioso
      }
    }

    ping();
    const iv = setInterval(ping, PING_MS);
    return () => {
      alive = false;
      clearInterval(iv);
    };
  }, []);

  const online = useAnimatedNumber(counts?.online ?? null);
  const community = useAnimatedNumber(counts?.community ?? null);

  if (variant === "inline") {
    return (
      <div
        className="flex items-center justify-center gap-4 py-1.5 text-[12px]"
        style={{ fontFamily: "var(--font-jetbrains-mono)", color: "#71717A" }}
      >
        <span className="flex items-center gap-1.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500" />
          </span>
          <span className="font-semibold text-zinc-700 tabular-nums">{online ?? "··"}</span>
          en línea
        </span>
        <span className="text-zinc-300">·</span>
        <span>
          <span className="font-semibold text-zinc-700 tabular-nums">{community ?? "··"}</span> en la
          comunidad
        </span>
      </div>
    );
  }

  return (
    <div
      className="border border-zinc-100 rounded-[14px] p-[18px] mb-[18px]"
      style={{ fontFamily: "var(--font-manrope)" }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>
          <span className="text-[13px] text-zinc-500">En línea ahora</span>
        </div>
        <span
          className="font-extrabold text-[17px] text-zinc-950 tabular-nums"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          {online ?? "··"}
        </span>
      </div>
      <div className="mt-2.5 pt-2.5 border-t border-zinc-100 flex items-center justify-between">
        <span className="text-[13px] text-zinc-500">En la comunidad</span>
        <span
          className="font-extrabold text-[17px] text-zinc-950 tabular-nums"
          style={{ fontFamily: "var(--font-jetbrains-mono)" }}
        >
          {community ?? "··"}
        </span>
      </div>
    </div>
  );
}
