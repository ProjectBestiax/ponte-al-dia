import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import { randomBytes } from "crypto";

export const dynamic = "force-dynamic";

// ─────────────────────────────────────────────────────────────────────────────
// DEV-ONLY login shortcut. OAuth callbacks aren't configured for localhost, so
// this creates a real DB session for a user without going through Google/GitHub.
// Hard-blocked in production: it returns 404 unless NODE_ENV === "development".
//
// Usage:  http://localhost:3000/api/dev/login            → logs in as default user
//         http://localhost:3000/api/dev/login?email=x    → logs in as that user
//         http://localhost:3000/api/dev/login?to=/perfil  → redirect target
// ─────────────────────────────────────────────────────────────────────────────
export async function GET(req: NextRequest) {
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse("Not found", { status: 404 });
  }

  const email = req.nextUrl.searchParams.get("email");
  const to = req.nextUrl.searchParams.get("to") ?? "/";

  const user = email
    ? await db.user.findUnique({ where: { email }, select: { id: true, email: true } })
    : ((await db.user.findFirst({ where: { role: "ADMIN" }, select: { id: true, email: true } })) ??
       (await db.user.findFirst({ select: { id: true, email: true } })));

  if (!user) {
    return new NextResponse("No hay usuarios en la base de datos para loguear.", { status: 404 });
  }

  const sessionToken = "dev-" + randomBytes(24).toString("hex");
  const expires = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
  await db.session.create({ data: { sessionToken, userId: user.id, expires } });

  const res = NextResponse.redirect(new URL(to, req.nextUrl.origin));
  // Dev is http on localhost, so the cookie name is the non-secure variant.
  res.cookies.set("authjs.session-token", sessionToken, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    expires,
  });
  return res;
}
