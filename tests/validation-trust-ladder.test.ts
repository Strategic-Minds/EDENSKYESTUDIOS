import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const guardedFiles = [
  'app/api/workflows/eden-skye-tick/route.ts',
  'app/api/cron/shopify-sync/route.ts',
  'app/api/cron/autosocial/route.ts',
  'app/api/cron/metricool-sync/route.ts',
  'app/api/shopify/webhook/route.ts',
  'app/api/entitlements/sync/route.ts',
  'app/api/metricool/draft/route.ts',
  'app/api/heygen/packet/route.ts'
];

test('Draft endpoints do not enable live actions', () => {
  for (const file of guardedFiles) {
    const source = readFileSync(file, 'utf8');
    assert.match(source, /live:\s*false|live: false/, file);
    assert.doesNotMatch(source, /live:\s*true|publishEnabled:\s*true|mutationEnabled:\s*true|paidGenerationEnabled:\s*true/, file);
  }
});
