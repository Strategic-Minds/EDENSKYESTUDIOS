# Recurring Workflow Schedule Specification

Status: installed and enabled
Date: 2026-06-16
Timezone: America/New_York
Channel: ChatGPT

## Objective

Run recurring intelligence, drift, reporting, and queue-prep workflows with safe output boundaries.

## Installed Schedules

| Workflow | Cadence | Output | Execution ceiling |
|---|---:|---|---|
| Signal discovery scan | Daily 08:00 | Ranked opportunity intake | Report only |
| Competitor and platform scan | Daily 12:00 | Competitor/trend deltas | Report only |
| Approval-ready content queue build | Daily 15:00 | Draft queue and approval packets | Draft only |
| KPI import/reporting check | Daily 17:00 | KPI freshness and gaps | Report only |
| Drive-GitHub drift scan | Weekly Monday 09:00 | Drift report and safe fix list | Non-destructive docs only |
| Growth review loop | Weekly Friday 16:00 | Scale/stop/test-next report | Report only |

## Workflow Guardrails

Every scheduled workflow must:

- label evidence as verified, inferred, directional, or unverified
- stop before public posting or messaging
- stop before paid promotion
- stop before production deploys
- stop before live avatar activation
- write receipts for any Drive/GitHub documentation update
- preserve persona separation
- treat placeholder accounts as draft-only
- emit an approval packet rather than executing protected actions

## Placeholder Rule

If a target account still uses placeholder handle or account ID values, the workflow may:

- research
- score
- route
- draft
- build approval packets
- report gaps

It may not:

- schedule
- publish
- reply publicly
- send direct messages
- spend money
- mutate live platform settings

## Installation Closeout

The schedules are installed as recurring agent runs in this ChatGPT channel. They are not live social publishing automations.
