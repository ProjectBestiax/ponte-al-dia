import { Suspense } from "react";
import { FeedTabs } from "@/components/posts/FeedTabs";
import { PostCard } from "@/components/posts/PostCard";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { MobileCategoryBar } from "@/components/layout/MobileCategoryBar";
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
        <Suspense>
          <aside className="feed-left-sidebar">
            <LeftSidebar activeCategory={categoria} />
          </aside>
        </Suspense>

        <main style={{ minWidth: 0 }}>
          <Suspense>
            <MobileCategoryBar activeCategory={categoria} basePath="/" />
          </Suspense>
          <FeedTabs />

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
                  <p className="text-sm mt-1">Prueba con otras palabras o <a href="/" className="text-blue-600 hover:underline">ve al inicio</a>.</p>
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
              <div>
                {rest.map((post) => (
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
            </>
          )}

          {posts.length === 20 && (
            <div className="mt-8 flex justify-center">
              <a
                href={`/?${categoria ? `categoria=${categoria}&` : ""}${q ? `q=${encodeURIComponent(q)}&` : ""}pagina=${page + 1}`}
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
