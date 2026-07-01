"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { UserPlus, Check } from "lucide-react";

interface Props {
  targetUserId: string;
  initialFollowing: boolean;
  isLoggedIn: boolean;
  size?: "sm" | "md";
}

export function FollowButton({ targetUserId, initialFollowing, isLoggedIn, size = "md" }: Props) {
  const router = useRouter();
  const [following, setFollowing] = useState(initialFollowing);
  const [hovering, setHovering] = useState(false);
  const inFlight = useRef(false);

  async function toggle() {
    if (!isLoggedIn) {
      router.push("/login");
      return;
    }
    if (inFlight.current) return;
    inFlight.current = true;

    const next = !following;
    setFollowing(next); // optimistic
    try {
      const res = await fetch(`/api/users/${targetUserId}/follow`, { method: next ? "POST" : "DELETE" });
      if (!res.ok) {
        setFollowing(!next); // revert
        if (res.status === 401) router.push("/login");
      }
    } catch {
      setFollowing(!next); // revert
    } finally {
      inFlight.current = false;
    }
  }

  const pad = size === "sm" ? "px-3 h-[30px] text-[12.5px]" : "px-4 h-[36px] text-[13.5px]";

  if (following) {
    return (
      <button
        onClick={toggle}
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
        className={`inline-flex items-center justify-center gap-1.5 rounded-full font-bold border transition-colors ${pad} ${
          hovering
            ? "border-red-200 bg-red-50 text-red-600"
            : "border-zinc-200 bg-white text-zinc-600"
        }`}
        style={{ fontFamily: "var(--font-manrope)", minWidth: size === "sm" ? 96 : 112 }}
      >
        {hovering ? "Dejar de seguir" : (<><Check className="w-3.5 h-3.5" strokeWidth={2.6} /> Siguiendo</>)}
      </button>
    );
  }

  return (
    <button
      onClick={toggle}
      className={`inline-flex items-center justify-center gap-1.5 rounded-full font-bold bg-blue-600 text-white hover:bg-blue-700 transition-colors ${pad}`}
      style={{ fontFamily: "var(--font-manrope)", minWidth: size === "sm" ? 96 : 112 }}
    >
      <UserPlus className="w-3.5 h-3.5" strokeWidth={2.4} /> Seguir
    </button>
  );
}
