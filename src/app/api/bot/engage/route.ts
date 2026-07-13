import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { AI_PERSONAS, AI_PERSONA_LIST } from "@/lib/ai-personas";
import { isBotAuthorized } from "@/lib/bot-auth";
import { calculateHotScore } from "@/lib/hot-score";
import Anthropic from "@anthropic-ai/sdk";

export const maxDuration = 120;
export const dynamic = "force-dynamic";

const MODEL = "claude-haiku-4-5-20251001";
const apiKey = process.env.ANTHROPIC_API_KEY;
const client = apiKey ? new Anthropic({ apiKey }) : null;

// --- Helpers ---

async function getOrCreatePersonaUser(persona: (typeof AI_PERSONA_LIST)[number]) {
  const existing = await db.user.findFirst({ where: { email: persona.email } });
  if (existing) return existing;
  return db.user.create({
    data: {
      email: persona.email,
      username: persona.username,
      name: persona.name,
      bio: persona.bio,
      isAI: true,
      aiPersona: persona.key,
      role: "USER",
    },
  });
}

// --- VOTING ---

const VOTE_WINDOW_HOURS = 48;
const MAX_VOTES_PER_PERSONA = 5;

async function runVoting() {
  const since = new Date(Date.now() - VOTE_WINDOW_HOURS * 60 * 60 * 1000);

  const recentPosts = await db.post.findMany({
    where: { status: "ACTIVE", createdAt: { gte: since } },
    orderBy: { createdAt: "desc" },
    take: 30,
    select: {
      id: true,
      title: true,
      voteCount: true,
      createdAt: true,
      userId: true,
      description: true,
      aiSummary: true,
    },
  });

  if (recentPosts.length === 0) return { voted: 0 };

  let totalVoted = 0;

  for (const persona of AI_PERSONA_LIST) {
    const user = await getOrCreatePersonaUser(persona);

    const alreadyVoted = await db.vote.findMany({
      where: { userId: user.id, postId: { in: recentPosts.map((p) => p.id) } },
      select: { postId: true },
    });
    const votedSet = new Set(alreadyVoted.map((v) => v.postId));

    const candidates = recentPosts.filter(
      (p) => p.userId !== user.id && !votedSet.has(p.id)
    );

    if (candidates.length === 0) continue;

    // Pick the best posts to upvote: use AI if available, otherwise top by description length
    let toVote: typeof candidates;
    if (client && candidates.length > 3) {
      toVote = await pickBestPosts(candidates, persona, MAX_VOTES_PER_PERSONA);
    } else {
      toVote = candidates.slice(0, MAX_VOTES_PER_PERSONA);
    }

    for (const post of toVote) {
      await db.vote.create({ data: { userId: user.id, postId: post.id, value: 1 } });
      const newVoteCount = post.voteCount + 1;
      await db.post.update({
        where: { id: post.id },
        data: {
          voteCount: newVoteCount,
          score: calculateHotScore(newVoteCount, post.createdAt),
        },
      });
      totalVoted++;
    }
  }

  return { voted: totalVoted };
}

async function pickBestPosts<T extends { id: string; title: string; description: string | null; aiSummary: string | null }>(
  candidates: T[],
  persona: (typeof AI_PERSONA_LIST)[number],
  max: number
): Promise<T[]> {
  if (!client) return candidates.slice(0, max);

  const list = candidates
    .map((p, i) => `${i + 1}. ${p.title}${p.aiSummary ? ` — ${p.aiSummary}` : ""}`)
    .join("\n");

  try {
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 200,
      system: `Eres ${persona.name}, editora de una comunidad de IA en español. Tu foco: ${persona.angle}. Selecciona los ${max} posts más interesantes y útiles para la comunidad. Responde SOLO con los números separados por comas (ej: 1,3,5). Nada más.`,
      messages: [{ role: "user", content: `Posts recientes:\n${list}` }],
    });

    const text =
      msg.content.find((b) => b.type === "text")?.type === "text"
        ? (msg.content.find((b) => b.type === "text") as { text: string }).text
        : "";
    const indices = text
      .match(/\d+/g)
      ?.map(Number)
      .filter((n) => n >= 1 && n <= candidates.length)
      .map((n) => n - 1)
      .slice(0, max);

    if (indices && indices.length > 0) {
      return indices.map((i) => candidates[i]);
    }
  } catch {
    // fallback
  }

  return candidates.slice(0, max);
}

// --- COMMENTING ---

const COMMENT_WINDOW_HOURS = 36;
const MAX_COMMENTS_PER_RUN = 4;
const MAX_REPLIES_PER_RUN = 2;

