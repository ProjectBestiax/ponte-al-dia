import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import type { Metadata } from "next";
import { FollowButton } from "@/components/users/FollowButton";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ handle: string }>;
}

async function resolveUser(handle: string) {
  return db.user.findFirst({
    where: { OR: [{ username: handle }, { id: handle }] },
    select: {
      id: true, name: true, username: true, image: true, bio: true, karma: true, createdAt: true,
    },
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { handle } = await params;
  const user = await resolveUser(handle);
  if (!user) return { title: "Usuario no encontrado" };
  const name = user.name ?? user.username ?? "Usuario";
  return { title: `${name} · Ponte al dIA`, description: user.bio ?? undefined };
}

export default async function PublicProfilePage({ params }: PageProps) {
  const { handle } = await params;
  const session = await auth();
  const user = await resolveUser(handle);
  if (!user) notFound();

  const handleSlug = user.username ?? user.id;
  const isSelf = session?.user?.id === user.id;

  const [postCount, followerCount, followingCount, isFollowing, posts] = await Promise.all([
    db.post.count({ where: { userId: user.id, status: "ACTIVE" } }),
    db.follow.count({ where: { followingId: user.id } }),
    db.follow.count({ where: { followerId: user.id } }),
    session?.user?.id
      ? db.follow.findUnique({
          where: { followerId_followingId: { followerId: session.user.id, followingId: user.id } },
          select: { id: true },
        })
      : Promise.resolve(null),
    db.post.findMany({
      where: { userId: user.id, status: "ACTIVE" },
      orderBy: { createdAt: "desc" },
      take: 20,
      select: {
        id: true, title: true, slug: true, voteCount: true, commentCount: true, createdAt: true,
        category: { select: { name: true, emoji: true } },
      },
    }),
  ]);

  const initial = (user.name ?? user.username ?? "U")[0].toUpperCase();
  const displayName = user.name ?? user.username ?? "Usuario";
  const memberSince = formatDistanceToNow(user.createdAt, { addSuffix: true, locale: es });

  return (
    <div style={{ maxWidth: 680, margin: "0 auto", padding: "32px 24px 64px", fontFamily: "var(--font-manrope)" }}>
      {/* Header */}
      <div className="flex items-start gap-5 mb-6">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="avatar" className="rounded-full shrink-0 object-cover" style={{ width: 72, height: 72 }} />
        ) : (
          <div className="rounded-full shrink-0 flex items-center justify-center text-white font-extrabold" style={{ width: 72, height: 72, background: "#0A0A0A", fontSize: 28 }}>
            {initial}
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="font-extrabold text-zinc-950 truncate" style={{ fontSize: 22 }}>{displayName}</h1>
              {user.username && <p className="text-zinc-400 font-medium" style={{ fontSize: 14 }}>@{user.username}</p>}
            </div>
            {isSelf ? (
              <Link
                href="/perfil/editar"
                className="shrink-0 flex items-center border border-zinc-200 rounded-full px-4 h-[36px] text-zinc-600 font-bold hover:bg-zinc-50 transition-colors"
                style={{ fontSize: 13.5 }}
              >
                Editar perfil
              </Link>
            ) : (
              <FollowButton targetUserId={user.id} initialFollowing={!!isFollowing} isLoggedIn={!!session} />
            )}
          </div>

          {user.bio && <p className="text-zinc-600 mt-2 leading-relaxed" style={{ fontSize: 14 }}>{user.bio}</p>}

          <div className="flex items-center gap-3 mt-3 flex-wrap" style={{ fontSize: 13 }}>
            <span className="flex items-center gap-1 font-semibold text-amber-600">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>
              {user.karma} karma
            </span>
            <span className="text-zinc-300">·</span>
            <span className="text-zinc-400">Miembro {memberSince}</span>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 border border-zinc-100 rounded-[13px] mb-6 overflow-hidden">
        <div className="flex flex-col items-center py-4 border-r border-zinc-100">
          <span className="font-extrabold text-zinc-950" style={{ fontSize: 20, fontFamily: "var(--font-jetbrains-mono)" }}>{postCount}</span>
          <span className="text-zinc-400 font-medium" style={{ fontSize: 11 }}>Posts</span>
        </div>
        <Link href={`/u/${handleSlug}/seguidores`} className="flex flex-col items-center py-4 border-r border-zinc-100 hover:bg-zinc-50 transition-colors">
          <span className="font-extrabold text-zinc-950" style={{ fontSize: 20, fontFamily: "var(--font-jetbrains-mono)" }}>{followerCount}</span>
          <span className="text-zinc-400 font-medium" style={{ fontSize: 11 }}>Seguidores</span>
        </Link>
        <Link href={`/u/${handleSlug}/siguiendo`} className="flex flex-col items-center py-4 hover:bg-zinc-50 transition-colors">
          <span className="font-extrabold text-zinc-950" style={{ fontSize: 20, fontFamily: "var(--font-jetbrains-mono)" }}>{followingCount}</span>
          <span className="text-zinc-400 font-medium" style={{ fontSize: 11 }}>Siguiendo</span>
        </Link>
      </div>

      {/* Posts */}
      <h2 className="font-bold text-zinc-900 mb-3" style={{ fontSize: 15 }}>Publicaciones</h2>
      <div className="flex flex-col divide-y divide-zinc-100">
        {posts.length === 0 ? (
          <div className="py-12 text-center text-zinc-400">
            <p className="font-medium">Todavía no ha publicado nada.</p>
          </div>
        ) : (
          posts.map((post) => (
            <Link key={post.id} href={`/p/${post.slug}`} className="flex items-center justify-between gap-4 py-3.5 hover:bg-zinc-50 -mx-2 px-2 rounded-[9px] transition-colors">
              <div className="min-w-0">
                <p className="font-semibold text-zinc-900 truncate" style={{ fontSize: 14 }}>{post.title}</p>
                <p className="text-zinc-400 mt-0.5" style={{ fontSize: 12 }}>
                  {post.category.emoji} {post.category.name} · {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: es })}
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
    </div>
  );
}
