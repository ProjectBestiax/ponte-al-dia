import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { es } from "date-fns/locale";
import { User, Star, FileText, Calendar } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Mi perfil" };

export default async function PerfilPage() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  const user = await db.user.findUnique({
    where: { id: session.user.id },
    include: {
      posts: {
        where: { status: "ACTIVE" },
        orderBy: { createdAt: "desc" },
        take: 10,
        include: { category: true },
      },
    },
  });

  if (!user) redirect("/login");

  return (
    <div className="max-w-2xl mx-auto">
      {/* Avatar + datos */}
      <div className="bg-white border border-gray-200 rounded-xl p-6 flex items-start gap-5">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="avatar" className="w-16 h-16 rounded-full" />
        ) : (
          <div className="w-16 h-16 rounded-full bg-indigo-100 flex items-center justify-center">
            <User className="w-8 h-8 text-indigo-500" />
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h1 className="text-xl font-bold text-gray-900 truncate">
            {user.name ?? "Sin nombre"}
          </h1>
          <p className="text-sm text-gray-500 truncate">{user.email}</p>
          <div className="flex items-center gap-4 mt-3 text-sm text-gray-600">
            <span className="flex items-center gap-1">
              <Star className="w-4 h-4 text-amber-500" />
              {user.karma} karma
            </span>
            <span className="flex items-center gap-1">
              <FileText className="w-4 h-4 text-indigo-400" />
              {user.posts.length} posts
            </span>
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4 text-gray-400" />
              {formatDistanceToNow(user.createdAt, { addSuffix: true, locale: es })}
            </span>
          </div>
        </div>
      </div>

      {/* Posts recientes */}
      <div className="mt-6">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-3">
          Mis publicaciones
        </h2>
        {user.posts.length === 0 ? (
          <div className="bg-white border border-gray-200 rounded-xl p-8 text-center text-gray-500">
            <p>Aún no has publicado nada.</p>
            <a
              href="/publicar"
              className="inline-block mt-3 text-sm text-indigo-600 hover:underline"
            >
              Publicar algo →
            </a>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {user.posts.map((post) => (
              <a
                key={post.id}
                href={`/p/${post.slug}`}
                className="bg-white border border-gray-200 rounded-lg px-4 py-3 hover:border-indigo-300 transition-colors flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">{post.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    {post.category.emoji} {post.category.name} ·{" "}
                    {formatDistanceToNow(post.createdAt, { addSuffix: true, locale: es })}
                  </p>
                </div>
                <span className="text-xs font-medium text-indigo-600 shrink-0">
                  {post.voteCount} votos
                </span>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
