#!/usr/bin/env node
import { bridgeStatus, printJson, writeReceipt } from './lib/autonomous-bridge-common.mjs';

const baseUrl = process.env.BRIDGE_BASE_URL?.replace(/\/$/, '');
const probes = [];

if (baseUrl) {
  for (const route of ['/api/bridge/n8n/dispatch', '/api/eden/gates', '/api/factory/readiness']) {
    try {
      const response = await fetch(`${baseUrl}${route}`);
      probes.push({ route, ok: response.ok, status: response.status });
    } catch (error) {
      probes.push({ route, ok: false, error: error instanceof Error ? error.message : String(error) });
    }
  }
}

const status = bridgeStatus({
  runner: 'run-gpt-runtime-bridge',
  base_url_configured: Boolean(baseUrl),
  probes,
  note: baseUrl ? 'Runtime routes probed.' : 'Set BRIDGE_BASE_URL to probe deployed runtime routes.'
});
const receiptPath = writeReceipt('gpt-runtime-bridge-receipt', status);
printJson({ ...status, receipt_path: receiptPath });

if (status.missing_files.length || probes.some((probe) => probe.ok === false)) {
  process.exitCode = 1;
}
