type SmokeStatus = 'read_only_passed' | 'ready_for_read_only_probe' | 'blocked_missing_configuration';

type EnvRequirement = {
  key: string;
  aliases: string[];
  runtimeFallback?: {
    label: string;
    prefixes: string[];
    exclude?: string[];
  };
};

type ConnectorSmokeReceipt = {
  connector: string;
  status: SmokeStatus;
  summary: string;
  evidence: string;
  requiredEnv: string[];
  optionalEnv: string[];
  missingRequiredEnv: string[];
  resolvedRequiredEnv: string[];
  mutationPolicy: string;
};

const hasEnv = (name: string) => Boolean(process.env[name]?.trim());
const runtimeFallbackEnv = (requirement: EnvRequirement) => {
  if (!requirement.runtimeFallback) return undefined;

  const excluded = new Set(requirement.runtimeFallback.exclude ?? []);
  const hasMatchingRuntimeKey = Object.keys(process.env).some((name) => {
    if (excluded.has(name)) return false;
    return requirement.runtimeFallback?.prefixes.some((prefix) => name.startsWith(prefix)) && hasEnv(name);
  });

  return hasMatchingRuntimeKey ? requirement.runtimeFallback.label : undefined;
};
const anyEnv = (requirement: EnvRequirement) => [requirement.key, ...requirement.aliases].find(hasEnv) ?? runtimeFallbackEnv(requirement);
const labels = (requirements: EnvRequirement[]) => requirements.map((requirement) => [requirement.key, ...requirement.aliases, requirement.runtimeFallback?.label].filter(Boolean).join(' | '));
const resolved = (requirements: EnvRequirement[]) => requirements.map((requirement) => anyEnv(requirement)).filter((name): name is string => Boolean(name));
const missing = (requirements: EnvRequirement[]) => requirements.filter((requirement) => !anyEnv(requirement)).map((requirement) => [requirement.key, ...requirement.aliases, requirement.runtimeFallback?.label].filter(Boolean).join(' | '));

const shopifyRequired: EnvRequirement[] = [
  { key: 'SHOPIFY_SHOP', aliases: ['SHOPIFY_STORE_DOMAIN', 'SHOPIFY_SHOP_DOMAIN', 'SHOPIFY_DOMAIN', 'SHOPIFY_STORE_URL', 'SHOPIFY_SHOP_URL'] },
  { key: 'SHOPIFY_ADMIN_TOKEN', aliases: ['SHOPIFY_ADMIN_ACCESS_TOKEN', 'SHOPIFY_ACCESS_TOKEN'] }
];

const xylaRequired: EnvRequirement[] = [
  {
    key: 'XYLA_CONNECTION_MARKER',
    aliases: ['XYLA_API_KEY', 'XYLA_APP_ID', 'XYLA_CLIENT_ID', 'XYLA_APP_KEY', 'XYLA_STORE_ID', 'XYLA_INSTALLATION_ID', 'XYLA_INSTALL_ID', 'XYLA_APP_INSTALLATION_ID', 'XYLA_CONNECTION_ID', 'XYLA_ACCOUNT_ID', 'XYLA_SHOP_DOMAIN'],
    runtimeFallback: {
      label: 'XYLA_* runtime env',
      prefixes: ['XYLA_']
    }
  }
];

const xylaOptional = ['XYLA_API_KEY', 'XYLA_APP_ID', 'XYLA_INSTALLATION_ID', 'XYLA_SHOP_DOMAIN', 'XYLA_ACCOUNT_ID'];

