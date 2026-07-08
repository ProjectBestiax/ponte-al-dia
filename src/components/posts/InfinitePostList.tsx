"use client";

import { useCallback, useRef, useState, useEffect } from "react";
import { PostCard } from "./PostCard";
import { Loader2 } from "lucide-react";
import type { FeedPost } from "@/lib/posts";

interface InfinitePostListProps {
  initialPosts: FeedPost[];
  tab: string;
  categoria?: string;
  periodo?: string;
  hasMore: boolean;
}

export function InfinitePostList({ initialPosts, tab, categoria, periodo, hasMore: initialHasMore }: InfinitePostListProps) {
  const [posts, setPosts] = useState(initialPosts);
  const [page, setPage] = useState(2);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(initialHasMore);
  const sentinelRef = useRef<HTMLDivElement>(null);

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.set("tab", tab);
      params.set("pagina", String(page));
      if (categoria) params.set("categoria", categoria);
      if (periodo) params.set("periodo", periodo);

      const res = await fetch(`/api/feed?${params.toString()}`);
      if (!res.ok) return;

      const newPosts = await res.json() as FeedPost[];
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prev) => [...prev, ...newPosts]);
        setPage((p) => p + 1);
        if (newPosts.length < 20) setHasMore(false);
      }
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  }, [loading, hasMore, tab, page, categoria, periodo]);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      { rootMargin: "400px" },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [loadMore]);

  return (
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

      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-6">
          {loading && <Loader2 className="w-5 h-5 text-zinc-400 animate-spin" />}
        </div>
      )}
    </div>
  );
}
