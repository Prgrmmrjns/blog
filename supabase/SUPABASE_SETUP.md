# Supabase Setup for Comments

To enable blog comments, run the migration in your Supabase project:

1. Open [Supabase Dashboard](https://supabase.com/dashboard) → select your project
2. Go to **SQL Editor**
3. Run the contents of `supabase/migrations/20240302000000_create_comments.sql`

This creates the `blog_comments` table and RLS policies for anonymous read/insert.

For blog post surveys, run:

`supabase/migrations/20260615100000_unify_blog_surveys.sql`

This creates the unified `blog_survey_responses` table (all surveys share one table), migrates any legacy health survey data, and drops the old `health_data_survey_responses` table.

**Survey schema**

| Column | Purpose |
|--------|---------|
| `post_slug` | Blog post identifier |
| `survey_id` | Survey type (e.g. `health-data-sharing`, `favorite-genre`, `favorite-ml-model`) |
| `answer` | Text answer (genre id or score as string) |
| `numeric_value` | Optional number (0–10 scale surveys) |

**Note:** If your Supabase key format differs from the standard anon key, update `.env` with the correct `SUPABASE_URL` (full URL) and `SUPABASE_KEY` (publishable/anon key from Project Settings → API).
