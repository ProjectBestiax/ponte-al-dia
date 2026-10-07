import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { PromptBlock } from "../[slug]/PromptBlock";

const UPDATED_AT = "2026-10-07";
const TITLE = "Qué es n8n y cómo usarlo con IA: guía en español paso a paso";
const DESCRIPTION =
  "Qué es n8n, para qué sirve, cuánto cuesta y en qué se diferencia de Zapier y Make. Con un tutorial para crear tu primera automatización con IA: un resumen diario de tu correo en Telegram.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "n8n",
    "qué es n8n",
    "n8n español",
    "n8n tutorial",
    "n8n con ia",
    "n8n vs zapier",
    "n8n gratis",
    "automatizar con ia",
  ],
  alternates: { canonical: "/guias/n8n" },
  openGraph: {
    type: "article",
    title: TITLE,
    description: DESCRIPTION,
    modifiedTime: UPDATED_AT,
    images: [
      {
        url: "/api/og?title=Qu%C3%A9%20es%20n8n%20y%20c%C3%B3mo%20usarlo%20con%20IA&emoji=%E2%9A%99%EF%B8%8F&category=Gu%C3%ADas",
        width: 1200,
        height: 630,
      },
    ],
  },
};

const USES = [
  { title: "Resúmenes automáticos", text: "Cada mañana, la IA lee tus correos o menciones y te manda lo importante en un mensaje." },
  { title: "Clasificar lo que entra", text: "Formularios, correos o tickets que la IA etiqueta y envía a la persona o hoja de cálculo correcta." },
  { title: "Contenido en cadena", text: "De una idea a un borrador de post, una imagen y una publicación programada, con tu revisión en medio." },
  { title: "Conectar apps sin programar", text: "Que un nuevo cliente en tu CRM cree su carpeta, su tarea y su correo de bienvenida." },
  { title: "Agentes de IA", text: "Un asistente que consulta tus documentos o tu base de datos y responde por Telegram, Slack o WhatsApp." },
];

const COMPARISON = [
  { name: "n8n", price: "Gratis si lo instalas tú; la nube es de pago", plus: "Código abierto, tus datos en tu servidor, muy flexible con IA", minus: "Curva de aprendizaje algo mayor; interfaz en inglés" },
  { name: "Zapier", price: "Plan gratis limitado; paga por tarea", plus: "El más fácil y con más integraciones", minus: "Se encarece rápido con mucho volumen" },
  { name: "Make", price: "Plan gratis limitado; paga por operación", plus: "Muy visual, buen punto medio", minus: "Sin opción de instalarlo en tu servidor" },
];

const STEPS = [
  {
    title: "Crea un workflow con un disparador programado",
    text: "Nuevo workflow → añade el nodo Schedule Trigger y ponlo a las 8:00 todos los días laborables.",
  },
  {
    title: "Lee los correos del último día",
    text: "Añade el nodo Gmail (operación Get Many) y conecta tu cuenta. En el filtro de búsqueda escribe newer_than:1d para traer solo lo reciente.",
  },
  {
    title: "Junta todos los correos en uno",
    text: "Añade el nodo Aggregate para que la IA reciba todos los correos de una vez y no uno por uno (así gastas una sola llamada).",
  },
  {
    title: "Pásaselos a la IA",
    text: "Añade el nodo Basic LLM Chain y, como modelo, OpenAI Chat Model o Anthropic Chat Model con tu clave de API. Pega el prompt de abajo.",
  },
  {
    title: "Envíate el resultado",
    text: "Añade el nodo Telegram (Send Message) con tu bot y tu chat ID. Sirven igual Slack, Gmail o WhatsApp.",
  },
  {
    title: "Prueba y actívalo",
    text: "Pulsa Execute workflow para probarlo con datos reales. Si el resumen te sirve, activa el workflow: desde ese momento corre solo.",
  },
];

const PROMPT = `Eres mi asistente. Te paso los correos que he recibido en las últimas 24 horas.

Hazme un resumen en español con este formato:
1. URGENTE: lo que tengo que responder hoy (remitente + qué piden, una línea cada uno).
2. IMPORTANTE: lo que debo leer esta semana.
3. Lo demás, agrupado en una sola línea (newsletters, notificaciones, publicidad).

Reglas:
- Máximo 15 líneas en total.
- No inventes nada que no esté en los correos.
- Si no hay nada urgente, dilo en una frase.

Correos:
{{ $json.data }}`;

const MISTAKES = [
  { mistake: "Dejar el workflow sin activar.", solution: "Ejecutarlo a mano solo lo prueba. Hasta que no pulsas Activate, no corre según el horario." },
  { mistake: "Mandar a la IA un correo por llamada.", solution: "Usa Aggregate antes del nodo de IA: una sola llamada con todo es más barata y da mejor resumen." },
  { mistake: "Meter datos sensibles en la nube sin pensarlo.", solution: "Si manejas datos de clientes o salud, instala n8n en tu propio servidor y revisa qué envías al proveedor de IA." },
  { mistake: "Bucles que gastan tokens sin control.", solution: "Pon límites (número de elementos, horario) y revisa la pestaña Executions los primeros días." },
];

