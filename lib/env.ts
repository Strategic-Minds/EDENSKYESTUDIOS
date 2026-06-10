export const env = {
  cronEnabled: process.env.CRON_ENABLED === 'true',
  operatorApprovalRequired: process.env.OPERATOR_APPROVAL_REQUIRED !== 'false',
  socialPublishingEnabled: process.env.SOCIAL_PUBLISHING_ENABLED === 'true',
  shopifyLivePublishingEnabled: process.env.SHOPIFY_LIVE_PUBLISHING_ENABLED === 'true',
  customerMessagingEnabled: process.env.CUSTOMER_MESSAGING_ENABLED === 'true',
  shopifyDraftModeOnly: process.env.SHOPIFY_DRAFT_MODE_ONLY !== 'false',
};

export function assertSafeDefaults() {
  return {
    ok: env.operatorApprovalRequired && !env.socialPublishingEnabled && !env.shopifyLivePublishingEnabled && !env.customerMessagingEnabled && env.shopifyDraftModeOnly,
    env,
  };
}
