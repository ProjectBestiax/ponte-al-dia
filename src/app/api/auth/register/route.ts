import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";

const USERNAME_RE = /^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$/;

export async function POST(req: NextRequest) {
  const body = await req.json() as { name?: string; email?: string; password?: string; username?: string };
  const { name, email, password, username } = body;

  if (!email || !password || !name || !username) {
    return NextResponse.json({ error: "Todos los campos son obligatorios." }, { status: 400 });
  }

  const cleanUsername = username.toLowerCase().trim();

  if (cleanUsername.length < 3 || cleanUsername.length > 24) {
    return NextResponse.json({ error: "El usuario debe tener entre 3 y 24 caracteres." }, { status: 400 });
  }

  if (!USERNAME_RE.test(cleanUsername)) {
    return NextResponse.json({ error: "Solo letras, números, puntos, guiones y guiones bajos. Sin espacios." }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "La contraseña debe tener al menos 6 caracteres." }, { status: 400 });
  }

  const [existingEmail, existingUsername] = await Promise.all([
    db.user.findUnique({ where: { email } }),
    db.user.findUnique({ where: { username: cleanUsername } }),
  ]);

  if (existingEmail) {
    return NextResponse.json({ error: "Ya existe una cuenta con este email." }, { status: 409 });
  }

  if (existingUsername) {
    return NextResponse.json({ error: "Este nombre de usuario ya está en uso." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);

  await db.user.create({
    data: {
      name,
      email,
      passwordHash,
      username: cleanUsername,
      emailVerified: null,
    },
  });

  return NextResponse.json({ ok: true });
}
