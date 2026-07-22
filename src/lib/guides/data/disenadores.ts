import type { GuideContent } from "@/lib/guides/types";

export const guide: GuideContent = {
  slug: "disenadores",
  profession: "Diseñadores",
  icon: "🎨",
  tagline: "Genera assets, ideación y mockups 10x más rápido",

  title: "IA para Diseñadores: genera assets, ideación y mockups más rápido",
  metaDescription:
    "Guía práctica de IA para diseñadores: herramientas reales, prompts copiables y un flujo de trabajo para acelerar mockups, moodboards y assets sin perder tu criterio.",
  keywords: [
    "ia para diseñadores",
    "midjourney diseño gráfico",
    "figma ai",
    "adobe firefly",
    "canva magic studio",
    "ia diseño ux",
    "generar mockups con ia",
    "derechos de autor imágenes ia",
  ],
  updatedAt: "2026-07-21",

  subtitle:
    "Herramientas y flujos reales para que la IA haga el trabajo pesado y tú te quedes con el criterio y la decisión final.",
  intro: [
    "Si te dedicas al diseño, ya has notado el ruido: cada semana sale una herramienta nueva que promete generar en segundos lo que antes te llevaba una tarde. Parte de eso es exagerado, pero otra parte es real y útil. La IA no va a sustituir tu criterio, tu conocimiento de marca o tu ojo para la composición, pero sí puede quitarte de encima las tareas mecánicas y repetitivas: buscar referencias, generar variantes de un icono, maquetar una primera versión de un mockup o escribir el copy de relleno de una presentación.",
    "Esta guía está pensada para diseñadores que trabajan con clientes, marca o producto y quieren usar la IA como una herramienta más del kit, no como un atajo mágico. Vas a encontrar cinco herramientas concretas que existen y funcionan hoy, cuatro prompts que puedes copiar y adaptar, un caso de flujo de trabajo real, los errores más comunes que se cometen al integrar IA en el proceso de diseño, y las preguntas que más se repiten sobre derechos de autor y uso comercial.",
    "Una advertencia antes de empezar: la IA generativa de imágen es rápida para explorar y prototipar, pero floja para el detalle final y para todo lo que implique coherencia exacta de marca (tipografías propias, paletas exactas, elementos de un manual de identidad). Úsala para la fase de ideación y primeras versiones, y reserva tu tiempo humano para pulir, ajustar y decidir qué se queda.",
  ],

  tools: [
    {
      name: "Midjourney",
      forWhat:
        "Generación de imágenes conceptuales de alta calidad estética: moodboards, ilustraciones, referencias visuales y exploración de estilos para un proyecto.",
      price: "De pago (desde ~10€/mes)",
      steps: [
        "Únete al servidor de Discord de Midjourney o usa su web app con tu cuenta.",
        "Escribe tu prompt describiendo estilo, composición, iluminación y referencias visuales.",
        "Genera variaciones, elige la que más se acerque y usa 'upscale' o 'vary' para refinarla.",
      ],
      url: "https://www.midjourney.com",
      urlLabel: "midjourney.com",
    },
    {
      name: "Figma AI",
      forWhat:
        "Funciones de IA integradas directamente en Figma: generar variantes de un componente, rellenar texto de ejemplo realista, eliminar fondos y buscar dentro de tus propios archivos.",
      price: "Freemium (incluida en planes de Figma)",
      steps: [
        "Abre un archivo de Figma con tu cuenta y activa las funciones de IA en el panel correspondiente.",
        "Selecciona una capa o componente y prueba 'Generate' o 'Rename layers' para acelerar tareas repetitivas.",
        "Usa la búsqueda con IA para encontrar componentes o archivos antiguos por descripción, no solo por nombre.",
      ],
      url: "https://www.figma.com/ai",
      urlLabel: "figma.com/ai",
    },
    {
      name: "Canva Magic Studio",
      forWhat:
        "Conjunto de herramientas de IA dentro de Canva para generar imágenes, quitar fondos, redimensionar diseños a distintos formatos y escribir copys rápidos para piezas de marketing.",
      price: "Freemium",
      steps: [
        "Entra en Canva y abre el panel 'Magic Studio' desde cualquier diseño.",
        "Prueba 'Magic Media' para generar imágenes o 'Magic Resize' para adaptar una pieza a varios formatos a la vez.",
        "Revisa y ajusta manualmente los márgenes y la tipografía antes de exportar.",
      ],
      url: "https://www.canva.com/magic-studio",
      urlLabel: "canva.com/magic-studio",
    },
    {
      name: "Adobe Firefly",
      forWhat:
        "Generación de imágenes y efectos entrenada por Adobe con licencia comercial más clara, integrada en Photoshop e Illustrator para relleno generativo, texturas y variaciones de un elemento.",
      price: "Freemium (con créditos incluidos en Creative Cloud)",
      steps: [
        "Abre Photoshop o Illustrator con tu suscripción de Creative Cloud, o entra en firefly.adobe.com.",
        "Usa 'Relleno generativo' seleccionando una zona de tu imagen y describiendo lo que quieres añadir o quitar.",
        "Genera varias opciones, elige la más coherente con el resto de la composición y ajústala a mano.",
      ],
      url: "https://firefly.adobe.com",
      urlLabel: "firefly.adobe.com",
    },
    {
      name: "ChatGPT",
      forWhat:
        "Apoyo en la parte no visual del trabajo: redactar briefs, resumir feedback de clientes, generar naming, estructurar una presentación o explicar una decisión de diseño con argumentos.",
      price: "Freemium",
      steps: [
        "Abre chat.openai.com y describe el contexto del proyecto y lo que necesitas.",
        "Pide varias alternativas (nombres, textos, estructuras) en lugar de una sola.",
        "Edita el resultado con tu propia voz antes de enviarlo a un cliente.",
      ],
      url: "https://chat.openai.com",
      urlLabel: "chat.openai.com",
    },
  ],

  prompts: [
    {
      title: "Moodboard conceptual para un proyecto nuevo",
      when: "Cuando empiezas un proyecto y necesitas explorar dirección visual antes de abrir Figma.",
      prompt:
        "Genera un concepto visual para [TIPO DE PROYECTO, ej. app de finanzas personales] dirigido a [PÚBLICO OBJETIVO]. Estilo: [ESTILO, ej. minimalista, cálido, editorial]. Paleta de color dominante: [COLORES]. Referencias de inspiración: [MARCAS O ESTILOS DE REFERENCIA]. Muéstralo como una composición tipo moodboard con textura, tipografía sugerida e iluminación.",
      customize: [
        "Cambia [TIPO DE PROYECTO] y [PÚBLICO OBJETIVO] por el brief real del cliente.",
        "Si el cliente ya tiene manual de marca, añade sus colores exactos en [COLORES].",
        "Pide 3-4 variaciones de estilo antes de decidir dirección.",
      ],
    },
    {
      title: "Variantes rápidas de un icono o elemento gráfico",
      when: "Cuando necesitas explorar rápido varias versiones de un mismo elemento antes de vectorizarlo a mano.",
      prompt:
        "Diseña un icono simple y plano que represente [CONCEPTO, ej. 'ahorro automático'] para usarse en una interfaz [MÓVIL / WEB]. Estilo: [ESTILO, ej. line icon, dos tonos, geométrico]. Fondo transparente. Genera 4 variaciones con distinto nivel de detalle, de más simple a más ilustrado.",
      customize: [
        "Ajusta el grosor de línea y el nivel de detalle según el sistema de iconos existente.",
        "Usa el resultado solo como referencia: vectoriza a mano en Figma o Illustrator para producción real.",
      ],
    },
    {
      title: "Explicar y defender una decisión de diseño ante el cliente",
      when: "Antes de una presentación de propuesta, para argumentar por qué elegiste cierta dirección.",
      prompt:
        "Actúa como un diseñador senior explicando a un cliente sin conocimientos de diseño por qué se eligió [DECISIÓN DE DISEÑO, ej. 'una tipografía serif para el logo']. Da 3 argumentos claros relacionados con [OBJETIVO DEL PROYECTO, ej. transmitir confianza y tradición], sin usar jerga técnica, en un tono cercano y en español de España.",
      customize: [
        "Sustituye [DECISIÓN DE DISEÑO] y [OBJETIVO DEL PROYECTO] por el caso concreto.",
        "Pide que acorte la respuesta a 3-4 frases si es para un email o un slide.",
      ],
    },
    {
      title: "Copy de relleno realista para un mockup",
      when: "Cuando necesitas texto de apoyo (lorem ipsum mejorado) que parezca contenido real dentro de un mockup o prototipo.",
      prompt:
        "Escribe textos de ejemplo realistas en español para una pantalla de [TIPO DE PANTALLA, ej. 'perfil de usuario de una app de fitness']: título, subtítulo, 3 botones de acción y un texto de ayuda de una línea. Que suene natural, no genérico, coherente con una marca [TONO DE MARCA, ej. cercana y motivadora].",
      customize: [
        "Cambia [TIPO DE PANTALLA] por cada pantalla del prototipo.",
        "Ajusta [TONO DE MARCA] según el brief de cada cliente.",
      ],
    },
  ],

  workflow: {
    title: "Caso real: cómo una diseñadora freelance redujo a la mitad el tiempo de la fase de propuesta",
    before:
      "Antes: 6-8 horas por proyecto dedicadas solo a la fase de exploración inicial (buscar referencias en Pinterest, montar un moodboard manual en Figma, redactar el documento de propuesta con el razonamiento de las decisiones).",
    after:
      "Después: 2-3 horas, repartidas entre generar y curar opciones con IA, y el tiempo humano dedicado a pulir la dirección elegida y redactar la argumentación final con su propia voz.",
    steps: [
      "Recoge el brief del cliente y lo pasa por ChatGPT para extraer objetivos, público y palabras clave de tono.",
      "Genera 3-4 conceptos visuales distintos con Midjourney usando esas palabras clave como base del prompt.",
      "Selecciona el concepto más alineado, lo reconstruye a mano en Figma con sus propios componentes y tipografías con licencia.",
      "Usa Canva Magic Studio para adaptar rápido el mockup elegido a los distintos formatos que pide el cliente (móvil, web, redes).",
      "Redacta la propuesta final con ayuda de ChatGPT para estructurar los argumentos, pero revisando y reescribiendo cada frase con su voz.",
    ],
  },

  mistakes: [
    {
      mistake:
        "Entregar directamente una imagen generada por IA como asset final de marca, sin revisar si el estilo puede reproducirse consistentemente en el resto de piezas.",
      solution:
        "Usa la IA para explorar dirección, pero reconstruye el asset final con tus herramientas vectoriales para garantizar coherencia, escalabilidad y control total sobre cada elemento.",
    },
    {
      mistake:
        "No verificar los derechos de autor y el uso comercial de las imágenes generadas antes de entregárselas a un cliente que las va a usar en campañas pagadas.",
      solution:
        "Revisa los términos de uso comercial de la herramienta que uses (varían entre Midjourney, Firefly y Canva) y comunica al cliente claramente qué elementos son generados por IA y bajo qué licencia.",
    },
    {
      mistake:
        "Depender tanto de la IA para la ideación que se pierde el músculo propio de generar conceptos desde cero, o se empieza a repetir el mismo 'estilo IA' reconocible en todos los proyectos.",
      solution:
        "Alterna: en algunos proyectos, especialmente los más creativos o de marca personal, empieza sin IA y resérvala para fases de producción o cuando el bloqueo creativo sea real.",
    },
    {
      mistake:
        "Generar un elemento visual muy parecido al estilo reconocible de otro artista o marca (imitando su identidad visual) sin plantearse el problema ético y legal que supone.",
      solution:
        "Evita prompts que pidan explícitamente 'al estilo de [artista o marca concreta]' para trabajo comercial; describe el estilo por sus atributos (color, textura, composición) en lugar de por el nombre del autor.",
    },
  ],

  resources: [
    {
      label: "Debates sobre IA y diseño",
      href: "/debates",
      note: "Únete a la conversación con otros diseñadores sobre cómo están integrando la IA en su proceso, sin perder su sello personal.",
    },
    {
      label: "IA para Profesores",
      href: "/guias/ia-para-profesores",
      note: "Si trabajas con clientes del sector educativo o formación, esta guía te ayuda a entender cómo usan la IA del otro lado.",
    },
    {
      label: "Herramientas de IA seleccionadas",
      href: "/?categoria=herramientas",
      note: "Explora más herramientas de IA curadas y comentadas por la comunidad, más allá de las cinco de esta guía.",
    },
  ],

  faqs: [
    {
      q: "¿Puedo usar comercialmente imágenes generadas con IA en un proyecto de cliente?",
      a: "Depende de la herramienta y de su licencia de uso comercial, que cambia con el tiempo. Firefly y Canva suelen estar pensados para uso comercial dentro de sus planes de pago; revisa siempre los términos actualizados y comunica al cliente qué partes del entregable son generadas por IA.",
    },
    {
      q: "¿La IA generativa sustituye a Figma o Illustrator?",
      a: "No. La IA genera ideas e imágenes rasterizadas o de referencia; el trabajo de producción real (componentes, sistemas de diseño, vectores editables) sigue haciéndose en herramientas como Figma o Illustrator, donde ahora también hay funciones de IA integradas que ayudan pero no sustituyen el archivo de trabajo.",
    },
    {
      q: "¿Cómo evito que mi estilo se vuelva genérico por usar siempre las mismas herramientas de IA?",
      a: "Usa la IA solo en fases concretas (exploración inicial, variantes rápidas) y no para el resultado final. Combina varias herramientas, ajusta mucho los prompts y dedica tiempo humano a curar y modificar lo que sale, en lugar de aceptar la primera generación.",
    },
    {
      q: "¿Puede una IA generar un logo completo listo para usar?",
      a: "Puede generar ideas de dirección, pero un logo final necesita ser vectorial, escalable y coherente con un sistema de marca completo (tipografía, usos, versiones en negativo). Lo habitual es usar la IA para explorar conceptos y luego construir el logo definitivo a mano.",
    },
    {
      q: "¿Qué pasa si un cliente pide explícitamente que 'se note menos' el uso de IA?",
      a: "Es una señal de que valora la autoría humana en el proyecto. En ese caso, usa la IA solo en tareas internas de apoyo (referencias, copy de relleno, organización) y no en los assets visuales finales, y sé transparente sobre dónde sí la usaste.",
    },
  ],
};
