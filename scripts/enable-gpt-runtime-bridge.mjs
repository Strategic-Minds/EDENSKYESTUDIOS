#!/usr/bin/env node
import { bridgeStatus, printJson, writeReceipt } from './lib/autonomous-bridge-common.mjs';

const status = bridgeStatus({
  runner: 'enable-gpt-runtime-bridge',
  activation_status: 'DRAFT_ONLY',
  env_probe: {
    AUTO_BUILDER_ROUTER_URL: Boolean(process.env.AUTO_BUILDER_ROUTER_URL),
    AUTO_BRIDGE_EXECUTE: process.env.AUTO_BRIDGE_EXECUTE === '1',
    N8N_BRIDGE_SECRET: Boolean(process.env.N8N_BRIDGE_SECRET),
    AUTO_BUILDER_GPT_BRIDGE_SECRET: Boolean(process.env.AUTO_BUILDER_GPT_BRIDGE_SECRET),
    SUPABASE_URL: Boolean(process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY)
  }
});

const receiptPath = writeReceipt('autonomous-bridge-enable-receipt', status);
printJson({ ...status, receipt_path: receiptPath });

if (status.missing_files.length) {
  process.exitCode = 1;
}
