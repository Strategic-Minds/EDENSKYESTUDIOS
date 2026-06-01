# EdenSkyeStudios Bootstrap Runbook

## Objective

Stand up the first governed Next.js template for Eden Skye Studios, connected to GitHub, Vercel, Supabase, Google Drive intelligence, Shopify offer routing, and draft-only social automation.

## Required Vercel Environment Variables

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `CRON_SECRET`

## Automation Environment Variables

- `GOOGLE_DRIVE_FOLDER_ID`
- `GITHUB_OWNER`
- `GITHUB_REPO`
- `VERCEL_PROJECT_ID`
- `VERCEL_TEAM_ID`
- `SHOPIFY_STORE_DOMAIN`
- `SHOPIFY_ADMIN_ACCESS_TOKEN`
- `XYLA_API_URL`
- `XYLA_API_TOKEN`
- `METRICOOL_API_URL`
- `METRICOOL_API_TOKEN`
- `HEYGEN_API_KEY`
- `RUNWAY_API_KEY`

## First Verification Pass

1. Deploy the bootstrap branch to Vercel preview.
2. Confirm `/api/health` returns `ok: true`.
3. Confirm `/api/readiness` lists missing environment values clearly.
4. Add required Supabase and cron environment variables.
5. Apply `supabase/migrations/202606010001_eden_operating_tables.sql` to the connected Supabase project.
6. Re-run `/api/readiness`.
7. Test a draft-only social bridge POST to `/api/social/drafts`.
8. Confirm the draft appears in `social_media_bridge`.

## Governance Rules

- Public publishing stays disabled until manually approved.
- Shopify mutations stay disabled until manually approved.
- Paid ad activation stays disabled until manually approved.
- Production deployment should happen only after preview verification.

## Launch Use

Use `/api/workflows/eden-launch` as the app-readable launch contract. It defines the core lanes, cadence, pillars, and approval rules for the 30-day launch sprint.
