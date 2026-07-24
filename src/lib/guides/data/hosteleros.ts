import type { GuideContent } from "@/lib/guides/types";

export const guide: GuideContent = {
  slug: "hosteleros",
  profession: "Hosteleros",
  icon: "🍽️",
  tagline: "Cartas, reseñas y gestión del día a día con IA",

  // ── SEO ──
  title: "IA para Hosteleros: cartas, reseñas y gestión del día a día",
  metaDescription:
    "Guía práctica de IA para hosteleros: herramientas reales para cartas, redes y reseñas, prompts copiables y un caso real de ahorro de tiempo en el negocio.",
  keywords: [
    "ia para hosteleros",
    "ia para restaurantes",
    "ia para bares",
    "gestión de reseñas con ia",
    "cartas de restaurante con ia",
    "ia para hostelería",
    "marketing para restaurantes con ia",
  ],
  updatedAt: "2026-07-24",

  // ── Cuerpo ──
  subtitle:
    "Cómo usar IA para escribir la carta, responder reseñas sin quemarte y preparar contenido para redes sin dedicarle las pocas horas libres que tienes.",
  intro: [
    "Llevar un bar o un restaurante es un oficio de horas contadas: entre la cocina, la sala y los proveedores, apenas queda tiempo para lo que rodea al negocio — actualizar la carta, contestar reseñas, publicar en redes, traducir el menú para el turista que entra por la puerta. Es precisamente ahí, en el trabajo administrativo y de comunicación, donde la IA puede quitarte horas sin tocar lo que de verdad importa: la comida y el trato.",
    "No se trata de que un algoritmo decida tu carta o hable por ti con los clientes. Se trata de tener un ayudante rápido que te propone descripciones de plato, borra el bloqueo de la hoja en blanco al escribir una reseña de respuesta, y monta las artes para redes en minutos en vez de un domingo entero. Tú sigues siendo quien revisa, ajusta y decide qué sale con tu nombre.",
    "Esta guía reúne 5 herramientas reales que ya usan hosteleros en España, prompts específicos para carta y comunicación con clientes, y un caso concreto de cómo se reduce el tiempo dedicado a redes y reseñas sin perder el tono cercano del negocio.",
  ],

  tools: [
    {
      name: "ChatGPT",
      forWhat:
        "Redactar descripciones de platos para la carta, responder reseñas (buenas y malas) y generar textos para redes sociales del negocio.",
      price: "Freemium (versión de pago desde ~20€/mes)",
      steps: [
        "Crea una conversación fija donde le expliques tu tipo de local, estilo de cocina y tono (informal, tradicional, gourmet).",
        "Pide siempre 2-3 versiones de una descripción o respuesta antes de elegir la que mejor encaja con tu local.",
        "Revisa cualquier ingrediente o alérgeno que mencione en una descripción de plato: puede equivocarse si no se lo confirmas tú.",
      ],
      url: "https://chat.openai.com",
      urlLabel: "chat.openai.com",
    },
    {
      name: "Claude",
      forWhat:
        "Redactar respuestas a reseñas largas o delicadas (quejas, malentendidos) y textos de comunicación con proveedores o clientes habituales.",
      price: "Freemium (versión de pago desde ~20€/mes)",
      steps: [
        "Pega la reseña completa y explica brevemente qué pasó realmente esa noche desde tu punto de vista.",
        "Pide una respuesta que reconozca el problema sin sonar defensivo ni a disculpa genérica de plantilla.",
        "Ajusta siempre el nombre del cliente y el detalle concreto antes de publicar la respuesta.",
      ],
      url: "https://claude.ai",
      urlLabel: "claude.ai",
    },
    {
      name: "Canva",
      forWhat:
        "Diseñar cartas, menús del día, carteles de ofertas y publicaciones para Instagram o Facebook sin necesidad de un diseñador.",
      price: "Freemium (Canva Pro desde ~12€/mes)",
      steps: [
        "Busca una plantilla de carta o menú del día en la categoría de restauración y sustituye los textos por los tuyos.",
        "Usa el redimensionado automático para adaptar el mismo diseño a carta, historia de Instagram y cartel de la puerta.",
        "Genera variaciones rápidas de un cartel de oferta con Magic Media cuando cambien los platos de temporada.",
      ],
      url: "https://www.canva.com",
      urlLabel: "canva.com",
    },
    {
      name: "Google Business Profile (funciones de IA)",
      forWhat:
        "Gestionar y responder reseñas de Google, generar descripciones del negocio y sugerir respuestas rápidas a preguntas frecuentes de clientes.",
      price: "Gratuita",
      steps: [
        "Activa las notificaciones de nuevas reseñas para responder en las primeras 24-48 horas, que es cuando más se valora.",
        "Usa las sugerencias de respuesta como borrador, pero añade siempre un detalle concreto de la visita antes de publicarla.",
        "Mantén actualizada la descripción del negocio y el horario, porque alimenta lo que la IA de Google muestra a quien busca cerca.",
      ],
      url: "https://www.google.com/business/",
      urlLabel: "google.com/business",
    },
    {
      name: "DeepL",
      forWhat:
        "Traducir la carta y los menús a inglés, francés u otros idiomas para clientes turistas, con más naturalidad que un traductor genérico.",
      price: "Freemium (versión Pro desde ~10€/mes)",
      steps: [
        "Pega el texto de la carta completo, no plato a plato, para que el traductor mantenga el tono coherente.",
        "Revisa especialmente los nombres de platos tradicionales o locales, que a veces se traducen mal o pierden sentido.",
        "Guarda un glosario de términos propios del local (nombres de platos de la casa) para reutilizarlo en futuras traducciones.",
      ],
      url: "https://www.deepl.com",
      urlLabel: "deepl.com",
    },
  ],

  prompts: [
    {
      title: "Descripción de plato para la carta",
      when: "Al actualizar la carta con un plato nuevo o de temporada y necesitar una descripción atractiva pero honesta.",
      prompt:
        "Actúa como redactor de cartas de restaurante especializado en [TIPO DE COCINA: ej. mediterránea, de mercado, tradicional]. Necesito la descripción para la carta de este plato: [NOMBRE DEL PLATO], que lleva [INGREDIENTES PRINCIPALES REALES] y se elabora [TÉCNICA O DETALLE: a la brasa, al horno, en su punto de cocción]. El tono del local es [TONO: informal y cercano / elegante / tradicional de toda la vida]. Escribe 3 versiones de descripción de máximo 25 palabras cada una, sin adjetivos vacíos tipo 'delicioso' o 'exquisito', que reflejen el ingrediente real y la técnica.",
      customize: [
        "Da los ingredientes y técnica REALES del plato; no dejes que la IA invente ingredientes que no lleva.",
        "Ajusta el TONO según el tipo de local, una descripción de tasca no debe sonar igual que la de un restaurante gourmet.",
        "Verifica manualmente los alérgenos antes de publicar la descripción; la IA no conoce la receta exacta de tu cocina.",
      ],
    },
    {
      title: "Respuesta a una reseña negativa",
      when: "Al recibir una reseña de queja en Google o TripAdvisor y no saber cómo responder sin sonar defensivo.",
      prompt:
        "He recibido esta reseña negativa en [PLATAFORMA]: \"[PEGAR TEXTO DE LA RESEÑA]\". Lo que realmente pasó esa noche fue: [TU VERSIÓN BREVE DE LOS HECHOS]. Escribe una respuesta pública de máximo 80 palabras que reconozca el problema sin admitir culpas que no corresponden, agradezca el feedback, y ofrezca una solución o invitación a hablar en privado. Tono cercano y profesional, sin sonar a disculpa de plantilla ni a excusa.",
      customize: [
        "Aporta siempre tu versión real de los hechos para que la respuesta no suene genérica o evasiva.",
        "Cambia el cierre según el caso: a veces conviene ofrecer una solución concreta, otras solo agradecer y aclarar.",
        "Revisa el tono antes de publicar, sobre todo si la reseña es injusta: no debe sonar molesto ni sarcástico.",
      ],
    },
    {
      title: "Post para redes sociales de un plato o evento",
      when: "Al preparar una publicación para Instagram o Facebook sobre un plato nuevo, una oferta o un evento del local.",
      prompt:
        "Necesito un texto para una publicación de Instagram sobre [PLATO/OFERTA/EVENTO: descripción breve] en mi [TIPO DE LOCAL] llamado [NOMBRE DEL NEGOCIO], en [CIUDAD/BARRIO]. El objetivo es [OBJETIVO: atraer gente esta semana / dar a conocer un plato nuevo / anunciar un evento]. Escribe un texto de máximo 60 palabras, tono cercano y directo (nada de lenguaje publicitario forzado), con una llamada a la acción clara al final, y sugiere 5 hashtags relevantes en español.",
      customize: [
        "Menciona el barrio o ciudad concreta para que conecte con clientela local, no un texto genérico de 'restaurante'.",
        "Cambia el OBJETIVO según si buscas más reservas, más gente sin reserva o dar visibilidad a un plato concreto.",
        "Ajusta los hashtags según lo que realmente se usa en tu zona; revisa cuáles tienen actividad real antes de usarlos.",
      ],
    },
    {
      title: "Traducción de la carta con notas de alérgenos",
      when: "Al preparar la carta en otro idioma para clientes turistas, asegurando que los alérgenos queden claros.",
      prompt:
        "Necesito traducir esta carta de restaurante al [IDIOMA: inglés/francés/etc.]: [PEGAR TEXTO COMPLETO DE LA CARTA CON INGREDIENTES]. Mantén los nombres de platos tradicionales entre paréntesis en el idioma original si no tienen traducción directa. Añade entre corchetes los alérgenos principales de cada plato según los ingredientes que te he dado, para que quede claro al cliente. No inventes ingredientes ni alérgenos que no te he indicado.",
      customize: [
        "Aporta la lista de ingredientes y alérgenos ya verificada por ti; nunca dejes que la IA los deduzca sola.",
        "Revisa los nombres de platos tradicionales traducidos, algunos pierden sentido o suenan raros en otro idioma.",
        "Haz una segunda pasada manual antes de imprimir, comparando la traducción con la carta original plato a plato.",
      ],
    },
  ],

  workflow: {
    title: "Caso real: cómo un restaurante redujo de un domingo entero a 2 horas la gestión semanal de redes y reseñas",
    before: "Un domingo completo cada semana escribiendo posts para redes, diseñando artes en el móvil y respondiendo reseñas acumuladas de días anteriores.",
    after: "2 horas: generación de textos e imágenes asistida por IA + revisión y publicación, repartido en el día a día.",
    steps: [
      "Cada vez que entra una reseña nueva en Google, se responde el mismo día usando el prompt de respuesta, ajustando el detalle real de la visita.",
      "Los domingos, se piden 3-4 ideas de post de la semana según los platos de temporada o eventos del local con el prompt de redes.",
      "Se generan las artes en Canva a partir de una plantilla ya adaptada al local, cambiando solo foto y texto cada vez.",
      "Se programan las publicaciones directamente desde Canva o Meta Business Suite para toda la semana de una vez.",
      "Cuando cambia la carta de temporada, se traduce con DeepL y se revisan alérgenos e ingredientes a mano antes de imprimir.",
      "El tiempo ahorrado se reparte en pequeños huecos entre servicios, sin perder el domingo libre.",
    ],
  },

  mistakes: [
    {
      mistake: "Publicar descripciones de platos con ingredientes o alérgenos que la IA ha inventado o supuesto mal.",
      solution:
        "Verifica siempre a mano cada alérgeno e ingrediente antes de imprimir la carta; la IA no conoce la receta real de tu cocina, solo lo que tú le has contado.",
    },
    {
      mistake: "Responder reseñas o publicar en redes con un tono que no encaja con el estilo del local (demasiado formal en una tasca, demasiado informal en un restaurante elegante).",
      solution:
        "Explícale a la IA el tono real de tu negocio con ejemplos de cómo hablarías tú mismo, y pide varias versiones para elegir la que mejor suena en tu voz.",
    },
    {
      mistake: "Responder a todas las reseñas negativas con el mismo texto genérico de disculpa.",
      solution:
        "Aporta siempre el contexto real de lo que pasó esa noche, aunque sea breve, para que la respuesta reconozca el caso concreto y no suene a copia-pega.",
    },
    {
      mistake: "Traducir la carta plato a plato sin revisar el conjunto, perdiendo coherencia en nombres de platos tradicionales.",
      solution:
        "Traduce la carta completa de una vez para mantener el tono, y haz una segunda revisión manual comparando con el original antes de imprimir.",
    },
  ],

  resources: [
    {
      label: "Debates sobre IA y hostelería",
      href: "/debates",
      note: "Comparte cómo usas la IA en tu negocio y aprende de la experiencia de otros hosteleros.",
    },
    {
      label: "IA para Comerciales",
      href: "/guias/ia-para-comerciales",
      note: "Si además gestionas ventas a empresas o eventos, esta guía complementa la tuya.",
    },
    {
      label: "Explora herramientas por categoría",
      href: "/?categoria=herramientas",
      note: "Más herramientas de IA probadas, organizadas por caso de uso.",
    },
  ],

  faqs: [
    {
      q: "¿Puede la IA equivocarse con los alérgenos de un plato?",
      a: "Sí, si le pides que los deduzca sola. La IA solo sabe lo que tú le cuentas: dale siempre los ingredientes exactos y verifica a mano el resultado antes de publicarlo en la carta.",
    },
    {
      q: "¿Es seguro usar IA para responder reseñas de clientes?",
      a: "Sí, como borrador. Genera una respuesta con el contexto real de lo ocurrido, pero revísala y ajústala tú antes de publicarla; una respuesta demasiado genérica se nota y puede empeorar la percepción.",
    },
    {
      q: "¿La IA puede diseñar la carta entera de mi restaurante?",
      a: "Puede ayudarte con el texto y con plantillas de diseño en herramientas como Canva, pero el criterio final de qué platos incluir, precios y maquetación debe revisarlo siempre alguien del negocio.",
    },
    {
      q: "¿Cuánto tiempo se tarda en aprender a usar estas herramientas sin conocimientos previos?",
      a: "Con ChatGPT o Claude, en menos de una hora ya puedes generar tus primeras descripciones o respuestas; el tiempo real se invierte en encontrar el tono correcto para tu negocio, que mejora con la práctica.",
    },
    {
      q: "¿Qué herramienta conviene más si solo tengo tiempo para aprender una?",
      a: "ChatGPT es la más versátil para empezar: sirve para carta, redes y reseñas con una sola herramienta. Añade Canva después si necesitas mejorar el diseño de las publicaciones.",
    },
  ],
};
