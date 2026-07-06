import { db } from "@/lib/db";
import { fetchOgImage } from "@/lib/og-image";

async function main() {
  const posts = await db.post.findMany({
    where: { imageUrl: null, url: { not: null } },
    select: { id: true, title: true, url: true },
  });

  console.log(`Found ${posts.length} posts without images`);

  let updated = 0;
  for (const post of posts) {
    if (!post.url) continue;
    const imageUrl = await fetchOgImage(post.url);
    if (imageUrl) {
      await db.post.update({ where: { id: post.id }, data: { imageUrl } });
      updated++;
      console.log(`✅ ${post.title.slice(0, 60)} → ${imageUrl.slice(0, 80)}`);
    } else {
      console.log(`❌ ${post.title.slice(0, 60)} — no OG image`);
    }
  }

  console.log(`\nDone: ${updated}/${posts.length} updated`);
  await db.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });
