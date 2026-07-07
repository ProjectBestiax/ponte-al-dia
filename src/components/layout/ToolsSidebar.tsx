export type SidebarVariant = "vertical" | "horizontal";

const TOOLS = [
  {
    name: "Cursor",
    emoji: "⌨️",
    description: "El editor de código con IA más potente. Autocompleta, refactoriza y explica tu código.",
    cta: "Pruébalo gratis",
    href: "https://cursor.com", // sustituye por tu link de afiliado
    badge: "⭐ Favorito",
  },
  {
    name: "Perplexity Pro",
    emoji: "🔍",
    description: "Búsqueda con IA que cita fuentes reales. Respuestas sin alucinaciones.",
    cta: "Pruébalo",
    href: "https://perplexity.ai", // sustituye por tu link de afiliado
    badge: null,
  },
  {
    name: "ElevenLabs",
    emoji: "🎙️",
    description: "Voz artificial más realista del mercado. Clona tu voz en minutos.",
    cta: "Pruébalo gratis",
    href: "https://elevenlabs.io", // sustituye por tu link de afiliado
    badge: null,
  },
  {
    name: "Claude Pro",
    emoji: "🤖",
    description: "El modelo de IA más capaz para razonamiento, escritura y análisis.",
    cta: "Pruébalo",
    href: "https://claude.ai", // sustituye por tu link de afiliado
    badge: null,
  },
  {
    name: "Notion AI",
    emoji: "📝",
    description: "Tu workspace con IA integrada. Escribe, resume y organiza 10x más rápido.",
    cta: "Pruébalo gratis",
    href: "https://notion.so", // sustituye por tu link de afiliado (PartnerStack)
    badge: null,
  },
  {
    name: "Copy.ai",
    emoji: "✍️",
    description: "Genera textos de marketing, emails y contenido en segundos con IA.",
    cta: "Pruébalo gratis",
    href: "https://www.copy.ai", // sustituye por tu link de afiliado (45% recurrente)
    badge: null,
  },
  {
    name: "Jasper",
    emoji: "💡",
    description: "IA para marketing: crea campañas, copies y contenido de marca a escala.",
    cta: "Pruébalo gratis",
    href: "https://www.jasper.ai", // sustituye por tu link de afiliado (Impact, 25% recurrente)
    badge: null,
  },
  {
    name: "HeyGen",
    emoji: "🎬",
    description: "Crea vídeos con avatares IA. Traduce y clona tu voz a cualquier idioma.",
    cta: "Pruébalo gratis",
    href: "https://www.heygen.com", // sustituye por tu link de afiliado (20-25% recurrente)
    badge: null,
  },
  {
    name: "Synthesia",
    emoji: "🎥",
    description: "Genera vídeos profesionales con presentadores IA. Sin cámaras ni actores.",
    cta: "Pruébalo",
    href: "https://www.synthesia.io", // sustituye por tu link de afiliado (Rewardful, hasta $267/venta)
    badge: null,
  },
  {
    name: "Lovable",
    emoji: "💜",
    description: "Construye apps completas con IA. De idea a producto en minutos, sin código.",
    cta: "Pruébalo gratis",
    href: "https://lovable.dev", // sustituye por tu link de afiliado (20-30% recurrente)
    badge: null,
  },
  {
    name: "Writesonic",
    emoji: "⚡",
    description: "Escritura y SEO con IA. Artículos, landing pages y chatbots en un clic.",
    cta: "Pruébalo gratis",
    href: "https://writesonic.com", // sustituye por tu link de afiliado (20-30% recurrente, aprobación inmediata)
    badge: null,
  },
];

function ToolCard({ tool }: { tool: typeof TOOLS[0] }) {
  return (
    <a
      href={tool.href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="block bg-white border border-gray-200 rounded-lg p-3 hover:border-zinc-400 transition-all group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{tool.emoji}</span>
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
