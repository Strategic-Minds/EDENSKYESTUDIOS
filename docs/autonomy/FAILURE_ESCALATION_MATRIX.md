# Failure Escalation Matrix

Status: implementation contract
Last updated: 2026-06-16

## Purpose

Recursive operation must fail loudly and safely. This matrix defines how the system records and escalates failures without crossing protected boundaries.

## Escalation Levels

| Level | Meaning | Autonomous action | Protected action |
|---|---|---|---|
| L0 | Informational drift or expected accepted risk | Record in receipt | None |
| L1 | Non-critical missing receipt or stale doc | Create/update Drive receipt and GitHub issue comment | None |
| L2 | Repeated route, cron, build, or provider validation failure | Create/update GitHub issue, mark readiness partial, write blocker receipt | Do not deploy or mutate providers |
| L3 | Live provider, security, payment, database, publishing, or destructive-action risk | Create blocker receipt and approval packet | Do not execute live action |
| L4 | Evidence integrity loss or active destructive change | Stop autonomous lane, create critical blocker, require owner review | Do not self-heal destructively |

## Failure Classes

### Route Validation Failure

Trigger:

- readiness route unavailable;
- dry-run route unavailable;
- HTTP 403/401/5xx from approved validation path;
- response missing `liveMutationLocked` or `dryRunForced` where required.

Autonomous response:

- write blocker receipt;
- update issue #21 or successor;
- keep `may_claim_full_autonomous_24_7` false.

### Cron Receipt Failure

Trigger:

- no receipt after expected cadence;
- stale receipt older than cadence plus grace period;
- cron response lacks protected-action block list.

Autonomous response:

- create stale-cron receipt;
- update master readiness issue;
- keep cron lane in dry-run until three consecutive receipts pass.

### Persistent Receipt Failure

Trigger:

- Drive receipt write fails;
- GitHub issue/comment receipt fails;
- receipt payload is incomplete.

Autonomous response:

- return full receipt payload in route response;
- create GitHub issue/comment if Drive failed;
- mark storage status `blocked` if no durable store succeeds.

### Provider Boundary Failure

Trigger:

- provider bridge lacks read/write/execute boundary receipt;
- rollback proof missing;
- provider returns unauthorized, invalid key, migration failed, or write-shape mismatch.

Autonomous response:

- create provider blocker receipt;
- create or update GitHub issue;
- do not execute live provider mutation.

### Image/Content QA Failure

Trigger:

- generated asset lacks prompt/source metadata;
- QA score missing;
- quarantine decision missing;
- install packet lacks approval receipt.

Autonomous response:

- quarantine generated material;
- write receipt;
- keep public publishing and Shopify mutation blocked.

## Readiness Rule

A gate is complete only when it has a durable receipt. A plan, chat message, or route definition is not enough.

## Accepted Risk Disclosure

The Drive anyone-with-link writer posture is owner-accepted. It should be recorded as an accepted risk in receipts, not raised as a blocking remediation item unless there is unexpected destructive activity or sharing expansion beyond that posture.
