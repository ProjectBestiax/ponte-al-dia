import { db } from "@/lib/db";

/**
 * Creates the right notification(s) for a freshly-created comment.
 *
 * - Top-level comment on a post  → notify the post author (COMMENT_ON_POST)
 * - Reply to a comment           → notify the parent comment's author (REPLY_TO_COMMENT)
 *
 * Self-actions never notify (you don't get pinged for your own comment).
 * Fire-and-forget: callers should not await this on the request's critical path.
 */
export async function notifyOnComment(params: {
  commentId: string;
  postId: string;
  actorId: string;
  parentId: string | null;
}): Promise<void> {
  const { commentId, postId, actorId, parentId } = params;

  try {
    if (parentId) {
      // Reply → notify the parent comment's author
      const parent = await db.comment.findUnique({
        where: { id: parentId },
        select: { userId: true },
      });
      if (parent && parent.userId !== actorId) {
        await db.notification.create({
          data: {
            type: "REPLY_TO_COMMENT",
            userId: parent.userId,
            actorId,
            postId,
            commentId,
          },
        });
      }
      return;
    }

    // Top-level comment → notify the post author
    const post = await db.post.findUnique({
      where: { id: postId },
      select: { userId: true },
    });
    if (post && post.userId !== actorId) {
      await db.notification.create({
        data: {
          type: "COMMENT_ON_POST",
          userId: post.userId,
          actorId,
          postId,
          commentId,
        },
      });
    }
  } catch {
    // Notifications must never break the underlying action.
  }
}
