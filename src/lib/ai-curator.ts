import Anthropic from "@anthropic-ai/sdk";

// Curation for the AI editor personas: turns a raw source item (paper, repo…)
// into a decision + a clean Spanish headline + a "por qué importa" line.
// Mirrors the graceful-null pattern of ai-summary.ts (never throws).
const MODEL = "claude-haiku-4-5-20251001";
const apiKey = process.env.ANTHROPIC_API_KEY;
const client = apiKey ? new Anthropic({ apiKey }) : null;

export interface CuratedItem {
  accept: boolean; // false → don't publish (too niche / low signal)
  title: string; // Spanish headline, no "[Paper]" noise
  summary: string; // one sentence: why it matters
  description?: string; // 1-2 sentence Spanish description of the content
  categorySlug?: string; // optional override when the bot covers multiple categories
}

export async function curate(input: {
  kind: "paper" | "repo" | "news";
  rawTitle: string;
  rawText: string; // abstract / repo description
  personaAngle: string;
  categorySlugs?: string[];
}): Promise<CuratedItem | null> {
  if (!client) return null;

  const kindMap = { paper: "un paper de investigación", repo: "un proyecto open-source", news: "una noticia/recurso de IA" };
  const kindEs = kindMap[input.kind];

  const categoryInstruction = input.categorySlugs?.length
    ? `\n- "categorySlug": elige la categoría más adecuada entre: ${input.categorySlugs.join(", ")}`
    : "";
  const categoryJson = input.categorySlugs?.length ? ', "categorySlug": "..."' : "";

  const system = `Eres un editor de una comunidad de IA en español. Tu audiencia son profesionales hispanohablantes que quieren USAR la IA en su día a día, no leer papers académicos. Tu foco editorial: ${input.personaAngle}.

Te doy ${kindEs}. Decide si merece publicarse aplicando este filtro:

ACEPTA si el usuario puede HACER algo con esto:
- Herramientas que puede probar hoy
- Tutoriales, guías o recursos para aprender algo práctico
- Comparativas de herramientas (cuál usar y para qué)
- Técnicas o workflows que puede aplicar en su trabajo
- Noticias de gran impacto que afectan a cómo usamos la IA

RECHAZA sin dudarlo:
- Papers teóricos sin aplicación práctica clara
- Noticias de financiación, inversión o movimientos corporativos
- Benchmarks puros o mejoras incrementales
- Repos de GitHub sin documentación o sin caso de uso claro
- Cualquier cosa que un profesional no-técnico no pueda entender o aprovechar

Si lo aceptas:
- "title": titular SIEMPRE en español, orientado a la acción. Preferir formatos como "Cómo...", "X herramientas para...", "Guía de...". Sin "[Paper]", sin jerga innecesaria. Máximo 90 caracteres. NUNCA en inglés.
- "summary": UNA frase en español de para qué le sirve esto al usuario. Máximo 25 palabras. Formato: "Útil si quieres [caso de uso concreto]" o similar. Sin marketing, sin emojis.
- "description": 1-2 frases describiendo qué es, para qué sirve y cómo empezar a usarlo. Máximo 50 palabras. Práctica e informativa.${categoryInstruction}

Responde ÚNICAMENTE con JSON válido, sin texto alrededor:
{"accept": true|false, "title": "...", "summary": "...", "description": "..."${categoryJson}}`;

  try {
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 300,
      system,
      messages: [
        {
          role: "user",
          content: `Título original: ${input.rawTitle}\n\nContenido: ${(input.rawText || "").slice(0, 1500)}`,
        },
      ],
    });

    const text = msg.content.find((b) => b.type === "text")?.type === "text"
      ? (msg.content.find((b) => b.type === "text") as { text: string }).text
      : "";
    const jsonMatch = text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) return null;

    const parsed = JSON.parse(jsonMatch[0]) as Partial<CuratedItem>;
    if (typeof parsed.accept !== "boolean") return null;
    if (!parsed.accept) return { accept: false, title: "", summary: "" };
    if (!parsed.title || !parsed.summary) return null;

    return {
      accept: true,
      title: parsed.title.replace(/^["']|["']$/g, "").slice(0, 120),
      summary: parsed.summary.replace(/^["']|["']$/g, "").slice(0, 280),
      description: typeof parsed.description === "string"
        ? parsed.description.replace(/^["']|["']$/g, "").slice(0, 500)
        : undefined,
      categorySlug: typeof parsed.categorySlug === "string" ? parsed.categorySlug : undefined,
    };
  } catch {
    return null;
  }
}
