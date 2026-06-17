# Eden Autonomy Release Gate

Status: blocked pending durable proof
Last updated: 2026-06-17

This gate defines what must be true before Eden Skye Studios can truthfully claim full autonomous 24/7 operation.

## Current Decision

Do not claim full autonomous 24/7 mode.

Current gate values remain:

- `may_claim_full_autonomous_24_7=false`
- `production_ready=false`

These values are correct until every required proof item below has durable receipts and route validation evidence.

## Proven Present

- Canon docs exist under `docs/canon/`.
- Autonomy contracts exist under `docs/autonomy/`.
- Recursive readiness and dry-run routes exist in source.
- Vercel cron config includes `/api/cron/recursive-completion-dry-run`.
- The forensic repair workflow route exists.
- PR #29 recovery validation recorded build/typecheck/workflow success before merge.
- PR #30 Growth OS docs and validation manifest are merged.

## Documented But Not Fully Proven

- Persistent receipt writer behavior.
- Failure escalation behavior.
- Provider bridge read/write/execute boundaries with rollback receipts.
- Image/content QA quarantine and approval behavior.
- Three consecutive durable receipt writes for readiness, default dry run, and hourly readiness lanes.

## Required Receipts Before Upgrade

The release gate remains blocked until these durable receipt groups exist and are validated:

- Persistent receipt writer readiness receipts `01` through `03`.
- Persistent receipt writer default dry-run receipts `01` through `03`.
- Persistent receipt writer hourly-readiness receipts `01` through `03`.
- Route validation failure escalation receipt.
- Storage fallback failure escalation receipt.
- Provider boundary and rollback receipt.
- Image/content QA draft-pass receipt.
- Image/content QA quarantine receipt.
- Protected actions gate proof receipt.

## Validation Requirement

After the receipts exist, run `.github/workflows/recursive-autonomy-validation.yml` with `lane=hourly_readiness` and retain the uploaded `.autonomy-receipts/recursive-route-validation.json` artifact.

## Upgrade Rule

Only after the required receipts and validation artifact pass may a separate approval-gated change consider updating `AUTO_SYSTEM_MANIFEST.json` or `/api/readiness` gate values.

## Protected Action Rule

This gate does not authorize any production deploy, provider mutation, secret change, destructive action, public publication, commerce mutation, payment change, or paid generation burst.