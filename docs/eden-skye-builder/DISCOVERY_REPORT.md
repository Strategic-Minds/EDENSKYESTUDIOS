# Eden Skye Studios Discovery Report

## Branch
`codex/eden-skye-mockup-site-builder-docs`

## Repository verified
- Repository: `Strategic-Minds/EDENSKYESTUDIOS`
- Framework: Next.js App Router
- Default branch: `main`
- Existing app is not empty.

## Existing project findings
- `package.json` exposes `dev`, `build`, `start`, `lint`, and `typecheck` scripts.
- Core dependencies are `next`, `react`, `react-dom`, `typescript`, and `@supabase/supabase-js`.
- `app/layout.tsx` sets the Eden Skye Studios metadata and loads `app/globals.css`.
- `app/page.tsx` already implements a production-styled Eden Skye Studios marketing homepage.
- `app/eden-source-images/page.tsx` routes to `EdenChatEditor`.
- `app/eden-source-images/eden-chat-editor.tsx` contains the source-image editor/control plane client UI.
- `lib/admin-data.ts` reads `media_assets` and `approval_requests` from Supabase when configured, otherwise falls back to sample data.
- `lib/contracts.ts` defines media, approval, usage, risk, and gate types.
- `vercel.json` currently defines one cron route at `/api/cron/eden-media-preview` on a daily schedule.
- `/api/cron/eden-media-preview` is a dry-run/readiness cron that logs an Eden receipt and keeps production readiness false.

## Important governance findings
- Approval gates already exist for public publishing, production deploy, payment change, Shopify mutation, HeyGen training, and public asset use.
- Supabase is optional in code: the app safely falls back to sample data if env vars are not configured.
- Existing cron route is safe preview/readiness logic, not a mutation engine.

## Gap against supplied mockups
The mockups show a fuller user-facing product surface than the current confirmed route set:

1. Models Gallery
2. Membership Plans
3. Member Dashboard
4. Eden's Closet Outfit Selector
5. Eden's Closet Environment Selector
6. AI Video Chat / AI Chat
7. Mobile PWA shell
8. Source Image Review Admin

## Recommended implementation pattern
- Keep existing `/` and `/eden-source-images` intact.
- Add route-level pages for `/models`, `/pricing`, `/dashboard`, `/closet`, and `/ai-chat`.
- Add shared data fixtures first.
- Add reusable visual shell/cards before wiring Supabase.
- Do not enable payments, customer messaging, live video, public publishing, or production deploy in this branch.

## Discovery status
Green: repository access, branch creation, current homepage, source-image control plane, Supabase fallback pattern.
Yellow: route gaps, PWA status, production deploy status, source-image binary ingestion.
Red: live payments, live avatar/video chat, public publishing, production mutation without approval.
