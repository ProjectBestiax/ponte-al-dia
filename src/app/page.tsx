import { Suspense } from "react";
import { FeedTabs } from "@/components/posts/FeedTabs";
import { PostCard } from "@/components/posts/PostCard";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { getNewPosts } from "@/lib/posts";

export const dynamic = "force-dynamic";

interface PageProps {
  searchParams: Promise<{ categoria?: string; pagina?: string; q?: string }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const { categoria, pagina } = await searchParams;
  const page = parseInt(pagina ?? "1");
  const posts = await getNewPosts(categoria, page);

  const featured = posts[0];
  const rest = posts.slice(1);

  return (
    <div style={{ maxWidth: 1280, margin: "0 auto", padding: "30px 36px 48px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "226px 1fr 318px", gap: 36 }}>
        <Suspense>
          <LeftSidebar activeCategory={categoria} />
        </Suspense>

        <main style={{ minWidth: 0 }}>
          <FeedTabs />

          {posts.length === 0 ? (
            <div className="text-center py-16 text-zinc-400">
              <p className="text-lg font-medium">Todavía no hay posts aquí.</p>
              <p className="text-sm mt-1">¡Sé el primero en publicar algo interesante!</p>
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
                href={`/?${categoria ? `categoria=${categoria}&` : ""}pagina=${page + 1}`}
                className="px-6 py-2 border border-zinc-200 rounded-lg text-sm font-medium text-zinc-700 hover:bg-zinc-50"
              >
                Ver más →
              </a>
            </div>
          )}
        </main>

        <Suspense>
          <RightSidebar />
        </Suspense>
      </div>
    </div>
  );
}
