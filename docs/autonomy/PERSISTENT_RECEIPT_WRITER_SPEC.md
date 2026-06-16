# Persistent Receipt Writer Spec

Status: implementation contract
Last updated: 2026-06-16

## Purpose

The recursive completion engine is not fully autonomous until every scheduled or manual lane writes durable receipts. This spec defines the minimum storage behavior required for recurring 24/7 operation.

## Primary Storage Target

Drive folder: `01_RECURSIVE_COMPLETION_RECEIPTS`

Folder ID: `1rTVnzOcIWQwMhtMIu824egpMws7MFbYj`

URL: https://drive.google.com/drive/folders/1rTVnzOcIWQwMhtMIu824egpMws7MFbYj

## Required Inputs

A receipt writer receives:

- lane name;
- trigger source: cron, manual, system, issue, PR, or recovery;
- actor;
- scope;
- inputs read;
- actions attempted;
- actions completed;
- protected actions blocked;
- accepted risks observed;
- validation result;
- blockers;
- next actions;
- artifacts created.

## Required Outputs

For each recursive run, write at least one durable receipt:

1. Google Drive receipt in the recursive receipt folder.
2. GitHub issue or PR comment when remediation is required.
3. Optional Supabase/tool receipt only after non-production and production write boundaries are validated.

Chat-only output is not a durable receipt.

## Receipt Naming

Use this format:

```text
Eden Recursive Receipt - <lane> - YYYY-MM-DD HHMM UTC
```

Example:

```text
Eden Recursive Receipt - hourly_readiness - 2026-06-16 2030 UTC
```

## Write Rules

- Write receipts for successes, partial runs, blocked runs, and failures.
- Never omit blocked protected actions.
- Never claim live mutation happened without provider proof.
- Always include the accepted Drive writer-link risk while that owner policy remains active.
- If Drive write fails, write a GitHub issue/comment receipt and mark Drive receipt storage as failed.
- If both Drive and GitHub write fail, return the full receipt payload in the route response and mark the lane as `blocked`.

## Minimal JSON Payload

```json
{
  "receipt_id": "recursive-YYYYMMDDTHHMMSSZ-lane",
  "timestamp_utc": "YYYY-MM-DDTHH:MM:SSZ",
  "lane": "hourly_readiness",
  "trigger": "cron",
  "actor": "Eden recursive completion engine",
  "scope": {},
  "inputs_read": [],
  "actions_attempted": [],
  "actions_completed": [],
  "protected_actions_blocked": [],
  "accepted_risks_observed": ["drive_anyone_with_link_writer_policy"],
  "artifacts_created": [],
  "validation_result": {
    "status": "pass|partial|blocked|fail",
    "evidence": [],
    "notes": ""
  },
  "blockers": [],
  "next_actions": [],
  "canonical_storage": []
}
```

## Activation Criteria

The receipt writer gate passes only when there are three consecutive successful receipts for:

- `/api/recursive-completion/readiness`;
- `/api/cron/recursive-completion-dry-run`;
- `/api/cron/recursive-completion-dry-run?lane=hourly_readiness`.

Each receipt must be stored in Drive and linked from the relevant GitHub issue or PR.
