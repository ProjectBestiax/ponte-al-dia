import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PromptBlock } from "../[slug]/PromptBlock";

const UPDATED_AT = "2026-10-07";
const TITLE = "Qué es una skill de IA y cómo crear la tuya, paso a paso";
const DESCRIPTION =
  "Qué es una skill de IA, para qué sirve y cómo se instala en Claude, ChatGPT, Cursor y con MCP. Incluye una plantilla de SKILL.md lista para copiar. Sin tecnicismos.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "qué es una skill",
    "qué es una skill de ia",
    "skills claude",
    "cómo crear una skill",
    "cómo instalar skills",
    "agent skills",
    "skill.md",
    "skill vs mcp",
  ],
  alternates: { canonical: "/guias/skills" },
  openGraph: {
    type: "article",
    title: TITLE,
    description: DESCRIPTION,
    modifiedTime: UPDATED_AT,
    images: [
      {
        url: "/api/og?title=%C2%BFQu%C3%A9%20es%20una%20skill%20de%20IA%3F&emoji=%F0%9F%A7%A9&category=Gu%C3%ADas",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const USES = [
  {
    title: "Escribir con tu tono",
    text: "Le explicas una vez cómo hablas (tuteo, frases cortas, sin emojis) y todos los textos salen con tu voz.",
  },
  {
    title: "Revisar con tu checklist",
    text: "Un abogado revisa contratos siempre con los mismos puntos; una skill hace que la IA los repase todos, sin saltarse ninguno.",
  },
  {
    title: "Informes con formato fijo",
    text: "El informe semanal, el acta de la reunión o la ficha de producto salen siempre con la misma estructura.",
  },
  {
    title: "Normas de un proyecto",
    text: "En programación: el framework, las convenciones y lo que nunca debe tocar. Se acabó repetirlo en cada conversación.",
  },
];

const TOOLS = [
  {
    name: "Claude (Agent Skills)",
    color: "#D97757",
    what: "Carpetas con un archivo SKILL.md que Claude carga solo cuando la tarea lo necesita. Le dan capacidades nuevas sin reentrenar nada.",
    steps: [
      "En la app de Claude (web o escritorio): Ajustes → Capacidades → Skills, y sube la carpeta de la skill comprimida en .zip.",
      "En Claude Code: copia la carpeta en .claude/skills/ de tu proyecto, o en ~/.claude/skills/ para tenerla en todos.",
      "No hay que activarla a mano: Claude lee la descripción y la usa cuando la tarea encaja.",
    ],
    code: ".claude/skills/mi-skill/SKILL.md",
  },
  {
    name: "ChatGPT (GPTs e instrucciones)",
    color: "#10A37F",
    what: "Un GPT personalizado o tus instrucciones personalizadas: un asistente con un rol, un tono y unas reglas fijas.",
    steps: [
      "Abre Explorar GPTs → Crear, o ve a Configuración → Personalización.",
      "Describe el rol, el tono y las reglas que quieres que siga siempre.",
      "Guárdalo: aparece en tu barra lateral, listo para usar.",
    ],
    code: null,
  },
  {
    name: "Cursor / Windsurf (Rules)",
    color: "#3B82F6",
    what: "Reglas en texto que el editor añade a cada conversación del proyecto: convenciones, estilo de código, cosas que el agente no debe olvidar.",
    steps: [
      "En Cursor, crea la carpeta .cursor/rules/ con un archivo .mdc por regla (o usa Settings → Rules). El antiguo .cursorrules sigue funcionando.",
      "Escribe en lenguaje normal lo que quieres que respete: idioma, framework, patrones.",
      "Se aplica sola a las respuestas dentro de ese proyecto.",
    ],
    code: ".cursor/rules/estilo.mdc",
  },
  {
    name: "MCP (sirve para casi todas)",
    color: "#6366F1",
    what: "Un estándar abierto (Model Context Protocol) que conecta tu IA con herramientas externas: calendario, base de datos, GitHub… Funciona en Claude, ChatGPT, Cursor y más.",
    steps: [
      "Busca el servidor MCP que necesitas (muchas apps ya tienen uno oficial).",
      "Añádelo en los conectores de tu app o en su archivo de configuración (mcpServers).",
      "Reinicia la app: la IA ya puede usar esa herramienta dentro de la conversación.",
    ],
    code: '"mcpServers": { "github": { ... } }',
  },
];

const SKILL_TEMPLATE = `---
name: informe-semanal
description: Redacta el informe semanal del equipo con el formato de la empresa. Úsala cuando te pida "el informe de la semana" o me pases notas para resumir.
---

# Informe semanal

Cuando te pase mis notas de la semana:

1. Agrupa los puntos en: Hecho, En curso y Bloqueos.
2. Máximo 3 viñetas por bloque, una línea cada una.
3. Empieza con una frase de resumen para dirección.
4. Tono directo, sin adjetivos de relleno.
5. Si falta información para un bloque, pregúntamela antes de inventar.`;

const STEPS = [
  {
    title: "Elige una tarea que repites",
    text: "La mejor primera skill es algo que haces cada semana y siempre explicas igual: un informe, una revisión, un tipo de correo.",
  },
  {
    title: "Crea una carpeta con un archivo SKILL.md",
    text: "El nombre de la carpeta da igual (usa minúsculas y guiones). Dentro, un único archivo de texto llamado SKILL.md.",
  },
  {
    title: "Rellena la cabecera: name y description",
    text: "La descripción es lo más importante: es lo que lee la IA para decidir cuándo usarla. Di qué hace y en qué situaciones.",
  },
  {
    title: "Escribe las instrucciones como se las darías a una persona",
    text: "Pasos numerados, ejemplos de cómo quieres el resultado y qué hacer si falta información.",
  },
  {
    title: "Instálala y pruébala",
    text: "Pídele la tarea sin mencionar la skill. Si no la usa, mejora la descripción; si la usa mal, afina las instrucciones.",
  },
];

const COMPARISON = [
  { name: "Skill", what: "Enseña a la IA a hacer una tarea a tu manera.", when: "Procesos que repites: informes, revisiones, formatos." },
  { name: "MCP", what: "Le da acceso a una herramienta o a tus datos.", when: "Que la IA lea tu calendario, tu base de datos o tu CRM." },
  { name: "GPT / proyecto", what: "Un asistente con rol y documentos fijos.", when: "Un ayudante dedicado a un tema concreto." },
  { name: "Prompt", what: "Una instrucción para una sola conversación.", when: "Tareas puntuales que no vas a repetir." },
];

const FAQS = [
  {
    q: "¿Qué es una skill en inteligencia artificial?",
    a: "Una skill es un conjunto de instrucciones reutilizables, normalmente un archivo de texto, que le enseña a una IA a hacer una tarea concreta a tu manera. La instalas una vez y la IA la usa sola cuando la tarea encaja, sin que tengas que explicárselo en cada conversación.",
  },
  {
    q: "¿Hace falta saber programar para crear una skill?",
    a: "No. Una skill básica es un archivo SKILL.md escrito en lenguaje normal: una cabecera con nombre y descripción, y las instrucciones debajo. Solo las skills avanzadas incluyen código, por ejemplo scripts que la IA ejecuta.",
  },
  {
    q: "¿Qué diferencia hay entre una skill y un MCP?",
    a: "Una skill enseña a la IA cómo hacer una tarea; un MCP le da acceso a una herramienta o a datos externos, como tu calendario o una base de datos. Se complementan: una skill puede decirle a la IA cómo usar los datos que obtiene a través de un MCP.",
  },
  {
    q: "¿Las skills de Claude funcionan en ChatGPT?",
    a: "El formato SKILL.md nació en Claude, pero el contenido es texto normal, así que puedes reutilizar las mismas instrucciones como GPT personalizado o como reglas en Cursor. Lo que cambia es dónde se instalan, no lo que dicen.",
  },
  {
    q: "¿Es seguro instalar skills de otras personas?",
    a: "Revisa siempre lo que instalas. Una skill de solo texto es inofensiva, pero las que incluyen scripts pueden ejecutar código en tu equipo. Lee el SKILL.md y los archivos que trae antes de usarla, y prefiere fuentes conocidas.",
  },
];

const H2 = "font-extrabold text-zinc-950 mb-2";
const BODY = { fontSize: 15.5, lineHeight: 1.65 } as const;

export default function SkillsGuidePage() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const pageUrl = `${appUrl}/guias/skills`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: "2026-06-29",
    dateModified: UPDATED_AT,
    author: { "@type": "Organization", name: "Ponte al dIA" },
    mainEntityOfPage: pageUrl,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: appUrl },
      { "@type": "ListItem", position: 2, name: "Guías", item: `${appUrl}/guias` },
      { "@type": "ListItem", position: 3, name: "Qué es una skill", item: pageUrl },
    ],
  };

  const updatedDate = new Date(UPDATED_AT).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div style={{ maxWidth: 720, margin: "0 auto", padding: "28px 20px 80px", fontFamily: "var(--font-manrope)" }}>
      <JsonLd data={articleLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbLd} />

      <Link href="/guias" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors mb-5">
        <ArrowLeft className="w-4 h-4" /> Todas las guías
      </Link>

      <h1 className="font-extrabold text-zinc-950" style={{ fontSize: 28, lineHeight: 1.2 }}>
        ¿Qué es una skill de IA y cómo se crea?
      </h1>
      <p className="text-zinc-500 mt-2.5" style={{ fontSize: 16, lineHeight: 1.6 }}>
        Sin tecnicismos. Qué es, para qué sirve, cómo se instala en tu herramienta y cómo hacer la tuya
        en cinco minutos.
      </p>
      <p className="mt-1 text-xs text-zinc-400">Actualizado: {updatedDate}</p>

      <section className="mt-8">
        <h2 className={H2} style={{ fontSize: 19 }}>
          Qué es una skill, en una frase
        </h2>
        <p className="text-zinc-700" style={BODY}>
          Una <strong>skill</strong> (también la verás como extensión, rule o GPT) es un{" "}
          <strong>conjunto de instrucciones reutilizables</strong> que le das a tu IA para que sepa hacer algo
          concreto sin tener que explicárselo cada vez. Piensa en ella como una plantilla o un complemento: la
          pones una vez y la IA la usa siempre que haga falta.
        </p>
        <div className="mt-4 bg-teal-50 border border-teal-100 rounded-xl p-4">
          <p className="text-sm text-teal-900" style={{ lineHeight: 1.6 }}>
            <strong>No hace falta saber programar.</strong> La mayoría son archivos de texto donde explicas, en
            tu idioma, qué quieres que haga la IA.
          </p>
        </div>
      </section>

      <section className="mt-9">
        <h2 className={H2} style={{ fontSize: 19 }}>
          Para qué sirve: 4 ejemplos reales
        </h2>
        <div className="grid sm:grid-cols-2 gap-3 mt-3">
          {USES.map((u) => (
            <div key={u.title} className="rounded-xl p-4 border" style={{ borderColor: "#E4E4E7" }}>
              <h3 className="font-bold text-zinc-950" style={{ fontSize: 15 }}>{u.title}</h3>
              <p className="text-zinc-600 mt-1" style={{ fontSize: 14, lineHeight: 1.55 }}>{u.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-9">
        <h2 className={H2} style={{ fontSize: 19 }}>
          Cómo crear tu primera skill en 5 minutos
        </h2>
        <ol className="flex flex-col gap-3 mt-3">
          {STEPS.map((s, i) => (
            <li key={s.title} className="flex gap-3">
              <span
                className="shrink-0 flex items-center justify-center rounded-full bg-zinc-950 text-white font-bold"
                style={{ width: 22, height: 22, fontSize: 12, marginTop: 2 }}
              >
                {i + 1}
              </span>
              <div>
                <h3 className="font-bold text-zinc-950" style={{ fontSize: 15 }}>{s.title}</h3>
                <p className="text-zinc-600 mt-0.5" style={{ fontSize: 14.5, lineHeight: 1.6 }}>{s.text}</p>
              </div>
            </li>
          ))}
        </ol>
        <p className="text-zinc-700 mt-5 mb-2" style={BODY}>
          Plantilla de <code>SKILL.md</code> lista para copiar y adaptar:
        </p>
        <PromptBlock text={SKILL_TEMPLATE} />
      </section>

      <section className="mt-9">
        <h2 className="font-extrabold text-zinc-950 mb-1" style={{ fontSize: 19 }}>
          Cómo se instala según tu herramienta
        </h2>
        <p className="text-zinc-500 mb-5" style={{ fontSize: 14 }}>
          El concepto es el mismo; cada herramienta lo llama distinto.
        </p>

        <div className="flex flex-col gap-4">
          {TOOLS.map((tool) => (
            <div key={tool.name} className="border rounded-2xl p-5" style={{ borderColor: "#E4E4E7" }}>
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

      <section className="mt-9">
        <h2 className={H2} style={{ fontSize: 19 }}>
          Skill, MCP, GPT o prompt: ¿cuál uso?
        </h2>
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left" style={{ fontSize: 14 }}>
            <thead>
              <tr className="text-zinc-500 border-b" style={{ borderColor: "#E4E4E7" }}>
                <th className="py-2 pr-3 font-semibold">Qué</th>
                <th className="py-2 pr-3 font-semibold">Para qué sirve</th>
                <th className="py-2 font-semibold">Úsalo cuando…</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((c) => (
                <tr key={c.name} className="border-b align-top" style={{ borderColor: "#F4F4F5" }}>
                  <td className="py-2.5 pr-3 font-bold text-zinc-950 whitespace-nowrap">{c.name}</td>
                  <td className="py-2.5 pr-3 text-zinc-700">{c.what}</td>
                  <td className="py-2.5 text-zinc-600">{c.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-9">
        <h2 className={H2} style={{ fontSize: 19 }}>
          Dónde encontrar skills ya hechas
        </h2>
        <ul className="list-disc pl-5 text-zinc-700 flex flex-col gap-1.5" style={BODY}>
          <li>
            El repositorio oficial de Anthropic en GitHub (<code>anthropics/skills</code>), con ejemplos para
            documentos, hojas de cálculo y diseño.
          </li>
          <li>
            Las <Link href="/?categoria=skills" className="text-accent-700 font-semibold hover:underline">skills que
            comparte la comunidad de Ponte al dIA</Link>, cada una con su herramienta compatible.
          </li>
          <li>
            Las guías por profesión, como <Link href="/guias/ia-para-desarrolladores" className="text-accent-700 font-semibold hover:underline">IA
            para desarrolladores</Link> o <Link href="/guias/ia-para-marketers" className="text-accent-700 font-semibold hover:underline">IA
            para marketers</Link>, traen prompts que puedes convertir en skills.
          </li>
        </ul>
      </section>

      <section className="mt-9">
        <h2 className={H2} style={{ fontSize: 19 }}>
          Preguntas frecuentes
        </h2>
        <div className="flex flex-col gap-5 mt-3">
          {FAQS.map((f) => (
            <div key={f.q}>
              <h3 className="font-bold text-zinc-950" style={{ fontSize: 15.5 }}>{f.q}</h3>
              <p className="text-zinc-700 mt-1" style={{ fontSize: 14.5, lineHeight: 1.65 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-9 bg-zinc-950 rounded-2xl p-6 text-center">
        <p className="text-white font-bold" style={{ fontSize: 17 }}>
          ¿Has creado una skill que te ahorra tiempo? Compártela
        </p>
        <p className="text-zinc-400 mt-1.5 mb-4" style={{ fontSize: 14 }}>
          Explora las de la comunidad o publica la tuya. Es gratis.
        </p>
        <Link
          href="/?categoria=skills"
          className="inline-flex items-center gap-2 bg-white text-zinc-950 font-bold rounded-[11px] px-5 h-[42px] hover:bg-zinc-100 transition-colors"
          style={{ fontSize: 14.5 }}
        >
          Ver skills de la comunidad
        </Link>
      </section>
    </div>
  );
}
