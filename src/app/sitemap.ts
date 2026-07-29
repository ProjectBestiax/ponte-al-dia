export const dynamic = "force-dynamic";

// Criterio: solo URLs indexables con contenido sustancial. Nada de query params
// (duplican "/"), nada de perfiles de usuario, nada de debates sin actividad.

import { MetadataRoute } from "next";
import { db } from "@/lib/db";
import { GUIDES } from "@/lib/guides";
import { isPostIndexable } from "@/lib/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";

  // Solo posts con contenido sustancial (mismo criterio que el noindex de la
  // página): no enviamos a Google stubs finos que dejaría "sin indexar".
  const allPosts = await db.post.findMany({
    where: { status: "ACTIVE" },
    select: { slug: true, updatedAt: true, description: true, content: true, aiSummary: true, commentCount: true },
    orderBy: { createdAt: "desc" },
    take: 1000,
  });
  const posts = allPosts.filter(isPostIndexable);

  const debates = await db.debate.findMany({
    where: { status: "ACTIVE", commentCount: { gte: 2 } },
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
    { url: `${base}/guias/skills`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.7 },
    ...GUIDES.map((g) => ({
      url: `${base}/guias/ia-para-${g.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
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
  ];
}
