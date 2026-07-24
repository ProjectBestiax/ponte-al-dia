import type { GuideContent } from "@/lib/guides/types";

export const guide: GuideContent = {
  slug: "comerciales",
  profession: "Comerciales",
  icon: "🤝",
  tagline: "Prospección, propuestas y seguimiento de clientes más ágil",

  // ── SEO ──
  title: "IA para Comerciales: prospección, propuestas y seguimiento más rápido",
  metaDescription:
    "Guía práctica de IA para comerciales: herramientas reales, prompts copiables para prospectar y redactar propuestas, y un caso real de ahorro de tiempo.",
  keywords: [
    "ia para comerciales",
    "ia para ventas",
    "crm con ia",
    "prospección con ia",
    "propuestas comerciales con ia",
    "ia para vendedores",
    "automatizar seguimiento de clientes",
  ],
  updatedAt: "2026-07-24",

  // ── Cuerpo ──
  subtitle:
    "Cómo usar IA para investigar cuentas antes de llamar, escribir emails que no suenan a plantilla y montar propuestas sin empezar de cero cada vez.",
  intro: [
    "Vender sigue siendo un oficio de personas: la confianza se construye en la conversación, no en un email automático. Pero antes y después de esa conversación hay un montón de trabajo que no aporta valor por sí mismo — investigar la cuenta, redactar el seguimiento, montar la propuesta, actualizar el CRM — y es justo ahí donde la IA quita horas sin quitarte el mérito de la venta.",
    "El comercial que usa bien estas herramientas no manda más emails genéricos, manda menos pero mejor dirigidos: llega a cada llamada con más contexto del cliente, escribe el seguimiento en dos minutos en vez de veinte, y dedica el tiempo que le sobra a lo que de verdad mueve una venta, que es hablar con la persona correcta en el momento correcto.",
    "Esta guía reúne 5 herramientas reales que ya usan equipos comerciales, prompts específicos para prospección y propuestas, y un caso concreto de cómo se reduce el tiempo de preparación de una reunión sin perder el toque personal que cierra tratos.",
  ],

  tools: [
    {
      name: "ChatGPT",
      forWhat:
        "Redactar emails de prospección, seguimientos y propuestas comerciales a partir de notas sueltas, y adaptar el mismo mensaje a distintos interlocutores.",
      price: "Freemium (versión de pago desde ~20€/mes)",
      steps: [
        "Crea un proyecto por cliente o cuenta y pega ahí notas de reuniones, el sector y lo que ya sabes de su necesidad.",
        "Pide siempre 2-3 variantes de un email antes de elegir una, para no quedarte con la primera versión genérica.",
        "Revisa cualquier dato o cifra sobre el cliente que la IA mencione: puede inventarlos si no se los has dado tú.",
      ],
      url: "https://chat.openai.com",
      urlLabel: "chat.openai.com",
    },
    {
      name: "Claude",
      forWhat:
        "Redactar propuestas comerciales largas y coherentes a partir de un briefing, y resumir el histórico de una cuenta antes de una reunión importante.",
      price: "Freemium (versión de pago desde ~20€/mes)",
      steps: [
        "Sube el histórico de emails o notas de la cuenta como archivo antes de pedir el resumen o la propuesta.",
        "Pide que estructure la propuesta en secciones (situación actual, solución, precio, siguientes pasos) en vez de un bloque único.",
        "Pide un resumen de 5 puntos de la cuenta antes de una llamada, no el histórico completo otra vez.",
      ],
      url: "https://claude.ai",
      urlLabel: "claude.ai",
    },
    {
      name: "HubSpot (funciones de IA del CRM)",
      forWhat:
        "Priorizar qué leads tienen más probabilidad de cerrar, generar resúmenes automáticos de llamadas y sugerir el siguiente paso de cada oportunidad.",
      price: "Freemium (planes de pago desde ~20€/mes por usuario)",
      steps: [
        "Activa el scoring de leads con IA en tu pipeline para priorizar a quién llamar primero cada día.",
        "Usa el resumen automático de llamadas o reuniones para no perder tiempo escribiendo notas a mano.",
        "Revisa las sugerencias de siguiente paso que da la IA, pero decide tú si encajan con el criterio real de esa cuenta.",
      ],
      url: "https://www.hubspot.com",
      urlLabel: "hubspot.com",
    },
    {
      name: "Perplexity",
      forWhat:
        "Investigar una cuenta o empresa antes de una llamada: noticias recientes, movimientos del sector, cambios de dirección o financiación.",
      price: "Freemium (versión Pro desde ~20€/mes)",
      steps: [
        "Busca el nombre de la empresa junto a 'noticias recientes' o 'ronda de financiación' antes de cualquier primera llamada.",
        "Pregunta directamente por el nombre del interlocutor y su cargo para tener contexto de con quién vas a hablar.",
        "Revisa siempre las fuentes citadas antes de mencionar un dato en la llamada o el email.",
      ],
      url: "https://www.perplexity.ai",
      urlLabel: "perplexity.ai",
    },
    {
      name: "PandaDoc",
      forWhat:
        "Generar y enviar propuestas y presupuestos con plantillas reutilizables, firma electrónica y seguimiento de cuándo el cliente las abre.",
      price: "Freemium limitado (planes de pago desde ~35€/mes)",
      steps: [
        "Sube tu propuesta tipo como plantilla base y deja los huecos de precio y alcance como variables.",
        "Genera el borrador de la propuesta con IA a partir del brief del cliente y ajusta manualmente precio y condiciones.",
        "Activa las notificaciones de apertura para saber cuándo llamar de seguimiento, justo después de que la hayan leído.",
      ],
      url: "https://www.pandadoc.com",
      urlLabel: "pandadoc.com",
    },
  ],

  prompts: [
    {
      title: "Email de prospección en frío personalizado",
      when: "Al contactar por primera vez a un lead que no te conoce, para evitar que suene a plantilla masiva.",
      prompt:
        "Actúa como comercial de [TU EMPRESA/PRODUCTO], que ofrece [DESCRIPCIÓN BREVE DEL PRODUCTO O SERVICIO]. Voy a escribir a [NOMBRE DEL CONTACTO], [CARGO] en [EMPRESA], que probablemente tiene el problema de [PROBLEMA O NECESIDAD DEL SECTOR]. Escribe un email de primer contacto de máximo 90 palabras que: mencione algo concreto de su empresa o sector (no genérico), conecte con ese problema, y termine con una pregunta simple para conseguir respuesta, no con una petición de reunión directa.",
      customize: [
        "Aporta un dato real y reciente de la empresa (noticia, cargo nuevo, expansión) para que no suene genérico.",
        "Cambia el PROBLEMA según el sector concreto del lead, no uses el mismo dolor para todos.",
        "Ajusta el cierre: a veces una pregunta funciona mejor que pedir una llamada directamente.",
      ],
    },
    {
      title: "Seguimiento después de una llamada o reunión",
      when: "Justo después de una llamada o demo, para enviar el resumen y siguiente paso sin perder el momentum.",
      prompt:
        "Acabo de tener una llamada con [NOMBRE Y CARGO DEL CONTACTO] sobre [PRODUCTO/SERVICIO]. Estos son mis apuntes de la conversación: [PEGAR NOTAS: dolores mencionados, objeciones, interés mostrado]. Escribe un email de seguimiento de máximo 120 palabras que resuma los puntos clave que hablamos, confirme el siguiente paso acordado ([SIGUIENTE PASO: enviar propuesta / agendar demo / hablar con otro departamento]) y proponga una fecha concreta. Tono cercano, sin sonar a plantilla automática.",
      customize: [
        "Pega tus notas reales de la llamada, incluidas las objeciones, para que el email las reconozca en vez de ignorarlas.",
        "Cambia el SIGUIENTE PASO según lo acordado exactamente en la reunión, no un genérico 'seguimos en contacto'.",
        "Añade una referencia personal de la conversación (algo que dijo el interlocutor) para que no parezca generado.",
      ],
    },
    {
      title: "Estructura de propuesta comercial a medida",
      when: "Al preparar una propuesta o presupuesto para un cliente después de entender su necesidad.",
      prompt:
        "Necesito estructurar una propuesta comercial para [NOMBRE DEL CLIENTE]. Su situación actual es [DESCRIPCIÓN DEL PROBLEMA O SITUACIÓN ACTUAL]. Nuestra solución es [DESCRIPCIÓN DEL PRODUCTO/SERVICIO Y ALCANCE]. El presupuesto aproximado es [RANGO DE PRECIO]. Genera la estructura de la propuesta con estas secciones: resumen de la situación actual, solución propuesta, qué incluye y qué no, precio y condiciones, y siguientes pasos. Usa un lenguaje claro, sin jerga técnica innecesaria, pensado para que lo lea también alguien no técnico.",
      customize: [
        "Aporta el ALCANCE real y específico del acuerdo, evita que la IA genere alcance genérico que luego no coincide con lo pactado.",
        "Ajusta el tono según quién lo va a leer: no es lo mismo un director financiero que un responsable de operaciones.",
        "Revisa siempre el precio y las condiciones finales a mano, nunca dejes que la IA calcule o proponga cifras.",
      ],
    },
    {
      title: "Investigar una cuenta antes de una reunión importante",
      when: "Antes de una llamada o reunión con un cliente potencial de peso, para llegar con contexto real.",
      prompt:
        "Necesito preparar una reunión con [NOMBRE DE LA EMPRESA], del sector [SECTOR]. Dame un resumen de: novedades recientes de la empresa (últimos 6 meses), posibles retos o prioridades del sector en este momento, y 3 preguntas inteligentes que podría hacer en la reunión para entender mejor su situación sin sonar a guion de venta. Cita las fuentes de cualquier dato que menciones.",
      customize: [
        "Usa esta consulta en una herramienta con acceso a web actualizado (no un modelo sin navegación), para tener datos recientes de verdad.",
        "Verifica cada fuente citada antes de mencionar el dato en la reunión.",
        "Adapta las preguntas sugeridas al cargo concreto del interlocutor, no son iguales para un CEO que para un responsable de compras.",
      ],
    },
  ],

  workflow: {
    title: "Caso real: cómo un comercial redujo de 45 a 10 minutos la preparación de cada reunión",
    before: "45 minutos por reunión buscando información de la empresa, repasando el histórico del CRM y redactando el email de seguimiento posterior.",
    after: "10 minutos: investigación asistida por IA antes de la llamada + seguimiento generado justo después, con revisión rápida.",
    steps: [
      "Antes de la llamada, se pide a una herramienta con acceso a web un resumen de novedades de la empresa y 3 preguntas para la reunión.",
      "Se revisa en el CRM el resumen automático de interacciones previas con esa cuenta (llamadas, emails, propuestas anteriores).",
      "Durante la llamada, se toman notas breves de dolores, objeciones y el siguiente paso acordado.",
      "Justo después, se pega esas notas en el prompt de seguimiento para generar el borrador del email en menos de un minuto.",
      "El comercial revisa el borrador, añade un detalle personal de la conversación y lo envía el mismo día, no al día siguiente.",
      "El tiempo ahorrado se dedica a hacer más llamadas de prospección o preparar mejor las cuentas de mayor valor.",
    ],
  },

  mistakes: [
    {
      mistake: "Enviar emails generados por IA sin editar, que suenan robóticos o genéricos para el cliente.",
      solution:
        "Usa siempre el borrador de la IA como punto de partida, no como texto final: añade un detalle concreto de esa conversación o esa empresa antes de enviarlo.",
    },
    {
      mistake: "Usar el mismo prompt y el mismo mensaje para leads de sectores y necesidades totalmente distintos.",
      solution:
        "Dale a la IA el contexto específico de cada cuenta (sector, cargo, problema concreto) antes de pedir el email o la propuesta; un mensaje genérico se nota y convierte peor.",
    },
    {
      mistake: "Dar por buenos datos sobre una empresa o su facturación que la IA menciona sin fuente verificable.",
      solution:
        "Pide siempre la fuente de cualquier dato de la empresa y verifícala antes de mencionarla en una llamada o incluirla en una propuesta.",
    },
    {
      mistake: "Dejar que la IA calcule o sugiera precios y condiciones finales de una propuesta.",
      solution:
        "Usa la IA solo para estructurar y redactar la propuesta; el precio, los descuentos y las condiciones los decides tú siempre, a mano.",
    },
  ],

  resources: [
    {
      label: "Debates sobre IA y ventas",
      href: "/debates",
      note: "Comparte cómo estás usando la IA en prospección y propuestas y aprende de la experiencia de otros comerciales.",
    },
    {
      label: "IA para Hosteleros",
      href: "/guias/ia-para-hosteleros",
      note: "Si tu negocio combina ventas con atención al cliente presencial, esta guía te puede interesar también.",
    },
    {
      label: "Explora prompts por categoría",
      href: "/?categoria=prompts",
      note: "Más prompts probados para email, negociación y seguimiento comercial.",
    },
  ],

  faqs: [
    {
      q: "¿Puede la IA sustituir a un comercial en la negociación con el cliente?",
      a: "No. La IA agiliza la preparación y la redacción, pero la negociación real —leer al interlocutor, ceder o mantenerte firme, generar confianza— sigue siendo un trabajo humano que ninguna herramienta hace por ti.",
    },
    {
      q: "¿Es seguro pegar datos de clientes o del CRM en ChatGPT o Claude?",
      a: "Evita pegar datos identificables sin anonimizar (nombres completos, importes exactos de contratos, datos de contacto) en herramientas generalistas. Revisa si tu plan de empresa excluye tus datos del entrenamiento antes de usarlo con información sensible.",
    },
    {
      q: "¿Cómo evito que mis emails de prospección suenen todos iguales?",
      a: "Dale a la IA un dato concreto y reciente de cada empresa (noticia, cambio de cargo, sector) en vez de pedir un email genérico; y añade siempre un detalle personal antes de enviarlo.",
    },
    {
      q: "¿Qué CRM con IA conviene para un equipo comercial pequeño?",
      a: "HubSpot tiene un plan gratuito con funciones básicas de IA suficientes para empezar; si el equipo crece, los planes de pago añaden scoring de leads y resúmenes automáticos que ahorran más tiempo.",
    },
    {
      q: "¿Puede la IA ayudarme a saber cuándo un lead está listo para comprar?",
      a: "Puede darte señales (apertura de emails, tiempo en el pipeline, interacciones) a través del scoring del CRM, pero es una pista, no una certeza: la decisión de cuándo insistir o esperar sigue dependiendo de tu criterio.",
    },
  ],
};
