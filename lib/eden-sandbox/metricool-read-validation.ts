type MetricoolValidationStatus = 'ready_for_read_only_probe' | 'read_only_probe_passed' | 'read_only_probe_failed' | 'blocked_missing_configuration' | 'blocked_missing_endpoint' | 'blocked_unapproved_probe';

type EnvRequirement = {
  key: string;
  aliases: string[];
};

type MetricoolReadValidationResponse = {
  generatedAt: string;
  mode: 'metricool_read_validation';
  connector: 'Metricool';
  status: MetricoolValidationStatus;
  summary: string;
  evidence: string;
  productionMutationAllowed: false;
  externalWritesAllowed: false;
  readProbeAttempted: boolean;
  requiredEnv: string[];
  missingRequiredEnv: string[];
  resolvedRequiredEnv: string[];
  optionalEnv: string[];
  endpointPolicy: string;
  mutationPolicy: string;
  probe?: {
    approved: boolean;
    method: 'GET';
    host?: string;
    path?: string;
    ok?: boolean;
    status?: number;
    statusText?: string;
    contentType?: string | null;
    responseBodyCaptured: false;
    error?: string;
  };
};

const hasEnv = (name: string) => Boolean(process.env[name]?.trim());
const anyEnv = (requirement: EnvRequirement) => [requirement.key, ...requirement.aliases].find(hasEnv);
const labels = (requirements: EnvRequirement[]) => requirements.map((requirement) => [requirement.key, ...requirement.aliases].join(' | '));
const resolved = (requirements: EnvRequirement[]) => requirements.map((requirement) => anyEnv(requirement)).filter((name): name is string => Boolean(name));
const missing = (requirements: EnvRequirement[]) => requirements.filter((requirement) => !anyEnv(requirement)).map((requirement) => [requirement.key, ...requirement.aliases].join(' | '));
const envValue = (requirement: EnvRequirement) => {
  const name = anyEnv(requirement);
  return name ? process.env[name]?.trim() : undefined;
};

const tokenRequirement = { key: 'METRICOOL_API_KEY', aliases: ['METRICOOL_TOKEN', 'METRICOOL_ACCESS_TOKEN'] };
const blogRequirement = { key: 'METRICOOL_BRAND_ID', aliases: ['METRICOOL_BLOG_ID', 'METRICOOL_ACCOUNT_ID', 'METRICOOL_PROFILE_ID'] };
const userRequirement = { key: 'METRICOOL_USER_ID', aliases: ['METRICOOL_ACCOUNT_USER_ID', 'METRICOOL_OWNER_ID'] };
const readEndpointRequirement = { key: 'METRICOOL_READ_VALIDATION_URL', aliases: ['METRICOOL_READ_ENDPOINT_URL', 'METRICOOL_SAFE_READ_URL'] };
const required = [tokenRequirement, blogRequirement, userRequirement];
const optional = [
  'METRICOOL_BASE_URL',
  'METRICOOL_READ_VALIDATION_URL',
  'METRICOOL_READ_ENDPOINT_URL',
  'METRICOOL_SAFE_READ_URL',
  'METRICOOL_READ_PROBE_ENABLED'
];

const allowedHosts = new Set(['app.metricool.com']);

function buildProbeUrl(rawUrl: string, blogId: string, userId: string) {
  const url = new URL(rawUrl, process.env.METRICOOL_BASE_URL || 'https://app.metricool.com/api');
  if (!allowedHosts.has(url.hostname)) {
    throw new Error(`Blocked Metricool read host: ${url.hostname}`);
  }
  if (!url.pathname.startsWith('/api')) {
    throw new Error('Blocked Metricool read path: endpoint must be under /api');
  }
  if (!url.searchParams.has('blogId')) url.searchParams.set('blogId', blogId);
  if (!url.searchParams.has('userId')) url.searchParams.set('userId', userId);
  return url;
}

export async function getMetricoolReadValidationResponse(): Promise<MetricoolReadValidationResponse> {
  const missingRequiredEnv = missing(required);
  const resolvedRequiredEnv = resolved(required);
  const endpoint = envValue(readEndpointRequirement);
  const probeApproved = process.env.METRICOOL_READ_PROBE_ENABLED === 'true';

  const base: Omit<MetricoolReadValidationResponse, 'status' | 'summary' | 'evidence' | 'readProbeAttempted'> = {
    generatedAt: new Date().toISOString(),
    mode: 'metricool_read_validation',
    connector: 'Metricool',
    productionMutationAllowed: false,
    externalWritesAllowed: false,
    requiredEnv: labels(required),
    missingRequiredEnv,
    resolvedRequiredEnv,
    optionalEnv: optional,
    endpointPolicy: 'Metricool read validation only uses an approved GET endpoint on app.metricool.com/api with X-Mc-Auth. Response bodies are not returned.',
    mutationPolicy: 'no_metricool_post_schedule_publish_update_delete_or_external_write'
  };

  if (missingRequiredEnv.length > 0) {
    return {
      ...base,
      status: 'blocked_missing_configuration',
      summary: 'Metricool read validation is blocked until API token, blog/brand ID, and user ID are visible to runtime.',
      evidence: 'No Metricool request was attempted because required read identifiers are incomplete.',
      readProbeAttempted: false
    };
  }

  if (!endpoint) {
    return {
      ...base,
      status: 'blocked_missing_endpoint',
      summary: 'Metricool credentials are present, but no exact approved read endpoint is configured for validation.',
      evidence: 'Metricool help states API calls use X-Mc-Auth and require blogId and userId. Configure METRICOOL_READ_VALIDATION_URL for a specific GET-only read probe.',
      readProbeAttempted: false
    };
  }

  if (!probeApproved) {
    return {
      ...base,
      status: 'blocked_unapproved_probe',
      summary: 'Metricool read endpoint is configured, but the live read probe flag is not enabled.',
      evidence: 'Set METRICOOL_READ_PROBE_ENABLED=true only when a GET-only read probe is approved. No request was attempted.',
      readProbeAttempted: false,
      probe: {
        approved: false,
        method: 'GET',
        responseBodyCaptured: false
      }
    };
  }

  try {
    const url = buildProbeUrl(endpoint, envValue(blogRequirement)!, envValue(userRequirement)!);
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 8000);
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'X-Mc-Auth': envValue(tokenRequirement)!,
        'Content-Type': 'application/json'
      },
      cache: 'no-store',
      signal: controller.signal
    });
    clearTimeout(timeout);

    return {
      ...base,
      status: response.ok ? 'read_only_probe_passed' : 'read_only_probe_failed',
      summary: response.ok ? 'Metricool safe read probe returned a successful response.' : 'Metricool safe read probe returned a non-success response.',
      evidence: 'Only GET response metadata is retained. Response body and secrets are not exposed.',
      readProbeAttempted: true,
      probe: {
        approved: true,
        method: 'GET',
        host: url.hostname,
        path: url.pathname,
        ok: response.ok,
        status: response.status,
        statusText: response.statusText,
        contentType: response.headers.get('content-type'),
        responseBodyCaptured: false
      }
    };
  } catch (error) {
    return {
      ...base,
      status: 'read_only_probe_failed',
      summary: 'Metricool safe read probe failed before a successful response was confirmed.',
      evidence: 'Only sanitized error metadata is retained. No response body or secret value is exposed.',
      readProbeAttempted: true,
      probe: {
        approved: true,
        method: 'GET',
        responseBodyCaptured: false,
        error: error instanceof Error ? error.message : 'Unknown Metricool read validation error'
      }
    };
  }
}
