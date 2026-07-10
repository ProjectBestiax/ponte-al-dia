import { Suspense } from "react";
import { FeedTabs } from "@/components/posts/FeedTabs";
import { InfinitePostList } from "@/components/posts/InfinitePostList";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { MobileCategoryBar } from "@/components/layout/MobileCategoryBar";
import { InstallBar } from "@/components/pwa/InstallBar";
import { getTrendingPosts } from "@/lib/posts";

interface PageProps {
  searchParams: Promise<{ categoria?: string; pagina?: string }>;
}

export const metadata = {
  title: "Destacados · Ponte al dIA",
  description: "Los posts de IA destacados por la comunidad hispanohablante. Herramientas, papers, tutoriales y repos que de verdad merecen la pena.",
};

export default async function TrendingPage({ searchParams }: PageProps) {
  const { categoria, pagina } = await searchParams;
  const page = parseInt(pagina ?? "1");
  const posts = await getTrendingPosts(categoria, page);

  return (
    <div className="feed-wrapper">
      <div className="feed-grid">
        <aside className="feed-left-sidebar">
          <Suspense>
            <LeftSidebar />
          </Suspense>
        </aside>

        <main style={{ minWidth: 0 }}>
          <InstallBar />
          <Suspense>
            <MobileCategoryBar activeCategory={categoria} basePath="/populares" />
          </Suspense>
          <FeedTabs />

          {posts.length === 0 ? (
            <div className="text-center py-16 text-zinc-400">
              <p className="text-lg font-medium">Aún no hay nada popular.</p>
              <p className="text-sm mt-1">¡Publica algo y consigue votos!</p>
            </div>
          ) : (
            <InfinitePostList
              key={`trending-${categoria ?? "all"}`}
              initialPosts={posts}
              tab="trending"
              categoria={categoria}
              hasMore={posts.length === 20}
            />
          )}
        </main>

        <aside className="feed-right-sidebar">
          <Suspense>
            <RightSidebar />
          </Suspense>
        </aside>
      </div>
    </div>
  );
}
