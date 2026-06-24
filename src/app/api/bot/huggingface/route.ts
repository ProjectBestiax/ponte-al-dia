import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";

const BOT_SECRET = process.env.BOT_SECRET ?? "changeme";

function isAuthorized(req: NextRequest): boolean {
  const botSecret = req.headers.get("x-bot-secret");
  if (botSecret === BOT_SECRET) return true;
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  if (cronSecret && authHeader === `Bearer ${cronSecret}`) return true;
  return false;
}

async function runBot(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // HuggingFace Daily Papers API
  const res = await fetch("https://huggingface.co/api/daily_papers?limit=20", {
    headers: { "User-Agent": "PonteAlDIA/1.0" },
    signal: AbortSignal.timeout(10000),
  });

  if (!res.ok) return NextResponse.json({ error: "HF API error" }, { status: 502 });

  const papers = await res.json() as Array<{
    paper: { id: string; title: string; summary: string; authors: Array<{ name: string }> };
    publishedAt: string;
  }>;

  const category = await db.category.findFirst({ where: { slug: "modelos-y-llms" } });
  if (!category) return NextResponse.json({ error: "Category not found" }, { status: 500 });

  let botUser = await db.user.findFirst({ where: { email: "bot@pontealdia.com" } });
  if (!botUser) {
    botUser = await db.user.create({
      data: { email: "bot@pontealdia.com", name: "Bot Ponte al dIA", username: "bot", role: "USER" },
    });
  }

  const created: string[] = [];
  const skipped: string[] = [];

  for (const item of papers.slice(0, 10)) {
    const paperUrl = `https://huggingface.co/papers/${item.paper.id}`;
    const exists = await db.post.findFirst({ where: { url: paperUrl } });
    if (exists) { skipped.push(paperUrl); continue; }

    const title = `[Paper] ${item.paper.title}`.slice(0, 200);
    const description = item.paper.summary?.slice(0, 500) ?? "";

    let slug = slugify(title.slice(0, 80));
    const existing = await db.post.findUnique({ where: { slug } });
    if (existing) slug = `${slug}-${Date.now()}`;

    await db.post.create({
      data: {
        title,
        slug,
        url: paperUrl,
        description,
        categoryId: category.id,
        userId: botUser.id,
        status: "ACTIVE",
        publishedAt: new Date(item.publishedAt),
        score: 0,
      },
    });
    created.push(paperUrl);
  }

  return NextResponse.json({ created: created.length, skipped: skipped.length });
}

export async function POST(req: NextRequest) { return runBot(req); }
export async function GET(req: NextRequest) { return runBot(req); }
