import type { Metadata } from "next";

export const metadata: Metadata = { title: "Términos de Uso · Ponte al dIA" };

export default function TerminosPage() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "https://ponte-al-dia.vercel.app";
  const email = "hola@pontealdia.com";

  return (
    <div className="max-w-2xl mx-auto px-6 py-8 prose prose-sm prose-gray">
      <h1 className="text-2xl font-bold text-zinc-900 mb-2">Términos de Uso</h1>
      <p className="text-sm text-zinc-500 mb-8">Última actualización: junio de 2026</p>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-800 mb-2">1. Aceptación de los términos</h2>
        <p className="text-zinc-600 leading-relaxed">
          Al acceder y usar Ponte al dIA ({appUrl}), aceptas quedar vinculado por estos Términos de Uso. Si no estás de acuerdo con alguna parte de estos términos, no debes usar el servicio.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-800 mb-2">2. Descripción del servicio</h2>
        <p className="text-zinc-600 leading-relaxed">
          Ponte al dIA es una comunidad hispanohablante para descubrir, compartir y debatir noticias y recursos sobre inteligencia artificial. Los usuarios pueden publicar enlaces, votar contenido y participar en comentarios.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-800 mb-2">3. Registro y cuenta</h2>
        <p className="text-zinc-600 leading-relaxed">
          Para publicar contenido o votar necesitas crear una cuenta mediante Google u otro proveedor de autenticación disponible. Eres responsable de mantener la confidencialidad de tu cuenta y de todas las actividades que ocurran bajo ella.
        </p>
        <p className="text-zinc-600 leading-relaxed mt-2">
          Debes tener al menos 16 años para usar este servicio. Al registrarte, garantizas que cumples con este requisito de edad.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-800 mb-2">4. Normas de conducta</h2>
        <p className="text-zinc-600 leading-relaxed mb-2">Al usar Ponte al dIA te comprometes a:</p>
        <ul className="text-zinc-600 space-y-1 list-disc list-inside">
          <li>No publicar contenido ilegal, difamatorio, acosador o que infrinja derechos de terceros.</li>
          <li>No hacer spam, publicidad no solicitada ni manipular artificialmente los votos.</li>
          <li>No intentar acceder a sistemas o datos sin autorización.</li>
          <li>Respetar a otros miembros de la comunidad en los comentarios.</li>
          <li>Publicar únicamente contenido relacionado con inteligencia artificial y tecnología.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-800 mb-2">5. Contenido del usuario</h2>
        <p className="text-zinc-600 leading-relaxed">
          Al publicar contenido en Ponte al dIA, nos otorgas una licencia no exclusiva, gratuita y mundial para mostrar, distribuir y promover dicho contenido en el marco del servicio. Mantienes todos los derechos sobre tu contenido y eres responsable de que no infrinja derechos de terceros.
        </p>
        <p className="text-zinc-600 leading-relaxed mt-2">
          Nos reservamos el derecho de eliminar cualquier contenido que viole estas normas, sin previo aviso.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-800 mb-2">6. Sistema de karma y votos</h2>
        <p className="text-zinc-600 leading-relaxed">
          El sistema de karma refleja la contribución de cada usuario a la comunidad. Los votos son un mecanismo de curación colectiva. Nos reservamos el derecho de ajustar el sistema en cualquier momento para garantizar la calidad del contenido.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-800 mb-2">7. Limitación de responsabilidad</h2>
        <p className="text-zinc-600 leading-relaxed">
          Ponte al dIA se proporciona &ldquo;tal cual&rdquo; sin garantías de ningún tipo. No somos responsables de los contenidos publicados por los usuarios ni de los daños que puedan derivarse del uso del servicio.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-800 mb-2">8. Modificaciones</h2>
        <p className="text-zinc-600 leading-relaxed">
          Podemos modificar estos términos en cualquier momento. Te notificaremos de cambios significativos y el uso continuado del servicio tras la notificación implica la aceptación de los nuevos términos.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-lg font-semibold text-zinc-800 mb-2">9. Contacto</h2>
        <p className="text-zinc-600 leading-relaxed">
          Para cualquier consulta sobre estos términos, escríbenos a{" "}
          <a href={`mailto:${email}`} className="text-blue-600 hover:underline">{email}</a>.
        </p>
      </section>
    </div>
  );
}
