import type { GuideContent } from "@/lib/guides/types";

export const guide: GuideContent = {
  slug: "profesores",
  profession: "Profesores",
  icon: "📚",
  tagline: "Prepara clases, explica conceptos y evalúa mejor",

  title: "IA para Profesores: prepara clases y evalúa mejor con IA",
  metaDescription:
    "Guía práctica de IA para profesores: herramientas reales, prompts listos para usar y buenas prácticas para preparar clases sin poner en riesgo la privacidad de tus alumnos.",
  keywords: [
    "ia para profesores",
    "chatgpt para docentes",
    "notebooklm educación",
    "ia preparar clases",
    "ia corregir exámenes",
    "claude para profesores",
    "diffit adaptar textos",
    "ia y privacidad de alumnos",
  ],
  updatedAt: "2026-07-21",

  subtitle:
    "Herramientas y prompts para ahorrar horas preparando material, sin delegar en la IA el criterio pedagógico ni los datos de tus alumnos.",
  intro: [
    "Si eres profesor o profesora, sabes que buena parte del trabajo no ocurre en el aula: preparar materiales, adaptar un mismo contenido a distintos niveles, redactar rúbricas, dar feedback individualizado o simplemente resumir y organizar información. Ahí es donde la IA generativa puede aportar de verdad, quitándote horas de trabajo mecánico para que puedas dedicar más tiempo a lo que realmente requiere tu criterio: el trato con el alumnado y las decisiones pedagógicas.",
    "Esta guía reúne herramientas que existen hoy y que ya usan miles de docentes, prompts concretos que puedes adaptar a tu asignatura y nivel, un caso de flujo de trabajo real, y los errores más comunes al empezar a usar IA en el aula. También incluye un apartado que consideramos imprescindible: cómo proteger la privacidad de tus alumnos y evitar que la IA se convierta en una muleta, tanto para ti como para ellos.",
    "Una idea de fondo antes de empezar: la IA generativa se equivoca, a veces con mucha seguridad. Es una herramienta excelente para generar un primer borrador, adaptar un texto o proponer preguntas, pero cada resultado necesita tu revisión antes de llegar a un alumno. Trátala como a un becario aplicado pero sin experiencia: útil, rápido, pero que necesita supervisión.",
  ],

  tools: [
    {
      name: "ChatGPT",
      forWhat:
        "Generar borradores de unidades didácticas, adaptar un texto a distintos niveles, crear preguntas de comprensión o redactar comunicaciones a familias.",
      price: "Freemium",
      steps: [
        "Entra en chat.openai.com y crea una cuenta gratuita.",
        "Describe el curso, la asignatura y el objetivo concreto de lo que necesitas preparar.",
        "Pide el resultado en un formato reutilizable (tabla, lista, esquema) y revísalo antes de usarlo en clase.",
      ],
      url: "https://chat.openai.com",
      urlLabel: "chat.openai.com",
    },
    {
      name: "Claude",
      forWhat:
        "Resumir y estructurar textos largos (artículos, capítulos, informes), redactar rúbricas de evaluación detalladas y dar feedback razonado sobre un texto de un alumno que tú mismo le pegues.",
      price: "Freemium",
      steps: [
        "Entra en claude.ai y crea una cuenta.",
        "Pega el texto o describe la tarea (por ejemplo, una rúbrica de evaluación) con el nivel educativo y los criterios que quieres incluir.",
        "Revisa el resultado y ajusta el lenguaje al de tu centro o normativa curricular.",
      ],
      url: "https://claude.ai",
      urlLabel: "claude.ai",
    },
    {
      name: "NotebookLM",
      forWhat:
        "Subir tus propios apuntes, temarios o PDFs y generar resúmenes, preguntas de repaso o incluso un resumen en audio tipo podcast basado solo en ese material, sin inventar información externa.",
      price: "Gratuita",
      steps: [
        "Entra en notebooklm.google con una cuenta de Google.",
        "Sube el material de la asignatura (PDF, documento, apuntes) como fuente.",
        "Pide resúmenes, preguntas de repaso o un audio explicativo basado únicamente en esas fuentes.",
      ],
      url: "https://notebooklm.google",
      urlLabel: "notebooklm.google",
    },
    {
      name: "Gemini",
      forWhat:
        "Integrado con Google Workspace (Docs, Slides, Gmail), útil para generar presentaciones de clase rápidas o borradores de documentos directamente donde ya trabajas cada día.",
      price: "Freemium",
      steps: [
        "Accede desde gemini.google.com o directamente desde el menú de IA dentro de Google Docs o Slides.",
        "Describe el tema de la clase y el formato que necesitas (presentación, documento, esquema).",
        "Edita el borrador generado antes de proyectarlo o compartirlo con el alumnado.",
      ],
      url: "https://gemini.google.com",
      urlLabel: "gemini.google.com",
    },
    {
      name: "Diffit",
      forWhat:
        "Herramienta pensada específicamente para docentes: adapta automáticamente un mismo texto a distintos niveles de lectura y genera actividades y preguntas asociadas, útil para atención a la diversidad.",
      price: "Freemium",
      steps: [
        "Entra en diffit.me y crea una cuenta de docente.",
        "Pega un texto o un tema y elige los niveles de lectura que necesitas generar.",
        "Descarga o exporta las versiones adaptadas y revisa que el contenido siga siendo correcto.",
      ],
      url: "https://web.diffit.me",
      urlLabel: "diffit.me",
    },
  ],

  prompts: [
    {
      title: "Adaptar un texto a distintos niveles de la clase",
      when: "Cuando tienes un grupo con niveles muy distintos y quieres dar el mismo contenido adaptado a cada uno.",
      prompt:
        "Adapta el siguiente texto sobre [TEMA] a tres niveles de lectura distintos para alumnado de [CURSO/EDAD]: uno simplificado para quien tiene más dificultad, uno estándar y uno ampliado con vocabulario más avanzado. Mantén la misma idea central en los tres. Texto original: [PEGAR TEXTO].",
      customize: [
        "Ajusta [CURSO/EDAD] al grupo real.",
        "Pide que incluya 2-3 preguntas de comprensión por cada nivel si lo necesitas para una actividad.",
      ],
    },
    {
      title: "Rúbrica de evaluación para un trabajo o examen",
      when: "Antes de poner una tarea o examen, para tener criterios de corrección claros y objetivos.",
      prompt:
        "Crea una rúbrica de evaluación para [TIPO DE TAREA, ej. 'una redacción argumentativa'] de alumnado de [CURSO]. Incluye 4 criterios relevantes para esta tarea, cada uno con 3 niveles de desempeño (bajo, medio, alto) descritos de forma concreta y observable, en formato tabla.",
      customize: [
        "Sustituye [TIPO DE TAREA] y [CURSO] por los datos reales.",
        "Pide que ajuste el peso porcentual de cada criterio si tu centro usa evaluación ponderada.",
      ],
    },
    {
      title: "Preguntas de repaso a partir de tus propios apuntes",
      when: "Antes de un examen, para generar un banco de preguntas de repaso basado solo en lo que has dado en clase.",
      prompt:
        "A partir de este resumen de la unidad [PEGAR APUNTES O TEMARIO], genera 10 preguntas de repaso de distinto tipo (opción múltiple, verdadero/falso y respuesta breve) para alumnado de [CURSO], ordenadas de menor a mayor dificultad. No incluyas información que no aparezca en el texto.",
      customize: [
        "Usa NotebookLM en lugar de un chat genérico si quieres asegurarte de que no añade información externa al material.",
        "Pide las respuestas correctas en un documento aparte para el profesor.",
      ],
    },
    {
      title: "Comunicación clara para familias",
      when: "Cuando necesitas redactar una circular o mensaje a familias sobre una actividad, incidencia o cambio de calendario.",
      prompt:
        "Redacta un mensaje breve y claro para las familias de [CURSO] sobre [MOTIVO, ej. 'la salida escolar del próximo viernes']. Tono cercano pero profesional, en español de España, con la información práctica bien organizada (fecha, hora, qué traer, a quién contactar).",
      customize: [
        "Cambia [MOTIVO] por el asunto real.",
        "Revisa que no incluyas datos personales de ningún alumno concreto en el prompt ni en el resultado.",
      ],
    },
  ],

  workflow: {
    title: "Caso real: cómo un profesor de secundaria redujo el tiempo de preparación semanal de clases",
    before:
      "Antes: 5-6 horas semanales dedicadas a adaptar el mismo tema a los distintos niveles de sus tres grupos y a redactar preguntas de repaso desde cero para cada examen.",
    after:
      "Después: 2 horas semanales, usando IA para generar el primer borrador de las adaptaciones y las preguntas, dedicando el resto del tiempo a revisar, corregir y personalizar según lo que de verdad ha pasado en cada clase.",
    steps: [
      "Sube el temario o los apuntes de la unidad a NotebookLM para tener una base fiable basada solo en su propio material.",
      "Genera con Diffit tres versiones del mismo texto adaptadas a los niveles de lectura de sus grupos.",
      "Pide a Claude un banco de 15 preguntas de repaso basadas en esos apuntes, con distintos niveles de dificultad.",
      "Revisa manualmente cada pregunta y adaptación, corrigiendo lo que no encaja con lo realmente explicado en clase.",
      "Usa Gemini dentro de Google Slides para montar rápido la presentación final con el contenido ya revisado.",
    ],
  },

  mistakes: [
    {
      mistake:
        "Introducir nombres, notas, informes o cualquier dato identificable de un alumno menor de edad en una herramienta de IA pública para pedir ayuda con un caso concreto.",
      solution:
        "Anonimiza siempre: describe la situación en términos generales (\"un alumno de 2º de ESO con dificultades de atención\") sin nombres, notas reales ni datos que permitan identificarlo, y consulta la normativa de tu centro sobre protección de datos antes de usar cualquier herramienta con información de menores.",
    },
    {
      mistake:
        "Usar la IA para corregir exámenes o trabajos y dar por buena la corrección sin revisarla, especialmente en materias donde el matiz o el razonamiento importan más que la respuesta exacta.",
      solution:
        "Usa la IA como un primer filtro o para generar la rúbrica, pero la corrección final y la nota siempre las decides tú, revisando especialmente los casos límite y los razonamientos abiertos.",
    },
    {
      mistake:
        "No enseñar a tus alumnos a usar la IA de forma responsable, dejando que la usen para hacer trabajos completos sin entender ni citar de dónde sale el contenido, lo que deriva en plagio no intencionado.",
      solution:
        "Dedica tiempo a explicar explícitamente qué usos de la IA son aceptables en tus tareas y cuáles no, y diseña actividades que sean difíciles de resolver copiando y pegando (reflexión personal, aplicación a un caso propio, defensa oral).",
    },
    {
      mistake:
        "Depender de la IA para generar todo el material de clase sin verificar la información, especialmente en datos, fechas o citas que la IA puede inventar con total seguridad (alucinaciones).",
      solution:
        "Contrasta siempre los datos concretos (fechas históricas, cifras, citas textuales) con una fuente fiable antes de llevarlos al aula, y usa herramientas como NotebookLM cuando necesites que la IA se ciña solo a un material que tú has verificado.",
    },
  ],

  resources: [
    {
      label: "Debates sobre IA en educación",
      href: "/debates",
      note: "Comparte con otros docentes cómo estás usando la IA en tu aula y qué límites te pones tú mismo.",
    },
    {
      label: "IA para Diseñadores",
      href: "/guias/ia-para-disenadores",
      note: "Si preparas materiales visuales para tus clases, esta guía te da ideas de herramientas de diseño con IA.",
    },
    {
      label: "Prompts de IA seleccionados",
      href: "/?categoria=prompts",
      note: "Más prompts probados por la comunidad, útiles más allá de los cuatro de esta guía.",
    },
  ],

  faqs: [
    {
      q: "¿Es seguro subir exámenes o trabajos de alumnos a una IA para corregirlos?",
      a: "Solo si eliminas antes cualquier dato identificable (nombre, clase, número de expediente) y revisas la política de privacidad de la herramienta. Para menores, la recomendación general es no introducir datos personales identificables en herramientas públicas de IA sin el respaldo explícito de tu centro.",
    },
    {
      q: "¿Cómo evito que mis alumnos usen la IA para hacer trampas?",
      a: "Es más eficaz rediseñar las tareas (pedir reflexión personal, aplicación a casos propios, defensa oral o en clase) que intentar detectar el uso de IA con herramientas de detección, que no son fiables al cien por cien. Además, hablar abiertamente con ellos sobre qué usos son aceptables reduce mucho el problema.",
    },
    {
      q: "¿La IA puede sustituir mi criterio pedagógico a la hora de evaluar?",
      a: "No debería. La IA puede ayudarte a generar una rúbrica o un primer borrador de corrección, pero la decisión final sobre la nota y el feedback cualitativo requiere tu conocimiento del alumno y del contexto, algo que la IA no tiene.",
    },
    {
      q: "¿Qué diferencia hay entre usar ChatGPT y NotebookLM para preparar material de clase?",
      a: "ChatGPT y Claude generan contenido a partir de su conocimiento general, por lo que pueden inventar datos si no tienen certeza. NotebookLM trabaja solo sobre los documentos que tú le subes, así que es más fiable cuando quieres que el resultado se ciña estrictamente a tu propio temario o apuntes.",
    },
    {
      q: "¿Necesito pedir permiso para usar IA en el aula?",
      a: "Depende de la normativa de tu centro y de tu comunidad autónoma, que cada vez regulan más este tema. Consulta con dirección o con el equipo de coordinación TIC antes de introducir herramientas de IA de forma sistemática, especialmente si van a implicar el tratamiento de datos del alumnado.",
    },
  ],
};
