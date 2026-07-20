import { db } from "@/lib/db";
import { slugify } from "@/lib/utils";

const DEBATE_USER_SELECT = {
  name: true,
  username: true,
  image: true,
  isAI: true,
} as const;

export interface DebateListItem {
  id: string;
  title: string;
  slug: string;
  description: string;
  commentCount: number;
  viewCount: number;
  isPinned: boolean;
  createdAt: Date;
  lastCommentAt: Date;
  user: { name: string | null; username: string | null; image: string | null; isAI: boolean };
}

export interface DebateCommentItem {
  id: string;
  content: string;
  createdAt: Date;
  user: { name: string | null; username: string | null; image: string | null; isAI: boolean };
}

export interface DebateDetail {
  id: string;
  title: string;
  slug: string;
  description: string;
  status: string;
  commentCount: number;
  viewCount: number;
  createdAt: Date;
  user: {
    id: string;
    name: string | null;
    username: string | null;
    image: string | null;
    isAI: boolean;
  };
  comments: DebateCommentItem[];
}

export async function getDebates(page = 1, limit = 20): Promise<DebateListItem[]> {
  const skip = (page - 1) * limit;

  const debates = await db.debate.findMany({
    where: { status: "ACTIVE" },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      commentCount: true,
      viewCount: true,
      isPinned: true,
      createdAt: true,
      lastCommentAt: true,
      user: { select: DEBATE_USER_SELECT },
    },
    orderBy: [{ isPinned: "desc" }, { lastCommentAt: "desc" }],
    skip,
    take: limit,
  });

  return debates;
}

export async function getDebateBySlug(slug: string): Promise<DebateDetail | null> {
  const debate = await db.debate.findUnique({
    where: { slug, status: "ACTIVE" },
    select: {
      id: true,
      title: true,
      slug: true,
      description: true,
      status: true,
      commentCount: true,
      viewCount: true,
      createdAt: true,
      user: { select: { id: true, ...DEBATE_USER_SELECT } },
      comments: {
        select: {
          id: true,
          content: true,
          createdAt: true,
          user: { select: DEBATE_USER_SELECT },
        },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  if (!debate) return null;

  return debate;
}

export async function createDebate(input: {
  userId: string;
  title: string;
  description: string;
}): Promise<{ slug: string }> {
  const { userId, title, description } = input;

  let slug = slugify(title);
  const existing = await db.debate.findUnique({ where: { slug } });
  if (existing) slug = `${slug}-${Date.now()}`;

  const debate = await db.debate.create({
    data: {
      title,
      slug,
      description,
      userId,
      status: "ACTIVE",
    },
  });

  return { slug: debate.slug };
}
