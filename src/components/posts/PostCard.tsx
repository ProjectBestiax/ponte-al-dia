"use client";

import Link from "next/link";
import { ArrowUp, ArrowDown, MessageSquare, Bookmark, ChevronRight } from "lucide-react";
import { ShareMenu } from "@/components/posts/ShareMenu";
import { timeAgo, formatNumber, cn } from "@/lib/utils";
import { tagStyle } from "@/lib/tool-tags";
import { AiBadge } from "@/components/users/AiBadge";
import { useState, useRef } from "react";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    slug: string;
    url?: string | null;
    description?: string | null;
    aiSummary?: string | null;
    imageUrl?: string | null;
    voteCount: number;
    commentCount: number;
    createdAt: Date;
    userVote?: number | null;
    userBookmarked?: boolean;
    user: {
      id?: string | null;
      name?: string | null;
      username?: string | null;
      image?: string | null;
      isAI?: boolean | null;
    };
    category: {
      name: string;
      slug: string;
      emoji: string;
      color: string;
    };
    tags?: { tag: { name: string; slug: string } }[];
  };
  featured?: boolean;
}

function ToolTags({ tags }: { tags?: { tag: { name: string; slug: string } }[] }) {
  if (!tags || tags.length === 0) return null;
  return (
    <>
      {tags.map(({ tag }) => {
        const s = tagStyle(tag.slug);
        return (
          <span
            key={tag.slug}
            className="rounded-full font-semibold shrink-0"
            style={{ backgroundColor: s.bg, color: s.text, fontSize: 11, padding: "2px 8px", border: `1px solid ${s.border}` }}
          >
            {tag.name}
          </span>
        );
      })}
    </>
  );
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
  const [bookmarked, setBookmarked] = useState(post.userBookmarked ?? false);

  // userVoteRef holds the live vote so clicks never read a stale closure;
  // the network call is debounced so rapid clicks (vote → unvote) are never
  // swallowed by an in-flight request — only the final state is sent.
  const userVoteRef = useRef(userVote);
  userVoteRef.current = userVote;
  const lastSentRef = useRef(userVote);
  const syncTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function syncVote() {
    const target = userVoteRef.current;
    if (target === lastSentRef.current) return;
    try {
      const res = await fetch(`/api/posts/${post.id}/vote`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value: target }),
      });
      if (res.ok) {
        lastSentRef.current = target;
      } else if (res.status === 401) {
        window.location.href = "/login";
      }
    } catch {
      // network error — keep the optimistic state, it reconciles on next load
    }
  }

  function handleVote(value: number) {
    const prev = userVoteRef.current;
    const newValue = prev === value ? 0 : value;
    if (newValue === prev) return;

    userVoteRef.current = newValue;
    setUserVote(newValue);
    setVotes((v) => v + (newValue - prev));

    if (syncTimer.current) clearTimeout(syncTimer.current);
    syncTimer.current = setTimeout(syncVote, 400);
  }

  async function handleBookmark() {
    setBookmarked((b) => !b); // optimistic
    try {
      const res = await fetch(`/api/posts/${post.id}/bookmark`, { method: "POST" });
      if (!res.ok) {
        setBookmarked((b) => !b); // revert
        if (res.status === 401) window.location.href = "/login";
      }
    } catch {
      setBookmarked((b) => !b); // revert
    }
  }


  const domain = post.url ? (() => { try { return new URL(post.url).hostname.replace("www.", ""); } catch { return ""; } })() : "";
  const summary = post.aiSummary?.trim() || null;

  if (featured) {
    return (
      <article
        className="flex gap-2.5 sm:gap-4 rounded-[14px] p-3 sm:p-[22px] mt-[18px] mb-2"
        style={{
          border: "1px solid var(--color-accent-200)",
          background: "linear-gradient(180deg,var(--color-accent-50) 0%,#FFFFFF 70%)",
          fontFamily: "var(--font-manrope)",
        }}
      >
        {/* Votes */}
        <div className="flex flex-col items-center gap-[3px] min-w-[36px] sm:min-w-[46px] pt-0.5">
          <button
            onClick={() => handleVote(1)}
            className={cn(
              "flex items-center justify-center rounded-[8px] transition-colors",
              userVote === 1 ? "bg-accent-400" : "bg-transparent hover:bg-accent-50"
            )}
            style={{ width: 30, height: 30, border: "none" }}
            aria-label="Votar positivo"
          >
            <ArrowUp className={cn("w-[17px] h-[17px]", userVote === 1 ? "text-accent-950" : "text-accent-700")} strokeWidth={2.4} />
          </button>
          <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontWeight: 700, fontSize: 14, color: "var(--color-accent-700)" }}>
            {formatNumber(votes)}
          </span>
          <button
            onClick={() => handleVote(-1)}
            className={cn(
              "flex items-center justify-center rounded-[8px] transition-colors",
              userVote === -1 ? "" : "hover:bg-zinc-100"
            )}
            style={{
              width: 30,
              height: 30,
              border: "none",
              background: userVote === -1 ? "#FEF2F2" : "transparent",
              color: userVote === -1 ? "#EF4444" : "#C4C4CB",
            }}
            aria-label="Votar negativo"
          >
            <ArrowDown className="w-[17px] h-[17px]" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div
            className="flex items-center gap-2 mb-2.5"
            style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, letterSpacing: "0.05em", textTransform: "uppercase", color: "var(--color-accent-700)", fontWeight: 600 }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="var(--color-accent-600)" stroke="none">
              <path d="m12 2 2.6 6.9L22 9.2l-5.6 4.7L18.1 22 12 17.8 5.9 22l1.7-8.1L2 9.2l7.4-.3z"/>
            </svg>
            IA destacada hoy
          </div>

          <div className="flex items-center gap-2.5 mb-2.5 flex-wrap">
            {post.url && <DomainIcon url={post.url} />}
            {domain && (
              <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, color: "#71717A" }}>{domain}</span>
            )}
            <ToolTags tags={post.tags} />
            <span className="w-[3px] h-[3px] rounded-full bg-zinc-300 shrink-0" />
            <span style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12, color: "#A1A1AA" }}>
              {timeAgo(new Date(post.createdAt))}
            </span>
          </div>

          <Link href={`/p/${post.slug}`}>
            <h2
              className="hover:opacity-80 transition-opacity text-[21px] sm:text-[25px]"
              style={{ margin: "0 0 8px", fontWeight: 800, lineHeight: 1.22, color: "#0A0A0A", letterSpacing: "-0.02em" }}
            >
              {post.title}
            </h2>
          </Link>

          {(summary ?? post.description) && (
            <p style={{ margin: "0 0 16px", fontSize: 15, lineHeight: 1.55, color: "#52525B", maxWidth: "62ch" }}>
              {(summary ?? post.description ?? "").slice(0, 200)}{(summary ?? post.description ?? "").length > 200 ? "…" : ""}
            </p>
          )}

          <div className="flex items-center flex-wrap gap-x-5 gap-y-2">
            <Link href={`/p/${post.slug}#comentarios`} className="flex items-center gap-1.5 text-[13.5px] font-semibold text-zinc-500 hover:text-zinc-900 transition-colors">
              <MessageSquare className="w-[17px] h-[17px]" strokeWidth={1.9} />
              {formatNumber(post.commentCount)} comentarios
            </Link>
            <button
              onClick={handleBookmark}
              className={cn("flex items-center gap-1.5 text-[13.5px] font-semibold transition-colors", bookmarked ? "text-accent-700" : "text-zinc-500 hover:text-zinc-900")}
            >
              <Bookmark className="w-[17px] h-[17px]" strokeWidth={1.9} fill={bookmarked ? "currentColor" : "none"} />
              {bookmarked ? "Guardado" : "Guardar"}
            </button>
            <ShareMenu title={post.title} slug={post.slug} />
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
  const authorName = post.user.username ?? post.user.name ?? "Anónimo";

  // Vote buttons — rendered fresh in each layout (mobile + desktop) so React
  // never reuses a single element instance across two subtrees.
  const renderVoteButtons = (direction: "horizontal" | "vertical" = "vertical") => (
    <div className={cn(
      "flex items-center gap-0.5 rounded-xl border border-zinc-200 bg-zinc-50",
      direction === "horizontal" ? "flex-row px-1 py-0.5" : "flex-col px-1.5 py-1"
    )}>
      <button
        onClick={() => handleVote(1)}
        className={cn(
          "flex items-center justify-center rounded-lg transition-colors",
          userVote === 1 ? "bg-accent-400 text-accent-950" : "bg-transparent text-zinc-400 hover:bg-white hover:text-accent-700"
        )}
        style={{ width: 32, height: 28, border: "none" }}
        aria-label="Votar positivo"
      >
        <ArrowUp className="w-[17px] h-[17px]" strokeWidth={2.4} />
      </button>
      <span
        className={cn("font-bold text-center", votes < 0 ? "text-red-500" : "text-zinc-900")}
        style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 14, minWidth: 24 }}
      >
        {formatNumber(votes)}
      </span>
      <button
        onClick={() => handleVote(-1)}
        className={cn(
          "flex items-center justify-center rounded-lg transition-colors",
          userVote === -1 ? "bg-red-100 text-red-500" : "bg-transparent text-zinc-300 hover:bg-white hover:text-red-400"
        )}
        style={{ width: 32, height: 28, border: "none" }}
        aria-label="Votar negativo"
      >
        <ArrowDown className="w-[17px] h-[17px]" strokeWidth={2.2} />
      </button>
    </div>
  );

  return (
    <>
      {/* ─── Mobile layout (< sm) ─── */}
      <article
        className="flex flex-col sm:hidden p-3.5 rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {/* Row 1: votes left + actions right */}
        <div className="flex items-center justify-between pb-2.5 mb-2.5 border-b border-zinc-100">
          {renderVoteButtons("horizontal")}
          <div className="flex items-center gap-4">
            <Link href={`/p/${post.slug}#comentarios`} className="flex items-center gap-1 text-zinc-400" style={{ fontSize: 11.5 }}>
              <MessageSquare className="w-3.5 h-3.5" strokeWidth={1.8} />
              <span className="font-semibold">{formatNumber(post.commentCount)}</span>
            </Link>
            <button
              onClick={handleBookmark}
              className={cn("flex items-center transition-colors", bookmarked ? "text-accent-700" : "text-zinc-400")}
            >
              <Bookmark className="w-3.5 h-3.5" strokeWidth={1.8} fill={bookmarked ? "currentColor" : "none"} />
            </button>
            <ShareMenu title={post.title} slug={post.slug} size="sm" label={false} />
          </div>
        </div>

        {/* Row 2: category + tags + time */}
        <div className="flex items-center gap-2 mb-2 flex-wrap">
          <span
            className="rounded-full font-medium shrink-0"
            style={{ backgroundColor: post.category.color + "20", color: post.category.color, fontSize: 11.5, padding: "2px 9px" }}
          >
            {post.category.emoji} {post.category.name}
          </span>
          <ToolTags tags={post.tags} />
          <span className="w-[3px] h-[3px] rounded-full bg-zinc-300 shrink-0" />
          <span className="whitespace-nowrap" style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11.5, color: "#A1A1AA" }}>
            {timeAgo(new Date(post.createdAt))}
          </span>
        </div>

        {/* Row 3: image + title/summary */}
        <div className="flex gap-3">
          <Link href={`/p/${post.slug}`} className="shrink-0">
            {post.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-[82px] h-[82px] object-cover rounded-xl border border-zinc-100"
              />
            ) : (
              <div
                className="flex items-center justify-center w-[82px] h-[82px] rounded-xl border border-zinc-100"
                style={{ backgroundColor: post.category.color + "15" }}
              >
                <span style={{ fontSize: 28 }}>{post.category.emoji}</span>
              </div>
            )}
          </Link>
          <div className="flex-1 min-w-0">
            <Link href={`/p/${post.slug}`}>
              <h3
                className="hover:opacity-75 transition-opacity"
                style={{ margin: 0, fontWeight: 700, fontSize: 16, lineHeight: 1.3, color: "#0A0A0A", letterSpacing: "-0.01em" }}
              >
                {post.title}
              </h3>
            </Link>
            {summary && (
              <p className="line-clamp-2 mt-1" style={{ fontSize: 12.5, lineHeight: 1.4, color: "#71717A" }}>
                {summary}
              </p>
            )}
            {domain && (
              <div className="flex items-center gap-1.5 mt-1.5">
                {post.url && <DomainIcon url={post.url} />}
                <span className="truncate" style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11, color: "#A1A1AA" }}>{domain}</span>
                {(post.user.username || post.user.id) && (
                  <>
                    <span className="w-[3px] h-[3px] rounded-full bg-zinc-300 shrink-0" />
                    <span style={{ fontSize: 11, color: "#A1A1AA" }}>
                      por <span className="font-semibold text-zinc-500">{authorName}</span>
                    </span>
                    {post.user.isAI && <AiBadge size="xs" />}
                  </>
                )}
              </div>
            )}
            {!domain && (post.user.username || post.user.id) && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <span style={{ fontSize: 11, color: "#A1A1AA" }}>
                  por <span className="font-semibold text-zinc-500">{authorName}</span>
                </span>
                {post.user.isAI && <AiBadge size="xs" />}
              </div>
            )}
          </div>
        </div>

      </article>

      {/* ─── Desktop / tablet layout (>= sm) ─── */}
      <article
        className="hidden sm:flex gap-4 p-4 rounded-2xl border border-zinc-200 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.07)] transition-shadow"
        style={{ fontFamily: "var(--font-manrope)" }}
      >
        {/* Votes */}
        <div className="flex flex-col items-center min-w-[46px] pt-0.5">{renderVoteButtons()}</div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Meta — single line */}
          <div className="flex items-center gap-2.5 mb-2 flex-wrap">
            {domain && (
              <div className="flex items-center gap-2 min-w-0">
                {post.url && <DomainIcon url={post.url} />}
                <span className="truncate" style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11.5, color: "#71717A" }}>{domain}</span>
              </div>
            )}
            {domain && <span className="w-[3px] h-[3px] rounded-full bg-zinc-300 shrink-0" />}
            <span
              className="rounded-full font-medium shrink-0"
              style={{ backgroundColor: post.category.color + "20", color: post.category.color, fontSize: 11.5, padding: "2px 9px" }}
            >
              {post.category.emoji} {post.category.name}
            </span>
            <ToolTags tags={post.tags} />
            <span className="w-[3px] h-[3px] rounded-full bg-zinc-300 shrink-0" />
            <span className="whitespace-nowrap" style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 11.5, color: "#A1A1AA" }}>
              {timeAgo(new Date(post.createdAt))}
            </span>
          </div>

          {/* Title + thumbnail */}
          <div className="flex gap-4">
            <div className="flex-1 min-w-0">
              <Link href={`/p/${post.slug}`}>
                <h3
                  className="hover:opacity-75 transition-opacity"
                  style={{ margin: summary ? "0 0 6px" : "0 0 11px", fontWeight: 700, fontSize: 19, lineHeight: 1.3, color: "#0A0A0A", letterSpacing: "-0.01em" }}
                >
                  {post.title}
                </h3>
              </Link>
              {summary && (
                <p className="line-clamp-2 mb-2.5" style={{ fontSize: 14, lineHeight: 1.5, color: "#52525B" }}>
                  {summary}
                </p>
              )}
            </div>

            {post.imageUrl && (
              <Link href={`/p/${post.slug}`} className="shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.imageUrl}
                  alt={post.title}
                  className="object-cover rounded-[10px] border border-zinc-100 w-[112px] h-[112px]"
                />
              </Link>
            )}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5">
            <Link
              href={`/p/${post.slug}#comentarios`}
              className="flex items-center gap-1.5 text-[13px] font-semibold text-zinc-500 hover:text-zinc-900 transition-colors"
            >
              <MessageSquare className="w-4 h-4" strokeWidth={1.9} />
              {formatNumber(post.commentCount)}
            </Link>
            <button
              onClick={handleBookmark}
              className={cn("flex items-center gap-1.5 text-[13px] font-semibold transition-colors", bookmarked ? "text-accent-700" : "text-zinc-500 hover:text-zinc-900")}
            >
              <Bookmark className="w-4 h-4" strokeWidth={1.9} fill={bookmarked ? "currentColor" : "none"} />
              {bookmarked ? "Guardado" : "Guardar"}
            </button>
            <ShareMenu title={post.title} slug={post.slug} size="sm" />
          </div>
        </div>
      </article>
    </>
  );
}
