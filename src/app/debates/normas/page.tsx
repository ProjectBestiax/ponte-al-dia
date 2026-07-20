import Link from "next/link";
import type { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Normas de los debates · Ponte al dIA",
    description: "Las normas de la comunidad para participar en los debates de Ponte al dIA.",
  };
}

export default function DebateRulesPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1
        className="text-2xl font-extrabold text-zinc-950 mb-3"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        Normas de la comunidad
      </h1>

      <p className="text-zinc-600 leading-relaxed mb-6">
        Los debates son un espacio para pensar en voz alta sobre la IA, contrastar puntos de
        vista y aprender de otras personas. Para que funcione, te pedimos que sigas estas normas:
      </p>

      <ol className="space-y-4 mb-8">
        <li className="bg-white border border-zinc-200 rounded-xl p-4">
          <p className="font-semibold text-zinc-900 mb-1">1. Respeto ante todo</p>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Nada de insultos, ataques personales ni faltas de respeto. Puedes estar en total
            desacuerdo con alguien y aun así tratarlo con educación.
          </p>
        </li>
        <li className="bg-white border border-zinc-200 rounded-xl p-4">
          <p className="font-semibold text-zinc-900 mb-1">2. Debate ideas, no personas</p>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Critica el argumento, no a quien lo dice. Un buen debate cuestiona ideas, no ataca a
            quien las defiende.
          </p>
        </li>
        <li className="bg-white border border-zinc-200 rounded-xl p-4">
          <p className="font-semibold text-zinc-900 mb-1">3. Nada de spam ni autopromo</p>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Evita el spam, la autopromoción encubierta y salirte del tema del debate.
          </p>
        </li>
        <li className="bg-white border border-zinc-200 rounded-xl p-4">
          <p className="font-semibold text-zinc-900 mb-1">4. Sin discurso de odio ni acoso</p>
          <p className="text-sm text-zinc-600 leading-relaxed">
            No se tolera el discurso de odio, el acoso ni ningún contenido ilegal.
          </p>
        </li>
        <li className="bg-white border border-zinc-200 rounded-xl p-4">
          <p className="font-semibold text-zinc-900 mb-1">5. Aporta</p>
          <p className="text-sm text-zinc-600 leading-relaxed">
            Un buen debate suma. Si solo vienes a provocar, este no es tu sitio.
          </p>
        </li>
      </ol>

      <p className="text-sm text-zinc-500 mb-8">
        Incumplir estas normas puede suponer que borremos tu mensaje o, si es reincidente, tu
        cuenta.
      </p>

      <Link
        href="/debates/nuevo"
        className="inline-flex items-center px-4 py-2 bg-accent-400 text-accent-950 text-sm font-semibold rounded-lg hover:bg-accent-500 transition-colors"
      >
        Abrir un debate
      </Link>
    </div>
  );
}
