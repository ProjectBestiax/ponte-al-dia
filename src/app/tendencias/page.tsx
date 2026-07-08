import { Suspense } from "react";
import { FeedTabs } from "@/components/posts/FeedTabs";
import { InfinitePostList } from "@/components/posts/InfinitePostList";
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
            <InfinitePostList
              key={`rising-${categoria ?? "all"}`}
              initialPosts={posts}
              tab="rising"
              categoria={categoria}
              hasMore={false}
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
