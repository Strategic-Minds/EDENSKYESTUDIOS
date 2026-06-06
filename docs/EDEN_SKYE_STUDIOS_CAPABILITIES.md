# Eden Skye Studios Capabilities

This document records the current capability map for Eden Skye Studios.

## Source Repos

- Eden Skye Studios source repo: `Strategic-Minds/EDENSKYESTUDIOS`
- Auto Builder cloud factory repo: `Strategic-Minds/AUTO_BUILDER`
- Eden Vercel project id: `prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA`

The sandbox repo is not the Eden Skye Studios source of truth.

## Website Surfaces

- `/` public storefront and brand homepage
- `/login` member login preview
- `/payment` Black Card payment preview
- `/closet` Edens Closet changing-room and model experience preview
- `/admin/eden` route alias to Edens Closet
- `/admin` approval and media operations console

## Local Eden API Surfaces

- `/api/readiness` returns readiness and lock status
- `/api/eden/chat` supports governed Eden chat runtime behavior
- `/api/closet/session` creates draft-only Closet session plans
- `/api/xyla/draft` creates draft-only Xyla content packets
- `/api/cron/eden-media-preview` runs a Vercel cron readiness trigger

## Local Eden Bridge Surfaces

- `/api/bridge/registry` returns the bridge registry and queue list
- `/api/bridge/stack-readiness` returns readiness across GitHub, Drive, Vercel, Supabase, Shopify, and Xyla
- `/api/bridge/drive-move` queues Drive move packets; destructive parent changes require approval and an available Drive metadata executor
- `/api/bridge/github-move` queues GitHub move plans; destructive writes require approval
- `/api/bridge/vercel-preview` queues preview deploy/smoke-check packets and blocks production

## Auto Builder Cloud Bridge Surfaces

These are installed in Auto Builder and used as the governed cloud bridge layer for Eden runtime operations.

- `/api/bridge/eden/runtime`
  - GET: readiness
  - POST: governed read, queue, write, and execute router for GitHub, Vercel, Supabase, Drive, Shopify, and HeyGen
  - Write gate: bearer token plus `APPROVE EDEN RUNTIME WRITE`
  - Execute gate: bearer token plus `APPROVE EDEN RUNTIME EXECUTE`

- `/api/bridge/github/workflows`
  - Lists workflows
  - Dispatches approved workflows
  - Lists runs
  - Lists jobs
  - Reads job logs when token access exists
  - Risky dispatch gate: `APPROVE GITHUB WORKFLOW RUN`

- `/api/bridge/vercel/redeploy`
  - Redeploys supported Vercel targets in governed mode
  - Supports `auto_builder` and `eden_skye_studios`
  - Production gate: `APPROVE PRODUCTION DEPLOY`

- `/api/bridge/vercel/eden-preview`
  - Preview-only Eden Skye Studios deploy bridge
  - Production is blocked

- `/api/bridge/providers/runtime-status`
  - Runtime provider readiness map
  - Tracks universal runtime, GitHub workflow, and Vercel bridge readiness

## Connected Systems

### GitHub

Status: active, governed.

Capabilities:

- Repo inspection
- File create/update
- Bridge file documentation
- Workflow list, dispatch, run, job, and log operations through Auto Builder when credentials exist

Locks:

- No destructive move/delete/merge/force-push without approval
- No production-triggering workflow without approval

### Vercel

Status: preview-capable when credentials are installed.

Known Eden project id:

- `prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA`

Required variables:

- `VERCEL_TOKEN`
- `EDEN_SKYE_VERCEL_PROJECT_ID=prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA`
- `AUTO_BUILDER_VERCEL_PROJECT_ID` or `VERCEL_PROJECT_ID` for Auto Builder
- `VERCEL_TEAM_ID` if team-scoped

Locks:

- Production deploy requires explicit approval.

### Supabase

Status: project visible and healthy from connected context; writes are governed.

Known project:

- Project ref: `prhppuuwcnmfdhwsagug`
- Name: `Strategic Minds Advisory`
- Region: `us-east-2`

Universal runtime safe-write allowlist:

- `bridge_evidence`
- `bridge_blockers`
- `bridge_next_prompts`
- `bridge_connector_actions`
- `queue_jobs`
- `runtime_telemetry_events`
- `approval_queue`

Locks:

- No production migration or service-role write without approval.

### Google Drive

Status: connected for file discovery and Google Workspace work; direct move execution depends on Drive metadata tooling.

Capabilities:

- Control-plane spreadsheet
- Docs, Sheets, and Drive file work through connected tools
- Queue-first move bridge for image/file/folder moves

Control plane:

- `https://docs.google.com/spreadsheets/d/1D-2NTRPkvHfItlQ2LoDrrUNUrDZg9Iy1DvZ8GrxlrYg/edit`

Locks:

- No parent, sharing, delete, or destructive move without approval.

### Shopify

Status: store visible; mutations locked.

Known store:

- `eden-skye-studios.myshopify.com`

Capabilities:

- Product and collection inspection when needed
- Future product, collection, and offer wiring after approval

Locks:

- No product, collection, discount, inventory, payment, or checkout mutation without approval.

### HeyGen

Status: approved-use media bridge target; queue-first through universal runtime until direct server adapter is installed.

Capabilities:

- Avatar/video production planning
- Approved talking-video generation when connected and authorized

Locks:

- No live avatar/video-chat or paid production change without approval.

### Xyla

Status: draft packet output available locally.

Capabilities:

- Hook, spoken line, visual prompt, caption, CTA, and channel variants
- Draft-only content packets for Facebook, Instagram, X, TikTok, Pinterest, and Snapchat

Locks:

- No public publishing without approval.

## Documentation Maintenance

Any change to a route, workflow, bridge, environment variable, approval gate, connected-system behavior, or content/media process must update this file and the operating changelog.
