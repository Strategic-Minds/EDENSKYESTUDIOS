import { access } from 'node:fs/promises';

const required = [
  'scripts/scaffold-eden-readiness.mjs',
  'scripts/reset-eden-generator.mjs',
  'docs/avatars/avatar-registry.json',
  'docs/content/content-seeds.json',
  'app/api/eden/health/route.ts',
  'app/admin/eden/page.tsx',
  'assets/eden-agents/eden-skye.svg',
  'supabase/migrations/0001_eden_skye_readiness_scaffold.sql',
  'data/factory/receipts/eden-generator-reset-latest.json'
];

let ok = true;
for (const file of required) {
  try {
    await access(file);
    console.log('PASS', file);
  } catch {
    ok = false;
    console.log('FAIL', file);
  }
}

process.exit(ok ? 0 : 1);
