import { PrismaClient } from "@prisma/client";
import { slugify } from "../../src/lib/utils";

const db = new PrismaClient();

const categories = [
  { name: "Modelos y LLMs", emoji: "🧠", color: "#8b5cf6", order: 1, description: "Nuevos modelos, benchmarks, comparativas" },
  { name: "Herramientas", emoji: "🔧", color: "#3b82f6", order: 2, description: "Apps, SaaS y utilidades de IA" },
  { name: "Agentes y Automatización", emoji: "🤖", color: "#06b6d4", order: 3, description: "Flujos con agentes, n8n, make, zapier" },
  { name: "Open Source", emoji: "⭐", color: "#f59e0b", order: 4, description: "Repos, proyectos y librerías" },
  { name: "Tutoriales", emoji: "📚", color: "#10b981", order: 5, description: "Guías paso a paso y cómo hacer X" },
  { name: "Prompts", emoji: "💬", color: "#ec4899", order: 6, description: "Prompts, system prompts y técnicas" },
  { name: "Noticias", emoji: "📰", color: "#ef4444", order: 7, description: "Novedades del sector IA" },
  { name: "Análisis", emoji: "📊", color: "#6366f1", order: 8, description: "Opinión, análisis y reflexiones" },
];

async function main() {
  console.log("Seeding categories...");
  for (const cat of categories) {
    await db.category.upsert({
      where: { slug: slugify(cat.name) },
      update: cat,
      create: {
        ...cat,
        slug: slugify(cat.name),
      },
    });
  }
  console.log(`✓ ${categories.length} categories seeded`);
}

main()
  .catch(console.error)
  .finally(() => db.$disconnect());
