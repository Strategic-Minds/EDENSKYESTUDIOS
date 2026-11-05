import { readFile, mkdir, writeFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

export const receiptPath = '.eden/bridge-results/scaffold-generation.json';
const expectedPaths = new Set([
  "docs/eden_skye_os/READINESS_AUDIT_RUNNER.md",
  "docs/eden_skye_os/KILL_SWITCH_CONTRACT.md",
  "docs/eden_skye_os/APPROVAL_ROUTER_CONTRACT.md",
  "docs/eden_skye_os/DRIVE_CANON_ALIGNMENT_PACKET.md",
  "docs/eden_skye_os/SHOPIFY_WEBSITE_COMPLETION_PACKET.md",
  "docs/eden_skye_os/METRICOOL_DRAFT_ROUTING_PACKET.md",
  "docs/eden_skye_os/FINAL_BLOCKER_REPORT.md",
  "supabase/migrations/0001_eden_skye_os_runtime_scaffold.sql",
  "app/api/eden/health/route.ts",
  "app/api/eden/readiness/route.ts",
  "app/api/eden/cron/bridge-runner/route.ts",
  "app/api/eden/cron/readiness-audit/route.ts",
  "app/api/eden/triggers/content/route.ts",
  "app/api/eden/triggers/media/route.ts",
  "app/api/eden/triggers/approval/route.ts",
  "docs/eden_skye_os/n8n/EDEN_SKYE_OS_IMPORT_PACKET.md",
  "docs/eden_skye_os/BUILD_AND_VALIDATION_PASS_RESULT.md"
]);
const digest = (data) => createHash('sha256').update(data).digest('hex');

export async function writeReceipt(root, created, skipped, report) {
  const artifacts = [];
  for (const file of [...created, ...skipped, report].sort()) {
    const contents = await readFile(path.join(root, file));
    artifacts.push({ path: file, sha256: digest(contents), disposition:
      file === report ? 'report' : created.includes(file) ? 'created' : 'preserved' });
  }
  const receipt = { schema_version: 1, kind: 'scaffold_generation',
    live_mutation: false, readiness_verified: false, artifacts };
  await mkdir(path.join(root, '.eden/bridge-results'), { recursive: true });
  await writeFile(path.join(root, receiptPath), JSON.stringify(receipt, null, 2) + '\n');
  await validateReceipt(root);
}

export async function validateReceipt(root) {
  const receipt = JSON.parse(await readFile(path.join(root, receiptPath), 'utf8'));
  if (receipt.schema_version !== 1 || receipt.kind !== 'scaffold_generation' ||
      receipt.live_mutation !== false || receipt.readiness_verified !== false ||
      !Array.isArray(receipt.artifacts) || receipt.artifacts.length !== expectedPaths.size) {
    throw new Error('Invalid scaffold receipt contract');
  }
  const seen = new Set();
  for (const artifact of receipt.artifacts) {
    if (!expectedPaths.has(artifact.path) ||
        !/^(docs\/eden_skye_os\/.*\.md|app\/api\/eden\/.*\.ts|supabase\/migrations\/0001_eden_skye_os_runtime_scaffold\.sql)$/.test(artifact.path) ||
        seen.has(artifact.path) || !['created', 'preserved', 'report'].includes(artifact.disposition)) {
      throw new Error('Invalid scaffold receipt artifact');
    }
    seen.add(artifact.path);
    if (digest(await readFile(path.join(root, artifact.path))) !== artifact.sha256) {
      throw new Error('Scaffold receipt artifact hash mismatch');
    }
  }
  return receipt;
}

if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await validateReceipt(process.cwd());
  console.log('Scaffold receipt verified; live readiness is not asserted.');
}
