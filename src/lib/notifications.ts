import { db } from "@/lib/db";
import { sendEmail, getUnsubscribeToken, unsubscribeUrl } from "@/lib/email";
import { commentEmail, followEmail, alertEmail } from "@/lib/email-templates";

type CommentNotificationType = "COMMENT_ON_POST" | "REPLY_TO_COMMENT";

export interface NotifyResult {
  recipientId: string;
  type: CommentNotificationType;
}

/**
 * Creates the right in-app notification for a freshly-created comment and returns
 * who should be emailed (or null when nobody should be notified).
 *
 * - Top-level comment on a post → notify the post author (COMMENT_ON_POST)
 * - Reply to a comment          → notify the parent comment's author (REPLY_TO_COMMENT)
 *
 * Self-actions never notify. Swallows its own errors so it can't break the comment.
 */
export async function notifyOnComment(params: {
  commentId: string;
  postId: string;
  actorId: string;
  parentId: string | null;
}): Promise<NotifyResult | null> {
  const { commentId, postId, actorId, parentId } = params;

  try {
    let recipientId: string | null = null;
    let type: CommentNotificationType;

    if (parentId) {
      const parent = await db.comment.findUnique({ where: { id: parentId }, select: { userId: true } });
      if (!parent || parent.userId === actorId) return null;
      recipientId = parent.userId;
      type = "REPLY_TO_COMMENT";
    } else {
      const post = await db.post.findUnique({ where: { id: postId }, select: { userId: true } });
      if (!post || post.userId === actorId) return null;
      recipientId = post.userId;
      type = "COMMENT_ON_POST";
    }

    await db.notification.create({
      data: { type, userId: recipientId, actorId, postId, commentId },
    });

    return { recipientId, type };
  } catch {
    return null;
  }
}

/**
 * Sends the transactional email for a comment notification, respecting the
 * recipient's `emailReplies` preference. Meant to run via `after()` so it never
 * blocks the response. Swallows its own errors.
 */
export async function sendCommentEmail(params: {
  recipientId: string;
  actorId: string;
  type: CommentNotificationType;
  postId: string;
  snippet: string;
}): Promise<void> {
  try {
    const [recipient, actor, post] = await Promise.all([
      db.user.findUnique({
        where: { id: params.recipientId },
        select: { email: true, emailReplies: true },
      }),
      db.user.findUnique({
        where: { id: params.actorId },
        select: { name: true, username: true, isAI: true },
      }),
      db.post.findUnique({ where: { id: params.postId }, select: { title: true, slug: true } }),
    ]);

    if (!recipient?.email || !recipient.emailReplies || !post) return;
    // Don't email "an AI replied to you" — the in-app notification (badged) is enough.
    if (actor?.isAI) return;

    const token = await getUnsubscribeToken(params.recipientId);
    const actorName = actor?.username ?? actor?.name ?? "Alguien";
    const snippet = params.snippet.length > 240 ? params.snippet.slice(0, 240) + "…" : params.snippet;

    const { subject, html } = commentEmail({
      type: params.type,
      actorName,
      postTitle: post.title,
      postSlug: post.slug,
      snippet,
      unsubLink: unsubscribeUrl(token, "replies"),
    });

    await sendEmail({ to: recipient.email, subject, html });
  } catch {
    // never break anything on email failure
  }
}

/**
 * Creates the in-app FOLLOW notification for the followed user. Awaited (single
 * insert). Swallows its own errors so it can't break the follow action.
 */
export async function notifyOnFollow(params: { followerId: string; followingId: string }): Promise<void> {
  try {
    await db.notification.create({
      data: { type: "FOLLOW", userId: params.followingId, actorId: params.followerId },
    });
  } catch {
    // ignore
  }
}

/**
 * Sends the "new follower" email, respecting the recipient's emailReplies
 * preference (the general interactions bucket). Run via after(). Swallows errors.
 */
export async function sendFollowEmail(params: { followerId: string; followingId: string }): Promise<void> {
  try {
    const [recipient, actor] = await Promise.all([
      db.user.findUnique({ where: { id: params.followingId }, select: { email: true, emailReplies: true } }),
      db.user.findUnique({ where: { id: params.followerId }, select: { name: true, username: true, id: true } }),
    ]);
    if (!recipient?.email || !recipient.emailReplies || !actor) return;

    const token = await getUnsubscribeToken(params.followingId);
    const actorName = actor.username ?? actor.name ?? "Alguien";
    const { subject, html } = followEmail({
      actorName,
      actorHandle: actor.username ?? actor.id,
      unsubLink: unsubscribeUrl(token, "replies"),
    });
    await sendEmail({ to: recipient.email, subject, html });
  } catch {
    // never break anything on email failure
  }
}

/**
 * Checks all users' alert keywords against a newly-published post and creates
 * KEYWORD_ALERT notifications (+ optional email) for each match.
 * Call this wherever a post becomes ACTIVE (bot routes, moderation approval).
 * Skips the post's own author. Swallows its own errors.
 */
export async function notifyKeywordMatches(post: {
  id: string;
  title: string;
  description?: string | null;
  userId: string;
}): Promise<number> {
  try {
    const text = `${post.title} ${post.description ?? ""}`.toLowerCase();

    const allKeywords = await db.alertKeyword.findMany({
      where: { NOT: { userId: post.userId } },
      select: { userId: true, keyword: true, notifyEmail: true },
    });

    const matchesByUser = new Map<string, { keyword: string; notifyEmail: boolean }>();
    for (const ak of allKeywords) {
      if (text.includes(ak.keyword)) {
        if (!matchesByUser.has(ak.userId)) {
          matchesByUser.set(ak.userId, { keyword: ak.keyword, notifyEmail: ak.notifyEmail });
        }
      }
    }

    if (matchesByUser.size === 0) return 0;

    await db.notification.createMany({
      data: [...matchesByUser.entries()].map(([userId]) => ({
        type: "KEYWORD_ALERT" as const,
        userId,
        postId: post.id,
      })),
    });

    for (const [userId, { keyword, notifyEmail }] of matchesByUser) {
      if (!notifyEmail) continue;
      sendAlertEmail({ userId, postId: post.id, keyword }).catch(() => {});
    }

    return matchesByUser.size;
  } catch {
    return 0;
  }
}

async function sendAlertEmail(params: { userId: string; postId: string; keyword: string }): Promise<void> {
  const [user, post] = await Promise.all([
    db.user.findUnique({ where: { id: params.userId }, select: { email: true, emailReplies: true } }),
    db.post.findUnique({ where: { id: params.postId }, select: { title: true, slug: true } }),
  ]);
  if (!user?.email || !user.emailReplies || !post) return;

  const token = await getUnsubscribeToken(params.userId);
  const { subject, html } = alertEmail({
    keyword: params.keyword,
    postTitle: post.title,
    postSlug: post.slug,
    unsubLink: unsubscribeUrl(token, "replies"),
  });
  await sendEmail({ to: user.email, subject, html });
}
