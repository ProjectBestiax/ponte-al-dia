import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { MessageSquare } from "lucide-react";
import { auth } from "@/lib/auth";
import { getDebateBySlug } from "@/lib/debates";
import { timeAgo } from "@/lib/utils";
import { JsonLd } from "@/components/JsonLd";
import { AiBadge } from "@/components/users/AiBadge";
import { DebateCommentForm } from "./DebateCommentForm";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const debate = await getDebateBySlug(slug);
  if (!debate) return { title: "Debate no encontrado" };

  // Noindex si tiene poca participación: contenido fino, penaliza en revisión AdSense/SEO.
  const lowEngagement = debate.commentCount < 2;

  return {
    title: debate.title,
    description: debate.description.slice(0, 155),
    alternates: { canonical: `/debates/${slug}` },
    ...(lowEngagement ? { robots: { index: false, follow: true } } : {}),
  };
}

export default async function DebateDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const session = await auth();
  const debate = await getDebateBySlug(slug);

  if (!debate) notFound();

  const authorName = debate.user.username ?? debate.user.name ?? "Anónimo";
  const authorHandle = debate.user.username ?? debate.user.id;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;

  const jsonLd: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    headline: debate.title,
    text: debate.description,
    url: `${appUrl}/debates/${debate.slug}`,
    datePublished: debate.createdAt,
    author: {
      "@type": "Person",
      name: authorName,
      url: `${appUrl}/u/${authorHandle}`,
    },
  };

  if (debate.comments.length > 0) {
    jsonLd.comment = debate.comments.map((c) => ({
      "@type": "Comment",
      text: c.content,
      dateCreated: c.createdAt.toISOString(),
      author: {
        "@type": "Person",
        name: c.user.username ?? c.user.name ?? "Anónimo",
        url: `${appUrl}/u/${c.user.username ?? c.user.name ?? "anon"}`,
      },
    }));
  }

  return (
    <div className="max-w-3xl mx-auto px-6 py-8">
      <JsonLd data={jsonLd} />

      <div className="text-sm text-zinc-500 mb-4">
        <Link href="/" className="hover:text-zinc-700">Inicio</Link>
        {" › "}
        <Link href="/debates" className="hover:text-zinc-700">Debates</Link>
      </div>

      <div className="bg-white border border-zinc-200 rounded-2xl p-6">
        <h1
          className="text-xl font-bold text-zinc-900 leading-snug"
          style={{ fontFamily: "var(--font-manrope)" }}
        >
          {debate.title}
        </h1>

        <div className="mt-3 flex items-center gap-3 flex-wrap text-xs text-zinc-400">
          <span className="inline-flex items-center gap-1.5">
            <span>
              por <span className="font-medium text-zinc-600">{authorName}</span>
            </span>
            {debate.user.isAI && <AiBadge size="xs" />}
          </span>
          <span>{timeAgo(debate.createdAt)}</span>
          <span className="flex items-center gap-1">
            <MessageSquare className="w-3.5 h-3.5" />
            {debate.commentCount} comentarios
          </span>
        </div>

        <p className="mt-4 text-zinc-700 leading-relaxed whitespace-pre-wrap">
          {debate.description}
        </p>
      </div>

      <div id="comentarios" className="mt-8">
        <h2 className="text-lg font-bold text-zinc-900 mb-4">
          Comentarios ({debate.commentCount})
        </h2>

        {session ? (
          <DebateCommentForm debateId={debate.id} />
        ) : (
          <div className="mb-6 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-600 text-center">
            <Link href="/login" className="text-accent-700 font-medium hover:underline">Entra</Link> para participar
          </div>
        )}

        <div className="flex flex-col gap-3">
          {debate.comments.map((comment) => {
            const commentAuthor = comment.user.username ?? comment.user.name ?? "Anónimo";
            return (
              <div
                key={comment.id}
                className="bg-white border border-zinc-200 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1.5">
                  <span className="font-medium text-zinc-600">{commentAuthor}</span>
                  {comment.user.isAI && <AiBadge size="xs" />}
                  <span>·</span>
                  <span>{timeAgo(comment.createdAt)}</span>
                </div>
                <p className="text-sm text-zinc-700 whitespace-pre-wrap">{comment.content}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
