import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const POST_INCLUDE = {
  user: { select: { id: true, name: true, username: true, image: true } },
  category: { select: { name: true, slug: true, emoji: true, color: true } },
  tags: { include: { tag: { select: { name: true, slug: true } } } },
  _count: { select: { comments: true } },
} as const;

export type FeedPost = Awaited<ReturnType<typeof getNewPosts>>[number];

async function getSessionUserId(): Promise<string | null> {
  const session = await auth();
  return session?.user?.id ?? null;
}

async function attachUserVotes<T extends { id: string; voteCount: number }>(
  posts: T[],
  userId: string | null
): Promise<(T & { userVote: number | null })[]> {
  if (!userId || posts.length === 0) {
    return posts.map((p) => ({ ...p, userVote: null }));
  }
  const votes = await db.vote.findMany({
    where: { userId, postId: { in: posts.map((p) => p.id) } },
    select: { postId: true, value: true },
  });
  const voteMap = new Map(votes.map((v) => [v.postId, v.value]));
  return posts.map((p) => ({ ...p, userVote: voteMap.get(p.id) ?? null }));
}

async function attachUserBookmarks<T extends { id: string }>(
  posts: T[],
  userId: string | null
): Promise<(T & { userBookmarked: boolean })[]> {
  if (!userId || posts.length === 0) {
    return posts.map((p) => ({ ...p, userBookmarked: false }));
  }
  const bookmarks = await db.bookmark.findMany({
    where: { userId, postId: { in: posts.map((p) => p.id) } },
    select: { postId: true },
  });
  const bookmarkSet = new Set(bookmarks.map((b) => b.postId));
  return posts.map((p) => ({ ...p, userBookmarked: bookmarkSet.has(p.id) }));
}

export async function getNewPosts(categorySlug?: string, page = 1, limit = 20, q?: string) {
  const userId = await getSessionUserId();
  const skip = (page - 1) * limit;

  const posts = await db.post.findMany({
    where: {
      status: "ACTIVE",
      ...(categorySlug && { category: { slug: categorySlug } }),
      ...(q && {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { description: { contains: q, mode: "insensitive" } },
        ],
      }),
    },
    include: POST_INCLUDE,
    orderBy: { createdAt: "desc" },
    skip,
    take: limit,
  });

  const normalized = posts.map((p) => ({
    ...p,
    commentCount: p._count.comments,
  }));

  const withVotes = await attachUserVotes(normalized, userId);
  return attachUserBookmarks(withVotes, userId);
}

export async function getTrendingPosts(categorySlug?: string, page = 1, limit = 20) {
  const userId = await getSessionUserId();
  const skip = (page - 1) * limit;

  const posts = await db.post.findMany({
    where: {
      status: "ACTIVE",
      ...(categorySlug && { category: { slug: categorySlug } }),
    },
    include: POST_INCLUDE,
    orderBy: { score: "desc" },
    skip,
    take: limit,
  });

  const normalized = posts.map((p) => ({
    ...p,
    commentCount: p._count.comments,
  }));

  const withVotes = await attachUserVotes(normalized, userId);
  return attachUserBookmarks(withVotes, userId);
}

export async function getRisingPosts(categorySlug?: string, limit = 20) {
  const userId = await getSessionUserId();
  const since = new Date(Date.now() - 24 * 60 * 60 * 1000);

  const posts = await db.post.findMany({
    where: {
      status: "ACTIVE",
      createdAt: { gte: since },
      voteCount: { gt: 0 },
      ...(categorySlug && { category: { slug: categorySlug } }),
    },
    include: POST_INCLUDE,
    orderBy: [{ voteCount: "desc" }, { createdAt: "desc" }],
    take: limit,
  });

  const normalized = posts.map((p) => ({
    ...p,
    commentCount: p._count.comments,
  }));

  const withVotes = await attachUserVotes(normalized, userId);
  return attachUserBookmarks(withVotes, userId);
}

export async function getCategories() {
  return db.category.findMany({ orderBy: { order: "asc" } });
}
