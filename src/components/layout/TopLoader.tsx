"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

export function TopLoader() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const isFirstRender = useRef(true);

  // Complete the bar when navigation finishes (pathname changes)
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const bar = barRef.current;
    if (!bar) return;
    bar.style.transition = "width 0.12s ease";
    bar.style.width = "100%";
    const t = setTimeout(() => {
      bar.style.transition = "opacity 0.25s ease";
      bar.style.opacity = "0";
      setTimeout(() => {
        bar.style.transition = "none";
        bar.style.width = "0%";
        bar.style.opacity = "1";
      }, 280);
    }, 120);
    return () => clearTimeout(t);
  }, [pathname]);

  // Start bar on any internal link click
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const link = (e.target as HTMLElement).closest("a");
      if (!link) return;
      const href = link.getAttribute("href");
      if (!href || href.startsWith("#") || href.startsWith("http") || href.startsWith("mailto") || href.startsWith("tel")) return;

      const bar = barRef.current;
      if (!bar) return;
      bar.style.transition = "none";
      bar.style.width = "0%";
      bar.style.opacity = "1";
      requestAnimationFrame(() => {
        bar.style.transition = "width 2.5s cubic-bezier(0.08, 0.04, 0, 1)";
        bar.style.width = "82%";
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return (
    <div
      ref={barRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        height: 2,
        width: "0%",
        background: "#2563EB",
        zIndex: 9999,
        opacity: 0,
        pointerEvents: "none",
      }}
    />
  );
}
