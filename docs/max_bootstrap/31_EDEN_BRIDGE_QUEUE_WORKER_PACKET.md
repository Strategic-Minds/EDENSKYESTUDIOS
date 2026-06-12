# Eden Bridge Queue Worker Packet

## Objective

Implement the missing `eden_bridge_queue` processor so Auto Builder can pick up GPT sandbox relay packets from Supabase and execute them from Vercel.

## Worker Route

`/api/cron/bridge-queue-worker`

## Vercel Cron

Runs every 5 minutes:

`*/5 * * * *`

## Behavior

1. Authorizes with `CRON_SECRET` when set.
2. Reads queued packets from Supabase:
   - `bridge_name = 'sandbox_egress_relay'`
   - `queue_state = 'queued'`
   - `approval_state = 'approved_for_production'`
3. Claims each packet by setting `queue_state = 'processing'`.
4. Sends the packet to `AUTO_BUILDER_ROUTER_URL`.
5. Marks the row `completed` or `failed`.
6. Writes a receipt to `eden_tool_receipts`.

## Required Cloud Env

- `SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`
- `AUTO_BUILDER_ROUTER_URL`
- `CRON_SECRET`

Optional:

- `AUTO_BUILDER_GPT_BRIDGE_SECRET`

## Safety

- The worker only processes packets already marked `approved_for_production`.
- It keeps `live_mutation_allowed = false` for relay packets.
- Shopify, payment, discount, and public publishing actions still require their own specific packets.
- Every dispatch writes a receipt.

## Files Added

- `lib/supabase-bridge-queue.ts`
- `app/api/cron/bridge-queue-worker/route.ts`

## Files Updated

- `vercel.json`

## Readiness

Status: `WORKER_READY_FOR_CLOUD_DEPLOY`

Once pushed to Vercel, the cron can process the already queued packet:

`eden-sandbox-relay-20260605-connector-001`
