// Draft-only screenshot bridge. Evidence output requires human visual approval before PR promotion.
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { chromium } from 'playwright';

const baseUrl = (process.env.VISUAL_PREVIEW_URL || 'https://edenskyestudios-git-eden-readin-91d0d0-strategic-minds-advisory.vercel.app').replace(/\/$/, '');
const outputDir = process.env.VISUAL_OUTPUT_DIR || 'visual-evidence/eden-preview';

const standaloneAssetIds = [
  '1I-1CTZ7U6ofbJw5YTd4e6jy29XpvxK5u',
  '1eTCl3D6f1Z9nTLLlBVGjHmEt8CsDwWHW',
  '1hnY2MM1ATr8kv9QXK9GkVaozflydCyj6',
  '1u0Js75H1MgZJCTCsjL7epJTg1yY7zUll',
  '18lU0MjL7_3EHnXiF8pwBgWM9gicZ4rfm',
  '19DCVCL96tBEzUDSdDw4I1Lb0y3sEXMu8'
];

const forbiddenReferenceMarkers = [
  'reference-full-system-board',
  'reference-home-hero-board',
  'reference-page-collage-board',
  '01-ChatGPT-Image-Jun-11-2026-01_49_09-AM.png',
  '02-ChatGPT-Image-Jun-11-2026-12_22_57-PM.png',
  '03-ChatGPT-Image-Jun-10-2026-09_01_29-PM-2-.png'
];

const pages = [
  { name: 'home', path: '/', requireStandalone: true },
  { name: 'models', path: '/models', requireStandalone: true },
  { name: 'model-profile-alexis-voss', path: '/models/alexis-voss', requireStandalone: true },
  { name: 'pricing', path: '/pricing' },
  { name: 'checkout', path: '/checkout' },
  { name: 'dashboard', path: '/dashboard' },
  { name: 'closet-home', path: '/closet', requireStandalone: true, allowMissingAsset: true },
  { name: 'closet-outfit-selector', path: '/closet/alexis-voss', requireStandalone: true, allowMissingAsset: true },
  { name: 'closet-environment-viewer', path: '/closet/alexis-voss/viewer', allowMissingAsset: true },
  { name: 'ai-video-chat', path: '/closet/alexis-voss/video', requireStandalone: true },
  { name: 'ai-chat', path: '/closet/alexis-voss/chat', requireStandalone: true },
  { name: 'pwa-app', path: '/pwa-app', allowMissingAsset: true }
];

const viewports = [
  { name: 'desktop', width: 1440, height: 1200 },
  { name: 'mobile', width: 390, height: 844 }
];

function assertNoReferenceBoardUsage(html, pageName) {
  const found = forbiddenReferenceMarkers.filter((marker) => html.includes(marker));
  if (found.length) {
    throw new Error(`${pageName} rendered forbidden reference-board markers: ${found.join(', ')}`);
  }
}

function assertStandaloneAssetUsage(html, pageName) {
  if (!standaloneAssetIds.some((id) => html.includes(id))) {
    throw new Error(`${pageName} did not render any approved standalone Drive asset id`);
  }
}

function assertMissingAssetCallout(html, pageName) {
  if (!html.includes('MISSING_ASSET')) {
    throw new Error(`${pageName} expected an explicit MISSING_ASSET callout`);
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
      if (spec.requireStandalone) assertStandaloneAssetUsage(html, spec.name);
      if (spec.allowMissingAsset) assertMissingAssetCallout(html, spec.name);

      const screenshotName = `${viewport.name}-${spec.name}.png`;
      await page.screenshot({ path: join(outputDir, screenshotName), fullPage: true });
      rows.push({ viewport: viewport.name, page: spec.name, path: spec.path, status, screenshot: screenshotName });
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
  '- Collage-board markers are forbidden in rendered HTML.',
  '- Pages with missing standalone assets must show MISSING_ASSET.',
  '- This artifact does not approve visuals by itself.',
  '',
  '## Screenshots',
  '',
  '| Viewport | Page | Route | Screenshot |',
  '| --- | --- | --- | --- |',
  ...rows.map((row) => `| ${row.viewport} | ${row.page} | ${row.path} | ${row.screenshot} |`),
  ''
].join('\n');

await writeFile(join(outputDir, 'visual-preview-manifest.json'), JSON.stringify(manifest, null, 2));
await writeFile(join(outputDir, 'README.md'), markdown);
console.log(`Captured ${rows.length} screenshots into ${outputDir}`);
