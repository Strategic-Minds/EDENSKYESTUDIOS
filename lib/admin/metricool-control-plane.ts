import { getMetricoolReadValidationResponse } from '@/lib/eden-sandbox/metricool-read-validation';

type EnvRequirement = {
  key: string;
  aliases: string[];
};

type MetricoolScheduleInput = {
  postId?: string;
  campaignId?: string;
  platform?: string;
  caption?: string;
  text?: string;
  mediaUrls?: string[];
  scheduledAt?: string;
  timezone?: string;
  approvalId?: string;
  approvalPhrase?: string;
};

const tokenRequirement = { key: 'METRICOOL_API_KEY', aliases: ['METRICOOL_TOKEN', 'METRICOOL_ACCESS_TOKEN'] };
const blogRequirement = { key: 'METRICOOL_BRAND_ID', aliases: ['METRICOOL_BLOG_ID', 'METRICOOL_ACCOUNT_ID', 'METRICOOL_PROFILE_ID'] };
const userRequirement = { key: 'METRICOOL_USER_ID', aliases: ['METRICOOL_ACCOUNT_USER_ID', 'METRICOOL_OWNER_ID'] };
const scheduleEndpointRequirement = { key: 'METRICOOL_SCHEDULE_URL', aliases: ['METRICOOL_SCHEDULE_ENDPOINT_URL'] };
const required = [tokenRequirement, blogRequirement, userRequirement];
const allowedHosts = new Set(['app.metricool.com']);

const hasEnv = (name: string) => Boolean(process.env[name]?.trim());
const anyEnv = (requirement: EnvRequirement) => [requirement.key, ...requirement.aliases].find(hasEnv);
const envValue = (requirement: EnvRequirement) => {
  const name = anyEnv(requirement);
  return name ? process.env[name]?.trim() : undefined;
};
const labels = (requirements: EnvRequirement[]) => requirements.map((requirement) => [requirement.key, ...requirement.aliases].join(' | '));
const resolved = (requirements: EnvRequirement[]) => requirements.map((requirement) => anyEnv(requirement)).filter((name): name is string => Boolean(name));
const missing = (requirements: EnvRequirement[]) => requirements.filter((requirement) => !anyEnv(requirement)).map((requirement) => [requirement.key, ...requirement.aliases].join(' | '));

function normalizeScheduleInput(input: MetricoolScheduleInput = {}) {
  const caption = input.caption ?? input.text ?? 'Eden Skye Studios approved content draft';
  return {
    postId: input.postId ?? `metricool-preview-${Date.now()}`,
    campaignId: input.campaignId ?? 'eden-skye-content-machine',
    platform: input.platform ?? 'instagram',
    caption,
    mediaUrls: Array.isArray(input.mediaUrls) ? input.mediaUrls.filter((url) => typeof url === 'string' && url.startsWith('http')) : [],
    scheduledAt: input.scheduledAt ?? new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
    timezone: input.timezone ?? 'America/New_York',
    approvalId: input.approvalId ?? null
  };
}

function buildMetricoolPayload(input: MetricoolScheduleInput = {}) {
  const normalized = normalizeScheduleInput(input);
  return {
    userIdSource: anyEnv(userRequirement),
    blogIdSource: anyEnv(blogRequirement),
    post: {
      idempotencyKey: `${normalized.postId}:${normalized.platform}:${normalized.scheduledAt}`,
      platform: normalized.platform,
      text: normalized.caption,
      mediaUrls: normalized.mediaUrls,
      scheduledAt: normalized.scheduledAt,
      timezone: normalized.timezone,
      approvalId: normalized.approvalId,
      campaignId: normalized.campaignId
    },
    metricoolNotes: [
      'Payload is intentionally generic until the exact Metricool schedule endpoint/body shape is validated in the live account.',
      'Media URLs must be public and non-expiring before live scheduling.',
      'If Metricool requires media normalization/upload first, that must run as a separate approval-gated step.'
    ]
  };
}

function safeScheduleUrl(rawUrl: string) {
  const url = new URL(rawUrl, process.env.METRICOOL_BASE_URL || 'https://app.metricool.com/api');
  if (!allowedHosts.has(url.hostname)) throw new Error(`Blocked Metricool schedule host: ${url.hostname}`);
  if (!url.pathname.startsWith('/api')) throw new Error('Blocked Metricool schedule path: endpoint must be under /api');
  return url;
}

export function getMetricoolAdminStatusResponse() {
  const missingRequiredEnv = missing(required);
  const resolvedRequiredEnv = resolved(required);
  const connected = missingRequiredEnv.length === 0;
  const readProbeEnabled = process.env.METRICOOL_READ_PROBE_ENABLED === 'true';
  const scheduleWriteEnabled = process.env.METRICOOL_SCHEDULE_WRITE_ENABLED === 'true';

  return {
    generatedAt: new Date().toISOString(),
    mode: 'metricool_admin_status',
    connector: 'Metricool',
    metricool: connected ? 'Connected' : 'Blocked',
    status: connected ? 'connected_configuration_ready' : 'blocked_missing_configuration',
    readProbe: readProbeEnabled ? 'Enabled for approved GET probe' : 'Locked until read-probe flag is enabled',
    scheduling: scheduleWriteEnabled ? 'One approved test can be attempted' : 'Locked until first approved test',
    bulkPosting: 'Locked',
    productionMutationAllowed: false,
    externalWritesAllowed: scheduleWriteEnabled,
    requiredEnv: labels(required),
    missingRequiredEnv,
    resolvedRequiredEnv,
    optionalEnv: [
      'METRICOOL_READ_VALIDATION_URL',
      'METRICOOL_READ_PROBE_ENABLED',
      'METRICOOL_SCHEDULE_URL',
      'METRICOOL_SCHEDULE_WRITE_ENABLED',
      'METRICOOL_SINGLE_TEST_APPROVAL'
    ],
    adminDisplay: {
      metricool: connected ? 'Connected' : 'Missing configuration',
      readProbe: readProbeEnabled ? 'Ready to run' : 'Locked',
      scheduling: scheduleWriteEnabled ? 'One-test gate enabled' : 'Locked until first approved test',
      bulkPosting: 'Locked'
    },
    mutationPolicy: 'Status route never schedules, publishes, updates, deletes, or mutates Metricool data.'
  };
}

