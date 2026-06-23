import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";

const BOT_SECRET = process.env.BOT_SECRET ?? "changeme";

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

export async function POST(req: NextRequest) {
  const auth = req.headers.get("x-bot-secret");
  if (auth !== BOT_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const category = await db.category.findFirst({ where: { slug: "open-source" } });
  if (!category) return NextResponse.json({ error: "Category not found" }, { status: 500 });

  let botUser = await db.user.findFirst({ where: { email: "bot@pontealdia.com" } });
  if (!botUser) {
    botUser = await db.user.create({
      data: { email: "bot@pontealdia.com", name: "Bot Ponte al dIA", username: "bot", role: "USER" },
    });
  }

  const repos = await fetchGitHubAIRepos();
  const created: string[] = [];
  const skipped: string[] = [];

  for (const repo of repos) {
    const exists = await db.post.findFirst({ where: { url: repo.url } });
    if (exists) { skipped.push(repo.url); continue; }

    let slug = slugify(repo.title.slice(0, 80));
    const existing = await db.post.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    await db.post.create({
      data: {
        title: repo.title,
        slug,
        url: repo.url,
        description: repo.description || null,
        categoryId: category.id,
        userId: botUser.id,
        status: "ACTIVE",
        publishedAt: new Date(),
        score: 0,
      },
    });
    created.push(repo.url);
  }

  return NextResponse.json({ created: created.length, skipped: skipped.length, total: repos.length });
}
