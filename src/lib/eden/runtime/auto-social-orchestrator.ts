export type AutoSocialStageState = 'ready' | 'blocked' | 'approval_required';

export type AutoSocialStage = {
  id: string;
  title: string;
  state: AutoSocialStageState;
  source: 'drive' | 'supabase' | 'git' | 'vercel_workflow' | 'auto_builder_2' | 'shopify_bridge' | 'social_draft';
  action: string;
  output: string;
  approvalRequired: boolean;
};

export type AutoSocialModelLane = {
  laneId: string;
  label: string;
  target: string;
  source: string;
  state: AutoSocialStageState;
};

export type AutoSocialPipelineReport = {
  generatedAt: string;
  pipelineId: string;
  mode: 'max_autonomous_governed_test';
  websiteControlSurface: string;
  autoBuilder: {
    source: 'AUTO_BUILDER_2';
    mcpUrl: string;
    expectedTools: string[];
    runJobAvailableInCurrentConnector: boolean;
  };
  sourceSystems: {
    drive: { rootFolderId: string; modelSystemFolderId: string; commandFolderId: string };
    supabase: { project: string; requiredTables: string[] };
    git: { repo: string; branch: string };
    vercel: { project: string; workflow: string; cron: string };
  };
  modelLanes: AutoSocialModelLane[];
  stages: AutoSocialStage[];
  testQueue: Array<Record<string, unknown>>;
  receipts: Array<Record<string, unknown>>;
  blockedActions: string[];
  nextExecutableStep: string;
};

const REQUIRED_TABLES = [
  'visual_source_assets',
  'image_registry',
  'image_manifest',
  'model_lanes',
  'model_personas',
  'model_images',
  'model_descriptions',
  'faceless_account_themes',
  'creator_identities',
  'creator_channels',
  'content_permissions',
  'content_queue_items',
  'avatar_registry',
  'website_page_specs',
  'website_visual_references',
  'drive_folder_targets',
  'source_truth_receipts',
  'automation_health_checks',
  'auto_heal_events',
  'hardening_findings'
];

const MODEL_LANES: AutoSocialModelLane[] = [
  {
    laneId: 'faceless_accounts',
    label: 'Faceless Accounts',
    target: '20 exact themes',
    source: 'Drive visual reference + Supabase faceless_account_themes',
    state: 'ready'
  },
  {
    laneId: 'international_models_18_35',
    label: 'International Models 18-35',
    target: '20 exact models',
    source: 'Drive visual reference + Supabase model_personas',
    state: 'ready'
  },
  {
    laneId: 'mature_models_50_80',
    label: 'Mature Models 50-80',
    target: '20 exact models',
    source: 'Drive visual reference + Supabase model_personas',
    state: 'ready'
  },
  {
    laneId: 'drive_inventory_lanes',
    label: 'Drive Inventory Model Lanes',
    target: 'Drive inventory count',
    source: 'Drive folder inventory + Supabase image_manifest',
    state: 'ready'
  }
];

const BLOCKED_ACTIONS = [
  'social_publish_without_approval',
  'customer_messages_without_approval',
  'production_deploy_without_approval',
  'dns_changes',
  'secret_exposure',
  'destructive_actions',
  'billing_or_payment_mutation'
];

