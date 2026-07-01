import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mi perfil · Ponte al dIA" };
export const dynamic = "force-dynamic";

type Tab = "publicaciones" | "votos" | "comentarios" | "guardados";

interface PageProps {
  searchParams: Promise<{ tab?: string }>;
}

export default async function PerfilPage({ searchParams }: PageProps) {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const { tab } = await searchParams;
  const activeTab: Tab =
    tab === "votos" || tab === "comentarios" || tab === "guardados" ? tab : "publicaciones";

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      name: true,
      email: true,
      username: true,
      image: true,
      bio: true,
      karma: true,
      createdAt: true,
    },
  });

  if (!user) redirect("/login");

  const [postCount, voteCount, commentCount, bookmarkCount, followerCount, followingCount] = await Promise.all([
    db.post.count({ where: { userId: user.id, status: "ACTIVE" } }),
    db.vote.count({ where: { userId: user.id } }),
    db.comment.count({ where: { userId: user.id } }),
    db.bookmark.count({ where: { userId: user.id } }),
    db.follow.count({ where: { followingId: user.id } }),
    db.follow.count({ where: { followerId: user.id } }),
  ]);

  const handleSlug = user.username ?? user.id;

  // Fetch only the active tab's data
  const posts =
    activeTab === "publicaciones"
      ? await db.post.findMany({
          where: { userId: user.id, status: "ACTIVE" },
          orderBy: { createdAt: "desc" },
          take: 20,
          select: {
            id: true, title: true, slug: true, voteCount: true,
            commentCount: true, createdAt: true,
            category: { select: { name: true, emoji: true } },
          },
        })
      : [];

  const votes =
    activeTab === "votos"
      ? await db.vote.findMany({
          where: { userId: user.id },
          orderBy: { createdAt: "desc" },
          take: 20,
          select: {
            id: true, value: true, createdAt: true,
            post: { select: { title: true, slug: true, category: { select: { name: true, emoji: true } } } },
          },
        })
      : [];

  const comments =
    activeTab === "comentarios"
      ? await db.comment.findMany({
          where: { userId: user.id },
          orderBy: { createdAt: "desc" },
          take: 20,
          select: {
            id: true, content: true, createdAt: true, score: true,
            post: { select: { title: true, slug: true } },
          },
        })
      : [];

  const bookmarks =
    activeTab === "guardados"
      ? await db.bookmark.findMany({
          where: { userId: user.id },
          orderBy: { createdAt: "desc" },
          take: 20,
          select: {
            id: true, createdAt: true,
            post: {
              select: {
                title: true, slug: true, voteCount: true, commentCount: true,
                category: { select: { name: true, emoji: true } },
              },
            },
          },
        })
      : [];

  const initial = (user.name ?? user.email ?? "U")[0].toUpperCase();
  const displayName = user.name ?? user.email ?? "Usuario";
  const memberSince = formatDistanceToNow(user.createdAt, { addSuffix: true, locale: es });

  const tabLink = (t: Tab) => (t === "publicaciones" ? "/perfil" : `/perfil?tab=${t}`);
  const tabLabel: Record<Tab, string> = {
    publicaciones: "Publicaciones",
    votos: "Votos",
    comentarios: "Comentarios",
    guardados: "Guardados",
  };

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 24px 64px", fontFamily: "var(--font-manrope)" }}>

      {/* ── Header ── */}
      <div className="flex items-start gap-5 mb-6">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={user.image}
            alt="avatar"
            className="rounded-full shrink-0 object-cover"
            style={{ width: 72, height: 72 }}
          />
        ) : (
          <div
            className="rounded-full shrink-0 flex items-center justify-center text-white font-extrabold"
            style={{ width: 72, height: 72, background: "#0A0A0A", fontSize: 28 }}
          >
            {initial}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="font-extrabold text-zinc-950 truncate" style={{ fontSize: 22 }}>
                {displayName}
              </h1>
              {user.username && (
                <p className="text-zinc-400 font-medium" style={{ fontSize: 14 }}>
                  @{user.username}
                </p>
              )}
            </div>
            <Link
              href="/perfil/editar"
              className="shrink-0 flex items-center gap-1.5 border border-zinc-200 rounded-[9px] px-3 h-[34px] text-zinc-600 font-semibold hover:bg-zinc-50 transition-colors"
              style={{ fontSize: 13 }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
              </svg>
              Editar
            </Link>
          </div>

          {user.bio && (
            <p className="text-zinc-600 mt-2 leading-relaxed" style={{ fontSize: 14 }}>
              {user.bio}
            </p>
          )}

          <div className="flex items-center gap-3 mt-3 flex-wrap" style={{ fontSize: 13 }}>
            <span className="flex items-center gap-1 font-semibold text-amber-600">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              {user.karma} karma
            </span>
            <span className="text-zinc-300">·</span>
            <span className="text-zinc-400">Miembro {memberSince}</span>
          </div>

          <div className="flex items-center gap-4 mt-2.5" style={{ fontSize: 13.5 }}>
            <Link href={`/u/${handleSlug}/seguidores`} className="text-zinc-600 hover:text-zinc-900 transition-colors">
              <span className="font-extrabold text-zinc-950">{followerCount}</span> seguidores
            </Link>
            <Link href={`/u/${handleSlug}/siguiendo`} className="text-zinc-600 hover:text-zinc-900 transition-colors">
              <span className="font-extrabold text-zinc-950">{followingCount}</span> siguiendo
            </Link>
          </div>
        </div>
      </div>

      {/* ── Stats bar ── */}
      <div className="grid grid-cols-4 border border-zinc-100 rounded-[13px] mb-6 overflow-hidden">
        {[
          { label: "Posts", value: postCount, tab: "publicaciones" as Tab },
          { label: "Votos", value: voteCount, tab: "votos" as Tab },
          { label: "Comentarios", value: commentCount, tab: "comentarios" as Tab },
          { label: "Guardados", value: bookmarkCount, tab: "guardados" as Tab },
        ].map(({ label, value, tab: t }, i) => (
          <Link
            key={t}
            href={tabLink(t)}
            className={`flex flex-col items-center py-4 transition-colors hover:bg-zinc-50 ${
              i < 3 ? "border-r border-zinc-100" : ""
            } ${activeTab === t ? "bg-zinc-50" : ""}`}
          >
            <span className="font-extrabold text-zinc-950" style={{ fontSize: 20, fontFamily: "var(--font-jetbrains-mono)" }}>
              {value}
            </span>
            <span className="text-zinc-400 font-medium text-center" style={{ fontSize: 11 }}>
              {label}
            </span>
          </Link>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="flex items-center gap-6 border-b border-zinc-100 mb-4 overflow-x-auto">
        {(["publicaciones", "votos", "comentarios", "guardados"] as Tab[]).map((t) => (
          <Link
            key={t}
            href={tabLink(t)}
            className={`pb-3.5 whitespace-nowrap transition-colors ${
              activeTab === t
                ? "font-bold text-zinc-950 border-b-2 border-zinc-950 -mb-px"
                : "font-semibold text-zinc-400 hover:text-zinc-700"
            }`}
            style={{ fontSize: 15 }}
          >
            {tabLabel[t]}
          </Link>
        ))}
      </div>

      {/* ── Tab content ── */}

      {activeTab === "publicaciones" && (
        <div className="flex flex-col divide-y divide-zinc-100">
          {posts.length === 0 ? (
            <div className="py-12 text-center text-zinc-400">
              <p className="font-medium">Aún no has publicado nada.</p>
              <Link href="/publicar" className="mt-2 inline-block text-blue-600 text-sm hover:underline">
                Publicar algo →
              </Link>
            </div>
          ) : (
            posts.map((post) => (
              <Link
                key={post.id}
                href={`/p/${post.slug}`}
                className="flex items-center justify-between gap-4 py-3.5 hover:bg-zinc-50 -mx-2 px-2 rounded-[9px] transition-colors"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-zinc-900 truncate" style={{ fontSize: 14 }}>
                    {post.title}
                  </p>
                  <p className="text-zinc-400 mt-0.5" style={{ fontSize: 12 }}>
                    {post.category.emoji} {post.category.name} ·{" "}
                    {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: es })}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-3 text-zinc-400" style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12 }}>
                  <span>{post.voteCount} votos</span>
                  <span>{post.commentCount} com.</span>
                </div>
              </Link>
            ))
          )}
        </div>
      )}

      {activeTab === "votos" && (
        <div className="flex flex-col divide-y divide-zinc-100">
          {votes.length === 0 ? (
            <div className="py-12 text-center text-zinc-400">
              <p className="font-medium">Todavía no has votado nada.</p>
            </div>
          ) : (
            votes.map((vote) => (
              <Link
                key={vote.id}
                href={`/p/${vote.post.slug}`}
                className="flex items-center gap-3 py-3.5 hover:bg-zinc-50 -mx-2 px-2 rounded-[9px] transition-colors"
              >
                <span
                  className="shrink-0 font-bold text-lg"
                  style={{ color: vote.value > 0 ? "#16a34a" : "#e11d48", fontFamily: "var(--font-jetbrains-mono)" }}
                >
                  {vote.value > 0 ? "▲" : "▼"}
                </span>
                <div className="min-w-0">
                  <p className="font-semibold text-zinc-900 truncate" style={{ fontSize: 14 }}>
                    {vote.post.title}
                  </p>
                  <p className="text-zinc-400 mt-0.5" style={{ fontSize: 12 }}>
                    {vote.post.category.emoji} {vote.post.category.name} ·{" "}
                    {formatDistanceToNow(vote.createdAt, { addSuffix: true, locale: es })}
                  </p>
                </div>
              </Link>
            ))
          )}
        </div>
      )}

      {activeTab === "comentarios" && (
        <div className="flex flex-col divide-y divide-zinc-100">
          {comments.length === 0 ? (
            <div className="py-12 text-center text-zinc-400">
              <p className="font-medium">Todavía no has comentado nada.</p>
            </div>
          ) : (
            comments.map((comment) => (
              <Link
                key={comment.id}
                href={`/p/${comment.post.slug}`}
                className="flex flex-col gap-1.5 py-3.5 hover:bg-zinc-50 -mx-2 px-2 rounded-[9px] transition-colors"
              >
                <p className="text-zinc-700 leading-relaxed line-clamp-2" style={{ fontSize: 14 }}>
                  {comment.content}
                </p>
                <p className="text-zinc-400" style={{ fontSize: 12 }}>
                  en: <span className="text-zinc-600 font-medium">{comment.post.title}</span>{" "}
                  · {formatDistanceToNow(comment.createdAt, { addSuffix: true, locale: es })}
                  {comment.score !== 0 && (
                    <span className={`ml-2 font-semibold ${comment.score > 0 ? "text-green-600" : "text-red-400"}`}>
                      {comment.score > 0 ? "+" : ""}{comment.score} pts
                    </span>
                  )}
                </p>
              </Link>
            ))
          )}
        </div>
      )}

      {activeTab === "guardados" && (
        <div className="flex flex-col divide-y divide-zinc-100">
          {bookmarks.length === 0 ? (
            <div className="py-12 text-center text-zinc-400">
              <p className="font-medium">Todavía no has guardado ningún post.</p>
              <p className="text-sm mt-1">Pulsa el botón Guardar en cualquier post.</p>
            </div>
          ) : (
            bookmarks.map((bm) => (
              <Link
                key={bm.id}
                href={`/p/${bm.post.slug}`}
                className="flex items-center justify-between gap-4 py-3.5 hover:bg-zinc-50 -mx-2 px-2 rounded-[9px] transition-colors"
              >
                <div className="min-w-0">
                  <p className="font-semibold text-zinc-900 truncate" style={{ fontSize: 14 }}>
                    {bm.post.title}
                  </p>
                  <p className="text-zinc-400 mt-0.5" style={{ fontSize: 12 }}>
                    {bm.post.category.emoji} {bm.post.category.name} ·{" "}
                    {formatDistanceToNow(bm.createdAt, { addSuffix: true, locale: es })}
                  </p>
                </div>
                <div className="shrink-0 flex items-center gap-3 text-zinc-400" style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12 }}>
                  <span>{bm.post.voteCount} votos</span>
                  <span>{bm.post.commentCount} com.</span>
                </div>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}
