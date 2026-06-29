import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notifyOnComment } from "@/lib/notifications";
import { z } from "zod";

export const dynamic = "force-dynamic";

const schema = z.object({
  content: z.string().min(2).max(2000),
  parentId: z.string().cuid().optional(),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json().catch(() => null);

  // Soporta tanto JSON como form data
  let data: unknown = body;
  if (!data) {
    const form = await req.formData();
    data = { content: form.get("content"), parentId: form.get("parentId") };
  }

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ error: "Contenido inválido" }, { status: 400 });
  }

  const post = await db.post.findUnique({ where: { id, status: "ACTIVE" }, select: { id: true } });
  if (!post) return NextResponse.json({ error: "Post no encontrado" }, { status: 404 });

  const comment = await db.comment.create({
    data: {
      content: parsed.data.content,
      parentId: parsed.data.parentId ?? null,
      userId: session.user.id,
      postId: id,
    },
  });

  await db.post.update({
    where: { id },
    data: { commentCount: { increment: 1 } },
  });

  // Notify the post/parent author. Awaited (a single insert) so it runs reliably
  // on serverless — fire-and-forget after the response gets dropped. The helper
  // swallows its own errors, so it can never break comment creation.
  await notifyOnComment({
    commentId: comment.id,
    postId: id,
    actorId: session.user.id,
    parentId: parsed.data.parentId ?? null,
  });

  return NextResponse.json(comment, { status: 201 });
}
