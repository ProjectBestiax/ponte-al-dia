import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export const dynamic = "force-dynamic";

const addSchema = z.object({
  keyword: z.string().min(2).max(50).transform((v) => v.toLowerCase().trim()),
  notifyEmail: z.boolean().optional().default(false),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const keywords = await db.alertKeyword.findMany({
    where: { userId: session.user.id },
    orderBy: { createdAt: "desc" },
  });
  return NextResponse.json(keywords);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = addSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.issues[0]?.message ?? "Datos inválidos" }, { status: 400 });
  }

  const count = await db.alertKeyword.count({ where: { userId: session.user.id } });
  if (count >= 20) {
    return NextResponse.json({ error: "Máximo 20 alertas por usuario" }, { status: 400 });
  }

  const keyword = await db.alertKeyword.upsert({
    where: { userId_keyword: { userId: session.user.id, keyword: parsed.data.keyword } },
    update: { notifyEmail: parsed.data.notifyEmail },
    create: { userId: session.user.id, keyword: parsed.data.keyword, notifyEmail: parsed.data.notifyEmail },
  });

  return NextResponse.json(keyword, { status: 201 });
}

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const { id } = await req.json();
  if (!id || typeof id !== "string") {
    return NextResponse.json({ error: "ID requerido" }, { status: 400 });
  }

  await db.alertKeyword.deleteMany({
    where: { id, userId: session.user.id },
  });

  return NextResponse.json({ success: true });
}
