import { Resend } from "resend";
import { db } from "@/lib/db";
import { randomBytes } from "crypto";

const API_KEY = process.env.RESEND_API_KEY;
const FROM = process.env.EMAIL_FROM ?? "Ponte al dIA <onboarding@resend.dev>";
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL ?? "https://ponte-al-dia.vercel.app";
const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME ?? "Ponte al dIA";

// Test mode:
//  - EMAIL_DRY_RUN=1 → never sends anything; logs every email it would send.
//    The explicit "test mode" switch — flip it on to exercise the full flow safely.
//  - No API key  → never sends, logs what it would send (safe by default).
//  - EMAIL_TEST_REDIRECT=you@mail.com → sends real emails but ALL to that address
//    (so you can preview real rendering without mailing your users).
const DRY_RUN = process.env.EMAIL_DRY_RUN === "1";
const TEST_REDIRECT = process.env.EMAIL_TEST_REDIRECT;

const resend = API_KEY ? new Resend(API_KEY) : null;

export interface SendResult {
  sent: boolean;
  skipped?: string;
  id?: string;
  to?: string;
}

export async function sendEmail(opts: {
  to: string;
  subject: string;
  html: string;
  dryRun?: boolean;
}): Promise<SendResult> {
  const to = TEST_REDIRECT || opts.to;

  if (opts.dryRun || DRY_RUN) {
    console.log(`[email][dry-run] to=${to} subject="${opts.subject}"`);
    return { sent: false, skipped: "dry-run", to };
  }
  if (!resend) {
    console.log(`[email] (no RESEND_API_KEY) would send to ${to}: "${opts.subject}"`);
    return { sent: false, skipped: "no-api-key", to };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: FROM,
      to,
      subject: opts.subject,
      html: opts.html,
    });
    if (error) {
      console.error("[email] send error:", error);
      return { sent: false, skipped: error.message, to };
    }
    return { sent: true, id: data?.id, to };
  } catch (e) {
    console.error("[email] send threw:", e);
    return { sent: false, skipped: e instanceof Error ? e.message : "unknown", to };
  }
}

/** Lazily creates and persists an unsubscribe token for a user. */
export async function getUnsubscribeToken(userId: string): Promise<string> {
  const user = await db.user.findUnique({ where: { id: userId }, select: { unsubscribeToken: true } });
  if (user?.unsubscribeToken) return user.unsubscribeToken;
  const token = randomBytes(24).toString("hex");
  await db.user.update({ where: { id: userId }, data: { unsubscribeToken: token } });
  return token;
}

export function unsubscribeUrl(token: string, type: "replies" | "digest" | "all"): string {
  return `${APP_URL}/api/unsubscribe?token=${token}&type=${type}`;
}

/** Shared responsive email shell. `unsubLink` renders the footer opt-out line. */
export function emailLayout(opts: { heading: string; body: string; unsubLink?: string; unsubLabel?: string }): string {
  return `<!DOCTYPE html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f4f4f5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <div style="max-width:520px;margin:0 auto;padding:24px 16px;">
    <div style="text-align:center;padding:8px 0 20px;">
      <span style="display:inline-block;background:#0a0a0a;color:#fff;font-weight:800;font-size:15px;letter-spacing:-0.02em;padding:8px 11px;border-radius:9px;">d<span style="font-weight:400">I</span>A</span>
      <span style="font-weight:800;color:#0a0a0a;font-size:16px;margin-left:8px;">${APP_NAME}</span>
    </div>
    <div style="background:#fff;border:1px solid #e4e4e7;border-radius:16px;padding:28px 26px;">
      <h1 style="margin:0 0 16px;font-size:20px;line-height:1.3;color:#0a0a0a;font-weight:800;">${opts.heading}</h1>
      ${opts.body}
    </div>
    <div style="text-align:center;padding:18px 8px 4px;color:#a1a1aa;font-size:12px;line-height:1.6;">
      <p style="margin:0 0 4px;">${APP_NAME} · comunidad de IA en español</p>
      ${opts.unsubLink ? `<p style="margin:0;"><a href="${opts.unsubLink}" style="color:#a1a1aa;text-decoration:underline;">${opts.unsubLabel ?? "Dejar de recibir estos emails"}</a></p>` : ""}
    </div>
  </div>
</body></html>`;
}

export function ctaButton(href: string, label: string): string {
  return `<a href="${href}" style="display:inline-block;background:#2563eb;color:#fff;font-weight:700;font-size:14px;text-decoration:none;padding:11px 20px;border-radius:10px;">${label}</a>`;
}
