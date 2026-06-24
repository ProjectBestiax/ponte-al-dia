export const dynamic = "force-dynamic";

import { MetadataRoute } from "next";
import { db } from "@/lib/db";

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

  return [
    { url: base, lastModified: new Date(), changeFrequency: "hourly", priority: 1 },
    { url: `${base}/tendencia`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.9 },
    { url: `${base}/subiendo`, lastModified: new Date(), changeFrequency: "hourly", priority: 0.8 },
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
  ];
}
