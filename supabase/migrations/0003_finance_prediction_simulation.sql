-- Reconciles remote Supabase migration 0003_finance_prediction_simulation.
-- Production already records this migration. This file restores local version presence for Supabase branch-action source-truth checks.
-- No production database mutation is authorized by this repository-only repair.

select 1;
