import { Suspense } from "react";
import { FeedTabs } from "@/components/posts/FeedTabs";
import { PostCard } from "@/components/posts/PostCard";
import { InfinitePostList } from "@/components/posts/InfinitePostList";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { MobileCategoryBar } from "@/components/layout/MobileCategoryBar";
import { CategoryBanner } from "@/components/feed/CategoryBanner";
import { GamificationBanner } from "@/components/feed/GamificationBanner";
import { getNewPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ categoria?: string; pagina?: string; q?: string }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const { categoria, pagina, q } = await searchParams;
  const page = parseInt(pagina ?? "1");
  const posts = await getNewPosts(categoria, page, 20, q);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div className="feed-wrapper">
      <div className="feed-grid">
        <aside className="feed-left-sidebar">
          <Suspense>
            <LeftSidebar />
          </Suspense>
        </aside>

        <main style={{ minWidth: 0 }}>
          <Suspense>
            <MobileCategoryBar activeCategory={categoria} basePath="/" />
          </Suspense>
          <FeedTabs />

          <GamificationBanner />
          <CategoryBanner categorySlug={categoria} />

          {q && (
            <div className="flex items-center gap-2 py-2 mb-1 text-sm text-zinc-500" style={{ fontFamily: "var(--font-jetbrains-mono)" }}>
              <span>Resultados para:</span>
              <span className="font-semibold text-zinc-900">&ldquo;{q}&rdquo;</span>
              <a href="/" className="ml-auto text-zinc-400 hover:text-zinc-700 text-xs transition-colors">× Limpiar</a>
            </div>
          )}

          {posts.length === 0 ? (
            <div className="text-center py-16 text-zinc-400">
              {q ? (
                <>
                  <p className="text-lg font-medium">Sin resultados para &ldquo;{q}&rdquo;</p>
                  <p className="text-sm mt-1">Prueba con otras palabras o <a href="/" className="text-accent-700 hover:underline">ve al inicio</a>.</p>
                </>
              ) : (
                <>
                  <p className="text-lg font-medium">Todavía no hay posts aquí.</p>
                  <p className="text-sm mt-1">¡Sé el primero en publicar algo interesante!</p>
                </>
              )}
            </div>
          ) : (
            <>
              {featured && (
                <PostCard
                  post={{
                    ...featured,
                    url: featured.url ?? undefined,
                    description: featured.description ?? undefined,
                    imageUrl: featured.imageUrl ?? undefined,
                  }}
                  featured
                />
              )}
              <InfinitePostList
                key={`new-${categoria ?? "all"}`}
                initialPosts={rest}
                tab="new"
                categoria={categoria}
                hasMore={posts.length === 20}
              />
            </>
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
