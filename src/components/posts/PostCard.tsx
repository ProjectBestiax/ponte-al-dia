"use client";

import Link from "next/link";
import { ArrowUp, ArrowDown, MessageSquare, ExternalLink } from "lucide-react";
import { timeAgo, formatNumber, cn } from "@/lib/utils";
import { useState } from "react";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    url?: string | null;
    description?: string | null;
    imageUrl?: string | null;
    voteCount: number;
    commentCount: number;
    createdAt: Date;
    userVote?: number | null; // +1, -1 o null
    user: {
      name?: string | null;
      username?: string | null;
      image?: string | null;
    };
    category: {
      name: string;
      slug: string;
      emoji: string;
      color: string;
    };
  };
  rank?: number;
}

export function PostCard({ post, rank }: PostCardProps) {
  const [votes, setVotes] = useState(post.voteCount);
  const [userVote, setUserVote] = useState(post.userVote ?? 0);
  const [loading, setLoading] = useState(false);

  async function handleVote(value: number) {
    if (loading) return;
    setLoading(true);

    const newValue = userVote === value ? 0 : value;
    const diff = newValue - userVote;

    setVotes((v) => v + diff);
    setUserVote(newValue);

    try {
      await fetch(`/api/posts/${post.id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: newValue }),
      });
    } catch {
      setVotes((v) => v - diff);
      setUserVote(userVote);
    } finally {
      setLoading(false);
    }
  }

  const authorName = post.user.username ?? post.user.name ?? "Anónimo";

  return (
    <article className="flex gap-3 bg-white border border-gray-200 rounded-xl p-4 hover:border-gray-300 transition-colors">
      {/* Rank */}
      {rank !== undefined && (
        <div className="hidden sm:flex items-start pt-1 w-6 text-xs font-bold text-gray-400">
          {rank}.
        </div>
      )}

      {/* Votes */}
      <div className="flex flex-col items-center gap-0.5 min-w-[40px]">
        <button
          onClick={() => handleVote(1)}
          disabled={loading}
          className={cn(
            "p-1 rounded transition-colors",
            userVote === 1
              ? "text-indigo-600 bg-indigo-50"
              : "text-gray-400 hover:text-indigo-600 hover:bg-indigo-50"
          )}
          aria-label="Votar positivo"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        <span className={cn(
          "text-sm font-bold tabular-nums",
          votes > 0 ? "text-indigo-600" : votes < 0 ? "text-red-500" : "text-gray-500"
        )}>
          {formatNumber(votes)}
        </span>
        <button
          onClick={() => handleVote(-1)}
          disabled={loading}
          className={cn(
            "p-1 rounded transition-colors",
            userVote === -1
              ? "text-red-500 bg-red-50"
              : "text-gray-400 hover:text-red-500 hover:bg-red-50"
          )}
          aria-label="Votar negativo"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>

      {/* Thumbnail */}
      {post.imageUrl && (
        <div className="hidden sm:block flex-shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-16 h-16 object-cover rounded-lg border border-gray-200"
          />
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start gap-2 flex-wrap">
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{
              backgroundColor: post.category.color + "20",
              color: post.category.color,
            }}
          >
            {post.category.emoji} {post.category.name}
          </span>
          {post.url && (
            <span className="text-xs text-gray-400 truncate max-w-[200px]">
              {new URL(post.url).hostname.replace("www.", "")}
            </span>
          )}
        </div>

        <div className="mt-1 flex items-start gap-1">
          <Link
            href={`/p/${post.slug}`}
            className="font-semibold text-gray-900 hover:text-indigo-600 transition-colors leading-snug line-clamp-2"
          >
            {post.title}
          </Link>
          {post.url && (
            <a
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gray-600 flex-shrink-0 mt-0.5"
              aria-label="Abrir enlace externo"
            >
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {post.description && (
          <p className="mt-1 text-sm text-gray-500 line-clamp-2">{post.description}</p>
        )}

        <div className="mt-2 flex items-center gap-3 text-xs text-gray-400">
          <Link href={`/p/${post.slug}#comentarios`} className="flex items-center gap-1 hover:text-gray-600">
            <MessageSquare className="w-3.5 h-3.5" />
            {post.commentCount} comentario{post.commentCount !== 1 ? "s" : ""}
          </Link>
          <span>por <span className="font-medium text-gray-600">{authorName}</span></span>
          <span>{timeAgo(new Date(post.createdAt))}</span>
        </div>
      </div>
    </article>
  );
}
