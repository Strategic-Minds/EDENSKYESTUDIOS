# Eden Release Ledger - 2026-06-16

## Release Posture

Production remains blocked. This ledger is an evidence and remediation control document for preview validation only. It is not approval for production deploy, Shopify mutation, payments, public publishing, production database mutation, Drive promotion, external messaging, paid generation, or destructive operations.

## Source Authorities

| Surface | Current Authority | Evidence | Status |
|---|---|---|---|
| Eden app repo | Strategic-Minds/EDENSKYESTUDIOS | Production delta baseline `d6d59c58e20cc1a8c9e2b0346c021c846656f58a`; latest audited main preview baseline `775bce91d8642f13a4edfca0673e10d6e8c6ae49`; PR #16 merged as Supabase source-truth stub repair; PR #17 is the active remediation lane | Preview remediation active |
| Managed Drive parent | V2 MASTER AUTO BUILDER | Folder ID `13uLhv0NRhmdCdJCCLrroLzyRRttoXtpr` | Permission remediation required |
| Eden OS Drive canon | EDEN_SKYE_STUDIOS_OS | Drive audit names this as likely current structured OS folder | Canonical status should remain explicit |
| Supabase project | Strategic Minds Advisory | Project ref `prhppuuwcnmfdhwsagug` | Active healthy, branch migration state needs repair |
| Vercel project | edenskyestudios | Project ID `prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA`; team `team_aFdds8lsbHMwe2ip4aQdbQ3d` | Preview active, production older than preview |

## Vercel Deployment Delta

| Field | Production | Main Preview Baseline |
|---|---|---|
| Deployment ID | `dpl_2cpGhj1UmJR3dHZyNMkZhSoJeUR5` | `dpl_7Xx8e4NF3fqKLRT5tSZVX7XykRwb` |
| Commit | `d6d59c58e20cc1a8c9e2b0346c021c846656f58a` | `775bce91d8642f13a4edfca0673e10d6e8c6ae49` |
| Target | `production` | `null` preview |
| Build state | READY | READY |
| Build result | Next.js 16.2.9, compile/typecheck/static generation passed | Next.js 16.2.9, compile/typecheck/static generation passed |
| Route count | 22 app routes generated | 22 app routes generated |
| Runtime concern | One production `/api/cron/eden-media-preview` receipt error in last 24h | No preview warning/error/fatal logs found in same window before route retest |

GitHub compare `d6d59c58e20cc1a8c9e2b0346c021c846656f58a...775bce91d8642f13a4edfca0673e10d6e8c6ae49` reported preview is 2 commits ahead of production with these changed files:

- Added `supabase/migrations/20260610093828_autonomous_control_plane_persistence.sql`
- Added `supabase/migrations/20260610114121_autobuilder_run_receipts.sql`
- Added `supabase/migrations/20260614083819_eden_black_card_entitlements_v2.sql`
- Added `supabase/migrations/20260614165303_eden_source_image_persistence.sql`
- Added `supabase/migrations/20260614165418_eden_source_image_function_search_path.sql`
- Modified `vercel.json`

## PR #17 Remediation Evidence

| Item | Evidence | Status |
|---|---|---|
| PR | #17 `Preview remediation: release ledger and build config normalization` | Draft/open remediation lane |
| Latest remediation commit | `293cd9884b3eb2127b0fc3eae74e9ee07c379ca7` | Active PR #17 head |
| Latest Vercel preview | `dpl_BrerQcUApPPiW9rx6WbYmzTjupyo`; URL `edenskyestudios-hi2c64akd-strategic-minds-advisory.vercel.app` | READY |
| Build result | Build completed, Next.js 16.2.9, compile/typecheck/static generation passed, 22 static pages generated | Passed |
| TypeScript normalization | Build no longer printed the previous explicit `We detected TypeScript and reconfigured your tsconfig.json` rewrite lines after the PR #17 config change | Improved |
| Readiness route | `GET /api/readiness` returned `status: yellow`, `production_ready:false`, and all major approval locks enabled | Passed with blockers |
| Workflow GET | `GET /api/workflows/eden-skye-autonomous-generator` returned `dryRunForced:true`, `liveMutationLocked:true`, and workflow registry | Passed |
| Cron dry run | `GET /api/cron/eden-skye-generator-tick` returned dry-run receipts with `live_mutation_performed:false` and no blockers | Passed |
| Media cron receipt | `GET /api/cron/eden-media-preview` returned `previewSafe:true`, but receipt `source: failed` | Blocked |
| Media cron receipt error | Latest diagnostic preview returned Supabase error `Invalid API key`; hint: double check Supabase anon or service_role API key | Vercel preview env secret/key repair required |
| Workflow POST dry-run | Route source confirms POST forces `dryRun:true`; container POST was blocked by outbound tunnel `403`, and Auto Builder browser/rest runner stayed planned because `BROWSER_WORKER_URL` is not configured | Not independently executed |
| Runtime logs | Latest preview runtime logs show one error from `/api/cron/eden-media-preview`: `Eden receipt failed {"messa...` | Blocked by invalid key |

