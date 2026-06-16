# Recursive Validation Workflow

This document defines the governed validation path for proving recursive completion readiness without weakening protected production boundaries.

## Purpose

The recursive completion engine is intentionally dry-run first. Production cron execution is also intentionally protected by `CRON_SECRET`. Because unauthenticated external checks may return `401`, `403`, or `503`, readiness must be proven by a controlled validation workflow that can:

- generate a package lock candidate in a registry-capable environment;
- install dependencies from the generated lock;
- run typecheck and build checks;
- call the recursive readiness route;
- call the recursive dry-run cron route with the approved cron secret when available;
- write a structured receipt artifact.

## Workflow

The workflow lives at `.github/workflows/recursive-autonomy-validation.yml`.

It runs on:

- manual dispatch for targeted validation;
- a six-hour schedule for continuing readiness receipts after merge.

The workflow must not perform production deploys, Shopify mutation, public publishing, payments or pricing changes, live avatar or video actions, Supabase production writes, destructive Drive or GitHub writes, secret changes, or paid generation bursts.

## Receipt

The workflow writes `.autonomy-receipts/recursive-route-validation.json` and uploads it with the generated `package-lock.json` as an artifact.

The receipt must include:

- run actor and timestamp;
- base URL and lane;
- route URL, status, and response summary;
- `liveMutationLocked` and `dryRunForced` evidence;
- accepted Drive writer-link risk disclosure;
- protected actions blocked;
- blockers and next actions.

## Readiness Rule

This workflow can provide evidence for these readiness gates:

- lockfile generation in a registry-capable environment;
- build and typecheck receipts;
- route and cron dry-run receipts;
- continuing scheduled validation coverage.

It does not by itself authorize full autonomous 24/7 operation. The manifest may only set `may_claim_full_autonomous_24_7` to `true` after persistent receipt writing, provider boundary receipts, image/content QA receipts, live failure escalation receipts, and protected-action gate receipts are also proven.
