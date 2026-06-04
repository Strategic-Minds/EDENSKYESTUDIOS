# Eden Skye Studios Enterprise Production Readiness Lock

Date: 2026-06-04
Status: not 100 percent production-ready; private pre-production is ready to continue.

## Drive Source Of Truth

- Enterprise readiness Google Sheet: https://docs.google.com/spreadsheets/d/1vjkumlhVkKrZ0EovZQa_E-VbhCQPEp3y_MkJsYj-rG8/edit?usp=drivesdk
- Enterprise readiness Google Doc: https://docs.google.com/document/d/1j6oEn_v3Xfn7toxqEd5Ufb04skx33NVFcobAiXVaDKE/edit?usp=drivesdk

## Direct Readiness Answer

Eden Skye Studios is not yet 100 percent production-ready. The strategic system, model roster, personality layer, content matrix, approval rules, and Auto Builder syncs are real and in place. The production system still has P0 blockers: full source-image packs, raw Drive asset placement, HeyGen private avatar creation, Supabase verification, and a real approval console.

Estimated readiness score: 52.7 / 100.

## Enterprise Target

The system should operate like a FAANG-grade content and avatar production platform: clear ownership, durable source of truth, typed manifests, least-privilege access, RLS-backed data, approval gates, telemetry, incident response, deployment controls, and continuous improvement from measured outcomes.

## Architecture

- Control Plane: Auto Builder - Routes intake, build packets, validation, promotion, receipts, retries.
- Source Of Truth: GitHub + Drive - Git stores manifests/contracts; Drive stores working docs/sheets/assets.
- Frontend: Eden Skye Studios app - Public site, content hub, lead capture, admin/agent console, asset approval UI.
- Backend: Supabase - Leads, content_queue, agent_runs, tool_receipts, approval_requests, media_assets, social_posts.
- Media Layer: Imagegen/Runway/HeyGen/Descript - Source images, avatar video, cinematic video, edit/publish packaging.
- Commerce: Shopify + Stripe + Klaviyo - Products, licensing, payments, lifecycle marketing.
- Social/Growth: Metricool/SocialHub/SEO-GEO - Draft scheduling, analytics, growth loops, search/entity visibility.
- Telemetry: Supabase + Vercel + social analytics - Operational logs, content performance, asset QA, SLO and incident dashboards.

## P0 Blockers

- Raw image upload/folder placement: Drive connector lacks raw PNG upload and parent-folder move in this session. Required action: use Drive UI/manual upload or add connector action; then backfill file IDs in Git. Owner: Drive/Git.
- Full source image packs: 29 new profiles need 56 approved source images each; F01 only has a starter portrait and early sheets. Required action: run image_factory by model priority; checksum and approve each image. Owner: Media.
- HeyGen training not complete: no private avatar has been created or consented/trained. Required action: upload approved source asset URL, create HeyGen private avatar, run test scripts. Owner: HeyGen.
- Supabase production verification: schemas are designed but not verified against a live project in this pass. Required action: run project inspection, migrations, RLS review, storage setup, advisors. Owner: Supabase.
- Approval console: governance exists in docs, but UI workflow is not complete. Required action: build admin approval queue for assets, posts, deploys, commerce changes. Owner: Frontend/Backend.

## Launch Gates

- All priority models have approved source packs or are excluded from launch.
- Every public asset has model ID, checksum, approval status, and fictional AI disclosure.
- Supabase schema, RLS, storage policies, and advisors are verified.
- Admin approval queue exists for public posts, commerce, deployments, and HeyGen training.
- Vercel production deploy has monitoring, rollback, and environment separation.
- No service role keys or secrets exist in frontend/public env vars.
- Content queue generates drafts only until publishing is approved.
- Telemetry dashboard reports assets, posts, leads, revenue, errors, and approvals.

## Automation Lanes

- intake lane
- identity lock lane
- asset generation lane
- asset QA lane
- approval lane
- HeyGen/private video lane
- content draft lane
- commerce draft lane
- analytics/telemetry lane
- winner cloning lane

## Security And Governance Standards

- Use OWASP ASVS as the app/API security checklist.
- Use NIST AI RMF / GenAI Profile for AI governance, risk controls, disclosure, and monitoring.
- Use Supabase RLS and least-privilege policies for all exposed tables and storage.
- Use Vercel observability/monitoring for deploy and runtime visibility.
- Keep high-impact external actions approval-gated.

## References

- OWASP ASVS: https://owasp.org/www-project-application-security-verification-standard/
- NIST AI RMF: https://www.nist.gov/itl/ai-risk-management-framework
- Supabase secure data: https://supabase.com/docs/guides/database/secure-data/
- Supabase shared responsibility: https://supabase.com/docs/guides/platform/shared-responsibility-model/
- Vercel observability: https://vercel.com/docs/observability
