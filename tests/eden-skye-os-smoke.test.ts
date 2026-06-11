import assert from 'node:assert/strict';
import { existsSync, readFileSync } from 'node:fs';
import test from 'node:test';

const requiredFiles = [
  'app/pricing/page.tsx',
  'app/checkout/page.tsx',
  'app/success/page.tsx',
  'app/dashboard/page.tsx',
  'app/models/page.tsx',
  'app/models/[slug]/page.tsx',
  'app/closet/[slug]/page.tsx',
  'app/admin/gates/page.tsx',
  'app/admin/images/page.tsx',
  'app/admin/models/page.tsx',
  'app/admin/workflows/page.tsx',
  'app/admin/exceptions/page.tsx',
  'app/admin/quarantine/page.tsx',
  'app/admin/receipts/page.tsx',
  'app/api/workflows/eden-skye-tick/route.ts',
  'app/api/cron/shopify-sync/route.ts',
  'app/api/cron/autosocial/route.ts',
  'app/api/cron/metricool-sync/route.ts',
  'app/api/shopify/webhook/route.ts',
  'app/api/entitlements/sync/route.ts',
  'app/api/xyla/draft/route.ts',
  'app/api/metricool/draft/route.ts',
  'app/api/heygen/packet/route.ts',
  'supabase/migrations/0001_eden_skye_os.sql',
  'supabase/seed/eden_skye_seed.sql'
];

test('Eden full OS draft route and data files exist', () => {
  for (const file of requiredFiles) assert.equal(existsSync(file), true, file);
});

test('Vercel cron routes are present and draft-safe', () => {
  const vercel = JSON.parse(readFileSync('vercel.json', 'utf8'));
  const paths = vercel.crons.map((cron: { path: string }) => cron.path);
  for (const path of ['/api/workflows/eden-skye-tick', '/api/cron/shopify-sync', '/api/cron/autosocial', '/api/cron/metricool-sync']) {
    assert.equal(paths.includes(path), true, path);
  }
});
