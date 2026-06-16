-- Reconciles remote Supabase migration 20260601234702_eden_operating_tables.
-- Production already records this migration. This file restores local version presence for Supabase branch-action source-truth checks.
-- No production database mutation is authorized by this repository-only repair.

select 1;
