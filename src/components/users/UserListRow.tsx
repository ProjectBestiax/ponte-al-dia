import Link from "next/link";
import { FollowButton } from "./FollowButton";

export interface RowUser {
  id: string;
  name: string | null;
  username: string | null;
  image: string | null;
  bio: string | null;
}

export function UserListRow({
  user,
  isLoggedIn,
  viewerFollows,
  isSelf,
}: {
  user: RowUser;
  isLoggedIn: boolean;
  viewerFollows: boolean;
  isSelf: boolean;
}) {
  const handle = user.username ?? user.id;
  const displayName = user.name ?? user.username ?? "Usuario";
  const initial = displayName[0].toUpperCase();

  return (
    <div className="flex items-center gap-3 py-3.5">
      <Link href={`/u/${handle}`} className="shrink-0">
        {user.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.image} alt="" className="rounded-full object-cover" style={{ width: 44, height: 44 }} />
        ) : (
          <div className="rounded-full flex items-center justify-center text-white font-bold" style={{ width: 44, height: 44, background: "#0A0A0A", fontSize: 17 }}>
            {initial}
          </div>
        )}
      </Link>
      <Link href={`/u/${handle}`} className="flex-1 min-w-0">
        <p className="font-bold text-zinc-900 truncate" style={{ fontSize: 14 }}>{displayName}</p>
        {user.username && <p className="text-zinc-400 truncate" style={{ fontSize: 12.5 }}>@{user.username}</p>}
        {user.bio && <p className="text-zinc-500 truncate mt-0.5" style={{ fontSize: 12.5 }}>{user.bio}</p>}
      </Link>
      {!isSelf && (
        <div className="shrink-0">
          <FollowButton targetUserId={user.id} initialFollowing={viewerFollows} isLoggedIn={isLoggedIn} size="sm" />
        </div>
      )}
    </div>
  );
}
