import { Suspense } from "react";
import { FeedTabs } from "@/components/posts/FeedTabs";
import { PostCard } from "@/components/posts/PostCard";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { MobileCategoryBar } from "@/components/layout/MobileCategoryBar";
import { getTrendingPosts } from "@/lib/posts";

interface PageProps {
  searchParams: Promise<{ categoria?: string; pagina?: string }>;
}

export const metadata = { title: "Populares · Ponte al dIA" };

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
            <div>
              {posts.map((post) => (
                <PostCard
                  key={post.id}
                  post={{
                    ...post,
                    url: post.url ?? undefined,
                    description: post.description ?? undefined,
                    imageUrl: post.imageUrl ?? undefined,
                  }}
                />
              ))}
            </div>
          )}

          {posts.length === 20 && (
            <div className="mt-8 flex justify-center">
              <a
                href={`/populares?${categoria ? `categoria=${categoria}&` : ""}pagina=${page + 1}`}
                className="px-6 py-2 border border-zinc-200 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Ver más →
              </a>
            </div>
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
