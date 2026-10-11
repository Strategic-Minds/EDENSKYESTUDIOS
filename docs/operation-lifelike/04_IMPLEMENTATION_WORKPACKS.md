# 04 | P0 work packets, test gates and receipts
**Mission:** EDEN-LIFELIKE-ENTERPRISE-V1. All items start UNKNOWN until a distinct execution receipt is attached.

## WP0: Source lock
Inputs: EDEN_SKYE avatar identity and Voice Canon, approved Eden images, EDENSKYESTUDIOS Next.js app, Vercel project. Recover exact portrait and associated license/consent; hash and store private approved reference. No new likeness substitution. Exit: source-verified identity asset ID and image checksum.

## WP1: Gateway realtime compatibility, without renderer
Build in isolated Next.js branch only after package/version audit. Protected server endpoint returns short-lived Gateway token and enforces auth, session quotas and no keys in response. Browser test mic -> Gateway realtime -> transcription/audio, tool call and barge-in; synthetic test with known user; do not spend without approval. Exit: P50/P95 latency, interruption receipt, console/network traces, token security check. If Gateway realtime provider unsupported in actual tenancy, STOP (no direct-provider LLM workaround).

## WP2: Renderer adapter
Implement typed renderer interface and a fake deterministic renderer only for code tests. Integrate a real LiveAvatar Avatar Only SDK as the first candidate after account authorization, asset rights and paid session approval; use a test avatar before Eden reference where feasible. Verify audio routing and negotiated codecs. Exit: real end-to-end audiovisual result, visual identity evaluation, graceful disposal.

## WP3: Eden identity and interface
Use existing `/admin/eden` or an isolated new executive route on the same Next.js app; do not rewrite commerce/Shopify. Modes: executive, visitor onboarding, Eden Studios creator. Text-only fallback, accessible controls, transcripts, visual tool cards, reconnect, permission prompts, mobile. Identity must preserve both canonical looks; approved source image is mandatory.

## WP4: Business tools and memory
Use existing governance/receipts system. Safe tools first: read GitHub commit and Vercel status; list authorized Drive docs; summarize Digital Dominance opportunities. Add typed OpenAPI-like tool contracts, idempotency, RLS-scoped event storage. Exit: synthetic cross-session context read and independently verified no cross-tenant leakage.

## WP5: Hardening / independent QA
Separate reviewer re-fetches commit SHA and staging URL. Test: build/typecheck, auth, CSP/CORS, token lifetime, secrets visibility, XSS/prompt-injection, voice interruption, reconnection, source-locked face, audio/video sync, privacy disclosures, accessibility, browser mobile 390px and desktop 1440px, teardown/usage receipts. Failing gate -> repair same layer and rerun, NO production promotion.

## P0 decision sequence
1. Preserve existing Next.js repo and identity canon; no new repo.
2. Bind/verify approved image plus consent provenance.
3. Confirm realtime model catalog and signed server token functionality through Vercel AI Gateway; approval before paid session.
4. Compare real LiveAvatar Avatar Only and Synthesia BYO-speech paths with same test conversation.
5. Present independently validated preview for user selection.
6. Production release only after explicit approval.

## QA matrix initial statuses
| Gate | Status | Evidence needed |
|---|---|---|
| Correct existing source IDs | VERIFIED | Authenticated GitHub/Vercel reads 2026-10-11 |
| Locked image file checksum | BLOCKED | Approved source bytes |
| Current Vercel Gateway chat code present | VERIFIED_SOURCE_ONLY | Existing Next.js route source |
| Realtime Gateway speech in Eden tenancy | UNKNOWN | Live token/session receipt |
| Custom avatar rendering | UNKNOWN | Consented avatar + provider session receipt |
| Read-only tool execution | UNKNOWN | Signed tool input/output + RBAC |
| Browser pixel-parity | UNKNOWN | Real Eden screenshot reference, renderer output |
| GitHub new research branch | VERIFIED | Branch create connector response |
| Connected Super Agent research | BLOCKED | HTTP 402 integration limit |
| Independent deployment certification | BLOCKED | New validated preview and independent reviewer |

## Rollback
No production infrastructure mutated. Research branch can remain unmerged or be closed. Future preview code must be rolled back by reverting only the isolated branch; terminate avatar sessions and ephemeral tokens; never change main or production automatically.

## Next safe action
Compatibility investigation of `gateway.experimental_realtime` and LiveAvatar Avatar Only interface, beginning with documentation and non-billable static prototype. Separate evidence for actual runtime tests from provider documentation.