const FAQS = [
  {
    q: "¿Qué es n8n?",
    a: "n8n es una herramienta de automatización de código abierto que conecta aplicaciones mediante flujos visuales hechos con nodos. Cada nodo es un paso (leer un correo, llamar a una IA, guardar en una hoja de cálculo) y juntos forman un workflow que se ejecuta solo.",
  },
  {
    q: "¿n8n es gratis?",
    a: "La versión que instalas en tu ordenador o servidor (Community Edition) es gratis. n8n Cloud, la versión alojada por n8n, es de pago, con una prueba gratuita. Además, si usas modelos de IA como OpenAI o Claude, pagas su API aparte.",
  },
  {
    q: "¿Necesito saber programar para usar n8n?",
    a: "No para lo básico: los workflows se montan arrastrando nodos y rellenando campos. Saber un poco de JSON o JavaScript ayuda para transformar datos, y hay un nodo Code para quien quiera escribir código.",
  },
  {
    q: "¿n8n está en español?",
    a: "La interfaz de n8n está en inglés, pero los textos que procesas y generas pueden estar en cualquier idioma. Con los nombres de los nodos de esta guía puedes seguir el tutorial sin problema.",
  },
  {
    q: "¿Qué es mejor, n8n o Zapier?",
    a: "Zapier es más fácil para empezar y tiene más integraciones. n8n sale más barato con mucho volumen, permite guardar los datos en tu propio servidor y es más flexible para crear agentes de IA. Si solo vas a conectar dos apps, Zapier; si quieres automatizar en serio con IA, n8n.",
  },
];

const H2 = "font-extrabold text-zinc-950 mb-2";
const BODY = { fontSize: 15.5, lineHeight: 1.65 } as const;
const LINK = "text-accent-700 font-semibold hover:underline";

