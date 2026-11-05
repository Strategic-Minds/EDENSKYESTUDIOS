# EDEN SKYE OS GitHub Actions Bridge

## Purpose
Resolve the connector limitation where ChatGPT can create files but cannot directly dispatch GitHub Actions or execute repository scripts.

## Problem
Current ChatGPT GitHub tools can:
- create files
- create commits
- inspect repo metadata

Current ChatGPT GitHub tools cannot:
- trigger workflow_dispatch
- run Node scripts in the repo
- execute repository code directly

## Bridge Pattern
Use a request-file bridge:
1. ChatGPT creates a request file under `.eden/bridge-requests/`.
2. A scheduled GitHub Action polls `.eden/bridge-requests/*.json`.
3. The Action validates the request.
4. The Action runs the approved generator or validation script.
5. The Action writes results to `.eden/bridge-results/`.
6. The Action commits generated artifacts and result logs.

## Safety Rules
- Only allow whitelisted actions.
- Default dry_run=true.
- No deploys.
- No schema applies.
- No Shopify/Stripe mutations.
- No publishing or scheduling.
- No billing changes.
- No overwrite writes.

## Whitelisted Bridge Actions
- generate_eden_skye_os_runtime_docs
- generate_system_completion_docs
- readiness_audit
- prompt_validation
- workflow_validation
- connector_manifest_check

## Required Request Shape
```json
{
  "request_id": "REQ-YYYYMMDD-HHMMSS",
  "action": "generate_eden_skye_os_runtime_docs",
  "requested_by": "ChatGPT",
  "dry_run": true,
  "created_at": "ISO_TIMESTAMP",
  "approval_required": false
}
```

## Required Result Shape
```json
{
  "request_id": "REQ-YYYYMMDD-HHMMSS",
  "status": "completed|failed|skipped",
  "created_files": [],
  "skipped_files": [],
  "errors": [],
  "commit_sha": "optional"
}
```

## Recommended Runtime
GitHub Actions scheduled every 5 or 15 minutes, plus manual workflow_dispatch for human fallback.

## Scaffold Runner Receipt (2026-11-05 local candidate)

The existing runner invokes the scaffold generator directly; it does not currently
consume or validate bridge request files. The request/result protocol above remains
a proposed separate capability, not implemented by this repair.

The generator now writes `.eden/bridge-results/scaffold-generation.json` after all
16 scaffold outputs and the existing Markdown report are readable. The versioned
receipt records each artifact path, SHA-256 and created/preserved/report disposition.
It verifies artifact presence and integrity only: `readiness_verified=false` and
`live_mutation=false`. It does not certify route correctness, deployment, provider
connectivity, request execution, or live readiness. Existing scaffold files remain
untouched. The generated JSON receipt is refreshed, unlike the preserved Markdown
report, which may describe an older pass. No secrets or environment values are read.

The workflow validates the required receipt before staging and retains the JSON
file pattern. Missing receipts, missing outputs, invalid contracts, duplicate or
unexpected paths, and hash mismatches fail the workflow. No placeholder receipt,
ignored failure, or optional staging pattern is used. Trigger schedules, permissions,
and production locks are unchanged.

### Plan Mode
- [x] Objective: repair run 41994660282 without suppressing required receipts.
- [x] Analyzed repository instructions, README, START_HERE, plan/build guidance,
  capabilities, bridge contract, generator, workflow, and GitHub run/job logs.
- [x] Source reconciled: current remote main is 71727a1535ff2dd77ffba8d385335568cd5e3990.
- [x] Dependencies: Node and Git only. Drive records not consulted for this local
  source-only fix; no remote, Drive, Base44, deployment or production changes made.
- [x] Acceptance: original staging pattern succeeds with real generated receipt;
  receipt failure tests reject invalid evidence. Publication and CI remain pending.

### Build Mode
- [x] Added receipt producer/validator, explicit workflow verification and tests.
- [x] Eight offline regression tests passed, including staging all 18 artifacts.
- [x] Updated bridge contract and operating changelog.
- [ ] Publish reviewed patch to a non-production branch only when authorized.
- [ ] Verify hosted CI on that branch, then review promotion separately. Do not rerun
  the old commit expecting this local repair to be included.

Status: locally validated candidate; hosted CI and production are not claimed fixed.