export async function runMetricoolAdminReadProbe() {
  const validation = await getMetricoolReadValidationResponse();
  return {
    generatedAt: new Date().toISOString(),
    mode: 'metricool_admin_read_probe',
    connector: 'Metricool',
    metricool: validation.missingRequiredEnv.length === 0 ? 'Connected' : 'Blocked',
    readProbe: validation.status === 'read_only_probe_passed' ? 'Passed' : validation.status,
    scheduling: 'Locked until first approved test',
    bulkPosting: 'Locked',
    validation,
    mutationPolicy: 'Read probe uses the existing GET-only validation helper and never schedules or publishes content.'
  };
}

export function previewMetricoolSchedule(input: MetricoolScheduleInput = {}) {
  const missingRequiredEnv = missing(required);
  const payload = buildMetricoolPayload(input);
  return {
    generatedAt: new Date().toISOString(),
    mode: 'metricool_schedule_preview',
    connector: 'Metricool',
    status: missingRequiredEnv.length === 0 ? 'preview_ready' : 'blocked_missing_configuration',
    externalWritesAllowed: false,
    productionMutationAllowed: false,
    missingRequiredEnv,
    resolvedRequiredEnv: resolved(required),
    payloadPreview: payload,
    adminDisplay: {
      metricool: missingRequiredEnv.length === 0 ? 'Connected' : 'Missing configuration',
      readProbe: 'Required before first schedule test',
      scheduling: 'Preview only',
      bulkPosting: 'Locked'
    },
    mutationPolicy: 'Preview route builds a draft payload only. It does not call Metricool.'
  };
}

export async function scheduleApprovedMetricoolPost(input: MetricoolScheduleInput = {}) {
  const missingRequiredEnv = missing(required);
  const scheduleUrl = envValue(scheduleEndpointRequirement);
  const writeEnabled = process.env.METRICOOL_SCHEDULE_WRITE_ENABLED === 'true';
  const configuredApproval = process.env.METRICOOL_SINGLE_TEST_APPROVAL || 'APPROVE METRICOOL SINGLE TEST';
  const approvalMatches = input.approvalPhrase === configuredApproval;
  const payload = buildMetricoolPayload(input);

  const base = {
    generatedAt: new Date().toISOString(),
    mode: 'metricool_schedule_approved',
    connector: 'Metricool',
    bulkPosting: 'Locked',
    payloadPreview: payload,
    missingRequiredEnv,
    resolvedRequiredEnv: resolved(required),
    mutationPolicy: 'Only one approved test post can pass this gate. Bulk scheduling remains locked.'
  };

  if (missingRequiredEnv.length > 0) {
    return {
      ...base,
      status: 'blocked_missing_configuration',
      externalWriteAttempted: false,
      summary: 'Metricool scheduling is blocked because required identifiers are missing.'
    };
  }

  if (!scheduleUrl) {
    return {
      ...base,
      status: 'blocked_missing_schedule_endpoint',
      externalWriteAttempted: false,
      summary: 'Metricool scheduling is blocked until an exact schedule endpoint is configured.'
    };
  }

  if (!writeEnabled || !approvalMatches) {
    return {
      ...base,
      status: 'blocked_unapproved_single_test',
      externalWriteAttempted: false,
      summary: 'Metricool scheduling is locked until METRICOOL_SCHEDULE_WRITE_ENABLED=true and the single-test approval phrase matches.',
      requiredApprovalPhrase: configuredApproval
    };
  }

  try {
    const url = safeScheduleUrl(scheduleUrl);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10000);
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'X-Mc-Auth': envValue(tokenRequirement)!,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
      cache: 'no-store',
      signal: controller.signal
    });
    clearTimeout(timeout);

    return {
      ...base,
      status: response.ok ? 'single_test_schedule_submitted' : 'single_test_schedule_failed',
      externalWriteAttempted: true,
      responseMetadata: {
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        contentType: response.headers.get('content-type'),
        responseBodyCaptured: false
      },
      summary: response.ok ? 'Metricool accepted the one-post schedule request.' : 'Metricool returned a non-success response for the one-post schedule request.'
    };
  } catch (error) {
    return {
      ...base,
      status: 'single_test_schedule_failed',
      externalWriteAttempted: true,
      responseMetadata: {
        responseBodyCaptured: false,
        error: error instanceof Error ? error.message : 'Unknown Metricool schedule error'
      },
      summary: 'Metricool one-post schedule request failed before success was confirmed.'
    };
  }
}
