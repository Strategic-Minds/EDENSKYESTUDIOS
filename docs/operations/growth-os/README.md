# Eden Growth OS Builder Implementation

Status: implementation scaffold
Drive source package: `EDEN_GROWTH_OS_BUILDER_DOCS_2026_06_16.zip`
Drive file ID: `153ejo_YiRl00sf6iYKBOpM0aBOEA8KEO`

## Purpose

This folder mirrors the Eden Growth OS builder package into the EDENSKYESTUDIOS repo and defines the Vercel workflow, cron, and validation-agent implementation path.

The target runtime is a 24/7 draft-safe growth system that can discover signals, score opportunities, build approval-ready content packets, validate quality, diagnose failures, safely self-heal low-risk issues, and write receipts.

## Current Implementation In This Branch

- Adds a five-minute Growth OS heartbeat cron route at `/api/cron/growth-heartbeat`.
- Adds an internal validation-agent route at `/api/agents/eden-growth-os/validate`.
- Adds Vercel cron metadata for the heartbeat route.
- Keeps public execution disabled.
- Keeps social posting, Shopify mutation, payment changes, customer messages, and live avatar/video activation approval-gated.

## Runtime Modes

Supported mode values:

- `off`
- `monitor`
- `draft_safe`
- `approval_ready`
- `live_guarded`

Default expected production mode is `draft_safe`.

## Source Of Truth

Drive remains the canon source for broad operating doctrine. GitHub is the runtime mirror for code, route contracts, validation logic, and deployment behavior.

## Required Next Build Phases

1. Add Supabase Growth OS tables.
2. Add discovery ingestion routes.
3. Add opportunity scoring route.
4. Add prompt registry and content-packet builder.
5. Connect Metricool read-only analytics import for `thereal_edenskye`.
6. Expand admin dashboard tabs for Signals, Opportunities, Prompt Registry, Health, Incidents, Receipts, and Experiments.
7. Keep publication and Shopify/payment actions approval-gated until account mapping and receipts are verified.