export default function N8nGuidePage() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const pageUrl = `${appUrl}/guias/n8n`;

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: TITLE,
    description: DESCRIPTION,
    datePublished: UPDATED_AT,
    dateModified: UPDATED_AT,
    author: { "@type": "Organization", name: "Ponte al dIA" },
    mainEntityOfPage: pageUrl,
  };

  const howToLd = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Cómo crear un resumen diario de tu correo con IA en n8n",
    step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.text })),
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
      { "@type": "ListItem", position: 3, name: "Qué es n8n", item: pageUrl },
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
      <JsonLd data={howToLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbLd} />

      <Link href="/guias" className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-800 transition-colors mb-5">
        <ArrowLeft className="w-4 h-4" /> Todas las guías
      </Link>

      <h1 className="font-extrabold text-zinc-950" style={{ fontSize: 28, lineHeight: 1.2 }}>
        n8n en español: qué es y cómo crear tu primera automatización con IA
      </h1>
      <p className="text-zinc-500 mt-2.5" style={{ fontSize: 16, lineHeight: 1.6 }}>
        Qué es, cuánto cuesta, en qué se diferencia de Zapier y Make, y un tutorial para que la IA te resuma
        el correo cada mañana.
      </p>
      <p className="mt-1 text-xs text-zinc-400">Actualizado: {updatedDate}</p>

      <section className="mt-8">
        <h2 className={H2} style={{ fontSize: 19 }}>
          Qué es n8n, en una frase
        </h2>
        <p className="text-zinc-700" style={BODY}>
          <strong>n8n</strong> es una herramienta de automatización de <strong>código abierto</strong> que conecta
          tus aplicaciones con flujos visuales: cada caja (nodo) es un paso, como leer un correo, pedirle algo a
          una IA o guardar una fila en una hoja de cálculo. Montas el flujo una vez y se ejecuta solo.
        </p>
        <div className="mt-4 bg-teal-50 border border-teal-100 rounded-xl p-4">
          <p className="text-sm text-teal-900" style={{ lineHeight: 1.6 }}>
            <strong>Lo que lo hace distinto:</strong> puedes instalarlo gratis en tu propio ordenador o servidor,
            y tiene nodos de IA (modelos, agentes, memoria) integrados de serie.
          </p>
        </div>
      </section>

      <section className="mt-9">
        <h2 className={H2} style={{ fontSize: 19 }}>
          Para qué sirve n8n: 5 ejemplos
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
          n8n vs Zapier vs Make
        </h2>
        <div className="overflow-x-auto mt-3">
          <table className="w-full text-left" style={{ fontSize: 14 }}>
            <thead>
              <tr className="text-zinc-500 border-b" style={{ borderColor: "#E4E4E7" }}>
                <th className="py-2 pr-3 font-semibold">Herramienta</th>
                <th className="py-2 pr-3 font-semibold">Precio</th>
                <th className="py-2 pr-3 font-semibold">A favor</th>
                <th className="py-2 font-semibold">En contra</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.map((c) => (
                <tr key={c.name} className="border-b align-top" style={{ borderColor: "#F4F4F5" }}>
                  <td className="py-2.5 pr-3 font-bold text-zinc-950 whitespace-nowrap">{c.name}</td>
                  <td className="py-2.5 pr-3 text-zinc-700">{c.price}</td>
                  <td className="py-2.5 pr-3 text-zinc-700">{c.plus}</td>
                  <td className="py-2.5 text-zinc-600">{c.minus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-9">
        <h2 className={H2} style={{ fontSize: 19 }}>
          Cómo empezar: 3 formas de tener n8n
        </h2>
        <ol className="list-decimal pl-5 text-zinc-700 flex flex-col gap-2" style={BODY}>
          <li>
            <strong>n8n Cloud</strong>: te registras en n8n.io y lo usas desde el navegador. Lo más rápido para
            probar, con prueba gratuita.
          </li>
          <li>
            <strong>En tu ordenador</strong>: si tienes Node.js instalado, abre una terminal, escribe{" "}
            <code>npx n8n</code> y entra en <code>http://localhost:5678</code>.
          </li>
          <li>
            <strong>En tu servidor con Docker</strong>: la opción para dejarlo funcionando siempre y con tus datos
            bajo control.
          </li>
        </ol>
        <div className="mt-3">
          <PromptBlock text="docker run -it --rm --name n8n -p 5678:5678 -v n8n_data:/home/node/.n8n docker.n8n.io/n8nio/n8n" />
        </div>
      </section>

      <section className="mt-9">
        <h2 className={H2} style={{ fontSize: 19 }}>
          Tutorial: un resumen diario de tu correo con IA, en Telegram
        </h2>
        <p className="text-zinc-700 mb-3" style={BODY}>
          Cada mañana a las 8:00, n8n lee los correos del último día, se los pasa a la IA y te manda un resumen
          con lo urgente. Unos 15 minutos de montaje.
        </p>
        <ol className="flex flex-col gap-3">
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
          Prompt para el nodo de IA (cópialo tal cual y ajusta el formato a tu gusto):
        </p>
        <PromptBlock text={PROMPT} />
      </section>

      <section className="mt-9">
        <h2 className={H2} style={{ fontSize: 19 }}>
          Errores que evitar
        </h2>
        <div className="flex flex-col gap-3 mt-3">
          {MISTAKES.map((m) => (
            <div key={m.mistake} className="border rounded-xl p-4" style={{ borderColor: "#E4E4E7", fontSize: 14.5, lineHeight: 1.6 }}>
              <p className="text-zinc-800"><strong>Error:</strong> {m.mistake}</p>
              <p className="text-zinc-600 mt-1"><strong>Solución:</strong> {m.solution}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-9">
        <h2 className={H2} style={{ fontSize: 19 }}>
          Sigue aprendiendo
        </h2>
        <ul className="list-disc pl-5 text-zinc-700 flex flex-col gap-1.5" style={BODY}>
          <li>
            <Link href="/?categoria=agentes-y-automatizacion" className={LINK}>Agentes y automatización</Link>: los
            workflows y herramientas que comparte la comunidad.
          </li>
          <li>
            <Link href="/guias/skills" className={LINK}>Qué es una skill de IA</Link>: la otra forma de enseñar
            a tu IA a hacer tareas repetidas.
          </li>
          <li>
            Guías con casos de automatización por profesión:{" "}
            <Link href="/guias/ia-para-marketers" className={LINK}>marketers</Link>,{" "}
            <Link href="/guias/ia-para-community-managers" className={LINK}>community managers</Link> y{" "}
            <Link href="/guias/ia-para-gestores" className={LINK}>gestores</Link>.
          </li>
        </ul>
      </section>

      <section className="mt-9">
        <h2 className={H2} style={{ fontSize: 19 }}>
          Preguntas frecuentes sobre n8n
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
          ¿Has montado una automatización que te ahorra horas? Compártela
        </p>
        <p className="text-zinc-400 mt-1.5 mb-4" style={{ fontSize: 14 }}>
          La comunidad comparte workflows, prompts y trucos. Es gratis.
        </p>
        <Link
          href="/?categoria=agentes-y-automatizacion"
          className="inline-flex items-center gap-2 bg-white text-zinc-950 font-bold rounded-[11px] px-5 h-[42px] hover:bg-zinc-100 transition-colors"
          style={{ fontSize: 14.5 }}
        >
          Ver automatizaciones de la comunidad
        </Link>
      </section>
    </div>
  );
}
