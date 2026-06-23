import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";
import { z } from "zod";

export const dynamic = "force-dynamic";

const schema = z.object({
  title: z.string().min(10).max(200),
  url: z.string().url().optional().or(z.literal("")),
  description: z.string().max(500).optional(),
  categoryId: z.string().cuid(),
  imageUrl: z.string().url().optional().nullable(),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
      { status: 400 }
    );
  }

  const { title, url, description, categoryId, imageUrl } = parsed.data;

  // Verificar que la categoría existe
  const category = await db.category.findUnique({ where: { id: categoryId } });
  if (!category) {
    return NextResponse.json({ error: "Categoría no válida" }, { status: 400 });
  }

  // Slug único
  let slug = slugify(title);
  const existing = await db.post.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;

  const post = await db.post.create({
    data: {
      title,
      slug,
      url: url || null,
      description: description || null,
      imageUrl: imageUrl ?? null,
      categoryId,
      userId: session.user.id,
      status: "PENDING", // Requiere moderación
    },
  });

  return NextResponse.json({ slug: post.slug }, { status: 201 });
}
