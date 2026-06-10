import { buildShopifyFeedReadiness } from './shopify-feed';

export type ShopifyBridgeMode = 'direct_admin_token' | 'connector_bridge' | 'autobuilder_bridge';

export type ShopifyBridgeAction =
  | 'upload_image'
  | 'create_product'
  | 'update_product'
  | 'create_collection'
  | 'prepare_theme_edit'
  | 'write_metaobject'
  | 'write_content_page';

export type ShopifyBridgePayload = {
  bridgeId: string;
  createdAt: string;
  store: {
    name: 'Eden Skye Studios';
    domainConfigured: boolean;
    adminTokenConfigured: boolean;
    automationTokenConfigured: boolean;
    serviceAccountConfigured: boolean;
  };
  primaryMode: ShopifyBridgeMode;
  availableModes: ShopifyBridgeMode[];
  allowedActions: ShopifyBridgeAction[];
  approvalRequiredActions: string[];
  blockedActions: string[];
  connectorExecution: {
    surface: 'shopify_mcp_connector';
    requiredTools: string[];
    sequence: Array<{
      step: number;
      action: ShopifyBridgeAction;
      connectorTool: string;
      purpose: string;
      approvalRequired: boolean;
    }>;
  };
  autoBuilderExecution: {
    surface: 'auto_builder_2_mcp';
    status: 'ready_when_run_job_tool_available';
    jobType: 'shopify_store_build_bridge';
    payload: Record<string, unknown>;
  };
  receiptPayload: {
    target_table: 'content_queue_items';
    operation: 'insert_shopify_bridge_queue';
    rows: Array<Record<string, unknown>>;
  };
};

const ALLOWED_ACTIONS: ShopifyBridgeAction[] = [
  'upload_image',
  'create_product',
  'update_product',
  'create_collection',
  'prepare_theme_edit',
  'write_metaobject',
  'write_content_page'
];

const APPROVAL_REQUIRED_ACTIONS = [
  'publish_live_theme',
  'publish_to_online_store',
  'send_customer_message',
  'charge_customer',
  'delete_product',
  'delete_theme',
  'delete_file',
  'change_dns',
  'change_payments'
];

const BLOCKED_ACTIONS = [
  'secret_exposure',
  'payment_mutation',
  'refunds',
  'gift_card_writes',
  'staff_management',
  'live_theme_publish_without_approval',
  'customer_messaging_without_approval'
];

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function pickPrimaryMode(feed: ReturnType<typeof buildShopifyFeedReadiness>): ShopifyBridgeMode {
  if (feed.storeDomainConfigured && feed.adminTokenConfigured) {
    return 'direct_admin_token';
  }

  if (feed.automationTokenConfigured) {
    return 'autobuilder_bridge';
  }

  return 'connector_bridge';
}

export function buildShopifyBridgePayload(): ShopifyBridgePayload {
  const feed = buildShopifyFeedReadiness();
  const primaryMode = pickPrimaryMode(feed);
  const bridgeId = createId('eden_shopify_bridge');
  const createdAt = new Date().toISOString();

  return {
    bridgeId,
    createdAt,
    store: {
      name: 'Eden Skye Studios',
      domainConfigured: feed.storeDomainConfigured,
      adminTokenConfigured: feed.adminTokenConfigured,
      automationTokenConfigured: feed.automationTokenConfigured,
      serviceAccountConfigured: feed.serviceAccountConfigured
    },
    primaryMode,
    availableModes: ['direct_admin_token', 'connector_bridge', 'autobuilder_bridge'],
    allowedActions: ALLOWED_ACTIONS,
    approvalRequiredActions: APPROVAL_REQUIRED_ACTIONS,
    blockedActions: BLOCKED_ACTIONS,
    connectorExecution: {
      surface: 'shopify_mcp_connector',
      requiredTools: [
        'Shopify.upload-image',
        'Shopify.create-product',
        'Shopify.update-product',
        'Shopify.create-collection',
        'Shopify.graphql_schema',
        'Shopify.validate_graphql_codeblocks',
        'Shopify.graphql_mutation'
      ],
      sequence: [
        {
          step: 1,
          action: 'upload_image',
          connectorTool: 'Shopify.upload-image',
          purpose: 'Move Eden visual assets to Shopify CDN before attaching them to products, collections, or pages.',
          approvalRequired: false
        },
        {
          step: 2,
          action: 'create_product',
          connectorTool: 'Shopify.create-product or Shopify.graphql_mutation(productCreate)',
          purpose: 'Create draft or approval-gated products from Eden offer records and uploaded image URLs.',
          approvalRequired: false
        },
        {
          step: 3,
          action: 'create_collection',
          connectorTool: 'Shopify.create-collection',
          purpose: 'Create store collections for Eden offer families and automation lanes.',
          approvalRequired: false
        },
        {
          step: 4,
          action: 'prepare_theme_edit',
          connectorTool: 'Shopify.graphql_mutation(themeFilesUpsert)',
          purpose: 'Prepare theme file edits on an unpublished theme only; live theme publication remains gated.',
          approvalRequired: true
        }
      ]
    },
    autoBuilderExecution: {
      surface: 'auto_builder_2_mcp',
      status: 'ready_when_run_job_tool_available',
      jobType: 'shopify_store_build_bridge',
      payload: {
        bridgeId,
        store: 'Eden Skye Studios',
        repo: 'Strategic-Minds/EDENSKYESTUDIOS',
        branch: 'feature/eden-skye-automation-v1',
        requestedActions: ALLOWED_ACTIONS,
        approvalRequiredActions: APPROVAL_REQUIRED_ACTIONS,
        blockedActions: BLOCKED_ACTIONS,
        expectedEnv: [
          'SHOPIFY_SHOP',
          'SHOPIFY_ADMIN_TOKEN',
          'SHOPIFY_ADMIN_ACCESS_TOKEN',
          'SHOPIFY_AUTOMATION_TOKEN',
          'SHOPIFY_SERVICE_ACCOUNT_EMAIL'
        ]
      }
    },
    receiptPayload: {
      target_table: 'content_queue_items',
      operation: 'insert_shopify_bridge_queue',
      rows: ALLOWED_ACTIONS.map((action) => ({
        queue_key: `${bridgeId}_${action}`,
        channel: 'shopify_bridge',
        content_type: action,
        approval_status: APPROVAL_REQUIRED_ACTIONS.includes(action) ? 'pending_approval' : 'ready',
        payload: {
          action,
          primaryMode,
          connectorSurface: 'shopify_mcp_connector',
          autoBuilderSurface: 'auto_builder_2_mcp'
        }
      }))
    }
  };
}