## Supabase State

| Item | Evidence | Status |
|---|---|---|
| Project health | `prhppuuwcnmfdhwsagug` active healthy | OK |
| Branch statuses | Default `main`, `auto-builder/eden-skye-operating-backend-20260609`, and `sandbox/eden-skye-enterprise-os` still show `MIGRATIONS_FAILED` | Blocked |
| Branch-action root cause text | Latest branch-action log at `2026-06-16 07:17:38 UTC`: `Remote migration versions not found in local migrations directory.` | Still failing after PR #16 merge check |
| PR #16 source-truth repair | PR #16 merged and restored 31 historical migration-version files as `select 1` reconciliation stubs | Helps source presence, not fresh replay proof |
| PR #16 caveat | Historical files are explicit stubs, not original production DDL | Must not be treated as fresh database replay evidence |
| `tool_receipts` contract | Required non-null columns are `connector`, `action`, and `receipt_json` | PR #17 code now matches insert shape |
| `tool_receipts` shape probe | Non-persistent SQL transaction inserted `(connector, action, receipt_json)` and rolled back successfully | Table shape valid |
| `tool_receipts` runtime blocker | Preview route still fails with `Invalid API key` | Vercel preview Supabase env key invalid/stale |
| `runtime_telemetry_events` contract | Required columns: `telemetry_key`, `event_status`, `event_payload`, timestamps | Payloads must match this shape |
| API telemetry issue | Supabase API logs show mixed `201` and `400` for `POST /rest/v1/runtime_telemetry_events` | Specific callers are sending invalid payloads |
| `bridge_blockers` issue | Supabase API logs show `POST /rest/v1/bridge_blockers` returned `400`; table requires `blocker` and `state` | Specific caller payload mismatch |

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

## Rollback Reference

Current production rollback reference is the existing production deployment `dpl_2cpGhj1UmJR3dHZyNMkZhSoJeUR5`. Current audited main preview reference is `dpl_7Xx8e4NF3fqKLRT5tSZVX7XykRwb`. Current PR #17 remediation preview reference is `dpl_BrerQcUApPPiW9rx6WbYmzTjupyo`.

No production rollback or promotion was executed. Non-production rollback proof still needs a provider-specific redeploy/rollback validation target after the preview Supabase key is repaired.

## Required Next Repair Actions

1. Remove or downgrade anyone-with-link writer access in Drive using a Drive admin path that can edit permissions, then rerun the Drive permission audit.
2. Repair Vercel preview Supabase env values; the current preview receipt path returns `Invalid API key` despite the server-side env variable being present.
3. Re-run `/api/cron/eden-media-preview` and prove `receipt.source` becomes `supabase` or an approved non-production receipt target.
4. Re-trigger Supabase branch validation after PR #16 is fully reflected in the repo connected to Supabase; do not treat stub files as fresh replay evidence.
5. Patch telemetry callers so `runtime_telemetry_events` writes send `telemetry_key`, `event_status`, and `event_payload`.
6. Patch bridge blocker callers so `bridge_blockers` writes send required `blocker` and `state` fields.
7. Generate and commit `package-lock.json` from an environment with npm registry access.
8. Pin remaining `latest` dependency ranges from the generated lockfile.
9. Configure browser/rest worker or another independent validator capable of POSTing to protected previews, then run workflow POST dry-run.
10. Re-run preview build, preview route checks, secret-exposure checks, Supabase receipt write proof, and non-production rollback proof before requesting Eden production approval.
