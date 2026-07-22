import type { GuideContent } from "@/lib/guides/types";

export const guide: GuideContent = {
  slug: "periodistas",
  profession: "Periodistas",
  icon: "📰",
  tagline: "Investiga, reportea y verifica con IA",

  title: "IA para Periodistas: herramientas para investigar, redactar y verificar más rápido",
  metaDescription:
    "Guía práctica de IA para periodistas: herramientas reales, prompts copiables y un flujo de verificación para no publicar nunca un dato inventado.",
  keywords: [
    "IA para periodistas",
    "inteligencia artificial periodismo",
    "verificación de datos con IA",
    "herramientas IA redacción",
    "ChatGPT para periodistas",
    "NotebookLM periodismo",
    "fact-checking IA",
  ],
  updatedAt: "2026-07-21",

  subtitle:
    "La IA te ahorra horas de trabajo mecánico, pero nunca puede firmar por ti: verifica siempre en la fuente primaria.",

  intro: [
    "Si trabajas en un medio, una redacción freelance o llevas tu propio proyecto periodístico, ya sabes que el tiempo es el recurso más escaso. La IA generativa puede quitarte de encima transcripciones, resúmenes de documentos largos, primeros borradores y búsqueda de contexto, pero no puede hacer el trabajo que de verdad importa: contrastar, preguntar dos veces y firmar con tu nombre.",
    "Esta guía no es una lista de \"herramientas mágicas\". Es un punto de partida honesto: qué usar, cómo usarlo sin perder rigor y dónde está la línea roja que no debes cruzar nunca, ni por prisa ni por presión de cierre.",
    "El riesgo real no es que la IA te sustituya. Es que un modelo alucine un dato, una cita o una cifra con total seguridad y tú lo publiques sin comprobarlo. Todo lo que viene a continuación está pensado para que eso no pase.",
  ],

  tools: [
    {
      name: "ChatGPT",
      forWhat:
        "Resumir documentos largos (informes, sentencias, PDFs oficiales), generar preguntas para una entrevista y darte una primera estructura de artículo sobre la que reescribir.",
      price: "Freemium",
      steps: [
        "Pega el documento o pégalo por partes si es muy largo.",
        "Pide un resumen estructurado por bloques (contexto, cifras clave, declaraciones, contradicciones).",
        "Usa el resumen como mapa de lectura, no como fuente citable: vuelve siempre al documento original para cualquier dato que vayas a publicar.",
      ],
      url: "https://chat.openai.com",
      urlLabel: "chat.openai.com",
    },
    {
      name: "Claude",
      forWhat:
        "Analizar documentos extensos (informes de cientos de páginas, actas judiciales) y mantener conversaciones largas de investigación sin perder el hilo del contexto.",
      price: "Freemium",
      steps: [
        "Sube el PDF o documento completo directamente en el chat.",
        "Pídele que localice pasajes concretos: cifras, nombres, fechas, contradicciones entre secciones.",
        "Pide siempre la página o sección exacta de donde saca cada dato para poder comprobarlo tú mismo.",
      ],
      url: "https://claude.ai",
      urlLabel: "claude.ai",
    },
    {
      name: "NotebookLM",
      forWhat:
        "Crear un \"cuaderno de investigación\" con varias fuentes (PDFs, webs, transcripciones) y preguntarle solo sobre ese material, con citas a la fuente concreta.",
      price: "Gratuita",
      steps: [
        "Crea un notebook y sube todos los documentos de un mismo reportaje.",
        "Haz preguntas cruzadas: \"¿en qué documentos aparece esta cifra y coincide?\".",
        "Revisa la cita que te da NotebookLM contra el documento original antes de usarla.",
      ],
      url: "https://notebooklm.google.com",
      urlLabel: "notebooklm.google.com",
    },
    {
      name: "Perplexity",
      forWhat:
        "Búsqueda de contexto reciente con enlaces a fuentes, útil para orientarte rápido en un tema nuevo antes de llamar a tus propias fuentes.",
      price: "Freemium",
      steps: [
        "Haz la pregunta de contexto (\"qué se sabe hasta ahora sobre X\").",
        "Abre y lee cada fuente enlazada, no te quedes solo con el resumen.",
        "Usa esto solo como punto de partida para saber a quién llamar, nunca como fuente final del artículo.",
      ],
      url: "https://www.perplexity.ai",
      urlLabel: "perplexity.ai",
    },
    {
      name: "Otter.ai",
      forWhat:
        "Transcribir entrevistas y ruedas de prensa automáticamente, con marcas de tiempo para localizar la declaración exacta luego.",
      price: "Freemium",
      steps: [
        "Graba o sube el audio de la entrevista.",
        "Deja que transcriba y revisa manualmente los fragmentos que vayas a citar textualmente.",
        "Contrasta siempre la transcripción con el audio original antes de poner algo entre comillas.",
      ],
      url: "https://otter.ai",
      urlLabel: "otter.ai",
    },
  ],

  prompts: [
    {
      title: "Resumen estructurado de un documento oficial",
      when: "Cuando recibes un informe, sentencia o dictamen largo y necesitas orientarte rápido antes de leerlo entero.",
      prompt:
        "Actúa como analista de documentos para un periodista. Te paso un documento sobre [TEMA DEL DOCUMENTO]. Resume en bloques separados: 1) contexto y quién lo emite, 2) cifras y datos concretos citando la página o sección, 3) declaraciones o citas textuales relevantes, 4) posibles contradicciones internas o puntos ambiguos que merezca la pena preguntar. No añadas ninguna cifra o dato que no esté literalmente en el documento.",
      customize: [
        "Sustituye [TEMA DEL DOCUMENTO] por el asunto real.",
        "Si el documento es muy largo, pégalo por bloques y pide un resumen acumulativo.",
        "Añade el idioma si el documento no está en español.",
      ],
    },
    {
      title: "Preguntas de entrevista basadas en investigación previa",
      when: "Antes de una entrevista, para no olvidar los ángulos incómodos o las contradicciones que quieres plantear.",
      prompt:
        "Voy a entrevistar a [PERSONA/CARGO] sobre [TEMA]. Aquí tienes el contexto que ya he investigado: [PEGAR NOTAS O RESUMEN]. Genera 12 preguntas organizadas en: 3 de contexto general, 4 que profundicen en datos concretos que ya tengo, 3 que confronten posibles contradicciones o críticas conocidas, y 2 preguntas de cierre abiertas. Evita preguntas cerradas de sí/no.",
      customize: [
        "Sustituye [PERSONA/CARGO] y [TEMA].",
        "Pega tus propias notas reales en [PEGAR NOTAS O RESUMEN], no inventadas por la IA.",
        "Pide que priorice las preguntas si el tiempo de entrevista es limitado.",
      ],
    },
    {
      title: "Primer borrador de pieza informativa a partir de tus notas",
      when: "Cuando ya tienes toda la información contrastada y solo necesitas una primera estructura para reescribir.",
      prompt:
        "Con estas notas de mi investigación (todas ya verificadas por mí): [PEGAR NOTAS], redacta un primer borrador de noticia de [NÚMERO] palabras en estilo de agencia, pirámide invertida, con entradilla de 3 líneas. No añadas ningún dato, cifra o cita que no esté en mis notas. Marca entre corchetes cualquier frase donde falte un dato que debería confirmar.",
      customize: [
        "Pega solo información que ya hayas verificado tú.",
        "Ajusta [NÚMERO] de palabras al formato del medio.",
        "Pide un tono distinto (crónica, reportaje, breve) según el género.",
      ],
    },
    {
      title: "Detección de sesgo y equilibrio de fuentes",
      when: "Antes de cerrar una pieza, para revisar si has dado voz suficiente a todas las partes implicadas.",
      prompt:
        "Revisa este borrador de artículo sobre [TEMA]: [PEGAR BORRADOR]. Indica: 1) qué partes o afectados mencionados en el texto no tienen una cita o versión propia recogida, 2) si el lenguaje usado favorece a alguna de las partes, 3) qué preguntas obvias se quedan sin responder. No reescribas el texto, solo señala los puntos.",
      customize: [
        "Pega el borrador completo, no un resumen.",
        "Repite el ejercicio tras incorporar las fuentes que faltaban.",
        "Úsalo también como checklist antes de publicar temas sensibles.",
      ],
    },
  ],

  workflow: {
    title: "Caso real: cómo un redactor de local redujo el tiempo de una crónica de pleno municipal",
    before:
      "3 horas transcribiendo a mano el audio del pleno de 2 horas, releyendo el acta municipal completa y buscando manualmente las cifras del presupuesto mencionadas.",
    after:
      "45 minutos: transcripción automática revisada, resumen de acta con NotebookLM contrastado contra el documento y redacción final propia con las cifras verificadas una a una.",
    steps: [
      "Grabar el pleno y subir el audio a Otter.ai para obtener la transcripción con marcas de tiempo.",
      "Subir el acta oficial y la transcripción a un notebook de NotebookLM y pedir un resumen de los puntos con votación y cifras de presupuesto, citando la sección exacta.",
      "Contrastar cada cifra del resumen contra el PDF original del acta antes de anotarla como definitiva.",
      "Pedir a Claude un primer borrador de la crónica a partir de las notas ya verificadas, con estructura de pirámide invertida.",
      "Reescribir el borrador con voz propia, añadir contexto de plenos anteriores y enviar a edición.",
    ],
  },

  mistakes: [
    {
      mistake:
        "Publicar una cifra, cita o dato que la IA ha \"resumido\" sin volver a comprobarlo en el documento o la fuente original.",
      solution:
        "Trata cualquier salida de un modelo de IA como una pista, nunca como una fuente citable. Todo dato que vaya a publicación debe verificarse contra el documento primario, la grabación original o la persona que lo dijo.",
    },
    {
      mistake:
        "Subir documentos embargados, filtraciones o material confidencial de una fuente a un chatbot público para resumirlo.",
      solution:
        "Ese contenido puede quedar almacenado o usarse para entrenar el modelo según la herramienta. Para material sensible usa configuraciones con retención de datos desactivada, o directamente no subas el documento y trabaja con extractos manuales.",
    },
    {
      mistake:
        "Asumir que un resumen de IA está equilibrado cuando en realidad reproduce el sesgo de las fuentes que le has dado (por ejemplo, solo la versión de una de las partes).",
      solution:
        "Pide explícitamente al modelo que señale qué voces faltan y contrasta tú mismo si el borrador da espacio proporcional a todas las partes implicadas antes de cerrar la pieza.",
    },
    {
      mistake:
        "Dejar que la IA genere citas textuales \"con el estilo\" de una persona real, aunque sea a modo de borrador, y que esa frase sobreviva sin marcarla hasta el texto final.",
      solution:
        "Nunca pidas a un modelo que invente cómo \"sonaría\" una declaración. Cualquier cita entre comillas debe proceder literalmente de una grabación, transcripción o documento, nunca de una generación de IA.",
    },
  ],

  resources: [
    {
      label: "Debates: IA y periodismo",
      href: "/debates",
      note: "Comparte cómo usas la IA en tu redacción y lee cómo lo hacen otros periodistas de la comunidad.",
    },
    {
      label: "IA para Psicólogos",
      href: "/guias/ia-para-psicologos",
      note: "Otra guía de la serie, útil si trabajas temas de salud mental y quieres entender los límites éticos del otro lado.",
    },
    {
      label: "Explora prompts de la comunidad",
      href: "/?categoria=prompts",
      note: "Más prompts probados por otros usuarios que puedes adaptar a tu propio flujo de trabajo.",
    },
  ],

  faqs: [
    {
      q: "¿Puedo citar a ChatGPT o Claude como fuente en un artículo?",
      a: "No. Un modelo de IA no es una fuente periodística, es una herramienta de asistencia. Cualquier dato, cifra o cita debe rastrearse hasta su fuente primaria real (documento, persona, institución) antes de publicarse.",
    },
    {
      q: "¿Es seguro subir una entrevista grabada a una IA para transcribirla?",
      a: "Para la mayoría de entrevistas sí, siempre que revises la política de privacidad de la herramienta. Para fuentes protegidas, denunciantes o material sensible, evita subir el audio a servicios en la nube y usa transcripción local o manual.",
    },
    {
      q: "¿La IA puede ayudarme a detectar si una imagen o vídeo es falso?",
      a: "Puede darte pistas (metadatos raros, inconsistencias visuales), pero no es fiable al 100% ni en un sentido ni en otro. Combínalo siempre con verificación inversa de imágenes y, si es relevante, con herramientas especializadas de verificación forense.",
    },
    {
      q: "¿Debo avisar a mis lectores de que uso IA para redactar?",
      a: "Si la IA participa en la generación de texto que se publica (más allá de apoyo para resumir o estructurar), es buena práctica que el medio tenga una política editorial clara y, en muchos casos, que se indique de algún modo. Consulta la política de tu redacción.",
    },
    {
      q: "¿Qué hago si la IA se inventa una cifra con mucha seguridad?",
      a: "Pasa constantemente, es la llamada \"alucinación\". La única defensa real es el hábito: nunca subas un dato de un modelo directamente al artículo sin haberlo contrastado tú mismo en la fuente original.",
    },
  ],
};
