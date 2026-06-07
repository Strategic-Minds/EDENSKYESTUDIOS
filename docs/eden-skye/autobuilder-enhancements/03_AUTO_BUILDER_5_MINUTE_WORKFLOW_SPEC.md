# Eden Auto Builder 5-Minute Workflow Spec

## Cadence

Vercel cron: `*/5 * * * *`

## Cron Role

Cron is a trigger, not the worker. It should wake the system, check queues, enqueue safe work, record receipts, and exit quickly.

## Required Steps Per Tick

1. Run stack readiness check.
2. Pull pending content rows from Supabase/Drive source truth.
3. Score content readiness and gate state.
4. Dispatch approved generation jobs to Higgsfield/HeyGen queues.
5. Store returned assets in Drive and media_assets.
6. Prepare Metricool drafts when media and copy pass quality thresholds.
7. Keep public posting locked unless posting approval policy is separately approved.
8. Record tool receipts, failures, retries, and next action.
9. Run self-heal checks for missing media, stale jobs, failed provider calls, and queue bottlenecks.

## Validation

Every preview run must validate productionLocked=true, postingLocked=true, Shopify mutation locked, and payment/discount locked.