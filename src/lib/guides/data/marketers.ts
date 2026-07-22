import type { GuideContent } from "@/lib/guides/types";

export const guide: GuideContent = {
  slug: "marketers",
  profession: "Marketers",
  icon: "📊",
  tagline: "Campañas, análisis y copywriting automático",

  // ── SEO ──
  title: "IA para Marketers: automatiza campañas, análisis y copywriting",
  metaDescription:
    "Guía práctica de IA para marketers: herramientas reales, prompts copiables para campañas y análisis, y un caso real de ahorro de tiempo.",
  keywords: [
    "ia para marketers",
    "ia marketing digital",
    "herramientas ia campañas",
    "copywriting con ia",
    "análisis de datos con ia",
    "ia para publicidad",
    "automatizar marketing con ia",
  ],
  updatedAt: "2026-07-21",

  // ── Cuerpo ──
  subtitle:
    "Cómo usar IA para lanzar campañas más rápido, analizar resultados sin perder horas en hojas de cálculo y escribir copys que convierten.",
  intro: [
    "El trabajo de marketing tiene dos velocidades: la de pensar la estrategia y la de ejecutarla. La primera necesita criterio, contexto de negocio y experiencia; la segunda —escribir 15 variantes de un anuncio, resumir un informe de rendimiento, segmentar una base de datos— es donde más tiempo se pierde y donde la IA aporta más.",
    "No se trata de generar contenido en piloto automático. Se trata de usar la IA como un analista junior y un redactor rápido que trabaja contigo: le das el contexto, revisas el resultado, y decides tú qué se lanza. El marketer que sabe usar bien estas herramientas no compite con quien no las usa en velocidad de producción, sino en tiempo dedicado a pensar mejor las decisiones que importan.",
    "Esta guía reúne 5 herramientas reales que ya usan equipos de marketing en España, prompts específicos para campañas y análisis, y un caso concreto de cómo se reduce el tiempo de preparación de un informe mensual sin perder rigor.",
  ],

  tools: [
    {
      name: "ChatGPT",
      forWhat:
        "Generar copys publicitarios, variantes de anuncios para test A/B, briefs de campaña y respuestas a análisis de datos que le pegues.",
      price: "Freemium (versión de pago desde ~20€/mes)",
      steps: [
        "Crea un proyecto por marca o cliente y pega ahí el brief, buyer persona y tono de comunicación.",
        "Pide siempre varias variantes de un mismo anuncio para poder testear, nunca una sola versión final.",
        "Valida cifras y datos que te dé sobre mercado o competencia; puede equivocarse o inventar detalles.",
      ],
      url: "https://chat.openai.com",
      urlLabel: "chat.openai.com",
    },
    {
      name: "Claude",
      forWhat:
        "Analizar informes largos (PDF de resultados, hojas de cálculo exportadas), redactar informes ejecutivos y sintetizar insights de campañas.",
      price: "Freemium (versión de pago desde ~20€/mes)",
      steps: [
        "Sube el informe o exportación de datos directamente como archivo en la conversación.",
        "Pide primero un resumen ejecutivo de 3-5 puntos antes de pedir el análisis detallado.",
        "Pide que te señale anomalías o cambios de tendencia relevantes en vez de repetir todos los números.",
      ],
      url: "https://claude.ai",
      urlLabel: "claude.ai",
    },
    {
      name: "Gemini",
      forWhat:
        "Investigación de mercado y competencia con acceso a información actualizada de la web, e integración directa con Google Sheets y Ads.",
      price: "Freemium (Gemini Advanced de pago)",
      steps: [
        "Usa el modo de búsqueda para pedir un resumen actualizado de tendencias o movimientos de la competencia.",
        "Conéctalo con Google Workspace para trabajar directamente sobre tus hojas de cálculo de campañas.",
        "Pide siempre las fuentes de la información para poder verificarla antes de usarla en un informe.",
      ],
      url: "https://gemini.google.com",
      urlLabel: "gemini.google.com",
    },
    {
      name: "Perplexity",
      forWhat:
        "Investigación rápida de mercado, competencia y tendencias con fuentes citadas, ideal para briefs de campaña.",
      price: "Freemium (versión Pro desde ~20€/mes)",
      steps: [
        "Haz preguntas concretas sobre el sector o competidor, no búsquedas genéricas.",
        "Revisa siempre las fuentes citadas antes de incluir un dato en un informe o presentación.",
        "Usa los 'focus' o filtros de fuente (académico, noticias) según el tipo de dato que necesites.",
      ],
      url: "https://www.perplexity.ai",
      urlLabel: "perplexity.ai",
    },
    {
      name: "Canva (Magic Studio)",
      forWhat:
        "Producir creatividades publicitarias, adaptar un mismo anuncio a distintos formatos y tamaños, y generar variaciones rápidas para test.",
      price: "Freemium (Canva Pro desde ~12€/mes)",
      steps: [
        "Diseña el creativo base en el formato principal de tu campaña.",
        "Usa el redimensionado automático para adaptarlo a todos los formatos de anuncio que necesites.",
        "Genera variaciones de texto o imagen con Magic Media para tests A/B rápidos.",
      ],
      url: "https://www.canva.com",
      urlLabel: "canva.com",
    },
  ],

  prompts: [
    {
      title: "Variantes de anuncio para test A/B",
      when: "Al lanzar una campaña de pago y necesitar varias versiones del mismo mensaje para testear qué funciona mejor.",
      prompt:
        "Actúa como copywriter publicitario especializado en [SECTOR/PRODUCTO]. Vamos a anunciar [PRODUCTO O SERVICIO] dirigido a [BUYER PERSONA: descripción breve]. El objetivo de la campaña es [OBJETIVO: generar leads / vender directo / awareness]. Escribe 5 variantes de anuncio para [PLATAFORMA: Meta Ads/Google Ads/LinkedIn Ads], cada una con un ángulo distinto (urgencia, prueba social, beneficio directo, curiosidad, dolor/problema), máximo [NÚMERO] caracteres cada una, sin frases genéricas ni superlativos vacíos.",
      customize: [
        "Define bien el BUYER PERSONA con datos reales (edad, problema, motivación de compra), no una descripción vaga.",
        "Cambia el OBJETIVO según la fase del funnel en la que esté esa campaña.",
        "Pide ángulos adicionales si los 5 estándar no encajan con tu producto.",
      ],
    },
    {
      title: "Resumen ejecutivo de resultados de campaña",
      when: "Al preparar el informe mensual o post-mortem de campaña para presentar a cliente o dirección.",
      prompt:
        "Te paso los datos de rendimiento de la campaña [NOMBRE DE CAMPAÑA] del periodo [FECHAS]: [PEGAR DATOS O TABLA: impresiones, clics, CTR, coste, conversiones, CPA]. El objetivo era [OBJETIVO DE LA CAMPAÑA]. Redacta un resumen ejecutivo de máximo 200 palabras para [DESTINATARIO: cliente/dirección] que incluya: qué funcionó, qué no funcionó, y 2-3 recomendaciones concretas para el siguiente periodo. Tono profesional, sin jerga técnica innecesaria.",
      customize: [
        "Pega los datos reales exportados de la plataforma de anuncios o de Analytics, no un resumen a mano.",
        "Ajusta el DESTINATARIO porque el nivel de detalle técnico cambia si es cliente o equipo interno.",
        "Pide que compare con el periodo anterior si tienes esos datos disponibles.",
      ],
    },
    {
      title: "Brief de campaña a partir de un objetivo de negocio",
      when: "Al arrancar una campaña nueva y necesitar estructurar el brief antes de pasarlo al equipo creativo o de medios.",
      prompt:
        "Necesito estructurar un brief de campaña. El objetivo de negocio es [OBJETIVO: ej. aumentar ventas online un 15% en Q4]. El producto/servicio es [DESCRIPCIÓN]. El presupuesto aproximado es [PRESUPUESTO]. Genera un brief con estas secciones: objetivo de campaña, público objetivo, mensaje clave, canales recomendados, KPIs a medir y un calendario aproximado de fases. Sé concreto, evita generalidades tipo 'aumentar la visibilidad de marca'.",
      customize: [
        "Aporta cualquier dato de campañas anteriores similares para que las recomendaciones sean más realistas.",
        "Ajusta el PRESUPUESTO real, ya que condiciona los canales que tiene sentido recomendar.",
        "Pide que priorice 2-3 canales si el presupuesto es limitado, en vez de repartir en muchos.",
      ],
    },
    {
      title: "Segmentación de audiencia a partir de datos de clientes",
      when: "Cuando tienes una lista o descripción de clientes y necesitas agruparlos en segmentos accionables para campañas.",
      prompt:
        "Te paso una descripción de nuestra base de clientes: [DESCRIPCIÓN O DATOS: edad, comportamiento de compra, ticket medio, frecuencia]. Necesito segmentarlos en 3-4 grupos con criterios claros para poder dirigir campañas distintas a cada uno. Para cada segmento, dame: nombre del segmento, características principales, y un mensaje de marketing diferenciado que le encajaría mejor.",
      customize: [
        "Cuantos más datos reales aportes (no inventados), más útil será la segmentación resultante.",
        "Pide que priorice el criterio de segmentación (comportamiento vs. demografía) según tu objetivo de campaña.",
        "Valida los segmentos propuestos contra tu CRM antes de lanzar campañas basadas en ellos.",
      ],
    },
  ],

  workflow: {
    title: "Caso real: cómo un equipo de marketing redujo de 1 día a 2 horas el informe mensual de campañas",
    before: "Un día completo recopilando datos de 4 plataformas de anuncios, montando tablas y redactando conclusiones a mano.",
    after: "2 horas: exportación de datos + análisis asistido por IA + revisión y presentación.",
    steps: [
      "Se exportan los datos de rendimiento de cada plataforma (Meta Ads, Google Ads, LinkedIn Ads) a hojas de cálculo.",
      "Se sube cada exportación a Claude junto con el objetivo de esa campaña, pidiendo un resumen de rendimiento por canal.",
      "Se pide una comparación entre canales para identificar dónde está funcionando mejor el presupuesto.",
      "Con el prompt de resumen ejecutivo, se genera el borrador del informe para dirección o cliente.",
      "El equipo revisa las cifras clave, ajusta el tono y añade el contexto cualitativo que la IA no puede conocer (una promoción de la competencia, un evento del sector).",
      "El tiempo ahorrado se dedica a diseñar las recomendaciones estratégicas del siguiente periodo, no a montar tablas.",
    ],
  },

  mistakes: [
    {
      mistake: "Dar por buenos datos o cifras de mercado que la IA menciona sin fuente.",
      solution:
        "Pide siempre la fuente de cualquier dato de mercado o competencia, y verifícala antes de incluirla en un informe o presentación a cliente.",
    },
    {
      mistake: "Usar el mismo prompt genérico para campañas de sectores y públicos totalmente distintos.",
      solution:
        "Dale a la IA el buyer persona, el objetivo de negocio y ejemplos de campañas anteriores de esa marca concreta antes de pedir el copy o el brief.",
    },
    {
      mistake: "Presentar un informe generado por IA sin revisar si las conclusiones tienen sentido con el contexto real del negocio.",
      solution:
        "Usa la IA para el primer borrador de análisis, pero añade siempre el contexto que solo tú conoces (estacionalidad, cambios internos, competencia) antes de presentarlo.",
    },
    {
      mistake: "No proteger datos sensibles de clientes al pegarlos en herramientas de IA generalistas.",
      solution:
        "Anonimiza o agrega los datos (sin nombres ni información identificable) antes de pegarlos en un chat de IA, y revisa la política de privacidad de la herramienta para uso de datos empresariales.",
    },
  ],

  resources: [
    {
      label: "Debates sobre IA y marketing",
      href: "/debates",
      note: "Comparte cómo estás usando la IA en campañas y aprende de la experiencia de otros marketers.",
    },
    {
      label: "IA para Community Managers",
      href: "/guias/ia-para-community-managers",
      note: "Si además gestionas redes sociales y contenido orgánico, esta guía complementa la tuya.",
    },
    {
      label: "Explora herramientas por categoría",
      href: "/?categoria=herramientas",
      note: "Más herramientas de IA probadas, organizadas por caso de uso.",
    },
  ],

  faqs: [
    {
      q: "¿Puede la IA sustituir el análisis estratégico de un marketer?",
      a: "No. La IA agiliza la parte de procesar datos y redactar, pero las decisiones estratégicas (qué canal priorizar, cómo posicionar el producto) requieren contexto de negocio que solo aporta el equipo humano.",
    },
    {
      q: "¿Es seguro subir datos de campañas o de clientes a herramientas de IA?",
      a: "Depende del dato. Anonimiza información identificable de clientes antes de subirla, y revisa si tu plan de la herramienta excluye tus datos del entrenamiento del modelo (los planes de empresa suelen ofrecer esa garantía).",
    },
    {
      q: "¿Cómo evito que los copys generados por IA suenen todos iguales?",
      a: "Dale siempre un ángulo distinto por variante (urgencia, prueba social, beneficio) y aporta ejemplos reales de tu marca como referencia de tono, en vez de pedir 'un anuncio' de forma genérica.",
    },
    {
      q: "¿La IA puede predecir el rendimiento de una campaña antes de lanzarla?",
      a: "No con fiabilidad. Puede ayudarte a razonar hipótesis a partir de datos históricos, pero no sustituye un test real con presupuesto controlado antes de escalar una campaña.",
    },
    {
      q: "¿Qué herramienta de IA conviene más para un equipo con presupuesto ajustado?",
      a: "ChatGPT y Gemini tienen versiones gratuitas suficientes para empezar con copys y brief; Perplexity gratuito cubre bien la investigación de mercado. Reserva el gasto de pago para la herramienta que más uses a diario.",
    },
  ],
};
