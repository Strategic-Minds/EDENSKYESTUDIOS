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
