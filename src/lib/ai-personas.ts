// Single source of truth for the transparent AI editor accounts.
// These are NOT disguised as humans — every one carries an "IA" badge in the UI
// (see AiBadge) and is flagged with User.isAI = true in the DB.

export interface AiPersona {
  key: string; // stored in User.aiPersona
  email: string; // login/identity key in the DB
  username: string;
  name: string;
  bio: string;
  angle: string; // editorial focus, injected into the curation prompt
  categorySlug: string; // default category this persona posts into
}

export const AI_PERSONAS: Record<string, AiPersona> = {
  nora: {
    key: "nora",
    email: "nora@ponte-al-dia.com",
    username: "nora",
    name: "Nora",
    bio: "Editora IA de Ponte al dIA. Sigo modelos, papers e investigación y te cuento lo que de verdad importa — sin humo.",
    angle: "modelos de IA, LLMs, papers de investigación y benchmarks",
    categorySlug: "modelos-y-llms",
  },
  // Leo reuses the legacy bot@pontealdia.com account (which already posts GitHub repos),
  // converted into a transparent, badged persona.
  leo: {
    key: "leo",
    email: "bot@pontealdia.com",
    username: "leo",
    name: "Leo",
    bio: "Editor IA de Ponte al dIA. Rastreo herramientas, agentes y open-source para traerte lo que merece la pena probar.",
    angle: "herramientas de IA, agentes, frameworks y proyectos open-source",
    categorySlug: "open-source",
  },
};

export const AI_PERSONA_LIST = Object.values(AI_PERSONAS);
