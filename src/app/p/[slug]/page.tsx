import { notFound } from "next/navigation";
import Link from "next/link";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";
import { timeAgo } from "@/lib/utils";
import { ExternalLink, MessageSquare } from "lucide-react";
import { VoteButtons } from "./VoteButtons";
import { CommentForm } from "./CommentForm";
import { CommentThread } from "./CommentThread";
import type { Metadata } from "next";
import { JsonLd } from "@/components/JsonLd";
import { EmbedPlayer } from "@/components/posts/EmbedPlayer";
import { detectEmbed } from "@/lib/embed";

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
      tags: { include: { tag: { select: { name: true, slug: true } } } },
      comments: {
        where: { parentId: null },
        include: {
          user: { select: { name: true, username: true, image: true } },
          reactions: { select: { type: true, userId: true } },
          replies: {
            include: {
              user: { select: { name: true, username: true, image: true } },
              reactions: { select: { type: true, userId: true } },
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
        <h1 className="text-xl font-bold text-zinc-900 mb-2">Post publicado — pendiente de aprobación</h1>
        <p className="text-zinc-500 mb-6">
          Tu post <span className="font-medium text-zinc-700">&ldquo;{post.title}&rdquo;</span> está en cola de moderación.
          Aparecerá en el feed en breve.
        </p>
        <a href="/" className="inline-block px-5 py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-lg hover:bg-zinc-700 transition-colors">
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
    <div className="max-w-3xl mx-auto px-6 py-8">
      <JsonLd data={jsonLd} />
      {/* Breadcrumb */}
      <div className="text-sm text-zinc-500 mb-4">
        <Link href="/" className="hover:text-zinc-700">Inicio</Link>
        {" › "}
        <Link href={`/?categoria=${post.category.slug}`} className="hover:text-zinc-700">
          {post.category.emoji} {post.category.name}
        </Link>
      </div>

      {/* Post header */}
      <div className="bg-white border border-zinc-200 rounded-2xl p-6">
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
            <div className="flex items-center gap-1.5 flex-wrap mb-2">
              <span
                className="inline-block text-xs font-medium px-2 py-0.5 rounded-full"
                style={{ backgroundColor: post.category.color + "20", color: post.category.color }}
              >
                {post.category.emoji} {post.category.name}
              </span>
              {post.tags.map(({ tag }) => (
                <span
                  key={tag.slug}
                  className="inline-block text-xs font-semibold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: "#F0FDFA", color: "#0F766E", border: "1px solid #99F6E4" }}
                >
                  {tag.name}
                </span>
              ))}
            </div>

            <h1 className="text-xl font-bold text-zinc-900 leading-snug">{post.title}</h1>

            {post.url && (
              <p className="mt-1.5 text-xs text-zinc-400">
                {new URL(post.url).hostname.replace("www.", "")}
              </p>
            )}

            {post.description && (
              <p className="mt-3 text-zinc-700 leading-relaxed">{post.description}</p>
            )}

            {post.aiSummary && (
              <div className="mt-4 bg-blue-50 border border-blue-100 rounded-lg p-3">
                <p className="text-xs font-semibold text-blue-600 mb-1">🤖 Resumen IA</p>
                <p className="text-sm text-zinc-700">{post.aiSummary}</p>
              </div>
            )}

            {/* Imagen del post */}
            {post.imageUrl && !detectEmbed(post.url ?? "") && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.imageUrl}
                alt={post.title}
                className="mt-4 w-full rounded-xl border border-zinc-200 object-cover max-h-80"
              />
            )}

            {/* Embed de vídeo (YouTube, TikTok, X, Instagram) */}
            {post.url && (() => {
              const embed = detectEmbed(post.url);
              return embed ? <EmbedPlayer embed={embed} /> : null;
            })()}

            {/* Prominent source CTA — below video/image */}
            {post.url && (
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 flex items-center justify-center gap-2.5 w-full px-5 py-3.5 bg-blue-600 text-white rounded-[12px] hover:bg-blue-700 transition-colors group"
              >
                  <ExternalLink className="w-4 h-4 shrink-0 text-blue-200" />
                  <span className="font-bold text-[14px]">Ver fuente original</span>
                  <span className="text-blue-300 text-[12px] truncate hidden sm:block">
                    {new URL(post.url).hostname.replace("www.", "")}
                  </span>
              </a>
            )}

            <div className="mt-4 flex items-center gap-3 text-xs text-zinc-400">
              <span>por <span className="font-medium text-zinc-600">{authorName}</span></span>
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
        <h2 className="text-lg font-bold text-zinc-900 mb-4">
          Comentarios ({post.commentCount})
        </h2>

        {session ? (
          <CommentForm postId={post.id} />
        ) : (
          <div className="mb-6 p-4 bg-zinc-50 border border-zinc-200 rounded-xl text-sm text-zinc-600 text-center">
            <Link href="/login" className="text-blue-600 font-medium hover:underline">Entra</Link> para comentar
          </div>
        )}

        <div className="flex flex-col gap-3">
          {post.comments.map((comment) => (
            <CommentThread
              key={comment.id}
              comment={{
                id: comment.id,
                content: comment.content,
                createdAt: comment.createdAt.toISOString(),
                user: comment.user,
                reactions: comment.reactions as { type: "THUMBS_UP" | "HEART" | "BROKEN_HEART" | "LAUGH" | "THUMBS_DOWN"; userId: string }[],
                replies: comment.replies.map(r => ({
                  id: r.id,
                  content: r.content,
                  createdAt: r.createdAt.toISOString(),
                  user: r.user,
                  reactions: r.reactions as { type: "THUMBS_UP" | "HEART" | "BROKEN_HEART" | "LAUGH" | "THUMBS_DOWN"; userId: string }[],
                })),
              }}
              postId={post.id}
              isLoggedIn={!!session}
              currentUserId={session?.user?.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
