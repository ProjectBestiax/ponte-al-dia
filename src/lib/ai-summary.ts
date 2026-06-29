import Anthropic from "@anthropic-ai/sdk";

// Haiku is fast and cheap — ideal for a one-sentence neutral TL;DR.
const MODEL = "claude-haiku-4-5-20251001";

const client = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

const SYSTEM = [
  "Eres editor de una comunidad de IA en español.",
  "Resume en UNA sola frase, clara y neutral, qué es este contenido y por qué puede interesar.",
  "Máximo 25 palabras. Sin marketing, sin opiniones, sin emojis, sin signos de exclamación.",
  "No empieces con 'Este post' ni 'Un artículo'. Ve directo al qué.",
  "Responde únicamente con la frase, sin comillas.",
].join(" ");

function domainOf(url?: string | null): string {
  if (!url) return "";
  try {
    return new URL(url).hostname.replace("www.", "");
  } catch {
    return "";
  }
}

/**
 * Generates a neutral one-sentence summary for a post. Returns null on any
 * failure (no API key, network error, empty response) so callers can degrade
 * gracefully — the summary is always optional.
 */
export async function generateAiSummary(input: {
  title: string;
  description?: string | null;
  url?: string | null;
}): Promise<string | null> {
  if (!client) return null;

  const domain = domainOf(input.url);
  const content = [
    `Título: ${input.title}`,
    input.description ? `Descripción: ${input.description}` : "",
    domain ? `Fuente: ${domain}` : "",
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 120,
      system: SYSTEM,
      messages: [{ role: "user", content }],
    });
    const text = msg.content.find((b) => b.type === "text");
    const summary = text && "text" in text ? text.text.trim() : "";
    if (!summary) return null;
    return summary.replace(/^["']|["']$/g, "").slice(0, 280);
  } catch {
    return null;
  }
}
