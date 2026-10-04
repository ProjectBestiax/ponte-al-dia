---
name: verifier-web
description: Project verification protocol for Ponte al dIA. Use whenever you need to verify a change in the running app — browser preview, API routes, authenticated flows, or Prisma schema changes. Encodes the dev-server launch, the Prisma "stale client" gotcha, authenticated preview testing via the dev-login JWT, and test-data cleanup.
---

# Verifier · Ponte al dIA

The surface for this project is the **browser preview** (Next.js 16 + React 19,
Turbopack) and its **API routes**. Verify by driving the running app, not by
running tests or typecheck. Capture a screenshot / response body as evidence.

## 1. Launch

Use the preview tools, never `npm run dev` via Bash.

- `preview_start` with name **`dev`**. `autoPort` is on: if 3000 is busy it picks another port — use the port it reports.
- Navigate with `preview_eval` → `window.location.href = '/...'`.
- For desktop layout set viewport `1280x820`; for mobile use preset `mobile`.

## 2. Prisma changes — RESTART or you'll chase ghosts

⚠️ The DB is **production** (one Supabase project) and also holds the content
bot's tables (`drafts`, `news_items`) that are NOT in `schema.prisma`.
**Never run `prisma db push`** — it would drop them. For a schema change,
generate only the SQL and review it before applying:

```bash
npx prisma migrate diff --from-url "$DIRECT_URL" --to-schema-datamodel prisma/schema.prisma --script
npx prisma generate                  # regenerate client → src/generated/prisma
```

**Then STOP and START the dev server** (`preview_stop` + `preview_start`). The
running Node process holds the *old* generated client in memory. Symptom if you
skip this: `TypeError: Cannot read properties of undefined (reading 'findMany')`
or a model like `db.notification` being `undefined` — and helpers that swallow
errors will fail *silently*. New `public` tables also need RLS
(`prisma/security/enable-rls.sql`).

## 3. Authenticated preview testing

Auth is NextAuth v5 with the **JWT** session strategy — rows in `sessions` are
ignored. Log in with the dev-only endpoint, which signs the same JWT a real
login issues (404 outside `NODE_ENV=development`):

- Browser: navigate to `/api/dev/login?email=<email>&to=/admin`
  (no `email` → first ADMIN user; `to` only accepts relative paths).
- curl: grab the cookie, then reuse it:

```bash
B=http://localhost:<port>
curl -s -c /tmp/jar "$B/api/dev/login?email=projectbestiax@gmail.com" -o /dev/null
curl -s -b /tmp/jar -X POST "$B/api/<route>" -H "Content-Type: application/json" -d '{...}'
```

Known users (verify with a query):
- `projectbestiax@gmail.com` — owner, ADMIN
- `bot@pontealdia.com` (Leo), `nora@ponte-al-dia.com`, `ada@ponte-al-dia.com` — bot personas
- Anyone else is a **real user**: never act as them.

To verify cross-user flows (e.g. notifications), keep one cookie jar per user
(actor + recipient), act as the actor via curl, then load the UI as the
recipient.

## 4. Drive & probe

Smallest path that runs the changed code. Then probe one off-happy-path case
(empty input, wrong method, self-action, rapid double-click). Confirm UI state
with `preview_snapshot` (exact text/roles) and CSS with `preview_inspect` — not
screenshots for values.

## 5. Clean up — always

The DB is production: delete every test artifact you created.

```bash
node --env-file=.env -e "
const { PrismaClient } = require('./src/generated/prisma');
const db = new PrismaClient();
(async () => {
  // Delete every row you inserted (posts, comments, votes, notifications…) and
  // revert side effects such as karma. Title test posts with "[PRUEBA]".
  await db.post.deleteMany({ where: { title: { startsWith: '[PRUEBA]' } } });
  await db.\$disconnect();
})();
"
```

## 6. Report

State: what you drove, what you observed (with the screenshot / response body),
the probe result, and the verdict (PASS / FAIL / BLOCKED). A bare PASS with no
probe is a happy-path replay — go one step past the claim.
