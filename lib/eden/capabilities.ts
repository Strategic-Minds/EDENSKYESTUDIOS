export type CapabilityStatus = 'ready' | 'partial' | 'blocked' | 'approval_gated';

export type EdenCapability = {
  id: string;
  connector: string;
  purpose: string;
  status: CapabilityStatus;
  availableNow: string[];
  bridgeRoutes: string[];
  requiredSecrets: string[];
  approvalGate: string;
  blockedLiveActions: string[];
  fallbackReceiptMode: string;
  currentEvidence: Record<string, string | number | boolean | string[]>;
};

export const edenCapabilityRegistry: EdenCapability[] = [
  {
    id: 'CAP-GITHUB-001',
    connector: 'GitHub',
    purpose: 'Repo source control, branch planning, file updates, move queues, PR handoff, and code receipts.',
    status: 'partial',
    availableNow: ['read repository metadata', 'read and write files through connector', 'create durable bridge packets', 'queue file and folder move plans'],
    bridgeRoutes: ['/api/bridge/github-move', '/api/bridge/stack-readiness', '/api/bridge/registry'],
    requiredSecrets: ['GITHUB_TOKEN for runtime automation'],
    approvalGate: 'merge, destructive overwrite, deploy-triggering changes, or live repo automation',
    blockedLiveActions: ['delete without explicit approval', 'merge without approval', 'force overwrite', 'production deploy trigger'],
    fallbackReceiptMode: 'GitHub file handoff plus approval-control-plane row',
    currentEvidence: {
      repo: 'Strategic-Minds/EDENSKYESTUDIOS',
      permission: 'admin/maintain/push confirmed by connector',
      defaultBranch: 'main'
    }
  },
  {
    id: 'CAP-DRIVE-001',
    connector: 'Google Drive',
    purpose: 'Drive source truth, approval control plane, content plant, image library, file and folder movement queue.',
    status: 'partial',
    availableNow: ['create native Sheets from workbook imports', 'read file metadata', 'read Docs/Sheets', 'update Sheets', 'queue move plans'],
    bridgeRoutes: ['/api/bridge/drive-move', '/api/bridge/stack-readiness', '/api/bridge/registry'],
    requiredSecrets: ['Google Drive connector auth', 'Drive metadata update tool for direct addParents/removeParents execution'],
    approvalGate: 'moving canon files, changing folder parents, sharing changes, or deleting Drive assets',
    blockedLiveActions: ['delete Drive files', 'change sharing', 'move canon folders without approval', 'bulk move without receipt'],
    fallbackReceiptMode: 'Operation Queue row in Drive control sheet',
    currentEvidence: {
      approvalControlPlane: 'https://docs.google.com/spreadsheets/d/1D-2NTRPkvHfItlQ2LoDrrUNUrDZg9Iy1DvZ8GrxlrYg/edit?usp=drivesdk',
      imageLibrary: 'https://docs.google.com/spreadsheets/d/1XUZzOsCHbz6JEftYJy2RKiM3QizVn_TIJ915hQeV-q0/edit',
      directMoveToolAvailableInCurrentSession: false
    }
  },
  {
    id: 'CAP-VERCEL-001',
    connector: 'Vercel',
    purpose: 'Preview deploys, production deploy gates, route smoke checks, cron readiness, and preview receipts.',
    status: 'partial',
    availableNow: ['repo-side route and cron definitions', 'Auto Builder bridge packet handoff', 'Auto Builder preview executor route', 'Eden target Vercel project id provided'],
    bridgeRoutes: [
      'https://auto-builder-livid.vercel.app/api/bridge/vercel/eden-preview',
      '/api/bridge/vercel-preview',
      '/api/bridge/stack-readiness',
      '/api/bridge/registry'
    ],
    requiredSecrets: ['VERCEL_TOKEN in Auto Builder runtime', 'EDEN_SKYE_VERCEL_PROJECT_ID in Auto Builder runtime', 'VERCEL_TEAM_ID when required'],
    approvalGate: 'production deploy, env mutation, rollback, domain changes',
    blockedLiveActions: ['production deploy', 'environment variable mutation', 'domain switch', 'rollback'],
    fallbackReceiptMode: 'Auto Builder preview executor plus manual Vercel dashboard preview',
    currentEvidence: {
      edenProjectId: 'prj_mtmJQYYqRodNnH2UrDqwaK2MHgoA',
      expectedAutoBuilderEnv: 'EDEN_SKYE_VERCEL_PROJECT_ID',
      autoBuilderExecutor: 'https://auto-builder-livid.vercel.app/api/bridge/vercel/eden-preview',
      directRuntimeCallFromContainer: 'blocked by CONNECT 403',
      previewBridge: '/api/bridge/vercel-preview',
      buildPacket: 'https://github.com/Strategic-Minds/AUTO_BUILDER/blob/main/factory/build-packets/eden-skye-studios-shopify-preview-20260605.json'
    }
  },
  {
    id: 'CAP-SUPABASE-001',
    connector: 'Supabase',
    purpose: 'Database, auth, storage, queues, receipts, approval state, media assets, and member access control.',
    status: 'partial',
    availableNow: ['read projects', 'get project details', 'list functions/logs/branches when project id is known', 'generate types', 'advisory reads'],
    bridgeRoutes: ['/api/bridge/stack-readiness', '/api/bridge/registry'],
    requiredSecrets: ['NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'SUPABASE_SERVICE_ROLE_KEY for server receipts'],
    approvalGate: 'production migration, service-role writes, RLS changes, auth policy changes',
    blockedLiveActions: ['production migration', 'service-role mutation', 'RLS policy change', 'auth table mutation'],
    fallbackReceiptMode: 'SQL file handoff and dry-run receipt logging',
    currentEvidence: {
      projectId: 'prhppuuwcnmfdhwsagug',
      projectName: 'Strategic Minds Advisory',
      status: 'ACTIVE_HEALTHY',
      region: 'us-east-2',
      postgres: '17.6.1.121'
    }
  },
  {
    id: 'CAP-SHOPIFY-001',
    connector: 'Shopify',
    purpose: 'Storefront commerce source truth, products, collections, media hosting, checkout path, and Black Card offer wiring.',
    status: 'partial',
    availableNow: ['read connected shop info', 'upload image to Shopify CDN when approved', 'draft offer/collection/product plans'],
    bridgeRoutes: ['/api/bridge/stack-readiness', '/api/bridge/registry'],
    requiredSecrets: ['Connected Shopify app authorization', 'SHOPIFY_ADMIN_TOKEN for runtime automation when approved'],
    approvalGate: 'products, collections, prices, discounts, checkout, inventory, media upload for live products',
    blockedLiveActions: ['create product', 'update product', 'change price', 'create discount', 'publish theme/store changes'],
    fallbackReceiptMode: 'CSV/product plan handoff plus approval-control-plane row',
    currentEvidence: {
      shop: 'Eden Skye Studios',
      domain: 'eden-skye-studios.myshopify.com',
      plan: 'Basic',
      currency: 'USD',
      timezone: 'EDT'
    }
  },
  {
    id: 'CAP-XYLA-001',
    connector: 'Xyla',
    purpose: 'Downstream social creative packet generation and multi-channel content workflow.',
    status: 'blocked',
    availableNow: ['draft packet route in Eden app', 'approval-control-plane tracking'],
    bridgeRoutes: ['/api/xyla/draft', '/api/bridge/stack-readiness', '/api/bridge/registry'],
    requiredSecrets: ['XYLA_API_KEY or connected Xyla workspace'],
    approvalGate: 'auto-publish, live scheduling, public distribution',
    blockedLiveActions: ['auto-publish', 'live schedule', 'public distribution'],
    fallbackReceiptMode: 'Manual upload or draft packet export',
    currentEvidence: {
      draftRoute: '/api/xyla/draft',
      channels: ['facebook', 'instagram', 'x', 'tiktok', 'pinterest', 'snapchat']
    }
  }
];

export const edenBridgeQueues = [
  {
    id: 'QUEUE-DRIVE-MOVE-001',
    name: 'Move Images To Drive Bridge',
    route: '/api/bridge/drive-move',
    mode: 'queue_first',
    description: 'Accepts image/file/folder movement intents, validates required visual links and target folder IDs, logs a receipt, and returns a move packet for execution when Drive metadata move tooling is available.'
  },
  {
    id: 'QUEUE-GITHUB-MOVE-001',
    name: 'GitHub File And Folder Move Bridge',
    route: '/api/bridge/github-move',
    mode: 'branch_or_patch_first',
    description: 'Accepts file move/rename plans for GitHub, requires source path, destination path, repo, branch strategy, and approval gate.'
  },
  {
    id: 'QUEUE-VERCEL-PREVIEW-001',
    name: 'Vercel Preview Bridge',
    route: 'https://auto-builder-livid.vercel.app/api/bridge/vercel/eden-preview',
    mode: 'auto_builder_preview_executor',
    description: 'Auto Builder runtime executor for Eden Skye Studios Vercel preview deploys. Production deploy requests are blocked.'
  },
  {
    id: 'QUEUE-STACK-READINESS-001',
    name: 'Max Connectivity Readiness Bridge',
    route: '/api/bridge/stack-readiness',
    mode: 'readiness_snapshot',
    description: 'Returns capability status across GitHub, Drive, Vercel, Supabase, Shopify, Xyla, and approval gates.'
  }
] as const;

export function getCapabilitySummary() {
  const totals = edenCapabilityRegistry.reduce(
    (acc, capability) => {
      acc[capability.status] += 1;
      return acc;
    },
    { ready: 0, partial: 0, blocked: 0, approval_gated: 0 } satisfies Record<CapabilityStatus, number>
  );

  return {
    total: edenCapabilityRegistry.length,
    totals,
    bridgeQueues: edenBridgeQueues.length
  };
}
