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
}

export async function curate(input: {
  kind: "paper" | "repo";
  rawTitle: string;
  rawText: string; // abstract / repo description
  personaAngle: string;
}): Promise<CuratedItem | null> {
  if (!client) return null;

  const kindEs = input.kind === "paper" ? "un paper de investigación" : "un proyecto open-source";
  const system = `Eres un editor de una comunidad de IA en español (audiencia general hispanohablante interesada en IA, no solo académicos). Tu foco editorial: ${input.personaAngle}.

Te doy ${kindEs}. Decide si merece publicarse para esta audiencia: ACEPTA lo relevante, útil o interesante; RECHAZA lo hiper-nicho, incremental o de baja señal.

Si lo aceptas:
- "title": un titular en español claro y atractivo. Sin "[Paper]", sin jerga innecesaria, sin comillas. Máximo 90 caracteres.
- "summary": UNA frase de por qué importa. Máximo 25 palabras, neutral, sin marketing, sin emojis ni signos de exclamación.

Responde ÚNICAMENTE con JSON válido, sin texto alrededor:
{"accept": true|false, "title": "...", "summary": "..."}`;

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
    };
  } catch {
    return null;
  }
}
