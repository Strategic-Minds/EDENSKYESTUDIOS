-- Reconciles remote Supabase migration 20260604203107_nashville_resin_worx_production_lock_v2.
-- Production already records this migration. This file restores local version presence for Supabase branch-action source-truth checks.
-- No production database mutation is authorized by this repository-only repair.

select 1;