async function runCommenting() {
  if (!client) return { comments: 0, replies: 0, skipped: "no-api-key" };

  const since = new Date(Date.now() - COMMENT_WINDOW_HOURS * 60 * 60 * 1000);

  const recentPosts = await db.post.findMany({
    where: { status: "ACTIVE", createdAt: { gte: since } },
    orderBy: { createdAt: "desc" },
    take: 20,
    select: {
      id: true,
      title: true,
      description: true,
      aiSummary: true,
      userId: true,
      url: true,
      commentCount: true,
      user: { select: { id: true, isAI: true, aiPersona: true } },
      comments: {
        take: 10,
        select: {
          id: true,
          content: true,
          parentId: true,
          userId: true,
          user: { select: { isAI: true, aiPersona: true, name: true } },
        },
      },
    },
  });

  let commentsCreated = 0;
  let repliesCreated = 0;

  // Phase 1: New comments on posts with few/no comments
  const postsNeedingComments = recentPosts.filter(
    (p) => p.commentCount < 3
  );

  for (const post of postsNeedingComments) {
    if (commentsCreated >= MAX_COMMENTS_PER_RUN) break;

    // Pick a persona that didn't author the post and hasn't commented yet
    const commentedPersonas = new Set(
      post.comments
        .filter((c) => c.user.isAI && !c.parentId)
        .map((c) => c.user.aiPersona)
    );

    const availablePersonas = AI_PERSONA_LIST.filter(
      (p) =>
        p.key !== post.user.aiPersona && !commentedPersonas.has(p.key)
    );

    if (availablePersonas.length === 0) continue;

    const persona = availablePersonas[Math.floor(Math.random() * availablePersonas.length)];
    const user = await getOrCreatePersonaUser(persona);

    const comment = await generateComment(post, persona, null);
    if (!comment) continue;

    await db.comment.create({
      data: { content: comment, userId: user.id, postId: post.id },
    });
    await db.post.update({
      where: { id: post.id },
      data: { commentCount: { increment: 1 } },
    });
    commentsCreated++;
  }

  // Phase 2: Replies to existing comments (cross-persona conversations)
  const postsWithComments = recentPosts.filter(
    (p) => p.comments.some((c) => c.user.isAI && !c.parentId)
  );

  for (const post of postsWithComments) {
    if (repliesCreated >= MAX_REPLIES_PER_RUN) break;

    // Find comments from AI personas that have no replies from other personas
    const topLevelAiComments = post.comments.filter(
      (c) => c.user.isAI && !c.parentId
    );

    for (const parentComment of topLevelAiComments) {
      if (repliesCreated >= MAX_REPLIES_PER_RUN) break;

      const hasReply = post.comments.some(
        (c) => c.parentId === parentComment.id && c.user.isAI
      );
      if (hasReply) continue;

      // Pick a different persona to reply
      const replier = AI_PERSONA_LIST.find(
        (p) => p.key !== parentComment.user.aiPersona
      );
      if (!replier) continue;

      const user = await getOrCreatePersonaUser(replier);
      const reply = await generateComment(post, replier, parentComment);
      if (!reply) continue;

      await db.comment.create({
        data: {
          content: reply,
          userId: user.id,
          postId: post.id,
          parentId: parentComment.id,
        },
      });
      await db.post.update({
        where: { id: post.id },
        data: { commentCount: { increment: 1 } },
      });
      repliesCreated++;
    }
  }

  return {
    comments: commentsCreated,
    replies: repliesCreated,
    debug: {
      recentPosts: recentPosts.length,
      needingComments: postsNeedingComments.length,
      withAiComments: postsWithComments.length,
    },
  };
}

async function generateComment(
  post: { title: string; description: string | null; aiSummary: string | null; url: string | null },
  persona: (typeof AI_PERSONA_LIST)[number],
  replyTo: { content: string; user: { name: string | null } } | null
): Promise<string | null> {
  if (!client) return null;

  const context = [
    `Post: "${post.title}"`,
    post.aiSummary ? `Resumen: ${post.aiSummary}` : null,
    post.description ? `Descripción: ${post.description.slice(0, 300)}` : null,
  ]
    .filter(Boolean)
    .join("\n");

  const replyContext = replyTo
    ? `\n\nEstás respondiendo al comentario de ${replyTo.user.name}: "${replyTo.content}"`
    : "";

  const system = `Eres ${persona.name}, ${persona.bio.toLowerCase()}
Tu foco: ${persona.angle}.

Escribe ${replyTo ? "una respuesta al comentario" : "un comentario"} sobre este post. Reglas:
- Máximo 2 frases (40-80 palabras)
- Tono natural, como en un foro real: opinión breve, dato útil, pregunta genuina, o recomendación
- NO uses emojis excesivos (máximo 1 si encaja naturalmente)
- NO seas genérico ("¡Qué interesante!", "Gran post"). Sé específico sobre el contenido
- NO uses signos de exclamación dobles ni marketing
- Varía el estilo: a veces pregunta, a veces opina, a veces añade contexto
- Escribe en español natural${replyTo ? "\n- Responde al punto concreto del comentario, no repitas lo que ya dijo" : ""}`;

  try {
    const msg = await client.messages.create({
      model: MODEL,
      max_tokens: 200,
      system,
      messages: [{ role: "user", content: `${context}${replyContext}` }],
    });

    const text =
      msg.content.find((b) => b.type === "text")?.type === "text"
        ? (msg.content.find((b) => b.type === "text") as { text: string }).text
        : "";

    const cleaned = text.replace(/^["']|["']$/g, "").trim();
    if (cleaned.length < 10 || cleaned.length > 500) return null;
    return cleaned;
  } catch {
    return null;
  }
}

// --- Main handler ---

async function runBot(req: NextRequest) {
  if (!isBotAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const voteResult = await runVoting();
  const commentResult = await runCommenting();

  return NextResponse.json({
    ok: true,
    hasApiKey: !!apiKey,
    votes: voteResult,
    comments: commentResult,
  });
}

export async function POST(req: NextRequest) {
  return runBot(req);
}
export async function GET(req: NextRequest) {
  return runBot(req);
}
