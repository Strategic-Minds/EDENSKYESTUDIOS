# Eden Skye Studios Auto Builder Capability Bridge

This document records the Auto Builder-inspired bridge layer installed for `Strategic-Minds/EDENSKYESTUDIOS` and the cloud bridge layer installed in `Strategic-Minds/AUTO_BUILDER`.

## Operating Rule

Eden Skye Studios uses Auto Builder as the factory/control-plane guide, but Eden Skye Studios is the source repo for the website and storefront. The sandbox repo is not the Eden Skye Studios production source of truth.

All agents must analyze previous files before material commentary or implementation. Every new task, system, workflow, idea, bridge, route, automation, or data model must create or update a Plan Mode and Build Mode to-do list.

All risky external mutations stay approval-gated:

- no production deploy without approval
- no Shopify mutation without approval
- no public publishing without approval
- no payment, pricing, subscription, or discount change without approval
- no live HeyGen/avatar/video-chat session without approval
- no Supabase production migration or service-role write without approval
- no Drive parent, sharing, delete, or destructive move without approval
- no destructive GitHub write, merge, force-push, delete, or deploy-triggering change without approval

## Eden Repo Bridge Routes

These routes live in Eden Skye Studios.

- `/api/bridge/registry` returns the bridge registry and queue list.
- `/api/bridge/stack-readiness` returns capability status across GitHub, Drive, Vercel, Supabase, Shopify, and Xyla.
- `/api/bridge/drive-move` queues Drive image/file/folder move packets. It does not perform live Drive parent changes unless a grounded Drive metadata executor and approval are available.
- `/api/bridge/github-move` queues GitHub file/folder move plans and blocks destructive operations until reviewed.
- `/api/bridge/vercel-preview` queues preview deploy/smoke-check packets and blocks production deploys.

The canonical Eden-side registry lives in `lib/eden/capabilities.ts`.

## Auto Builder Cloud Bridge Routes

These routes live in Auto Builder and provide the broader governed cloud bridge layer.

- `/api/bridge/eden/runtime`
  - Universal runtime readiness and router for GitHub, Vercel, Supabase, Drive, Shopify, and HeyGen.
  - GET returns readiness.
  - POST supports read, queue, write, and execute requests.
  - Write requires bearer token plus `APPROVE EDEN RUNTIME WRITE`.
  - Execute requires bearer token plus `APPROVE EDEN RUNTIME EXECUTE`.
  - Drive, Shopify, and HeyGen remain queue-first until direct approved server adapters are installed.

- `/api/bridge/github/workflows`
  - Lists GitHub workflows.
  - Dispatches workflows.
  - Lists runs.
  - Lists jobs.
  - Reads logs when credentials allow it.
  - Risky dispatch requires `APPROVE GITHUB WORKFLOW RUN`.

- `/api/bridge/vercel/redeploy`
  - Redeploys `auto_builder` or `eden_skye_studios` in governed mode.
  - Preview redeploys can proceed when credentials exist.
  - Production requires `APPROVE PRODUCTION DEPLOY`.

- `/api/bridge/vercel/eden-preview`
  - Preview-only Eden Skye Studios deployment bridge.
  - Production is blocked by design.

- `/api/bridge/providers/runtime-status`
  - Lists runtime provider readiness, including the Eden universal runtime, GitHub workflows, Vercel preview, and Vercel redeploy bridges.

## Capability Registry

Current status:

- GitHub: active and governed. Repo reads/writes are available through connected tools; GitHub workflow operations run through the Auto Builder bridge when workflow token credentials exist.
- Google Drive: partial. Native file and Google Workspace operations are available through connected tools; destructive parent/sharing/delete operations require approval and grounded metadata execution.
- Vercel: preview-capable when credentials are installed. Eden project id is `prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA`; production remains locked.
- Supabase: partial. Project is visible and healthy; production migrations and service-role writes remain locked.
- Shopify: partial. Store info is visible; product, collection, inventory, discount, and checkout mutations remain locked.
- HeyGen: queue-first unless approved direct media generation is requested and credentials are present.
- Xyla: draft route exists; public publishing remains locked.

## Required Environment Variables

- `EDEN_RUNTIME_BRIDGE_TOKEN`
- `GITHUB_WORKFLOW_TOKEN` or `GITHUB_TOKEN`
- `VERCEL_TOKEN`
- `AUTO_BUILDER_VERCEL_PROJECT_ID` or `VERCEL_PROJECT_ID`
- `EDEN_SKYE_VERCEL_PROJECT_ID=prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA`
- `VERCEL_TEAM_ID` when team-scoped
- `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY` for approved server-side writes only
- `GOOGLE_CLIENT_EMAIL` and `GOOGLE_PRIVATE_KEY` when direct Drive server-side execution is approved
- `SHOPIFY_ADMIN_TOKEN` and `SHOPIFY_SHOP` for approved Shopify operations
- `HEYGEN_API_KEY` for approved HeyGen operations

## Drive Control Plane

The Google Sheet control plane has a `Capabilities v1` tab that mirrors the registry for human review:

https://docs.google.com/spreadsheets/d/1D-2NTRPkvHfItlQ2LoDrrUNUrDZg9Iy1DvZ8GrxlrYg/edit

Anything waiting for approval should be visible in the Drive control plane with a link or visual reference when possible.

## Next Enablement Steps

1. Confirm all required Vercel environment credentials are installed in Auto Builder and Eden Skye Studios.
2. Call Auto Builder runtime readiness through `/api/bridge/providers/runtime-status` and `/api/bridge/eden/runtime`.
3. Use `/api/bridge/github/workflows` to list and monitor preview workflow runs when network access and credentials allow it.
4. Expose or connect a Drive metadata move executor for approved addParents/removeParents-style folder movement.
5. Confirm Supabase receipt/queue tables before enabling approved service-role writes.
6. Install direct Shopify and HeyGen adapters only behind approval gates.
7. Keep all production deploys locked until explicit approval.
