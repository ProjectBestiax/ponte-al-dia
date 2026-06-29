import { NextRequest } from "next/server";
import { db } from "@/lib/db";

export const dynamic = "force-dynamic";

function page(message: string): Response {
  const html = `<!DOCTYPE html><html lang="es"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><title>Preferencias de email</title></head>
<body style="margin:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;background:#f4f4f5;">
<div style="max-width:440px;margin:80px auto;padding:0 16px;text-align:center;">
  <div style="background:#fff;border:1px solid #e4e4e7;border-radius:16px;padding:32px 26px;">
    <div style="font-size:34px;margin-bottom:12px;">✅</div>
    <h1 style="font-size:18px;color:#0a0a0a;margin:0 0 8px;">${message}</h1>
    <p style="font-size:14px;color:#71717a;margin:0 0 20px;">Puedes volver a activarlas cuando quieras desde tu perfil.</p>
    <a href="/" style="display:inline-block;background:#2563eb;color:#fff;font-weight:700;font-size:14px;text-decoration:none;padding:11px 20px;border-radius:10px;">Volver a Ponte al dIA</a>
  </div>
</div></body></html>`;
  return new Response(html, { headers: { "Content-Type": "text/html; charset=utf-8" } });
}

export async function GET(req: NextRequest) {
  const token = req.nextUrl.searchParams.get("token");
  const type = req.nextUrl.searchParams.get("type") ?? "all";

  if (!token) return page("Enlace no válido.");

  const user = await db.user.findUnique({ where: { unsubscribeToken: token }, select: { id: true } });
  if (!user) return page("Enlace no válido o caducado.");

  const data: { emailReplies?: boolean; emailDigest?: boolean } = {};
  if (type === "replies" || type === "all") data.emailReplies = false;
  if (type === "digest" || type === "all") data.emailDigest = false;

  await db.user.update({ where: { id: user.id }, data });

  const labels: Record<string, string> = {
    replies: "Te has dado de baja de los avisos de comentarios.",
    digest: "Te has dado de baja del resumen semanal.",
    all: "Te has dado de baja de todos los emails.",
  };
  return page(labels[type] ?? labels.all);
}
