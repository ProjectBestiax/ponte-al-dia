// Registro central de las Guías de IA por profesión.
// Cada guía vive en su propio fichero de datos (src/lib/guides/data/{slug}.ts);
// aquí solo las importamos y las exponemos como una lista + helpers de búsqueda.

import { guide as abogados } from "./data/abogados";
import { guide as communityManagers } from "./data/community-managers";
import { guide as periodistas } from "./data/periodistas";
import { guide as psicologos } from "./data/psicologos";
import { guide as desarrolladores } from "./data/desarrolladores";
import { guide as marketers } from "./data/marketers";
import { guide as disenadores } from "./data/disenadores";
import { guide as profesores } from "./data/profesores";

import type { GuideContent, GuideMeta } from "./types";

export const ALL_GUIDES: GuideContent[] = [
  abogados,
  communityManagers,
  periodistas,
  psicologos,
  desarrolladores,
  marketers,
  disenadores,
  profesores,
];

export const GUIDES: GuideMeta[] = ALL_GUIDES.map(({ slug, profession, icon, tagline }) => ({
  slug,
  profession,
  icon,
  tagline,
}));

export function getGuide(slug: string): GuideContent | undefined {
  return ALL_GUIDES.find((g) => g.slug === slug);
}

export type { GuideContent, GuideMeta, GuideTool, GuidePrompt, GuideWorkflow, GuideMistake, GuideResource, GuideFaq } from "./types";
