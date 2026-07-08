import Link from "next/link";
import { MessageSquare } from "lucide-react";

export interface RelatedPost {
  slug: string;
  title: string;
  voteCount: number;
  commentCount: number;
  category: { name: string; emoji: string; color: string };
}

export function RelatedPosts({ posts }: { posts: RelatedPost[] }) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-8" style={{ fontFamily: "var(--font-manrope)" }}>
      <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wide mb-3">
        También podría interesarte
      </h2>
      <div className="flex gap-3 overflow-x-auto pb-2 no-scrollbar snap-x snap-mandatory -mx-1 px-1">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/p/${p.slug}`}
            className="snap-start shrink-0 w-[260px] bg-white border border-zinc-200 rounded-2xl p-4 hover:border-zinc-300 hover:shadow-sm transition-all group"
          >
            <span
              className="inline-block rounded-full font-medium mb-2"
              style={{ backgroundColor: p.category.color + "20", color: p.category.color, fontSize: 11, padding: "2px 8px" }}
            >
              {p.category.emoji} {p.category.name}
            </span>
            <p className="font-semibold text-zinc-900 leading-snug line-clamp-2 group-hover:text-accent-700 transition-colors" style={{ fontSize: 13 }}>
              {p.title}
            </p>
            <div className="mt-2 flex items-center gap-3 text-zinc-400" style={{ fontSize: 11 }}>
              <span>▲ {p.voteCount}</span>
              <span className="flex items-center gap-1"><MessageSquare className="w-3 h-3" />{p.commentCount}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
