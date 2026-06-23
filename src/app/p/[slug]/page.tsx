import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { timeAgo } from "@/lib/utils";
import { ExternalLink, MessageSquare } from "lucide-react";
import { VoteButtons } from "./VoteButtons";
import { CommentForm } from "./CommentForm";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await db.post.findUnique({
    where: { slug, status: "ACTIVE" },
    select: {
      title: true,
      description: true,
      aiSummary: true,
      voteCount: true,
      category: { select: { name: true, emoji: true } },
    },
  });
  if (!post) return { title: "Post no encontrado" };

  const ogUrl = new URL(`${process.env.NEXT_PUBLIC_APP_URL}/api/og`);
  ogUrl.searchParams.set("title", post.title);
  ogUrl.searchParams.set("category", post.category.name);
  ogUrl.searchParams.set("emoji", post.category.emoji);
  ogUrl.searchParams.set("votes", String(post.voteCount));

  return {
    title: post.title,
    description: post.description ?? post.aiSummary ?? undefined,
    openGraph: {
      title: post.title,
      description: post.description ?? post.aiSummary ?? undefined,
      images: [{ url: ogUrl.toString(), width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      images: [ogUrl.toString()],
    },
  };
}

export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;
  const session = await auth();

  // Primero buscamos el post sin filtrar por status para detectar pendientes
  const post = await db.post.findUnique({
    where: { slug },
    include: {
      user: { select: { name: true, username: true, image: true } },
      category: true,
      comments: {
        where: { parentId: null },
        include: {
          user: { select: { name: true, username: true, image: true } },
          replies: {
            include: {
              user: { select: { name: true, username: true, image: true } },
            },
            orderBy: { createdAt: "asc" },
          },
        },
        orderBy: { score: "desc" },
      },
    },
  });

  if (!post) notFound();

  // Posts eliminados: 404 siempre
  if (post.status === "REMOVED") notFound();

  // Posts pendientes: mensaje de espera (solo el autor y admins pueden verlo)
  if (post.status === "PENDING") {
    const isOwner = session?.user?.id === post.userId;
    // @ts-expect-error extended session
    const isAdmin = session?.user?.role === "ADMIN" || session?.user?.role === "MODERATOR";
    if (!isOwner && !isAdmin) notFound();

    return (
      <div className="max-w-2xl mx-auto text-center py-20">
        <div className="text-5xl mb-4">⏳</div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">Post publicado — pendiente de aprobación</h1>
        <p className="text-gray-500 mb-6">
          Tu post <span className="font-medium text-gray-700">&ldquo;{post.title}&rdquo;</span> está en cola de moderación.
          Aparecerá en el feed en breve.
        </p>
        <a href="/" className="inline-block px-5 py-2.5 bg-indigo-600 text-white text-sm font-medium rounded-lg hover:bg-indigo-700 transition-colors">
          Volver al inicio
        </a>
      </div>
    );
  }

  // Incrementar views (fire and forget)
  db.post.update({ where: { id: post.id }, data: { viewCount: { increment: 1 } } }).catch(() => {});

  // Voto del usuario
  let userVote = 0;
  if (session?.user?.id) {
    const vote = await db.vote.findUnique({
      where: { userId_postId: { userId: session.user.id, postId: post.id } },
    });
    userVote = vote?.value ?? 0;
  }

  const authorName = post.user.username ?? post.user.name ?? "Anónimo";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DiscussionForumPosting",
    headline: post.title,
    description: post.description ?? undefined,
    url: `${process.env.NEXT_PUBLIC_APP_URL}/p/${post.slug}`,
    datePublished: post.publishedAt ?? post.createdAt,
    author: {
      "@type": "Person",
      name: authorName,
    },
    interactionStatistic: [
      { "@type": "InteractionCounter", interactionType: "https://schema.org/LikeAction", userInteractionCount: post.voteCount },
      { "@type": "InteractionCounter", interactionType: "https://schema.org/CommentAction", userInteractionCount: post.commentCount },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto">
      <JsonLd data={jsonLd} />
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-4">
        <Link href="/" className="hover:text-gray-700">Inicio</Link>
        {" › "}
        <Link href={`/?categoria=${post.category.slug}`} className="hover:text-gray-700">
          {post.category.emoji} {post.category.name}
        </Link>
      </div>

      {/* Post header */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6">
        <div className="flex gap-4">
          {/* Votes */}
          <VoteButtons
            postId={post.id}
            initialVotes={post.voteCount}
            initialUserVote={userVote}
            isLoggedIn={!!session}
          />

          {/* Content */}
          <div className="flex-1 min-w-0">
            <span
              className="inline-block text-xs font-medium px-2 py-0.5 rounded-full mb-2"
              style={{ backgroundColor: post.category.color + "20", color: post.category.color }}
            >
              {post.category.emoji} {post.category.name}
            </span>

            <h1 className="text-xl font-bold text-gray-900 leading-snug">{post.title}</h1>

            {post.url && (
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 mt-2 text-sm text-indigo-600 hover:underline"
              >
                <ExternalLink className="w-4 h-4" />
                {new URL(post.url).hostname.replace("www.", "")}
              </a>
            )}

            {post.description && (
              <p className="mt-3 text-gray-700 leading-relaxed">{post.description}</p>
            )}

            {post.aiSummary && (
              <div className="mt-4 bg-indigo-50 border border-indigo-100 rounded-lg p-3">
                <p className="text-xs font-semibold text-indigo-600 mb-1">🤖 Resumen IA</p>
                <p className="text-sm text-gray-700">{post.aiSummary}</p>
              </div>
            )}

            <div className="mt-4 flex items-center gap-3 text-xs text-gray-400">
              <span>por <span className="font-medium text-gray-600">{authorName}</span></span>
              <span>{timeAgo(post.createdAt)}</span>
              <span className="flex items-center gap-1">
                <MessageSquare className="w-3.5 h-3.5" />
                {post.commentCount} comentarios
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Comments */}
      <div id="comentarios" className="mt-8">
        <h2 className="text-lg font-bold text-gray-900 mb-4">
          Comentarios ({post.commentCount})
        </h2>

        {session ? (
          <CommentForm postId={post.id} />
        ) : (
          <div className="mb-6 p-4 bg-gray-50 border border-gray-200 rounded-xl text-sm text-gray-600 text-center">
            <Link href="/login" className="text-indigo-600 font-medium hover:underline">Entra</Link> para comentar
          </div>
        )}

        <div className="space-y-4">
          {post.comments.map((comment) => (
            <div key={comment.id} className="bg-white border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
                <span className="font-medium text-gray-700">
                  {comment.user.username ?? comment.user.name ?? "Anónimo"}
                </span>
                <span>{timeAgo(comment.createdAt)}</span>
              </div>
              <p className="text-sm text-gray-800 whitespace-pre-wrap">{comment.content}</p>

              {comment.replies.length > 0 && (
                <div className="mt-3 pl-4 border-l-2 border-gray-100 space-y-3">
                  {comment.replies.map((reply) => (
                    <div key={reply.id}>
                      <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                        <span className="font-medium text-gray-700">
                          {reply.user.username ?? reply.user.name ?? "Anónimo"}
                        </span>
                        <span>{timeAgo(reply.createdAt)}</span>
                      </div>
                      <p className="text-sm text-gray-800">{reply.content}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
