import { ToolsSidebar } from "@/components/layout/ToolsSidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Herramientas de IA recomendadas",
  description:
    "Las herramientas de IA que recomienda la comunidad de Ponte al dIA para escribir, programar, crear vídeo, voz e imágenes, con para qué sirve cada una.",
  alternates: { canonical: "/herramientas" },
};

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
