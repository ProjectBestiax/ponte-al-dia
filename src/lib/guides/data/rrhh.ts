import type { GuideContent } from "@/lib/guides/types";

export const guide: GuideContent = {
  slug: "rrhh",
  profession: "RRHH",
  icon: "🧑‍💼",
  tagline: "Selección, onboarding y comunicación interna con IA",

  // ── SEO ──
  title: "IA para RRHH: herramientas para agilizar selección, onboarding y comunicación interna",
  metaDescription:
    "Guía práctica de IA para RRHH: herramientas, prompts y un caso real para acelerar cribado de CVs, onboarding y comunicación interna sin perder el control humano.",
  keywords: [
    "IA para RRHH",
    "inteligencia artificial recursos humanos",
    "IA para selección de personal",
    "ChatGPT para RRHH",
    "IA cribado de CVs",
    "IA onboarding",
    "herramientas IA recursos humanos",
    "sesgo algorítmico selección",
  ],
  updatedAt: "2026-07-24",

  // ── Cuerpo ──
  subtitle: "Herramientas y prompts para ahorrar horas en selección, onboarding y comunicación interna, manteniendo siempre el criterio humano en las decisiones sobre personas.",
  intro: [
    "Si trabajas en RRHH, seguramente conoces bien la sensación de tener 200 CVs por revisar para una sola vacante, un onboarding que se queda a medias por falta de tiempo, o comunicados internos que reescribes tres veces antes de enviarlos. La IA generativa puede ahorrarte una parte importante de ese trabajo repetitivo, dejándote más tiempo para lo que de verdad requiere criterio humano: entrevistar, negociar, mediar y acompañar a las personas.",
    "Lo que la IA hace bien en RRHH es acelerar tareas de volumen y de redacción: preseleccionar candidatos según criterios objetivos que tú defines, generar un primer borrador de oferta de empleo, estructurar un plan de onboarding o redactar una comunicación interna clara. Lo que no debe hacer nunca es tomar la decisión final sobre una persona. Contratar, descartar o evaluar a alguien es una decisión con consecuencias reales en la vida de esa persona, y la responsabilidad de esa decisión —y de detectar si hay algo torcido en el proceso— sigue siendo tuya.",
    "Dos reglas de oro antes de automatizar nada. Primera: cualquier herramienta de IA que participe en el cribado de candidatos puede arrastrar sesgos —de género, edad, origen, formación— aprendidos de los datos con los que se entrenó, así que debes verificar y auditar periódicamente sus resultados, comparando quién pasa el filtro y quién no, y nunca delegar en ella la decisión final sin supervisión humana. Segunda: nunca subas currículums, datos personales o información de candidatos a herramientas de IA de consumo general sin comprobar antes qué garantías de protección de datos ofrecen; los CVs contienen datos personales protegidos por el RGPD y su tratamiento indebido puede tener consecuencias legales para tu empresa. Con estas dos reglas claras, el resto es cuestión de encontrar el flujo de trabajo que te encaje.",
  ],

  tools: [
    {
      name: "ChatGPT",
      forWhat: "Redactar ofertas de empleo, comunicados internos, preguntas de entrevista o mensajes de bienvenida, y estructurar planes de onboarding a partir de una plantilla.",
      price: "Freemium (versión de pago desde ~20€/mes)",
      steps: [
        "Crea una cuenta y da contexto claro: puesto, empresa, tono deseado, público destinatario.",
        "Pide siempre un borrador editable, nunca un texto final para enviar sin revisión.",
        "No pegues CVs completos ni datos personales de candidatos reales; usa descripciones genéricas del perfil.",
      ],
      url: "https://chat.openai.com",
      urlLabel: "chat.openai.com",
    },
    {
      name: "Claude",
      forWhat: "Analizar y comparar varios documentos largos (políticas internas, convenios, manuales de onboarding) y generar resúmenes estructurados o checklist a partir de ellos.",
      price: "Freemium (versión de pago desde ~18€/mes)",
      steps: [
        "Sube el documento (política interna, manual, convenio) sin datos personales de empleados o candidatos.",
        "Pide un resumen estructurado o una checklist de acciones a partir del documento.",
        "Contrasta cualquier punto crítico del resumen con el documento original antes de comunicarlo.",
      ],
      url: "https://claude.ai",
      urlLabel: "claude.ai",
    },
    {
      name: "Manatal",
      forWhat: "ATS (sistema de seguimiento de candidatos) con IA integrada para puntuar y ordenar candidaturas según criterios objetivos que tú defines, con trazabilidad del proceso.",
      price: "De pago (planes desde ~15€/usuario/mes)",
      steps: [
        "Configura los criterios de cribado (experiencia, formación, idiomas) de forma explícita y documentada antes de activar el scoring.",
        "Revisa periódicamente una muestra de candidatos descartados automáticamente para detectar patrones de sesgo.",
        "Usa el scoring como orden de prioridad para revisión humana, nunca como filtro definitivo sin supervisión.",
      ],
      url: "https://www.manatal.com",
      urlLabel: "manatal.com",
    },
    {
      name: "Perplexity",
      forWhat: "Investigación rápida con fuentes citadas: benchmarks salariales del sector, normativa laboral reciente o tendencias de employer branding.",
      price: "Freemium (versión de pago desde ~20€/mes)",
      steps: [
        "Lanza la búsqueda como una pregunta concreta (por ejemplo, sobre un cambio normativo o un rango salarial de mercado).",
        "Abre siempre las fuentes citadas al pie de la respuesta antes de dar el dato por bueno.",
        "Contrasta datos salariales o normativos con fuentes oficiales (BOE, convenios sectoriales) antes de usarlos en una decisión.",
      ],
      url: "https://www.perplexity.ai",
      urlLabel: "perplexity.ai",
    },
    {
      name: "Textio",
      forWhat: "Generación y mejora de descripciones de puesto (JDs) con sugerencias para reducir lenguaje sesgado y atraer candidaturas más diversas.",
      price: "De pago (consultar plan empresarial)",
      steps: [
        "Pega el borrador de tu oferta de empleo en la herramienta.",
        "Revisa las sugerencias sobre lenguaje sesgado o poco inclusivo que señale el sistema.",
        "Ajusta el texto final con tu propio criterio antes de publicarlo, sin aceptar cambios automáticamente.",
      ],
      url: "https://textio.com",
      urlLabel: "textio.com",
    },
  ],

  prompts: [
    {
      title: "Descripción de puesto (JD) desde cero",
      when: "Cuando necesitas publicar una vacante nueva y quieres arrancar con un borrador sólido.",
      prompt:
        "Actúa como especialista en selección. Redacta una descripción de puesto para [NOMBRE DEL PUESTO] en una empresa de [SECTOR/TAMAÑO], con estos requisitos imprescindibles: [REQUISITOS CLAVE]. Incluye: 1) resumen del rol en 2-3 líneas, 2) responsabilidades principales (5-7 puntos), 3) requisitos imprescindibles vs. deseables separados claramente, 4) qué ofrece la empresa. Usa lenguaje neutro e inclusivo, evita términos que puedan desincentivar candidaturas por género o edad, y evita jerga innecesaria.",
      customize: [
        "El puesto, sector y tamaño de empresa, que cambian el tono y el nivel de detalle técnico.",
        "Los requisitos imprescindibles reales, para no descartar candidatos válidos por exigencias infladas.",
        "El apartado de beneficios, ajustándolo a lo que realmente ofrece tu empresa.",
      ],
    },
    {
      title: "Criterios objetivos de cribado antes de puntuar candidatos",
      when: "Antes de activar cualquier scoring automático de candidaturas, para dejar por escrito criterios verificables y auditables.",
      prompt:
        "Ayúdame a definir criterios de cribado objetivos y verificables para el puesto de [NOMBRE DEL PUESTO], a partir de estos requisitos: [REQUISITOS DEL PUESTO]. Para cada criterio, indica: 1) cómo se mide de forma objetiva (años de experiencia, certificación, idioma con nivel concreto), 2) qué riesgo de sesgo podría introducir ese criterio (por ejemplo, exigir 'nativo digital' puede sesgar por edad), 3) una alternativa más neutra si detectas ese riesgo. No propongas criterios basados en datos personales sensibles (edad, género, origen, situación familiar).",
      customize: [
        "El puesto y los requisitos reales que quieres evaluar.",
        "El nivel de detalle si vas a documentar el proceso para una auditoría interna.",
        "Repite este ejercicio cada vez que cambies los criterios de una vacante activa.",
      ],
    },
    {
      title: "Plan de onboarding para un nuevo puesto",
      when: "Cuando incorporas a alguien nuevo y quieres un plan estructurado de primeros 30-60-90 días.",
      prompt:
        "Diseña un plan de onboarding de 30-60-90 días para una persona que se incorpora como [PUESTO] en el departamento de [DEPARTAMENTO]. Estructura por semanas los primeros 30 días (formación, reuniones clave, primeras tareas), y por fases (30/60/90) el resto, incluyendo objetivos medibles para cada fase y una checklist de documentación y accesos que necesitará el primer día. Manténlo genérico para poder reutilizarlo con distintas personas del mismo puesto.",
      customize: [
        "El puesto, departamento y si es una posición individual contributor o con gente a cargo.",
        "Los sistemas y accesos específicos de tu empresa (correo, herramientas internas, VPN).",
        "El nivel de seniority, ajustando el ritmo y la autonomía esperada en cada fase.",
      ],
    },
    {
      title: "Comunicado interno sobre un cambio organizativo",
      when: "Cuando necesitas anunciar un cambio (reestructuración, nueva política, cambio de horario) de forma clara y sin generar alarma innecesaria.",
      prompt:
        "Redacta un comunicado interno para toda la plantilla anunciando [CAMBIO ORGANIZATIVO/POLÍTICA]. El comunicado debe: 1) explicar el cambio en términos claros y directos, 2) indicar a quién afecta y desde cuándo, 3) anticipar 2-3 preguntas frecuentes que probablemente surjan y responderlas, 4) indicar a quién dirigirse para dudas. Tono profesional pero cercano, sin tecnicismos de RRHH, máximo 300 palabras.",
      customize: [
        "El cambio concreto y su alcance real (toda la empresa, un departamento, una ubicación).",
        "El tono, más formal si es un cambio sensible (reestructuración) o más neutro si es operativo.",
        "El canal de envío (email, intranet, reunión) para ajustar la extensión y el formato.",
      ],
    },
  ],

  workflow: {
    title: "Caso real: cómo un equipo de RRHH redujo a la mitad el tiempo de cribado inicial de candidaturas",
    before: "Antes: 6-8 horas revisando manualmente 150 CVs para una vacante, con notas dispersas y criterios aplicados de forma poco consistente entre revisores.",
    after: "Después: 3 horas, con criterios documentados de antemano y revisión humana de cada candidatura preseleccionada.",
    steps: [
      "Antes de abrir la vacante, el equipo define por escrito criterios objetivos de cribado con ayuda de un prompt estructurado, evitando criterios que puedan introducir sesgo.",
      "Se configura el ATS con esos criterios para ordenar (no descartar automáticamente) las candidaturas según su ajuste.",
      "Un miembro del equipo revisa manualmente el orden propuesto, prestando atención especial a candidaturas cerca del corte, para detectar posibles descartes injustos.",
      "Cada mes, se audita una muestra aleatoria de candidaturas descartadas para comprobar que no hay patrones de sesgo por género, edad o formación.",
      "Se usa ChatGPT para redactar los correos de respuesta (aceptación, descarte, siguiente fase) a partir de plantillas ya revisadas, personalizando cada uno antes de enviarlo.",
      "La decisión final de a quién entrevistar y a quién contratar sigue siendo siempre humana, basada en la revisión completa del perfil y no solo en el score automático.",
    ],
  },

  mistakes: [
    {
      mistake: "Dejar que una herramienta de scoring automático descarte candidaturas sin ninguna revisión humana.",
      solution: "Usa el scoring como orden de prioridad, no como filtro definitivo. Revisa periódicamente una muestra de candidaturas descartadas para verificar que no hay sesgos por género, edad, origen o formación, y documenta esa auditoría.",
    },
    {
      mistake: "Subir CVs o datos personales de candidatos reales a herramientas de IA de consumo general sin comprobar sus garantías de protección de datos.",
      solution: "Verifica las condiciones de tratamiento de datos de cualquier herramienta antes de usarla con información de candidatos, o trabaja con datos anonimizados/genéricos cuando solo necesitas redactar texto (ofertas, correos tipo, planes).",
    },
    {
      mistake: "Asumir que un criterio 'neutro' en apariencia (como 'nativo digital' o 'disponibilidad total') no introduce sesgo.",
      solution: "Revisa cada criterio de cribado preguntándote a quién podría excluir indirectamente (por edad, situación familiar, origen) y sustitúyelo por una medida objetiva y verificable siempre que sea posible.",
    },
    {
      mistake: "Copiar y enviar directamente un comunicado o una oferta de empleo generada por IA sin revisión de tono ni de contenido.",
      solution: "Usa el resultado de la IA como primer borrador: revisa el tono, la precisión de los datos y que cumpla la política interna y la normativa laboral antes de publicarlo o enviarlo.",
    },
  ],

  resources: [
    {
      label: "Debate: ¿cómo evitáis el sesgo algorítmico en selección?",
      href: "/debates",
      note: "Comparte tu experiencia y lee cómo otros equipos de RRHH auditan sus procesos de cribado con IA.",
    },
    {
      label: "IA para Sanitarios",
      href: "/guias/ia-para-sanitarios",
      note: "Si gestionas RRHH en un centro sanitario, esta guía te ayuda a entender las particularidades de ese sector.",
    },
    {
      label: "Explora prompts por categoría",
      href: "/?categoria=prompts",
      note: "Más prompts probados para otras tareas del día a día que puedes adaptar a tu departamento.",
    },
  ],

  faqs: [
    {
      q: "¿Puedo usar IA para descartar automáticamente candidatos?",
      a: "No deberías dejar que lo haga sin supervisión. La IA puede ayudarte a ordenar o puntuar candidaturas según criterios que tú defines, pero la decisión de descartar a una persona debe pasar siempre por revisión humana, precisamente para detectar y corregir posibles sesgos que el sistema haya aprendido de los datos con los que se entrenó.",
    },
    {
      q: "¿Es legal usar IA en procesos de selección en España?",
      a: "No hay una prohibición general, pero sí obligaciones: debes poder explicar los criterios usados, evitar discriminación directa o indirecta, y cumplir el RGPD en el tratamiento de los datos de los candidatos. Si automatizas decisiones que afectan significativamente a una persona, revisa también las garantías que exige la normativa sobre decisiones automatizadas.",
    },
    {
      q: "¿Cómo sé si mi herramienta de cribado tiene sesgos?",
      a: "Auditando periódicamente sus resultados: compara el perfil demográfico de las candidaturas que pasan el filtro frente a las que se descartan, y revisa manualmente una muestra de descartes para ver si hay patrones no justificados por los requisitos del puesto. Ninguna herramienta está libre de sesgo por defecto; la auditoría continua es tu responsabilidad, no algo que se resuelva una vez y se olvide.",
    },
    {
      q: "¿Puedo subir el CV de un candidato a ChatGPT para que me haga un resumen?",
      a: "Con precaución. Comprueba antes las condiciones de tratamiento de datos de la herramienta (si entrena modelos con tus conversaciones, dónde almacena los datos) y valora si necesitas el consentimiento del candidato para ese tratamiento. Si tienes dudas, es más seguro trabajar con datos anonimizados o usar un ATS con garantías específicas para RRHH.",
    },
    {
      q: "¿La IA puede sustituir la entrevista personal?",
      a: "No. Puede ayudarte a preparar preguntas, estructurar la evaluación o redactar el feedback posterior, pero la entrevista en sí —la capacidad de leer matices, hacer repreguntas y valorar el encaje humano con el equipo— sigue siendo una tarea que requiere criterio y presencia humana.",
    },
  ],
};
