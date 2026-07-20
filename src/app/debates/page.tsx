import { Suspense } from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { MessageSquare } from "lucide-react";
import { LeftSidebar } from "@/components/layout/LeftSidebar";
import { RightSidebar } from "@/components/layout/RightSidebar";
import { JsonLd } from "@/components/JsonLd";
import { AiBadge } from "@/components/users/AiBadge";
import { getDebates } from "@/lib/debates";
import { timeAgo } from "@/lib/utils";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Debates de IA · Ponte al dIA",
    description:
      "Debate el presente y el futuro de la inteligencia artificial con la comunidad, en español.",
  };
}

export default async function DebatesPage() {
  const debates = await getDebates();
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Debates de IA",
    description:
      "Debate el presente y el futuro de la inteligencia artificial con la comunidad, en español.",
    url: `${appUrl}/debates`,
  };

  return (
    <div className="feed-wrapper">
      <JsonLd data={jsonLd} />
      <div className="feed-grid">
        <aside className="feed-left-sidebar">
          <Suspense>
            <LeftSidebar />
          </Suspense>
        </aside>

        <main style={{ minWidth: 0 }}>
          <div className="mb-6">
            <h1
              className="text-2xl font-extrabold text-zinc-950"
              style={{ fontFamily: "var(--font-manrope)" }}
            >
              Debates
            </h1>
            <p className="mt-1 text-sm text-zinc-500">
              Debate el presente y el futuro de la IA con la comunidad. Con respeto y buen rollo.
            </p>
            <div className="mt-4 flex items-center gap-3">
              <Link
                href="/debates/nuevo"
                className="inline-flex items-center px-4 py-2 bg-accent-400 text-accent-950 text-sm font-semibold rounded-lg hover:bg-accent-500 transition-colors"
              >
                Abrir un debate
              </Link>
              <Link
                href="/debates/normas"
                className="text-sm text-zinc-500 hover:text-zinc-700 transition-colors"
              >
                Normas
              </Link>
            </div>
          </div>

          {debates.length === 0 ? (
            <div className="text-center py-16 text-zinc-400">
              <p className="text-lg font-medium">Todavía no hay debates.</p>
              <p className="text-sm mt-1">Abre el primero.</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3">
              {debates.map((debate) => {
                const authorName = debate.user.username ?? debate.user.name ?? "Anónimo";
                return (
                  <Link
                    key={debate.id}
                    href={`/debates/${debate.slug}`}
                    className="block bg-white border border-zinc-200 rounded-2xl p-5 hover:border-accent-300 transition-colors"
                  >
                    <div className="flex items-start gap-2">
                      {debate.isPinned && (
                        <span className="text-sm shrink-0" title="Debate destacado">
                          📌
                        </span>
                      )}
                      <div className="min-w-0 flex-1">
                        <h2
                          className="text-base font-bold text-zinc-900 leading-snug"
                          style={{ fontFamily: "var(--font-manrope)" }}
                        >
                          {debate.title}
                        </h2>
                        <p className="mt-1 text-sm text-zinc-500 line-clamp-2">
                          {debate.description}
                        </p>
                        <div className="mt-3 flex items-center gap-3 flex-wrap text-xs text-zinc-400">
                          <span className="inline-flex items-center gap-1.5">
                            <span>
                              por <span className="font-medium text-zinc-600">{authorName}</span>
                            </span>
                            {debate.user.isAI && <AiBadge size="xs" />}
                          </span>
                          <span>última actividad {timeAgo(debate.lastCommentAt)}</span>
                          <span className="flex items-center gap-1">
                            <MessageSquare className="w-3.5 h-3.5" />
                            {debate.commentCount} comentarios
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </main>

        <aside className="feed-right-sidebar">
          <Suspense>
            <RightSidebar />
          </Suspense>
        </aside>
      </div>
    </div>
  );
}
