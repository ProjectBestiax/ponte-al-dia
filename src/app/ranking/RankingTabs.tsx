"use client";

import { useState } from "react";
import Link from "next/link";
import { FollowButton } from "@/components/users/FollowButton";

interface TrendingPost {
  id: string;
  title: string;
  slug: string;
  voteCount: number;
  commentCount: number;
}

interface TopUser {
  id: string;
  name: string | null;
  username: string | null;
  image: string | null;
  karma: number;
  isFollowing: boolean;
}

type View = "tendencias" | "contribuidores";

export function RankingTabs({
  trending,
  topUsers,
  currentUserId,
  isLoggedIn,
}: {
  trending: TrendingPost[];
  topUsers: TopUser[];
  currentUserId?: string | null;
  isLoggedIn: boolean;
}) {
  const [view, setView] = useState<View>("tendencias");

  const seg = (active: boolean) =>
    `flex-1 flex items-center justify-center gap-1.5 h-[38px] rounded-[9px] text-[14px] font-semibold transition-colors ${
      active ? "bg-white text-zinc-950 shadow-sm" : "text-zinc-500 hover:text-zinc-700"
    }`;

  return (
    <>
      {/* Segmented control */}
      <div className="flex gap-1 p-1 bg-zinc-100 rounded-[11px] mb-5">
        <button type="button" onClick={() => setView("tendencias")} className={seg(view === "tendencias")}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>
          </svg>
          Tendencias
        </button>
        <button type="button" onClick={() => setView("contribuidores")} className={seg(view === "contribuidores")}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
          </svg>
          Contribuidores
        </button>
      </div>

      {/* Tendencias */}
      {view === "tendencias" && (
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
                  {post.voteCount} {post.voteCount === 1 ? "voto" : "votos"} · {post.commentCount} {post.commentCount === 1 ? "comentario" : "comentarios"}
                </div>
              </div>
            </Link>
          ))}
          {trending.length === 0 && (
            <p className="text-zinc-400 text-sm py-8 text-center">Todavía no hay posts.</p>
          )}
        </div>
      )}

      {/* Top contribuidores */}
      {view === "contribuidores" && (
        <div className="flex flex-col gap-[2px]">
          {topUsers.map((user, i) => {
            const initial = (user.name ?? user.username ?? "?")[0].toUpperCase();
            const handle = user.username ?? user.id;
            const isSelf = currentUserId === user.id;
            return (
              <div key={user.id} className="flex items-center gap-3 px-1.5 py-2.5 rounded-[8px] hover:bg-zinc-50 transition-colors">
                <span
                  className="font-bold w-5 shrink-0"
                  style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 14, color: "#D4D4D8" }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <Link href={`/u/${handle}`} className="flex items-center gap-3 flex-1 min-w-0">
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
                    <div className="text-zinc-400 text-[12px] truncate">
                      {user.username ? `@${user.username} · ` : ""}{user.karma} {user.karma === 1 ? "pt" : "pts"}
                    </div>
                  </div>
                </Link>
                {!isSelf && (
                  <div className="shrink-0">
                    <FollowButton targetUserId={user.id} initialFollowing={user.isFollowing} isLoggedIn={isLoggedIn} size="sm" />
                  </div>
                )}
              </div>
            );
          })}
          {topUsers.length === 0 && (
            <p className="text-zinc-400 text-sm py-8 text-center">Todavía no hay contribuidores.</p>
          )}
        </div>
      )}
    </>
  );
}
