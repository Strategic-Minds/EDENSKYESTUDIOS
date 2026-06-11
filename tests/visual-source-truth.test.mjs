import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const manifest = readFileSync('app/visual-source-truth.ts', 'utf8');
assert.match(manifest, /reference_board/);
assert.match(manifest, /standalone_asset/);
assert.match(manifest, /disqualified_asset/);
assert.match(manifest, /missing_asset/);
assert.doesNotMatch(manifest, /drive\.google\.com\/thumbnail/, 'Drive thumbnails must not render as page/model/closet assets');
assert.doesNotMatch(manifest, /src:\s*driveImage|const driveImage/, 'Rejected Drive candidates must not expose renderable src URLs');

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
  assert.doesNotMatch(src, /src=\{[^}]*\.image\}|src=\{[^}]*heroAsset\.src\}|src=\{[^}]*primaryModel\.image\}/, route + ' must not render model image fields that can hide collage crops');
}

const slotRoutes = guardedRoutes.filter(route => route !== 'app/models/page.tsx');
for (const route of slotRoutes) {
  const src = readFileSync(route, 'utf8');
  assert.match(src, /MISSING_ASSET|MissingAssetNotice|VisualAssetSlot|missing-env/, route + ' must explicitly identify missing standalone assets');
}

console.log('PASS visual source truth guard');
