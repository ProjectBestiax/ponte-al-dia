import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { JsonLd } from "@/components/JsonLd";
import { ALL_GUIDES, getGuide } from "@/lib/guides";
import { PromptBlock } from "./PromptBlock";
import { GuideCta } from "./GuideCta";

export const dynamicParams = false;

interface PageProps {
  params: Promise<{ slug: string }>;
}

// El slug de la ruta incluye el prefijo SEO "ia-para-" (URL /guias/ia-para-abogados).
// El slug del dato es limpio ("abogados"), así que lo despojamos del prefijo.
const ROUTE_PREFIX = "ia-para-";
const toDataSlug = (routeSlug: string) => routeSlug.replace(/^ia-para-/, "");

export function generateStaticParams() {
  return ALL_GUIDES.map((g) => ({ slug: `${ROUTE_PREFIX}${g.slug}` }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(toDataSlug(slug));
  if (!guide) return { title: "Guía no encontrada" };

  const ogImage = `/api/og?title=${encodeURIComponent(guide.title)}&emoji=${encodeURIComponent(guide.icon)}&category=Gu%C3%ADas`;

  return {
    title: guide.title,
    description: guide.metaDescription,
    keywords: guide.keywords,
    alternates: { canonical: `/guias/ia-para-${guide.slug}` },
    openGraph: {
      type: "article",
      title: guide.title,
      description: guide.metaDescription,
      publishedTime: guide.updatedAt,
      modifiedTime: guide.updatedAt,
      images: [{ url: ogImage, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: guide.title,
      description: guide.metaDescription,
      images: [ogImage],
    },
  };
}

const INDEX_LINKS = [
  { id: "herramientas", label: "Herramientas que puedes probar hoy" },
  { id: "prompts", label: "Prompts listos para copiar" },
  { id: "caso-real", label: "Caso real" },
  { id: "errores", label: "Errores que evitar" },
  { id: "recursos", label: "Aprende más sin salir de Ponte al dIA" },
  { id: "faq", label: "Preguntas frecuentes" },
];

export default async function GuiaPage({ params }: PageProps) {
  const { slug } = await params;
  const guide = getGuide(toDataSlug(slug));
  if (!guide) notFound();

  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  const ogImageAbsolute = `${appUrl}/api/og?title=${encodeURIComponent(guide.title)}&emoji=${encodeURIComponent(guide.icon)}&category=Gu%C3%ADas`;

  const updatedDate = new Date(guide.updatedAt).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.metaDescription,
    datePublished: guide.updatedAt,
    dateModified: guide.updatedAt,
    author: { "@type": "Organization", name: "Ponte al dIA" },
    image: ogImageAbsolute,
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: guide.faqs.map((f) => ({
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
      { "@type": "ListItem", position: 3, name: guide.profession, item: `${appUrl}/guias/ia-para-${guide.slug}` },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <JsonLd data={articleLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbLd} />

      <div className="text-sm text-zinc-500 mb-4">
        <Link href="/guias" className="hover:text-zinc-700">← Todas las guías</Link>
      </div>

      <h1 className="text-3xl font-bold text-zinc-900" style={{ fontFamily: "var(--font-manrope)" }}>
        {guide.title}
      </h1>
      <p className="mt-2 text-zinc-500">{guide.subtitle}</p>
      <p className="mt-1 text-xs text-zinc-400">Actualizado: {updatedDate}</p>

      <div className="border border-zinc-200 rounded-xl p-4 mt-6">
        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-wide mb-2">Índice</p>
        <ul className="space-y-1.5 text-sm">
          {INDEX_LINKS.map((l) => (
            <li key={l.id}>
              <a href={`#${l.id}`} className="text-accent-700 hover:underline">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 space-y-4 text-zinc-700 leading-relaxed">
        {guide.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}
      </div>

      <section id="herramientas" className="mt-10">
        <h2 className="text-xl font-bold text-zinc-900" style={{ fontFamily: "var(--font-manrope)" }}>
          Herramientas que puedes probar hoy
        </h2>
        <div className="mt-4 space-y-4">
          {guide.tools.map((tool, i) => (
            <div key={i} className="border border-zinc-200 rounded-xl p-4">
              <h3 className="font-bold text-zinc-900">{tool.name}</h3>
              <p className="mt-1 text-sm text-zinc-700">
                <span className="font-semibold">Para qué:</span> {tool.forWhat}
              </p>
              <p className="mt-1 text-sm text-zinc-700">
                <span className="font-semibold">Precio:</span> {tool.price}
              </p>
              <p className="mt-3 text-sm font-semibold text-zinc-900">Cómo empezar</p>
              <ol className="mt-1 list-decimal list-inside text-sm text-zinc-700 space-y-1">
                {tool.steps.map((step, j) => (
                  <li key={j}>{step}</li>
                ))}
              </ol>
              <a
                href={tool.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-accent-700 hover:underline"
              >
                {tool.urlLabel ?? new URL(tool.url).hostname.replace("www.", "")}
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          ))}
        </div>
      </section>

      <section id="prompts" className="mt-10">
        <h2 className="text-xl font-bold text-zinc-900" style={{ fontFamily: "var(--font-manrope)" }}>
          Prompts listos para copiar
        </h2>
        <div className="mt-4 space-y-6">
          {guide.prompts.map((p, i) => (
            <div key={i}>
              <h3 className="font-bold text-zinc-900">
                {i + 1}. {p.title}
              </h3>
              <p className="mt-1 text-sm text-zinc-700">
                <span className="font-semibold">Cuándo usarlo:</span> {p.when}
              </p>
              <div className="mt-2">
                <PromptBlock text={p.prompt} />
              </div>
              <p className="mt-3 text-sm font-semibold text-zinc-900">Cómo personalizarlo</p>
              <ul className="mt-1 list-disc list-inside text-sm text-zinc-700 space-y-1">
                {p.customize.map((c, j) => (
                  <li key={j}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10">
        <GuideCta profession={guide.profession} variant="light" />
      </div>

      <section id="caso-real" className="mt-10">
        <h2 className="text-xl font-bold text-zinc-900" style={{ fontFamily: "var(--font-manrope)" }}>
          {guide.workflow.title}
        </h2>
        <p className="mt-3 text-sm text-zinc-700">
          <span className="font-semibold">Antes:</span> {guide.workflow.before}
        </p>
        <p className="mt-1 text-sm text-zinc-700">
          <span className="font-semibold">Después:</span> {guide.workflow.after}
        </p>
        <ol className="mt-3 list-decimal list-inside text-sm text-zinc-700 space-y-1.5">
          {guide.workflow.steps.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>

      <section id="errores" className="mt-10">
        <h2 className="text-xl font-bold text-zinc-900" style={{ fontFamily: "var(--font-manrope)" }}>
          Errores que evitar
        </h2>
        <div className="mt-4 space-y-3">
          {guide.mistakes.map((m, i) => (
            <div key={i} className="border border-zinc-200 rounded-xl p-4 text-sm">
              <p className="text-zinc-700">
                <span className="font-semibold">Error:</span> {m.mistake}
              </p>
              <p className="mt-1 text-zinc-700">
                <span className="font-semibold">Solución:</span> {m.solution}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section id="recursos" className="mt-10">
        <h2 className="text-xl font-bold text-zinc-900" style={{ fontFamily: "var(--font-manrope)" }}>
          Aprende más sin salir de Ponte al dIA
        </h2>
        <ul className="mt-4 space-y-2 text-sm">
          {guide.resources.map((r, i) => (
            <li key={i}>
              <Link href={r.href} className="font-medium text-accent-700 hover:underline">
                {r.label}
              </Link>{" "}
              <span className="text-zinc-500">— {r.note}</span>
            </li>
          ))}
        </ul>
      </section>

      <section id="faq" className="mt-10">
        <h2 className="text-xl font-bold text-zinc-900" style={{ fontFamily: "var(--font-manrope)" }}>
          Preguntas frecuentes
        </h2>
        <div className="mt-4 space-y-5">
          {guide.faqs.map((f, i) => (
            <div key={i}>
              <h3 className="font-bold text-zinc-900">{f.q}</h3>
              <p className="mt-1 text-sm text-zinc-700 leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-10">
        <GuideCta profession={guide.profession} variant="dark" />
      </div>
    </div>
  );
}
