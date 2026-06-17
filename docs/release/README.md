# Eden Autonomy Release Surface

Status: release evidence surface
Last updated: 2026-06-17

This directory is the repo-side release gate surface for Eden Skye Studios governed recursive autonomy.

It does not claim full autonomous 24/7 mode. It records the evidence required before that claim can become truthful.

## Current Gate

- `AUTO_SYSTEM_MANIFEST.json` keeps `readiness_gate.may_claim_full_autonomous_24_7=false`.
- `/api/readiness` keeps `production_ready=false`.
- Protected live actions remain approval-gated.
- Receipts in this directory are durable repo evidence mirrors unless they explicitly include Drive, GitHub Actions artifact, Supabase, or provider storage URLs.

## Required Release Evidence

The autonomy gate requires proof for:

1. Required canon and autonomy docs present.
2. Build, typecheck, and recursive route validation passing.
3. Persistent receipt writer receipts.
4. Failure escalation receipts.
5. Provider bridge read/write/execute boundary receipts and rollback proof.
6. Image/content draft QA, quarantine, and approval receipts.
7. Protected live actions remaining blocked.
8. Live readiness routes preserving mutation locks and dry-run behavior.

## Validation Route Sequence

After receipts exist, validate these routes in order through `.github/workflows/recursive-autonomy-validation.yml` with `lane=hourly_readiness`:

1. `/api/recursive-completion/readiness`
2. `/api/cron/recursive-completion-dry-run`
3. `/api/cron/recursive-completion-dry-run?lane=hourly_readiness`

## Protected Boundaries

Do not use this release surface to approve production deployment, Shopify mutation, payments or pricing changes, live HeyGen/avatar actions, Supabase production migrations, service-role writes, destructive Drive or GitHub actions, secret changes, public publishing, or paid generation bursts.

## Release Rule

The manifest and readiness gates may only be considered for upgrade after all required receipts exist and the validation workflow produces a passing route receipt artifact.