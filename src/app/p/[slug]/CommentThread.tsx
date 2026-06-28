"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { timeAgo } from "@/lib/utils";

const REACTIONS = [
  { type: "THUMBS_UP",    emoji: "👍" },
  { type: "HEART",        emoji: "❤️" },
  { type: "BROKEN_HEART", emoji: "💔" },
  { type: "LAUGH",        emoji: "😂" },
  { type: "THUMBS_DOWN",  emoji: "👎" },
] as const;

type ReactionType = (typeof REACTIONS)[number]["type"];

interface ReactionData {
  type: ReactionType;
  userId: string;
}

interface CommentData {
  id: string;
  content: string;
  createdAt: string; // ISO string from server
  user: { name: string | null; username: string | null; image: string | null };
  reactions: ReactionData[];
  replies?: Omit<CommentData, "replies">[];
}

interface Props {
  comment: CommentData;
  postId: string;
  isLoggedIn: boolean;
  currentUserId?: string;
  depth?: number;
}

export function CommentThread({ comment, postId, isLoggedIn, currentUserId, depth = 0 }: Props) {
  const router = useRouter();
  const [showReply, setShowReply] = useState(false);
  const [replyContent, setReplyContent] = useState("");
  const [replyLoading, setReplyLoading] = useState(false);
  const [reactions, setReactions] = useState<ReactionData[]>(comment.reactions);

  const authorName = comment.user.username ?? comment.user.name ?? "Anónimo";

  async function submitReply() {
    if (!replyContent.trim() || replyLoading) return;
    setReplyLoading(true);
    await fetch(`/api/posts/${postId}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: replyContent.trim(), parentId: comment.id }),
    });
    setReplyContent("");
    setShowReply(false);
    setReplyLoading(false);
    router.refresh();
  }

  async function toggleReaction(type: ReactionType) {
    if (!isLoggedIn || !currentUserId) return;
    // Optimistic update
    const hasIt = reactions.some(r => r.type === type && r.userId === currentUserId);
    setReactions(prev =>
      hasIt
        ? prev.filter(r => !(r.type === type && r.userId === currentUserId))
        : [...prev, { type, userId: currentUserId }]
    );
    await fetch(`/api/comments/${comment.id}/reactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });
  }

  return (
    <div>
      {/* Comment card */}
      <div className={`bg-white border border-zinc-200 rounded-xl p-4 ${depth > 0 ? "border-l-zinc-300" : ""}`}>
        {/* Author row */}
        <div className="flex items-center gap-2 mb-2" style={{ fontSize: 12 }}>
          <div
            className="flex items-center justify-center rounded-full text-white font-bold shrink-0"
            style={{ width: 22, height: 22, background: "#0A0A0A", fontSize: 10 }}
          >
            {authorName[0].toUpperCase()}
          </div>
          <span className="font-semibold text-zinc-700">{authorName}</span>
          <span className="text-zinc-400">{timeAgo(new Date(comment.createdAt))}</span>
        </div>

        {/* Content */}
        <p className="text-zinc-800 whitespace-pre-wrap leading-relaxed" style={{ fontSize: 14 }}>
          {comment.content}
        </p>

        {/* Footer: reactions + reply */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {/* Reactions */}
          <div className="flex items-center gap-1">
            {REACTIONS.map(({ type, emoji }) => {
              const count = reactions.filter(r => r.type === type).length;
              const mine = currentUserId
                ? reactions.some(r => r.type === type && r.userId === currentUserId)
                : false;
              return (
                <button
                  key={type}
                  onClick={() => toggleReaction(type)}
                  disabled={!isLoggedIn}
                  title={isLoggedIn ? undefined : "Entra para reaccionar"}
                  className={`flex items-center gap-0.5 px-1.5 py-0.5 rounded-full transition-colors ${
                    mine
                      ? "bg-blue-100 ring-1 ring-blue-300"
                      : "hover:bg-zinc-100"
                  } ${!isLoggedIn ? "cursor-default opacity-60" : "cursor-pointer"}`}
                  style={{ fontSize: 15, lineHeight: 1 }}
                >
                  <span>{emoji}</span>
                  {count > 0 && (
                    <span
                      className={`font-semibold ml-0.5 ${mine ? "text-blue-700" : "text-zinc-500"}`}
                      style={{ fontSize: 11 }}
                    >
                      {count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Reply button — only on top-level comments */}
          {isLoggedIn && depth === 0 && (
            <button
              onClick={() => setShowReply(v => !v)}
              className="text-zinc-400 hover:text-zinc-700 font-semibold transition-colors"
              style={{ fontSize: 12 }}
            >
              {showReply ? "Cancelar" : "Responder"}
            </button>
          )}
        </div>
      </div>

      {/* Inline reply form */}
      {showReply && (
        <div className="mt-2 ml-6 pl-3 border-l-2 border-blue-200">
          <textarea
            value={replyContent}
            onChange={e => setReplyContent(e.target.value)}
            rows={3}
            placeholder="Escribe tu respuesta…"
            autoFocus
            maxLength={2000}
            className="w-full border border-zinc-200 rounded-xl px-4 py-3 focus:outline-none focus:border-zinc-400 resize-none transition-colors"
            style={{ fontSize: 13 }}
          />
          <div className="flex items-center gap-2 mt-1.5">
            <button
              onClick={submitReply}
              disabled={replyLoading || !replyContent.trim()}
              className="px-4 py-1.5 bg-zinc-950 text-white font-semibold rounded-lg hover:bg-zinc-800 disabled:opacity-50 transition-colors"
              style={{ fontSize: 12 }}
            >
              {replyLoading ? "Enviando…" : "Publicar respuesta"}
            </button>
            <button
              onClick={() => { setShowReply(false); setReplyContent(""); }}
              className="text-zinc-400 hover:text-zinc-600 font-medium transition-colors"
              style={{ fontSize: 12 }}
            >
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* Replies — 1 level of indentation */}
      {comment.replies && comment.replies.length > 0 && (
        <div className="mt-2 ml-6 pl-3 border-l-2 border-zinc-100 flex flex-col gap-2">
          {comment.replies.map(reply => (
            <CommentThread
              key={reply.id}
              comment={{ ...reply, replies: [] }}
              postId={postId}
              isLoggedIn={isLoggedIn}
              currentUserId={currentUserId}
              depth={1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
