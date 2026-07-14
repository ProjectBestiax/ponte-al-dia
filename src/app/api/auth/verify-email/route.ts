import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

function page(message: string, isSuccess: boolean): Response {
  const color = isSuccess ? "#a3e635" : "#ef4444";
  const icon = isSuccess ? "✅" : "❌";
  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>${isSuccess ? "Email verificado" : "Enlace inválido"}</title></head>
<body style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f4f4f5;">
<div style="max-width:440px;margin:80px auto;padding:0 16px;text-align:center;">
  <div style="background:#fff;border:1px solid #e4e4e7;border-radius:16px;padding:32px 26px;">
    <div style="font-size:34px;margin-bottom:12px;">${icon}</div>
    <h1 style="font-size:18px;color:#0a0a0a;margin:0 0 8px;">${message}</h1>
    <p style="font-size:14px;color:#71717a;margin:0 0 20px;">${isSuccess ? "Tu email está verificado, ya puedes publicar y comentar." : "El enlace es inválido o ha expirado (24 horas)."}</p>
    <a href="/" style="display:inline-block;background:${color};color:#fff;font-weight:700;font-size:14px;text-decoration:none;padding:11px 20px;border-radius:10px;">Volver a Ponte al dIA</a>
  </div>
</div></body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");

  if (!token) return page("Enlace no válido.", false);

  const user = await db.user.findUnique({
    where: { emailVerificationToken: token },
    select: { id: true, emailVerified: true },
  });

  if (!user) return page("Enlace no válido o expirado.", false);

  // Idempotente: no borramos el token al verificar. Los clientes de correo
  // (Gmail, Outlook) y escáneres pre-cargan los enlaces, lo que consumiría el
  // token antes de que el usuario haga clic. Manteniéndolo, el clic real
  // encuentra al usuario ya verificado y muestra éxito en vez de "inválido".
  if (user.emailVerified) return page("¡Tu email ya está verificado!", true);

  await db.user.update({
    where: { id: user.id },
    data: { emailVerified: new Date() },
  });

  return page("¡Email verificado correctamente!", true);
}
