import { approvedBasicPortraits } from '../../../../eden-source-images/models/approved-basic-portraits';
import { approvedFacelessAccounts } from '../../../../eden-source-images/models/approved-faceless-roster';
import { approvedInternationalModels } from '../../../../eden-source-images/models/approved-international-roster';
import { approvedMaleModels } from '../../../../eden-source-images/models/approved-male-roster';

export type BatchKind = 'discover' | 'plan' | 'schedule-draft' | 'image-prompts';
export type GateColor = 'green' | 'yellow' | 'red';

type BatchBody = {
  modelId?: string;
  modelName?: string;
  libraryGroup?: string;
  topic?: string;
  days?: number;
  channels?: string[];
  publicExport?: boolean;
  exportApproved?: boolean;
  manifestSlots?: string[];
  notes?: string;
};

export const approvedModelIds = new Set([
  ...approvedBasicPortraits.map((item) => slug(item.name)),
  ...approvedMaleModels.map((item) => slug(item.name)),
  ...approvedInternationalModels.map((item) => slug(item.name)),
  ...approvedFacelessAccounts.map((item) => slug(item.concept))
]);

export function slug(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

export function buildBatch(kind: BatchKind, body: BatchBody = {}) {
  const modelId = slug(body.modelId || body.modelName || 'eden-skye');
  const days = clamp(body.days ?? 7, 1, 30);
  const channels = cleanList(body.channels, ['Admin', 'Library', 'Image Stack']);
  const manifestSlots = cleanList(body.manifestSlots, ['library-unassigned']);
  const topic = cleanText(body.topic, defaultTopic(kind));
  const validModel = approvedModelIds.has(modelId);
  const publicExportBlocked = body.publicExport === true && body.exportApproved !== true;
  const blocked = !validModel || publicExportBlocked;
  const batchId = `eden-${kind}-${new Date().toISOString().replace(/[-:.TZ]/g, '').slice(0, 14)}`;

  const gates = [
    gate('model-id', validModel ? 'green' : 'red', `Model ID ${modelId} must exist in the approved library.`),
    gate('draft-only', 'green', 'Batch is draft-only and performs no live mutation.'),
    gate('public-export', publicExportBlocked ? 'red' : 'green', 'Public export requires explicit green export approval.'),
    gate('qa-review', blocked ? 'red' : 'yellow', 'Admin QA must promote yellow items to green before live use.')
  ];

  return {
    success: !blocked,
    blocked,
    batch: {
      id: batchId,
      kind,
      mode: 'draft-only',
      liveMutation: false,
      topic,
      modelId,
      libraryGroup: cleanText(body.libraryGroup, 'mixed'),
      days,
      channels,
      manifestSlots,
      notes: cleanText(body.notes, 'No operator notes supplied'),
      artifacts: artifactsFor(kind, { topic, days, channels, manifestSlots, modelId }),
      qaQueue: gates,
      approvalQueue: gates.filter((item) => item.color !== 'green'),
      blockedActions: ['public export', 'live publishing', 'calendar write', 'Metricool scheduling', 'Drive mutation', 'Shopify mutation', 'HeyGen activation'],
      receipts: [`batch:${batchId}`, `model:${modelId}`, 'mode:draft-only', 'storage:site-library-target']
    }
  };
}

export function capability(kind: BatchKind) {
  return {
    success: true,
    method: 'POST',
    route: `/api/eden/automation/${kind}`,
    mode: 'draft-only',
    liveMutation: false,
    approvedModelCount: approvedModelIds.size,
    blocks: ['invented model IDs', 'public export without green gate', 'live mutation']
  };
}

function artifactsFor(kind: BatchKind, input: { topic: string; days: number; channels: string[]; manifestSlots: string[]; modelId: string }) {
  if (kind === 'image-prompts') {
    return input.manifestSlots.map((slot, index) => ({
      id: `IMG-${index + 1}`,
      title: `${input.modelId} prompt for ${slot}`,
      target: 'Editor -> Image Stack -> Media Library',
      status: 'yellow',
      body: `Generate a platform-safe editorial image for ${input.topic}. Record prompt, model, QA score, approval color, storage target, and manifest slot.`
    }));
  }

  return Array.from({ length: input.days }, (_, index) => ({
    id: `${kind.toUpperCase()}-${index + 1}`,
    title: `${input.topic} day ${index + 1}`,
    target: input.channels[index % input.channels.length],
    status: kind === 'discover' ? 'yellow' : 'green',
    body: `Draft ${kind} output for ${input.modelId}. No live action. Route to QA before export.`
  }));
}

function gate(id: string, color: GateColor, check: string) {
  return { id, color, required: true, check };
}

function defaultTopic(kind: BatchKind) {
  if (kind === 'discover') return 'automated content discovery';
  if (kind === 'plan') return 'content plan';
  if (kind === 'schedule-draft') return 'schedule draft';
  return 'image prompt batch';
}

function cleanText(value: unknown, fallback: string) {
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function cleanList(value: unknown, fallback: string[]) {
  if (!Array.isArray(value)) return fallback;
  const cleaned = value.filter((item): item is string => typeof item === 'string' && item.trim().length > 0).map((item) => item.trim());
  return cleaned.length ? cleaned : fallback;
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, Math.round(value)));
}
