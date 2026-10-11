# EDEN | Owned avatar engine, Base44 authoring and portable production
Version: 2026-10-11. Draft-only research, NOT DEPLOYED.

## Business decision
Create original portable realtime digital-human application, benchmarking HeyGen LiveAvatar, without cloning proprietary code/models or assets. Own code, brand, data, media orchestration, adapters, deployments and tools. Self-hosting licensed weights is not ownership of their IP.

## Architecture
1. **Base44 authoring UI**: generate cinematic avatar conversation page, responsive UX, mic/captions, permission UI, interruption, status and accessible fallback. Export Vite/React source through GitHub. Runtime MUST NOT call Base44 SDK, Auth, Entities, Functions or InvokeLLM. If generator inserts such dependencies, replace them and verify an independent build on Vercel before claiming portability.
2. **Next.js Eden session gateway on Vercel**: reuse existing EDENSKYESTUDIOS project where appropriate. Authentication, limits, usage cap, signed ephemeral token, tool policy, privacy/consent, typed session API. User-facing text mode when renderer is unavailable.
3. **All LLM inference via Vercel AI Gateway**: prefer AI SDK 7 realtime speech for voice and interruptions. Validate actual model availability and WebSocket transport. Alternate split ASR => Gateway LLM => legally licensed TTS where audio encoding / rendering demands. No direct provider LLM fallback.
4. **Replaceable self-hosted render worker**: benchmark MuseTalk 1.5 lipsync plus consented idle/listening motion and face/eye motion adapters; explore EchoMimicV3-Flash and NVIDIA ACE or licensed alternatives. Execute neural video inference on separately authorized GPU capacity, not in Base44 browser runtime or unproven serverless function. If Railway GPU unavailable, select a measured GPU compute environment. Confirm third-party checkpoint/dependency licensing.
5. **Media and state**: LiveKit/WebRTC or equivalent realtime transport with audio/video sync, interrupt/cancel, bounded queues and clean teardown. Supabase holds tenant-scoped metadata and receipts under tested RLS, not in Base44 entities. Keep identities and keys server-side.
6. **Source and validation**: authoritative GitHub branch, release receipts, independent Playwright/browser/mobile security tests, preview-only Vercel deployment when eligible.

## Interface and critical tests
- Frontend: startSession, microphone permissions, caption stream, interrupt, stopSession, error/fallback.
- Backend: session_id, tenant, consent, avatar_identity_hash, signed temporary tokens, tool receipts, event seq, usage caps, session TTL.
- Renderer adapter: prepareSession, inputAudio, outputVideo, onInterrupt, health, dispose. Do not assume codecs or frame rate.
- Immediately cancel pending audio/frame queues when user interrupts. Store no user voice without required consent.
- Measure P50/P95 user-end-speech => first meaningful audio, audio/video drift, dropped frames, 30-turn sessions, approved face and glasses fidelity. Published vendor timings do not prove our implementation.
- In private tests compare the exact same conversation and network conditions to commercial HeyGen, on an authorized demo/account.

## Four-stage execution
P0: source audit, source AVIF hash/rights and commercial model dependency/license review, GPU pricing/availability and Vercel Gateway account capability.
P1: Base44 FRONTEND ONLY exported independently and rendered by Vercel; synthetic avatar UI states clearly marked mock, no paid API.
P2: authentic AI Gateway realtime conversation with permission, token and barge-in receipt; voice+audio output verified under user-approved spend and credentials.
P3: actual self-hosted GPU rendered photo-real Eden frames over WebRTC; same locked likeness and voice, synchronized lips, interruptions, measured latency; independent QA.
P4: privately validated live two-way avatar preview. Customer-facing release and production stay separately approved.

## Current existing authority
- Approved V2 source https://drive.google.com/drive/folders/1UTo9XWJXo4pKYRnnRALeM7lrqHWMv2s4
- Identity source Strategic-Minds/EDEN_SKYE
- Existing Vercel app source Strategic-Minds/EDENSKYESTUDIOS (not commerce route overwrite)
- Older Base44 app Strategic-Minds/eden-skye is a donor only.
- Approved Eden AVIF hash asserted in source documents, not independently rehashed. No upload/model training until identity/license verified.

## Official evidence
- https://vercel.com/changelog/realtime-voice-speech-and-transcription-now-supported-on-ai-gateway
- https://vercel.com/changelog/ai-sdk-7
- https://help.heygen.com/en/articles/10035615-how-to-get-started-with-liveavatar
- https://github.com/TMElyralab/MuseTalk
- https://github.com/antgroup/echomimic_v3
- https://base44.com/blog/base44-github-integration
- https://base44.com/developers

## Scope and truth
NO production deploy, protected merge, secrets, live sessions, subscriptions, GPU purchases, schema changes, customer communications, or vendor-face enrollment authorized by this document.
VERIFIED: docs + current stack/source. INFERRED: self-hosting plausible. NOT VERIFIED: visual parity and interactive latency. BLOCKERS: approved asset bytes not verified, renderer/Gateway interoperability and spend authorization unknown. NEXT: first independent source export + static source-based avatar stage with text/voice transport contract on isolated branch.
