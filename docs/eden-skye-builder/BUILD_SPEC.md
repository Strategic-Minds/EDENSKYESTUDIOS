# Eden Skye Studios Mockup Site Build Spec

## Purpose
Create a branch-only implementation of the Eden Skye Studios website shown in the supplied mockups. The site is a dark luxury AI-model studio experience with hot-pink accents, model cards, membership pricing, Eden's Closet, dashboard, AI chat, and source-image control-plane references.

## Operating status
- Existing production/control-plane site already exists.
- This branch is a draft implementation path, not a production release.
- No payments, storage writes, Supabase mutations, Drive writes, or live customer messaging are enabled by this spec.

## Routes
- `/` marketing home with hero, model preview, trust/features, pricing, experience cards, newsletter, footer.
- `/models` full model gallery with filters and model cards.
- `/pricing` premium membership plans.
- `/dashboard` member dashboard mockup.
- `/closet` Eden's Closet outfit selector mockup.
- `/ai-chat` AI video/chat experience mockup.
- Existing `/eden-source-images` remains the control-plane lane.

## Visual requirements
- Background: near-black `#030305`.
- Accent: hot pink `#ff0a73` / `#ff1493`.
- Text: white, soft gray secondary.
- Layout: glass cards, thin borders, neon-pink active states, large editorial imagery.
- Typography: system sans, uppercase navigation, wide tracking for labels.

## Content model
Use seeded demo content only until real manifest data is connected. Do not claim real model identities, real metrics, or real availability.

## PWA/system direction on Vercel
- Next.js App Router.
- Vercel preview branch first.
- Vercel Blob or Supabase Storage for actual source images after approval.
- Supabase tables for models, assets, membership plans, source-image receipts, and approvals.
- Vercel Cron: 5-minute review/sync job only after credentials and approval.
- AI Gateway: only for approved AI chat/generation endpoints.

## Acceptance checks
- `npm install`
- `npm run build`
- Verify routes render: `/`, `/models`, `/pricing`, `/dashboard`, `/closet`, `/ai-chat`, `/eden-source-images`.
- Confirm no production writes or customer messages are triggered.
- Confirm all generated/persona content is labeled demo/mockup until approved.
