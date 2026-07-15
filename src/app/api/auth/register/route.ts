import { NextRequest, NextResponse } from "next/server";
import { after } from "next/server";
import bcrypt from "bcryptjs";
import { db } from "@/lib/db";
import { sendEmail } from "@/lib/email";
import { getEmailVerificationToken, verifyEmailUrl } from "@/lib/email";
import { verifyEmailTemplate } from "@/lib/email-templates";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { getPostHogClient } from "@/lib/posthog-server";

const USERNAME_RE = /^[a-z0-9]([a-z0-9._-]*[a-z0-9])?$/;

export async function POST(req: NextRequest) {
  // Anti-abuso: limita registros por IP (evita crear cuentas en masa y disparar
  // envíos de email de verificación).
  const rl = await checkRateLimit("register", getClientIp(req));
  if (!rl.ok) {
    return NextResponse.json(
      { error: "Demasiados registros desde esta conexión. Inténtalo de nuevo en un rato." },
      { status: 429 }
    );
  }

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

  const user = await db.user.create({
    data: {
      name,
      email,
      passwordHash,
      username: cleanUsername,
      emailVerified: null,
    },
  });

  // Capture server-side registration event and identify the new user.
  const posthog = getPostHogClient();
  posthog.capture({
    distinctId: user.id,
    event: "user_registered",
    properties: { method: "email", username: user.username },
  });
  posthog.identify({
    distinctId: user.id,
    properties: { name: user.name, username: user.username },
  });
  // Short-lived handler: flush before returning so the events are not dropped.
  await posthog.flush();

  // Generate verification token and send email (async, doesn't block response)
  after(async () => {
    try {
      const token = await getEmailVerificationToken(user.id);
      const verifyLink = verifyEmailUrl(token);
      const { subject, html } = verifyEmailTemplate({ verificationLink: verifyLink });
      await sendEmail({ to: email, subject, html });
    } catch {
      // Log but don't fail signup if email fails
      console.error("[register] email send failed:", email);
    }
  });

  return NextResponse.json({ ok: true, message: "Verifica tu email para activar tu cuenta." });
}
