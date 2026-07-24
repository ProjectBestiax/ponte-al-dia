import type { GuideContent } from "@/lib/guides/types";

export const guide: GuideContent = {
  slug: "gestores",
  profession: "Gestores y asesorías",
  icon: "🧾",
  tagline: "Automatiza informes, consultas normativas y atención a clientes",

  title: "IA para Gestores y Asesorías: automatiza informes y consultas normativas",
  metaDescription:
    "Guía práctica de IA para gestorías y asesorías: herramientas reales, prompts copiables y un flujo de trabajo que protege el dato fiscal del cliente y el secreto profesional.",
  keywords: [
    "ia para gestores",
    "ia para asesorias",
    "ia gestoria administrativa",
    "notebooklm normativa fiscal",
    "chatgpt asesoria fiscal",
    "automatizacion documental gestoria",
    "ia y rgpd asesorias",
    "ia consultas normativas",
  ],
  updatedAt: "2026-07-24",

  subtitle:
    "Herramientas y flujos reales para ahorrar horas en informes, consultas normativas y atención a clientes, sin poner en riesgo el dato fiscal ni el secreto profesional.",
  intro: [
    "Si llevas una gestoría o una asesoría, sabes que buena parte del trabajo no es la parte 'difícil' del oficio (interpretar una norma, asesorar a un cliente), sino el volumen de tareas repetitivas alrededor: redactar el mismo tipo de informe una y otra vez, buscar en qué artículo exacto de una ley se regula algo, resumir una circular de veinte páginas o responder la misma duda de un cliente por quinta vez esta semana. Ahí es exactamente donde la IA generativa aporta más y con menos riesgo: en la redacción, el resumen y la búsqueda, no en la decisión final sobre el caso de un cliente.",
    "Esta guía está pensada para gestores, asesores fiscales, laborales y contables que quieren usar la IA como un asistente de redacción e investigación, no como quien firma o decide. Vas a encontrar herramientas concretas que existen y funcionan hoy, prompts que puedes copiar y adaptar, un caso de flujo de trabajo real y los errores más comunes, dos de ellos especialmente serios en esta profesión: subir datos identificativos de clientes a herramientas públicas de IA, y confiar en la IA como si fuera una fuente normativa fiable en lugar de un punto de partida que hay que verificar.",
    "Una advertencia antes de empezar, y es la más importante de esta guía: nunca subas datos fiscales, contables o identificativos de un cliente (NIF, nombre, cifras reales de su declaración, datos de nómina) a una herramienta de IA pública. Es un problema doble: de RGPD, porque esos datos pueden acabar usándose para entrenar modelos o quedar expuestos, y de secreto profesional, porque como gestor o asesor tienes una obligación de confidencialidad que no desaparece porque la herramienta sea muy útil. Usa siempre datos anonimizados o ficticios cuando pidas ayuda a una IA general, y reserva las herramientas con garantías empresariales (contratos de tratamiento de datos, entornos privados) para cualquier caso que use información real de un cliente.",
  ],

  tools: [
    {
      name: "ChatGPT",
      forWhat:
        "Redacción y estructuración de informes, cartas a clientes, correos de reclamación, resúmenes de circulares y borradores de escritos administrativos, siempre con datos anonimizados o genéricos.",
      price: "Freemium",
      steps: [
        "Abre chat.openai.com y describe el tipo de documento que necesitas y su contexto, sin incluir datos identificativos reales.",
        "Pide una estructura por apartados (antecedentes, análisis, conclusión) en lugar de un texto corrido.",
        "Sustituye tú mismo, después, las variables anonimizadas por los datos reales del cliente antes de enviar el documento.",
      ],
      url: "https://chat.openai.com",
      urlLabel: "chat.openai.com",
    },
    {
      name: "Claude",
      forWhat:
        "Análisis y resumen de documentos largos (circulares, convenios colectivos, normativa sectorial) y redacción de informes técnicos con un tono formal adaptado al destinatario, cliente o administración.",
      price: "Freemium",
      steps: [
        "Abre claude.ai y pega el texto de la norma o circular que necesitas resumir (evita incluir datos de clientes en el mismo prompt).",
        "Pide un resumen estructurado con los puntos que afectan directamente a tu tipo de cliente habitual.",
        "Contrasta cualquier cifra, plazo o artículo citado con el texto oficial antes de trasladarlo a un cliente.",
      ],
      url: "https://claude.ai",
      urlLabel: "claude.ai",
    },
    {
      name: "NotebookLM",
      forWhat:
        "Digerir normativa extensa (leyes, reglamentos, guías de la Agencia Tributaria o la Seguridad Social) subiendo los documentos oficiales como fuente, para luego hacer preguntas y obtener respuestas ancladas solo a esos textos, con referencia a la fuente concreta.",
      price: "Gratuita",
      steps: [
        "Entra en notebooklm.google.com y crea un cuaderno nuevo.",
        "Sube los PDF o textos oficiales de la normativa que quieras consultar (BOE, guías oficiales, convenios).",
        "Haz preguntas sobre esos documentos: NotebookLM cita la fuente exacta dentro del propio documento, lo que facilita verificar la respuesta.",
      ],
      url: "https://notebooklm.google.com",
      urlLabel: "notebooklm.google.com",
    },
    {
      name: "Herramientas de automatización documental",
      forWhat:
        "Plataformas de automatización (tipo Make o Zapier) conectadas a IA para clasificar y extraer datos de facturas, generar borradores de documentos recurrentes o enrutar consultas de clientes según su tipo, reduciendo el trabajo manual repetitivo del despacho.",
      price: "Freemium (planes de pago según volumen de automatizaciones)",
      steps: [
        "Crea una cuenta en la plataforma de automatización elegida y conecta las herramientas que ya usa el despacho (correo, hoja de cálculo, gestor documental).",
        "Diseña un flujo simple primero (por ejemplo, clasificar correos entrantes por tipo de consulta) antes de automatizar procesos que toquen datos sensibles.",
        "Revisa periódicamente los flujos automatizados: un error de clasificación con datos de un cliente puede tener consecuencias de confidencialidad.",
      ],
      url: "https://www.make.com",
      urlLabel: "make.com",
    },
    {
      name: "ChatGPT Team / Claude for Work (entornos empresariales)",
      forWhat:
        "Versiones empresariales de estas mismas herramientas con contratos de tratamiento de datos y garantías de que el contenido no se usa para entrenar modelos, lo que las hace más adecuadas para trabajar con información algo más sensible que en la versión gratuita (aunque nunca sustituyen el buen criterio de qué se sube).",
      price: "De pago (planes por usuario/mes)",
      steps: [
        "Contrata el plan empresarial de la herramienta que ya use el despacho, revisando su contrato de tratamiento de datos (DPA).",
        "Define internamente qué tipo de información puede subirse incluso en el plan empresarial y cuál sigue estando prohibida.",
        "Forma al equipo del despacho en estas reglas antes de dar acceso generalizado.",
      ],
      url: "https://openai.com/chatgpt/team",
      urlLabel: "openai.com/chatgpt/team",
    },
  ],

  prompts: [
    {
      title: "Resumen de una circular o novedad normativa",
      when: "Cuando llega una circular, ley o resolución nueva y necesitas entender rápido qué cambia y a quién afecta.",
      prompt:
        "Resume el siguiente texto normativo en español de España, dirigido a un gestor que necesita explicárselo después a clientes de [TIPO DE CLIENTE, ej. autónomos y pymes]. Estructura la respuesta en: 1) qué cambia, 2) desde cuándo aplica, 3) a quién afecta, 4) qué debe hacer el cliente. Texto: [PEGA AQUÍ EL TEXTO OFICIAL DE LA NORMA O CIRCULAR].",
      customize: [
        "Pega siempre el texto oficial completo, no un resumen de terceros, para reducir el riesgo de que la IA invente contenido.",
        "Verifica en la fuente oficial (BOE, Agencia Tributaria, Seguridad Social) cualquier fecha o plazo antes de comunicarlo a un cliente.",
      ],
    },
    {
      title: "Borrador de informe o carta a cliente (con datos anonimizados)",
      when: "Para preparar un informe o una comunicación recurrente sin partir de cero cada vez.",
      prompt:
        "Redacta un borrador de [TIPO DE DOCUMENTO, ej. informe de situación fiscal / carta de reclamación] para un cliente tipo [DESCRIPCIÓN GENÉRICA, ej. autónomo en régimen de estimación directa]. Situación: [DESCRIBE LA SITUACIÓN SIN DATOS IDENTIFICATIVOS REALES, usa cifras de ejemplo]. Tono formal, en español de España, con un cierre que invite al cliente a resolver dudas contigo.",
      customize: [
        "Nunca incluyas NIF, nombre real, cifras exactas de la declaración o datos de nómina del cliente en el prompt.",
        "Sustituye las variables anonimizadas por los datos reales solo al final, fuera de la herramienta de IA, directamente en el documento.",
      ],
    },
    {
      title: "Preparar respuesta a una consulta frecuente de clientes",
      when: "Cuando varios clientes preguntan lo mismo (un cambio de IVA, un plazo, un nuevo requisito) y quieres una respuesta clara y reutilizable.",
      prompt:
        "Escribe una respuesta clara y breve, en español de España y sin jerga excesiva, para explicar a un cliente sin conocimientos fiscales/legales [TEMA, ej. 'por qué ha cambiado el tipo de retención en su factura']. Máximo 150 palabras, tono cercano pero profesional, terminando con una invitación a contactar si tiene dudas.",
      customize: [
        "Ajusta [TEMA] a la consulta concreta y revisa que la explicación sea correcta antes de reutilizarla con distintos clientes.",
        "Guarda la versión revisada como plantilla propia para no tener que regenerarla cada vez.",
      ],
    },
    {
      title: "Checklist de verificación normativa antes de responder",
      when: "Antes de dar una respuesta definitiva a un cliente sobre un tema normativo, como control de calidad interno.",
      prompt:
        "Actúa como un asistente de control de calidad para un gestor. Dado este borrador de respuesta a un cliente sobre [TEMA NORMATIVO], señala qué afirmaciones incluyen cifras, plazos o referencias a artículos concretos que deberían verificarse en la fuente oficial antes de enviarse. No corrijas el contenido, solo señala qué revisar. Borrador: [PEGA TU BORRADOR].",
      customize: [
        "Usa esto como un segundo filtro, no como sustituto de tu propia revisión profesional.",
        "Verifica cada punto señalado en la fuente oficial correspondiente antes de dar la respuesta por buena.",
      ],
    },
  ],

  workflow: {
    title: "Caso real: cómo una asesoría pequeña redujo el tiempo de respuesta a consultas de clientes",
    before:
      "Antes: 3-4 horas semanales dedicadas a responder consultas repetidas de clientes por email, redactando cada respuesta desde cero, más el tiempo de buscar en la normativa el dato exacto para cada caso.",
    after:
      "Después: 1 hora semanal, usando plantillas de respuesta generadas y revisadas una vez con IA, y NotebookLM para resolver dudas normativas puntuales directamente sobre los textos oficiales ya cargados.",
    steps: [
      "Sube a NotebookLM los documentos normativos que se consultan con más frecuencia (leyes, guías oficiales, convenios) para tener un cuaderno de referencia siempre disponible.",
      "Identifica las 5-6 consultas de clientes que se repiten cada mes y genera con ChatGPT o Claude un borrador de respuesta para cada una, sin datos reales de ningún cliente.",
      "Revisa cada borrador contrastando cifras y plazos en NotebookLM o en la fuente oficial, y lo guarda como plantilla aprobada del despacho.",
      "Cuando llega una consulta similar, adapta la plantilla con los datos reales del cliente directamente en el documento final, nunca dentro de la herramienta de IA.",
      "Revisa trimestralmente las plantillas para actualizarlas si ha cambiado la normativa correspondiente.",
    ],
  },

  mistakes: [
    {
      mistake:
        "Subir a una herramienta de IA pública datos fiscales, contables o identificativos reales de un cliente (NIF, nombre, cifras exactas de su declaración, datos de nómina) para pedir ayuda a redactar un informe o resolver una duda.",
      solution:
        "Nunca introduzcas datos identificativos o cifras reales de un cliente en una herramienta de IA pública. Trabaja siempre con datos anonimizados o ficticios en el prompt, y sustituye por los datos reales solo al final, directamente en el documento, fuera de la herramienta. Si necesitas trabajar con datos algo más sensibles de forma recurrente, valora un plan empresarial con contrato de tratamiento de datos.",
    },
    {
      mistake:
        "Confiar en una respuesta de IA sobre un artículo de ley, un plazo o una cifra normativa sin verificarla en la fuente oficial, y trasladarla directamente a un cliente.",
      solution:
        "La IA puede alucinar artículos, plazos y cifras con total seguridad aparente, incluso citando una norma que no dice eso. Verifica siempre cualquier dato normativo concreto en el BOE, la Agencia Tributaria, la Seguridad Social o el organismo oficial correspondiente antes de comunicarlo.",
    },
    {
      mistake:
        "Usar el mismo prompt genérico para todos los clientes sin adaptar el contexto real de cada caso, generando respuestas que suenan correctas pero no encajan con la situación específica del cliente.",
      solution:
        "Usa la IA para generar la estructura y el borrador inicial, pero ajusta siempre el contenido a la situación concreta del cliente antes de enviarlo, igual que harías con una plantilla de Word.",
    },
    {
      mistake:
        "Automatizar procesos documentales que tocan datos sensibles (facturas, nóminas, declaraciones) sin supervisión humana periódica, confiando en que la automatización funcionará siempre igual de bien.",
      solution:
        "Revisa periódicamente cualquier flujo automatizado que procese datos de clientes. Un error de clasificación o extracción no detectado puede tener consecuencias tanto de confidencialidad como de exactitud del dato fiscal o contable.",
    },
  ],

  resources: [
    {
      label: "Debates sobre IA en gestorías y asesorías",
      href: "/debates",
      note: "Únete a la conversación con otros gestores y asesores sobre cómo protegen el dato del cliente mientras usan IA para ganar tiempo.",
    },
    {
      label: "IA para Arquitectos",
      href: "/guias/ia-para-arquitectos",
      note: "Si llevas la parte administrativa o fiscal de estudios de arquitectura, esta guía te ayuda a entender cómo usan la IA del otro lado.",
    },
    {
      label: "Prompts de IA seleccionados",
      href: "/?categoria=prompts",
      note: "Explora más prompts de IA curados y comentados por la comunidad, más allá de los cuatro de esta guía.",
    },
  ],

  faqs: [
    {
      q: "¿Puedo subir la declaración de un cliente a ChatGPT para que me ayude a revisarla?",
      a: "No con datos reales identificativos. Subir el NIF, nombre o cifras exactas de un cliente a una herramienta de IA pública es un riesgo de RGPD y de secreto profesional. Si necesitas ayuda de la IA, sustituye esos datos por ejemplos genéricos y trabaja con los datos reales solo fuera de la herramienta.",
    },
    {
      q: "¿Es fiable preguntarle a una IA en qué artículo de una ley se regula algo?",
      a: "Es un buen punto de partida, pero no una fuente fiable por sí sola. Las IA generativas pueden citar artículos, leyes o plazos que no existen o que están desactualizados, con total seguridad aparente. Verifica siempre la cita en el texto oficial antes de usarla en una respuesta a un cliente.",
    },
    {
      q: "¿Qué diferencia hay entre usar ChatGPT gratuito y una versión empresarial para el despacho?",
      a: "Las versiones empresariales suelen incluir un contrato de tratamiento de datos y la garantía de que el contenido no se usa para entrenar el modelo, lo que reduce (no elimina) el riesgo al trabajar con información algo más sensible. Aun así, la norma general del despacho debería seguir siendo no subir datos identificativos reales de clientes a ninguna herramienta de IA generativa.",
    },
    {
      q: "¿Puede la IA sustituir mi criterio profesional al asesorar a un cliente?",
      a: "No. La IA puede redactar, resumir y estructurar, pero la interpretación normativa aplicada al caso concreto de un cliente, y la responsabilidad de esa decisión, siguen siendo tuyas como profesional. Trata cualquier respuesta de IA como un borrador de apoyo, nunca como el asesoramiento final.",
    },
    {
      q: "¿Sirve NotebookLM para tener siempre a mano la normativa que más consulto?",
      a: "Sí, es uno de sus puntos fuertes: subes los textos oficiales (leyes, guías, convenios) como fuente y luego preguntas sobre ellos, con la ventaja de que cita el punto exacto del documento de donde saca la respuesta, lo que facilita verificarla rápido.",
    },
  ],
};
