import type { Metadata } from "next";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { AlertasClient } from "./AlertasClient";

export const metadata: Metadata = {
  title: "Alertas · Ponte al dIA",
  description: "Configura alertas de palabras clave para recibir notificaciones cuando se publique contenido de IA que te interese.",
  robots: { index: false, follow: true },
};
export const dynamic = "force-dynamic";

export default async function AlertasPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/api/auth/signin");

  const [keywords, alerts] = await Promise.all([
    db.alertKeyword.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: "desc" },
    }),
    db.notification.findMany({
      where: { userId: session.user.id, type: "KEYWORD_ALERT" },
      orderBy: { createdAt: "desc" },
      take: 30,
      include: {
        post: { select: { slug: true, title: true, voteCount: true, commentCount: true } },
      },
    }),
  ]);

  return <AlertasClient initialKeywords={keywords} initialAlerts={alerts} />;
}
