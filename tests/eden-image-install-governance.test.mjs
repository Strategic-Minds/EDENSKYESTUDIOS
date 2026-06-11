import assert from 'node:assert/strict';
import {
  BLOCKED_FINAL_STATUSES,
  buildInstallPlan,
  validateInstallRequest
} from '../lib/eden-image-install-governance.mjs';

const basePayload = {
  request_id: 'step35-test',
  approval_receipt_id: 'receipt-test',
  mode: 'dry_run',
  gates: {
    public_use: true,
    drive_use: true,
    supabase_use: true
  }
};

for (const status of BLOCKED_FINAL_STATUSES) {
  const result = validateInstallRequest({
    ...basePayload,
    assets: [
      {
        asset_id: `blocked-${status}`,
        status,
        source_kind: status === 'reference_board' ? 'page_board' : 'generated_image',
        drive_target_folder_id: 'drive-folder',
        supabase_bucket: 'eden-canonical-images',
        supabase_path: `blocked/${status}.png`
      }
    ]
  });

  assert.equal(result.ok, false, `${status} must not be installable`);
  assert.match(result.errors.join('\n'), /only approved_public|blocked source_kind/);
}

const missingGate = validateInstallRequest({
  ...basePayload,
  gates: {
    public_use: true,
    drive_use: false,
    supabase_use: true
  },
  assets: [
    {
      asset_id: 'approved-but-missing-gate',
      status: 'approved_public',
      source_kind: 'generated_image',
      drive_target_folder_id: 'drive-folder',
      supabase_bucket: 'eden-canonical-images',
      supabase_path: 'approved/test.png'
    }
  ]
});

assert.equal(missingGate.ok, false, 'all approval gates are required');
assert.match(missingGate.errors.join('\n'), /drive_use/);

const dryRunPlan = buildInstallPlan({
  ...basePayload,
  assets: [
    {
      asset_id: 'approved-public-test',
      status: 'approved_public',
      source_kind: 'generated_image',
      drive_target_folder_id: 'drive-folder',
      supabase_bucket: 'eden-canonical-images',
      supabase_path: 'approved/test.png'
    }
  ]
});

assert.equal(dryRunPlan.status, 'ready');
assert.equal(dryRunPlan.install_allowed, false);
assert.equal(dryRunPlan.actions[0].action, 'would_install');

const installPlan = buildInstallPlan({
  ...basePayload,
  mode: 'install',
  assets: [
    {
      asset_id: 'approved-public-test',
      status: 'approved_public',
      source_kind: 'generated_image',
      drive_target_folder_id: 'drive-folder',
      supabase_bucket: 'eden-canonical-images',
      supabase_path: 'approved/test.png'
    }
  ]
});

assert.equal(installPlan.status, 'ready');
assert.equal(installPlan.install_allowed, true);
assert.equal(installPlan.actions[0].action, 'install');

console.log('PASS eden image install governance');
