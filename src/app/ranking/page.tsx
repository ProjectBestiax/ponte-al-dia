import { db } from "@/lib/db";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { RankingTabs } from "./RankingTabs";

export const metadata: Metadata = { title: "Ranking · Ponte al dIA" };
export const dynamic = "force-dynamic";

export default async function RankingPage() {
  const session = await auth();
  const currentUserId = session?.user?.id ?? null;

  const [trending, topUsersRaw] = await Promise.all([
    db.post.findMany({
      where: { status: "ACTIVE" },
      orderBy: { score: "desc" },
      take: 15,
      select: { id: true, title: true, slug: true, voteCount: true, commentCount: true },
    }),
    db.user.findMany({
      where: { karma: { gt: 0 } },
      orderBy: { karma: "desc" },
      take: 20,
      select: { id: true, name: true, username: true, image: true, karma: true },
    }),
  ]);

  // Which of the listed users does the viewer already follow?
  let followingSet = new Set<string>();
  if (currentUserId && topUsersRaw.length > 0) {
    const rows = await db.follow.findMany({
      where: { followerId: currentUserId, followingId: { in: topUsersRaw.map((u) => u.id) } },
      select: { followingId: true },
    });
    followingSet = new Set(rows.map((r) => r.followingId));
  }
  const topUsers = topUsersRaw.map((u) => ({ ...u, isFollowing: followingSet.has(u.id) }));

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "28px 20px 96px", fontFamily: "var(--font-manrope)" }}>
      <h1 className="font-extrabold text-zinc-950 mb-5" style={{ fontSize: 24 }}>
        Ranking
      </h1>
      <RankingTabs trending={trending} topUsers={topUsers} currentUserId={currentUserId} isLoggedIn={!!session} />
    </div>
  );
}
