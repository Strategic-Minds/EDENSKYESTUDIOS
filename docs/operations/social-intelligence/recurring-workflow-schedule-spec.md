# Recurring Workflow Schedule Specification

Status: schedule-ready specification
Date: 2026-06-16

## Objective

Install recurring intelligence, drift, reporting, and queue-prep workflows with safe output boundaries.

## Proposed Schedules

| Workflow | Cadence | Output | Execution ceiling |
|---|---:|---|---|
| Signal discovery scan | Daily 08:00 America/New_York | Ranked opportunity intake | Report only |
| Competitor and platform scan | Daily 12:00 America/New_York | Competitor/trend deltas | Report only |
| Approval-ready content queue build | Daily 15:00 America/New_York | Draft queue and approval packets | Draft only |
| KPI import/reporting check | Daily 17:00 America/New_York | KPI freshness and gaps | Report only |
| Drive-GitHub drift scan | Weekly Monday 09:00 America/New_York | Drift report and safe fix list | Non-destructive docs only |
| Growth review loop | Weekly Friday 16:00 America/New_York | Scale/stop/test-next report | Report only |

## Workflow Guardrails

Every scheduled workflow must:

- label evidence as verified, inferred, directional, or unverified
- stop before public posting or messaging
- write receipts for any Drive/GitHub documentation update
- preserve persona separation
- treat placeholder accounts as draft-only
- emit an approval packet rather than executing protected actions

## Installation Requirement

Before installing these schedules, confirm:

- scheduler surface
- timezone
- destination channel
- receipt destination
- owner approval for recurring automation
