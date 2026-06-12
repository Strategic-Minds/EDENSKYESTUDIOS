import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const manifest = readFileSync('app/visual-source-truth.ts', 'utf8');
const exactImageManifestPath = 'docs/EDEN_EXACT_IMAGE_SOURCE_MANIFEST_2026-06-12.json';
const exactImageManifest = JSON.parse(readFileSync(exactImageManifestPath, 'utf8'));

assert.equal(exactImageManifest.status, 'LOCKED_EXACT_IMAGE_SOURCE_TRUTH');
assert.equal(exactImageManifest.assets.length, 19, 'exact image manifest must contain the locked 19 standalone source images');

assert.match(manifest, /visualSourceLock/);
assert.match(manifest, /LOCKED_BY_JEREMY/);
assert.match(manifest, /Eden Visual Preview Bridge #33/);
assert.match(manifest, /bf587acddad8d121efee1f8e944239a44e19f157/);
assert.match(manifest, /sha256:10c5d17b24ef2aae5495c8d65bddfaf395f56ab0bbb1a5f77807adb1e57a21c2/);
assert.match(manifest, /EDEN_EXACT_IMAGE_SOURCE_MANIFEST_2026-06-12\.json/);
assert.match(manifest, /exactImageCount:\s*19/);
assert.match(manifest, /reference_board/);
assert.match(manifest, /standalone_asset/);
assert.match(manifest, /disqualified_asset/);
assert.match(manifest, /generatedSource/);
assert.match(manifest, /cdn\.shopify\.com\/s\/files\/1\/0754\/8905\/0678\/files\/\$\{file\}/, 'manifest must build generated assets from the Shopify CDN media helper');
assert.match(manifest, /missingAssets:\s*VisualAsset\[\]\s*=\s*\[\]/, 'missingAssets must stay empty once generated standalone assets are wired');
assert.doesNotMatch(manifest, /drive\.google\.com\/thumbnail/, 'Drive thumbnails must not render as page/model/closet assets');
assert.doesNotMatch(manifest, /src:\s*driveImage|const driveImage/, 'Rejected Drive candidates must not expose renderable src URLs');

const shaPattern = /^[a-f0-9]{64}$/;
for (const asset of exactImageManifest.assets) {
  assert.match(asset.sha256, shaPattern, `${asset.filename} must have a valid SHA-256 lock`);
  assert.match(asset.filename, /^eden-.*\.png$/, `${asset.filename} must be a generated Eden PNG source file`);
  assert.match(asset.cdn_url, /^https:\/\/cdn\.shopify\.com\/s\/files\/1\/0754\/8905\/0678\/files\/eden-.*\.png\?v=\d+$/, `${asset.filename} must use the locked Shopify CDN media URL`);
  assert.match(manifest, new RegExp(asset.filename.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `visual source truth must reference ${asset.filename}`);
}

const requiredGeneratedFiles = exactImageManifest.assets.map((asset) => asset.filename);

for (const file of requiredGeneratedFiles) {
  assert.match(manifest, new RegExp(file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `manifest must register ${file}`);
}

const requiredHashes = [
  '8e41e97e8445dc3ad887a565db4c7c73e1f9c441b8fbb8280f8d8039c5ea6965',
  '401ff590938589575cbca11205b349148c7d7edf083302592218d349245842be',
  '5eaf97cbdc681b7a08698373de52700161f3147d4ae7764165308cd33a1ef9a4',
  'ea7cbc6800c3f1923f4355689086024d3ef0a357be300ffa3793b8abb835429b',
  '987d9eea475eb5a6f69bfb8e52b7d9e611bdee7bd9dec0ad2db7aa7fb7942911',
  '5c460d872e232305112d5a0025f41552c6ae9ec8574ed4139ea65639d43d47cd',
  'ee6fe8695361be33197d3b6532175e3af3fa24ec4db3e7ca78397c7b17a5d9c4',
  '3a7d18dc9c99d10d6e7960cc1c2cbde5ce9d3aa1b80a81aaab58d88b82d942d5',
  '11ff26957782d9f62d22ae5243093bf617fc31877e7dcb7f51d1376d60b1a402',
  'ea012898470ad4f475846f361362373a3c16dcc8c0811bbbe21a22eae0cdef41',
  '94bf679b86d763d27b998248404585b6786c0b3c8865445bc67dae486f26e96d',
  '999a17daf46509f9dc2e4d226cf12ed9e53747190f75ac2dc6b13a27205c38ae',
  '12f55e4b02c5d5227652ffb84c44efc206c66c08aa3ea4db132c4e238bf5ed9a',
  'e9c6a600c19f18e831b585e7b61d793abada170a6313968f82f4921e8147e975',
  'b8f47373200f323f1f749d5d6295c7a032d0998c5b617a62c59a8091d026c490',
  'ccb748334304008b9ebab6556f66f6e4de8d55228ccf263e2364d6c2b2db6ba5',
  'b93921abe3c7995adc95d712cfb791ec7191c6fad4ae25c08e083dab97a82c39',
  '57764d8e3403bf291681671eeb41dd50b21c90670d6c9362ea4a38e34187091b',
  'fb27cbeccb8092b5ecd88a5aafd004154b94afaaa708b21baf3bcd5b9e3c5e1e'
];

for (const hash of requiredHashes) {
  assert.ok(exactImageManifest.assets.some((asset) => asset.sha256 === hash), `exact image manifest must lock hash ${hash}`);
}

const guardedRoutes = [
  'app/page.tsx',
  'app/models/page.tsx',
  'app/models/[slug]/page.tsx',
  'app/closet/page.tsx',
  'app/closet/[slug]/page.tsx',
  'app/closet/[slug]/viewer/page.tsx',
  'app/closet/[slug]/video/page.tsx',
  'app/closet/[slug]/chat/page.tsx',
  'app/pwa-app/page.tsx'
];

for (const route of guardedRoutes) {
  const src = readFileSync(route, 'utf8');
  assert.doesNotMatch(src, /referenceBoards\[[0-9]+\]\.src|reference-full-system-board|reference-home-hero-board|reference-page-collage-board/, route + ' must not render reference-board images');
  assert.doesNotMatch(src, /MISSING_ASSET|MissingAssetNotice|VisualAssetSlot|missing-env/, route + ' must not render missing-asset placeholders after standalone generation');
}

const generatedRouteChecks = new Map([
  ['app/page.tsx', /heroAsset|standaloneAssets|models/],
  ['app/models/page.tsx', /ModelCard/],
  ['app/models/[slug]/page.tsx', /galleryAssets|standaloneAssets/],
  ['app/closet/page.tsx', /standaloneAssets\.closetFullBody/],
  ['app/closet/[slug]/page.tsx', /standaloneAssets\.closetFullBody/],
  ['app/closet/[slug]/viewer/page.tsx', /environmentAssets|standaloneAssets\.closetFullBody/],
  ['app/closet/[slug]/video/page.tsx', /standaloneAssets\.aiVideo/],
  ['app/closet/[slug]/chat/page.tsx', /standaloneAssets\.aiChat/],
  ['app/pwa-app/page.tsx', /standaloneAssets\.pwaHome|standaloneAssets\.pwaNavigation/]
]);

for (const [route, marker] of generatedRouteChecks) {
  const src = readFileSync(route, 'utf8');
  assert.match(src, marker, `${route} must be wired to generated standalone asset source truth`);
}

console.log('PASS visual source truth guard');
