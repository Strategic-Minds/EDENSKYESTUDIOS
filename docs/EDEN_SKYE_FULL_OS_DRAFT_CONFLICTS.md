# Eden Skye Studios Full OS Draft Conflict Report

## Source Package Conflict

The Drive root contains two folders named `21_EXECUTABLE_GITHUB_PACKAGE`:

- `1BLI5Sn1WSYBvnKLZq71GKZzTSHiFsdmw`
- `1bh9Bakp3lBV5GSBN2gEHSTGRP21vNcwk`

Both showed the same top-level executable repo structure during inspection. This branch used the earlier package folder inspection as the implementation map and avoided destructive copying.

## Protected Existing Repo Logic

The executable package overlapped with existing custom repo logic. These files were preserved and not overwritten:

- `app/page.tsx`: custom production homepage.
- `app/closet/page.tsx`: custom Edens Closet experience.
- `app/admin/page.tsx`: custom media and approval console.
- `app/api/readiness/route.ts`: custom readiness and governance payload.
- `app/api/xyla/draft/route.ts`: custom Xyla draft packet endpoint.
- `app/api/cron/eden-media-preview/route.ts`: existing Vercel cron readiness trigger.

## Merged Instead Of Replaced

- `vercel.json`: kept existing daily media-preview cron and added the 5-minute OS crons.
- `package.json`: kept existing scripts/dependencies and added smoke-test scripts.

## Additive Files

All new routes, admin pages, integration stubs, Supabase files, and tests were added as draft/sandbox surfaces.

## Remaining Review Items

- Compare both duplicate Drive package folders byte-for-byte in a checkout-capable environment.
- Run `npm install`, `npm run typecheck`, `npm run build`, and `npm test` in a checkout-capable environment.
- Keep all production, payment, publishing, external email, live content, Shopify mutation, Supabase production migration, and HeyGen live activation gates locked.
