import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "Missing url" }, { status: 400 });

  try {
    new URL(url); // valida formato
  } catch {
    return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
  }

  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 (compatible; PonteAlDIA/1.0)" },
      signal: AbortSignal.timeout(5000),
    });

    if (!res.ok) throw new Error("Fetch failed");
    const html = await res.text();

    const getMeta = (prop: string) => {
      const m =
        html.match(new RegExp(`<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']+)["']`, "i")) ??
        html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${prop}["']`, "i")) ??
        html.match(new RegExp(`<meta[^>]+name=["']${prop}["'][^>]+content=["']([^"']+)["']`, "i")) ??
        html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${prop}["']`, "i"));
      return m?.[1]?.trim() ?? null;
    };

    const get = (prop: string) => getMeta(prop);

    const cleanTitle = (raw: string) =>
      raw
        .replace(/\s*[|\-–—·•]\s*.{1,60}$/, "")  // strip " | Site Name" suffixes
        .replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#39;/g, "'")
        .trim();

    const getTitle = () => {
      const og = getMeta("og:title") ?? getMeta("twitter:title");
      if (og) return cleanTitle(og).slice(0, 80);
      const tagMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      if (tagMatch?.[1]) return cleanTitle(tagMatch[1]).slice(0, 80);
      const h1 = html.match(/<h1[^>]*>([^<]{10,})<\/h1>/i);
      return h1?.[1]?.trim().slice(0, 80) ?? null;
    };

    const getDesc = () => {
      const og = getMeta("og:description") ?? getMeta("twitter:description") ?? getMeta("description");
      if (og) return og;
      // Fallback: first long <p> outside nav/header/footer
      const pMatch = html.match(/<p[^>]*>([^<]{80,})<\/p>/i);
      return pMatch?.[1]?.trim() ?? null;
    };

    // For X/Twitter tweet URLs, og:title = "User on X" (useless).
    // The actual tweet text lives in og:description — use it as the title instead.
    const parsedUrl = new URL(url);
    const host = parsedUrl.hostname.replace("www.", "");
    const isXTweet =
      (host === "x.com" || host === "twitter.com") &&
      parsedUrl.pathname.includes("/status/");

    if (isXTweet) {
      const tweetText = getDesc();
      return NextResponse.json({
        title: tweetText ? tweetText.slice(0, 200) : getTitle(),
        description: null,
        image: get("og:image"),
        siteName: "X",
      });
    }

    return NextResponse.json({
      title: getTitle(),
      description: getDesc(),
      image: get("og:image"),
      siteName: get("og:site_name"),
    });
  } catch {
    return NextResponse.json({ error: "Could not fetch metadata" }, { status: 422 });
  }
}
