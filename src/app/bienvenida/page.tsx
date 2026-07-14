import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUp, MessageSquare, Zap, Trophy, Bookmark, MailCheck } from "lucide-react";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";

export const metadata: Metadata = {
  title: "Bienvenida · Ponte al dIA",
  description: "Descubre cómo funciona Ponte al dIA, la comunidad de inteligencia artificial en español.",
};

const STEPS = [
  {
    icon: ArrowUp,
    title: "Vota lo mejor",
    desc: "Sube o baja el contenido que encuentres. Los más votados suben a Populares.",
    color: "text-accent-600",
  },
  {
    icon: MessageSquare,
    title: "Comenta y debate",
    desc: "Comparte tu opinión en cualquier post. La comunidad aprende junta.",
    color: "text-blue-600",
  },
  {
    icon: Bookmark,
    title: "Guarda para luego",
    desc: "Marca los posts que quieras releer. Los encontrarás en tu perfil.",
    color: "text-amber-600",
  },
  {
    icon: Zap,
    title: "Crea alertas",
    desc: "Recibe notificaciones cuando se publique algo sobre temas que te interesan.",
    color: "text-purple-600",
  },
  {
    icon: Trophy,
    title: "Sube en el ranking",
    desc: "Publica y vota para ganar karma. Los más activos aparecen en el ranking.",
    color: "text-orange-600",
  },
];

export default async function BienvenidaPage() {
  // Mostramos el aviso de verificación solo si el usuario tiene email sin verificar
  // (los usuarios OAuth de Google/GitHub llegan ya verificados).
  const session = await auth();
  let needsVerification = false;
  let userEmail: string | null = null;
  if (session?.user?.id) {
    const user = await db.user.findUnique({
      where: { id: session.user.id },
      select: { emailVerified: true, email: true, passwordHash: true },
    });
    // Solo cuentas de email/contraseña necesitan verificar.
    if (user && !user.emailVerified && user.passwordHash) {
      needsVerification = true;
      userEmail = user.email;
    }
  }

  return (
    <div className="max-w-xl mx-auto px-6 py-12">
      <div className="text-center mb-10">
        <h1
          className="text-3xl font-extrabold text-zinc-900 mb-3"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Bienvenido a{" "}
          <span className="text-accent-600">Ponte al dIA</span>
        </h1>
        <p className="text-zinc-500 text-base leading-relaxed">
          La comunidad en español para descubrir lo mejor de la IA.
          <br />
          Sin humo, sin FOMO. Solo lo que de verdad funciona.
        </p>
      </div>

      {needsVerification && (
        <div className="mb-8 flex items-start gap-3 rounded-xl border border-accent-200 bg-accent-50 p-4">
          <MailCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-600" strokeWidth={2.2} />
          <div>
            <h3 className="text-sm font-bold text-zinc-900">Verifica tu email</h3>
            <p className="mt-0.5 text-sm text-zinc-600">
              Te hemos enviado un correo{userEmail ? <> a <span className="font-medium text-zinc-800">{userEmail}</span></> : ""} para confirmar tu cuenta. Revisa tu bandeja de entrada (y la carpeta de spam).
            </p>
          </div>
        </div>
      )}

      <div className="space-y-4 mb-10">
        {STEPS.map((step, i) => (
          <div
            key={i}
            className="flex items-start gap-4 p-4 rounded-xl border border-zinc-100 bg-white"
          >
            <div className={`mt-0.5 ${step.color}`}>
              <step.icon className="w-5 h-5" strokeWidth={2.2} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-zinc-900">{step.title}</h3>
              <p className="text-sm text-zinc-500 mt-0.5">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="flex flex-col items-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent-400 text-accent-950 font-bold text-sm hover:bg-accent-500 transition-colors"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          Explorar el feed
        </Link>
        <Link
          href="/publicar"
          className="text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
        >
          o publica tu primer post →
        </Link>
      </div>
    </div>
  );
}
