import type { GuideContent } from "@/lib/guides/types";

export const guide: GuideContent = {
  slug: "arquitectos",
  profession: "Arquitectos",
  icon: "📐",
  tagline: "Ideación, renders y memorias técnicas más rápidas",

  title: "IA para Arquitectos: ideación, renders y memorias técnicas más rápidas",
  metaDescription:
    "Guía práctica de IA para arquitectos: herramientas reales para renders de concepto y memorias, prompts copiables y un flujo de trabajo sin sustituir el cálculo técnico.",
  keywords: [
    "ia para arquitectos",
    "midjourney arquitectura",
    "stable diffusion renders arquitectura",
    "ia en revit",
    "ia en autocad",
    "memoria técnica con ia",
    "renders de concepto ia",
    "ia arquitectura españa",
  ],
  updatedAt: "2026-07-24",

  subtitle:
    "Herramientas y flujos reales para acelerar la ideación, los renders de concepto y la redacción técnica sin delegar el cálculo ni la responsabilidad normativa.",
  intro: [
    "Si trabajas en un estudio de arquitectura, seguramente ya has visto circular renders espectaculares generados con IA en Instagram y te has preguntado cuánto de eso es útil de verdad para tu día a día. La respuesta corta: bastante, pero no donde parece a primera vista. La IA generativa de imágenes es muy buena para explorar direcciones de concepto en la fase de anteproyecto, generar variaciones rápidas de una fachada o ambientar una propuesta para el cliente. Es mucho más floja, y directamente peligrosa, si se usa para sustituir el cálculo estructural, la normativa de aplicación o la verificación técnica de una solución constructiva.",
    "Esta guía está pensada para arquitectos y estudios que quieren incorporar la IA donde de verdad ahorra tiempo: ideación visual, renders de concepto para presentar al cliente antes de invertir horas en un render fotorrealista definitivo, y la parte de redacción que ocupa tantas horas como el propio proyecto: memorias descriptivas, memorias constructivas, justificaciones normativas y comunicaciones con clientes y administraciones. Vas a encontrar cinco herramientas concretas que existen y funcionan hoy, cuatro prompts que puedes copiar y adaptar, un caso de flujo de trabajo real y los errores más comunes, incluidos dos que tienen que ver directamente con la responsabilidad profesional: los derechos de autor de los renders generados y la tentación de dejar que la IA verifique lo que solo puede verificar un técnico competente.",
    "Una advertencia antes de empezar, y esta es la más importante de toda la guía: ninguna herramienta de IA generativa de las que vas a leer aquí sustituye el cálculo estructural, la comprobación del Código Técnico de la Edificación, la normativa urbanística local o cualquier verificación que exija tu firma y tu responsabilidad civil profesional. Úsalas para explorar, redactar borradores y ganar tiempo administrativo. La firma sigue siendo tuya, y lo que hay detrás de ella también.",
  ],

  tools: [
    {
      name: "Midjourney",
      forWhat:
        "Generación de imágenes de concepto de alta calidad estética: exploración de volumetría, materialidad y ambiente para una propuesta antes de invertir horas en un render definitivo con motores de renderizado tradicionales.",
      price: "De pago (desde ~10€/mes)",
      steps: [
        "Únete al servidor de Discord de Midjourney o usa su web app con tu cuenta.",
        "Describe el tipo de edificio, el entorno, los materiales y el estilo arquitectónico de referencia en el prompt.",
        "Genera varias variaciones y usa 'vary' o 'upscale' sobre la que mejor comunique la idea al cliente.",
      ],
      url: "https://www.midjourney.com",
      urlLabel: "midjourney.com",
    },
    {
      name: "Stable Diffusion",
      forWhat:
        "Alternativa de código abierto para generar renders de concepto, con la ventaja de poder ejecutarla localmente o afinarla con modelos entrenados en un estilo arquitectónico concreto (útil si un estudio quiere consistencia visual entre proyectos).",
      price: "Gratuita (de código abierto; interfaces como plataformas online tienen planes de pago)",
      steps: [
        "Accede a través de una interfaz como Stability AI o instálala localmente si tienes GPU suficiente.",
        "Describe la propuesta con el mismo nivel de detalle que en Midjourney: tipología, materiales, entorno, luz.",
        "Usa 'img2img' partiendo de un boceto o una planta propia para que el resultado respete mejor la geometría real del proyecto.",
      ],
      url: "https://stability.ai",
      urlLabel: "stability.ai",
    },
    {
      name: "Herramientas de IA en Revit",
      forWhat:
        "Funciones de IA integradas en el flujo BIM de Autodesk: generación de opciones de diseño paramétrico, detección de conflictos entre disciplinas y automatización de tareas repetitivas de documentación dentro del propio modelo.",
      price: "Incluida en la suscripción de Revit / AEC Collection",
      steps: [
        "Abre tu proyecto de Revit con una licencia activa de Autodesk que incluya las funciones de IA disponibles en tu versión.",
        "Prueba las herramientas de generación de opciones o de detección de interferencias sobre un modelo ya avanzado.",
        "Revisa cada sugerencia manualmente: estas funciones aceleran la exploración, no sustituyen la validación técnica del proyectista.",
      ],
      url: "https://www.autodesk.com/products/revit",
      urlLabel: "autodesk.com/revit",
    },
    {
      name: "ChatGPT / Claude",
      forWhat:
        "Apoyo en la parte no visual del trabajo: redactar borradores de memoria descriptiva y constructiva, resumir normativa aplicable, estructurar un índice de proyecto básico o de ejecución y preparar respuestas a requerimientos de la administración.",
      price: "Freemium",
      steps: [
        "Abre chat.openai.com o claude.ai y describe el tipo de proyecto, su uso y el contexto normativo.",
        "Pide un borrador estructurado por apartados (memoria descriptiva, constructiva, justificación normativa) en lugar de un texto único.",
        "Revisa y corrige cada apartado con tus propios datos: la IA no conoce las particularidades reales de tu proyecto ni la normativa local vigente al detalle.",
      ],
      url: "https://chat.openai.com",
      urlLabel: "chat.openai.com",
    },
    {
      name: "Canva",
      forWhat:
        "Maquetación rápida de paneles de presentación para clientes, propuestas comerciales y documentos de comunicación (no técnicos) que combinan renders, planos simplificados y texto.",
      price: "Freemium",
      steps: [
        "Entra en Canva y busca una plantilla de presentación o panel de proyecto.",
        "Sustituye las imágenes por tus renders y planos, y ajusta textos y tipografía a la identidad del estudio.",
        "Exporta en PDF o imagen para enviar al cliente o presentar en una reunión.",
      ],
      url: "https://www.canva.com",
      urlLabel: "canva.com",
    },
  ],

  prompts: [
    {
      title: "Exploración de concepto volumétrico",
      when: "En la fase de anteproyecto, para presentar 2-3 direcciones visuales distintas antes de que el cliente elija hacia dónde avanzar.",
      prompt:
        "Genera una imagen de concepto arquitectónico para [TIPO DE EDIFICIO, ej. vivienda unifamiliar entre medianeras] situado en [ENTORNO, ej. casco urbano mediterráneo]. Estilo: [ESTILO, ej. contemporáneo, materiales cálidos, líneas limpias]. Materiales predominantes: [MATERIALES]. Luz: [MOMENTO DEL DÍA, ej. atardecer, luz cálida rasante]. Vista: [TIPO DE VISTA, ej. exterior desde calle, tres cuartos].",
      customize: [
        "Sustituye [TIPO DE EDIFICIO] y [ENTORNO] por el proyecto real y su contexto urbano o rural.",
        "Pide 3-4 variaciones de estilo antes de enseñar nada al cliente.",
        "Recuerda que esto es una imagen de referencia conceptual, no una representación fiel de la geometría final del proyecto.",
      ],
    },
    {
      title: "Borrador de memoria descriptiva",
      when: "Al iniciar la redacción del proyecto básico, para tener una estructura de partida que luego rellenas y corriges con los datos reales.",
      prompt:
        "Redacta un borrador de memoria descriptiva para un proyecto de [TIPO DE OBRA, ej. reforma integral de vivienda] en [UBICACIÓN, ej. municipio y provincia]. Superficie construida: [SUPERFICIE] m². Uso: [USO]. Incluye apartados de: agentes de la edificación, información previa, descripción del proyecto, prestaciones del edificio y cumplimiento normativo general (sin citar artículos concretos). Tono técnico, en español de España, apto para visado.",
      customize: [
        "Rellena cada corchete con los datos reales del proyecto y del emplazamiento.",
        "Verifica en fuente oficial (CTE, normativa autonómica y municipal) cualquier referencia normativa antes de incluirla: la IA puede alucinar artículos, plazos o requisitos que no existen o están desactualizados.",
      ],
    },
    {
      title: "Resumen de normativa urbanística aplicable",
      when: "Para tener un primer resumen orientativo de la normativa de un municipio antes de consultarla en la fuente oficial.",
      prompt:
        "Actúa como un asistente técnico que ayuda a un arquitecto a orientarse en normativa urbanística. Dado que voy a proyectar [TIPO DE ACTUACIÓN, ej. ampliación de vivienda] en [MUNICIPIO, PROVINCIA], indícame qué documentos normativos debería consultar (PGOU, normas subsidiarias, ordenanzas municipales) y qué parámetros urbanísticos suelo verificar habitualmente (edificabilidad, altura, retranqueos, ocupación). No des cifras concretas, solo la lista de qué comprobar y dónde.",
      customize: [
        "Usa esto solo como checklist de qué mirar, nunca como fuente de los valores numéricos reales.",
        "Verifica siempre los parámetros exactos en el ayuntamiento o en el PGOU vigente publicado oficialmente.",
      ],
    },
    {
      title: "Respuesta a un requerimiento de la administración",
      when: "Cuando llega un requerimiento de subsanación y necesitas estructurar una respuesta técnica clara y en plazo.",
      prompt:
        "Ayúdame a estructurar una respuesta técnica a un requerimiento de subsanación de [ORGANISMO, ej. ayuntamiento / colegio profesional] sobre un proyecto de [TIPO DE OBRA]. El requerimiento pide: [RESUMEN DEL REQUERIMIENTO]. Mi respuesta técnica es: [TU RESPUESTA EN BRUTO]. Redacta el documento con un tono formal, en español de España, organizado punto por punto siguiendo el orden del requerimiento original.",
      customize: [
        "Aporta tú el contenido técnico real en [TU RESPUESTA EN BRUTO]; la IA solo debe dar formato y estructura, no inventar la justificación técnica.",
        "Revisa que cada punto responda exactamente a lo solicitado antes de enviarlo.",
      ],
    },
  ],

  workflow: {
    title: "Caso real: cómo un estudio pequeño redujo el tiempo de la fase de anteproyecto",
    before:
      "Antes: 10-12 horas por proyecto en la fase de anteproyecto, entre buscar referencias visuales, montar un panel de presentación a mano y redactar desde cero la primera versión de la memoria descriptiva.",
    after:
      "Después: 4-5 horas, repartidas entre generar y curar opciones visuales con IA, redactar un primer borrador de memoria con IA y dedicar el tiempo humano a revisar, corregir con datos reales y verificar la normativa en fuente oficial.",
    steps: [
      "Recoge el brief del cliente (uso, superficie deseada, presupuesto orientativo, referencias que le gustan) y lo estructura con ayuda de ChatGPT o Claude.",
      "Genera 3-4 conceptos volumétricos distintos con Midjourney o Stable Diffusion usando el brief como base del prompt.",
      "Presenta las opciones al cliente en un panel montado en Canva, con una breve explicación de cada dirección.",
      "Una vez elegida la dirección, empieza a modelar en Revit apoyándose en las funciones de IA del propio software para explorar variantes de distribución.",
      "Redacta el borrador de la memoria descriptiva con IA a partir de los datos reales del proyecto y lo corrige y completa con la normativa verificada en fuente oficial.",
    ],
  },

  mistakes: [
    {
      mistake:
        "Presentar o publicar un render generado por IA como si fuera una representación fiel y definitiva del proyecto, cuando en realidad es una imagen de concepto que no respeta con precisión la geometría, las proporciones o los detalles constructivos reales.",
      solution:
        "Etiqueta siempre los renders de concepto como tales ante el cliente y resérvalos para la fase de ideación; el render definitivo que se presenta a visado o a la propiedad debe salir de un modelo real (BIM o CAD) con motores de renderizado tradicionales.",
    },
    {
      mistake:
        "No plantearse quién es el titular de los derechos de una imagen generada por IA a partir del estilo de un arquitecto o estudio concreto, especialmente si se usa en material de marketing o en un concurso.",
      solution:
        "Evita prompts que pidan explícitamente 'al estilo de [arquitecto o estudio concreto]' para uso comercial o de concurso, y revisa los términos de licencia de la herramienta que uses antes de publicar el resultado como material del estudio.",
    },
    {
      mistake:
        "Usar la IA para verificar o 'confirmar' el cumplimiento de una normativa (CTE, PGOU, ordenanzas) o para validar un cálculo estructural, confiando en la respuesta sin contrastarla en la fuente oficial.",
      solution:
        "La IA puede alucinar artículos, plazos y cifras normativas con total seguridad aparente. Úsala solo para orientarte sobre qué comprobar, y verifica siempre el dato exacto en el BOE, el PGOU o el software de cálculo homologado correspondiente.",
    },
    {
      mistake:
        "Delegar en la IA la redacción completa de la memoria o el proyecto sin revisión técnica propia, asumiendo que el resultado ya está listo para visado.",
      solution:
        "Trata cualquier texto generado por IA como un primer borrador de trabajo interno, nunca como documento final. La firma y la responsabilidad profesional siguen siendo tuyas, y eso exige revisión técnica completa antes de cualquier entrega.",
    },
  ],

  resources: [
    {
      label: "Debates sobre IA y arquitectura",
      href: "/debates",
      note: "Únete a la conversación con otros arquitectos sobre dónde ahorra tiempo la IA y dónde conviene tener cuidado con la responsabilidad profesional.",
    },
    {
      label: "IA para Gestores y asesorías",
      href: "/guias/ia-para-gestores",
      note: "Si colaboras con asesorías o gestorías en la parte administrativa y fiscal de tus proyectos, esta guía te ayuda a entender cómo usan la IA del otro lado.",
    },
    {
      label: "Herramientas de IA seleccionadas",
      href: "/?categoria=herramientas",
      note: "Explora más herramientas de IA curadas y comentadas por la comunidad, más allá de las cinco de esta guía.",
    },
  ],

  faqs: [
    {
      q: "¿Puedo usar renders generados por IA en un concurso de arquitectura?",
      a: "Depende de las bases del concurso: muchas exigen que las imágenes representen fielmente el proyecto real y no permiten renders de IA como pieza definitiva. Úsalos como apoyo en la fase de ideación interna, pero comprueba siempre las bases antes de incluir una imagen generada por IA en la entrega oficial.",
    },
    {
      q: "¿La IA puede sustituir el cálculo estructural de un proyecto?",
      a: "No. Ninguna herramienta de IA generativa de las mencionadas en esta guía está pensada ni validada para cálculo estructural. Ese trabajo sigue haciéndose con software de cálculo homologado y bajo la responsabilidad y firma del técnico competente.",
    },
    {
      q: "¿Quién es el propietario de los derechos de un render generado con Midjourney o Stable Diffusion?",
      a: "Varía según la herramienta y su licencia de uso, que además cambia con el tiempo. Revisa los términos actualizados de la plataforma que uses antes de publicar o entregar el resultado, y evita reproducir el estilo reconocible de otro autor o estudio.",
    },
    {
      q: "¿Es fiable pedirle a una IA que me resuma la normativa urbanística de un municipio?",
      a: "Es útil como primer orden de magnitud y para saber qué documentos consultar, pero no es fiable para cifras exactas (edificabilidad, alturas, retranqueos) ni para la normativa vigente en un momento concreto. Verifica siempre esos datos en el PGOU o en el ayuntamiento correspondiente.",
    },
    {
      q: "¿Merece la pena usar IA si trabajo en un estudio pequeño o soy autónomo?",
      a: "Sí, precisamente porque no tienes un equipo grande que asuma las tareas repetitivas de ideación visual y redacción de borradores. La IA no sustituye tu criterio técnico, pero libera horas que puedes dedicar a la parte que sí requiere tu firma y tu responsabilidad.",
    },
  ],
};
