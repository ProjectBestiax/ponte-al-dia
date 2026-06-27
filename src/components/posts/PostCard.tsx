"use client";

import Link from "next/link";
import { ArrowUp, ArrowDown, MessageSquare, Bookmark, Share2 } from "lucide-react";
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
    userVote?: number | null;
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
  featured?: boolean;
}

function DomainIcon({ url }: { url: string }) {
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    const letter = hostname[0].toUpperCase();
    return (
      <div
        className="flex items-center justify-center rounded-[5px] bg-zinc-100 text-zinc-500 shrink-0"
        style={{ width: 20, height: 20, fontFamily: "var(--font-jetbrains-mono)", fontWeight: 600, fontSize: 10 }}
      >
        {letter}
      </div>
    );
  } catch {
    return null;
  }
}

export function PostCard({ post, featured = false }: PostCardProps) {
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
      const res = await fetch(`/api/posts/${post.id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: newValue }),
      });
      if (!res.ok) {
        setVotes((v) => v - diff);
        setUserVote(userVote);
        if (res.status === 401) window.location.href = "/login";
      }
    } catch {
      setVotes((v) => v - diff);
      setUserVote(userVote);
    } finally {
      setLoading(false);
    }
  }

  const domain = post.url ? (() => { try { return new URL(post.url).hostname.replace("www.", ""); } catch { return ""; } })() : "";

  if (featured) {
    return (
      <article
        className="flex gap-4 rounded-[14px] p-[22px] mt-[18px] mb-2"
        style={{
          border: "1px solid #DCE6FF",
          background: "linear-gradient(180deg,#F7FAFF 0%,#FFFFFF 70%)",
          fontFamily: "var(--font-manrope)",
        }}
      >
        {/* Votes */}
        <div className="flex flex-col items-center gap-[3px] min-w-[46px] pt-0.5">
          <button
            onClick={() => handleVote(1)}
            disabled={loading}
            className={cn(
              "flex items-center justify-center rounded-[8px] transition-colors",
              userVote === 1 ? "bg-blue-600" : "bg-blue-600 hover:bg-blue-700"
            )}
            style={{ width: 30, height: 30, border: "none" }}
            aria-label="Votar positivo"
          >
            <ArrowUp className="w-[17px] h-[17px] text-white" strokeWidth={2.4} />
          </button>
          <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 700, fontSize: 14, color: "#2563EB" }}>
            {formatNumber(votes)}
          </span>
          <button
            onClick={() => handleVote(-1)}
            disabled={loading}
            className="flex items-center justify-center rounded-[8px] transition-colors hover:bg-zinc-100"
            style={{ width: 30, height: 30, border: "none", background: "transparent", color: "#C4C4CB" }}
            aria-label="Votar negativo"
          >
            <ArrowDown className="w-[17px] h-[17px]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div
            className="flex items-center gap-2 mb-2.5"
            style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, letterSpacing: "0.05em", textTransform: "uppercase", color: "#2563EB", fontWeight: 600 }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="#2563EB" stroke="none">
              <path d="m12 2 2.6 6.9L22 9.2l-5.6 4.7L18.1 22 12 17.8 5.9 22l1.7-8.1L2 9.2l7.4-.3z"/>
            </svg>
            IA destacada hoy
          </div>

          <div className="flex items-center gap-2.5 mb-2.5">
            {post.url && <DomainIcon url={post.url} />}
            {domain && (
              <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, color: "#71717A" }}>{domain}</span>
            )}
            <span className="w-[3px] h-[3px] rounded-full bg-zinc-300 shrink-0" />
            <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, color: "#A1A1AA" }}>
              {timeAgo(new Date(post.createdAt))}
            </span>
          </div>

          <Link href={`/p/${post.slug}`}>
            <h2
              className="hover:opacity-80 transition-opacity"
              style={{ margin: "0 0 8px", fontWeight: 800, fontSize: 25, lineHeight: 1.22, color: "#0A0A0A", letterSpacing: "-0.02em" }}
            >
              {post.title}
            </h2>
          </Link>

          {post.description && (
            <p style={{ margin: "0 0 16px", fontSize: 15, lineHeight: 1.55, color: "#52525B", maxWidth: "62ch" }}>
              {post.description.slice(0, 200)}{post.description.length > 200 ? "…" : ""}
            </p>
          )}

          <div className="flex items-center gap-5">
            <Link href={`/p/${post.slug}#comentarios`} className="flex items-center gap-1.5 text-[13.5px] font-semibold text-zinc-500 hover:text-zinc-900 transition-colors">
              <MessageSquare className="w-[17px] h-[17px]" strokeWidth={1.9} />
              {formatNumber(post.commentCount)} comentarios
            </Link>
            <button className="flex items-center gap-1.5 text-[13.5px] font-semibold text-zinc-500 hover:text-zinc-900 transition-colors">
              <Bookmark className="w-[17px] h-[17px]" strokeWidth={1.9} />
              Guardar
            </button>
            <button className="flex items-center gap-1.5 text-[13.5px] font-semibold text-zinc-500 hover:text-zinc-900 transition-colors">
              <Share2 className="w-[17px] h-[17px]" strokeWidth={1.9} />
              Compartir
            </button>
          </div>
        </div>

        {/* Thumbnail placeholder */}
        {post.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.imageUrl}
            alt={post.title}
            className="hidden md:block shrink-0 object-cover rounded-[11px]"
            style={{ width: 172, alignSelf: "stretch" }}
          />
        )}
      </article>
    );
  }

  // Regular row
  return (
    <article
      className="flex gap-4 py-[18px] px-3 rounded-[12px] border-b border-zinc-50 hover:bg-zinc-50 transition-colors"
      style={{ fontFamily: "var(--font-manrope)" }}
    >
      {/* Votes */}
      <div className="flex flex-col items-center gap-0.5 min-w-[46px] pt-0.5">
        <button
          onClick={() => handleVote(1)}
          disabled={loading}
          className={cn(
            "flex items-center justify-center rounded-[8px] transition-colors",
            userVote === 1 ? "bg-blue-600 text-white" : "bg-transparent text-zinc-400 hover:bg-zinc-100 hover:text-blue-600"
          )}
          style={{ width: 30, height: 30, border: "none" }}
          aria-label="Votar positivo"
        >
          <ArrowUp className="w-[17px] h-[17px]" strokeWidth={2.2} />
        </button>
        <span
          className={cn("font-bold", votes < 0 ? "text-red-500" : "text-zinc-950")}
          style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 13.5 }}
        >
          {formatNumber(votes)}
        </span>
        <button
          onClick={() => handleVote(-1)}
          disabled={loading}
          className={cn(
            "flex items-center justify-center rounded-[8px] transition-colors",
            userVote === -1 ? "bg-red-50 text-red-500" : "bg-transparent hover:bg-zinc-100"
          )}
          style={{ width: 30, height: 30, border: "none", color: "#C4C4CB" }}
          aria-label="Votar negativo"
        >
          <ArrowDown className="w-[17px] h-[17px]" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {/* Meta */}
        <div className="flex items-center gap-2.5 mb-1.5">
          {post.url && <DomainIcon url={post.url} />}
          {domain && (
            <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11.5, color: "#71717A" }}>{domain}</span>
          )}
          <span className="w-[3px] h-[3px] rounded-full bg-zinc-300 shrink-0" />
          <span
            className="border border-zinc-200 rounded-[5px] text-zinc-600 uppercase"
            style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 10.5, letterSpacing: "0.04em", padding: "2px 7px" }}
          >
            {post.category.emoji} {post.category.name}
          </span>
          <span className="w-[3px] h-[3px] rounded-full bg-zinc-300 shrink-0" />
          <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11.5, color: "#A1A1AA" }}>
            {timeAgo(new Date(post.createdAt))}
          </span>
        </div>

        {/* Title */}
        <Link href={`/p/${post.slug}`}>
          <h3
            className="hover:opacity-75 transition-opacity"
            style={{ margin: "0 0 11px", fontWeight: 700, fontSize: 19, lineHeight: 1.3, color: "#0A0A0A", letterSpacing: "-0.01em" }}
          >
            {post.title}
          </h3>
        </Link>

        {/* Actions */}
        <div className="flex items-center gap-5">
          <Link
            href={`/p/${post.slug}#comentarios`}
            className="flex items-center gap-1.5 text-[13px] font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
          >
            <MessageSquare className="w-4 h-4" strokeWidth={1.9} />
            {formatNumber(post.commentCount)}
          </Link>
          <button className="flex items-center gap-1.5 text-[13px] font-semibold text-zinc-500 hover:text-zinc-900 transition-colors">
            <Bookmark className="w-4 h-4" strokeWidth={1.9} />
            Guardar
          </button>
          <button className="flex items-center gap-1.5 text-[13px] font-semibold text-zinc-500 hover:text-zinc-900 transition-colors">
            <Share2 className="w-4 h-4" strokeWidth={1.9} />
            Compartir
          </button>
        </div>
      </div>
    </article>
  );
}
