import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
const manifest = readFileSync('app/visual-source-truth.ts','utf8');
assert.match(manifest,/reference_board/);
assert.match(manifest,/standalone_asset/);
for (const route of ['app/page.tsx','app/models/page.tsx','app/closet/page.tsx','app/closet/[slug]/page.tsx']) {
  const src = readFileSync(route,'utf8');
  assert.doesNotMatch(src,/referenceBoards\[[0-9]+\]\.src|reference-full-system-board|reference-home-hero-board|reference-page-collage-board/, route + ' must not render reference-board images');
}
assert.match(manifest,/MISSING_ASSET|missing_asset/);
console.log('PASS visual source truth guard');