const metricoolTokenNames = ['METRICOOL_API_KEY', 'METRICOOL_TOKEN', 'METRICOOL_ACCESS_TOKEN'];
const metricoolRequired: EnvRequirement[] = [
  { key: 'METRICOOL_API_KEY', aliases: ['METRICOOL_TOKEN', 'METRICOOL_ACCESS_TOKEN'] },
  {
    key: 'METRICOOL_BRAND_ID',
    aliases: ['METRICOOL_ACCOUNT_ID', 'METRICOOL_USER_ID', 'METRICOOL_BLOG_ID', 'METRICOOL_PROFILE_ID', 'METRICOOL_PROJECT_ID', 'METRICOOL_WORKSPACE_ID', 'METRICOOL_BRAND', 'METRICOOL_ACCOUNT', 'METRICOOL_PROFILE'],
    runtimeFallback: {
      label: 'METRICOOL_* brand/account runtime env',
      prefixes: ['METRICOOL_'],
      exclude: [...metricoolTokenNames, 'METRICOOL_BASE_URL', 'METRICOOL_API_URL', 'METRICOOL_URL']
    }
  }
];

const metricoolOptional = ['METRICOOL_BASE_URL'];

function makeStatus(requiredEnv: EnvRequirement[]): SmokeStatus {
  return missing(requiredEnv).length === 0 ? 'ready_for_read_only_probe' : 'blocked_missing_configuration';
}

export function getConnectorSmokeReceipts(): ConnectorSmokeReceipt[] {
  const shopifyMissing = missing(shopifyRequired);
  const xylaRequirements = [...shopifyRequired, ...xylaRequired];
  const xylaMissing = missing(xylaRequirements);
  const metricoolMissing = missing(metricoolRequired);

  return [
    {
      connector: 'Shopify',
      status: shopifyMissing.length === 0 ? 'ready_for_read_only_probe' : 'blocked_missing_configuration',
      summary: shopifyMissing.length === 0 ? 'Store read configuration is present.' : 'Store read configuration is incomplete.',
      evidence: 'Checks only for Shopify read env aliases; does not call product, theme, checkout, or mutation endpoints.',
      requiredEnv: labels(shopifyRequired),
      optionalEnv: [],
      missingRequiredEnv: shopifyMissing,
      resolvedRequiredEnv: resolved(shopifyRequired),
      mutationPolicy: 'read_only_no_shopify_mutation'
    },
    {
      connector: 'Xyla',
      status: xylaMissing.length === 0 ? 'ready_for_read_only_probe' : 'blocked_missing_configuration',
      summary: xylaMissing.length === 0 ? 'Xyla install readiness has a runtime connection marker and can advance to a read-only install probe.' : 'Xyla install status is blocked until a Xyla connection marker is configured.',
      evidence: 'Checks only for Shopify base env plus at least one Xyla credential, app, install, account, shop env alias, or XYLA_* runtime key; does not call Xyla or Shopify mutation endpoints.',
      requiredEnv: labels(xylaRequirements),
      optionalEnv: xylaOptional,
      missingRequiredEnv: xylaMissing,
      resolvedRequiredEnv: resolved(xylaRequirements),
      mutationPolicy: 'read_only_no_xyla_or_shopify_mutation'
    },
    {
      connector: 'Metricool',
      status: makeStatus(metricoolRequired),
      summary: metricoolMissing.length === 0 ? 'Metricool brand/token readiness can be probed read-only once an endpoint is approved.' : 'Metricool brand/token readiness is blocked until API key and brand/account identifier are configured.',
      evidence: 'Checks only for Metricool API key plus brand/account/profile aliases or a non-token METRICOOL_* runtime key; does not create, schedule, publish, or mutate Metricool posts.',
      requiredEnv: labels(metricoolRequired),
      optionalEnv: metricoolOptional,
      missingRequiredEnv: metricoolMissing,
      resolvedRequiredEnv: resolved(metricoolRequired),
      mutationPolicy: 'read_only_no_metricool_scheduling_or_publish'
    }
  ];
}

export function getConnectorSmokeResponse() {
  const receipts = getConnectorSmokeReceipts();
  return {
    generatedAt: new Date().toISOString(),
    mode: 'read_only_configuration_smoke',
    productionMutationAllowed: false,
    externalWritesAllowed: false,
    receipts
  };
}
