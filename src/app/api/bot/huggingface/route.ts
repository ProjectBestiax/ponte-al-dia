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

// Nora curates research: publish few, high-signal, well-titled papers.
const PERSONA = AI_PERSONAS.nora;
const MAX_CANDIDATES = 8; // bound curation cost
const MAX_PUBLISH = 3; // few but good

async function getPersonaUser() {
  const existing = await db.user.findFirst({ where: { email: PERSONA.email } });
  if (existing) return existing;
  return db.user.create({
    data: {
      email: PERSONA.email, username: PERSONA.username, name: PERSONA.name,
      bio: PERSONA.bio, isAI: true, aiPersona: PERSONA.key, role: "USER",
    },
  });
}

async function runBot(req: NextRequest) {
  if (!isBotAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const res = await fetch("https://huggingface.co/api/daily_papers?limit=20", {
    headers: { "User-Agent": "PonteAlDIA/1.0" },
    signal: AbortSignal.timeout(10000),
  });
  if (!res.ok) return NextResponse.json({ error: "HF API error" }, { status: 502 });

  const papers = await res.json() as Array<{
    paper: { id: string; title: string; summary: string };
    publishedAt: string;
  }>;

  const category = await db.category.findFirst({ where: { slug: PERSONA.categorySlug } });
  if (!category) return NextResponse.json({ error: "Category not found" }, { status: 500 });
  const author = await getPersonaUser();

  let published = 0, rejected = 0, skipped = 0;

  for (const item of papers.slice(0, MAX_CANDIDATES)) {
    if (published >= MAX_PUBLISH) break;
    const paperUrl = `https://huggingface.co/papers/${item.paper.id}`;
    if (await db.post.findFirst({ where: { url: paperUrl } })) { skipped++; continue; }

    const c = await curate({
      kind: "paper",
      rawTitle: item.paper.title,
      rawText: item.paper.summary ?? "",
      personaAngle: PERSONA.angle,
    });

    let title: string, aiSummary: string | null;
    if (c) {
      if (!c.accept) { rejected++; continue; }
      title = c.title;
      aiSummary = c.summary;
    } else {
      // No API key / curation failed → publish a clean version anyway (no "[Paper]" noise).
      title = item.paper.title.slice(0, 120);
      aiSummary = null;
    }

    let slug = slugify(title.slice(0, 80));
    if (await db.post.findUnique({ where: { slug } })) slug = `${slug}-${Date.now()}`;

    const imageUrl = await fetchOgImage(paperUrl);

    const created = await db.post.create({
      data: {
        title, slug, url: paperUrl,
        description: item.paper.summary?.slice(0, 500) ?? "",
        aiSummary, imageUrl,
        categoryId: category.id,
        userId: author.id,
        status: "ACTIVE",
        publishedAt: new Date(item.publishedAt),
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
