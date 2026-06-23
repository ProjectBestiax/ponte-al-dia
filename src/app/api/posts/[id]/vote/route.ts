import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { calculateHotScore } from "@/lib/hot-score";
import { z } from "zod";

const schema = z.object({ value: z.union([z.literal(-1), z.literal(0), z.literal(1)]) });

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Valor inválido" }, { status: 400 });
  }

  const { id } = await params;
  const { value } = parsed.data;
  const userId = session.user.id;

  const post = await db.post.findUnique({
    where: { id, status: "ACTIVE" },
    select: { id: true, voteCount: true, createdAt: true },
  });

  if (!post) {
    return NextResponse.json({ error: "Post no encontrado" }, { status: 404 });
  }

  const existingVote = await db.vote.findUnique({
    where: { userId_postId: { userId, postId: id } },
  });

  let voteDelta = 0;

  if (value === 0) {
    // Retirar voto
    if (existingVote) {
      await db.vote.delete({ where: { userId_postId: { userId, postId: id } } });
      voteDelta = -existingVote.value;
    }
  } else if (!existingVote) {
    // Voto nuevo
    await db.vote.create({ data: { userId, postId: id, value } });
    voteDelta = value;
  } else if (existingVote.value !== value) {
    // Cambio de voto
    await db.vote.update({
      where: { userId_postId: { userId, postId: id } },
      data: { value },
    });
    voteDelta = value - existingVote.value;
  }

  if (voteDelta !== 0) {
    const newVoteCount = post.voteCount + voteDelta;
    const newScore = calculateHotScore(newVoteCount, post.createdAt);

    // Ocultar automáticamente si llega a -5
    const status = newVoteCount <= -5 ? "HIDDEN" : "ACTIVE";

    await db.post.update({
      where: { id },
      data: { voteCount: newVoteCount, score: newScore, status },
    });

    // Incrementar/decrementar karma del autor
    const postWithUser = await db.post.findUnique({ where: { id }, select: { userId: true } });
    if (postWithUser) {
      await db.user.update({
        where: { id: postWithUser.userId },
        data: { karma: { increment: voteDelta } },
      });
    }
  }

  return NextResponse.json({ success: true });
}
