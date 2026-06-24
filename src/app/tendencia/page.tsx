import { Suspense } from "react";
import { FeedTabs } from "@/components/posts/FeedTabs";
import { CategoryFilter } from "@/components/posts/CategoryFilter";
import { PostCard } from "@/components/posts/PostCard";
import { ToolsSidebar } from "@/components/layout/ToolsSidebar";
import { getTrendingPosts, getCategories } from "@/lib/posts";

interface PageProps {
  searchParams: Promise<{ categoria?: string; pagina?: string }>;
}

export const metadata = { title: "🔥 Tendencia" };

export default async function TrendingPage({ searchParams }: PageProps) {
  const { categoria, pagina } = await searchParams;
  const page = parseInt(pagina ?? "1");

  const [posts, categories] = await Promise.all([
    getTrendingPosts(categoria, page),
    getCategories(),
  ]);

  return (
    <div>
      <FeedTabs />
      <Suspense>
        <CategoryFilter categories={categories} />
      </Suspense>

      <p className="text-xs text-gray-500 mb-4">Los posts más votados de la comunidad.</p>

      <div className="flex gap-6 items-start">
        <div className="flex-1 min-w-0">
          {posts.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg font-medium">Aún no hay tendencias.</p>
              <p className="text-sm mt-1">¡Publica algo y consigue votos!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {posts.map((post, i) => (
                <PostCard
                  key={post.id}
                  post={{
                    ...post,
                    url: post.url ?? undefined,
                    description: post.description ?? undefined,
                    imageUrl: post.imageUrl ?? undefined,
                  }}
                  rank={(page - 1) * 20 + i + 1}
                />
              ))}
            </div>
          )}

          {posts.length === 20 && (
            <div className="mt-8 flex justify-center">
              <a
                href={`/tendencia?${categoria ? `categoria=${categoria}&` : ""}pagina=${page + 1}`}
                className="px-6 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Ver más →
              </a>
            </div>
          )}
        </div>

        <div className="hidden lg:block w-64 shrink-0">
          <ToolsSidebar />
        </div>
      </div>

      <div className="lg:hidden">
        <ToolsSidebar variant="horizontal" />
      </div>
    </div>
  );
}
