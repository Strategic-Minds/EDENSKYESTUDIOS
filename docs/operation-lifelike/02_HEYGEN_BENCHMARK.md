# 02 | Competitive evidence dossier (first pass)
Snapshot 2026-10-11. Public documented capabilities are **vendor claims**, not measured Eden benchmarks.

## HeyGen / LiveAvatar, primary benchmark
- Public home: https://www.liveavatar.com/
- Developer docs: https://docs.liveavatar.com/
- Full Mode offers hosted ASR + LLM + TTS; Avatar Only offers a renderer/media service while we bring our own voice/LLM. Mandatory Vercel AI Gateway means **Avatar Only must be trialed first**, not Full Mode.
- Current published public prices: Free $0, 10 credits/month, one concurrent, max two-minute session; Essential $99, 1,100 credits/month, one custom 720p avatar, 20-minute maximum session; Business $475, 6,000 credits/month, one 1080p custom avatar, 60-minute maximum session; Enterprise custom. Unlimited concurrency on paid plans claimed by vendor; NOT load-tested. Vendor advertises <300ms median time to first frame; this is NOT end-to-end user conversational turn latency.
- Published source code https://github.com/heygen-com/liveavatar-gpt-live-demos (MIT), GPT Live + LiveAvatar + animated HyperFrames overlays. It uses direct provider speech, not a verified Vercel Gateway connection. Don't inherit demo authentication/security as production architecture.
- Official notes: https://www.heygen.com/blog/heygen-september-2026-release

## Important Vercel breakthrough
- https://vercel.com/changelog/realtime-voice-speech-and-transcription-now-supported-on-ai-gateway
- https://vercel.com/changelog/ai-sdk-7
- Gateway supports experimental realtime voice through AI SDK 7 using server-minted short-lived token + browser WebSocket hook, e.g. `gateway.experimental_realtime('openai/gpt-realtime-2')` per docs.
- New realtime model capabilities may include `openai/gpt-realtime-2.1`; availability, entitlement, tool latency and live-avatar compatibility must be checked in the selected Vercel project. No real model session executed.
- Voice compatibility issue: LiveAvatar Avatar Only may require externally synthesized audio or a specific media/control protocol; realtime model audio output must be routed to the renderer in the correct format. Proof required, not assumed.

## Alternatives
| System | Documented advantage | Tradeoff or current unknown | Evidence |
|---|---|---|---|
| HeyGen LiveAvatar | Hosted photoreal streaming; custom avatar from image/video; Avatar Only | Provider cost, asset identity consent, proprietary rendering, session/audio integration unknown | https://www.liveavatar.com/ |
| Synthesia Interactive Avatars | Sep 2026 interactive API, LiveKit hosted avatar worker, BYO conversational pipeline | API entitlement, custom avatar creation rights, mobile limitations | https://docs.synthesia.io/reference/interactive-avatars |
| D-ID Expressive V4 | LiveKit or WebRTC, voice-aware expressive avatars and agent SDK | Face parity/voice transport must be measured | https://docs.d-id.com/reference/agents-sdk-overview |
| LiveKit Agents | Interoperable audio, agent and room infrastructure; plug-in renderers | LiveKit is transport/orchestration, not a photoreal face generator | https://docs.livekit.io/agents/models/avatar/plugins/did/ |
| NVIDIA ACE / Audio2Face | Speech-driven face animation and independent rendering components | GPU/3D integration costs and realism for approved photo | https://docs.nvidia.com/ace/audio2face-2d-microservice/latest/release-notes.html |
| Tavus CVI | Candidate conversational video platform | No feature/performance claim verified in this pass; official API review required | https://docs.tavus.io/ |

## Decision
Provisional **hybrid architecture**: keep executive brain, memory, auth, tools, billing controls and approval gates in our Next.js/Supabase stack; expose a renderer adapter with HeyGen Avatar Only as first candidate and Synthesia/D-ID as fallbacks. Do not purchase or bind any paid renderer before proof/approval.

## Test matrix before vendor selection
1. Render approved glasses and no-glasses identity: image drift, facial stability, eyelid & eyewear artifacts.
2. Gateway realtime mic -> avatar speech route: network packet formats, P50/P95 turn delay, interruption.
3. 1, 5 and 30 concurrent synthetic sessions only with authorized spend and quota.
4. Latency separation: time-to-first-frame; time-to-first-audio; user-to-answer; audio-video drift.
5. 30-minute simulated session: reconnection, idle disposal, audio echo, mobile fallback.
6. Privacy, licensing, terms, retention, speaker/likeness consent, API key storage.
7. Cost: render credits + LLM audio tokens + network + persistent compute by model scenario; use vendor rates as dated inputs.

Research gaps are tracked as UNKNOWN not PASS.
