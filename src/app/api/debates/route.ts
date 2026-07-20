import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { createDebate } from "@/lib/debates";
import { checkRateLimit } from "@/lib/rate-limit";
import { z } from "zod";

export const dynamic = "force-dynamic";

const schema = z.object({
  title: z.string().min(8).max(140),
  description: z.string().min(20).max(5000),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "No autenticado" }, { status: 401 });
  }

  const rl = await checkRateLimit("debate", session.user.id);
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Vas demasiado rápido. Espera un poco antes de crear otro debate." },
      { status: 429 }
    );
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Datos inválidos" },
      { status: 400 }
    );
  }

  const { title, description } = parsed.data;

  const debate = await createDebate({
    userId: session.user.id,
    title,
    description,
  });

  return NextResponse.json({ slug: debate.slug }, { status: 201 });
}
