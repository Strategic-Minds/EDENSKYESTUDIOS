// Draft-only screenshot bridge. Evidence output requires human visual approval before PR promotion.
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';

const baseUrl = (process.env.VISUAL_PREVIEW_URL || 'https://edenskyestudios-git-eden-readin-91d0d0-strategic-minds-advisory.vercel.app').replace(/\/$/, '');
const outputDir = process.env.VISUAL_OUTPUT_DIR || 'visual-evidence/eden-preview';

const disqualifiedDriveAssetIds = [
  '1I-1CTZ7U6ofbJw5YTd4e6jy29XpvxK5u',
  '1eTCl3D6f1Z9nTLLlBVGjHmEt8CsDwWHW',
  '1hnY2MM1ATr8kv9QXK9GkVaozflydCyj6',
  '1u0Js75H1MgZJCTCsjL7epJTg1yY7zUll',
  '18lU0MjL7_3EHnXiF8pwBgWM9gicZ4rfm',
  '19DCVCL96tBEzUDSdDw4I1Lb0y3sEXMu8'
];

const forbiddenReferenceMarkers = [
  ...disqualifiedDriveAssetIds,
  'drive.google.com/thumbnail',
  'reference-full-system-board',
  'reference-home-hero-board',
  'reference-page-collage-board',
  '01-ChatGPT-Image-Jun-11-2026-01_49_09-AM.png',
  '02-ChatGPT-Image-Jun-11-2026-12_22_57-PM.png',
  '03-ChatGPT-Image-Jun-10-2026-09_01_29-PM-2-.png'
];

const forbiddenPlaceholderMarkers = [
  'MISSING_ASSET',
  'MissingAssetNotice',
  'VisualAssetSlot',
  'missing-env'
];

const generatedAssetMarkers = [
  'cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-'
];

const pages = [
  { name: 'home', path: '/', requireGeneratedAsset: true },
  { name: 'models', path: '/models', requireGeneratedAsset: true },
  { name: 'model-profile-alexis-voss', path: '/models/alexis-voss', requireGeneratedAsset: true },
  { name: 'pricing', path: '/pricing' },
  { name: 'checkout', path: '/checkout' },
  { name: 'dashboard', path: '/dashboard' },
  { name: 'closet-home', path: '/closet', requireGeneratedAsset: true },
  { name: 'closet-outfit-selector', path: '/closet/alexis-voss', requireGeneratedAsset: true },
  { name: 'closet-environment-viewer', path: '/closet/alexis-voss/viewer', requireGeneratedAsset: true },
  { name: 'ai-video-chat', path: '/closet/alexis-voss/video', requireGeneratedAsset: true },
  { name: 'ai-chat', path: '/closet/alexis-voss/chat', requireGeneratedAsset: true },
  { name: 'pwa-app', path: '/pwa-app', requireGeneratedAsset: true }
];

const viewports = [
  { name: 'desktop', width: 1440, height: 1200 },
  { name: 'mobile', width: 390, height: 844 }
];

function assertNoReferenceBoardUsage(html, pageName) {
  const found = forbiddenReferenceMarkers.filter((marker) => html.includes(marker));
  if (found.length) {
    throw new Error(`${pageName} rendered forbidden reference/collage asset markers: ${found.join(', ')}`);
  }
}

function assertNoMissingAssetPlaceholder(html, pageName) {
  const found = forbiddenPlaceholderMarkers.filter((marker) => html.includes(marker));
  if (found.length) {
    throw new Error(`${pageName} rendered forbidden missing-asset placeholder markers: ${found.join(', ')}`);
  }
}

function assertGeneratedAssetUsage(html, pageName) {
  const found = generatedAssetMarkers.some((marker) => html.includes(marker));
  if (!found) {
    throw new Error(`${pageName} did not render generated standalone CDN assets`);
  }
}

await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const rows = [];

try {
  for (const viewport of viewports) {
    const context = await browser.newContext({ viewport, deviceScaleFactor: 1 });
    const page = await context.newPage();

    for (const spec of pages) {
      const url = `${baseUrl}${spec.path}`;
      const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
      const status = response?.status() ?? 0;
      if (!response || status >= 400) {
        throw new Error(`${spec.name} returned HTTP ${status} at ${url}`);
      }

      const html = await page.content();
      assertNoReferenceBoardUsage(html, spec.name);
      assertNoMissingAssetPlaceholder(html, spec.name);
      if (spec.requireGeneratedAsset) assertGeneratedAssetUsage(html, spec.name);

      const screenshotName = `${viewport.name}-${spec.name}.png`;
      await page.screenshot({ path: join(outputDir, screenshotName), fullPage: true });
      rows.push({ viewport: viewport.name, page: spec.name, path: spec.path, status, generated_assets_required: Boolean(spec.requireGeneratedAsset), screenshot: screenshotName });
    }

    await context.close();
  }
} finally {
  await browser.close();
}

const manifest = {
  captured_at: new Date().toISOString(),
  preview_url: baseUrl,
  approval_status: 'PENDING_HUMAN_VISUAL_REVIEW',
  note: 'Screenshots are evidence only. Do not mark visuals approved until Jeremy reviews the artifact.',
  rows
};

const markdown = [
  '# Eden Skye Visual Preview Evidence',
  '',
  `Preview: ${baseUrl}`,
  `Captured: ${manifest.captured_at}`,
  'Approval status: PENDING_HUMAN_VISUAL_REVIEW',
  '',
  '## Guardrails',
  '',
  '- Reference boards are layout references only.',
  '- Rejected Drive thumbnails and collage-board markers are forbidden in rendered HTML.',
  '- Generated standalone CDN assets are required on visual pages.',
  '- Missing-asset placeholders are forbidden after standalone generation.',
  '- This artifact does not approve visuals by itself.',
  '',
  '## Screenshots',
  '',
  '| Viewport | Page | Route | Generated assets required | Screenshot |',
  '| --- | --- | --- | --- | --- |',
  ...rows.map((row) => `| ${row.viewport} | ${row.page} | ${row.path} | ${row.generated_assets_required ? 'yes' : 'no'} | ${row.screenshot} |`),
  ''
].join('\n');

await writeFile(join(outputDir, 'visual-preview-manifest.json'), JSON.stringify(manifest, null, 2));
await writeFile(join(outputDir, 'README.md'), markdown);
console.log(`Captured ${rows.length} screenshots into ${outputDir}`);
