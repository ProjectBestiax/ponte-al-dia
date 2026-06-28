import { unstable_cache } from "next/cache";
import { db } from "./db";

export const getCachedCategories = unstable_cache(
  () =>
    db.category.findMany({
      orderBy: { name: "asc" },
      include: { _count: { select: { posts: { where: { status: "ACTIVE" } } } } },
    }),
  ["categories"],
  { revalidate: 3600, tags: ["categories"] }
);

export const getCachedTrendingSidebar = unstable_cache(
  () =>
    db.post.findMany({
      where: { status: "ACTIVE" },
      orderBy: { score: "desc" },
      take: 5,
      select: { id: true, title: true, slug: true, voteCount: true, commentCount: true, score: true },
    }),
  ["trending-sidebar"],
  { revalidate: 1800, tags: ["posts"] }
);

export const getCachedTopContributors = unstable_cache(
  () =>
    db.user.findMany({
      where: { karma: { gt: 0 } },
      orderBy: { karma: "desc" },
      take: 5,
      select: { id: true, name: true, username: true, image: true, karma: true },
    }),
  ["top-contributors"],
  { revalidate: 3600, tags: ["users"] }
);
