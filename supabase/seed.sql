-- Local-development seed (not pushed to production).
-- The hosted Supabase project grants anon/authenticated table privileges via
-- its default-privilege setup; the local `supabase start` stack does not grant
-- SELECT/INSERT on these postgres-owned tables, so the RLS policies have no
-- effect until the privileges are granted. Re-applied on every `supabase start`
-- / `supabase db reset`.
GRANT SELECT, INSERT ON public.blog_comments TO anon, authenticated;
GRANT SELECT, INSERT ON public.blog_survey_responses TO anon, authenticated;
