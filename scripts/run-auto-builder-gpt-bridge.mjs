#!/usr/bin/env node
import { bridgeStatus, maybeRelayToRouter, printJson, writeReceipt } from './lib/autonomous-bridge-common.mjs';

const packet = {
  bridge_request_id: `auto-builder-gpt-${Date.now()}`,
  source: 'npm:bridge:auto-builder-gpt',
  requested_action: 'draft_bridge_status_sync',
  target_repo: 'Strategic-Minds/EDENSKYESTUDIOS',
  target_branch: 'eden/readiness-scaffold-20260604',
  live_mutation_allowed: false,
  approval_state: 'draft_only',
  payload: bridgeStatus({ runner: 'run-auto-builder-gpt-bridge' })
};

const relay = await maybeRelayToRouter(packet);
const receipt = { ...packet, relay, status: relay.relayed ? 'RELAYED' : 'DRY_RUN_READY' };
const receiptPath = writeReceipt('auto-builder-gpt-bridge-receipt', receipt);
printJson({ ...receipt, receipt_path: receiptPath });
