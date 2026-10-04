import { NextRequest, NextResponse } from "next/server";
import { encode } from "next-auth/jwt";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────────────────────────────────────
// DEV-ONLY login shortcut. OAuth callbacks aren't configured for localhost, so
// this signs the same session JWT NextAuth issues on a real login.
// Hard-blocked in production: it returns 404 unless NODE_ENV === "development".
//
// Usage:  http://localhost:3000/api/dev/login            → logs in as default user
//         http://localhost:3000/api/dev/login?email=x    → logs in as that user
//         http://localhost:3000/api/dev/login?to=/perfil  → redirect target
// ─────────────────────────────────────────────────────────────────────────────
const COOKIE = "authjs.session-token"; // http on localhost → non-secure cookie name
const MAX_AGE = 30 * 24 * 60 * 60;

export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse("Not found", { status: 404 });
  }

  const email = req.nextUrl.searchParams.get("email");
  const toParam = req.nextUrl.searchParams.get("to") ?? "/";
  const to = toParam.startsWith("/") && !toParam.startsWith("//") ? toParam : "/";

  const select = { id: true, email: true, name: true, image: true } as const;
  const user = email
    ? await db.user.findUnique({ where: { email }, select })
    : ((await db.user.findFirst({ where: { role: "ADMIN" }, select })) ??
       (await db.user.findFirst({ select })));

  if (!user) {
    return new NextResponse("No hay usuarios en la base de datos para loguear.", { status: 404 });
  }

  // Role, username, karma… are filled in by the jwt callback in src/lib/auth.ts
  // on the first request, exactly as after a real sign-in.
  const token = await encode({
    token: { sub: user.id, id: user.id, email: user.email, name: user.name, picture: user.image },
    secret: process.env.AUTH_SECRET!,
    salt: COOKIE,
    maxAge: MAX_AGE,
  });

  const res = NextResponse.redirect(new URL(to, req.nextUrl.origin));
  res.cookies.set(COOKIE, token, { httpOnly: true, sameSite: "lax", path: "/", maxAge: MAX_AGE });
  return res;
}
