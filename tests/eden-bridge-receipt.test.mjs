import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile, rm, mkdir } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import { validateReceipt, receiptPath } from '../scripts/eden-bridge-receipt.mjs';
const repo = fileURLToPath(new URL('../', import.meta.url));
const generator = path.join(repo, 'scripts/eden-skye-os-build-and-validation-pass.mjs');
async function sandbox(t) {
  const root = await mkdtemp(path.join(tmpdir(), 'eden-receipt-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  return root;
}
function generate(root) { execFileSync(process.execPath, [generator], { cwd: root }); }
test('fresh generator creates a verified receipt and all workflow patterns stage', async t => {
  const root = await sandbox(t);
  generate(root);
  const receipt = await validateReceipt(root);
  assert.equal(receipt.artifacts.length, 17);
  assert.equal(receipt.artifacts.filter(a => a.disposition === 'created').length, 16);
  execFileSync('git', ['init', '-q'], { cwd: root });
  const workflow = await readFile(path.join(repo, '.github/workflows/eden-skye-os-bridge-runner.yml'), 'utf8');
  const pattern = workflow.match(/file_pattern: (.+)/)[1];
  assert.ok(pattern.includes('.eden/bridge-results/*.json'));
  execFileSync('git', ['add', ...pattern.split(' ')], { cwd: root });
  assert.equal(execFileSync('git', ['diff', '--cached', '--name-only'], { cwd: root, encoding: 'utf8' }).trim().split('\n').length, 18);
});
test('rerun preserves existing source and emits stable current receipt after first rerun', async t => {
  const root = await sandbox(t); generate(root);
  const file = 'app/api/eden/health/route.ts';
  await writeFile(path.join(root, file), '// existing implementation\n');
  generate(root);
  const receipt = await validateReceipt(root);
  assert.equal(receipt.artifacts.find(a => a.path === file).disposition, 'preserved');
  assert.equal(await readFile(path.join(root, file), 'utf8'), '// existing implementation\n');
  const before = await readFile(path.join(root, receiptPath), 'utf8');
  generate(root);
  assert.equal(await readFile(path.join(root, receiptPath), 'utf8'), before);
});
test('missing receipt fails closed', async t => {
  await assert.rejects(validateReceipt(await sandbox(t)), /ENOENT/);
});
test('tampered artifact fails closed', async t => {
  const root = await sandbox(t); generate(root);
  await writeFile(path.join(root, 'app/api/eden/health/route.ts'), 'changed');
  await assert.rejects(validateReceipt(root), /hash mismatch/);
});
test('invalid receipt contract fails closed', async t => {
  const root = await sandbox(t); generate(root);
  const receipt = await validateReceipt(root);
  receipt.live_mutation = true;
  await writeFile(path.join(root, receiptPath), JSON.stringify(receipt));
  await assert.rejects(validateReceipt(root), /Invalid scaffold receipt contract/);
});
test('missing output stops generator instead of inventing a receipt', async t => {
  const root = await sandbox(t);
  await mkdir(path.join(root, 'app/api/eden/health/route.ts'), { recursive: true });
  assert.throws(() => generate(root));
  await assert.rejects(readFile(path.join(root, receiptPath)), /ENOENT/);
});
test('duplicate artifact cannot satisfy required manifest', async t => {
  const root = await sandbox(t); generate(root);
  const receipt = await validateReceipt(root);
  receipt.artifacts[1] = receipt.artifacts[0];
  await writeFile(path.join(root, receiptPath), JSON.stringify(receipt));
  await assert.rejects(validateReceipt(root), /Invalid scaffold receipt artifact/);
});
test('removed artifact fails verification', async t => {
  const root = await sandbox(t); generate(root);
  await rm(path.join(root, 'app/api/eden/health/route.ts'));
  await assert.rejects(validateReceipt(root), /ENOENT/);
});
