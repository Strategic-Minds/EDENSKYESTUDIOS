# Eden Release Ledger - 2026-06-16

## Release Posture

Production remains blocked. This ledger is an evidence and remediation control document for preview validation only. It is not approval for production deploy, Shopify mutation, payments, public publishing, production database mutation, Drive promotion, external messaging, paid generation, or destructive operations.

## Source Authorities

| Surface | Current Authority | Evidence | Status |
|---|---|---|---|
| Eden app repo | Strategic-Minds/EDENSKYESTUDIOS | Main preview commit `775bce91d8642f13a4edfca0673e10d6e8c6ae49` | Active app source |
| Managed Drive parent | V2 MASTER AUTO BUILDER | Folder ID `13uLhv0NRhmdCdJCCLrroLzyRRttoXtpr` | Permission remediation required |
| Eden OS Drive canon | EDEN_SKYE_STUDIOS_OS | Drive audit names this as likely current structured OS folder | Canonical status should remain explicit |
| Supabase project | Strategic Minds Advisory | Project ref `prhppuuwcnmfdhwsagug` | Active healthy, branch migration state needs repair |
| Vercel project | edenskyestudios | Project ID `prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA` | Preview active, production older than preview |

## Vercel Deployment Delta

| Field | Production | Current Main Preview |
|---|---|---|
| Deployment ID | `dpl_2cpGhj1UmJR3dHZyNMkZhSoJeUR5` | `dpl_7Xx8e4NF3fqKLRT5tSZVX7XykRwb` |
| Commit | `d6d59c58e20cc1a8c9e2b0346c021c846656f58a` | `775bce91d8642f13a4edfca0673e10d6e8c6ae49` |
| Target | `production` | `null` preview |
| Build state | READY | READY |
| Build result | Next.js 16.2.9, compile/typecheck/static generation passed | Next.js 16.2.9, compile/typecheck/static generation passed |
| Route count | 22 app routes generated | 22 app routes generated |
| Known build concern | Vercel rewrote tsconfig during build | Vercel rewrote tsconfig during build before this remediation branch |
| Runtime concern | One production `/api/cron/eden-media-preview` receipt error in last 24h | No preview warning/error/fatal logs found in same window |

## GitHub Commit Delta From Production To Preview

GitHub compare `d6d59c58e20cc1a8c9e2b0346c021c846656f58a...775bce91d8642f13a4edfca0673e10d6e8c6ae49` reports preview is 2 commits ahead of production with 6 changed files:

- Added `supabase/migrations/20260610093828_autonomous_control_plane_persistence.sql`
- Added `supabase/migrations/20260610114121_autobuilder_run_receipts.sql`
- Added `supabase/migrations/20260614083819_eden_black_card_entitlements_v2.sql`
- Added `supabase/migrations/20260614165303_eden_source_image_persistence.sql`
- Added `supabase/migrations/20260614165418_eden_source_image_function_search_path.sql`
- Modified `vercel.json`

Production does not yet include this latest source-truth reconciliation.

## Supabase State

| Item | Evidence | Status |
|---|---|---|
| Project health | `prhppuuwcnmfdhwsagug` active healthy | OK |
| Security advisors | No security lints observed in audit | OK |
| Branch statuses | Default `main`, `auto-builder/eden-skye-operating-backend-20260609`, and `sandbox/eden-skye-enterprise-os` show `MIGRATIONS_FAILED` | Blocked |
| Branch-action root cause text | `Remote migration versions not found in local migrations directory.` | Repo migration source history incomplete relative to remote history |
| `runtime_telemetry_events` table contract | Required columns: `telemetry_key`, `event_status`, `event_payload`, timestamps | Payloads must match this shape |
| API telemetry issue | Recent `POST /rest/v1/runtime_telemetry_events` returns mixed `201` and `400` | Specific callers are sending invalid payloads |
| `bridge_blockers` issue | Recent `POST /rest/v1/bridge_blockers` returned `400`; table requires `blocker` and `state` | Specific caller payload mismatch |

## Drive State

The latest Drive audit reports anyone-with-link writer access on the managed root, audit folder, and sampled child folders. This prevents Drive from being treated as approval-grade evidence until remediated.

Connector capability note: this session could read metadata and add sharing, but did not expose a folder permission removal or downgrade operation. No Drive permissions were changed by this remediation branch.

## Dependency And Build Config Remediation

| Item | Action | Status |
|---|---|---|
| Next.js version | Pinned `next` to `16.2.9`, the version proven by Vercel build logs | Applied on remediation branch |
| npm toolchain | Added `packageManager: npm@11.9.0` | Applied on remediation branch |
| TypeScript config | Set `jsx` to `react-jsx` and included `.next/dev/types/**/*.ts` | Applied on remediation branch |
| Lockfile | `package-lock.json` is absent from main; local npm registry access returned `403`, so lockfile generation was not possible in this session | Blocked; generate in GitHub Actions or Vercel-capable environment |
| Remaining latest ranges | `@supabase/supabase-js`, `react`, `react-dom`, `@types/node`, `@types/react`, and `typescript` remain `latest` until a real lockfile can be generated | Still blocked |

## Preview Validation Checklist

| Gate | Required Evidence | Status |
|---|---|---|
| Readiness route | `GET /api/readiness` on preview returns `production_ready:false` and governed locks | Required before production claim |
| Workflow GET | `GET /api/workflows/eden-skye-autonomous-generator` returns `dryRunForced:true` | Required |
| Workflow POST dry run | `POST /api/workflows/eden-skye-autonomous-generator` returns passed or blocked dry-run receipt, never live mutation | Required |
| Cron dry run | `GET /api/cron/eden-skye-generator-tick` on preview returns dry-run receipts with `live_mutation_performed:false` | Required |
| Supabase receipt write | Receipt write must match table schema and persist cleanly without `400` | Blocked until payload mismatch is fixed |
| Rollback evidence | Identify rollback target deployment and non-production redeploy/rollback proof | Required |
| Secret exposure | Routes and logs must not expose secret values | Required |
| Drive evidence authority | Link-writer access removed or downgraded | Blocked |
| Production approval | Explicit operator approval after all gates pass | Not requested |

## Rollback Reference

Current production rollback reference is the existing production deployment `dpl_2cpGhj1UmJR3dHZyNMkZhSoJeUR5`. Current main preview reference is `dpl_7Xx8e4NF3fqKLRT5tSZVX7XykRwb`. Production promotion is blocked until Drive permission, Supabase branch, telemetry payload, dependency lockfile, preview validation, and rollback gates pass.

## Required Next Repair Actions

1. Remove or downgrade anyone-with-link writer access in Drive using a Drive admin path that can edit permissions.
2. Reconcile complete Supabase migration source history against the repo connected to Supabase branching.
3. Patch telemetry callers so `runtime_telemetry_events` writes send `telemetry_key`, `event_status`, and `event_payload`.
4. Patch bridge blocker callers so `bridge_blockers` writes send required `blocker` and `state` fields.
5. Generate and commit `package-lock.json` from an environment with npm registry access.
6. Pin remaining `latest` dependency ranges from the generated lockfile.
7. Re-run preview build and preview validation evidence before requesting any Eden production approval.
