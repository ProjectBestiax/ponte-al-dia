import type { GuideContent } from "@/lib/guides/types";

export const guide: GuideContent = {
  slug: "sanitarios",
  profession: "Sanitarios",
  icon: "🩺",
  tagline: "Documentación clínica y gestión de consulta más rápidas",

  // ── SEO ──
  title: "IA para Sanitarios: herramientas para agilizar documentación y consulta",
  metaDescription:
    "Guía práctica de IA para sanitarios: herramientas, prompts y un caso real para reducir tiempo administrativo sin tocar el criterio clínico.",
  keywords: [
    "IA para sanitarios",
    "inteligencia artificial en medicina",
    "IA para médicos",
    "IA para enfermería",
    "dictado clínico IA",
    "IA documentación clínica",
    "ChatGPT para sanitarios",
  ],
  updatedAt: "2026-07-24",

  // ── Cuerpo ──
  subtitle: "Herramientas y prompts para ahorrar tiempo en tareas administrativas y documentales, sin que la IA se acerque nunca al diagnóstico.",
  intro: [
    "Si trabajas en sanidad, probablemente pasas más tiempo del que te gustaría delante de un ordenador: informes, notas de evolución, cartas a otros especialistas, resúmenes para el paciente. La IA generativa puede quitarte una buena parte de ese peso administrativo, dejándote más tiempo real de consulta y menos horas de papeleo al final del día. Pero en sanidad las reglas del juego son distintas a otros sectores, y conviene tenerlas clarísimas antes de tocar ninguna herramienta.",
    "La IA que vas a usar en tu día a día es, sobre todo, una ayuda administrativa y documental: te ayuda a redactar un informe más rápido, a transcribir una consulta, a resumir un artículo científico o a explicarle un tratamiento a un paciente en lenguaje sencillo. Lo que no es, bajo ningún concepto, es una herramienta de diagnóstico ni un sustituto de tu criterio clínico. Ninguna de las herramientas de esta guía está pensada ni validada para decidir qué le pasa a un paciente, y usarlas con esa intención es un error grave tanto ético como legal.",
    "Dos reglas que no son negociables. Primera: nunca introduzcas datos identificativos de pacientes —nombre, NHC, fecha de nacimiento, dirección, o cualquier combinación de datos que permita identificarlo— en una herramienta de IA pública y de consumo general. Esto no es solo una cuestión de RGPD y de la normativa de protección de datos sanitarios; es secreto profesional médico, y una filtración o un mal uso puede tener consecuencias serias para el paciente y para tu responsabilidad profesional. Segunda: la IA no diagnostica ni decide un tratamiento; apoya tareas de documentación, comunicación y organización, y todo lo que genere sobre contenido clínico debe pasar siempre por tu revisión y tu criterio antes de tener cualquier efecto real. Con estas dos reglas interiorizadas, el resto es encontrar el flujo que mejor te encaje en tu día a día.",
  ],

  tools: [
    {
      name: "ChatGPT",
      forWhat: "Redactar informes no clínicos, cartas a pacientes, resúmenes divulgativos o correos administrativos, y explicar conceptos médicos en lenguaje llano para el paciente.",
      price: "Freemium (versión de pago desde ~20€/mes)",
      steps: [
        "Crea una cuenta y usa siempre datos anonimizados o ficticios al describir un caso o situación.",
        "Da contexto genérico (tipo de especialidad, formato del documento) sin identificar nunca al paciente real.",
        "Pide siempre un borrador editable y revísalo tú antes de usarlo en cualquier comunicación real.",
      ],
      url: "https://chat.openai.com",
      urlLabel: "chat.openai.com",
    },
    {
      name: "Claude",
      forWhat: "Resumir guías clínicas, protocolos o artículos científicos largos, y estructurar documentación administrativa a partir de notas propias ya anonimizadas.",
      price: "Freemium (versión de pago desde ~18€/mes)",
      steps: [
        "Sube el PDF del protocolo, guía o artículo que quieres resumir (verifica que no contenga datos de pacientes).",
        "Pide un resumen estructurado por apartados: objetivo, población, recomendaciones clave, nivel de evidencia.",
        "Contrasta siempre las recomendaciones resumidas con el documento original antes de aplicarlas.",
      ],
      url: "https://claude.ai",
      urlLabel: "claude.ai",
    },
    {
      name: "Nuance DAX Copilot",
      forWhat: "Dictado clínico ambiental: escucha la consulta (con consentimiento del paciente) y genera un borrador de nota clínica estructurada para que la revises y firmes tú.",
      price: "De pago (tarificación por profesional/mes, consultar con proveedor)",
      steps: [
        "Contrata la licencia a través de tu centro o proveedor sanitario, que gestiona la integración con la historia clínica.",
        "Informa y pide consentimiento al paciente antes de activar el dictado ambiental en cada consulta.",
        "Revisa y edita siempre la nota generada antes de firmarla; el borrador nunca sustituye tu validación clínica.",
      ],
      url: "https://www.nuance.com/healthcare/ambient-clinical-intelligence.html",
      urlLabel: "nuance.com/healthcare",
    },
    {
      name: "Perplexity",
      forWhat: "Cribado bibliográfico rápido con fuentes citadas: localizar guías clínicas actualizadas, revisiones o el estado de una controversia terapéutica.",
      price: "Freemium (versión de pago desde ~20€/mes)",
      steps: [
        "Lanza la búsqueda como una pregunta clínica concreta, citando la población o el contexto si lo tienes claro.",
        "Abre siempre las fuentes citadas al pie de la respuesta y verifica que sean revistas o bases de datos serias.",
        "No uses la respuesta como recomendación final: úsala como punto de partida para tu propia búsqueda dirigida.",
      ],
      url: "https://www.perplexity.ai",
      urlLabel: "perplexity.ai",
    },
    {
      name: "Doctoralia (gestión de citas con IA)",
      forWhat: "Gestión de agenda y citas de consulta con recordatorios automáticos, reduciendo llamadas y ausencias sin cita previa.",
      price: "Freemium para el paciente; planes de pago para la consulta desde ~30€/mes",
      steps: [
        "Da de alta tu consulta o centro y configura los tipos de cita y duraciones habituales.",
        "Activa los recordatorios automáticos por SMS o email para reducir las ausencias.",
        "Revisa periódicamente las estadísticas de ocupación para ajustar horarios y huecos libres.",
      ],
      url: "https://www.doctoralia.es",
      urlLabel: "doctoralia.es",
    },
  ],

  prompts: [
    {
      title: "Informe divulgativo para el paciente",
      when: "Cuando necesitas explicarle a un paciente un diagnóstico o tratamiento ya decidido, en lenguaje que pueda entender.",
      prompt:
        "Actúa como profesional sanitario de [ESPECIALIDAD]. Necesito explicarle a un paciente, en lenguaje sencillo y sin tecnicismos, en qué consiste [TRATAMIENTO O CONDICIÓN, ya diagnosticado por mí]. Incluye: 1) qué es en términos cotidianos, 2) qué puede esperar del tratamiento o del seguimiento, 3) señales de alarma por las que debería contactar antes de la próxima revisión, 4) 3 preguntas frecuentes que suelen hacer los pacientes con esta condición. Máximo 250 palabras, tono cercano y tranquilizador. No incluyas ningún dato identificativo del paciente en tu respuesta ni asumas datos que no te haya dado.",
      customize: [
        "La especialidad y el tratamiento o condición concretos (ya decididos por ti, no le pidas a la IA que diagnostique).",
        "El nivel cultural o el idioma del paciente si necesitas adaptarlo.",
        "El canal de destino: folleto impreso, mensaje de app de paciente o guion para la consulta.",
      ],
    },
    {
      title: "Plantilla de nota clínica estructurada (sin datos identificativos)",
      when: "Cuando quieres una plantilla reutilizable para agilizar la redacción de notas de evolución.",
      prompt:
        "Crea una plantilla de nota clínica de evolución para [ESPECIALIDAD/TIPO DE CONSULTA] con los apartados estándar (motivo de consulta, anamnesis, exploración, valoración, plan). Deja cada apartado como un campo genérico entre corchetes para que yo lo rellene después con los datos reales del paciente, por ejemplo [MOTIVO DE CONSULTA] o [HALLAZGOS EXPLORACIÓN]. No incluyas ningún dato de paciente real, solo la estructura.",
      customize: [
        "La especialidad y el tipo de consulta (primera visita, revisión, urgencia).",
        "Los apartados obligatorios según el protocolo de tu centro.",
        "El formato final (texto plano, tabla) según cómo lo vayas a pegar en tu historia clínica.",
      ],
    },
    {
      title: "Resumen de guía clínica o artículo científico",
      when: "Cuando necesitas actualizarte rápido sobre una guía o revisión antes de aplicarla en consulta.",
      prompt:
        "Te adjunto una guía clínica/artículo sobre [TEMA]. Hazme un resumen estructurado con: 1) población y contexto de aplicación, 2) recomendaciones principales, 3) nivel de evidencia de cada recomendación si se indica, 4) cambios respecto a guías anteriores si el documento lo menciona, 5) limitaciones que señalen los propios autores. No añadas recomendaciones que no estén en el texto ni completes huecos con conocimiento general; si algo no aparece, dilo explícitamente.",
      customize: [
        "El tema y el tipo de documento (guía, revisión sistemática, ensayo clínico).",
        "El nivel de detalle: resumen de una página vs. informe completo para sesión clínica.",
        "Pide una tabla comparativa si vas a contrastar varias guías a la vez.",
      ],
    },
    {
      title: "Carta de derivación a otro especialista",
      when: "Cuando necesitas redactar una derivación clara y completa sin perder tiempo en el formato.",
      prompt:
        "Redacta un borrador de carta de derivación de [ESPECIALIDAD ORIGEN] a [ESPECIALIDAD DESTINO] con esta estructura: motivo de derivación, resumen clínico relevante, pruebas ya realizadas, pregunta concreta que se plantea al especialista receptor. Usa marcadores genéricos entre corchetes ([RESUMEN CLÍNICO], [PRUEBAS REALIZADAS]) para que yo rellene después los datos reales del paciente; no inventes datos clínicos.",
      customize: [
        "Las especialidades de origen y destino, que cambian el vocabulario y el nivel de detalle esperado.",
        "El grado de urgencia de la derivación, para ajustar el tono.",
        "El formato exigido por tu sistema de historia clínica o el hospital receptor.",
      ],
    },
  ],

  workflow: {
    title: "Caso real: cómo un médico de familia recuperó media hora al día de documentación",
    before: "Antes: al final de cada jornada, 45-60 minutos redactando notas de evolución pendientes y cartas de derivación desde cero.",
    after: "Después: 20-25 minutos, usando plantillas y dictado clínico revisado, con la misma calidad documental.",
    steps: [
      "Al inicio de la consulta, activa (con consentimiento del paciente) el dictado ambiental para capturar el motivo de consulta y la exploración.",
      "El sistema genera un borrador de nota estructurada, que el médico revisa y corrige antes de firmarla en la historia clínica.",
      "Para las derivaciones, usa una plantilla genérica en ChatGPT rellenada manualmente con los datos reales ya en el propio sistema de historia clínica (nunca en el chatbot).",
      "Al final del día, si necesita resumir un protocolo o guía nueva, sube el documento a Claude para un resumen rápido antes de la sesión clínica semanal.",
      "Revisión final propia de cada nota y carta antes de que salga de la consulta, verificando que ningún dato se haya distorsionado.",
    ],
  },

  mistakes: [
    {
      mistake: "Introducir el nombre, NHC, fecha de nacimiento o cualquier dato identificativo de un paciente real en una herramienta de IA pública y de consumo general.",
      solution: "Anonimiza siempre antes de pegar cualquier texto: sustituye datos identificativos por etiquetas genéricas ([PACIENTE], [NHC]) o trabaja directamente en sistemas certificados por tu centro con garantías RGPD y de secreto profesional médico específicas para sanidad.",
    },
    {
      mistake: "Usar la IA para que sugiera un diagnóstico o decida un tratamiento a partir de síntomas descritos.",
      solution: "La IA generativa de consumo general no está validada clínicamente para diagnosticar. Úsala solo para tareas administrativas y documentales; el diagnóstico y la decisión terapéutica son siempre responsabilidad tuya, basada en tu criterio clínico y la evidencia que tú verifiques.",
    },
    {
      mistake: "Copiar y firmar directamente una nota o informe generado por IA sin revisión clínica.",
      solution: "Trata siempre el resultado de la IA como un borrador: revisa cada dato, cada afirmación clínica y cada recomendación antes de que forme parte de la historia clínica o de una comunicación al paciente.",
    },
    {
      mistake: "Activar el dictado ambiental sin informar al paciente ni pedir su consentimiento.",
      solution: "Informa siempre al paciente de que se está usando una herramienta de dictado o transcripción y obtén su consentimiento explícito antes de activarla, igual que harías con cualquier grabación en consulta.",
    },
  ],

  resources: [
    {
      label: "Debate: ¿cómo usáis la IA en consulta sin comprometer datos de pacientes?",
      href: "/debates",
      note: "Comparte tu experiencia y lee cómo otros sanitarios gestionan la IA en su día a día manteniendo la confidencialidad.",
    },
    {
      label: "IA para RRHH",
      href: "/guias/ia-para-rrhh",
      note: "Si gestionas también la contratación de personal en tu centro o consulta, esta guía te ayuda con selección y onboarding.",
    },
    {
      label: "Explora herramientas por categoría",
      href: "/?categoria=herramientas",
      note: "Más herramientas de IA probadas para otras tareas del día a día que puedes adaptar a tu consulta o centro.",
    },
  ],

  faqs: [
    {
      q: "¿Puedo usar ChatGPT o Claude con datos reales de pacientes?",
      a: "No, sin anonimizar antes cualquier dato identificativo. Estas herramientas de consumo general no están certificadas para tratar datos de salud reales, y hacerlo puede vulnerar tanto el RGPD como el secreto profesional médico. Úsalas solo con datos ficticios o completamente anonimizados, y valora herramientas específicas para sanidad con garantías contractuales si necesitas trabajar con datos reales.",
    },
    {
      q: "¿La IA puede diagnosticar a un paciente?",
      a: "No, y ninguna de las herramientas de esta guía está pensada para eso. La IA generativa de consumo general puede ayudarte a documentar, resumir o comunicar, pero el diagnóstico y la decisión clínica requieren tu criterio profesional, exploración directa y responsabilidad médica, que ninguna IA puede asumir.",
    },
    {
      q: "¿Es seguro usar dictado clínico con IA en consulta?",
      a: "Puede serlo si usas una herramienta certificada, informas al paciente y pides su consentimiento antes de activarla, y revisas siempre la nota generada antes de firmarla. No es seguro si usas una app genérica de transcripción sin garantías de confidencialidad ni sin informar al paciente.",
    },
    {
      q: "¿Qué pasa si la IA se equivoca en un resumen de guía clínica?",
      a: "Puede pasar: los modelos generativos a veces omiten matices o generalizan recomendaciones que en el documento original tenían condiciones específicas. Por eso el resumen de IA debe tratarse siempre como punto de partida, y cualquier recomendación relevante debe contrastarse con el documento original antes de aplicarla en consulta.",
    },
    {
      q: "¿Necesito el visto bueno de mi centro o colegio profesional para usar estas herramientas?",
      a: "Depende del uso y del centro: para tareas puramente administrativas con datos anonimizados, en general no hay problema, pero si vas a introducir cualquier flujo que toque datos de pacientes (como un dictado clínico integrado en la historia clínica), consulta con la dirección de tu centro y con el delegado de protección de datos antes de implementarlo de forma habitual.",
    },
  ],
};
