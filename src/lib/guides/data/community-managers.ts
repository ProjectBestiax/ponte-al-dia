import type { GuideContent } from "@/lib/guides/types";

export const guide: GuideContent = {
  slug: "community-managers",
  profession: "Community Managers",
  icon: "📱",
  tagline: "Crea contenido en minutos y gestiona comunidades",

  // ── SEO ──
  title: "IA para Community Managers: crea y programa contenido en minutos",
  metaDescription:
    "Guía práctica de IA para community managers: herramientas reales, prompts copiables y un caso real para crear más contenido en menos tiempo.",
  keywords: [
    "ia para community managers",
    "ia redes sociales",
    "herramientas ia marketing digital",
    "generar contenido con ia",
    "programar publicaciones con ia",
    "ia para instagram",
    "copywriting con ia",
  ],
  updatedAt: "2026-07-21",

  // ── Cuerpo ──
  subtitle:
    "Cómo usar IA para producir más contenido, mantener la voz de marca y liberar tiempo para lo que de verdad importa: la comunidad.",
  intro: [
    "Si gestionas redes sociales, ya sabes cuál es el cuello de botella: no falta creatividad, falta tiempo. Una publicación al día en tres plataformas distintas, cada una con su formato, son fácilmente 2-3 horas diarias solo en producción. A eso hay que sumar responder comentarios, revisar métricas y preparar el informe mensual.",
    "La IA no viene a sustituirte, viene a quitarte de encima la parte mecánica: la primera versión de un copy, las 10 variaciones de un titular, la transcripción de un vídeo para sacar citas, el resumen de comentarios de la semana. Lo que decides tú sigue siendo tuyo: qué se publica, con qué tono, y cuándo.",
    "Esta guía reúne 5 herramientas que ya usan community managers en España, con prompts que puedes copiar y adaptar hoy mismo, y un caso real de cómo reducir el tiempo de producción de contenido sin perder calidad ni voz de marca.",
  ],

  tools: [
    {
      name: "ChatGPT",
      forWhat:
        "Generar copys, variaciones de un mismo mensaje para distintas redes, respuestas a comentarios frecuentes y calendarios de contenido.",
      price: "Freemium (versión de pago desde ~20€/mes)",
      steps: [
        "Crea un proyecto o chat dedicado y pégale tu guía de estilo de marca (tono, palabras prohibidas, ejemplos de posts que te gustan).",
        "Pide copys partiendo siempre de un objetivo y una plataforma concreta, nunca \"hazme un post\".",
        "Revisa y ajusta el resultado a tu voz real antes de publicar; no copies y pegues directo.",
      ],
      url: "https://chat.openai.com",
      urlLabel: "chat.openai.com",
    },
    {
      name: "Claude",
      forWhat:
        "Redactar textos más largos con tono consistente (newsletters, guiones de vídeo, hilos), y analizar documentos o informes de marca.",
      price: "Freemium (versión de pago desde ~20€/mes)",
      steps: [
        "Sube tu manual de marca o ejemplos de posts anteriores como referencia en la conversación.",
        "Pide primero un esquema o estructura antes del texto final, así corriges el enfoque sin reescribir todo.",
        "Usa un chat distinto por cliente o marca para no mezclar tonos y contextos.",
      ],
      url: "https://claude.ai",
      urlLabel: "claude.ai",
    },
    {
      name: "Canva (Magic Studio)",
      forWhat:
        "Generar diseños, adaptar un mismo creativo a los formatos de cada red social y quitar fondos o generar variaciones de imagen.",
      price: "Freemium (Canva Pro desde ~12€/mes)",
      steps: [
        "Diseña la pieza en un formato base y usa \"Redimensionar\" para adaptarla automáticamente a Stories, feed y LinkedIn.",
        "Prueba Magic Media para generar variantes de una imagen sin salir de Canva.",
        "Guarda tu kit de marca (colores, fuentes, logo) una vez para que cada diseño nuevo lo aplique solo.",
      ],
      url: "https://www.canva.com",
      urlLabel: "canva.com",
    },
    {
      name: "Metricool",
      forWhat:
        "Analizar el rendimiento de tus publicaciones con resúmenes generados por IA y detectar qué formato o franja horaria funciona mejor.",
      price: "Freemium (planes de pago desde ~18€/mes)",
      steps: [
        "Conecta tus perfiles de redes sociales para que empiece a recoger datos.",
        "Revisa el informe automático semanal y pídele que te destaque los 3 posts con mejor y peor rendimiento.",
        "Usa el planificador para programar contenido en base a los mejores horarios que detecta la herramienta.",
      ],
      url: "https://metricool.com",
      urlLabel: "metricool.com",
    },
    {
      name: "CapCut",
      forWhat:
        "Editar vídeos cortos para Reels, TikTok y Shorts con subtítulos automáticos, cortes y efectos generados por IA.",
      price: "Freemium (versión Pro de pago)",
      steps: [
        "Sube el vídeo en bruto y usa la función de subtítulos automáticos para generar el texto en pantalla.",
        "Aplica plantillas de corte automático para quitar silencios y muletillas sin editar fotograma a fotograma.",
        "Exporta directamente en el formato vertical/horizontal según la red donde vayas a publicar.",
      ],
      url: "https://www.capcut.com",
      urlLabel: "capcut.com",
    },
  ],

  prompts: [
    {
      title: "Batería de copys para una misma idea",
      when: "Cuando tienes un tema o anuncio y necesitas versiones para varias redes en un solo golpe.",
      prompt:
        "Actúa como community manager especializado en [SECTOR]. Tengo esta idea/anuncio: [DESCRIPCIÓN DEL TEMA]. Escribe 3 versiones del copy para [RED SOCIAL: Instagram/LinkedIn/X], con un tono [TONO DE MARCA: cercano, profesional, divertido...], máximo [NÚMERO] caracteres, incluyendo un gancho en la primera línea y una llamada a la acción clara. No uses emojis en exceso ni frases genéricas tipo 'en el mundo de hoy'.",
      customize: [
        "Sustituye SECTOR y TONO DE MARCA por los reales de tu cliente o marca.",
        "Cambia RED SOCIAL y NÚMERO de caracteres según el límite de cada plataforma.",
        "Pide explícitamente que evite frases hechas si el resultado te suena genérico.",
      ],
    },
    {
      title: "Respuesta a comentarios y mensajes frecuentes",
      when: "Para preparar respuestas tipo a preguntas que se repiten (precio, horarios, disponibilidad) sin sonar robótico.",
      prompt:
        "Tengo que responder a comentarios de este tipo en [RED SOCIAL]: \"[EJEMPLO DE COMENTARIO O PREGUNTA FRECUENTE]\". Nuestra marca tiene un tono [TONO: cercano y resolutivo / formal / divertido]. Escribe 3 variantes de respuesta breve (máximo 2 frases) que resuelvan la duda y, si aplica, dirijan a [ACCIÓN: escribir por privado, visitar la web, llamar]. Evita sonar como un mensaje automático.",
      customize: [
        "Pega el comentario real que has recibido para que el tono encaje con el contexto exacto.",
        "Indica la acción final que quieres provocar (DM, web, WhatsApp...).",
        "Guarda las mejores respuestas en un documento para reutilizarlas como plantilla.",
      ],
    },
    {
      title: "Calendario de contenido del mes",
      when: "Al planificar el mes: convierte una lista de temas sueltos en un calendario editorial con formato y objetivo por publicación.",
      prompt:
        "Voy a lanzar contenido durante el mes de [MES] para [MARCA/CLIENTE], que se dedica a [DESCRIPCIÓN DEL NEGOCIO]. Estos son los temas o fechas clave: [LISTA DE TEMAS/FECHAS]. Organízamelos en un calendario de [NÚMERO] publicaciones semanales, indicando para cada una: red social, formato (carrusel, reel, story, texto), objetivo (informar, vender, generar comunidad) y una idea de gancho. Prioriza variedad de formatos y evita repetir el mismo tipo de post dos semanas seguidas.",
      customize: [
        "Añade fechas comerciales relevantes (Black Friday, Navidad, lanzamientos) en la lista de temas.",
        "Ajusta el número de publicaciones semanales a tu capacidad real de producción.",
        "Pide que priorice el formato que mejor te esté funcionando según tus últimas métricas.",
      ],
    },
    {
      title: "Convertir un vídeo largo en contenido corto",
      when: "Cuando tienes la transcripción de un vídeo, podcast o webinar y quieres sacar piezas cortas para redes.",
      prompt:
        "Esta es la transcripción de un [VÍDEO/PODCAST/WEBINAR] de [DURACIÓN]: [PEGAR TRANSCRIPCIÓN O RESUMEN]. Identifica 5 momentos o citas que puedan funcionar como clips independientes para Reels/TikTok, y para cada uno dame: el minuto aproximado, una propuesta de título gancho, y un texto corto de acompañamiento para la publicación.",
      customize: [
        "Si no tienes transcripción exacta, pega un resumen detallado del contenido con los puntos clave.",
        "Pide que priorice momentos con datos, historias o frases polémicas, que suelen funcionar mejor.",
        "Adapta el número de clips a cuánto contenido corto necesitas esa semana.",
      ],
    },
  ],

  workflow: {
    title: "Caso real: cómo una community manager freelance redujo 6 horas semanales de producción de contenido",
    before: "6-7 horas semanales redactando copys, adaptando formatos y buscando ideas desde cero para 3 clientes.",
    after: "2 horas semanales: generación asistida por IA + revisión y ajuste de tono.",
    steps: [
      "Domingo: revisa en Metricool qué formato funcionó mejor la semana anterior para cada cliente.",
      "Con ChatGPT (con la guía de estilo de cada marca ya cargada en el proyecto), genera el calendario de la semana con el prompt de planificación.",
      "Para cada publicación, pide 2-3 variaciones del copy y elige/edita la que mejor encaja con la voz real de la marca.",
      "Diseña las piezas en Canva usando las plantillas de marca ya guardadas y redimensiona automáticamente para cada red.",
      "Programa todo en Metricool de una sola vez, dejando huecos libres para contenido reactivo o de última hora.",
      "El tiempo liberado se dedica a responder comentarios personalmente y analizar comunidad, la parte que la IA no puede hacer por ti.",
    ],
  },

  mistakes: [
    {
      mistake: "Publicar el primer copy que da la IA sin adaptarlo a la voz real de la marca.",
      solution:
        "Usa siempre la IA para la primera versión, nunca la final. Guarda ejemplos reales de posts que funcionaron y pégalos como referencia de tono en cada prompt.",
    },
    {
      mistake: "No dar contexto de marca y obtener contenido genérico que podría servir para cualquier empresa.",
      solution:
        "Crea un documento breve de marca (tono, público, palabras que sí y que no usáis) y pégalo al inicio de cada conversación o proyecto en la herramienta que uses.",
    },
    {
      mistake: "Sobrepublicar porque generar contenido es ahora más rápido, sin medir si aporta valor.",
      solution:
        "La IA reduce el tiempo de producción, no debe aumentar el volumen porque sí. Revisa las métricas antes de decidir publicar más y prioriza calidad sobre cantidad.",
    },
    {
      mistake: "Dejar que la IA responda directamente a comentarios o DMs sin supervisión humana.",
      solution:
        "Usa la IA para preparar borradores de respuesta, pero revisa y envía tú, especialmente en temas sensibles (quejas, reclamaciones, crisis de reputación).",
    },
  ],

  resources: [
    {
      label: "Debates sobre IA y redes sociales",
      href: "/debates",
      note: "Únete a la conversación con otros profesionales sobre cómo están usando la IA en su día a día.",
    },
    {
      label: "IA para Marketers",
      href: "/guias/ia-para-marketers",
      note: "Si además gestionas campañas de pago o análisis de datos, esta guía complementa la tuya.",
    },
    {
      label: "Explora prompts por categoría",
      href: "/?categoria=prompts",
      note: "Más prompts probados y listos para copiar, organizados por tarea y profesión.",
    },
  ],

  faqs: [
    {
      q: "¿La IA puede sustituir a un community manager?",
      a: "No. La IA acelera la parte mecánica (redactar, adaptar formatos, resumir datos) pero no sustituye el criterio: decidir qué publicar, gestionar una crisis o construir relación real con la comunidad sigue siendo trabajo humano.",
    },
    {
      q: "¿Cómo evito que el contenido generado por IA suene genérico?",
      a: "Dale siempre contexto de marca (tono, ejemplos de posts anteriores, público objetivo) antes de pedir el copy, y trata cada respuesta como un primer borrador que tienes que editar, nunca como el texto final.",
    },
    {
      q: "¿Es seguro usar IA para gestionar varios clientes a la vez?",
      a: "Sí, siempre que separes los contextos: usa un chat o proyecto distinto por cliente para que la IA no mezcle tonos de marca ni información confidencial entre ellos.",
    },
    {
      q: "¿Qué pasa con los derechos de las imágenes generadas por IA?",
      a: "Revisa siempre los términos de uso comercial de la herramienta que utilices (Canva Magic Media, Midjourney, etc.), ya que varían según el plan contratado y el destino final de la imagen (uso propio vs. cliente).",
    },
    {
      q: "¿Cuánto tiempo se puede ahorrar realmente usando IA en este trabajo?",
      a: "Depende del volumen, pero es habitual reducir entre un 40% y un 60% del tiempo dedicado a producción de contenido (redacción y diseño), tiempo que se puede reinvertir en estrategia y gestión de comunidad.",
    },
  ],
};
