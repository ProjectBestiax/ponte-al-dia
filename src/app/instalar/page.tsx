import type { Metadata } from "next";
import { InstallButton } from "./InstallButton";

export const metadata: Metadata = {
  title: "Instalar app · Ponte al dIA",
  description: "Añade Ponte al dIA a tu pantalla de inicio y accede como una app nativa. Estamos trabajando en la app oficial.",
};

export default function InstalarPage() {
  return (
    <div className="max-w-lg mx-auto px-6 py-12 text-center">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/icons/icon-192.png"
        alt="Ponte al dIA"
        className="w-20 h-20 rounded-2xl mx-auto mb-6 shadow-lg"
      />

      <h1 className="text-2xl font-bold text-zinc-900 mb-2">
        Añade Ponte al dIA a tu inicio
      </h1>
      <p className="text-sm text-zinc-500 mb-8">
        Accede a la comunidad de IA como si fuera una app nativa, sin abrir el navegador.
      </p>

      <InstallButton />

      <div className="mt-10 bg-amber-50 border border-amber-200 rounded-xl p-5 text-left">
        <p className="text-sm font-bold text-amber-900 mb-1">
          Estamos trabajando en la app
        </p>
        <p className="text-xs text-amber-700 leading-relaxed">
          Mientras preparamos la app oficial para iOS y Android, puedes instalar este acceso directo
          que funciona exactamente igual: sin barra del navegador, con icono en tu pantalla de inicio
          y acceso instantáneo a todo el contenido.
        </p>
      </div>

      <div className="mt-8 text-left">
        <h2 className="text-sm font-bold text-zinc-900 mb-4">Cómo instalar</h2>

        <div className="space-y-4">
          <div className="flex gap-3">
            <span className="shrink-0 w-7 h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold">1</span>
            <div>
              <p className="text-sm font-semibold text-zinc-800">Android (Chrome)</p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Pulsa el botón &quot;Instalar app&quot; de arriba, o ve al menú de Chrome (tres puntos) y selecciona &quot;Instalar aplicación&quot;.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="shrink-0 w-7 h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold">2</span>
            <div>
              <p className="text-sm font-semibold text-zinc-800">iPhone / iPad (Safari)</p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Pulsa el icono de compartir
                <span className="inline-flex items-center mx-1">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" y1="2" x2="12" y2="15"/></svg>
                </span>
                y luego &quot;Añadir a la pantalla de inicio&quot;.
              </p>
            </div>
          </div>

          <div className="flex gap-3">
            <span className="shrink-0 w-7 h-7 rounded-full bg-zinc-900 text-white flex items-center justify-center text-xs font-bold">3</span>
            <div>
              <p className="text-sm font-semibold text-zinc-800">Escritorio (Chrome / Edge)</p>
              <p className="text-xs text-zinc-500 mt-0.5">
                Haz clic en el icono de instalación en la barra de direcciones, o usa el menú del navegador.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
