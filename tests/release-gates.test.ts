import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const gatePage = readFileSync('app/admin/gates/page.tsx', 'utf8');
const seed = readFileSync('supabase/seed/eden_skye_seed.sql', 'utf8');

const gates = [
  'Production Deployment Gate',
  'Payment Activation Gate',
  'Social Publishing Gate',
  'External Email Gate',
  'Public Release Gate',
  'Black Card Release Gate',
  'HeyGen Live Activation Gate',
  'Spend Gate'
];

test('Eden release gates stay locked in draft branch', () => {
  for (const gate of gates) {
    assert.match(gatePage, new RegExp(gate));
    assert.match(seed, new RegExp(gate));
  }
  assert.match(seed, /locked/);
  assert.doesNotMatch(seed, /unlocked|approved_live|active_live/);
});
