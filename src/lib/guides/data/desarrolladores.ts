import type { GuideContent } from "@/lib/guides/types";

export const guide: GuideContent = {
  slug: "desarrolladores",
  profession: "Desarrolladores",
  icon: "💻",
  tagline: "Acelera tu código, debugging y documentación",

  // ── SEO ──
  title: "IA para Desarrolladores: herramientas para acelerar tu código y tu debugging",
  metaDescription:
    "Guía práctica de IA para desarrolladores: qué herramientas usar, prompts listos y un caso real para programar, depurar y documentar más rápido.",
  keywords: [
    "IA para desarrolladores",
    "IA para programadores",
    "GitHub Copilot",
    "Cursor IA",
    "IA para debugging",
    "asistente de código IA",
    "ChatGPT para programar",
    "IA generación de código",
  ],
  updatedAt: "2026-07-21",

  // ── Cuerpo ──
  subtitle: "Herramientas y prompts para escribir, depurar y documentar código sin perder el control sobre lo que se despliega.",
  intro: [
    "Si programas, probablemente ya usas algo de IA sin llamarlo así: el autocompletado de tu editor lleva años sugiriendo líneas enteras. Lo que ha cambiado en los últimos años es la profundidad: ahora puedes pedirle a una IA que entienda un fichero completo, que te explique un stack trace críptico, o que te escriba tests para una función que acabas de terminar, todo en segundos.",
    "El riesgo no es que la IA te sustituya, sino que confíes en su código igual que confiarías en el de un compañero senior sin revisarlo. El código que genera compila, a veces incluso pasa los tests que ella misma escribió, y aun así puede tener bugs sutiles, dependencias inventadas o vulnerabilidades de seguridad que solo se ven leyendo con calma. La IA es un multiplicador de velocidad, no un sustituto del code review.",
    "Esta guía asume que ya sabes programar y quieres usar la IA como una herramienta más en tu flujo de trabajo, no como una caja negra mágica. Vamos a ver qué herramientas usar según la tarea, prompts que puedes adaptar hoy mismo, y los errores más comunes que cometen los equipos al integrar IA en su día a día.",
  ],

  tools: [
    {
      name: "GitHub Copilot",
      forWhat: "Autocompletado de código en tiempo real dentro de tu editor, sugiriendo líneas o funciones completas mientras escribes.",
      price: "De pago (desde ~10€/mes), gratuito para estudiantes y proyectos open source",
      steps: [
        "Instala la extensión de Copilot en VS Code, JetBrains o tu editor compatible.",
        "Acepta sugerencias con Tab solo cuando entiendas exactamente qué hace la línea propuesta.",
        "Usa el chat integrado (Copilot Chat) para pedir explicaciones o refactors sobre el fichero abierto.",
      ],
      url: "https://github.com/features/copilot",
      urlLabel: "github.com/features/copilot",
    },
    {
      name: "Cursor",
      forWhat: "Editor de código construido alrededor de IA: edición multi-archivo guiada por chat, entendiendo el contexto de todo el repositorio.",
      price: "Freemium (plan de pago desde ~20€/mes)",
      steps: [
        "Descarga Cursor e importa tu configuración de VS Code (extensiones y atajos se migran solos).",
        "Usa Cmd+K para pedir ediciones puntuales sobre el código seleccionado, y el chat lateral para tareas que tocan varios ficheros.",
        "Revisa el diff que propone antes de aceptar cualquier cambio multi-archivo; no aceptes en bloque sin mirar.",
      ],
      url: "https://cursor.com",
      urlLabel: "cursor.com",
    },
    {
      name: "Claude",
      forWhat: "Razonar sobre arquitectura, revisar código largo pegado o subido como fichero, y depurar errores complejos explicando el porqué, no solo el qué.",
      price: "Freemium (versión de pago desde ~18€/mes)",
      steps: [
        "Pega el fragmento de código y el stack trace completo del error, no solo la última línea.",
        "Pide que explique la causa raíz antes de proponer el fix, para asegurarte de que entiende el problema real.",
        "Usa conversaciones largas para ir iterando sobre el mismo módulo sin perder contexto.",
      ],
      url: "https://claude.ai",
      urlLabel: "claude.ai",
    },
    {
      name: "ChatGPT",
      forWhat: "Generar snippets rápidos, explicar código de librerías desconocidas y escribir documentación técnica o comentarios en el propio idioma del equipo.",
      price: "Freemium (versión de pago desde ~20€/mes)",
      steps: [
        "Usa el modelo de razonamiento avanzado del plan de pago para bugs complejos o diseño de algoritmos.",
        "Pide siempre ejemplos de uso además del código, para verificar rápido que hace lo que crees que hace.",
        "Aprovecha los proyectos/carpetas para mantener contexto de un repositorio concreto entre conversaciones.",
      ],
      url: "https://chat.openai.com",
      urlLabel: "chat.openai.com",
    },
    {
      name: "Perplexity",
      forWhat: "Buscar documentación actualizada de librerías, comparar enfoques técnicos o encontrar la causa de un error poco común con fuentes citadas.",
      price: "Freemium (versión de pago desde ~20€/mes)",
      steps: [
        "Pega el mensaje de error exacto o el nombre de la librería y versión en la búsqueda.",
        "Revisa las fuentes citadas (issues de GitHub, changelogs, Stack Overflow) antes de aplicar la solución.",
        "Útil especialmente cuando ChatGPT o Claude 'no saben' de una release muy reciente.",
      ],
      url: "https://www.perplexity.ai",
      urlLabel: "perplexity.ai",
    },
  ],

  prompts: [
    {
      title: "Explicar un stack trace",
      when: "Cuando salta un error en producción o en local y no tienes claro por dónde empezar a mirar.",
      prompt:
        "Actúa como desarrollador senior de [LENGUAJE/FRAMEWORK, ej. Node.js con Express]. Este es el stack trace completo del error: [PEGAR STACK TRACE]. Y este es el fragmento de código relevante: [PEGAR CÓDIGO]. Explícame: 1) cuál es la causa raíz más probable, 2) por qué ocurre exactamente en esta línea, 3) dos posibles fixes con sus trade-offs, sin aplicar ninguno todavía.",
      customize: [
        "El lenguaje y framework exactos, incluyendo versión si es relevante.",
        "Cuánto contexto adicional das (variables de entorno, versión de dependencias) si el error parece de configuración.",
        "Pide que priorice el fix menos invasivo si el bug está en producción y hay prisa.",
      ],
    },
    {
      title: "Generar tests para una función existente",
      when: "Cuando terminas una función o módulo y quieres cobertura de tests sin escribirlos todos a mano.",
      prompt:
        "Escribe tests unitarios en [FRAMEWORK DE TESTING, ej. Jest] para esta función: [PEGAR CÓDIGO DE LA FUNCIÓN]. Cubre: caso feliz, al menos dos casos límite (valores vacíos, nulos o extremos), y un caso de error esperado. Usa el estilo de nombres [describe/it o el que uses] y no incluyas mocks innecesarios si la función es pura.",
      customize: [
        "El framework de testing que usa tu proyecto (Jest, Vitest, pytest, JUnit...).",
        "Si la función tiene dependencias externas, indica qué debe mockear y qué no.",
        "Pide casos adicionales específicos del dominio si el negocio tiene reglas particulares.",
      ],
    },
    {
      title: "Revisión de código antes de abrir un PR",
      when: "Antes de pedir revisión a un compañero, para pillar problemas obvios tú primero.",
      prompt:
        "Revisa este diff como si fueras un reviewer estricto en un PR de [TIPO DE PROYECTO, ej. API REST en producción]: [PEGAR DIFF]. Señala: 1) posibles bugs o edge cases no cubiertos, 2) problemas de legibilidad o naming, 3) riesgos de seguridad o performance, 4) si falta algo de manejo de errores. Sé directo, no me digas que 'todo está bien' si hay algo mejorable.",
      customize: [
        "El tipo de proyecto y el nivel de criticidad (interno vs. cara al usuario) para calibrar el rigor.",
        "Pide que ignore el estilo si ya tienes un linter/formatter automático que lo cubre.",
        "Añade el contexto de negocio si hay una regla que no es obvia solo mirando el código.",
      ],
    },
    {
      title: "Documentar una función o módulo",
      when: "Cuando necesitas dejar documentación clara para el equipo o para tu yo del futuro.",
      prompt:
        "Genera documentación en formato [JSDoc/docstring/Markdown] para este código: [PEGAR CÓDIGO]. Incluye: qué hace, parámetros de entrada con tipos, valor de retorno, un ejemplo de uso realista, y cualquier efecto secundario o precondición importante (por ejemplo, si requiere una conexión abierta o modifica estado externo).",
      customize: [
        "El formato de documentación que use tu proyecto o lenguaje.",
        "Si el código tiene comportamientos no obvios, menciónalos explícitamente para que los incluya.",
        "Pide una versión corta para el README y otra detallada para la documentación interna si necesitas ambas.",
      ],
    },
  ],

  workflow: {
    title: "Caso real: cómo un equipo backend redujo el tiempo de migración de una API legacy",
    before: "Antes: 3 semanas estimadas para migrar 40 endpoints de una API antigua en callbacks a async/await con tests actualizados.",
    after: "Después: 9 días, con revisión manual de cada endpoint migrado antes de mergear.",
    steps: [
      "Usan Cursor para pedir, endpoint por endpoint, la conversión de callbacks a async/await manteniendo la misma firma pública.",
      "Cada conversión se revisa a mano comparando el comportamiento ante errores con el código original, no solo el caso feliz.",
      "Piden a Claude que genere los tests que faltaban para el endpoint migrado, cubriendo los casos límite que ya conocían del legacy.",
      "Corren la suite de tests completa y el linter en CI antes de considerar el endpoint como migrado.",
      "Usan ChatGPT para actualizar la documentación interna (Swagger/OpenAPI) de cada endpoint tocado.",
      "Un desarrollador senior hace review final de todo el PR antes de merge, con foco especial en manejo de errores y timeouts.",
    ],
  },

  mistakes: [
    {
      mistake: "Aceptar código generado por IA sin leerlo línea a línea, confiando en que 'si compila, funciona'.",
      solution: "Trata cada sugerencia de IA como el código de un compañero nuevo en el equipo: léelo, entiéndelo y solo entonces decide si lo aceptas tal cual, lo ajustas o lo descartas.",
    },
    {
      mistake: "Pegar código con secretos, API keys o datos de clientes en herramientas de IA que no tienen garantías de confidencialidad para tu empresa.",
      solution: "Usa variables de entorno y placeholders antes de pegar código en un chatbot público, y revisa si tu empresa tiene una herramienta de IA con acuerdo empresarial antes de compartir código propietario sensible.",
    },
    {
      mistake: "Pedir a la IA que resuelva un bug sin darle el contexto completo (versión de dependencias, stack trace entero, código relacionado).",
      solution: "Cuanto más contexto real le des —logs completos, versiones exactas, código de los ficheros implicados— mejor será el diagnóstico; las respuestas genéricas suelen venir de prompts genéricos.",
    },
    {
      mistake: "Dejar que la IA invente nombres de librerías, funciones o parámetros que no existen (alucinaciones de API).",
      solution: "Verifica siempre contra la documentación oficial o el propio código fuente de la librería que cualquier función, parámetro o import sugerido existe de verdad antes de ejecutar el código.",
    },
  ],

  resources: [
    {
      label: "Debate: ¿qué tan lejos dejáis llegar a la IA en vuestro código?",
      href: "/debates",
      note: "Comparte cómo tu equipo marca los límites entre autocompletado, generación asistida y revisión humana obligatoria.",
    },
    {
      label: "IA para Marketers",
      href: "/guias/ia-para-marketers",
      note: "Si trabajas cerca de producto o growth, esta guía te ayuda a entender cómo tu equipo de marketing usa la IA en su día a día.",
    },
    {
      label: "Explora herramientas por categoría",
      href: "/?categoria=herramientas",
      note: "Más herramientas de IA probadas, no solo para código, organizadas por categoría para encontrar rápido lo que necesitas.",
    },
  ],

  faqs: [
    {
      q: "¿GitHub Copilot y Cursor hacen lo mismo?",
      a: "Se solapan pero no son iguales. Copilot es principalmente autocompletado dentro de tu editor habitual (VS Code, JetBrains...), mientras que Cursor es un editor completo construido alrededor de IA, con más capacidad de entender y editar varios ficheros a la vez a través de chat. Muchos developers usan Cursor como editor principal y añaden Copilot o el chat de Claude para tareas puntuales.",
    },
    {
      q: "¿Es seguro usar IA con código de una empresa o cliente?",
      a: "Depende de la herramienta y del plan contratado. Los planes gratuitos o personales de muchas herramientas de IA pueden usar tus conversaciones para entrenar modelos, así que evita pegar código propietario o con secretos ahí. Para uso profesional, comprueba si tu empresa tiene un plan empresarial con garantías de que el código no se usa para entrenamiento y no se retiene más de lo necesario.",
    },
    {
      q: "¿La IA puede reemplazar el code review humano?",
      a: "No debería. Puede hacer una primera pasada útil detectando problemas obvios de estilo, edge cases no cubiertos o riesgos de seguridad comunes, pero no conoce el contexto de negocio completo ni las decisiones de arquitectura previas del equipo. Úsala como un primer filtro, no como el filtro final antes de producción.",
    },
    {
      q: "¿Por qué la IA a veces sugiere funciones o parámetros que no existen?",
      a: "Es una forma de alucinación específica de código: el modelo genera una llamada a función con el formato correcto pero que en realidad no existe en esa versión de la librería, o mezcla APIs de versiones distintas. Ocurre más con librerías poco populares o con cambios recientes. Siempre que uses una función que no reconozcas, comprueba la documentación oficial antes de confiar en ella.",
    },
    {
      q: "¿Vale la pena pagar por herramientas de IA para programar si trabajo solo o en un proyecto pequeño?",
      a: "En la mayoría de los casos sí compensa: el tiempo que ahorras en debugging, boilerplate y documentación suele superar de largo el coste mensual, incluso para un desarrollador individual. Empieza con los planes gratuitos o freemium de Copilot, Claude o ChatGPT para validar el flujo de trabajo antes de pagar por un plan superior.",
    },
  ],
};
