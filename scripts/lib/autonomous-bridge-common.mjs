import { existsSync, readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, resolve } from 'node:path';

export const manifestPath = 'config/autonomous-bridge-manifest.json';
export const requiredBridgeFiles = [
  manifestPath,
  'lib/autonomous-bridge.ts',
  'app/api/bridge/n8n/route.ts',
  'app/api/bridge/n8n/dispatch/route.ts',
  'app/api/cron/bridge-queue-worker/route.ts',
  'lib/supabase-bridge-queue.ts',
  'workflows/n8n/eden-skye-always-on-bridge.blueprint.json'
];

export function loadManifest() {
  return JSON.parse(readFileSync(manifestPath, 'utf8'));
}

export function bridgeStatus(extra = {}) {
  const manifest = loadManifest();
  const missing = requiredBridgeFiles.filter((file) => !existsSync(file));
  return {
    status: missing.length ? 'BRIDGE_INCOMPLETE' : 'BRIDGE_READY_DRAFT_ONLY',
    checked_at: new Date().toISOString(),
    live_mutations_enabled: false,
    human_gate_required: true,
    manifest: manifestPath,
    missing_files: missing,
    bridge_surfaces: manifest.bridge_surfaces,
    protected_actions: manifest.protected_actions,
    ...extra
  };
}

export function writeReceipt(name, payload) {
  const out = resolve('data/factory/receipts', `${name}.json`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, `${JSON.stringify(payload, null, 2)}\n`);
  return out;
}

export async function maybeRelayToRouter(packet) {
  const execute = process.env.AUTO_BRIDGE_EXECUTE === '1';
  const routerUrl = process.env.AUTO_BUILDER_ROUTER_URL;
  if (!execute || !routerUrl) {
    return {
      relayed: false,
      mode: 'dry_run',
      reason: 'Set AUTO_BRIDGE_EXECUTE=1 and AUTO_BUILDER_ROUTER_URL to relay.'
    };
  }

  const headers = { 'Content-Type': 'application/json' };
  if (process.env.AUTO_BUILDER_GPT_BRIDGE_SECRET) {
    headers['x-auto-builder-gpt-secret'] = process.env.AUTO_BUILDER_GPT_BRIDGE_SECRET;
  }
  if (process.env.CRON_SECRET) {
    headers.authorization = `Bearer ${process.env.CRON_SECRET}`;
  }

  const response = await fetch(routerUrl, {
    method: 'POST',
    headers,
    body: JSON.stringify(packet)
  });
  const text = await response.text();
  let body = text;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    // Keep text response for diagnostics.
  }

  return {
    relayed: response.ok,
    mode: 'router_post',
    router_url: routerUrl,
    status: response.status,
    body
  };
}

export function printJson(value) {
  process.stdout.write(`${JSON.stringify(value, null, 2)}\n`);
}
