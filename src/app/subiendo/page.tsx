import { Suspense } from "react";
import { FeedTabs } from "@/components/posts/FeedTabs";
import { CategoryFilter } from "@/components/posts/CategoryFilter";
import { PostCard } from "@/components/posts/PostCard";
import { ToolsSidebar } from "@/components/layout/ToolsSidebar";
import { getRisingPosts, getCategories } from "@/lib/posts";

interface PageProps {
  searchParams: Promise<{ categoria?: string }>;
}

export const metadata = { title: "Subiendo" };

export default async function RisingPage({ searchParams }: PageProps) {
  const { categoria } = await searchParams;

  const [posts, categories] = await Promise.all([
    getRisingPosts(categoria),
    getCategories(),
  ]);

  return (
    <div>
      <FeedTabs />
      <Suspense>
        <CategoryFilter categories={categories} />
      </Suspense>

      <p className="text-xs text-gray-500 mb-4">Posts con más votos en las últimas 24 horas.</p>

      <div className="flex gap-6 items-start">
        <div className="flex-1 min-w-0">
          {posts.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg font-medium">Nada subiendo todavía.</p>
              <p className="text-sm mt-1">Vota los posts que te parezcan interesantes.</p>
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
                  rank={i + 1}
                />
              ))}
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
