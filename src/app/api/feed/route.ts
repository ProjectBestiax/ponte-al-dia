import { NextRequest, NextResponse } from "next/server";
import { getNewPosts, getTrendingPosts, getRisingPosts, getTopPosts, type TopPeriod } from "@/lib/posts";

export const dynamic = "force-dynamic";

const VALID_PERIODS: TopPeriod[] = ["day", "week", "month", "all"];

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const tab = searchParams.get("tab") ?? "new";
  const categoria = searchParams.get("categoria") ?? undefined;
  const page = parseInt(searchParams.get("pagina") ?? "1");
  const periodo = searchParams.get("periodo") ?? "all";

  let posts;
  switch (tab) {
    case "trending":
      posts = await getTrendingPosts(categoria, page);
      break;
    case "rising":
      posts = await getRisingPosts(categoria);
      break;
    case "top":
      posts = await getTopPosts(
        VALID_PERIODS.includes(periodo as TopPeriod) ? (periodo as TopPeriod) : "all",
        categoria,
        page,
      );
      break;
    default:
      posts = await getNewPosts(categoria, page);
  }

  return NextResponse.json(posts);
}
