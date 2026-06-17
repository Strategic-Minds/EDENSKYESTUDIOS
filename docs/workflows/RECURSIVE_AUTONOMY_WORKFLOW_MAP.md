# Recursive Autonomy Workflow Map

Status: validation workflow map
Last updated: 2026-06-17

This document maps the Eden Skye Studios recursive autonomy validation workflow from durable receipt files to route validation evidence.

## Primary Workflow

Workflow file: `.github/workflows/recursive-autonomy-validation.yml`

Expected lane input: `hourly_readiness`

The workflow should produce:

- `package-lock.json` artifact copy;
- `.autonomy-receipts/recursive-route-validation.json`;
- GitHub Actions run/job conclusion;
- route status summaries for readiness, default dry run, and hourly readiness dry run.

## Route Sequence

1. `/api/recursive-completion/readiness`
2. `/api/cron/recursive-completion-dry-run`
3. `/api/cron/recursive-completion-dry-run?lane=hourly_readiness`

## Expected Safety Signals

The validation receipt must preserve these facts:

- `liveMutationLocked=true` for protected execution surfaces;
- `dryRunForced=true` for dry-run cron validation;
- protected live actions listed as blocked;
- accepted Drive writer-link risk disclosed;
- route blockers listed if auth, secret, network, or provider validation fails.

## Receipt Flow

1. Repo durable receipts are stored under `docs/release/receipts/`.
2. Runtime route validation writes `.autonomy-receipts/recursive-route-validation.json` during the workflow.
3. The workflow uploads the validation receipt as a GitHub Actions artifact.
4. A later approved lane may mirror passing runtime receipts into Drive `01_RECURSIVE_COMPLETION_RECEIPTS`.

## Failure Handling

If route validation fails:

- keep `may_claim_full_autonomous_24_7=false`;
- keep `production_ready=false`;
- create or update a blocker receipt;
- do not execute protected live actions;
- do not upgrade manifest or readiness gates.

## Release Upgrade Boundary

This workflow can provide evidence for readiness. It does not itself approve full autonomous 24/7 mode. Any gate upgrade must be a separate explicit change after receipts and route validation pass.