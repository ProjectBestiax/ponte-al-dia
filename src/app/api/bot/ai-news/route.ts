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

const PERSONA = AI_PERSONAS.ada;
const MAX_CANDIDATES = 15;
const MAX_PUBLISH = 4;

const CATEGORY_SLUGS = [
  "noticias",
  "herramientas",
  "agentes-y-automatizacion",
  "demos-y-virales",
  "analisis",
  "skills",
];

const HN_QUERIES = [
  "AI",
  "LLM",
  "GPT",
  "Claude",
  "OpenAI",
  "machine learning",
  "generative AI",
];

interface HNHit {
  objectID: string;
  title: string;
  url: string | null;
  story_text: string | null;
  points: number;
  created_at: string;
}

async function fetchHNStories(): Promise<{ title: string; url: string; description: string }[]> {
  const results: { title: string; url: string; description: string; points: number }[] = [];
  const seenUrls = new Set<string>();
  const threeDaysAgo = Math.floor((Date.now() - 3 * 24 * 60 * 60 * 1000) / 1000);

  for (const q of HN_QUERIES) {
    const apiUrl = `https://hn.algolia.com/api/v1/search_by_date?query=${encodeURIComponent(q)}&tags=story&hitsPerPage=10&numericFilters=created_at_i>${threeDaysAgo}`;
    try {
      const res = await fetch(apiUrl, {
        headers: { "User-Agent": "PonteAlDIA/1.0" },
        signal: AbortSignal.timeout(8000),
      });
      if (!res.ok) continue;
      const data = await res.json() as { hits?: HNHit[] };

      for (const hit of data.hits ?? []) {
        if (hit.points < 5) continue;
        const url = hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`;
        if (seenUrls.has(url)) continue;
        seenUrls.add(url);

        results.push({
          title: hit.title,
          url,
          description: hit.story_text?.slice(0, 500) || hit.title,
          points: hit.points,
        });
      }
    } catch {
      continue;
    }

    if (results.length >= 30) break;
  }

  return results
    .sort((a, b) => b.points - a.points)
    .slice(0, MAX_CANDIDATES);
}

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

  const categories = await db.category.findMany({
    where: { slug: { in: CATEGORY_SLUGS } },
  });
  const catMap = new Map(categories.map((c) => [c.slug, c.id]));
  const defaultCatId = catMap.get(PERSONA.categorySlug);
  if (!defaultCatId) return NextResponse.json({ error: "Default category not found" }, { status: 500 });

  const author = await getPersonaUser();
  const stories = await fetchHNStories();

  let published = 0, rejected = 0, skipped = 0;

  for (const story of stories) {
    if (published >= MAX_PUBLISH) break;
    if (await db.post.findFirst({ where: { url: story.url } })) { skipped++; continue; }

    const c = await curate({
      kind: "news",
      rawTitle: story.title,
      rawText: story.description,
      personaAngle: PERSONA.angle,
      categorySlugs: CATEGORY_SLUGS,
    });

    let title: string, aiSummary: string | null, categoryId: string;
    if (c) {
      if (!c.accept) { rejected++; continue; }
      title = c.title;
      aiSummary = c.summary;
      categoryId = (c.categorySlug && catMap.get(c.categorySlug)) || defaultCatId;
    } else {
      title = story.title.slice(0, 120);
      aiSummary = null;
      categoryId = defaultCatId;
    }

    let slug = slugify(title.slice(0, 80));
    if (await db.post.findUnique({ where: { slug } })) slug = `${slug}-${Date.now()}`;

    const imageUrl = await fetchOgImage(story.url);

    const created = await db.post.create({
      data: {
        title, slug, url: story.url,
        description: story.description || null,
        aiSummary, imageUrl,
        categoryId,
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
