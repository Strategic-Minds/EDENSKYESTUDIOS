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

PR #15 restored the five newest missing migration files. This follow-up restores the earlier historical version filenames so the connected repo migration directory matches the remote migration version ledger.

## Important Caveat

The historical files in this PR are reconciliation stubs. They intentionally avoid replaying production DDL because the production database already records these versions as applied. Before using this branch for fresh database replay, branch reset, branch rebase, or production hardening, run a separate validation gate and confirm whether full original SQL reconstruction is required.
