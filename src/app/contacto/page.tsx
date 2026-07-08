import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contacto · Ponte al dIA",
  description: "Ponte en contacto con el equipo de Ponte al dIA. Dudas, sugerencias, colaboraciones o cualquier consulta.",
};

export default function ContactoPage() {
  const email = "projectbestiax@gmail.com";

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 prose prose-sm prose-gray">
      <h1 className="text-2xl font-bold text-zinc-900 mb-2">Contacto</h1>
      <p className="text-sm text-zinc-500 mb-8">Estamos aquí para ayudarte</p>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-800 mb-2">Escríbenos</h2>
        <p className="text-zinc-600 text-sm">
          Para cualquier consulta, sugerencia o propuesta de colaboración, puedes escribirnos a:
        </p>
        <p className="mt-2">
          <a href={`mailto:${email}`} className="inline-flex items-center gap-2 px-4 py-2.5 bg-zinc-900 text-white rounded-lg text-sm font-semibold hover:bg-zinc-700 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
            {email}
          </a>
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-800 mb-2">¿Sobre qué puedes escribirnos?</h2>
        <ul className="text-zinc-600 text-sm space-y-2 list-disc pl-5">
          <li><strong>Dudas generales:</strong> sobre el funcionamiento de la plataforma, tu cuenta o tus publicaciones.</li>
          <li><strong>Sugerencias:</strong> ideas para mejorar Ponte al dIA, nuevas funcionalidades o categorías.</li>
          <li><strong>Colaboraciones:</strong> si quieres colaborar con nosotros, proponer contenido o alianzas.</li>
          <li><strong>Publicidad:</strong> consultas sobre espacios publicitarios o patrocinios.</li>
          <li><strong>Problemas técnicos:</strong> errores, bugs o cualquier incidencia que encuentres.</li>
          <li><strong>Privacidad y datos:</strong> solicitudes relacionadas con tus datos personales (acceso, rectificación, eliminación).</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-800 mb-2">Tiempo de respuesta</h2>
        <p className="text-zinc-600 text-sm">
          Intentamos responder a todos los correos en un plazo máximo de <strong>48 horas laborables</strong>. Si tu consulta es urgente, indícalo en el asunto del correo.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-800 mb-2">Redes sociales</h2>
        <p className="text-zinc-600 text-sm">
          También puedes seguirnos y contactarnos a través de nuestras redes sociales para estar al día de las últimas novedades.
        </p>
      </section>
    </div>
  );
}
