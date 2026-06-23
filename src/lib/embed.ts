export type EmbedType = "youtube" | "tiktok" | "twitter" | "instagram" | null;

export interface EmbedInfo {
  type: EmbedType;
  id: string;
  originalUrl: string;
}

export function detectEmbed(url: string): EmbedInfo | null {
  try {
    const u = new URL(url);
    const host = u.hostname.replace("www.", "");

    // YouTube
    if (host === "youtube.com" || host === "youtu.be") {
      let id =
        u.searchParams.get("v") ??
        (host === "youtu.be" ? u.pathname.slice(1) : null) ??
        u.pathname.match(/\/(?:embed|shorts|v)\/([^/?]+)/)?.[1] ??
        null;
      if (id) return { type: "youtube", id, originalUrl: url };
    }

    // TikTok
    if (host === "tiktok.com" || host === "vm.tiktok.com") {
      const id = u.pathname.match(/\/video\/(\d+)/)?.[1] ?? u.pathname.slice(1);
      if (id) return { type: "tiktok", id, originalUrl: url };
    }

    // Twitter / X
    if (host === "twitter.com" || host === "x.com") {
      const id = u.pathname.match(/\/status\/(\d+)/)?.[1] ?? null;
      if (id) return { type: "twitter", id, originalUrl: url };
    }

    // Instagram
    if (host === "instagram.com") {
      const id = u.pathname.match(/\/(?:p|reel|tv)\/([^/]+)/)?.[1] ?? null;
      if (id) return { type: "instagram", id, originalUrl: url };
    }

    return null;
  } catch {
    return null;
  }
}
