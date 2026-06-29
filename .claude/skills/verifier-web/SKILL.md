---
name: verifier-web
description: Project verification protocol for Ponte al dIA. Use whenever you need to verify a change in the running app — browser preview, API routes, authenticated flows, or Prisma schema changes. Encodes the dev-server launch, the Prisma "stale client" gotcha, authenticated preview testing via DB sessions, and test-data cleanup.
---

# Verifier · Ponte al dIA

The surface for this project is the **browser preview** (Next.js 16 + React 19,
Turbopack) and its **API routes**. Verify by driving the running app, not by
running tests or typecheck. Capture a screenshot / response body as evidence.

## 1. Launch

Use the preview tools, never `npm run dev` via Bash.

- `preview_start` with name **`dev`** (port 3000). Reuses if already running.
- Navigate with `preview_eval` → `window.location.href = '/...'`.
- For desktop layout set viewport `1280x820`; for mobile use preset `mobile`.

## 2. Prisma changes — RESTART or you'll chase ghosts

After **any** `prisma/schema.prisma` edit:

```bash
npx prisma db push --skip-generate   # sync DB
npx prisma generate                  # regenerate client → src/generated/prisma
```

**Then STOP and START the dev server** (`preview_stop` + `preview_start`). The
running Node process holds the *old* generated client in memory. Symptom if you
skip this: `TypeError: Cannot read properties of undefined (reading 'findMany')`
or a model like `db.notification` being `undefined` — and helpers that swallow
errors will fail *silently*. The generated client (`src/generated/prisma`) is
committed to git; stage it with schema changes.

## 3. Authenticated preview testing

Auth is NextAuth v5 with the **database** session strategy. To act as a user,
create a `Session` row and set its token as a cookie.

Create sessions (prefix tokens with `test-` so cleanup is trivial). Use
`node --env-file=.env` and the generated client:

```bash
node --env-file=.env -e "
const { PrismaClient } = require('./src/generated/prisma');
const db = new PrismaClient();
const exp = new Date(Date.now() + 7*24*3600*1000);
db.user.findUnique({ where: { email: 'marcos4696@gmail.com' } })
  .then(u => db.session.create({ data: { sessionToken: 'test-marcos', userId: u.id, expires: exp } }))
  .then(() => console.log('session ready')).finally(() => db.\$disconnect());
"
```

Known users (verify with a query, ids change per environment):
- `bot@pontealdia.com` — username `bot`, owns the bot/seed posts
- `marcos4696@gmail.com` — admin/owner
- `projectbestiax@gmail.com`

Apply the cookie in the browser, then navigate:

```js
// preview_eval
document.cookie = "authjs.session-token=test-marcos; path=/";
```

Hit authenticated **API routes** directly with curl (faster than clicking):

```bash
curl -s -X POST http://localhost:3000/api/<route> \
  -H "Content-Type: application/json" \
  -H "Cookie: authjs.session-token=test-marcos" \
  -d '{...}'
```

To verify cross-user flows (e.g. notifications), create one session per user
(actor + recipient), act as the actor via curl, then load the UI as the
recipient with that user's cookie.

## 4. Drive & probe

Smallest path that runs the changed code. Then probe one off-happy-path case
(empty input, wrong method, self-action, rapid double-click). Confirm UI state
with `preview_snapshot` (exact text/roles) and CSS with `preview_inspect` — not
screenshots for values.

## 5. Clean up — always

Delete every test artifact you created so the DB stays clean:

```bash
node --env-file=.env -e "
const { PrismaClient } = require('./src/generated/prisma');
const db = new PrismaClient();
(async () => {
  await db.session.deleteMany({ where: { sessionToken: { startsWith: 'test-' } } });
  // also delete any rows you inserted while testing (comments, notifications, posts…)
  await db.\$disconnect();
})();
"
```

## 6. Report

State: what you drove, what you observed (with the screenshot / response body),
the probe result, and the verdict (PASS / FAIL / BLOCKED). A bare PASS with no
probe is a happy-path replay — go one step past the claim.
