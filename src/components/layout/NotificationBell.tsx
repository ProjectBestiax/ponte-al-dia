"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Bell, MessageSquare, CornerDownRight, UserPlus } from "lucide-react";
import { timeAgo } from "@/lib/utils";

type NotificationType = "COMMENT_ON_POST" | "REPLY_TO_COMMENT" | "FOLLOW";

interface NotificationItem {
  id: string;
  type: NotificationType;
  read: boolean;
  createdAt: string;
  actor: { id: string; name: string | null; username: string | null; image: string | null } | null;
  post: { slug: string; title: string } | null;
}

const MESSAGES: Record<NotificationType, string> = {
  COMMENT_ON_POST: "comentó en tu publicación",
  REPLY_TO_COMMENT: "respondió a tu comentario",
  FOLLOW: "ha empezado a seguirte",
};

const ICONS: Record<NotificationType, typeof MessageSquare> = {
  COMMENT_ON_POST: MessageSquare,
  REPLY_TO_COMMENT: CornerDownRight,
  FOLLOW: UserPlus,
};

export function NotificationBell() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<NotificationItem[]>([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const fetchNotifications = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications");
      if (!res.ok) return;
      const data = await res.json();
      setItems(data.items ?? []);
      setUnread(data.unreadCount ?? 0);
    } catch {
      // silent — badge just won't update this cycle
    }
  }, []);

  // Initial load + light polling every 60s.
  useEffect(() => {
    fetchNotifications();
    const interval = setInterval(fetchNotifications, 60_000);
    return () => clearInterval(interval);
  }, [fetchNotifications]);

  // Close on outside click.
  useEffect(() => {
    if (!open) return;
    function onClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, [open]);

  async function handleOpen() {
    const next = !open;
    setOpen(next);
    if (next) {
      setLoading(items.length === 0);
      await fetchNotifications();
      setLoading(false);
      if (unread > 0) {
        setUnread(0);
        setItems((prev) => prev.map((n) => ({ ...n, read: true })));
        fetch("/api/notifications/read", { method: "POST" }).catch(() => {});
      }
    }
  }

  function goTo(n: NotificationItem) {
    setOpen(false);
    if (n.type === "FOLLOW" && n.actor) {
      router.push(`/u/${n.actor.username ?? n.actor.id}`);
    } else if (n.post) {
      router.push(`/p/${n.post.slug}#comentarios`);
    }
  }

  return (
    <div className="relative" ref={wrapRef}>
      <button
        onClick={handleOpen}
        aria-label="Notificaciones"
        className="relative hidden sm:flex items-center justify-center w-[42px] h-[42px] rounded-[11px] border border-zinc-100 bg-white hover:bg-zinc-50 transition-colors"
      >
        <Bell className="w-[19px] h-[19px] text-zinc-600" strokeWidth={1.8} />
        {unread > 0 && (
          <span
            className="absolute -top-1 -right-1 flex items-center justify-center text-white font-bold rounded-full bg-blue-600 border-2 border-white"
            style={{ minWidth: 18, height: 18, fontSize: 10, padding: "0 4px" }}
          >
            {unread > 9 ? "9+" : unread}
          </span>
        )}
      </button>

      {open && (
        <div
          className="absolute right-0 mt-2 w-[340px] max-w-[calc(100vw-2rem)] bg-white border border-zinc-200 rounded-2xl shadow-xl overflow-hidden z-50"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-100">
            <span className="font-bold text-zinc-900 text-sm">Notificaciones</span>
          </div>

          <div className="max-h-[380px] overflow-y-auto">
            {loading ? (
              <p className="px-4 py-8 text-center text-sm text-zinc-400">Cargando…</p>
            ) : items.length === 0 ? (
              <div className="px-4 py-10 text-center">
                <Bell className="w-7 h-7 mx-auto text-zinc-300 mb-2" strokeWidth={1.6} />
                <p className="text-sm text-zinc-500 font-medium">Sin notificaciones todavía</p>
                <p className="text-xs text-zinc-400 mt-1">Aquí verás cuando interactúen con tu contenido.</p>
              </div>
            ) : (
              items.map((n) => {
                const Icon = ICONS[n.type];
                const actorName = n.actor?.username ?? n.actor?.name ?? "Alguien";
                return (
                  <button
                    key={n.id}
                    onClick={() => goTo(n)}
                    className={`flex items-start gap-3 w-full text-left px-4 py-3 border-b border-zinc-50 hover:bg-zinc-50 transition-colors ${
                      n.read ? "" : "bg-blue-50/50"
                    }`}
                  >
                    <span className="relative shrink-0 mt-0.5">
                      {n.actor?.image ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={n.actor.image} alt="" className="w-9 h-9 rounded-full object-cover" />
                      ) : (
                        <span className="flex items-center justify-center w-9 h-9 rounded-full bg-zinc-200 text-zinc-600 font-bold text-sm">
                          {actorName[0].toUpperCase()}
                        </span>
                      )}
                      <span className="absolute -bottom-0.5 -right-0.5 flex items-center justify-center w-[18px] h-[18px] rounded-full bg-blue-600 border-2 border-white">
                        <Icon className="w-2.5 h-2.5 text-white" strokeWidth={2.4} />
                      </span>
                    </span>
                    <span className="flex-1 min-w-0">
                      <span className="block text-sm text-zinc-800 leading-snug">
                        <span className="font-semibold">{actorName}</span> {MESSAGES[n.type]}
                      </span>
                      {n.post && (
                        <span className="block text-xs text-zinc-500 truncate mt-0.5">{n.post.title}</span>
                      )}
                      <span className="block text-[11px] text-zinc-400 mt-0.5">{timeAgo(new Date(n.createdAt))}</span>
                    </span>
                    {!n.read && <span className="shrink-0 mt-2 w-2 h-2 rounded-full bg-blue-600" />}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
