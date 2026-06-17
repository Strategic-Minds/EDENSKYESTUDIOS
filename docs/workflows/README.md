# Eden Workflow Documentation

Status: workflow evidence surface
Last updated: 2026-06-17

This directory records repo-side workflow maps for Eden Skye Studios governed recursive autonomy.

It exists so future AUTO BUILDER runs can inspect workflow intent, route sequence, receipt requirements, and protected boundaries without relying only on chat memory.

## Current Workflow Surfaces

- `.github/workflows/recursive-autonomy-validation.yml`
- `app/api/recursive-completion/readiness/route.ts`
- `app/api/cron/recursive-completion-dry-run/route.ts`
- `app/api/workflows/eden-forensic-repair/route.ts`
- `app/api/workflows/eden-skye-autonomous-generator/route.ts`
- `vercel.json`

## Required Workflow Behavior

Recursive validation must prove:

- build and typecheck can pass from the lockfile;
- readiness route responds with mutation locks;
- dry-run route remains dry-run forced;
- protected live actions remain blocked;
- receipt artifacts are uploaded or durably stored;
- release gates remain false until all proof is present.

## Protected Boundaries

Workflows must not execute production deploys, Shopify mutations, public publishing, payments/pricing changes, live HeyGen/avatar actions, Supabase production writes, destructive Drive/GitHub operations, secret changes, or paid generation bursts without explicit approval.

## Workflow Map

See `RECURSIVE_AUTONOMY_WORKFLOW_MAP.md` for the validation sequence and receipt flow.