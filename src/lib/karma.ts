export const KARMA = {
  POST_CREATED: 5,
  COMMENT_CREATED: 2,
  VOTE_RECEIVED: 1,       // per upvote on your post (downvote = -1)
  VOTE_CAST: 1,           // for voting on someone else's post
  BOOKMARK: 1,
  SHARE_SOCIAL: 3,        // X, WhatsApp, LinkedIn
  SHARE_COPY: 2,          // copy link
  DAILY_VOTE_CAP: 20,     // max karma from casting votes per day
} as const;

export const SHARE_PLATFORMS = ["x", "whatsapp", "linkedin", "copy"] as const;
export type SharePlatform = (typeof SHARE_PLATFORMS)[number];

export function karmaForShare(platform: SharePlatform): number {
  return platform === "copy" ? KARMA.SHARE_COPY : KARMA.SHARE_SOCIAL;
}
