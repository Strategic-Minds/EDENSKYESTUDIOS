# Recursive Completion Receipt Schema

Status: draft schema
Last updated: 2026-06-16
Related manifest: `AUTO_SYSTEM_MANIFEST.json`

## Purpose

Every recursive completion run must leave a receipt. Receipts are the trust layer for autonomous operation: they separate verified actions from intentions, blockers, and protected work that was queued instead of executed.

## Required Receipt Fields

| Field | Type | Required | Description |
|---|---|---|---|
| `receipt_id` | string | yes | Stable unique ID, such as `recursive-20260616T181400Z-hourly-readiness`. |
| `timestamp_utc` | string | yes | ISO 8601 UTC timestamp for the run. |
| `lane` | string | yes | Recursive lane, such as `hourly_readiness`, `daily_canon_drift`, or `daily_generator_queue`. |
| `actor` | string | yes | Agent, automation, workflow, or human operator that ran the lane. |
| `scope` | object | yes | Drive folder IDs, repo names, branches, routes, providers, or docs reviewed. |
| `inputs_read` | array | yes | Files, URLs, folder IDs, API routes, docs, or PR/issues read. |
| `actions_attempted` | array | yes | Actions the run attempted. |
| `actions_completed` | array | yes | Actions completed with evidence. |
| `protected_actions_blocked` | array | yes | Protected actions intentionally blocked or queued. |
| `artifacts_created` | array | yes | Generated docs, GitHub issues, PRs, Drive docs, receipts, prompts, or queues. |
| `validation_result` | object | yes | Pass/fail/blocked result plus evidence. |
| `blockers` | array | yes | Missing access, missing evidence, failed checks, or approval gates. |
| `next_actions` | array | yes | Smallest useful next steps. |
| `canonical_storage` | array | yes | Where the receipt was stored or linked. |

## JSON Shape

```json
{
  "receipt_id": "recursive-20260616T181400Z-daily-canon-drift",
  "timestamp_utc": "2026-06-16T18:14:00Z",
  "lane": "daily_canon_drift",
  "actor": "Drive Governance Agent",
  "scope": {
    "drive_folders": [
      "13uLhv0NRhmdCdJCCLrroLzyRRttoXtpr",
      "1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ"
    ],
    "repositories": [
      "Strategic-Minds/EDENSKYESTUDIOS",
      "Strategic-Minds/AUTO_BUILDER"
    ],
    "branch": "main"
  },
  "inputs_read": [],
  "actions_attempted": [],
  "actions_completed": [],
  "protected_actions_blocked": [],
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

## Status Values

| Status | Meaning |
|---|---|
| `pass` | Required checks completed and validated. |
| `partial` | Some checks completed, but non-critical evidence remains missing. |
| `blocked` | A connector, approval gate, credential, or protected boundary stopped completion. |
| `fail` | A required check failed and needs remediation. |

## Protected Action Receipt Rule

If a run encounters a protected action, the receipt must show:

- the action name;
- why it is protected;
- whether an approval packet, issue, or PR was created;
- what exact approval phrase or authority is required;
- proof that the protected action was not executed.

## Storage Rule

At least one durable storage location is required:

- Drive audit report or validation folder;
- repo documentation file;
- GitHub issue or PR body;
- GitHub workflow artifact when runtime automation is installed;
- Supabase row only after approved storage wiring exists.

Do not treat chat-only notes as sufficient receipts for 24/7 readiness.
