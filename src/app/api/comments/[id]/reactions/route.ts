import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export const dynamic = "force-dynamic";

const VALID_TYPES = ["THUMBS_UP", "HEART", "BROKEN_HEART", "LAUGH", "THUMBS_DOWN"] as const;
const schema = z.object({ type: z.enum(VALID_TYPES) });

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id: commentId } = await params;
  const body = await req.json().catch(() => null);
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Tipo inválido" }, { status: 400 });

  const comment = await db.comment.findUnique({ where: { id: commentId }, select: { id: true } });
  if (!comment) return NextResponse.json({ error: "Comentario no encontrado" }, { status: 404 });

  const existing = await db.commentReaction.findUnique({
    where: { userId_commentId_type: { userId: session.user.id, commentId, type: parsed.data.type } },
  });

  if (existing) {
    await db.commentReaction.delete({ where: { id: existing.id } });
    return NextResponse.json({ action: "removed" });
  } else {
    await db.commentReaction.create({
      data: { type: parsed.data.type, userId: session.user.id, commentId },
    });
    return NextResponse.json({ action: "added" });
  }
}
