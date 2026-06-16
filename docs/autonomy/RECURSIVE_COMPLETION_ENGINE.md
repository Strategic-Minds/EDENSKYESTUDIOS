# Recursive Completion Engine

Status: draft implementation packet
Last updated: 2026-06-16
Manifest: `AUTO_SYSTEM_MANIFEST.json`

## Purpose

This document defines the governed recursive completion engine for Eden Skye Studios. The engine is allowed to keep improving the system without waiting for a human for every low-risk step, while preserving hard approval gates for live, public, financial, destructive, or production-changing actions.

The goal is not uncontrolled automation. The goal is continuous governed operation: detect gaps, generate drafts, validate evidence, write receipts, queue protected work, and escalate only when a protected boundary is reached.

## Plan Mode

- [x] Objective is clear: implement a recursive completion layer that can autonomously identify and generate missing system materials.
- [x] Existing files analyzed: `README.md`, `AGENTS.md`, `START_HERE.md`, `docs/PLAN_MODE_BUILD_MODE.md`, `docs/canon/AUTOMATION_AUTONOMY_ROADMAP.md`, `docs/canon/OPERATIONS_24_7_RUNBOOK.md`, `docs/canon/CROSS_SYSTEM_DOCUMENTATION_SYNC_POLICY.md`, and recent audit evidence.
- [x] Systems involved are identified: Google Drive canon, EDENSKYESTUDIOS repo, AUTO_BUILDER repo, Vercel, Supabase, Shopify, HeyGen, Xyla/Metricool/social surfaces, and GitHub.
- [x] Dependencies are listed in `AUTO_SYSTEM_MANIFEST.json`.
- [x] Approval gates are preserved in `AUTO_SYSTEM_MANIFEST.json`.
- [x] Risks and blockers are listed: Drive permissions, runtime receipt gaps, lockfile/build hardening, provider proof, image/content approval pipeline, and protected live actions.
- [x] Acceptance criteria are defined below.

## Build Mode

- [x] Add a machine-readable manifest at `AUTO_SYSTEM_MANIFEST.json`.
- [x] Add this recursive completion runbook.
- [x] Add recursive receipt and schema docs.
- [x] Update the operating changelog.
- [ ] Validate the manifest in CI or an approved runtime.
- [ ] Wire AUTO_BUILDER or a Vercel cron/agent lane to read the manifest and execute read-only/draft-safe lanes.
- [ ] Store recurring receipts in Drive and link them from repo issues or PRs when remediation is needed.

## Core Loop

Every recursive run follows this sequence:

1. Load `AUTO_SYSTEM_MANIFEST.json`.
2. Read the Drive canon folder, repo canon docs, and prior receipts.
3. Compare observed state to required enterprise documents and system elements.
4. Classify each gap by severity and action class.
5. Auto-fix only low-risk documentation/index/receipt gaps.
6. Auto-generate drafts for missing plans, prompts, content calendars, generator specs, and discovery packets.
7. Queue protected actions instead of executing them.
8. Validate the changed or generated surface.
9. Write a receipt using `docs/autonomy/RECURSIVE_COMPLETION_RECEIPT_SCHEMA.md`.
10. Create or update a GitHub issue/PR when the gap needs tracked remediation.

## Autonomous Lanes

### Hourly Readiness

Purpose: prove the system is alive and catch runtime drift early.

Allowed actions:
- Read `/api/readiness` when available.
- Check cron receipt freshness.
- Check latest validation report status.
- Record blockers.

Blocked actions:
- Production deploys.
- Secret changes.
- Provider writes.

### Daily Canon Drift

Purpose: keep Drive, repo docs, and audit history aligned.

Allowed actions:
- Compare required Drive docs and repo mirrors.
- Generate missing draft docs.
- Update non-authority indexes and changelog notes for the current run.
- Create drift receipts.

Blocked actions:
- Deleting or moving Drive files.
- Rewriting authority docs without current-session instruction.
- Broadening sharing.

### Daily Generator Queue

Purpose: create draft material needed for the studio to grow.

Allowed actions:
- Read model roster, prompt sources, image factory folders, and content strategy docs.
- Generate draft image prompt queues.
- Generate draft content calendars and script queues.
- Generate draft product/content/discovery packets.
- Route generated outputs to pending review.

Blocked actions:
- Public posting.
- Live Shopify publishing or product mutation.
- Paid generation bursts without approval.
- Live HeyGen/video activation.

### Weekly Business Discovery

Purpose: keep business, finance, and discovery materials evolving from evidence.

Allowed actions:
- Generate weekly strategy memo drafts.
- Generate discovery research packet drafts.
- Generate financial assumption updates from verified sources.
- Create GitHub issues for implementation needs.

Blocked actions:
- Payment, pricing, subscription, checkout, or discount changes.
- Treating unverified forecasts as actuals.

### Monthly Deep Governance Audit

Purpose: verify readiness toward enterprise-grade operation.

Allowed actions:
- Full Drive/repo alignment audit.
- Permission risk readback.
- Provider receipt review.
- Readiness score update.
- Audit report creation.

Blocked actions:
- Permission mutation without explicit approval.
- Destructive cleanup.

## Gap Classification

| Class | Meaning | Default autonomous action |
|---|---|---|
| Missing doc | Required doc absent or stale | Generate draft, write receipt, queue review |
| Drift | Drive and repo disagree | Preserve both, create drift report, propose fix |
| Runtime gap | Route/cron exists but no receipt | Create validation request, keep issue open |
| Provider gap | Integration named but not proven | Create provider receipt request |
| Security gap | Permission/secret/protected boundary risk | Log critical blocker, do not self-mutate |
| Content gap | Prompt/content/image asset missing | Generate draft queue, route to approval |
| Production gap | Live action needed | Queue approval packet only |

## File Generation Rules

Generated files must include:

- Title.
- Date/time.
- Source inputs.
- Canon location.
- Status: draft, pending review, active, blocked, or archived.
- Approval gate if relevant.
- Validation method.
- Receipt ID.
- Next action.

Generated files must not claim that a live provider, production deploy, public publish, payment action, or database write happened unless a verified receipt exists.

## Image And Content Generation Rules

The engine may generate image prompts, image task queues, content calendars, captions, scripts, thumbnails, product copy drafts, and discovery briefs.

It may not publish, install, move into public/live locations, mutate Shopify, activate HeyGen, or trigger paid/live generation without approval.

Every image/content item should move through this state path:

`draft_generated` -> `qa_scored` -> `pending_admin_review` -> `approved_for_install_packet` -> `installed_with_receipt` or `quarantined`

## Acceptance Criteria

This recursive implementation is ready for scheduler wiring when:

- `AUTO_SYSTEM_MANIFEST.json` exists and is readable.
- This runbook exists and matches the governance model.
- The receipt schema exists.
- A draft PR exists instead of an unreviewed direct production change.
- Protected actions remain blocked.

The system may claim full autonomous 24/7 operation only after the readiness gate in `AUTO_SYSTEM_MANIFEST.json` changes from false to true with receipts proving every required condition.
