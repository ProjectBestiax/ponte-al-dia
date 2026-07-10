import { db } from "@/lib/db";
import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { RankingTabs } from "./RankingTabs";
import { KARMA } from "@/lib/karma";

export const metadata: Metadata = {
  title: "Ranking · Ponte al dIA",
  description: "Los usuarios y posts más destacados de la comunidad de IA en español. Descubre quién contribuye más y qué contenido es tendencia.",
};
export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function RankingPage({ searchParams }: PageProps) {
  const { tab } = await searchParams;
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
      where: { karma: { gt: 0 }, isAI: false },
      orderBy: { karma: "desc" },
      take: 20,
      select: { id: true, name: true, username: true, image: true, karma: true, isAI: true },
    }),
  ]);

  let followingSet = new Set<string>();
  if (currentUserId && topUsersRaw.length > 0) {
    const rows = await db.follow.findMany({
      where: { followerId: currentUserId, followingId: { in: topUsersRaw.map((u) => u.id) } },
      select: { followingId: true },
    });
    followingSet = new Set(rows.map((r) => r.followingId));
  }
  const topUsers = topUsersRaw.map((u) => ({ ...u, isFollowing: followingSet.has(u.id) }));

  const karmaRules = [
    { action: "Publicar un post", points: KARMA.POST_CREATED },
    { action: "Escribir un comentario", points: KARMA.COMMENT_CREATED },
    { action: "Recibir un voto positivo", points: KARMA.VOTE_RECEIVED },
    { action: "Votar un post", points: KARMA.VOTE_CAST },
    { action: "Guardar en favoritos", points: KARMA.BOOKMARK },
    { action: "Compartir (X, WA, LinkedIn)", points: KARMA.SHARE_SOCIAL },
    { action: "Copiar enlace", points: KARMA.SHARE_COPY },
  ];

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "28px 20px 96px", fontFamily: "var(--font-manrope)" }}>
      <h1 className="font-extrabold text-zinc-950 mb-2" style={{ fontSize: 24 }}>
        Ranking
      </h1>

      {/* Prize banner */}
      <div className="bg-gradient-to-r from-amber-50 via-yellow-50 to-amber-50 border border-amber-200 rounded-xl px-4 py-3 mb-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🏆</span>
          <span className="text-sm font-bold text-amber-900">Premios para los más activos</span>
        </div>
        <div className="flex gap-3 text-xs text-amber-800">
          <span className="flex items-center gap-1">🥇 1.er puesto</span>
          <span className="flex items-center gap-1">🥈 2.o puesto</span>
          <span className="flex items-center gap-1">🥉 3.er puesto</span>
        </div>
        <p className="text-xs text-amber-700 mt-1.5">
          Licencias Pro, cheques regalo y más. Los más activos de cada mes ganan premios asegurados.
        </p>
      </div>

      <RankingTabs trending={trending} topUsers={topUsers} currentUserId={currentUserId} isLoggedIn={!!session} defaultTab={tab === "contribuidores" ? "contribuidores" : undefined} />

      {/* How to earn points */}
      <div className="mt-8 border border-zinc-200 rounded-xl p-4">
        <h2 className="text-sm font-bold text-zinc-900 mb-3">Cómo ganar puntos</h2>
        <div className="flex flex-col gap-1.5">
          {karmaRules.map((rule) => (
            <div key={rule.action} className="flex items-center justify-between py-1.5 border-b border-zinc-100 last:border-b-0">
              <span className="text-sm text-zinc-700">{rule.action}</span>
              <span className="text-sm font-bold text-green-600">+{rule.points} pts</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-zinc-400 mt-3">
          Máximo {KARMA.DAILY_VOTE_CAP} pts/día votando. Los bots de IA no participan en el ranking.
        </p>
      </div>
    </div>
  );
}
