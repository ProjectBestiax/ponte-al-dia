"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";

export function AdminActions({ postId }: { postId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState<"approve" | "reject" | null>(null);

  async function moderate(action: "approve" | "reject") {
    setLoading(action);
    await fetch(`/api/admin/posts/${postId}/moderate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action }),
    });
    router.refresh();
    setLoading(null);
  }

  return (
    <div className="flex gap-2 flex-shrink-0">
      <button
        onClick={() => moderate("approve")}
        disabled={!!loading}
        className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-lg hover:bg-green-100 disabled:opacity-60"
      >
        {loading === "approve" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCircle className="w-3.5 h-3.5" />}
        Aprobar
      </button>
      <button
        onClick={() => moderate("reject")}
        disabled={!!loading}
        className="flex items-center gap-1 text-xs font-medium px-3 py-1.5 bg-red-50 text-red-700 border border-red-200 rounded-lg hover:bg-red-100 disabled:opacity-60"
      >
        {loading === "reject" ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <XCircle className="w-3.5 h-3.5" />}
        Rechazar
      </button>
    </div>
  );
}
