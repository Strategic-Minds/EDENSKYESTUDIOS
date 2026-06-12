import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';

const requiredFiles = [
  'config/autonomous-bridge-manifest.json',
  'lib/autonomous-bridge.ts',
  'app/api/bridge/n8n/route.ts',
  'app/api/bridge/n8n/dispatch/route.ts',
  'app/api/cron/bridge-queue-worker/route.ts',
  'lib/supabase-bridge-queue.ts',
  'scripts/lib/autonomous-bridge-common.mjs',
  'scripts/enable-gpt-runtime-bridge.mjs',
  'scripts/run-auto-builder-gpt-bridge.mjs',
  'scripts/run-codex-autonomous-bridge.mjs',
  'scripts/run-gpt-runtime-bridge.mjs',
  'scripts/relay-auto-builder-packet.mjs',
  'workflows/n8n/eden-skye-always-on-bridge.blueprint.json'
];

for (const file of requiredFiles) {
  assert.ok(existsSync(file), `${file} must exist for autonomous bridge operation`);
}

const manifest = JSON.parse(readFileSync('config/autonomous-bridge-manifest.json', 'utf8'));
assert.equal(manifest.status, 'INSTALLED_DRAFT_ONLY');
assert.equal(manifest.live_mutations_enabled, false);
assert.equal(manifest.human_gate_required, true);
assert.equal(manifest.default_mode, 'dry_run_receipt_only');
assert.ok(manifest.protected_actions.includes('production_deploy'));
assert.ok(manifest.protected_actions.includes('shopify_mutation'));
assert.ok(manifest.protected_actions.includes('supabase_schema_mutation'));
assert.ok(manifest.protected_actions.includes('public_social_publish'));
assert.ok(manifest.bridge_surfaces.auto_builder_gpt.script.endsWith('run-auto-builder-gpt-bridge.mjs'));
assert.equal(manifest.bridge_surfaces.n8n_ingress.route, '/api/bridge/n8n');
assert.equal(manifest.bridge_surfaces.n8n_dispatch.route, '/api/bridge/n8n/dispatch');

const packageJson = JSON.parse(readFileSync('package.json', 'utf8'));
for (const scriptName of [
  'bridge:auto-builder-gpt',
  'bridge:codex',
  'bridge:gpt-runtime',
  'bridge:enable',
  'bridge:relay:auto-builder'
]) {
  assert.ok(packageJson.scripts[scriptName], `package.json must expose ${scriptName}`);
}

const bridgeLib = readFileSync('lib/autonomous-bridge.ts', 'utf8');
assert.match(bridgeLib, /live_mutations_enabled:\s*false/);
assert.match(bridgeLib, /human_gate_required:\s*true/);
assert.match(bridgeLib, /protectedBridgeActions/);
assert.match(bridgeLib, /bridgeActionLocked/);

const n8nRoute = readFileSync('app/api/bridge/n8n/route.ts', 'utf8');
assert.match(n8nRoute, /PROTECTED_ACTION_BLOCKED/);
assert.match(n8nRoute, /DRAFT_PACKET_ACCEPTED/);
assert.match(n8nRoute, /persistToolReceipt/);

const dispatchRoute = readFileSync('app/api/bridge/n8n/dispatch/route.ts', 'utf8');
assert.match(dispatchRoute, /N8N_DISPATCH_READY/);
assert.match(dispatchRoute, /Eden Visual Preview Bridge/);

for (const script of [
  'scripts/run-auto-builder-gpt-bridge.mjs',
  'scripts/run-codex-autonomous-bridge.mjs',
  'scripts/run-gpt-runtime-bridge.mjs',
  'scripts/enable-gpt-runtime-bridge.mjs',
  'scripts/relay-auto-builder-packet.mjs'
]) {
  const body = readFileSync(script, 'utf8');
  assert.match(body, /writeReceipt|maybeRelayToRouter|bridgeStatus/, `${script} must emit receipts or bridge status`);
  assert.doesNotMatch(body, /production_deploy\s*=\s*true|live_mutation_allowed:\s*true/, `${script} must not enable live mutation by default`);
}

console.log('PASS autonomous bridge guard');
