# Eden Autonomous GPT Bridge Packet - 2026-06-12

## Current Status

Status: `INSTALLED_DRAFT_ONLY`

The existing bridge queue worker was already present, but the package scripts for the autonomous bridge pointed to missing files. The n8n blueprint also referenced `/api/bridge/n8n` and `/api/bridge/n8n/dispatch`, but those routes were missing.

This packet installs the missing bridge layer without enabling protected live mutations.

## Source Truth

- `config/autonomous-bridge-manifest.json`
- `lib/autonomous-bridge.ts`
- `app/api/bridge/n8n/route.ts`
- `app/api/bridge/n8n/dispatch/route.ts`
- `app/api/cron/bridge-queue-worker/route.ts`
- `workflows/n8n/eden-skye-always-on-bridge.blueprint.json`
- `docs/EDEN_EXACT_IMAGE_SOURCE_MANIFEST_2026-06-12.json`
- `docs/EDEN_DRIVE_DISCOVERY_MANIFEST_2026-06-12.json`

## System Boundary

The bridge may:

- inspect readiness
- emit receipts
- accept draft bridge packets
- block protected actions
- expose dispatch queues to n8n/GPT runtimes
- relay packets only when `AUTO_BRIDGE_EXECUTE=1` and `AUTO_BUILDER_ROUTER_URL` are configured
- process already approved Supabase queue rows through `/api/cron/bridge-queue-worker`

The bridge may not automatically perform:

- production deploys
- Shopify mutations
- payment or discount changes
- Supabase schema mutations
- public social publishing
- domain or billing changes
- secret writes or rotations
- database deletion or overwrite
- theme publishing
- PR ready-for-review movement
- merge or release actions

## Frontend Plan

No new visible frontend surface is required for this pass. The bridge is API/script/workflow infrastructure.

Future admin UI may expose bridge state through an Eden admin panel, but this pass keeps the system small and testable.

## Backend Plan

Installed backend surfaces:

- `/api/bridge/n8n` accepts draft-only bridge packets, checks bridge secrets when configured, blocks protected live actions, and writes receipts when Supabase receipt storage is configured.
- `/api/bridge/n8n/dispatch` exposes dispatchable routes and workflow instructions for n8n/GPT runtimes.
- `/api/cron/bridge-queue-worker` remains the existing Supabase queue processor for approved packets.

## Repo And File Map

Added:

- `config/autonomous-bridge-manifest.json`
- `lib/autonomous-bridge.ts`
- `app/api/bridge/n8n/route.ts`
- `app/api/bridge/n8n/dispatch/route.ts`
- `scripts/lib/autonomous-bridge-common.mjs`
- `scripts/enable-gpt-runtime-bridge.mjs`
- `scripts/run-auto-builder-gpt-bridge.mjs`
- `scripts/run-codex-autonomous-bridge.mjs`
- `scripts/run-gpt-runtime-bridge.mjs`
- `scripts/relay-auto-builder-packet.mjs`
- `tests/autonomous-bridge.test.mjs`

Updated:

- `package.json`

## Tool And Integration Plan

- `npm run bridge:enable` verifies local bridge installation and writes a receipt.
- `npm run bridge:auto-builder-gpt` creates an AUTO BUILDER packet and relays only when explicitly enabled.
- `npm run bridge:codex` verifies Codex branch-safe bridge readiness.
- `npm run bridge:gpt-runtime` probes deployed runtime routes when `BRIDGE_BASE_URL` is set.
- `npm run bridge:relay:auto-builder [packet.json]` relays a packet only when `AUTO_BRIDGE_EXECUTE=1` and `AUTO_BUILDER_ROUTER_URL` are set.

## Validation Plan

Run:

```bash
npm test
npm run bridge:enable
npm run bridge:auto-builder-gpt
npm run bridge:codex
npm run bridge:gpt-runtime
npm run build
```

Then run `Eden Visual Preview Bridge` to verify screenshots before visual approval or PR movement.

## Required Docs And Playbooks

- `docs/EDEN_AUTONOMOUS_GPT_BRIDGE_PACKET_2026-06-12.md`
- `docs/max_bootstrap/31_EDEN_BRIDGE_QUEUE_WORKER_PACKET.md`
- `workflows/n8n/eden-skye-always-on-bridge.blueprint.json`

## Blockers Or Missing Pieces

- This session does not expose Drive copy/rename/upload tools.
- This session does not expose GitHub Actions workflow dispatch.
- Local repo clone remains blocked by network 403, so local `npm test` and `npm run build` could not be run here.
- Bridge execution beyond dry-run requires approved runtime env values and a deployed preview.

## Next Best Prompt

Run the Eden Visual Preview Bridge on PR #2 head, download `eden-visual-preview-evidence`, review screenshots, then decide whether visuals are approved. Keep PR #2 draft until screenshot review passes.
