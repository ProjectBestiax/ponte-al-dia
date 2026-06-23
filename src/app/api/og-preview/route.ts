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

    const get = (prop: string) => {
      const match =
        html.match(new RegExp(`<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']+)["']`, "i")) ??
        html.match(new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+property=["']${prop}["']`, "i"));
      return match?.[1]?.trim() ?? null;
    };

    const getTitle = () => {
      const og = get("og:title");
      if (og) return og;
      const match = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      return match?.[1]?.trim() ?? null;
    };

    const getDesc = () => {
      const og = get("og:description");
      if (og) return og;
      const match = html.match(/<meta[^>]+name=["']description["'][^>]+content=["']([^"']+)["']/i);
      return match?.[1]?.trim() ?? null;
    };

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
