import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { KARMA } from "@/lib/karma";
import { checkRateLimit } from "@/lib/rate-limit";
import { z } from "zod";

export const dynamic = "force-dynamic";

const schema = z.object({
  content: z.string().min(2).max(2000),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  // Anti-spam: limita comentarios por usuario.
  const rl = await checkRateLimit("comment", session.user.id);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Vas demasiado rápido. Espera unos segundos antes de comentar de nuevo." },
      { status: 429 }
    );
  }

  const { id } = await params;
  const body = await req.json().catch(() => null);

  // Soporta tanto JSON como form data
  let data: unknown = body;
  if (!data) {
    const form = await req.formData();
    data = { content: form.get("content") };
  }

  const parsed = schema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json({ error: "Contenido inválido" }, { status: 400 });
  }

  const debate = await db.debate.findUnique({ where: { id, status: "ACTIVE" }, select: { id: true } });
  if (!debate) return NextResponse.json({ error: "Debate no encontrado" }, { status: 404 });

  const comment = await db.debateComment.create({
    data: {
      content: parsed.data.content,
      userId: session.user.id,
      debateId: id,
    },
  });

  await db.debate.update({
    where: { id },
    data: { commentCount: { increment: 1 }, lastCommentAt: new Date() },
  });

  await db.user.update({
    where: { id: session.user.id },
    data: { karma: { increment: KARMA.COMMENT_CREATED } },
  });

  return NextResponse.json(comment, { status: 201 });
}
