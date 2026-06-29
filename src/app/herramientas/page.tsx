import { ToolsSidebar } from "@/components/layout/ToolsSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Herramientas IA · Ponte al dIA" };

export default function HerramientasPage() {
  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "28px 20px 96px", fontFamily: "var(--font-manrope)" }}>
      <h1 className="font-extrabold text-zinc-950" style={{ fontSize: 24 }}>
        Herramientas IA
      </h1>
      <p className="text-zinc-500 text-sm mt-1 mb-6 leading-relaxed">
        Las herramientas de IA que la comunidad usa y recomienda. Seleccionadas a mano, sin humo.
      </p>
      <ToolsSidebar />
    </div>
  );
}
