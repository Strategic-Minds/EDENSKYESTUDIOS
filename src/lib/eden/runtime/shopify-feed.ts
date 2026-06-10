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
  adminTokenConfigured: boolean;
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

export function buildShopifyFeedReadiness(): ShopifyFeedReadiness {
  const storeDomainConfigured = hasEnv('SHOPIFY_STORE_DOMAIN');
  const adminTokenConfigured = hasEnv('SHOPIFY_ADMIN_ACCESS_TOKEN');
  const preparedItems = PREPARED_ITEMS.map((item) => ({ ...item }));

  return {
    checkedAt: new Date().toISOString(),
    configured: storeDomainConfigured && adminTokenConfigured,
    storeDomainConfigured,
    adminTokenConfigured,
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
