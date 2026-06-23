import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

const schema = z.object({ action: z.enum(["approve", "reject"]) });

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  // @ts-expect-error extended session
  const role = session?.user?.role;
  if (!session || (role !== "ADMIN" && role !== "MODERATOR")) {
    return NextResponse.json({ error: "Sin permisos" }, { status: 403 });
  }

  const { id } = await params;
  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ error: "Acción inválida" }, { status: 400 });

  const status = parsed.data.action === "approve" ? "ACTIVE" : "REMOVED";
  const publishedAt = parsed.data.action === "approve" ? new Date() : null;

  await db.post.update({
    where: { id },
    data: { status, publishedAt },
  });

  return NextResponse.json({ success: true });
}
