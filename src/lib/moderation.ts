import Anthropic from "@anthropic-ai/sdk";
import { db } from "@/lib/db";
import { generateAiSummary } from "@/lib/ai-summary";
import { notifyKeywordMatches } from "@/lib/notifications";

// Haiku: barato y rápido, suficiente para una revisión leve de normas.
const MODEL = "claude-haiku-4-5-20251001";

const client = process.env.ANTHROPIC_API_KEY
  ? new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
  : null;

const SYSTEM = [
  "Eres moderador de Ponte al dIA, una comunidad de IA en español.",
  "Revisas enlaces/posts que envían los usuarios. Normas principales:",
  "1) Respeto: sin insultos ni ataques personales.",
  "2) Sin discurso de odio ni discriminación.",
  "3) Sin spam, publicidad engañosa ni estafas.",
  "4) Nada ilegal.",
  "5) El contenido debe tratar de IA, tecnología o su aplicación profesional.",
  "Es una revisión LEVE: aprueba por defecto. Marca 'hold' (revisión humana) SOLO",
  "si hay un problema claro con alguna norma o dudas razonables. Nunca rechaces:",
  "si dudas, usa 'hold'.",
  'Responde ÚNICAMENTE con JSON válido: {"decision":"approve"|"hold","reason":"motivo breve"}',
].join(" ");

export type ModerationDecision = { decision: "approve" | "hold"; reason: string };

/**
 * Revisión leve de un post con IA. Fail-safe: ante cualquier fallo (sin API
 * key, error de red, respuesta no parseable) devuelve "hold" para que el post
 * quede en la cola de revisión manual — nunca se auto-aprueba a ciegas.
 */
export async function reviewPost(input: {
  title: string;
  description?: string | null;
  url?: string | null;
}): Promise<ModerationDecision> {
  if (!client) return { decision: "hold", reason: "Sin API key: revisión manual" };

  const content = [
    `Título: ${input.title}`,
    input.description ? `Descripción: ${input.description}` : null,
    input.url ? `URL: ${input.url}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  try {
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 200,
      system: SYSTEM,
      messages: [{ role: "user", content }],
    });

    const text = msg.content
      .map((b) => (b.type === "text" ? b.text : ""))
      .join("")
      .trim();

    const match = text.match(/\{[\s\S]*\}/);
    if (!match) return { decision: "hold", reason: "Respuesta no interpretable" };

    const parsed = JSON.parse(match[0]) as Partial<ModerationDecision>;
    // Solo "approve" explícito aprueba; cualquier otra cosa → revisión manual.
    if (parsed.decision === "approve") {
      return { decision: "approve", reason: parsed.reason ?? "Cumple las normas" };
    }
    return { decision: "hold", reason: parsed.reason ?? "Requiere revisión humana" };
  } catch {
    return { decision: "hold", reason: "Error de revisión: queda para revisión manual" };
  }
}

/**
 * Aprueba un post: lo pasa a ACTIVE, genera su resumen IA si falta y dispara
 * las notificaciones por keyword. Lógica compartida entre la moderación manual
 * (panel admin) y el moderador automático, para que no se desincronicen.
 */
export async function approvePost(id: string): Promise<void> {
  await db.post.update({
    where: { id },
    data: { status: "ACTIVE", publishedAt: new Date() },
  });

  const post = await db.post.findUnique({
    where: { id },
    select: { title: true, description: true, url: true, aiSummary: true, userId: true },
  });
  if (!post) return;

  if (!post.aiSummary) {
    const summary = await generateAiSummary(post);
    if (summary) {
      await db.post.update({ where: { id }, data: { aiSummary: summary } });
    }
  }

  await notifyKeywordMatches({
    id,
    title: post.title,
    description: post.description,
    userId: post.userId,
  });
}

/**
 * Moderador automático: revisa un post pendiente y lo aprueba si cumple las
 * normas. Si es dudoso, lo deja en PENDING para revisión manual. Pensado para
 * ejecutarse en segundo plano (after()) al publicar.
 */
export async function runAutoModeration(
  id: string,
  input: { title: string; description?: string | null; url?: string | null }
): Promise<ModerationDecision> {
  const verdict = await reviewPost(input);
  if (verdict.decision === "approve") {
    await approvePost(id);
  }
  return verdict;
}
