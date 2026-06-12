# EDEN SKYE ADMIN Stack Contract

## Runtime

- Framework: Next.js App Router.
- UI surface: `/admin` and `/admin/*` routes.
- API surface: `/api/admin/eden/*` routes.
- Control mode: draft-first, approval-gated, receipt-backed.

## Connected Systems

- GitHub for branches, PRs, issues, workflow evidence, and code inspection.
- Vercel for preview deployment, browser evidence, and workflow runtime.
- Supabase for registry, queues, receipts, approval requests, and SQL validation.
- Google Drive for source truth, manifests, asset normalization, and operating docs.
- Gmail for inbox action queues and draft replies.
- Google Calendar for availability and scheduling briefs.
- Shopify for store bridge planning and draft commerce operations.
- HeyGen for avatar/video packet generation.
- Image/video generation for draft media packets.
- Social automation for draft content plans and scheduled drafts.
- Browser/Playwright bridge for screenshot evidence.
- n8n/external workflow bridge for controlled outside automation.

## Non-Negotiable Safety Contract

The stack must default protected actions to blocked. Protected actions include production deploys, live Shopify mutations, production Supabase schema changes, public social publishing, real customer Gmail sending, external Calendar event creation, DNS/billing changes, secret rotation, destructive Git operations, merges, and releases.

## Evidence Contract

Every consequential operation must produce evidence or a receipt. Evidence may include screenshots, test logs, build logs, API responses, SQL validation output, approval decisions, and release-gate checklists.