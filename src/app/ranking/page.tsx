import { db } from "@/lib/db";
import type { Metadata } from "next";
import { RankingTabs } from "./RankingTabs";

export const metadata: Metadata = { title: "Ranking · Ponte al dIA" };
export const dynamic = "force-dynamic";

export default async function RankingPage() {
  const [trending, topUsers] = await Promise.all([
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

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "28px 20px 96px", fontFamily: "var(--font-manrope)" }}>
      <h1 className="font-extrabold text-zinc-950 mb-5" style={{ fontSize: 24 }}>
        Ranking
      </h1>
      <RankingTabs trending={trending} topUsers={topUsers} />
    </div>
  );
}
