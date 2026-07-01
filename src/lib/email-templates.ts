import { emailLayout, ctaButton, APP_URL } from "@/lib/email";

type CommentEmailType = "COMMENT_ON_POST" | "REPLY_TO_COMMENT";

const VERB: Record<CommentEmailType, string> = {
  COMMENT_ON_POST: "comentó en tu publicación",
  REPLY_TO_COMMENT: "respondió a tu comentario",
};

/** Email sent when someone comments on your post or replies to your comment. */
export function commentEmail(opts: {
  type: CommentEmailType;
  actorName: string;
  postTitle: string;
  postSlug: string;
  snippet: string;
  unsubLink: string;
}): { subject: string; html: string } {
  const action = VERB[opts.type];
  const postUrl = `${APP_URL}/p/${opts.postSlug}#comentarios`;
  const subject = `${opts.actorName} ${action}`;

  const body = `
    <p style="margin:0 0 14px;font-size:15px;line-height:1.55;color:#3f3f46;">
      <strong>${opts.actorName}</strong> ${action}:
    </p>
    <p style="margin:0 0 6px;font-size:13px;color:#71717a;">${opts.postTitle}</p>
    <blockquote style="margin:0 0 20px;padding:12px 14px;background:#f4f4f5;border-left:3px solid #2563eb;border-radius:8px;font-size:14px;color:#3f3f46;line-height:1.5;">
      ${opts.snippet}
    </blockquote>
    ${ctaButton(postUrl, "Ver y responder")}
  `;

  return {
    subject,
    html: emailLayout({ heading: "Tienes una nueva interacción", body, unsubLink: opts.unsubLink, unsubLabel: "Dejar de recibir avisos de comentarios" }),
  };
}

/** Email sent when someone starts following you. */
export function followEmail(opts: {
  actorName: string;
  actorHandle: string;
  unsubLink: string;
}): { subject: string; html: string } {
  const profileUrl = `${APP_URL}/u/${opts.actorHandle}`;
  const body = `
    <p style="margin:0 0 18px;font-size:15px;line-height:1.55;color:#3f3f46;">
      <strong>${opts.actorName}</strong> ha empezado a seguirte en Ponte al dIA.
    </p>
    ${ctaButton(profileUrl, "Ver su perfil")}
  `;
  return {
    subject: `${opts.actorName} ha empezado a seguirte`,
    html: emailLayout({ heading: "Tienes un nuevo seguidor", body, unsubLink: opts.unsubLink, unsubLabel: "Dejar de recibir estos avisos" }),
  };
}

export interface DigestPost {
  title: string;
  slug: string;
  voteCount: number;
  commentCount: number;
  categoryName: string;
  categoryEmoji: string;
}

/** Weekly "what happened in AI" digest of the top posts. */
export function digestEmail(opts: {
  posts: DigestPost[];
  unsubLink: string;
  rangeLabel: string;
}): { subject: string; html: string } {
  const rows = opts.posts
    .map(
      (p, i) => `
      <a href="${APP_URL}/p/${p.slug}" style="display:block;text-decoration:none;padding:14px 0;border-bottom:1px solid #f4f4f5;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
          <td valign="top" style="width:26px;font-weight:800;color:#d4d4d8;font-size:16px;">${i + 1}</td>
          <td valign="top">
            <div style="font-size:15px;font-weight:700;color:#0a0a0a;line-height:1.35;margin-bottom:4px;">${p.title}</div>
            <div style="font-size:12px;color:#a1a1aa;">${p.categoryEmoji} ${p.categoryName} · ▲ ${p.voteCount} · 💬 ${p.commentCount}</div>
          </td>
        </tr></table>
      </a>`
    )
    .join("");

  const body = `
    <p style="margin:0 0 18px;font-size:15px;line-height:1.55;color:#3f3f46;">
      Lo más destacado en IA ${opts.rangeLabel}. Aquí tienes lo que la comunidad votó esta semana:
    </p>
    <div style="margin:0 0 22px;">${rows}</div>
    ${ctaButton(APP_URL, "Ver todo en Ponte al dIA")}
  `;

  return {
    subject: `🧠 Lo que pasó en IA ${opts.rangeLabel}`,
    html: emailLayout({ heading: "Tu resumen semanal de IA", body, unsubLink: opts.unsubLink, unsubLabel: "Darme de baja del resumen semanal" }),
  };
}
