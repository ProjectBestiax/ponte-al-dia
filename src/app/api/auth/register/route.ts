import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";

export async function POST(req: NextRequest) {
  const body = await req.json() as { name?: string; email?: string; password?: string };
  const { name, email, password } = body;

  if (!email || !password || !name) {
    return NextResponse.json({ error: "Todos los campos son obligatorios." }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres." }, { status: 400 });
  }

  const existing = await db.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "Ya existe una cuenta con este email." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  let username = slugify(name.slice(0, 30));
  const taken = await db.user.findUnique({ where: { username } });
  if (taken) username = `${username}-${Date.now().toString(36)}`;

  await db.user.create({
    data: {
      name,
      email,
      passwordHash,
      username,
      emailVerified: null,
    },
  });

  return NextResponse.json({ ok: true });
}
