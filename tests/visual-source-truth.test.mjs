import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const manifest = readFileSync('app/visual-source-truth.ts', 'utf8');

assert.match(manifest, /reference_board/);
assert.match(manifest, /standalone_asset/);
assert.match(manifest, /disqualified_asset/);
assert.match(manifest, /generatedSource/);
assert.match(manifest, /cdn\.shopify\.com\/s\/files\/1\/0754\/8905\/0678\/files\/eden-/);
assert.match(manifest, /missingAssets:\s*VisualAsset\[\]\s*=\s*\[\]/, 'missingAssets must stay empty once generated standalone assets are wired');
assert.doesNotMatch(manifest, /drive\.google\.com\/thumbnail/, 'Drive thumbnails must not render as page/model/closet assets');
assert.doesNotMatch(manifest, /src:\s*driveImage|const driveImage/, 'Rejected Drive candidates must not expose renderable src URLs');

const requiredGeneratedFiles = [
  'eden-standalone-home-hero-alexis-neon-es.png',
  'eden-model-luna-moretti-card.png',
  'eden-model-sienna-cole-card.png',
  'eden-model-alexis-voss-profile.png',
  'eden-model-natalia-vega-card.png',
  'eden-model-zoey-parker-card.png',
  'eden-model-aria-reyes-card.png',
  'eden-closet-full-body-alexis-black-look.png',
  'eden-env-modern-bedroom.png',
  'eden-env-walk-in-closet.png',
  'eden-env-penthouse-living-room.png',
  'eden-env-beach-villa.png',
  'eden-env-luxury-hotel-suite.png',
  'eden-env-rooftop-terrace.png',
  'eden-env-photo-studio.png',
  'eden-ai-video-chat-still-alexis.png',
  'eden-ai-chat-portrait-alexis-neon.png',
  'eden-pwa-mobile-home-mockup.png',
  'eden-pwa-mobile-navigation-mockup.png'
];

for (const file of requiredGeneratedFiles) {
  assert.match(manifest, new RegExp(file.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')), `manifest must register ${file}`);
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
