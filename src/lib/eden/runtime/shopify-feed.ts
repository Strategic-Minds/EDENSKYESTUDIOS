export type ShopifyFeedItem = {
  handle: string;
  title: string;
  productType: string;
  status: 'pending_approval';
  tags: string[];
  requiresApproval: true;
};

export type ShopifyFeedReadiness = {
  checkedAt: string;
  configured: boolean;
  storeDomainConfigured: boolean;
  accountEmailConfigured: boolean;
  adminTokenConfigured: boolean;
  automationTokenConfigured: boolean;
  capabilityMode: 'not_configured' | 'admin_ready' | 'admin_and_automation_ready';
  publishStatus: 'blocked_until_approval';
  blockedActions: string[];
  preparedItems: ShopifyFeedItem[];
  receiptPayload: {
    target_table: 'content_queue_items';
    operation: 'upsert_prepared_shopify_feed';
    rows: ShopifyFeedItem[];
  };
};

const PREPARED_ITEMS: ShopifyFeedItem[] = [
  {
    handle: 'eden-skye-studios-starter-system',
    title: 'Eden Skye Studios Starter System',
    productType: 'Digital System',
    status: 'pending_approval',
    tags: ['eden-skye', 'starter-system', 'digital-product'],
    requiresApproval: true
  },
  {
    handle: 'eden-skye-creator-automation-setup',
    title: 'Eden Skye Creator Automation Setup',
    productType: 'Setup Service',
    status: 'pending_approval',
    tags: ['eden-skye', 'creator-automation', 'setup-service'],
    requiresApproval: true
  },
  {
    handle: 'eden-skye-autonomous-content-retainer',
    title: 'Eden Skye Autonomous Content Retainer',
    productType: 'Recurring Service',
    status: 'pending_approval',
    tags: ['eden-skye', 'content-system', 'retainer'],
    requiresApproval: true
  }
];

function hasEnv(key: string) {
  return Boolean(process.env[key]);
}

function getCapabilityMode(adminTokenConfigured: boolean, automationTokenConfigured: boolean) {
  if (adminTokenConfigured && automationTokenConfigured) {
    return 'admin_and_automation_ready' as const;
  }

  if (adminTokenConfigured) {
    return 'admin_ready' as const;
  }

  return 'not_configured' as const;
}

export function buildShopifyFeedReadiness(): ShopifyFeedReadiness {
  const storeDomainConfigured = hasEnv('SHOPIFY_STORE_DOMAIN');
  const accountEmailConfigured = hasEnv('SHOPIFY_ACCOUNT_EMAIL');
  const adminTokenConfigured = hasEnv('SHOPIFY_ADMIN_ACCESS_TOKEN');
  const automationTokenConfigured = hasEnv('SHOPIFY_AUTOMATION_TOKEN');
  const preparedItems = PREPARED_ITEMS.map((item) => ({ ...item }));
  const capabilityMode = getCapabilityMode(adminTokenConfigured, automationTokenConfigured);

  return {
    checkedAt: new Date().toISOString(),
    configured: storeDomainConfigured && adminTokenConfigured,
    storeDomainConfigured,
    accountEmailConfigured,
    adminTokenConfigured,
    automationTokenConfigured,
    capabilityMode,
    publishStatus: 'blocked_until_approval',
    blockedActions: ['shopify_live_publish', 'customer_messages', 'secret_exposure'],
    preparedItems,
    receiptPayload: {
      target_table: 'content_queue_items',
      operation: 'upsert_prepared_shopify_feed',
      rows: preparedItems
    }
  };
}
