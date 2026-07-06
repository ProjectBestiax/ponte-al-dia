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
      <h2 className="text-lg font-bold text-zinc-900 mb-3">También podría interesarte</h2>
      <div className="flex flex-col divide-y divide-zinc-100 border border-zinc-100 rounded-2xl overflow-hidden">
        {posts.map((p) => (
          <Link
            key={p.slug}
            href={`/p/${p.slug}`}
            className="flex items-center justify-between gap-4 px-4 py-3 hover:bg-zinc-50 transition-colors"
          >
            <div className="min-w-0">
              <p className="font-semibold text-zinc-900 leading-snug line-clamp-2" style={{ fontSize: 14 }}>
                {p.title}
              </p>
              <span
                className="inline-block mt-1 rounded-full font-medium"
                style={{ backgroundColor: p.category.color + "20", color: p.category.color, fontSize: 11, padding: "1px 8px" }}
              >
                {p.category.emoji} {p.category.name}
              </span>
            </div>
            <div className="shrink-0 flex items-center gap-3 text-zinc-400" style={{ fontFamily: "var(--font-jetbrains-mono)", fontSize: 12 }}>
              <span>▲ {p.voteCount}</span>
              <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />{p.commentCount}</span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
