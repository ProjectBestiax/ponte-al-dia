// Contrato de datos de las Guías de IA por profesión.
// El contenido de cada guía es DATO puro (un objeto GuideContent por profesión en
// src/lib/guides/data/{slug}.ts). Una única plantilla los renderiza, garantizando
// SEO y layout consistentes. Añadir una guía = crear un fichero de datos y registrarlo.

/** Una herramienta recomendada dentro de la guía. */
export interface GuideTool {
  name: string;
  /** "Para qué" — caso de uso en 1-2 frases. */
  forWhat: string;
  /** "Freemium" | "Gratuita" | "€X/mes" | "Desde €X/mes"… */
  price: string;
  /** "Cómo empezar" — pasos concretos. */
  steps: string[];
  url: string;
  /** Etiqueta opcional del enlace (por defecto, el dominio). */
  urlLabel?: string;
}

/** Un prompt listo para copiar, específico de la profesión. */
export interface GuidePrompt {
  /** Título corto y descriptivo (sin "Prompt N:", la plantilla numera). */
  title: string;
  /** "Cuándo usarlo" — una frase. */
  when: string;
  /** El texto del prompt, copiable. Usa [VARIABLES] en mayúsculas para los huecos. */
  prompt: string;
  /** "Cómo personalizarlo" — qué cambiar. */
  customize: string[];
}

/** El caso real / workflow paso a paso. */
export interface GuideWorkflow {
  /** "Caso real: Cómo [profesional] redujo [tiempo] con IA". */
  title: string;
  /** "Antes": X horas haciendo Y. */
  before: string;
  /** "Después": Z minutos + revisión. */
  after: string;
  /** Pasos numerados del workflow. */
  steps: string[];
}

/** Un error común y su solución. */
export interface GuideMistake {
  mistake: string;
  solution: string;
}

/** Un recurso interno recomendado (post, debate, otra guía, tutorial). */
export interface GuideResource {
  label: string;
  href: string;
  /** Nota corta de por qué es útil. */
  note: string;
}

/** Una pregunta frecuente (alimenta el FAQPage schema + sección visible). */
export interface GuideFaq {
  q: string;
  a: string;
}

/** Metadatos ligeros para la landing/registro (sin el cuerpo completo). */
export interface GuideMeta {
  /** Slug ASCII para la URL: /guias/ia-para-{slug}. Ej: "abogados", "disenadores". */
  slug: string;
  /** Nombre visible de la profesión. Ej: "Abogados", "Diseñadores". */
  profession: string;
  /** Emoji identificativo. */
  icon: string;
  /** Frase gancho de 1 línea para la tarjeta. */
  tagline: string;
}

/** El contenido completo de una guía. */
export interface GuideContent extends GuideMeta {
  // ── SEO ──
  /** H1 y meta title. Ej: "IA para Abogados: herramientas para automatizar tu práctica legal". */
  title: string;
  metaDescription: string;
  keywords: string[];
  /** Fecha ISO (YYYY-MM-DD) de última actualización. */
  updatedAt: string;

  // ── Cuerpo ──
  /** Subtítulo gris bajo el H1. */
  subtitle: string;
  /** Párrafos de introducción (2-3). */
  intro: string[];
  /** 4-6 herramientas. */
  tools: GuideTool[];
  /** 3-5 prompts copiables. */
  prompts: GuidePrompt[];
  /** El caso real. */
  workflow: GuideWorkflow;
  /** 3-4 errores comunes. */
  mistakes: GuideMistake[];
  /** Recursos internos recomendados. */
  resources: GuideResource[];
  /** 3-5 preguntas frecuentes (SEO: FAQPage). */
  faqs: GuideFaq[];
}
