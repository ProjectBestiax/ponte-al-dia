import type { Metadata } from "next";

export const metadata: Metadata = { title: "Política de Privacidad" };

export default function PrivacidadPage() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://ponte-al-dia.vercel.app";
  const email = "hola@pontealdia.com";

  return (
    <div className="max-w-2xl mx-auto prose prose-sm prose-gray">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Política de Privacidad</h1>
      <p className="text-sm text-gray-500 mb-8">Última actualización: junio de 2026</p>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">1. Responsable del tratamiento</h2>
        <p className="text-gray-600 text-sm">
          El responsable del tratamiento de los datos personales recogidos en <strong>Ponte al dIA</strong> ({appUrl}) es el titular del sitio web. Para cualquier consulta relacionada con la privacidad, puedes contactarnos en <a href={`mailto:${email}`} className="text-indigo-600 hover:underline">{email}</a>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">2. Datos que recopilamos</h2>
        <ul className="text-gray-600 text-sm space-y-1 list-disc pl-5">
          <li><strong>Datos de registro:</strong> nombre, dirección de correo electrónico e imagen de perfil, obtenidos a través de Google o GitHub OAuth.</li>
          <li><strong>Contenido publicado:</strong> posts, comentarios y votos que realizas en la plataforma.</li>
          <li><strong>Datos de uso:</strong> páginas visitadas, acciones realizadas y preferencias de cookies.</li>
          <li><strong>Datos técnicos:</strong> dirección IP, tipo de navegador y dispositivo, a través de los servicios de alojamiento (Vercel) y analítica.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">3. Finalidad del tratamiento</h2>
        <ul className="text-gray-600 text-sm space-y-1 list-disc pl-5">
          <li>Gestionar tu cuenta y permitirte acceder a la plataforma.</li>
          <li>Mostrar el contenido publicado por la comunidad.</li>
          <li>Mostrarte publicidad relevante mediante Google AdSense (solo con tu consentimiento).</li>
          <li>Mejorar el funcionamiento y la seguridad del sitio.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">4. Base legal</h2>
        <p className="text-gray-600 text-sm">
          El tratamiento se basa en tu consentimiento (art. 6.1.a RGPD) para cookies de publicidad y analítica, y en la ejecución de un contrato (art. 6.1.b RGPD) para la gestión de tu cuenta.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">5. Terceros y transferencias internacionales</h2>
        <ul className="text-gray-600 text-sm space-y-1 list-disc pl-5">
          <li><strong>Supabase</strong> — base de datos (UE/EEE).</li>
          <li><strong>Vercel</strong> — alojamiento web (EE. UU., con garantías adecuadas).</li>
          <li><strong>Google LLC</strong> — autenticación OAuth y publicidad AdSense (EE. UU., Privacy Shield / SCC).</li>
          <li><strong>GitHub Inc.</strong> — autenticación OAuth (EE. UU., SCC).</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">6. Conservación de datos</h2>
        <p className="text-gray-600 text-sm">
          Conservamos tus datos mientras mantengas una cuenta activa. Puedes solicitar la eliminación de tu cuenta en cualquier momento escribiéndonos a <a href={`mailto:${email}`} className="text-indigo-600 hover:underline">{email}</a>.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-2">7. Tus derechos</h2>
        <p className="text-gray-600 text-sm mb-2">
          Conforme al RGPD, tienes derecho a:
        </p>
        <ul className="text-gray-600 text-sm space-y-1 list-disc pl-5">
          <li>Acceder a tus datos personales.</li>
          <li>Rectificar datos inexactos.</li>
          <li>Solicitar la supresión de tus datos.</li>
          <li>Oponerte al tratamiento o solicitar su limitación.</li>
          <li>Presentar una reclamación ante la AEPD (aepd.es).</li>
        </ul>
        <p className="text-gray-600 text-sm mt-2">
          Para ejercer tus derechos, escríbenos a <a href={`mailto:${email}`} className="text-indigo-600 hover:underline">{email}</a>.
        </p>
      </section>
    </div>
  );
}
