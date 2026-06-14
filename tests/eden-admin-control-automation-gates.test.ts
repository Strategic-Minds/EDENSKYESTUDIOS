import assert from 'node:assert/strict';

import { buildBatch } from '../app/api/eden/automation/_lib/batch';

const inventedModel = buildBatch('plan', {
  modelId: 'not-a-real-eden-model',
  topic: 'test batch'
});

assert.equal(inventedModel.success, false);
assert.equal(inventedModel.blocked, true);
assert.equal(inventedModel.batch.qaQueue.find((gate) => gate.id === 'model-id')?.color, 'red');
assert.ok(inventedModel.batch.blockedActions.includes('invented-model-id'));

const approvedModel = buildBatch('plan', {
  modelName: 'Eden Skye',
  topic: 'daily luxury editorial plan',
  days: 3
});

assert.equal(approvedModel.success, true);
assert.equal(approvedModel.blocked, false);
assert.equal(approvedModel.batch.modelId, 'eden-skye');

const publicExportBlocked = buildBatch('schedule-draft', {
  modelName: 'Eden Skye',
  publicExport: true
});

assert.equal(publicExportBlocked.success, false);
assert.equal(publicExportBlocked.blocked, true);
assert.equal(publicExportBlocked.batch.qaQueue.find((gate) => gate.id === 'public-export')?.color, 'red');
assert.ok(publicExportBlocked.batch.blockedActions.includes('public-export-without-green-gate'));

const publicExportApproved = buildBatch('schedule-draft', {
  modelName: 'Eden Skye',
  publicExport: true,
  exportApproved: true
});

assert.equal(publicExportApproved.success, true);
assert.equal(publicExportApproved.blocked, false);
assert.equal(publicExportApproved.batch.qaQueue.find((gate) => gate.id === 'public-export')?.color, 'green');

console.log('Eden admin automation gates passed');
