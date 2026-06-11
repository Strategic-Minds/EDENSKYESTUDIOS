# Auto Builder Image Install Executor Packet

## Phase

PHASE 3 / STEP 35

## Objective

Enable future GPTs and agents to call a governed Eden Skye image installation executor that validates approved canonical images before Drive and Supabase installation.

## Default mode

`dry_run`

## Required inputs

- `request_id`
- `approval_receipt_id`
- `mode`: `dry_run` or `install`
- `gates.public_use`
- `gates.drive_use`
- `gates.supabase_use`
- `assets[]` with `asset_id`, `status`, `source_kind`, Drive target, and Supabase destination metadata

## Executor behavior

1. Authenticate bearer token.
2. Validate all approval gates.
3. Reject every asset not marked `approved_public`.
4. Reject page boards, mockups, and temporary crops.
5. In `dry_run`, return `would_install` actions only.
6. In `install`, return install actions only when all gates pass.

## Current branch scope

This branch implements the route contract and governance tests only. It does not perform live Drive or Supabase writes.

## Release gate

Before wiring real writes, require a separate approval phrase authorizing live Drive/Supabase installation and confirming the exact canonical manifest rows that are `approved_public`.
