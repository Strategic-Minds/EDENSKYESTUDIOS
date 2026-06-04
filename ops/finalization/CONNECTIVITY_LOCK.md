# Eden Skye Studios Connectivity Lock

## Connectivity Principle

Every external tool is either:

1. Source of truth
2. Execution layer
3. Telemetry layer
4. Approval/promotion layer
5. Context layer

No execution tool overrides governance.

## System Roles

### GitHub

Role: source control, repo truth, code, manifests, contracts, receipts.

Allowed:

- read repo files
- create/update bootstrap docs
- create code changes after inspection
- open PRs when requested

Approval required:

- deleting files
- changing governance/source truth
- production-impacting config changes

### Google Drive

Role: media vault, artifact storage, working docs, source images, indexes.

Allowed:

- read folders/files
- index source assets
- create non-public working docs when connector supports it

Approval required:

- deleting, moving, overwriting, or publicly sharing assets

### Supabase

Role: state, queues, telemetry, approvals, receipts, content queue, media assets.

Allowed:

- inspect projects/tables/logs
- draft migrations
- generate SQL packets

Approval required:

- applying migrations
- modifying schema
- deleting data
- changing auth/RLS/storage policies

### Vercel

Role: frontend/runtime hosting, preview deployments, production deployments, cron route triggers.

Allowed:

- inspect intended config
- draft `vercel.json`
- prepare deployment packet

Approval required:

- production deploy
- env changes
- domain changes
- cron activation affecting public systems

### HeyGen

Role: avatar/video generation after source selection and approval.

Allowed:

- inspect available avatars when connector access is approved
- draft avatar creation packets
- draft video scripts

Approval required:

- create avatar
- train digital twin
- generate public-facing avatar video
- use paid credits at scale

### Runway / Image Generation

Role: cinematic image/video generation and visual expansion.

Allowed:

- draft prompts
- create private/sandbox media when appropriate

Approval required:

- public campaign release
- large paid generation batches
- final brand canon replacement

### Shopify

Role: storefront, offers, collections, checkout path.

Allowed:

- inspect store/products
- draft copy/offers

Approval required:

- product creation/update
- collection update
- pricing/discount change
- publishing store changes

### Metricool / SocialHub

Role: social drafts, scheduling, analytics, content planner.

Allowed:

- inspect timing/analytics when connected
- draft content plans

Approval required:

- schedule public posts
- publish live posts
- change account settings

## Required Receipts

Every connected action should produce a receipt with:

- tool
- operation
- run mode
- input summary
- output location
- approval state
- validation status
- next action

## Fallback Rule

If a connector is declined, unavailable, or insufficient, log `not_verified`, preserve the intended action as a packet, and do not claim completion.
