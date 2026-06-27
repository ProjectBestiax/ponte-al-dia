import { Suspense } from "react";
import { FeedTabs } from "@/components/posts/FeedTabs";
import { PostCard } from "@/components/posts/PostCard";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { getRisingPosts } from "@/lib/posts";

interface PageProps {
  searchParams: Promise<{ categoria?: string }>;
}

export const metadata = { title: "Tendencias · Ponte al dIA" };

export default async function RisingPage({ searchParams }: PageProps) {
  const { categoria } = await searchParams;
  const posts = await getRisingPosts(categoria);

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
              <p className="text-lg font-medium">Nada subiendo todavía.</p>
              <p className="text-sm mt-1">Vota los posts que te parezcan interesantes.</p>
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
        </main>

        <Suspense>
          <RightSidebar />
        </Suspense>
      </div>
    </div>
  );
}
