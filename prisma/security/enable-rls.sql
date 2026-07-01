-- ─────────────────────────────────────────────────────────────────────────────
-- Seguridad: activar Row Level Security (RLS) en todas las tablas de `public`.
--
-- Contexto de esta app:
--   • El acceso a datos es 100% vía Prisma, que conecta como el rol `postgres`
--     (dueño de las tablas y con BYPASSRLS = true). Por tanto RLS NUNCA afecta
--     a la aplicación: Prisma sigue teniendo acceso total.
--   • Supabase solo se usa para Storage (service key, server-side). La API
--     auto-generada de PostgREST (roles `anon` / `authenticated`) NO se usa.
--
-- Al activar RLS SIN políticas, los roles `anon` y `authenticated` (la API
-- pública de Supabase) quedan denegados por completo — que es justo lo que
-- queremos, ya que exponían tablas sensibles (accounts.access_token,
-- refresh_token, sessions, verification_tokens.token, users, etc.).
--
-- Idempotente: volver a ejecutarlo no causa daño. Reversible con
-- `ALTER TABLE public.<t> DISABLE ROW LEVEL SECURITY;`.
-- ─────────────────────────────────────────────────────────────────────────────

ALTER TABLE public.accounts            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.sessions            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.verification_tokens ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.users               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories          ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags                ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.votes               ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments            ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comment_votes       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comment_reactions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.bookmarks           ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications       ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.follows             ENABLE ROW LEVEL SECURITY;

-- Safety net: activa RLS en cualquier otra tabla futura de `public` que aún no
-- lo tenga (p. ej. tras un `prisma db push` que cree tablas nuevas).
DO $$
DECLARE r record;
BEGIN
  FOR r IN
    SELECT tablename FROM pg_tables
    WHERE schemaname = 'public' AND rowsecurity = false
  LOOP
    EXECUTE format('ALTER TABLE public.%I ENABLE ROW LEVEL SECURITY;', r.tablename);
  END LOOP;
END $$;
