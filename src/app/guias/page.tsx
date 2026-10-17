import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { GUIDES } from "@/lib/guides";
import { GuidesGrid } from "./GuidesGrid";

export const metadata: Metadata = {
  title: "Guías: aprende a usar IA en tu profesión",
  description:
    "Tutoriales prácticos de IA por profesión: herramientas concretas, prompts listos para copiar y casos prácticos para abogados, periodistas, marketers, profesores y más.",
  alternates: { canonical: "/guias" },
  openGraph: {
    title: "Guías: aprende a usar IA en tu profesión",
    description:
      "Tutoriales prácticos de IA por profesión: herramientas, prompts y casos prácticos.",
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

// Qué trae cada guía por profesión (refleja las secciones de la plantilla /guias/[slug]).
const GUIDE_PARTS = [
  { title: "Herramientas", text: "4-6 herramientas con su precio, para qué sirven en tu trabajo y los primeros pasos para probarlas." },
  { title: "Prompts para copiar", text: "Instrucciones listas para pegar en ChatGPT, Claude o Gemini, con huecos en [MAYÚSCULAS] y cómo adaptarlas." },
  { title: "Caso práctico", text: "Un flujo de trabajo paso a paso: cómo se hacía antes, cómo queda con IA y dónde sigue haciendo falta revisión humana." },
  { title: "Errores comunes", text: "Lo que suele salir mal cuando se empieza a usar IA en esa profesión y cómo evitarlo." },
  { title: "Preguntas frecuentes", text: "Dudas típicas de tu sector: privacidad, límites legales, coste y si la IA te va a sustituir." },
];

const FAQS = [
  {
    q: "¿Necesito saber programar para seguir estas guías?",
    a: "No. Las guías por profesión están pensadas para usar herramientas desde el navegador o el móvil, sin código. Solo la guía de n8n entra en automatizaciones, y también se puede seguir sin programar.",
  },
  {
    q: "¿Qué herramienta de IA me conviene si estoy empezando?",
    a: "Un asistente general (ChatGPT, Claude o Gemini) en su versión gratuita basta para probar los prompts de cualquier guía. Las herramientas especializadas de cada profesión tienen sentido cuando ya sabes qué tarea quieres resolver.",
  },
  {
    q: "¿Puedo meter datos de clientes o pacientes en una IA?",
    a: "Con cuidado. Antes de pegar datos personales o confidenciales, revisa la política de privacidad de la herramienta y si usa tus conversaciones para entrenar. Lo más seguro es anonimizar: quitar nombres, DNI y cualquier dato que identifique a la persona.",
  },
  {
    q: "Mi profesión no tiene guía, ¿qué hago?",
    a: "Mira la de la profesión más parecida a la tuya: muchas tareas (redactar, resumir, preparar reuniones) se repiten entre sectores. Y si quieres una guía para tu profesión, proponla en los debates de la comunidad.",
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
    ],
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10">
      <JsonLd data={jsonLd} />
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={faqLd} />

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
        copiar y un caso práctico de tu día a día. Elige tu profesión y empieza.
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

      <section className="mt-14 max-w-3xl">
        <h2 className="text-xl font-bold text-zinc-900" style={{ fontFamily: "var(--font-manrope)" }}>
          Qué encontrarás en cada guía
        </h2>
        <p className="mt-2 text-zinc-600">
          Todas las guías por profesión siguen la misma estructura, para que puedas ir directo
          a lo que necesitas. Lo que cambia es el contenido: las herramientas, los prompts y el
          caso práctico están pensados para las tareas de esa profesión, no para &quot;cualquiera
          que use IA&quot;.
        </p>
        <ul className="mt-4 space-y-2">
          {GUIDE_PARTS.map((p) => (
            <li key={p.title} className="text-zinc-600">
              <span className="font-semibold text-zinc-900">{p.title}:</span> {p.text}
            </li>
          ))}
        </ul>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="text-xl font-bold text-zinc-900" style={{ fontFamily: "var(--font-manrope)" }}>
          Por dónde empezar si nunca has usado IA en el trabajo
        </h2>
        <ol className="mt-4 space-y-3 list-decimal pl-5 text-zinc-600">
          <li>
            <span className="font-semibold text-zinc-900">Elige una tarea que repitas cada semana.</span>{" "}
            Un correo que siempre redactas igual, un informe, un resumen de reunión. Mejor algo
            pequeño y aburrido que un proyecto entero.
          </li>
          <li>
            <span className="font-semibold text-zinc-900">Copia un prompt de tu guía y rellena los huecos.</span>{" "}
            Pruébalo en un asistente gratuito con un caso de verdad (sin datos personales) y
            compara el resultado con lo que habrías hecho tú.
          </li>
          <li>
            <span className="font-semibold text-zinc-900">Ajusta y guárdalo.</span>{" "}
            Si el resultado te sirve con pocos retoques, guarda el prompt y úsalo la próxima vez.
            Si no, cambia el contexto que le das: casi siempre el problema es que le falta información.
          </li>
        </ol>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="text-xl font-bold text-zinc-900" style={{ fontFamily: "var(--font-manrope)" }}>
          Tres reglas que valen para cualquier profesión
        </h2>
        <ul className="mt-4 space-y-3 text-zinc-600">
          <li>
            <span className="font-semibold text-zinc-900">Tú firmas el resultado.</span> La IA
            redacta, resume y propone; la responsabilidad de lo que envías, publicas o entregas
            sigue siendo tuya.
          </li>
          <li>
            <span className="font-semibold text-zinc-900">Comprueba datos, citas y fuentes.</span>{" "}
            Los modelos pueden inventar cifras, sentencias o referencias con total seguridad. Si
            un dato importa, verifícalo en la fuente original.
          </li>
          <li>
            <span className="font-semibold text-zinc-900">Cuidado con los datos de otros.</span>{" "}
            Clientes, pacientes, alumnos o candidatos: anonimiza antes de pegar nada y revisa qué
            hace la herramienta con lo que le das.
          </li>
        </ul>
      </section>

      <section className="mt-10 max-w-3xl">
        <h2 className="text-xl font-bold text-zinc-900" style={{ fontFamily: "var(--font-manrope)" }}>
          Preguntas frecuentes
        </h2>
        <div className="mt-4 space-y-5">
          {FAQS.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-zinc-900">{f.q}</h3>
              <p className="mt-1 text-zinc-600">{f.a}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-zinc-500">
          ¿Quieres comentar algo de una guía o proponer una nueva? Pásate por los{" "}
          <Link href="/debates" className="text-accent-600 hover:underline">debates de la comunidad</Link>.
        </p>
      </section>
    </div>
  );
}
