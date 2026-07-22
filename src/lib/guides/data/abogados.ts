import type { GuideContent } from "@/lib/guides/types";

export const guide: GuideContent = {
  slug: "abogados",
  profession: "Abogados",
  icon: "⚖️",
  tagline: "Automatiza redacción y análisis legal",

  // ── SEO ──
  title: "IA para Abogados: herramientas para automatizar tu práctica legal",
  metaDescription:
    "Guía práctica de IA para abogados: herramientas, prompts y un caso real para redactar, resumir y revisar documentos legales más rápido.",
  keywords: [
    "IA para abogados",
    "inteligencia artificial derecho",
    "ChatGPT para abogados",
    "IA redacción legal",
    "herramientas IA despacho de abogados",
    "IA análisis de contratos",
    "IA jurisprudencia",
  ],
  updatedAt: "2026-07-21",

  // ── Cuerpo ──
  subtitle: "Herramientas y prompts para ahorrar horas en redacción, revisión e investigación jurídica.",
  intro: [
    "Si trabajas en un despacho, seguramente ya te has planteado si la IA te puede ahorrar horas en tareas que se repiten cada semana: resumir un contrato de cuarenta páginas, redactar un primer borrador de escrito, o buscar cómo se ha resuelto un caso parecido al tuyo. La respuesta corta es sí, pero con matices importantes que conviene tener claros desde el principio.",
    "La IA generativa es hoy una herramienta de productividad, no un sustituto de tu criterio jurídico. Te ayuda a llegar antes al primer borrador, a encontrar el hilo de un expediente largo o a explicar un concepto complejo a un cliente en lenguaje llano. Lo que no hace —y aquí está el matiz que marca la diferencia entre usarla bien o meterte en un lío— es garantizar que lo que genera sea jurídicamente correcto ni que respete la confidencialidad de tus clientes por defecto.",
    "Dos reglas de oro antes de tocar ninguna herramienta. Primera: nunca metas datos personales de clientes, expedientes reales o información confidencial en un chatbot de IA público sin haber anonimizado el texto o sin contar con base legal y consentimiento para tratar esos datos de esa forma; muchos despachos ya han tenido sustos por pegar contratos enteros con nombres y NIFs en ChatGPT. Segunda: la IA puede inventarse sentencias, artículos y referencias con total seguridad y estilo perfecto —lo que se conoce como alucinación—, así que toda cita, jurisprudencia o normativa que te dé debes verificarla siempre en fuentes oficiales (CENDOJ, BOE, bases de datos de tu colegio) antes de que llegue a un escrito o a un cliente. Con esas dos reglas interiorizadas, el resto es cuestión de encontrar el flujo de trabajo que te encaje.",
  ],

  tools: [
    {
      name: "ChatGPT",
      forWhat: "Redactar primeros borradores de escritos, correos y cláusulas, y explicar conceptos legales en lenguaje sencillo para clientes.",
      price: "Freemium (versión de pago desde ~20€/mes)",
      steps: [
        "Crea una cuenta y activa el modelo más avanzado disponible en el plan de pago para tareas complejas.",
        "Empieza cada conversación dando el contexto: tipo de asunto, jurisdicción y a quién va dirigido el texto.",
        "Pide siempre un borrador editable, nunca un texto para copiar y pegar tal cual en un escrito final.",
      ],
      url: "https://chat.openai.com",
      urlLabel: "chat.openai.com",
    },
    {
      name: "Claude",
      forWhat: "Analizar y resumir documentos largos (contratos, sentencias, expedientes) subiendo el PDF directamente, con buena fidelidad al texto original.",
      price: "Freemium (versión de pago desde ~18€/mes)",
      steps: [
        "Sube el PDF o Word del documento que quieres analizar en la propia conversación.",
        "Pide un resumen estructurado por cláusulas o hechos, o una lista de riesgos y puntos a negociar.",
        "Contrasta cada punto crítico del resumen con el documento original antes de actuar sobre él.",
      ],
      url: "https://claude.ai",
      urlLabel: "claude.ai",
    },
    {
      name: "NotebookLM",
      forWhat: "Centralizar los documentos de un caso (demandas, pruebas, jurisprudencia citada) y hacer preguntas que solo responde con base en esas fuentes.",
      price: "Gratuita",
      steps: [
        "Crea un cuaderno y sube todos los documentos relevantes del expediente.",
        "Haz preguntas concretas: 'qué plazos aparecen en estos documentos' o 'qué argumentos usa la contraparte'.",
        "Revisa las citas que enlaza a la fuente exacta del documento para verificar cada respuesta.",
      ],
      url: "https://notebooklm.google.com",
      urlLabel: "notebooklm.google.com",
    },
    {
      name: "Perplexity",
      forWhat: "Investigación rápida con fuentes citadas: localizar normativa reciente, noticias jurídicas o el estado de una reforma legal.",
      price: "Freemium (versión de pago desde ~20€/mes)",
      steps: [
        "Lanza la búsqueda como si fuera una pregunta a un compañero, no como palabras clave sueltas.",
        "Abre siempre las fuentes citadas al pie de la respuesta antes de dar el dato por bueno.",
        "Usa el modo 'Legal' o de investigación profunda si tu plan lo incluye, para respuestas más exhaustivas.",
      ],
      url: "https://www.perplexity.ai",
      urlLabel: "perplexity.ai",
    },
    {
      name: "Microsoft Copilot (Word/Outlook)",
      forWhat: "Integrar IA directamente en tu flujo diario de Word y Outlook: redactar correos, resumir hilos y mejorar la redacción de escritos sin cambiar de aplicación.",
      price: "De pago (add-on desde ~30€/mes por usuario, requiere Microsoft 365)",
      steps: [
        "Activa el complemento de Copilot en tu suscripción de Microsoft 365 empresarial.",
        "Desde Word, selecciona el texto y pide reescribirlo, resumirlo o adaptarlo a un tono más formal.",
        "En Outlook, usa 'resumir hilo' en cadenas largas de correo antes de responder a un cliente.",
      ],
      url: "https://copilot.microsoft.com",
      urlLabel: "copilot.microsoft.com",
    },
  ],

  prompts: [
    {
      title: "Resumen ejecutivo de un contrato",
      when: "Cuando recibes un contrato largo y necesitas una visión rápida antes de la reunión con el cliente.",
      prompt:
        "Actúa como abogado especializado en [ÁREA DEL DERECHO, ej. mercantil]. Te adjunto un contrato de [TIPO DE CONTRATO]. Hazme un resumen ejecutivo de máximo una página con: 1) partes y objeto del contrato, 2) obligaciones principales de cada parte, 3) plazos y penalizaciones clave, 4) cláusulas inusuales o que se salen de lo estándar en este tipo de contrato, 5) preguntas que le haría a mi cliente antes de aconsejarle. No inventes cláusulas que no estén en el texto; si algo no aparece, dilo explícitamente.",
      customize: [
        "El área del derecho y el tipo de contrato para ajustar el vocabulario y los riesgos típicos.",
        "El nivel de detalle del resumen (una página vs. informe completo).",
        "Si el destinatario final es el cliente, pide que use lenguaje llano sin tecnicismos.",
      ],
    },
    {
      title: "Primer borrador de un escrito",
      when: "Cuando necesitas arrancar con la estructura de una demanda, recurso o contestación.",
      prompt:
        "Redacta un primer borrador de [TIPO DE ESCRITO, ej. demanda de reclamación de cantidad] para el juzgado de [JURISDICCIÓN/PARTIDO JUDICIAL], con estos hechos: [RESUMEN DE HECHOS]. Estructura el escrito con los apartados habituales (encabezamiento, hechos numerados, fundamentos de derecho, súplica). En los fundamentos de derecho, deja marcadores del tipo [VERIFICAR ARTÍCULO/SENTENCIA] en lugar de citar normativa o jurisprudencia concreta, para que yo la revise y complete con fuentes verificadas.",
      customize: [
        "El tipo de escrito y la jurisdicción, que cambian la estructura formal exigida.",
        "El resumen de hechos, cuanto más detallado, mejor el borrador.",
        "Pide un tono más o menos combativo según la estrategia procesal.",
      ],
    },
    {
      title: "Explicar un concepto legal a un cliente",
      when: "Cuando un cliente sin formación jurídica necesita entender una situación o decisión antes de firmar algo.",
      prompt:
        "Explícame [CONCEPTO O SITUACIÓN LEGAL, ej. qué implica una cláusula de exclusividad] como si se lo tuviera que contar a un cliente sin ningún conocimiento jurídico. Usa un ejemplo cotidiano, evita tecnicismos innecesarios, y termina con 3 preguntas que ese cliente debería hacerme para tomar una decisión informada. Máximo 200 palabras.",
      customize: [
        "El concepto legal concreto y el contexto del caso del cliente.",
        "El tono: más cercano para un particular, más técnico si el cliente es una empresa con departamento legal.",
        "La longitud, según si va en un correo, una nota o una conversación en persona.",
      ],
    },
    {
      title: "Revisión de riesgos en una cláusula",
      when: "Cuando negocias un contrato y quieres detectar rápido qué cláusulas favorecen a la otra parte.",
      prompt:
        "Analiza esta cláusula de [TIPO DE CLÁUSULA, ej. limitación de responsabilidad] desde el punto de vista de mi cliente, que es [POSICIÓN DEL CLIENTE, ej. la parte proveedora]. Indica: 1) qué riesgos asume mi cliente tal y como está redactada, 2) si es una cláusula estándar del mercado o inusual, 3) una propuesta de redacción alternativa más equilibrada. Cláusula: [PEGAR TEXTO DE LA CLÁUSULA].",
      customize: [
        "El tipo de cláusula y la posición de tu cliente en el contrato.",
        "Si quieres una versión 'agresiva' o una versión 'conciliadora' de la propuesta alternativa.",
        "Asegúrate de anonimizar nombres de empresas y personas antes de pegar el texto.",
      ],
    },
  ],

  workflow: {
    title: "Caso real: cómo una abogada mercantilista redujo a la mitad el tiempo de due diligence",
    before: "Antes: 8-10 horas revisando manualmente cada contrato de una carpeta de due diligence, tomando notas sueltas y montando el informe final desde cero.",
    after: "Después: 4 horas, incluyendo la revisión humana de cada hallazgo antes de incluirlo en el informe.",
    steps: [
      "Sube cada contrato a NotebookLM organizados por carpeta del cliente, junto con la checklist interna de puntos a revisar.",
      "Pide un resumen por contrato siguiendo la checklist: partes, vigencia, cláusulas de cambio de control, penalizaciones y obligaciones pendientes.",
      "Pasa cada resumen por Claude pidiendo que señale contradicciones entre contratos o cláusulas atípicas frente al estándar del sector.",
      "Contrasta manualmente cada hallazgo marcado como 'atípico' o 'riesgo' contra el documento original antes de anotarlo.",
      "Usa ChatGPT para redactar el informe ejecutivo final a partir de las notas ya verificadas, con la estructura que pide el cliente.",
      "Revisión final propia de todo el informe antes de enviarlo, especialmente de cualquier cifra, plazo o cita normativa.",
    ],
  },

  mistakes: [
    {
      mistake: "Pegar contratos o expedientes reales con nombres, NIFs o datos de clientes en un chatbot de IA público sin anonimizar.",
      solution: "Sustituye nombres, identificadores y datos sensibles por etiquetas genéricas ([CLIENTE A], [NIF]) antes de pegar el texto, o usa una herramienta con garantías contractuales de confidencialidad para tu despacho.",
    },
    {
      mistake: "Dar por buena una cita de jurisprudencia, artículo de ley o referencia normativa generada por la IA sin comprobarla.",
      solution: "Verifica siempre cada cita en una fuente oficial (CENDOJ, BOE, base de datos de tu colegio) antes de incluirla en cualquier escrito o comunicación al cliente; trata cada referencia de la IA como una hipótesis a confirmar, no como un hecho.",
    },
    {
      mistake: "Copiar y pegar directamente el borrador de la IA en un escrito final sin revisión de fondo ni de forma.",
      solution: "Usa siempre el resultado de la IA como punto de partida: revisa la estructura, el tono, la estrategia procesal y cada afirmación de hecho antes de firmar el documento.",
    },
    {
      mistake: "Asumir que la IA entiende la jurisdicción o el procedimiento local sin decírselo explícitamente.",
      solution: "Especifica siempre en el prompt la jurisdicción, el tipo de procedimiento y la normativa aplicable; sin ese contexto, la IA tiende a mezclar tradiciones jurídicas distintas (muy notable con modelos entrenados sobre todo con derecho anglosajón).",
    },
  ],

  resources: [
    {
      label: "Debate: ¿cómo usáis la IA en despachos pequeños?",
      href: "/debates",
      note: "Comparte tu experiencia y lee cómo otros profesionales del derecho están integrando IA en su día a día, con sus propios límites y precauciones.",
    },
    {
      label: "IA para Desarrolladores",
      href: "/guias/ia-para-desarrolladores",
      note: "Si tu despacho tiene una web o herramientas internas, esta guía te ayuda a hablar el mismo idioma que quien te las mantiene.",
    },
    {
      label: "Explora prompts por categoría",
      href: "/?categoria=prompts",
      note: "Más prompts probados para otras tareas del día a día, no solo legales, que puedes adaptar a tu despacho.",
    },
  ],

  faqs: [
    {
      q: "¿Puedo usar ChatGPT o Claude con datos reales de mis clientes?",
      a: "No sin tomar precauciones. Como norma general, anonimiza cualquier dato personal o confidencial antes de pegarlo en una herramienta de IA de consumo general, y comprueba las condiciones de tratamiento de datos de la herramienta (si entrena sus modelos con tus conversaciones, si tiene servidores en la UE, etc.). Para casos sensibles, valora herramientas empresariales con acuerdos de confidencialidad específicos para despachos.",
    },
    {
      q: "¿La IA puede sustituir a un abogado en la redacción de contratos?",
      a: "No. Puede generar un primer borrador útil y ahorrarte tiempo de redacción, pero no conoce el contexto completo del caso, no asume responsabilidad profesional y puede cometer errores de fondo. El criterio jurídico, la estrategia y la revisión final siguen siendo tuyos.",
    },
    {
      q: "¿Por qué la IA a veces se inventa sentencias o artículos que no existen?",
      a: "Es lo que se conoce como 'alucinación': el modelo genera texto que suena plausible y con el formato correcto de una cita legal, pero sin garantía de que exista de verdad. Ocurre más cuanto más específica o reciente es la referencia que pides. La única forma fiable de evitarlo es verificar siempre cada cita en una fuente oficial antes de usarla.",
    },
    {
      q: "¿Qué diferencia hay entre usar ChatGPT y una herramienta legal especializada de IA?",
      a: "Las herramientas legales especializadas suelen entrenar o conectar sus modelos con bases de datos jurisdiccionales concretas y ofrecer citas verificables directamente enlazadas a la fuente, mientras que un chatbot generalista como ChatGPT no tiene esa garantía y depende de lo que 'recuerde' de su entrenamiento. Para investigación jurídica seria, prioriza herramientas que citen la fuente exacta.",
    },
    {
      q: "¿Es legal usar IA para redactar escritos que se presentan en juzgado?",
      a: "No hay una prohibición general de usar IA como herramienta de apoyo, pero la responsabilidad final del contenido, la veracidad de las citas y el cumplimiento de las normas procesales sigue siendo del abogado que firma el escrito. Varios tribunales ya han sancionado a letrados por presentar citas inventadas por IA sin verificar, así que la verificación previa no es opcional.",
    },
  ],
};
