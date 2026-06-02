# EdenSkyeStudios

Next.js control surface for the Eden Skye Studios brand, launch workflow, Supabase-backed operating tables, and Vercel automation routes.

This repository is designed to stay governed:

- public publishing requires approval
- Shopify mutations require approval
- paid ad activation requires approval
- production promotion requires approval

## Bootstrap Scope

The first application foundation includes:

- Next.js App Router template
- premium Eden Skye landing page
- health and readiness APIs
- Supabase server client helpers
- launch workflow contract
- draft-only social bridge endpoint
- Vercel cron readiness route
- environment variable contract
- Supabase migration for core operating tables

## Local Development

```bash
npm install
npm run dev
```

## Verification Routes

- `/api/health`
- `/api/readiness`
- `/api/workflows/eden-launch`
- `/api/cron/readiness`

## Supabase

Apply the migration in `supabase/migrations` after the Supabase project and Vercel environment variables are configured.
