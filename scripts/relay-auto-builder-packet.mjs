#!/usr/bin/env node
import { existsSync, readFileSync } from 'node:fs';
import { bridgeStatus, maybeRelayToRouter, printJson, writeReceipt } from './lib/autonomous-bridge-common.mjs';

const packetPath = process.argv[2];
const packet = packetPath && existsSync(packetPath)
  ? JSON.parse(readFileSync(packetPath, 'utf8'))
  : {
      bridge_request_id: `auto-builder-relay-${Date.now()}`,
      source: 'npm:bridge:relay:auto-builder',
      requested_action: 'draft_packet_relay_probe',
      live_mutation_allowed: false,
      approval_state: 'draft_only',
      payload: bridgeStatus({ runner: 'relay-auto-builder-packet', packet_path: packetPath || null })
    };

if (packet.live_mutation_allowed === true) {
  const blocked = {
    status: 'PROTECTED_PACKET_BLOCKED',
    reason: 'relay-auto-builder-packet refuses live_mutation_allowed=true packets.',
    packet
  };
  const receiptPath = writeReceipt('auto-builder-packet-relay-blocked-receipt', blocked);
  printJson({ ...blocked, receipt_path: receiptPath });
  process.exit(1);
}

const relay = await maybeRelayToRouter(packet);
const receipt = { status: relay.relayed ? 'RELAYED' : 'DRY_RUN_READY', packet, relay };
const receiptPath = writeReceipt('auto-builder-packet-relay-receipt', receipt);
printJson({ ...receipt, receipt_path: receiptPath });
