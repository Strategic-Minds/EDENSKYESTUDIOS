import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const driveModule = readFileSync('app/drive-source-truth.ts', 'utf8');
const driveManifestPath = 'docs/EDEN_DRIVE_DISCOVERY_MANIFEST_2026-06-12.json';
const exactImageManifestPath = 'docs/EDEN_EXACT_IMAGE_SOURCE_MANIFEST_2026-06-12.json';
const driveManifest = JSON.parse(readFileSync(driveManifestPath, 'utf8'));
const exactImageManifest = JSON.parse(readFileSync(exactImageManifestPath, 'utf8'));

assert.equal(driveManifest.status, 'DRIVE_DISCOVERED_ALIGNMENT_REQUIRES_FILENAME_NORMALIZATION');
assert.equal(driveManifest.canonical_app_image_manifest, exactImageManifestPath);
assert.equal(driveManifest.exact_app_image_alignment.count, 19);
assert.equal(exactImageManifest.assets.length, 19);
assert.equal(driveManifest.exact_app_image_alignment.locked_manifest_status, 'LOCKED_EXACT_IMAGE_SOURCE_TRUTH');
assert.match(driveManifest.approved_render_rule, /standalone source images/);
assert.match(driveManifest.approved_render_rule, /collage images remain layout references only/);
assert.match(driveManifest.app_upgrade_rule, /No rendered page is allowed to silently switch to Drive thumbnails/);
assert.match(driveManifest.app_upgrade_rule, /collage boards/);
assert.ok(driveManifest.drive_root_candidates.some((folder) => folder.id === '1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ'));
assert.ok(driveManifest.primary_os_folder_tree.includes('05_VISUAL_SITE_PWA'));
assert.ok(driveManifest.primary_os_folder_tree.includes('06_EDENS_CLOSET_BLACK_CARD'));
assert.ok(driveManifest.primary_os_folder_tree.includes('07_IMAGE_VIDEO_FACTORY'));
assert.ok(driveManifest.primary_os_folder_tree.includes('08_STOCK_IMAGE_MODEL_ASSETS'));
assert.equal(driveManifest.discovered_drive_images.primary_os_root_generated_pngs.count_seen_in_folder_listing, 19);
assert.match(driveManifest.exact_app_image_alignment.drive_filename_status, /Generic Drive ChatGPT filenames/);
assert.ok(driveManifest.missing_or_unverified_drive_alignment.some((item) => item.includes('No Drive file was found by exact app filename searches')));
assert.ok(driveManifest.missing_or_unverified_drive_alignment.some((item) => item.includes('SHA-256')));

assert.match(driveModule, /driveSourceTruth/);
assert.match(driveModule, /DRIVE_DISCOVERED_ALIGNMENT_REQUIRES_FILENAME_NORMALIZATION/);
assert.match(driveModule, /EDEN_DRIVE_DISCOVERY_MANIFEST_2026-06-12\.json/);
assert.match(driveModule, /EDEN_EXACT_IMAGE_SOURCE_MANIFEST_2026-06-12\.json/);
assert.match(driveModule, /1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ/);
assert.match(driveModule, /cannot silently replace render assets/);
assert.match(driveModule, /No collage-board image may render/);
assert.match(driveModule, /No generic Drive thumbnail may render/);

for (const asset of exactImageManifest.assets) {
  assert.ok(
    driveManifest.exact_app_image_alignment.required_next_drive_action.includes('exact filenames') || driveManifest.exact_app_image_alignment.required_next_drive_action.includes(asset.filename),
    'Drive alignment must require exact filename normalization'
  );
}

console.log('PASS drive source truth guard');
