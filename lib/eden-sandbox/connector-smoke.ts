type SmokeStatus = 'read_only_passed' | 'ready_for_read_only_probe' | 'blocked_missing_configuration';

type ConnectorSmokeReceipt = {
  connector: string;
  status: SmokeStatus;
  summary: string;
  evidence: string;
  requiredEnv: string[];
  optionalEnv: string[];
  missingRequiredEnv: string[];
  mutationPolicy: string;
};

const hasEnv = (name: string) => Boolean(process.env[name]?.trim());
const missing = (names: string[]) => names.filter((name) => !hasEnv(name));

const shopifyRequired = ['SHOPIFY_SHOP', 'SHOPIFY_ADMIN_TOKEN'];
const xylaRequired = ['XYLA_APP_ID', 'XYLA_INSTALLATION_ID'];
const xylaOptional = ['XYLA_API_KEY', 'XYLA_SHOP_DOMAIN', 'XYLA_ACCOUNT_ID'];
const metricoolRequired = ['METRICOOL_API_KEY', 'METRICOOL_BRAND_ID'];
const metricoolOptional = ['METRICOOL_USER_ID', 'METRICOOL_BASE_URL'];

function makeStatus(requiredEnv: string[]): SmokeStatus {
  return missing(requiredEnv).length === 0 ? 'ready_for_read_only_probe' : 'blocked_missing_configuration';
}

export function getConnectorSmokeReceipts(): ConnectorSmokeReceipt[] {
  const xylaMissing = missing([...shopifyRequired, ...xylaRequired]);
  const metricoolMissing = missing(metricoolRequired);

  return [
    {
      connector: 'Shopify',
      status: missing(shopifyRequired).length === 0 ? 'ready_for_read_only_probe' : 'blocked_missing_configuration',
      summary: missing(shopifyRequired).length === 0 ? 'Store read configuration is present.' : 'Store read configuration is incomplete.',
      evidence: 'Checks only for required Shopify read env names; does not call product, theme, checkout, or mutation endpoints.',
      requiredEnv: shopifyRequired,
      optionalEnv: [],
      missingRequiredEnv: missing(shopifyRequired),
      mutationPolicy: 'read_only_no_shopify_mutation'
    },
    {
      connector: 'Xyla',
      status: xylaMissing.length === 0 ? 'ready_for_read_only_probe' : 'blocked_missing_configuration',
      summary: xylaMissing.length === 0 ? 'Xyla install status can be probed read-only once an endpoint is approved.' : 'Xyla install status is blocked until app/install identifiers are configured.',
      evidence: 'Checks only for Shopify base env plus Xyla app/install env names; does not call Xyla or Shopify mutation endpoints.',
      requiredEnv: [...shopifyRequired, ...xylaRequired],
      optionalEnv: xylaOptional,
      missingRequiredEnv: xylaMissing,
      mutationPolicy: 'read_only_no_xyla_or_shopify_mutation'
    },
    {
      connector: 'Metricool',
      status: makeStatus(metricoolRequired),
      summary: metricoolMissing.length === 0 ? 'Metricool brand/token readiness can be probed read-only once an endpoint is approved.' : 'Metricool brand/token readiness is blocked until API key and brand ID are configured.',
      evidence: 'Checks only for Metricool API key and brand ID env names; does not create, schedule, publish, or mutate Metricool posts.',
      requiredEnv: metricoolRequired,
      optionalEnv: metricoolOptional,
      missingRequiredEnv: metricoolMissing,
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
