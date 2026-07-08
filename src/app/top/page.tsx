import { Suspense } from "react";
import { FeedTabs } from "@/components/posts/FeedTabs";
import { InfinitePostList } from "@/components/posts/InfinitePostList";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { MobileCategoryBar } from "@/components/layout/MobileCategoryBar";
import { getTopPosts, type TopPeriod } from "@/lib/posts";
import { TopPeriodFilter } from "./TopPeriodFilter";

interface PageProps {
  searchParams: Promise<{ categoria?: string; pagina?: string; periodo?: string }>;
}

export const metadata = {
  title: "Más votados · Ponte al dIA",
  description: "Los posts de IA más votados de todos los tiempos por la comunidad hispanohablante.",
};

const VALID_PERIODS: TopPeriod[] = ["day", "week", "month", "all"];

export default async function TopPage({ searchParams }: PageProps) {
  const { categoria, pagina, periodo } = await searchParams;
  const page = parseInt(pagina ?? "1");
  const period: TopPeriod = VALID_PERIODS.includes(periodo as TopPeriod) ? (periodo as TopPeriod) : "all";
  const posts = await getTopPosts(period, categoria, page);

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
            <MobileCategoryBar activeCategory={categoria} basePath="/top" />
          </Suspense>
          <FeedTabs />

          <Suspense>
            <TopPeriodFilter />
          </Suspense>

          {posts.length === 0 ? (
            <div className="text-center py-16 text-zinc-400">
              <p className="text-lg font-medium">Sin posts en este período.</p>
              <p className="text-sm mt-1">Prueba con otro rango de tiempo.</p>
            </div>
          ) : (
            <InfinitePostList
              key={`top-${period}-${categoria ?? "all"}`}
              initialPosts={posts}
              tab="top"
              categoria={categoria}
              periodo={period}
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
