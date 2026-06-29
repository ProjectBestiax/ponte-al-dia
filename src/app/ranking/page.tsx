import { db } from "@/lib/db";
import Link from "next/link";
import type { Metadata } from "next";

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
      <h1 className="font-extrabold text-zinc-950 mb-6" style={{ fontSize: 24 }}>
        Ranking
      </h1>

      {/* Tendencias */}
      <section className="border border-zinc-100 rounded-[14px] p-[18px] mb-5">
        <div className="flex items-center gap-2 mb-4">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>
          </svg>
          <span className="font-extrabold text-[16px] text-zinc-950">Tendencias</span>
        </div>
        <div className="flex flex-col gap-[2px]">
          {trending.map((post, i) => (
            <Link
              key={post.id}
              href={`/p/${post.slug}`}
              className="flex items-center gap-3 px-1.5 py-2.5 rounded-[8px] hover:bg-zinc-50 transition-colors group"
            >
              <span
                className="font-bold w-5 shrink-0"
                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 14, color: "#D4D4D8" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[14.5px] text-blue-600 group-hover:text-blue-700 leading-snug" style={{ color: "#2563EB" }}>
                  {post.title.replace(/^\[.*?\]\s*/, "")}
                </div>
                <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11.5, color: "#A1A1AA", marginTop: 2 }}>
                  {post.voteCount} votos · {post.commentCount} comentarios
                </div>
              </div>
            </Link>
          ))}
          {trending.length === 0 && (
            <p className="text-zinc-400 text-sm py-4 text-center">Todavía no hay posts.</p>
          )}
        </div>
      </section>

      {/* Top contribuidores */}
      <section className="border border-zinc-100 rounded-[14px] p-[18px]">
        <div className="flex items-center gap-2 mb-4">
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          <span className="font-extrabold text-[16px] text-zinc-950">Top contribuidores</span>
        </div>
        <div className="flex flex-col gap-[2px]">
          {topUsers.map((user, i) => {
            const initial = (user.name ?? user.username ?? "?")[0].toUpperCase();
            return (
              <div key={user.id} className="flex items-center gap-3 px-1.5 py-2.5 rounded-[8px]">
                <span
                  className="font-bold w-5 shrink-0"
                  style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 14, color: "#D4D4D8" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                {user.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={user.image} alt="" className="rounded-full shrink-0 object-cover" style={{ width: 32, height: 32 }} />
                ) : (
                  <div
                    className="flex items-center justify-center rounded-full shrink-0 text-white font-bold"
                    style={{ width: 32, height: 32, background: "#0A0A0A", fontSize: 12 }}
                  >
                    {initial}
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-[14.5px] text-zinc-900 truncate">
                    {user.name ?? user.username ?? "Usuario"}
                  </div>
                  {user.username && (
                    <div className="text-zinc-400 text-[12px] truncate">@{user.username}</div>
                  )}
                </div>
                <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, color: "#A1A1AA", whiteSpace: "nowrap" }}>
                  {user.karma} pts
                </span>
              </div>
            );
          })}
          {topUsers.length === 0 && (
            <p className="text-zinc-400 text-sm py-4 text-center">Todavía no hay contribuidores.</p>
          )}
        </div>
      </section>
    </div>
  );
}
