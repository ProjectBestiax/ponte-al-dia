import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "¿Qué es una skill y cómo se instala?",
  description:
    "Guía sencilla y agnóstica: qué es una skill o extensión de IA, para qué sirve y cómo se instala en Claude, Cursor, ChatGPT y otras herramientas.",
};

const TOOLS = [
  {
    name: "Claude (Agent Skills)",
    color: "#D97757",
    what: "Carpetas con instrucciones (un archivo SKILL.md) que Claude carga cuando hacen falta. Le dan capacidades nuevas sin reentrenar nada.",
    steps: [
      "Crea la carpeta .claude/skills/ en tu proyecto (o en ~/.claude/skills para que esté siempre disponible).",
      "Dentro, una carpeta por skill con un archivo SKILL.md que describe qué hace y cuándo usarla.",
      "Claude la detecta sola y la usa cuando el contexto encaja. No hay que «activarla» a mano.",
    ],
    code: ".claude/skills/mi-skill/SKILL.md",
  },
  {
    name: "Cursor / Windsurf (Rules)",
    color: "#3B82F6",
    what: "Reglas en texto que el editor inyecta en cada conversación: convenciones, estilo de código, cosas que el agente debe recordar siempre.",
    steps: [
      "Crea un archivo .cursorrules en la raíz de tu proyecto (o usa Settings → Rules).",
      "Escribe en lenguaje natural lo que quieres que respete (idioma, framework, patrones).",
      "Se aplica automáticamente a todas las respuestas dentro de ese proyecto.",
    ],
    code: ".cursorrules",
  },
  {
    name: "ChatGPT (GPTs e instrucciones)",
    color: "#10A37F",
    what: "Un «GPT» personalizado o tus instrucciones personalizadas: un asistente preconfigurado con un rol, un tono y unas reglas fijas.",
    steps: [
      "Abre Explore GPTs → Create, o ve a Configuración → Instrucciones personalizadas.",
      "Describe el rol, el tono y las reglas que quieres que siga siempre.",
      "Guárdalo: aparece en tu barra lateral listo para usar cuando quieras.",
    ],
    code: null,
  },
  {
    name: "MCP (sirve para casi todas)",
    color: "#6366F1",
    what: "Un estándar abierto (Model Context Protocol) que conecta tu IA con herramientas externas: tu calendario, una base de datos, GitHub… Funciona en Claude, Cursor y más.",
    steps: [
      "Busca el servidor MCP que necesites (hay catálogos públicos).",
      "Añádelo al archivo de configuración de tu herramienta (mcpServers).",
      "Reinicia la app: la IA gana acceso a esa herramienta dentro de la conversación.",
    ],
    code: '"mcpServers": { "github": { ... } }',
  },
];

export default function SkillsGuidePage() {
  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px 80px", fontFamily: "var(--font-manrope)" }}>
      <Link href="/?categoria=skills" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors mb-5">
        <ArrowLeft className="w-4 h-4" /> Volver a Skills y extensiones
      </Link>

      <h1 className="font-extrabold text-zinc-950" style={{ fontSize: 28, lineHeight: 1.2 }}>
        ¿Qué es una skill y cómo se instala?
      </h1>
      <p className="text-zinc-500 mt-2.5" style={{ fontSize: 16, lineHeight: 1.6 }}>
        Sin tecnicismos. Da igual qué herramienta uses: aquí va el concepto y el cómo, paso a paso.
      </p>

      {/* Concepto */}
      <section className="mt-8">
        <h2 className="font-extrabold text-zinc-950 mb-2" style={{ fontSize: 19 }}>
          La idea en una frase
        </h2>
        <p className="text-zinc-700" style={{ fontSize: 15.5, lineHeight: 1.65 }}>
          Una <strong>skill</strong> (o extensión, rule, GPT…) es un <strong>conjunto de instrucciones
          reutilizables</strong> que le das a tu IA para que sepa hacer algo concreto sin tener que
          explicárselo cada vez. Piensa en ellas como <em>plantillas</em> o <em>complementos</em>: las
          pones una vez y la IA las usa siempre que hagan falta.
        </p>
        <div className="mt-4 bg-teal-50 border border-teal-100 rounded-xl p-4">
          <p className="text-sm text-teal-900" style={{ lineHeight: 1.6 }}>
            <strong>No hace falta saber programar</strong> para muchas de ellas. La mayoría son archivos
            de texto donde explicas, en tu idioma, qué quieres que la IA haga.
          </p>
        </div>
      </section>

      {/* Por herramienta */}
      <section className="mt-9">
        <h2 className="font-extrabold text-zinc-950 mb-1" style={{ fontSize: 19 }}>
          Cómo se instala según tu herramienta
        </h2>
        <p className="text-zinc-500 mb-5" style={{ fontSize: 14 }}>
          El concepto es el mismo; cada herramienta lo llama distinto.
        </p>

        <div className="flex flex-col gap-4">
          {TOOLS.map((tool) => (
            <div key={tool.name} className="border border-zinc-150 rounded-2xl p-5" style={{ borderColor: "#E4E4E7" }}>
              <div className="flex items-center gap-2.5 mb-2.5">
                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: tool.color }} />
                <h3 className="font-bold text-zinc-950" style={{ fontSize: 16 }}>{tool.name}</h3>
              </div>
              <p className="text-zinc-600 mb-3.5" style={{ fontSize: 14.5, lineHeight: 1.6 }}>{tool.what}</p>
              <ol className="flex flex-col gap-2">
                {tool.steps.map((step, i) => (
                  <li key={i} className="flex gap-2.5 text-zinc-700" style={{ fontSize: 14, lineHeight: 1.55 }}>
                    <span
                      className="shrink-0 flex items-center justify-center rounded-full text-white font-bold"
                      style={{ width: 19, height: 19, fontSize: 11, background: tool.color, marginTop: 1 }}
                    >
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
              {tool.code && (
                <div
                  className="mt-3.5 rounded-lg px-3 py-2 text-zinc-700 bg-zinc-50 border border-zinc-100 overflow-x-auto"
                  style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12.5 }}
                >
                  {tool.code}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="mt-9 bg-zinc-950 rounded-2xl p-6 text-center">
        <p className="text-white font-bold" style={{ fontSize: 17 }}>
          ¿Ya sabes cómo va? Explora las skills de la comunidad
        </p>
        <p className="text-zinc-400 mt-1.5 mb-4" style={{ fontSize: 14 }}>
          Cada una indica con qué herramienta es compatible.
        </p>
        <Link
          href="/?categoria=skills"
          className="inline-flex items-center gap-2 bg-white text-zinc-950 font-bold rounded-[11px] px-5 h-[42px] hover:bg-zinc-100 transition-colors"
          style={{ fontSize: 14.5 }}
        >
          Ver Skills y extensiones
        </Link>
      </section>
    </div>
  );
}
