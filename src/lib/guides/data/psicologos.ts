import type { GuideContent } from "@/lib/guides/types";

export const guide: GuideContent = {
  slug: "psicologos",
  profession: "Psicólogos",
  icon: "🧠",
  tagline: "Recursos, gestión y psicoeducación con IA",

  title: "IA para Psicólogos: herramientas para gestión, psicoeducación y ahorro de tiempo administrativo",
  metaDescription:
    "Guía práctica de IA para psicólogos: herramientas reales, prompts para tareas administrativas y psicoeducación, sin tocar nunca datos de pacientes.",
  keywords: [
    "IA para psicólogos",
    "inteligencia artificial psicología",
    "herramientas IA salud mental",
    "psicoeducación con IA",
    "RGPD IA pacientes",
    "ChatGPT para psicólogos",
    "gestión consulta psicología",
  ],
  updatedAt: "2026-07-21",

  subtitle:
    "La IA te libera tiempo administrativo para dedicarlo a lo clínico: nunca al revés, y nunca con datos de pacientes de por medio.",

  intro: [
    "Si tienes consulta propia o trabajas en un centro, sabes que buena parte del día se va en tareas que no son terapia: redactar material psicoeducativo, preparar documentos, organizar la agenda, escribir contenido para pacientes o responder emails. Ahí es donde la IA generativa puede ayudarte de verdad, sin rozar siquiera lo clínico.",
    "Esta guía se centra deliberadamente en lo administrativo, lo formativo y lo psicoeducativo. No vas a encontrar aquí ningún prompt para \"analizar\" a un paciente, resumir una sesión o pedirle a una IA una opinión clínica sobre un caso real, porque eso no es lo que estas herramientas son ni deben usarse para eso.",
    "El límite no es opcional ni exagerado: el secreto profesional y el RGPD protegen los datos de tus pacientes, y ningún chatbot público —por bueno que sea— es un destino seguro para nombres, historiales o contenido de sesión. Todo lo que sigue está pensado para trabajar por debajo de esa línea, no para bordearla.",
  ],

  tools: [
    {
      name: "ChatGPT",
      forWhat:
        "Redactar material psicoeducativo genérico (hojas informativas sobre ansiedad, sueño, duelo), plantillas de comunicación con pacientes y borradores de contenido para redes o web de la consulta.",
      price: "Freemium",
      steps: [
        "Pide contenido siempre en términos genéricos, sin nombres ni casos reales.",
        "Especifica el público (adultos, adolescentes, familiares) y el tono que quieres.",
        "Revisa el resultado con tu criterio clínico antes de entregarlo o publicarlo: la IA no valida contenido de salud.",
      ],
      url: "https://chat.openai.com",
      urlLabel: "chat.openai.com",
    },
    {
      name: "Claude",
      forWhat:
        "Redactar documentos largos de la consulta (consentimientos informados genéricos, protocolos internos, guiones de talleres grupales) manteniendo coherencia en textos extensos.",
      price: "Freemium",
      steps: [
        "Describe el documento y el marco legal/deontológico que debe respetar, sin datos de pacientes.",
        "Pide un primer borrador y ajusta la estructura por secciones.",
        "Haz que lo revise un colega o el propio colegio profesional antes de usarlo con pacientes reales.",
      ],
      url: "https://claude.ai",
      urlLabel: "claude.ai",
    },
    {
      name: "NotebookLM",
      forWhat:
        "Organizar y consultar tu propia bibliografía y apuntes de formación (artículos, manuales, guías clínicas publicadas) para preparar sesiones formativas o repasar un enfoque terapéutico.",
      price: "Gratuita",
      steps: [
        "Sube artículos científicos o manuales (sin datos de pacientes, solo literatura publicada).",
        "Pregunta sobre conceptos, técnicas o comparaciones entre enfoques.",
        "Usa las respuestas como apoyo de estudio, contrastando siempre con la fuente original citada.",
      ],
      url: "https://notebooklm.google.com",
      urlLabel: "notebooklm.google.com",
    },
    {
      name: "Perplexity",
      forWhat:
        "Buscar formación continua, investigación reciente o divulgación científica sobre un enfoque terapéutico, con enlaces directos a las fuentes.",
      price: "Freemium",
      steps: [
        "Pregunta por evidencia reciente sobre una técnica o enfoque concreto.",
        "Abre los enlaces a los estudios originales, no te quedes solo con el resumen.",
        "Contrasta con fuentes de tu colegio profesional o revistas indexadas antes de aplicar nada nuevo.",
      ],
      url: "https://www.perplexity.ai",
      urlLabel: "perplexity.ai",
    },
    {
      name: "Otter.ai",
      forWhat:
        "Transcribir formaciones, webinars o supervisiones grupales (nunca sesiones con pacientes) para quedarte con las notas escritas después.",
      price: "Freemium",
      steps: [
        "Úsalo solo en contextos formativos o de supervisión entre profesionales, con consentimiento de los presentes.",
        "Revisa y edita la transcripción para quedarte con lo relevante.",
        "Bajo ningún concepto lo uses para grabar o transcribir una sesión clínica con un paciente.",
      ],
      url: "https://otter.ai",
      urlLabel: "otter.ai",
    },
  ],

  prompts: [
    {
      title: "Hoja psicoeducativa para pacientes",
      when: "Cuando quieres entregar material de apoyo genérico sobre un tema (ansiedad, higiene del sueño, duelo) sin depender de plantillas ajenas.",
      prompt:
        "Redacta una hoja psicoeducativa de una página sobre [TEMA: ej. higiene del sueño] dirigida a [PÚBLICO: adultos/adolescentes/familiares]. Usa lenguaje claro, sin tecnicismos innecesarios, con 3-4 apartados prácticos y un cierre que invite a hablarlo en consulta. No incluyas ningún caso ni ejemplo de paciente real, solo información general.",
      customize: [
        "Sustituye [TEMA] y [PÚBLICO] según el material que necesites.",
        "Pide un tono más cercano o más formal según el centro.",
        "Añade tu enfoque terapéutico (TCC, sistémico, etc.) si quieres que el lenguaje sea coherente con él.",
      ],
    },
    {
      title: "Guion de taller o sesión grupal psicoeducativa",
      when: "Al preparar un taller para pacientes o formación para un grupo, sin partir de cero.",
      prompt:
        "Diseña el guion de un taller de [DURACIÓN] sobre [TEMA: ej. gestión de la ansiedad] para un grupo de [NÚMERO] personas de perfil [PERFIL DEL GRUPO]. Estructura en bloques: apertura, contenido teórico breve, una dinámica práctica y cierre con resumen de ideas clave. No propongas dinámicas que requieran compartir información personal sensible del grupo sin marco de consentimiento claro.",
      customize: [
        "Ajusta [DURACIÓN], [TEMA], [NÚMERO] y [PERFIL DEL GRUPO].",
        "Pide alternativas de dinámica si alguna no encaja con tu grupo.",
        "Revisa cualquier dinámica propuesta con tu propio criterio clínico antes de aplicarla.",
      ],
    },
    {
      title: "Plantilla de comunicación con pacientes",
      when: "Para escribir emails o mensajes tipo (recordatorios, bienvenida, cierre de proceso) sin partir de una hoja en blanco cada vez.",
      prompt:
        "Redacta una plantilla de [TIPO DE MENSAJE: ej. recordatorio de cita / bienvenida a un nuevo paciente / cierre de proceso terapéutico] con tono profesional pero cercano, en [NÚMERO] líneas, dejando huecos entre corchetes para personalizar con el nombre y los datos concretos de cada paciente después.",
      customize: [
        "Sustituye [TIPO DE MENSAJE] y [NÚMERO] de líneas.",
        "Deja siempre los datos reales del paciente para rellenarlos tú manualmente después, nunca los introduzcas en el prompt.",
        "Adapta el tono según si es primera consulta o paciente habitual.",
      ],
    },
    {
      title: "Resumen de artículo científico para formación continua",
      when: "Cuando quieres entender rápido un paper o guía clínica publicada antes de decidir si merece una lectura completa.",
      prompt:
        "Te paso un artículo científico publicado sobre [TEMA]: [PEGAR TEXTO O ENLACE DEL ARTÍCULO]. Resume: 1) objetivo del estudio, 2) metodología y tamaño de muestra, 3) resultados principales, 4) limitaciones que el propio estudio reconoce. No generalices los resultados más allá de lo que dice el propio artículo.",
      customize: [
        "Usa solo literatura publicada y de acceso legal, nunca casos propios.",
        "Pide que compare varios artículos si estás haciendo una revisión.",
        "Contrasta el resumen contra el artículo original antes de citarlo en una formación.",
      ],
    },
  ],

  workflow: {
    title: "Caso real: cómo una psicóloga de consulta privada redujo el tiempo de preparación de talleres grupales",
    before:
      "4 horas cada mes preparando desde cero el guion y el material de apoyo de un taller grupal mensual sobre gestión emocional para pacientes.",
    after:
      "1 hora: guion base generado con IA en minutos, adaptado con criterio clínico propio, más el material psicoeducativo de apoyo revisado y ajustado al grupo concreto.",
    steps: [
      "Definir el tema y perfil del grupo del mes (sin ningún dato identificable de pacientes concretos).",
      "Pedir a Claude un guion base de taller de 90 minutos sobre el tema elegido, con bloques teórico-prácticos.",
      "Revisar el guion con criterio clínico propio: ajustar dinámicas, quitar lo que no encaje con el grupo real.",
      "Generar con ChatGPT una hoja psicoeducativa de apoyo genérica a entregar tras el taller.",
      "Guardar guion y hoja como plantilla reutilizable para futuros talleres del mismo tema.",
    ],
  },

  mistakes: [
    {
      mistake:
        "Pegar notas de sesión, transcripciones o cualquier dato identificable de un paciente (nombre, edad, detalles del caso) en un chatbot público para pedir ayuda a redactar un informe.",
      solution:
        "Nunca introduzcas datos de pacientes en herramientas de IA generales, aunque sea \"solo para organizarlos\". El secreto profesional y el RGPD lo prohíben. Trabaja el informe tú mismo o, como mucho, pide a la IA una plantilla vacía que rellenes después manualmente.",
    },
    {
      mistake:
        "Pedirle a una IA una valoración, hipótesis diagnóstica u opinión clínica sobre un caso, aunque se describa \"de forma anónima\".",
      solution:
        "La IA no diagnostica ni sustituye el juicio clínico, y un caso \"anonimizado\" a menudo sigue siendo identificable o simplemente no aporta el contexto clínico real necesario. Usa la IA para tareas administrativas y psicoeducativas, no para razonamiento clínico sobre un caso concreto.",
    },
    {
      mistake:
        "Usar directamente el material psicoeducativo generado por IA sin revisión, asumiendo que es clínicamente correcto por estar bien redactado.",
      solution:
        "Un texto bien escrito no es lo mismo que un texto clínicamente preciso. Revisa siempre el contenido con tu propio criterio profesional antes de entregarlo a un paciente o publicarlo.",
    },
    {
      mistake:
        "Grabar o transcribir sesiones terapéuticas con herramientas de IA en la nube para \"quedarte con notas\".",
      solution:
        "Ni siquiera con consentimiento del paciente es buena práctica subir contenido de sesión a un servicio externo no diseñado y certificado para datos clínicos. Toma notas manuales o usa sistemas de historia clínica específicos y seguros de tu centro.",
    },
  ],

  resources: [
    {
      label: "Debates: IA y salud mental",
      href: "/debates",
      note: "Lee y comparte cómo otros profesionales de la psicología están marcando sus propios límites con la IA.",
    },
    {
      label: "IA para Periodistas",
      href: "/guias/ia-para-periodistas",
      note: "Otra guía de la serie, con un enfoque distinto sobre verificación y uso responsable de la IA.",
    },
    {
      label: "Explora herramientas de la comunidad",
      href: "/?categoria=herramientas",
      note: "Más herramientas de IA valoradas por otros usuarios, útiles para tareas de gestión y formación.",
    },
  ],

  faqs: [
    {
      q: "¿Puedo usar ChatGPT o Claude para escribir un informe psicológico?",
      a: "No con datos reales del paciente. Puedes pedir una plantilla o estructura genérica de informe, pero el contenido específico del caso (historia, evaluación, conclusiones) debes redactarlo tú, sin introducir esos datos en la herramienta.",
    },
    {
      q: "¿Es seguro pedirle a una IA que me ayude a preparar una sesión con un paciente concreto?",
      a: "No si implica describir el caso real. Puedes pedir ideas genéricas sobre una técnica o enfoque, pero cualquier detalle que identifique o describa a un paciente concreto no debe salir de tu entorno clínico protegido.",
    },
    {
      q: "¿Sustituye la IA la supervisión clínica o el juicio profesional?",
      a: "No, en ningún caso. La IA no diagnostica, no valora casos clínicos y no sustituye la supervisión entre profesionales. Su papel aquí se limita a tareas administrativas, psicoeducativas y de formación general.",
    },
    {
      q: "¿Puedo usar contenido generado por IA en redes sociales de mi consulta?",
      a: "Sí, para contenido divulgativo genérico, siempre revisado por ti. Nunca uses la IA para responder públicamente a comentarios que describan casos personales de seguidores, ni para dar consejo clínico individualizado en redes.",
    },
    {
      q: "¿Qué garantías de privacidad debo exigir antes de usar cualquier herramienta de IA en mi consulta?",
      a: "Como norma general, no subas datos identificables de pacientes a ninguna herramienta de IA de propósito general, tenga o no buena política de privacidad. Para cualquier uso que roce el dato clínico, consulta con tu colegio profesional y con el responsable de protección de datos de tu centro.",
    },
  ],
};
