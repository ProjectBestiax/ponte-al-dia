import { Suspense } from "react";
import { FeedTabs } from "@/components/posts/FeedTabs";
import { PostCard } from "@/components/posts/PostCard";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { MobileCategoryBar } from "@/components/layout/MobileCategoryBar";
import { getRisingPosts } from "@/lib/posts";

interface PageProps {
  searchParams: Promise<{ categoria?: string }>;
}

export const metadata = {
  title: "Subiendo · Ponte al dIA",
  description: "Posts de IA que están ganando tracción ahora mismo. Lo que la comunidad está votando en las últimas 24h.",
};

export default async function RisingPage({ searchParams }: PageProps) {
  const { categoria } = await searchParams;
  const posts = await getRisingPosts(categoria);

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
            <MobileCategoryBar activeCategory={categoria} basePath="/tendencias" />
          </Suspense>
          <FeedTabs />

          {posts.length === 0 ? (
            <div className="text-center py-16 text-zinc-400">
              <p className="text-lg font-medium">Nada subiendo todavía.</p>
              <p className="text-sm mt-1">Vota los posts que te parezcan interesantes.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 sm:gap-3.5">
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
