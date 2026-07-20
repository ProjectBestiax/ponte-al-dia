import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { AI_PERSONAS } from "@/lib/ai-personas";
import { curate } from "@/lib/ai-curator";
import { notifyKeywordMatches } from "@/lib/notifications";
import { fetchOgImage } from "@/lib/og-image";
import { isBotAuthorized } from "@/lib/bot-auth";

export const maxDuration = 60;

// Leo curates open-source: publish few, well-titled repos worth trying.
const PERSONA = AI_PERSONAS.leo;
const MAX_PUBLISH = 2;

const AI_KEYWORDS = ["llm", "ai", "gpt", "claude", "gemini", "diffusion", "transformer",
  "embedding", "rag", "agent", "langchain", "openai", "anthropic", "ollama", "ml",
  "neural", "inference", "fine-tun", "vector", "multimodal", "mistral", "stable-diffusion",
  "copilot", "chatbot", "nlp", "computer-vision", "deep-learning", "machine-learning"];

function isAIRelated(text: string): boolean {
  const lower = text.toLowerCase();
  return AI_KEYWORDS.some((kw) => lower.includes(kw));
}

async function fetchGitHubAIRepos(): Promise<{ title: string; url: string; description: string }[]> {
  // Búsqueda de repos de IA populares actualizados recientemente
  const queries = [
    "topic:llm+topic:ai-agent",
    "topic:large-language-models",
    "topic:generative-ai",
    "topic:rag+topic:llm",
  ];

  const results: { title: string; url: string; description: string }[] = [];

  for (const q of queries) {
    const url = `https://api.github.com/search/repositories?q=${q}&sort=stars&order=desc&per_page=5`;
    const res = await fetch(url, {
      headers: {
        "User-Agent": "PonteAlDIA/1.0",
        Accept: "application/vnd.github+json",
      },
      signal: AbortSignal.timeout(8000),
    });

    if (!res.ok) continue;
    const data = await res.json() as { items?: Array<{ full_name: string; html_url: string; description: string | null; stargazers_count: number }> };

    for (const repo of data.items ?? []) {
      const desc = repo.description ?? "";
      if (!isAIRelated(repo.full_name + " " + desc)) continue;
      const stars = repo.stargazers_count >= 1000
        ? `${(repo.stargazers_count / 1000).toFixed(1)}k ⭐`
        : `${repo.stargazers_count} ⭐`;

      results.push({
        title: `${repo.full_name} — ${desc}`.slice(0, 200),
        url: repo.html_url,
        description: `${desc} · ${stars} estrellas en GitHub`.slice(0, 500),
      });
    }

    if (results.length >= 15) break;
  }

  // Deduplicar por URL
  return [...new Map(results.map((r) => [r.url, r])).values()].slice(0, 12);
}

async function runBot(req: NextRequest) {
  if (!isBotAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const category = await db.category.findFirst({ where: { slug: PERSONA.categorySlug } });
  if (!category) return NextResponse.json({ error: "Category not found" }, { status: 500 });

  let author = await db.user.findFirst({ where: { email: PERSONA.email } });
  if (!author) {
    author = await db.user.create({
      data: {
        email: PERSONA.email, username: PERSONA.username, name: PERSONA.name,
        bio: PERSONA.bio, isAI: true, aiPersona: PERSONA.key, role: "USER",
      },
    });
  }

  const repos = await fetchGitHubAIRepos();
  let published = 0, rejected = 0, skipped = 0;

  for (const repo of repos) {
    if (published >= MAX_PUBLISH) break;
    if (await db.post.findFirst({ where: { url: repo.url } })) { skipped++; continue; }

    const c = await curate({
      kind: "repo",
      rawTitle: repo.title,
      rawText: repo.description ?? "",
      personaAngle: PERSONA.angle,
    });

    let title: string, aiSummary: string | null;
    if (c) {
      if (!c.accept) { rejected++; continue; }
      title = c.title;
      aiSummary = c.summary;
    } else {
      skipped++;
      continue;
    }

    let slug = slugify(title.slice(0, 80));
    if (await db.post.findUnique({ where: { slug } })) slug = `${slug}-${Date.now()}`;

    const imageUrl = await fetchOgImage(repo.url);

    const created = await db.post.create({
      data: {
        title, slug, url: repo.url,
        description: c.description ?? repo.description ?? null,
        aiSummary, imageUrl,
        categoryId: category.id,
        userId: author.id,
        status: "ACTIVE",
        publishedAt: new Date(),
        score: 0,
      },
    });
    after(() => notifyKeywordMatches({ id: created.id, title, description: created.description, userId: author.id }));
    published++;
  }

  return NextResponse.json({ persona: PERSONA.key, published, rejected, skipped });
}

export async function POST(req: NextRequest) { return runBot(req); }
export async function GET(req: NextRequest) { return runBot(req); }
