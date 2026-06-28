import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { db } from "@/lib/db";
import { AdminActions } from "./AdminActions";

export const metadata = { title: "Moderación" };

export default async function AdminPage() {
  const session = await auth();
  // @ts-expect-error extended session
  const role = session?.user?.role;
  if (!session || (role !== "ADMIN" && role !== "MODERATOR")) redirect("/");

  const [pendingPosts, recentPosts] = await Promise.all([
    db.post.findMany({
      where: { status: "PENDING" },
      include: {
        user: { select: { name: true, email: true } },
        category: { select: { name: true, emoji: true } },
      },
      orderBy: { createdAt: "asc" },
      take: 50,
    }),
    db.post.findMany({
      where: { status: "ACTIVE" },
      include: {
        user: { select: { name: true } },
        category: { select: { name: true, emoji: true } },
      },
      orderBy: { createdAt: "desc" },
      take: 20,
    }),
  ]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <h1 className="text-2xl font-bold text-zinc-900 mb-6">Panel de Moderación</h1>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-yellow-700">{pendingPosts.length}</div>
          <div className="text-sm text-yellow-600">Pendientes</div>
        </div>
        <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-green-700">{recentPosts.length}</div>
          <div className="text-sm text-green-600">Activos recientes</div>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-center">
          <div className="text-2xl font-bold text-blue-700">
            {pendingPosts.length + recentPosts.length}
          </div>
          <div className="text-sm text-blue-600">Total revisados hoy</div>
        </div>
      </div>

      {/* Posts pendientes */}
      <h2 className="text-lg font-bold text-zinc-900 mb-4">
        Pendientes de aprobación ({pendingPosts.length})
      </h2>

      {pendingPosts.length === 0 ? (
        <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center text-green-700">
          ✓ Sin posts pendientes
        </div>
      ) : (
        <div className="space-y-3 mb-8">
          {pendingPosts.map((post) => (
            <div key={post.id} className="bg-white border border-zinc-200 rounded-xl p-4">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-zinc-500 mb-1">
                    {post.category.emoji} {post.category.name} · {post.user.name} ({post.user.email})
                  </div>
                  <h3 className="font-semibold text-zinc-900 text-sm">{post.title}</h3>
                  {post.url && (
                    <a href={post.url} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-blue-600 hover:underline mt-0.5 block truncate">
                      {post.url}
                    </a>
                  )}
                  {post.description && (
                    <p className="text-xs text-zinc-500 mt-1 line-clamp-2">{post.description}</p>
                  )}
                </div>
                <AdminActions postId={post.id} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
