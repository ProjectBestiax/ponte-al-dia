import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { SHARE_PLATFORMS, karmaForShare } from "@/lib/karma";
import { z } from "zod";

export const dynamic = "force-dynamic";

const schema = z.object({
  platform: z.enum(SHARE_PLATFORMS),
});

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id: postId } = await params;
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Plataforma inválida" }, { status: 400 });
  }

  const { platform } = parsed.data;
  const userId = session.user.id;

  const post = await db.post.findUnique({
    where: { id: postId, status: "ACTIVE" },
    select: { id: true },
  });
  if (!post) {
    return NextResponse.json({ error: "Post no encontrado" }, { status: 404 });
  }

  const existing = await db.share.findUnique({
    where: { userId_postId_platform: { userId, postId, platform } },
  });

  if (existing) {
    return NextResponse.json({ shared: true, alreadyCounted: true });
  }

  await db.share.create({ data: { userId, postId, platform } });

  const points = karmaForShare(platform);
  await db.user.update({
    where: { id: userId },
    data: { karma: { increment: points } },
  });

  return NextResponse.json({ shared: true, karma: points });
}
