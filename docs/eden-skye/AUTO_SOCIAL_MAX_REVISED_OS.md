# Eden Skye Auto Social MAX Revised OS v1

Source of truth: [Eden Skye Auto Social MAX Revised OS v1 - 2026-06-07](https://docs.google.com/spreadsheets/d/16abS0dwSDs1H33P4FE05RBBukWAHpxq1mWMq3B4H2qA/edit?usp=drivesdk)

This document installs the revised MAX workbook as the operating system for Eden Skye Studios content, media, commerce, and approval workflows.

## Objective

Run a high-volume, governed content operation across GPT, Drive, GitHub, Vercel, Supabase, Shopify, Metricool, HeyGen, and the Higgsfield generation queue.

Default loop:

1. Trend discovery
2. Hook generation
3. Prompt generation
4. Image/video generation queue
5. Drive and Supabase storage
6. Scoring and approval
7. Scheduled publishing
8. Analytics
9. Winner replication

## Installed Workbook Tabs

The Drive workbook contains the revised 31-tab source architecture plus install tabs:

- `INSTALL_COMMAND_CENTER`
- `CONTENT_QUEUE_7DAY`
- `APPROVAL_QUEUE`
- `METRICOOL_SCHEDULE`
- `GIT_INSTALL_MANIFEST`
- `SYSTEM_RECEIPTS`

The first generated queue contains 1,365 planned content items for seven days at the workbook target of 195 posts per day.

## Daily Schedule Targets

| Platform | Daily Target | Current Execution State |
| --- | ---: | --- |
| TikTok | 60 | Metricool draft-ready after approval |
| Instagram | 40 | Metricool draft-ready after approval |
| YouTube Shorts | 40 | Queue-only until connector is available |
| X | 30 | Queue-only until connector is available |
| Pinterest | 25 | Queue-only until connector is available |

Facebook is connected in Metricool and can be used as an optional repost or campaign testing channel, but it is not part of the workbook's 195/day source target.

## Approval Gates

The system may draft, analyze, score, queue, and replicate. The following actions remain locked until explicit owner approval:

- Public publishing
- Production deploy
- Shopify mutation
- Payment or discount changes
- Mass email
- Storefront offer changes

Every public-facing asset must have a visual or asset link in the approval queue.

## GitHub/Vercel Integration

Preview branch: `shopify/v1-website-preview`

Installed routes:

- `/autopilot/max-os` for a read-only admin preview of the MAX OS packet
- `/api/autopilot/max-os/status` for machine-readable readiness state

Production deploy remains locked. Vercel preview is allowed.

## Supabase Integration Targets

Default schema targets from the workbook:

- `hooks`
- `prompts`
- `assets`
- `performance`
- `leads`
- `campaigns`
- `winners`
- `content_queue`
- `agent_runs`
- `tool_receipts`
- `approval_requests`
- `social_posts`
- `media_assets`
- `shopify_sync_events`

Migrations require project write approval before execution.

## Media Generation State

GPT is responsible for research, hooks, prompts, captions, scoring, and replication logic.

Higgsfield is represented as a generation queue in the workbook. Direct autonomous execution is blocked until a grounded Higgsfield API, connector, browser handoff, or uploaded credential workflow is available.

HeyGen is reserved for winner conversion: convert proven winning ideas into avatar videos after scoring and approval.

## Agent Rules

All Eden Skye agents working on this system must:

1. Start by reading this document and the Drive workbook.
2. Use the workbook as source truth for queue, approvals, and backlog.
3. Log receipts for generated assets, scheduled drafts, validation, and deploys.
4. Keep irreversible actions behind approval gates.
5. Use preview branch work before promotion.
6. Attach visual proof or a visual link for website and asset approvals.

## Current Blockers

- Higgsfield direct execution needs a connected API/connector/browser handoff.
- YouTube Shorts, X, and Pinterest are queue-only until publishing connectors are connected.
- Supabase schema writes require explicit project approval.
- Shopify mutations remain locked until approval.
