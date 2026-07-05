<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Pipeline de calidad (agentes + gate)

Todo cambio pasa por esta tubería. Los pasos de agente los invoca el agente principal
según el disparador; el gate determinista lo fuerza un hook de git.

| Fase | Control | Cuándo se dispara |
|------|---------|-------------------|
| **1. Pre-code** | agente `planner` | Antes de escribir código en cualquier cambio **no trivial**: feature nueva, cambio de schema, auth/seguridad, o que toque varios ficheros. Devuelve scope, ficheros, trabajo oculto y decisiones para el usuario. |
| **2. DB/seguridad** | agente `db-guardian` | Cualquier cambio que toque `prisma/schema.prisma`, RLS/Supabase, auth, o secretos de entorno. |
| **3. Post-code · verificar** | skill `verifier-web` | Tras construir algo observable en la app. Verificación **en runtime** (no tests). |
| **4. Post-code · revisar** | skill `/code-review` | Sobre el diff, antes de commit/push. Bugs + simplificación. |

## Gate automático (hook pre-commit)
Activado con `git config core.hooksPath .githooks` (lo pone el script `prepare` en `npm install`).
En cada commit, `.githooks/pre-commit` ejecuta y **bloquea** si falla:

1. `npm run typecheck` (`tsc --noEmit`) — **imprescindible**: caza errores de tipos que
   rompen `next build` (el `next.config` NO ignora errores de tipos). Un error de tipos aquí
   = deploy fallido en Vercel.
2. `eslint` **diff-aware** (`.githooks/lint-staged-diff.cjs`) — solo bloquea por errores en
   las **líneas que cambiaste**; la deuda de lint preexistente en un fichero tocado no bloquea.
3. Aviso (no bloqueante) si cambió `prisma/schema.prisma` → recordatorio de RLS + `db-guardian`.

Saltar en emergencia: `git commit --no-verify` (evítalo).

## Agentes on-demand (fuera del gate)
- `analytics`: analista de producto. Consulta la Postgres del proyecto (read-only) para
  growth / engagement / retención / funnel / contenido. Vercel Web Analytics (tráfico) es
  dashboard-first: se le pasan capturas/exports o un token de Vercel. Invócalo cuando el
  usuario quiera "cómo va el producto", no para números sueltos.

## Reglas de plataforma que no se negocian
- **Prisma**: tras editar el schema → `db push` + `generate` + **reiniciar el dev server**
  (el proceso vivo mantiene el cliente viejo en memoria).
- **RLS**: toda tabla nueva de `public` va en `prisma/security/enable-rls.sql` y se activa en la DB.
- **Email**: en dev, `EMAIL_DRY_RUN=1` (nunca envía). Envíos lentos vía `after()` de `next/server`.
- **Login en dev**: OAuth solo funciona en prod; usa `/api/dev/login`.
