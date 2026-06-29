import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id: postId } = await params;
  const userId = session.user.id;

  const existing = await db.bookmark.findUnique({
    where: { userId_postId: { userId, postId } },
  });

  if (existing) {
    await db.bookmark.delete({ where: { userId_postId: { userId, postId } } });
    return NextResponse.json({ bookmarked: false });
  } else {
    await db.bookmark.create({ data: { userId, postId } });
    return NextResponse.json({ bookmarked: true });
  }
}
