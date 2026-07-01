import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { notifyOnFollow, sendFollowEmail } from "@/lib/notifications";

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id: targetId } = await params;
  if (targetId === session.user.id) {
    return NextResponse.json({ error: "No puedes seguirte a ti mismo" }, { status: 400 });
  }

  const target = await db.user.findUnique({ where: { id: targetId }, select: { id: true } });
  if (!target) return NextResponse.json({ error: "Usuario no encontrado" }, { status: 404 });

  // Idempotent: creating an existing follow just returns the current state.
  const existing = await db.follow.findUnique({
    where: { followerId_followingId: { followerId: session.user.id, followingId: targetId } },
  });

  if (!existing) {
    await db.follow.create({ data: { followerId: session.user.id, followingId: targetId } });
    await notifyOnFollow({ followerId: session.user.id, followingId: targetId });
    after(() => sendFollowEmail({ followerId: session.user!.id!, followingId: targetId }));
  }

  return NextResponse.json({ following: true });
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session?.user?.id) return NextResponse.json({ error: "No autenticado" }, { status: 401 });

  const { id: targetId } = await params;
  await db.follow.deleteMany({ where: { followerId: session.user.id, followingId: targetId } });

  return NextResponse.json({ following: false });
}
