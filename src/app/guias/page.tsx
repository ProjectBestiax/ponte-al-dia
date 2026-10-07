import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { GUIDES } from "@/lib/guides";
import { GuidesGrid } from "./GuidesGrid";

export const metadata: Metadata = {
  title: "Guías: aprende a usar IA en tu profesión",
  description:
    "Tutoriales prácticos de IA por profesión: herramientas concretas, prompts listos para copiar y casos reales para abogados, periodistas, marketers, profesores y más.",
  alternates: { canonical: "/guias" },
  openGraph: {
    title: "Guías: aprende a usar IA en tu profesión",
    description:
      "Tutoriales prácticos de IA por profesión: herramientas, prompts y casos reales.",
    images: [
      {
        url: "/api/og?title=Gu%C3%ADas%20de%20IA%20por%20profesi%C3%B3n&emoji=%F0%9F%93%9A&category=Gu%C3%ADas",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Guías: aprende a usar IA en tu profesión",
    images: ["/api/og?title=Gu%C3%ADas%20de%20IA%20por%20profesi%C3%B3n&emoji=%F0%9F%93%9A&category=Gu%C3%ADas"],
  },
};

// Guías de herramientas (páginas propias, fuera de la plantilla por profesión).
const TOOL_GUIDES = [
  {
    href: "/guias/skills",
    icon: "🧩",
    title: "¿Qué es una skill de IA y cómo se crea?",
    text: "Qué son las skills y extensiones de IA, cómo se instalan en Claude, ChatGPT o Cursor y una plantilla para hacer la tuya.",
  },
  {
    href: "/guias/n8n",
    icon: "⚙️",
    title: "n8n en español: tu primera automatización con IA",
    text: "Qué es n8n, en qué se diferencia de Zapier y Make, y un tutorial para que la IA te resuma el correo cada mañana.",
  },
];

export default function GuiasPage() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Guías de IA por profesión",
    url: `${appUrl}/guias`,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: GUIDES.map((g, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: g.profession,
        url: `${appUrl}/guias/ia-para-${g.slug}`,
      })),
    },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: appUrl },
      { "@type": "ListItem", position: 2, name: "Guías", item: `${appUrl}/guias` },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbLd} />

      <div className="text-sm text-zinc-500 mb-4">
        <Link href="/" className="hover:text-zinc-700">Inicio</Link>
        {" › "}
        <span className="text-zinc-700">Guías</span>
      </div>

      <h1 className="text-3xl font-bold text-zinc-900" style={{ fontFamily: "var(--font-manrope)" }}>
        Aprende IA por tu profesión
      </h1>
      <p className="mt-2 text-zinc-500 max-w-2xl">
        Sin humo ni tecnicismos: herramientas que puedes probar hoy, prompts listos para
        copiar y casos reales de gente que hace lo mismo que tú. Elige tu profesión y empieza.
      </p>

      <div className="mt-8 grid sm:grid-cols-2 gap-4">
        {TOOL_GUIDES.map((g) => (
          <Link
            key={g.href}
            href={g.href}
            className="flex items-center gap-4 border border-zinc-200 rounded-xl p-5 hover:border-accent-300 hover:bg-zinc-50 transition-colors"
          >
            <div className="text-3xl">{g.icon}</div>
            <div className="min-w-0">
              <div className="font-bold text-zinc-900" style={{ fontFamily: "var(--font-manrope)" }}>
                {g.title}
              </div>
              <p className="text-sm text-zinc-500 mt-1">{g.text}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-6">
        <GuidesGrid guides={GUIDES} />
      </div>
    </div>
  );
}
