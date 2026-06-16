-- Reconciles remote Supabase migration 20260527021006_workbook_sync_contract.
-- Production already records this migration. This file restores local version presence for Supabase branch-action source-truth checks.
-- No production database mutation is authorized by this repository-only repair.

select 1;
