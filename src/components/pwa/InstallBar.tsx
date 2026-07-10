import Link from "next/link";
import { Smartphone } from "lucide-react";

/**
 * Cinta fina negra, solo mobile, que lleva a /instalar.
 * Se oculta automáticamente si la web ya está instalada (modo standalone).
 */
export function InstallBar() {
  return (
    <Link
      href="/instalar"
      className="md:hidden [@media(display-mode:standalone)]:hidden -mx-4 mb-2.5 flex items-center justify-center gap-2 bg-zinc-950 text-white h-[30px] text-[11.5px] font-bold tracking-wide"
      style={{ fontFamily: "var(--font-manrope)" }}
    >
      <Smartphone className="w-3.5 h-3.5" />
      Crear acceso directo en tu móvil
      <span aria-hidden className="text-zinc-400">→</span>
    </Link>
  );
}
