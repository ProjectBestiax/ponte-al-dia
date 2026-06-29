import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { sendEmail, getUnsubscribeToken, unsubscribeUrl } from "@/lib/email";
import { digestEmail, type DigestPost } from "@/lib/email-templates";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const BOT_SECRET = process.env.BOT_SECRET ?? "changeme";

function isAuthorized(req: NextRequest): boolean {
  const botSecret = req.headers.get("x-bot-secret");
  if (botSecret === BOT_SECRET) return true;
  const cronSecret = process.env.CRON_SECRET;
  const authHeader = req.headers.get("authorization");
  if (cronSecret && authHeader === `Bearer ${cronSecret}`) return true;
  return false;
}

const RANGE_LABEL = "esta semana";

async function getTopPosts(limit = 8): Promise<DigestPost[]> {
  const since = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const posts = await db.post.findMany({
    where: { status: "ACTIVE", createdAt: { gte: since } },
    orderBy: [{ score: "desc" }, { voteCount: "desc" }],
    take: limit,
    select: {
      title: true,
      slug: true,
      voteCount: true,
      commentCount: true,
      category: { select: { name: true, emoji: true } },
    },
  });
  return posts.map((p) => ({
    title: p.title,
    slug: p.slug,
    voteCount: p.voteCount,
    commentCount: p.commentCount,
    categoryName: p.category.name,
    categoryEmoji: p.category.emoji,
  }));
}

async function runDigest(req: NextRequest) {
  if (!isAuthorized(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const dryRun = req.nextUrl.searchParams.get("dryRun") === "1";
  const onlyTo = req.nextUrl.searchParams.get("to"); // send a single real preview

  const posts = await getTopPosts();
  if (posts.length === 0) {
    return NextResponse.json({ ok: true, skipped: "no-posts-this-week" });
  }

  // Single-address preview mode: render once and send (or dry-run) to that email.
  if (onlyTo) {
    const { subject, html } = digestEmail({ posts, unsubLink: `#`, rangeLabel: RANGE_LABEL });
    const result = await sendEmail({ to: onlyTo, subject, html, dryRun });
    return NextResponse.json({ ok: true, mode: "single", subject, postCount: posts.length, result });
  }

  const recipients = await db.user.findMany({
    where: { emailDigest: true },
    select: { id: true, email: true },
  });

  let sent = 0;
  let skipped = 0;
  let failed = 0;

  for (const r of recipients) {
    if (dryRun) {
      skipped++;
      continue;
    }
    const token = await getUnsubscribeToken(r.id);
    const { subject, html } = digestEmail({
      posts,
      unsubLink: unsubscribeUrl(token, "digest"),
      rangeLabel: RANGE_LABEL,
    });
    const result = await sendEmail({ to: r.email, subject, html });
    // A dry-run skip (EMAIL_DRY_RUN / no API key) is not a failure.
    if (result.sent) sent++;
    else if (result.skipped === "dry-run" || result.skipped === "no-api-key") skipped++;
    else failed++;
  }

  return NextResponse.json({
    ok: true,
    mode: dryRun ? "dry-run" : "live",
    postCount: posts.length,
    recipients: recipients.length,
    sent,
    skipped,
    failed,
  });
}

export async function GET(req: NextRequest) {
  return runDigest(req);
}

export async function POST(req: NextRequest) {
  return runDigest(req);
}
