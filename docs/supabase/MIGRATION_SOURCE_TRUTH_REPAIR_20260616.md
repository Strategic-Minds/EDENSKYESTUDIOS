# Supabase Migration Source Truth Repair - 2026-06-16

This branch restores local migration-version files for historical Supabase migrations that are already recorded in the production Supabase migration history for project `prhppuuwcnmfdhwsagug`.

## Scope

- Repository source-truth repair only.
- No Supabase `apply_migration` call.
- No Supabase branch reset, rebase, or merge.
- No production database mutation.
- No Vercel production deploy, Shopify live commerce, payments, Drive promotion, or public publishing.

## Reason

Supabase branch-action logs repeatedly reported:

```text
Remote migration versions not found in local migrations directory.
```

PR #15 restored the five newest missing migration files. PR #16 restored the earlier historical version filenames so the connected repo migration directory could match the remote migration version ledger.

## Post-Merge Rerun Evidence

After PR #16 merged, Supabase branch-action did rerun against `git_ref=main`:

```text
2026/06/16 07:17:33 INFO Cloning git repo... git_ref=main
2026/06/16 07:17:36 INFO Checking service health... project_ref=prhppuuwcnmfdhwsagug
2026/06/16 07:17:36 INFO Skipping configuration for protected branch...
2026/06/16 07:17:36 INFO Connecting to database...
2026/06/16 07:17:38 Remote migration versions not found in local migrations directory.
```

That means the remaining blocker was not simply absence of a rerun.

## Config Context Repair

GitHub readback after the rerun found `supabase/config.toml` was missing on `main`. Supabase CLI documentation states `supabase init` creates this file, and the Supabase directory may contain migrations, functions, tests, and related project files. This repair adds a minimal project config:

```toml
project_id = "prhppuuwcnmfdhwsagug"
```

This is intended to give Supabase branch-action an explicit local project context while preserving the existing `supabase/migrations` directory.

## Important Caveat

The historical migration files added by PR #16 are reconciliation stubs. They intentionally avoid replaying production DDL because the production database already records these versions as applied. If the config-context repair does not clear branch-action validation, the next repair lane is full SQL reconstruction from `supabase_migrations.schema_migrations.statements` using a non-truncating extraction path.
