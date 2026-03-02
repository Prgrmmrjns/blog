# Supabase Setup for Comments

To enable blog comments, run the migration in your Supabase project:

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → select your project
2. Go to **SQL Editor**
3. Run the contents of `supabase/migrations/20240302000000_create_comments.sql`

This creates the `blog_comments` table and RLS policies for anonymous read/insert.

**Note:** If your Supabase key format differs from the standard anon key, update `.env` with the correct `SUPABASE_URL` (full URL) and `SUPABASE_KEY` (publishable/anon key from Project Settings → API).
