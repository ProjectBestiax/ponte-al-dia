"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface VoteButtonsProps {
  postId: string;
  initialVotes: number;
  initialUserVote: number;
  isLoggedIn: boolean;
}

export function VoteButtons({ postId, initialVotes, initialUserVote, isLoggedIn }: VoteButtonsProps) {
  const router = useRouter();
  const [votes, setVotes] = useState(initialVotes);
  const [userVote, setUserVote] = useState(initialUserVote);
  const [loading, setLoading] = useState(false);

  async function handleVote(value: number) {
    if (!isLoggedIn) { router.push("/login"); return; }
    if (loading) return;
    setLoading(true);

    const newValue = userVote === value ? 0 : value;
    const diff = newValue - userVote;
    setVotes((v) => v + diff);
    setUserVote(newValue);

    try {
      await fetch(`/api/posts/${postId}/vote`, {
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

  return (
    <div className="flex flex-col items-center gap-1 pt-1">
      <button
        onClick={() => handleVote(1)}
        disabled={loading}
        className={cn(
          "p-1.5 rounded transition-colors",
          userVote === 1 ? "text-blue-600 bg-blue-50" : "text-zinc-400 hover:text-blue-600 hover:bg-blue-50"
        )}
        aria-label="Votar positivo"
      >
        <ArrowUp className="w-5 h-5" />
      </button>
      <span className={cn(
        "text-lg font-bold tabular-nums",
        votes > 0 ? "text-blue-600" : votes < 0 ? "text-red-500" : "text-zinc-400"
      )}>
        {votes}
      </span>
      <button
        onClick={() => handleVote(-1)}
        disabled={loading}
        className={cn(
          "p-1.5 rounded transition-colors",
          userVote === -1 ? "text-red-500 bg-red-50" : "text-zinc-400 hover:text-red-500 hover:bg-red-50"
        )}
        aria-label="Votar negativo"
      >
        <ArrowDown className="w-5 h-5" />
      </button>
    </div>
  );
}
