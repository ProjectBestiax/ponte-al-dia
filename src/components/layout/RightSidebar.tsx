import Link from "next/link";
import { getCachedTrendingSidebar, getCachedTopContributors } from "@/lib/cached-data";

export async function RightSidebar() {
  const [trending, topUsers] = await Promise.all([
    getCachedTrendingSidebar(),
    getCachedTopContributors(),
  ]);

  return (
    <aside style={{ fontFamily: "var(--font-manrope)" }}>
      {/* Tendencias */}
      <div className="border border-zinc-100 rounded-[14px] p-[18px] mb-[18px]">
        <div className="flex items-center gap-2 mb-4">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#2563EB" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
            <path d="m22 7-8.5 8.5-5-5L2 17"/><path d="M16 7h6v6"/>
          </svg>
          <span className="font-extrabold text-[15px] text-zinc-950">Tendencias</span>
        </div>
        <div className="flex flex-col gap-[3px]">
          {trending.map((post, i) => (
            <Link
              key={post.id}
              href={`/p/${post.slug}`}
              className="flex items-center gap-3 px-1.5 py-2 rounded-[8px] hover:bg-zinc-50 transition-colors group"
            >
              <span
                className="font-bold w-4 shrink-0"
                style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 13, color: "#D4D4D8" }}
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-[14px] text-blue-600 group-hover:text-blue-700 truncate" style={{ color: "#2563EB" }}>
                  {post.title.replace(/^\[.*?\]\s*/, "").slice(0, 40)}{post.title.length > 40 ? "…" : ""}
                </div>
                <div style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, color: "#A1A1AA", marginTop: 2 }}>
                  {post.voteCount > 0 ? `${post.voteCount} votos` : `${post.commentCount} comentarios`}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Top contribuidores */}
      {topUsers.length > 0 && (
        <div className="border border-zinc-100 rounded-[14px] p-[18px] mb-[18px]">
          <div className="flex items-center gap-2 mb-4">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0A0A0A" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
            </svg>
            <span className="font-extrabold text-[15px] text-zinc-950">Top contribuidores</span>
          </div>
          <div className="flex flex-col gap-[3px]">
            {topUsers.map((user, i) => {
              const initial = (user.name ?? user.username ?? "?")[0].toUpperCase();
              return (
                <div
                  key={user.id}
                  className="flex items-center gap-3 px-1.5 py-2 rounded-[8px]"
                >
                  <span
                    className="font-bold w-4 shrink-0"
                    style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 13, color: "#D4D4D8" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div
                    className="flex items-center justify-center rounded-full shrink-0 text-white font-bold"
                    style={{ width: 28, height: 28, background: "#0A0A0A", fontSize: 11 }}
                  >
                    {initial}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-[13.5px] text-zinc-900 truncate">
                      {user.name ?? user.username ?? "Usuario"}
                    </div>
                  </div>
                  <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, color: "#A1A1AA", whiteSpace: "nowrap" }}>
                    {user.karma} pts
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Footer links */}
      <div
        className="flex flex-wrap gap-x-3.5 gap-y-2 px-1"
        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11.5, color: "#A1A1AA" }}
      >
        <Link href="/privacidad" className="hover:text-zinc-600 transition-colors">Privacidad</Link>
        <Link href="/cookies" className="hover:text-zinc-600 transition-colors">Cookies</Link>
        <span className="w-full" style={{ color: "#C4C4CB", marginTop: 4 }}>
          © {new Date().getFullYear()} Ponte al dIA
        </span>
      </div>
    </aside>
  );
}
