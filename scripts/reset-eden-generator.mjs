import { rm, writeFile, mkdir } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';

const root = process.cwd();
const resetTargets = [
  'docs/avatars',
  'docs/agents',
  'docs/content',
  'workflows/eden-skye',
  'app/api/eden',
  'assets/eden-agents',
  'config/eden-skye-agent.json',
  'config/avatar-registry.schema.json',
  'config/content-engine.schema.json',
  'config/approval-gates.schema.json',
  'config/connector-routing.json',
  'config/monetization-paths.json',
  'config/platform-policy-map.json',
  'config/social-channel-map.json',
  'config/viral-category-library.json',
  'config/hashtag-library.json',
  'config/brand-safety-rules.json',
  'app/admin/eden/page.tsx',
  'app/admin/eden/gates/page.tsx',
  'app/admin/eden/avatars/page.tsx',
  'app/admin/eden/content/page.tsx',
  'app/admin/eden/monetization/page.tsx',
  'app/admin/eden/audit/page.tsx',
  'supabase/migrations/0001_eden_skye_readiness_scaffold.sql'
];

const forbiddenTargets = [
  'app/visual-source-truth.ts',
  'docs/EDEN_VISUAL_SOURCE_LOCK_2026-06-11.md',
  'app/page.tsx',
  'app/models',
  'app/closet',
  'app/generated-asset-styles.css',
  'public',
  'supabase/migrations/0005_enterprise_content_automation.sql'
];

function assertSafeTarget(target) {
  const normalized = target.replaceAll('\\', '/');
  for (const forbidden of forbiddenTargets) {
    if (normalized === forbidden || normalized.startsWith(`${forbidden}/`)) {
      throw new Error(`Refusing to reset locked or non-generator target: ${target}`);
    }
  }
}

function run(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, { cwd: root, stdio: 'inherit', shell: false });
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${command} ${args.join(' ')} exited with ${code}`));
    });
  });
}

const removed = [];
for (const target of resetTargets) {
  assertSafeTarget(target);
  const absolute = path.join(root, target);
  await rm(absolute, { recursive: true, force: true });
  removed.push(target);
  console.log('RESET', target);
}

await run('node', ['scripts/scaffold-eden-readiness.mjs']);

const receipt = {
  status: 'DRAFT_GENERATOR_RESET_COMPLETE',
  activation_status: 'STUB_ONLY',
  human_gate_required: true,
  locked_visual_source_truth_preserved: true,
  removed,
  rebuilt_by: 'scripts/scaffold-eden-readiness.mjs',
  no_live_mutation: true,
  no_production_deploy: true,
  no_shopify_payment_activation: true,
  no_supabase_production_mutation: true,
  generated_at: new Date().toISOString()
};

await mkdir(path.join(root, 'data/factory/receipts'), { recursive: true });
await writeFile(
  path.join(root, 'data/factory/receipts/eden-generator-reset-latest.json'),
  JSON.stringify(receipt, null, 2)
);
console.log(JSON.stringify(receipt, null, 2));
