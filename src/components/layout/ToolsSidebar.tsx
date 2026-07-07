export type SidebarVariant = "vertical" | "horizontal";

function favicon(domain: string) {
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
}

const TOOLS = [
  {
    name: "Cursor",
    icon: favicon("cursor.com"),
    description: "El editor de código con IA más potente. Autocompleta, refactoriza y explica tu código.",
    cta: "Pruébalo gratis",
    url: "https://cursor.com",
    affiliate: false,
    badge: "⭐ Favorito",
  },
  {
    name: "Perplexity Pro",
    icon: favicon("perplexity.ai"),
    description: "Búsqueda con IA que cita fuentes reales. Respuestas sin alucinaciones.",
    cta: "Pruébalo",
    url: "https://perplexity.ai",
    affiliate: false, // pendiente: link de Dub.co
    badge: null,
  },
  {
    name: "ElevenLabs",
    icon: favicon("elevenlabs.io"),
    description: "Voz artificial más realista del mercado. Clona tu voz en minutos.",
    cta: "Pruébalo gratis",
    url: "https://elevenlabs.io",
    affiliate: false, // pendiente: link de PartnerStack
    badge: null,
  },
  {
    name: "Claude Pro",
    icon: favicon("claude.ai"),
    description: "El modelo de IA más capaz para razonamiento, escritura y análisis.",
    cta: "Pruébalo",
    url: "https://claude.ai",
    affiliate: false,
    badge: null,
  },
  {
    name: "Notion AI",
    icon: favicon("notion.so"),
    description: "Tu workspace con IA integrada. Escribe, resume y organiza 10x más rápido.",
    cta: "Pruébalo gratis",
    url: "https://notion.so",
    affiliate: false, // pendiente: link de PartnerStack
    badge: null,
  },
  {
    name: "Copy.ai",
    icon: favicon("copy.ai"),
    description: "Genera textos de marketing, emails y contenido en segundos con IA.",
    cta: "Pruébalo gratis",
    url: "https://www.copy.ai",
    affiliate: false, // pendiente: 45% recurrente
    badge: null,
  },
  {
    name: "Jasper",
    icon: favicon("jasper.ai"),
    description: "IA para marketing: crea campañas, copies y contenido de marca a escala.",
    cta: "Pruébalo gratis",
    url: "https://www.jasper.ai",
    affiliate: false, // pendiente: Impact, 25% recurrente
    badge: null,
  },
  {
    name: "HeyGen",
    icon: favicon("heygen.com"),
    description: "Crea vídeos con avatares IA. Traduce y clona tu voz a cualquier idioma.",
    cta: "Pruébalo gratis",
    url: "https://www.heygen.com",
    affiliate: false, // pendiente: 20-25% recurrente
    badge: null,
  },
  {
    name: "Synthesia",
    icon: favicon("synthesia.io"),
    description: "Genera vídeos profesionales con presentadores IA. Sin cámaras ni actores.",
    cta: "Pruébalo",
    url: "https://www.synthesia.io",
    affiliate: false, // pendiente: Rewardful, hasta $267/venta
    badge: null,
  },
  {
    name: "Lovable",
    icon: favicon("lovable.dev"),
    description: "Construye apps completas con IA. De idea a producto en minutos, sin código.",
    cta: "Pruébalo gratis",
    url: "https://lovable.dev",
    affiliate: false, // pendiente: 20-30% recurrente
    badge: null,
  },
  {
    name: "Writesonic",
    icon: favicon("writesonic.com"),
    description: "Escritura y SEO con IA. Artículos, landing pages y chatbots en un clic.",
    cta: "Pruébalo gratis",
    url: "https://writesonic.com",
    affiliate: false, // pendiente: 20-30% recurrente, aprobación inmediata
    badge: null,
  },
];

function toolHref(tool: typeof TOOLS[0]) {
  if (tool.affiliate) return tool.url;
  return `/out?url=${encodeURIComponent(tool.url)}`;
}

function ToolCard({ tool }: { tool: typeof TOOLS[0] }) {
  const href = toolHref(tool);
  const isExternal = tool.affiliate;

  return (
    <a
      href={href}
      target={isExternal ? "_blank" : undefined}
      rel={isExternal ? "noopener noreferrer sponsored" : undefined}
      className="block bg-white border border-gray-200 rounded-lg p-3 hover:border-zinc-400 transition-all group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={tool.icon} alt={tool.name} width={20} height={20} className="rounded-[4px]" />
          <span className="font-medium text-sm text-zinc-900 group-hover:text-accent-700">
            {tool.name}
          </span>
        </div>
        {tool.badge && (
          <span className="text-xs bg-zinc-100 text-zinc-600 border border-zinc-200 rounded-full px-2 py-0.5 whitespace-nowrap">
            {tool.badge}
          </span>
        )}
      </div>
      <p className="text-xs text-zinc-500 mt-1.5 leading-relaxed">
        {tool.description}
      </p>
      <span className="inline-block mt-2 text-xs font-medium text-accent-700 group-hover:underline">
        {tool.cta} →
      </span>
    </a>
  );
}

export function ToolsSidebar({ variant = "vertical" }: { variant?: SidebarVariant }) {
  if (variant === "horizontal") {
    return (
      <div className="mt-6">
        <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider mb-2">
          Herramientas recomendadas
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
          {TOOLS.map((tool) => (
            <div key={tool.name} className="w-48 shrink-0 snap-start">
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
        <p className="text-xs text-zinc-400 mt-2">* Links de afiliado. Sin coste extra para ti.</p>
      </div>
    );
  }

  return (
    <aside className="space-y-3">
      <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wider px-1">
        Herramientas recomendadas
      </h2>
      {TOOLS.map((tool) => (
        <ToolCard key={tool.name} tool={tool} />
      ))}
      <p className="text-xs text-zinc-400 px-1 pt-1">
        * Links de afiliado. Sin coste extra para ti.
      </p>
    </aside>
  );
}
