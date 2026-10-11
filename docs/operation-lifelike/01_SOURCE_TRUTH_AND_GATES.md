# 01 | Eden source truth and governance
Research as of 2026-10-11. Untrusted historical claims are not execution receipts.

## VERIFIED directly from authenticated GitHub connector
- `Strategic-Minds/EDEN_SKYE`, main SHA `9e4fc320c57c3cac01959daefddd9664244efd17`, identifies itself as the *primary Eden identity/intelligence source*. Read `governance/SOURCE_TRUTH.md`, `docs/EDEN_SKYE_VISUAL_IDENTITY.md`, and `docs/runway/EDEN_SKYE_VOICE_CANON.md`.
- Identity lock: two authentic approved looks (with and without black rectangular glasses); same face; long dark brunette hair; adult feminine appearance; warm brown/hazel eyes; approved luxury editorial master reference. Identity images themselves HAVE NOT BEEN fetched or approved in this run.
- Voice canon: warm, soft-spoken adult feminine voice; carefully paced, clear, natural, gently ASMR-inspired without exaggerated whisper.
- `Strategic-Minds/EDENSKYESTUDIOS`, main SHA `a8a772a8ddcdb28cf2e4bf1172420b90b7a1b5c0`, is the existing Next.js Vercel app/control-plane repo, NOT a disposable sandbox. `app/api/eden/chat/route.ts` already calls `https://ai-gateway.vercel.sh/v1/chat/completions` with `AI_GATEWAY_API_KEY` or Vercel OIDC, and supplies a safe test-mode fallback when not configured. Its current chat route is text-based: no proven realtime audio/avatar output.
- Existing Next.js project Vercel ID `prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA` returned name `edenskyestudios`, framework `nextjs`, latest deployment READY with target=null and `live=false`. READY is not a successful AVATAR or production validation receipt.
- `Strategic-Minds/eden-skye`, main SHA `a327458936382e455eb362dad9eeea27d82b9535`, is a distinct, vendor-coupled Base44 app. Preserve useful avatar/content components as donor references, do not install its SDK into Next.js.
- `Strategic-Minds/AUTO_BUILDER` is the orchestration authority according to the two Eden repositories. Its latest live SHA and exact runtime permissions were NOT inspected in this run.

## Current scope conflicts to resolve
- Eden Skye Studios brand/commerce persona vs Strategic Minds private **AI executive** interface. Reuse the same approved identity, but isolate content modes, prompts, auth, memory and customer data. Do not merge client-facing creator content into executive business memory.
- The actual previously approved reference image bytes and suitable commercial digital-avatar consent provenance need review before any likeness-dependent training/rendering.

## Governance
- Allowed: read, draft, reversible isolated branch docs/code, locally simulated tests, preview after scoped verification.
- Protected: production deploy, live HeyGen/avatar sessions, spending, secret writes, default branch merge, Supabase prod schema/RLS, Shopify mutation, outbound customer communication, public publishing, destructive operations.
- Never log bearer tokens or secret values. Keys are server-only. Never copy private Eden source images to public assets automatically.
- Existing Eden README/AGENTS/START_HERE and operating contract control this repo. Preview and documentation do not imply execution approval.

## Browser and agents evidence
- Xtreme Cloud Browser v3.1.0 health: HTTP 200, launch session: success, `liveavatar.com` navigate and observe: success with 77 semantic elements, sampled network response: success. Later full text extraction returned 500; screenshot and DOM inspection returned session-not-found. Do not call this a deep completed forensic capture.
- Connected Autonomous Agent returned HTTP 402, monthly integration limit; nothing dispatched. Xtreme Cloud Browser Clean and Superpowers individual callable endpoints not resolved in current tool inventory. Fallback used: visible Xtreme Cloud Browser control action and official external documentation.

## Unverified
Vercel Gateway credential binding for realtime; existing live avatar creation; current Eden image file integrity; realtime video streaming; reliable persistence; cost per minute; independent validator.
