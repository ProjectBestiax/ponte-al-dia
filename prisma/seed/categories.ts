import { PrismaClient } from "@prisma/client";
import { slugify } from "../../src/lib/utils";

const db = new PrismaClient();

const categories: {
  name: string; emoji: string; color: string; order: number; description: string; slug?: string;
}[] = [
  { name: "Modelos y LLMs", emoji: "🧠", color: "#8b5cf6", order: 1, description: "Nuevos modelos, benchmarks, comparativas" },
  { name: "Herramientas", emoji: "🔧", color: "#3b82f6", order: 2, description: "Apps, SaaS y utilidades de IA" },
  { name: "Agentes y Automatización", emoji: "🤖", color: "#06b6d4", order: 3, description: "Flujos con agentes, n8n, make, zapier" },
  { name: "Open Source", emoji: "⭐", color: "#f59e0b", order: 4, description: "Repos, proyectos y librerías" },
  { name: "Tutoriales", emoji: "📚", color: "#10b981", order: 5, description: "Guías paso a paso y cómo hacer X" },
  { name: "Prompts", emoji: "💬", color: "#ec4899", order: 6, description: "Prompts, system prompts y técnicas" },
  { name: "Noticias", emoji: "📰", color: "#ef4444", order: 7, description: "Novedades del sector IA" },
  { name: "Análisis", emoji: "📊", color: "#6366f1", order: 8, description: "Opinión, análisis y reflexiones" },
  { name: "Skills y extensiones", slug: "skills", emoji: "🧩", color: "#14b8a6", order: 9, description: "Skills, MCP, rules y extensiones para potenciar tu IA — para Claude, Cursor, ChatGPT y más" },
];

// Compatibility tags used by the "Skills y extensiones" category.
const tags = [
  { name: "Claude", slug: "claude" },
  { name: "Cursor", slug: "cursor" },
  { name: "ChatGPT", slug: "chatgpt" },
  { name: "Gemini", slug: "gemini" },
  { name: "Cualquiera", slug: "cualquiera" },
];

async function main() {
  console.log("Seeding categories...");
  for (const cat of categories) {
    const slug = cat.slug ?? slugify(cat.name);
    const { slug: _omit, ...data } = cat;
    await db.category.upsert({
      where: { slug },
      update: data,
      create: { ...data, slug },
    });
  }
  console.log(`✓ ${categories.length} categories seeded`);

  console.log("Seeding tags...");
  for (const tag of tags) {
    await db.tag.upsert({ where: { slug: tag.slug }, update: {}, create: tag });
  }
  console.log(`✓ ${tags.length} tags seeded`);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
