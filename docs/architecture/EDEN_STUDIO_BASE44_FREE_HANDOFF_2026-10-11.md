# EDEN Studio | Vite + Supabase + Vercel + Railway implementation handoff
**MODE:** review / staging plan; NOT a production activation.

## Base44 designer instruction: hard dependency-free lock
Design a premium, original EDEN Studio enterprise AI avatar video editor featuring the exact user-approved Eden Skye character (dark hair, black glasses, chrome/blue futuristic executive jacket). **Use Base44 only as a disposable visual design / scaffolding environment. Do not allow ANY Base44 dependency into the exported app.** The deliverable MUST be independent Vite + React source hosted on Vercel with Supabase Auth/Postgres/RLS/Storage backend. Use Vercel server functions for Vercel AI Gateway only, Vercel paid cron as safe wake of the pre-existing single reconciler, Railway for approved sandboxed media workers, Google Drive for approved archival, GitHub for immutable source and PR workflow.

**Forbidden in shipped code:** `@base44/sdk`, `@base44/vite-plugin`, `base44Client`, `base44.entities`, `base44.auth`, `base44.functions`, `base44.integrations`, `InvokeLLM`, Base44-managed credentials, Base44 database, Base44 runtime API, Base44 hosting or billing dependencies. The exported app MUST still run when Base44 is unavailable. Run dependency scans and reproducible build against independent source.

**Protected actions:** no production deployments, DNS, database schema apply, secrets changes, live avatar creation, real-person voice/face replication, paid rendering, public publishing, Shopify mutation or real customer communication without scoped approval. Render start requires verified consent, rights, moderation, tenant RBAC, spend cap and signed approval receipt. Do not repurpose the existing Eden Next.js app or overwrite the Visual Authority asset.

## Source truth and isolation
Existing governed project: `Strategic-Minds/EDENSKYESTUDIOS` (Next.js estate, Vercel `prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA`). Existing `AGENTS.md`, `START_HERE.md`, `docs/PLAN_MODE_BUILD_MODE.md`, `docs/EDEN_SKYE_STUDIOS_CAPABILITIES.md` reviewed. Implement new Vite app in isolated `apps/eden-studio` staging directory or dedicated approved destination, not the production Next.js root. Local artifact kit `EDEN_STUDIO_HEYGEN_BENCHMARK_V1.zip` created in user ChatGPT session; source files not yet imported into this repo. Image is present only in privately downloadable kit pending public asset rights/publishing approval.

## Pipeline
Brief -> script/storyboard -> consent & rights -> avatar + voice provider -> multi-scene compose -> render estimate -> signed approval -> Supabase idempotent job -> Railway sandboxed GPU/render adapter -> metadata/MP4 in private storage -> QA lip-sync & provenance -> signed export to Google Drive -> optional approved distribution. GPT access through future OAuth scoped MCP tools, never through raw service keys in a chat.

## Provider-neutral contracts
- Text/storyboard: Vercel AI Gateway server-only (no direct public browser key).
- Composition: HyperFrames Apache-2.0 and FFmpeg/Chromium; open-source framework not an avatar synthesizer.
- Lifelike digital twin: a separately licensed model service or independently hosted proven open model, after real-person consent and commercial license review.
- Live real-time conversations: RTC provider with expiring room tokens, STT/TTS, interruption handling and recorded consent.
- Video translation: translate -> generate speech -> align phonemes -> lip-sync -> subtitles -> per-language QA.
- Asset storage: private buckets + signed URLs + retention + tenant-scoped RLS; Drive is archival export, not live media datastore.

## Required gates
1. Audit existing 5-minute supervisor to avoid duplicate Vercel crons.
2. Resolve staging Supabase project + multi-tenant RLS + storage policy; migration approval separate.
3. Connect preview Vercel project and Railway sandbox without changing existing production.
4. Bind credentials server-side via write-only provider managers; no raw key exchange.
5. Run npm deps/license audit, independent build, E2E, RLS adversarial tests, image comparison, API-auth negative tests, per-provider budget tests.
6. Validate true rendered MP4 with consent and authorized spend before any parity claim.

## Plan Mode
- [x] Public research, Cloud Browser acquisition, repo source truth inspected.
- [x] Brand identity and non-Base44 requirements locked.
- [ ] Stage Vercel/Supabase/Railway destination selection.
- [ ] Third-party model licensing, identity-consent intake and real rendering cost modeling.

## Build Mode
- [x] Local Vite stage-1 scaffold and public benchmark packet prepared.
- [x] Eight pure authorization/state tests PASSED; Base44 source audit PASSED.
- [ ] npm dependencies/build blocked in offline container; do not report build PASS.
- [ ] Import verified artifact into isolated GitHub source tree and run CI.
- [ ] E2E verified staging auth/render pipeline.
- [ ] Signed approval for production release.

## Stage-1 receipt
Local artifact SHA-256: `61ea68b2127efd3bccdaec9e088f15a7327400abdbf9053a5ca0ba59e4e70531`; 20 files including Eden image. **This repository document alone does NOT install/render the app**. Full implementation awaits source import, independent build/test, provider and staging permissions.
