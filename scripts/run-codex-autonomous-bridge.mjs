#!/usr/bin/env node
import { bridgeStatus, printJson, writeReceipt } from './lib/autonomous-bridge-common.mjs';

const status = bridgeStatus({
  runner: 'run-codex-autonomous-bridge',
  codex_mode: 'branch_safe_repo_patch_and_receipt',
  allowed_actions: ['inspect', 'draft', 'validate', 'create_branch_safe_patch', 'write_receipt'],
  blocked_actions: ['production_deploy', 'shopify_mutation', 'supabase_schema_mutation', 'public_social_publish', 'merge_or_release']
});
const receiptPath = writeReceipt('codex-autonomous-bridge-receipt', status);
printJson({ ...status, receipt_path: receiptPath });

if (status.missing_files.length) {
  process.exitCode = 1;
}
