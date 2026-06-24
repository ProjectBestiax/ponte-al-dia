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
    href: "https://notion.so", // sustituye por tu link de afiliado
    badge: null,
  },
];

function ToolCard({ tool }: { tool: typeof TOOLS[0] }) {
  return (
    <a
      href={tool.href}
      target="_blank"
      rel="noopener noreferrer sponsored"
      className="block bg-white border border-gray-200 rounded-lg p-3 hover:border-indigo-300 hover:shadow-sm transition-all group"
    >
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{tool.emoji}</span>
          <span className="font-medium text-sm text-gray-900 group-hover:text-indigo-600">
            {tool.name}
          </span>
        </div>
        {tool.badge && (
          <span className="text-xs bg-amber-50 text-amber-700 border border-amber-200 rounded-full px-2 py-0.5 whitespace-nowrap">
            {tool.badge}
          </span>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-1.5 leading-relaxed">
        {tool.description}
      </p>
      <span className="inline-block mt-2 text-xs font-medium text-indigo-600 group-hover:underline">
        {tool.cta} →
      </span>
    </a>
  );
}

export function ToolsSidebar({ variant = "vertical" }: { variant?: SidebarVariant }) {
  if (variant === "horizontal") {
    return (
      <div className="mt-6">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
          Herramientas recomendadas
        </h2>
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-1 px-1 snap-x">
          {TOOLS.map((tool) => (
            <div key={tool.name} className="w-48 shrink-0 snap-start">
              <ToolCard tool={tool} />
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-2">* Links de afiliado. Sin coste extra para ti.</p>
      </div>
    );
  }

  return (
    <aside className="space-y-3">
      <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider px-1">
        Herramientas recomendadas
      </h2>
      {TOOLS.map((tool) => (
        <ToolCard key={tool.name} tool={tool} />
      ))}
      <p className="text-xs text-gray-400 px-1 pt-1">
        * Links de afiliado. Sin coste extra para ti.
      </p>
    </aside>
  );
}
