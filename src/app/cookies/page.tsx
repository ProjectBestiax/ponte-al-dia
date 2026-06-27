import type { Metadata } from "next";

export const metadata: Metadata = { title: "Política de Cookies" };

export default function CookiesPage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-zinc-900 mb-2">Política de Cookies</h1>
      <p className="text-sm text-zinc-500 mb-8">Última actualización: junio de 2026</p>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-800 mb-2">¿Qué son las cookies?</h2>
        <p className="text-zinc-600 text-sm">
          Las cookies son pequeños archivos de texto que los sitios web guardan en tu dispositivo para recordar información sobre tu visita, como tus preferencias o tu sesión iniciada.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-800 mb-2">Cookies que utilizamos</h2>

        <div className="overflow-x-auto">
          <table className="w-full text-sm border border-zinc-200 rounded-lg overflow-hidden">
            <thead className="bg-zinc-50">
              <tr>
                <th className="text-left px-3 py-2 text-zinc-700 font-medium">Cookie</th>
                <th className="text-left px-3 py-2 text-zinc-700 font-medium">Tipo</th>
                <th className="text-left px-3 py-2 text-zinc-700 font-medium">Finalidad</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              <tr>
                <td className="px-3 py-2 text-zinc-600 font-mono text-xs">authjs.session-token</td>
                <td className="px-3 py-2"><span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full">Esencial</span></td>
                <td className="px-3 py-2 text-zinc-600">Mantiene tu sesión iniciada.</td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-zinc-600 font-mono text-xs">cookie-consent</td>
                <td className="px-3 py-2"><span className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded-full">Esencial</span></td>
                <td className="px-3 py-2 text-zinc-600">Guarda tus preferencias de cookies.</td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-zinc-600 font-mono text-xs">_ga, _gid</td>
                <td className="px-3 py-2"><span className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded-full">Analítica</span></td>
                <td className="px-3 py-2 text-zinc-600">Google Analytics — estadísticas de uso anónimas. Solo si aceptas.</td>
              </tr>
              <tr>
                <td className="px-3 py-2 text-zinc-600 font-mono text-xs">__gads, __gpi</td>
                <td className="px-3 py-2"><span className="bg-orange-50 text-orange-700 text-xs px-2 py-0.5 rounded-full">Publicidad</span></td>
                <td className="px-3 py-2 text-zinc-600">Google AdSense — publicidad personalizada. Solo si aceptas.</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-800 mb-2">Cómo gestionar tus cookies</h2>
        <p className="text-zinc-600 text-sm mb-3">
          Puedes modificar tus preferencias en cualquier momento borrando la cookie <code className="bg-zinc-100 px-1 rounded text-xs">cookie-consent</code> de tu navegador, lo que hará que el banner de cookies aparezca de nuevo en tu próxima visita.
        </p>
        <p className="text-zinc-600 text-sm">
          También puedes desactivar las cookies directamente desde la configuración de tu navegador:
        </p>
        <ul className="text-zinc-600 text-sm mt-2 space-y-1 list-disc pl-5">
          <li><a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Google Chrome</a></li>
          <li><a href="https://support.mozilla.org/es/kb/habilitar-y-deshabilitar-cookies" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Mozilla Firefox</a></li>
          <li><a href="https://support.apple.com/es-es/guide/safari/sfri11471/mac" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">Safari</a></li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-800 mb-2">Cookies de terceros</h2>
        <p className="text-zinc-600 text-sm">
          Google AdSense puede utilizar cookies para mostrar anuncios basados en tus visitas previas a este y otros sitios web. Puedes optar por no recibir publicidad personalizada en{" "}
          <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
            Configuración de anuncios de Google
          </a>.
        </p>
      </section>
    </div>
  );
}