function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 10)}`;
}

function buildStages(runJobAvailableInCurrentConnector: boolean): AutoSocialStage[] {
  return [
    {
      id: 'drive_inventory',
      title: 'Drive Source Truth Inventory',
      state: 'ready',
      source: 'drive',
      action: 'Read Eden model folders, visual references, and command-folder packets.',
      output: 'drive_folder_targets + image_manifest queue rows',
      approvalRequired: false
    },
    {
      id: 'supabase_registry_sync',
      title: 'Supabase Registry Sync',
      state: 'ready',
      source: 'supabase',
      action: 'Upsert model lanes, image registry records, creator identities, and content permissions.',
      output: 'model_personas + creator_identities + content_queue_items',
      approvalRequired: false
    },
    {
      id: 'model_persona_generation',
      title: 'Model Persona Drafting',
      state: 'ready',
      source: 'auto_builder_2',
      action: 'Generate pending-verification personas only from source-truth lanes and image metadata.',
      output: 'draft model_personas and model_descriptions',
      approvalRequired: false
    },
    {
      id: 'auto_social_content_queue',
      title: 'Auto Social Draft Queue',
      state: 'ready',
      source: 'social_draft',
      action: 'Create captions, hooks, scripts, and repurposing drafts for each approved test lane.',
      output: 'content_queue_items with approval_required before schedule',
      approvalRequired: false
    },
    {
      id: 'shopify_bridge_queue',
      title: 'Shopify Bridge Queue',
      state: 'ready',
      source: 'shopify_bridge',
      action: 'Prepare product, collection, image, content-page, and metaobject payloads.',
      output: 'shopify_bridge queue rows and receipts',
      approvalRequired: false
    },
    {
      id: 'git_build_queue',
      title: 'Git Build Queue',
      state: 'ready',
      source: 'git',
      action: 'Commit website/control-plane/runtime packet changes to the feature branch.',
      output: 'branch-safe build commits',
      approvalRequired: false
    },
    {
      id: 'vercel_workflow_execution',
      title: 'Vercel Workflow Execution',
      state: runJobAvailableInCurrentConnector ? 'ready' : 'blocked',
      source: 'vercel_workflow',
      action: 'Run the 5-minute workflow loop and validate website, runtime, bridge, and receipt endpoints.',
      output: 'preview deployment + endpoint validation evidence',
      approvalRequired: false
    },
    {
      id: 'schedule_or_publish',
      title: 'Social Schedule And Publish',
      state: 'approval_required',
      source: 'social_draft',
      action: 'Schedule posts after human approval and platform-account verification.',
      output: 'approved scheduling payloads only',
      approvalRequired: true
    }
  ];
}

export function buildAutoSocialPipelineReport(): AutoSocialPipelineReport {
  const pipelineId = createId('eden_auto_social');
  const runJobAvailableInCurrentConnector = false;
  const stages = buildStages(runJobAvailableInCurrentConnector);

  const testQueue = stages.map((stage) => ({
    queue_key: `${pipelineId}_${stage.id}`,
    channel: 'auto_social_pipeline',
    content_type: stage.id,
    approval_status: stage.approvalRequired ? 'pending_approval' : stage.state,
    payload: {
      source: stage.source,
      action: stage.action,
      output: stage.output,
      mode: 'max_autonomous_governed_test'
    }
  }));

  const receipts = stages.map((stage) => ({
    receipt_id: createId(`receipt_${stage.id}`),
    receipt_type: 'auto_social_pipeline_stage',
    actor: 'eden-auto-social-orchestrator',
    status: stage.state,
    source_truth: [
      'docs/eden/CONTROL_PLANE_MANIFEST.json',
      'docs/eden/CONTENT_CREATOR_SYSTEM_SPEC.json',
      'docs/eden/MODEL_PERSONA_REGISTRY_SPEC.json',
      'docs/eden/IMAGE_TO_MODEL_SYSTEM_MAP.json'
    ],
    blocked_actions: BLOCKED_ACTIONS,
    payload: stage,
    created_at: new Date().toISOString()
  }));

  return {
    generatedAt: new Date().toISOString(),
    pipelineId,
    mode: 'max_autonomous_governed_test',
    websiteControlSurface: '/#control-plane',
    autoBuilder: {
      source: 'AUTO_BUILDER_2',
      mcpUrl: 'https://auto-builder-strategic-minds-advisory.vercel.app/api/mcp',
      expectedTools: ['run_job', 'run_universal_job', 'run_drive_job', 'create_vercel_workflow', 'create_vercel_agent', 'rollback'],
      runJobAvailableInCurrentConnector
    },
    sourceSystems: {
      drive: {
        rootFolderId: '1uCsLaebFWtiMQ3T6A8i_NvgzWB6Kmxgk',
        modelSystemFolderId: '1nVGU4p4mCosBzcqMYoXYwafHGGMej62P',
        commandFolderId: '13uLhv0NRhmdCdJCCLrroLzyRRttoXtpr'
      },
      supabase: {
        project: 'Strategic Minds Advisory',
        requiredTables: REQUIRED_TABLES
      },
      git: {
        repo: 'Strategic-Minds/EDENSKYESTUDIOS',
        branch: 'feature/eden-skye-automation-v1'
      },
      vercel: {
        project: 'edenskyestudios',
        workflow: 'eden-auto-social-workflow',
        cron: '*/5 * * * *'
      }
    },
    modelLanes: MODEL_LANES,
    stages,
    testQueue,
    receipts,
    blockedActions: BLOCKED_ACTIONS,
    nextExecutableStep: runJobAvailableInCurrentConnector
      ? 'Run AUTO_BUILDER_2 run_job with jobType=auto_social_pipeline_test.'
      : 'Refresh or re-register AUTO BUILDER 2 connector until run_job and run_universal_job are exposed, or execute through Eden preview endpoints and connected Shopify/Git/Supabase tools.'
  };
}
