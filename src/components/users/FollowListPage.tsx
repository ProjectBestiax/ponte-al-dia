import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import Link from "next/link";
import { UserListRow, type RowUser } from "./UserListRow";

export async function FollowListPage({ handle, mode }: { handle: string; mode: "followers" | "following" }) {
  const session = await auth();
  const profile = await db.user.findFirst({
    where: { OR: [{ username: handle }, { id: handle }] },
    select: { id: true, name: true, username: true },
  });
  if (!profile) notFound();

  const handleSlug = profile.username ?? profile.id;
  const displayName = profile.name ?? profile.username ?? "Usuario";

  // followers → users who follow the profile; following → users the profile follows.
  const follows = await db.follow.findMany({
    where: mode === "followers" ? { followingId: profile.id } : { followerId: profile.id },
    orderBy: { createdAt: "desc" },
    take: 100,
    select: {
      follower: mode === "followers" ? { select: { id: true, name: true, username: true, image: true, bio: true } } : false,
      following: mode === "following" ? { select: { id: true, name: true, username: true, image: true, bio: true } } : false,
    },
  });

  const users: RowUser[] = follows
    .map((f) => (mode === "followers" ? f.follower : f.following))
    .filter((u): u is RowUser => !!u);

  // Which of these does the viewer already follow (to seed the buttons)?
  let viewerFollowSet = new Set<string>();
  if (session?.user?.id && users.length > 0) {
    const rows = await db.follow.findMany({
      where: { followerId: session.user.id, followingId: { in: users.map((u) => u.id) } },
      select: { followingId: true },
    });
    viewerFollowSet = new Set(rows.map((r) => r.followingId));
  }

  const title = mode === "followers" ? "Seguidores" : "Siguiendo";

  return (
    <div style={{ maxWidth: 620, margin: "0 auto", padding: "32px 24px 64px", fontFamily: "var(--font-manrope)" }}>
      <Link href={`/u/${handleSlug}`} className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-zinc-700 mb-4 transition-colors" style={{ fontSize: 13, fontWeight: 600 }}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        {displayName}
      </Link>
      <h1 className="font-extrabold text-zinc-950 mb-4" style={{ fontSize: 20 }}>{title}</h1>

      {users.length === 0 ? (
        <div className="py-12 text-center text-zinc-400">
          <p className="font-medium">{mode === "followers" ? "Todavía no tiene seguidores." : "Todavía no sigue a nadie."}</p>
        </div>
      ) : (
        <div className="flex flex-col divide-y divide-zinc-100">
          {users.map((u) => (
            <UserListRow
              key={u.id}
              user={u}
              isLoggedIn={!!session}
              viewerFollows={viewerFollowSet.has(u.id)}
              isSelf={session?.user?.id === u.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}
