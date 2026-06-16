-- Reconciles remote Supabase migration 20260527020815_workbook_sync_contract_probe.
-- Production already records this migration. This file restores local version presence for Supabase branch-action source-truth checks.
-- No production database mutation is authorized by this repository-only repair.

select 1;
