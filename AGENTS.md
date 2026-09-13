# AGENTS.md

## Cursor Cloud specific instructions

### What this is
Single product: a bilingual (EN/DE) personal blog built with **Nuxt 4** (Vue 3, TypeScript). Content is Markdown via `@nuxt/content` (indexed into a local SQLite DB under `.data/content`). Interactive features (blog comments + per-post surveys/polls) talk directly to **Supabase** from the browser via `@nuxtjs/supabase`. There is no custom backend / `server/` dir.

### Running the app (dev)
- Requires Node `>=22.5.0`. Start with `npm run dev` (Nuxt dev server on port 3000). Scripts: see `package.json` (`dev`, `build`, `preview`, `generate`).
- No lint or test scripts exist in this repo (no ESLint/Vitest/Playwright config).

### Supabase is required for the app to boot (non-obvious)
The `@nuxtjs/supabase` server plugin **throws and returns HTTP 500 on every page** if `SUPABASE_URL` / `SUPABASE_KEY` are unset — it does not degrade gracefully. So a `.env` (gitignored, must be recreated each session) with valid Supabase credentials is mandatory even just to view static blog pages:
```
SUPABASE_URL=http://127.0.0.1:54321
SUPABASE_KEY=<local publishable/anon key from `supabase status`>
```

### Local Supabase stack
Docker + the Supabase CLI are preinstalled in the environment, but the daemon and stack are **not** auto-started. To bring them up:
1. Start the Docker daemon (not running by default): `sudo dockerd` (leave running, e.g. in a tmux session).
2. From the repo root: `sudo supabase start` (uses `supabase/config.toml`; auto-applies `supabase/migrations/*` and then `supabase/seed.sql`). Get the API URL + publishable key from `sudo supabase status` and put them in `.env`.
- `supabase/seed.sql` is local-only (never pushed to prod). It grants `anon`/`authenticated` SELECT+INSERT on the blog tables — the local stack does not grant these automatically for postgres-owned tables, so without it the RLS policies have no effect and comments/surveys return `permission denied`.
- Migration `20260615100000_unify_blog_surveys.sql` guards its legacy-table backfill in a PL/pgSQL block so a fresh project bootstraps cleanly.

### Gotchas
- Build artifacts `.nuxt/`, `.output/`, and `.data/` are checked into git; running `npm install`/`npm run dev`/`build` regenerates them and makes `git status` noisy. Do not commit those regenerated changes.
- The `[@nuxt/supabase] WARN ... database.types.ts ... file not found` log is harmless (types fall back to `unknown`).
