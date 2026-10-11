# 03 | Portable executive avatar architecture contract
Status: PROPOSED, NOT DEPLOYED. All LLM calls MUST route through Vercel AI Gateway.

## Core principle
A single **Eden identity + intelligence plane** connects to replaceable visual and media adapters. Separate the fictional/luxury creator persona from privileged Strategic Minds executive roles, with distinct tenant/permissions and prompt contexts.

```text
Authenticated Next.js Eden UI (existing EDENSKYESTUDIOS)
  -> server /api/eden/realtime/token (auth, tenancy, quota, short-lived token)
  -> Vercel AI Gateway / AI SDK 7 realtime model (speech + tool calling)
  -> server-approved tool dispatcher (read/draft/branch only; protected approvals)
  -> avatarRenderer adapter
        -> HeyGen LiveAvatar Avatar Only (first benchmark)
        -> Synthesia Interactive Avatar (alternate)
        -> D-ID Expressive (alternate)
  -> Live media transport and synced captions
  -> server event collector -> Supabase session receipts and scoped memory
```

## Interface envelopes (design contracts)
`EdenSessionCreate{tenant_id,user_id,requested_avatar_look,preferred_renderer,mode:'executive'|'onboarding'|'studio'}`
`EdenSessionReady{session_id,expires_at,avatar_stream_status,realtime_token_ref,capabilities[]}`
`EdenEvent{event_id,session_id,seq,type,ts,trace_id,summary?}` where types include listening, transcript_partial, transcript_final, llm_started, audio_chunk, video_frame, interrupted, reconnection, tool_requested, tool_approved, tool_completed, error, session_ended.
`EdenToolRequest{session_id,tool_id,input,scope,idempotency_key}`, `EdenToolReceipt{tool_id,status,evidence_ref,approval_id?,duration_ms}`.

## Proposed application endpoints (not installed)
- `POST /api/eden/realtime/token`: auth, rate-limit, quota, Gateway ephemeral token; only safe server-exposed metadata returned.
- `POST /api/eden/sessions`: session state and renderer selection; return session ID, not provider master keys.
- `POST /api/eden/sessions/{id}/events`: constrained signed events, ordered by seq/idempotency.
- `POST /api/eden/tools/execute`: validate known tool schema, RBAC, approval state, anti-replay.
- `GET /api/eden/sessions/{id}/receipts`: tenant-filtered audit.
- `POST /api/eden/sessions/{id}/end`: stop avatar provider billing/stream, write receipt.

## Gateway
Use AI SDK 7 `@ai-sdk/gateway`, `@ai-sdk/react`, `ai` after compatibility review. Realtime GET token only from authenticated server route with Vercel Gateway credential stored in env.
Models to benchmark (check current availability): `openai/gpt-realtime-1.5`, `openai/gpt-realtime-2`, `openai/gpt-realtime-2.1` and a lower-cost supported alternative. Separate non-realtime high-reasoning tool planning through Gateway. Never directly call OpenAI for LLM inference.

## Renderer adapter interface (TypeScript design only)
- `createSession(approvedAvatarIdentity, audioCodec, frameMode, tenantScope)`
- `attachAudioStream(streamHandle)`
- `onVideoFrame(callback)` / attach provider video track
- `onInterrupted(callback)` / `interrupt()`
- `reconnect()` / `getHealth()` / `dispose()`
Never assume all renderers support the same output formats or custom identity pipelines.

## Data boundary
Suggested new tables in a future staging-only migration: eden_sessions, eden_session_events, eden_tool_receipts, eden_approved_avatar_assets, eden_identity_versions, eden_memory_refs, eden_approval_requests. Every row tenant-scoped; auth claims verified server-side; RLS policies tested; no production migration in this mission.

## Business tools
Start with read-only Google Drive knowledge lookup, GitHub branch/workflow status, Vercel deployment status, Digital Dominance opportunity read, current approval queue. Each tool returns source refs. Add draft and branch-write tools later behind scoped approvals.
Never expose connected tools or credentials directly through browser client or LLM content. Protect against prompt injection in Drive/web content, overbroad role propagation, cross-tenant reads, social-engineering approvals, replay, leaked transcript data.

## Primary risks
- A web player may output audio itself while the avatar needs audio routed to its own media worker; test real audio plumbing.
- Browser security requires mic permission, HTTPS and a fallback for iOS Safari and blocked autoplay.
- Costs accrue until session disposal: time-bound, idle timeout, per-tenant spend envelope; paid tests separately approved.
- A provider-created synthetic avatar may not satisfy the exact locked likeness; identity QA blocks release.
- Desktop code and UI may have aged; inspect dependencies and build with Node 24 as declared on Vercel.

## Sources
https://vercel.com/changelog/realtime-voice-speech-and-transcription-now-supported-on-ai-gateway
https://vercel.com/changelog/ai-sdk-7
https://www.liveavatar.com/
https://github.com/heygen-com/liveavatar-gpt-live-demos
