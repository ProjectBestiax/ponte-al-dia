export const dynamic = "force-dynamic";

import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { GUIDES } from "@/lib/guides";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  const posts = await db.post.findMany({
    where: { status: "ACTIVE" },
    select: { slug: true, updatedAt: true },
    orderBy: { createdAt: "desc" },
    take: 1000,
  });

  const categories = await db.category.findMany({
    select: { slug: true },
  });

  const users = await db.user.findMany({
    where: { posts: { some: { status: "ACTIVE" } } },
    select: { username: true, id: true },
  });

  const debates = await db.debate.findMany({
    where: { status: "ACTIVE" },
    select: { slug: true, updatedAt: true },
    take: 1000,
  });

  return [
    { url: base, lastModified: new Date(), changeFrequency: "hourly", priority: 1 },
    { url: `${base}/populares`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${base}/ranking`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/debates`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${base}/debates/normas`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/guias`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...GUIDES.map((g) => ({
      url: `${base}/guias/ia-para-${g.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...categories.map((cat) => ({
      url: `${base}/?categoria=${cat.slug}`,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 0.7,
    })),
    ...posts.map((post) => ({
      url: `${base}/p/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...debates.map((debate) => ({
      url: `${base}/debates/${debate.slug}`,
      lastModified: debate.updatedAt,
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
    ...users.map((user) => ({
      url: `${base}/u/${user.username ?? user.id}`,
      changeFrequency: "weekly" as const,
      priority: 0.4,
    })),
  ];
}
