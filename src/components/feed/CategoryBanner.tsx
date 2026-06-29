import Link from "next/link";
import { BookOpen, ArrowRight } from "lucide-react";

// Educational banners shown at the top of specific category feeds.
const BANNERS: Record<
  string,
  { icon: typeof BookOpen; title: string; cta: string; href: string; color: string; bg: string; border: string }
> = {
  skills: {
    icon: BookOpen,
    title: "¿No sabes qué es una skill o cómo instalarla?",
    cta: "Lee la guía",
    href: "/guias/skills",
    color: "#0F766E",
    bg: "#F0FDFA",
    border: "#99F6E4",
  },
};

export function CategoryBanner({ categorySlug }: { categorySlug?: string }) {
  const banner = categorySlug ? BANNERS[categorySlug] : undefined;
  if (!banner) return null;

  const Icon = banner.icon;
  return (
    <Link
      href={banner.href}
      className="flex items-center gap-3 rounded-[13px] px-4 py-3 mb-4 transition-colors group"
      style={{ background: banner.bg, border: `1px solid ${banner.border}`, fontFamily: "var(--font-manrope)" }}
    >
      <span
        className="flex items-center justify-center rounded-[9px] shrink-0"
        style={{ width: 34, height: 34, background: "#fff", border: `1px solid ${banner.border}` }}
      >
        <Icon className="w-[18px] h-[18px]" style={{ color: banner.color }} strokeWidth={2} />
      </span>
      <span className="flex-1 min-w-0 font-semibold" style={{ fontSize: 14, color: banner.color }}>
        {banner.title}
      </span>
      <span
        className="hidden sm:flex items-center gap-1 font-bold shrink-0"
        style={{ fontSize: 13, color: banner.color }}
      >
        {banner.cta}
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" strokeWidth={2.4} />
      </span>
      <ArrowRight className="sm:hidden w-4 h-4 shrink-0" style={{ color: banner.color }} strokeWidth={2.4} />
    </Link>
  );
}
