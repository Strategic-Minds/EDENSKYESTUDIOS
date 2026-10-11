# EDEN Studio | Public HeyGen benchmark and forensic evidence

Date: 2026-10-11. Scope: publicly observable material only, no logged-in session or proprietary model access. Our target is an independent clean-room implementation, not copying HeyGen source, branding or third-party assets.

## Xtreme Cloud Browser receipts
- Public pages https://www.heygen.com/ and https://www.heygen.com/ai-studio navigated successfully (200 in browser session).
- Public navigation revealed AI Studio, Avatar V, Video Agent, localization, translated video, talking-photo avatar, tool catalog, API docs and LiveAvatar.
- Browser network telemetry exposed `cdn.sanity.io` media, `analytics.ahrefs.com`, Google Analytics and marketing trackers. This does not reveal the model-serving stack or private architecture.
- The specialized Xtreme Cloud Browser clone-parity engineer and Xtreme Fault Line clone agent both returned integration-limit 402, so automated full clone report is BLOCKED. Xtreme Fault Line read-only CloneQueue query succeeded, zero records for the audited URL.

## Evidence sources
1. Public website/product pillars: https://www.heygen.com/
2. Studio editor: https://www.heygen.com/ai-studio
3. Developer API catalog: https://developers.heygen.com/
4. Enterprise: https://www.heygen.com/enterprise
5. Security / AWS / Cloudflare / SSO / SCIM: https://www.heygen.com/security
6. Avatar consent instructions: https://help.heygen.com/en/articles/12092609-recording-your-consent-video
7. Research on public Avatar V model performance: https://www.heygen.com/research/avatar-v-inference
8. Official open-source HyperFrames (Apache-2.0): https://github.com/heygen-com/hyperframes
9. HyperFrames rendering deployment guidance: https://github.com/heygen-com/hyperframes/blob/main/docs/guides/deploy.mdx

## Benchmark feature matrix
| Feature | HeyGen public evidence | EDEN Stage-1 state | Release acceptance |
|---|---|---|---|
| Premium Studio/dashboard | Advertised | Local Vite UI scaffold | Responsive/visual QA |
| AI storyboard / video agent | Advertised | Server draft handler, unconfigured | Gateway auth, quotas, prompts QA |
| Talking-photo avatar | Advertised | UI placeholder | Subject consent, provider validation |
| Digital twin / Avatar V | Advertised | NOT BUILT | Rights verification, identity QA, renderer |
| Voices / voice cloning | Advertised | UI placeholder | Explicit voice-subject consent |
| Edit scenes / timeline | Advertised | Draft script editor only | Persistence, transitions, player |
| Video translation / dub | Advertised | UI placeholder | Speech alignment, linguistic QA |
| Interactive avatar | LiveAvatar advertised | NOT BUILT | WebRTC/RTC security & latency |
| Render MP4 | HyperFrames OSS published | Renderer adapter proposal | Verified sandbox, FFmpeg, artifacts |
| Workspaces / audit / SSO | Enterprise advertised | Proposed RLS schema | Adversarial RLS tests, immutable audit |
| API / MCP | Published catalog | NOT BUILT | Scoped OAuth, tenant-safe tools |
| Billing, approvals, budgets | Enterprise controls advertised | Gates and docs | Signed review, cost cap, receipts |

## Technology classification
VERIFIED PUBLIC: HeyGen says AWS infrastructure and Cloudflare perimeter, HyperFrames Chromium/FFmpeg composite rendering and Apache-2.0. OBSERVED: CDN Sanity image assets, GA, Ahrefs telemetry. VENDOR REPORTED: Avatar V inference optimizations. UNKNOWN: underlying HeyGen website runtime framework, private model stack/weights, proprietary prompts, private databases, live rendering internals, vendor contracts and exact video app UX.

## Clean-room constraints
No bypass of auth/captcha, no protected endpoint probing, no copying proprietary site code, brand assets or exact appearance. HyperFrames is independently licensable compositing technology, NOT HeyGen's photoreal avatar generator. User approved Eden photo is a fixed creative reference, not proof of actor consent to clone any real person's face/voice. Provide actor consent verification and revocation controls before rendering real likenesses.

## Benchmark QA metrics
Measure visual alignment to *our approved Eden design*, task success, LCP <= 2.5s target, INP <= 200ms target, CLS <= .1, WCAG 2.2 AA, auth boundary, unauthorized-tenant denial, consent enforcement, output playback quality, lip-sync QA, render retries, queue lease idempotency, finite budget, provenance, and rollback. Every test must report PASS/FAIL/BLOCKED. No percentage parity claims until verified.
