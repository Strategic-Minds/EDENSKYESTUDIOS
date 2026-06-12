import { chromium } from 'playwright';
import fs from 'node:fs/promises';
import path from 'node:path';

const target = process.env.EDEN_SANDBOX_TARGET_URL || 'http://127.0.0.1:3000/eden-sandbox';
const outDir = process.env.EDEN_SANDBOX_QA_DIR || 'artifacts/eden-sandbox-browser-qa';

const checks = [
  ['home', '#home', '#home', 'Eden Skye Studios'],
  ['launch-board', '#launch-board', '#launch-board', 'Launch Board'],
  ['command-center', '#command-center', '#command-center', 'Today Command Center'],
  ['model-registry', '#model-registry', '#model-registry', 'Model Registry'],
  ['media-library', '#media-library', '#media-library', 'Media Library'],
  ['asset-vault', '#asset-vault', '#asset-vault', 'Asset Vault'],
  ['approval-queue', '#approval-queue', '#approval-queue', 'Approval Queue'],
  ['content-calendar', '#content-calendar', '#content-calendar', 'Content Calendar'],
  ['content-studio', '#content-studio', '#content-studio', 'Content Studio'],
  ['engagement-desk', '#engagement-desk', '#engagement-desk', 'Engagement Desk'],
  ['experiment-lab', '#experiment-lab', '#experiment-lab', 'Experiment Lab'],
  ['agent-ops', '#agent-ops', '#agent-ops', 'Agent Ops'],
  ['revenue-funnel', '#revenue-funnel', '#revenue-funnel', 'Revenue Funnel'],
  ['action-ledger', '/actions#action-ledger', '#action-ledger', 'Admin Action Ledger'],
  ['connector-smoke', '/actions#connector-smoke', '#connector-smoke', 'Connector Smoke Receipts'],
  ['connector-smoke-api', '/api/eden-sandbox/connector-smoke', 'body', 'read_only_configuration_smoke']
];

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'mobile', width: 390, height: 844 }
];

function buildUrl(route) {
  const base = new URL(target);
  if (route.startsWith('#')) return `${target}${route}`;
  if (route.startsWith('/api/')) return `${base.origin}${route}`;
  const pathPrefix = base.pathname.replace(/\/$/, '');
  return `${base.origin}${pathPrefix}${route}`;
}

await fs.mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ headless: true });
const results = [];

for (const viewport of viewports) {
  const page = await browser.newPage({ viewport });
  const consoleErrors = [];
  const pageErrors = [];

  page.on('console', (message) => {
    if (message.type() === 'error') consoleErrors.push(message.text());
  });
  page.on('pageerror', (error) => pageErrors.push(error.message));

  for (const [name, route, selector, expectedText] of checks) {
    const url = buildUrl(route);
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 90000 });
    await page.locator(selector).scrollIntoViewIfNeeded();
    await page.waitForTimeout(200);
    const visible = await page.getByText(expectedText).first().isVisible();
    const screenshotPath = path.join(outDir, `${viewport.name}-${name}.png`);
    await page.screenshot({ path: screenshotPath, fullPage: false });
    results.push({ viewport: viewport.name, view: name, url, status: response?.status() ?? null, expectedText, visible, screenshotPath });
  }

  if (consoleErrors.length || pageErrors.length) {
    results.push({ viewport: viewport.name, view: 'runtime-errors', visible: false, consoleErrors, pageErrors });
  }

  await page.close();
}

await browser.close();

const failed = results.filter((result) => !result.visible || (result.status && result.status >= 400));
const receipt = {
  target,
  generatedAt: new Date().toISOString(),
  viewports,
  checks: results,
  failed,
  passed: failed.length === 0
};

await fs.writeFile(path.join(outDir, 'receipt.json'), JSON.stringify(receipt, null, 2));
console.log(JSON.stringify(receipt, null, 2));
if (failed.length) process.exit(1);
