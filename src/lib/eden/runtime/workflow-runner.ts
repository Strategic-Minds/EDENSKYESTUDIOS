import { buildShopifyFeedReadiness } from './shopify-feed';
import { runValidationAgent, type EdenValidationReport } from './validation-agent';

export type EdenWorkflowTrigger = 'cron' | 'status' | 'install' | 'manual';

export type EdenSupabaseReceiptPayload = {
  source_truth_receipt: {
    target_table: 'source_truth_receipts';
    operation: 'insert';
    row: {
      receipt_id: string;
      receipt_type: string;
      actor: string;
      status: string;
      source_truth: string[];
      blocked_actions: string[];
      payload: Record<string, unknown>;
      created_at: string;
    };
  };
  automation_health_check: {
    target_table: 'automation_health_checks';
    operation: 'insert';
    row: {
      check_id: string;
      runtime: string;
      trigger: EdenWorkflowTrigger;
      readiness_score: number;
      ready_for_autonomous_cron: boolean;
      ready_for_production_release: boolean;
      missing_files: string[];
      missing_required_env: string[];
      blocked_actions: string[];
      payload: Record<string, unknown>;
      created_at: string;
    };
  };
};

export type EdenWorkflowRun = {
  runId: string;
  trigger: EdenWorkflowTrigger;
  status: 'ready' | 'blocked';
  startedAt: string;
  finishedAt: string;
  actionsPerformed: string[];
  validation: EdenValidationReport;
  shopifyFeed: ReturnType<typeof buildShopifyFeedReadiness>;
  supabaseReadyReceipts: EdenSupabaseReceiptPayload;
  blockedActions: string[];
};

const SOURCE_TRUTH = [
  'docs/eden/PACKET_MANIFEST.json',
  'docs/eden/WORKFLOW_RUNTIME_MANIFEST.json',
  'docs/eden/SUPABASE_SCHEMA_MANIFEST.json',
  'docs/eden/RECEIPT_SCHEMA_MANIFEST.json',
  'supabase/migrations/001_eden_core_schema.sql'
];

function createId(prefix: string) {
  const entropy = Math.random().toString(36).slice(2, 10);
  return `${prefix}_${Date.now()}_${entropy}`;
}

function createSupabaseReadyReceipts(
  trigger: EdenWorkflowTrigger,
  validation: EdenValidationReport,
  shopifyFeed: ReturnType<typeof buildShopifyFeedReadiness>,
  createdAt: string
): EdenSupabaseReceiptPayload {
  const status = validation.readyForAutonomousCron ? 'ready' : 'blocked';
  const payload = {
    trigger,
    validation_summary: {
      readiness_score: validation.readinessScore,
      missing_files: validation.missingFiles,
      missing_required_env: validation.missingRequiredEnv,
      checks: validation.checks
    },
    shopify_feed: {
      configured: shopifyFeed.configured,
      publish_status: shopifyFeed.publishStatus,
      prepared_item_count: shopifyFeed.preparedItems.length,
      receipt_payload: shopifyFeed.receiptPayload
    }
  };

  return {
    source_truth_receipt: {
      target_table: 'source_truth_receipts',
      operation: 'insert',
      row: {
        receipt_id: createId('eden_receipt'),
        receipt_type: 'eden_autonomous_runtime_check',
        actor: 'eden-autonomous-cron-runtime',
        status,
        source_truth: SOURCE_TRUTH,
        blocked_actions: validation.blockedActions,
        payload,
        created_at: createdAt
      }
    },
    automation_health_check: {
      target_table: 'automation_health_checks',
      operation: 'insert',
      row: {
        check_id: createId('eden_health'),
        runtime: validation.runtime,
        trigger,
        readiness_score: validation.readinessScore,
        ready_for_autonomous_cron: validation.readyForAutonomousCron,
        ready_for_production_release: validation.readyForProductionRelease,
        missing_files: validation.missingFiles,
        missing_required_env: validation.missingRequiredEnv,
        blocked_actions: validation.blockedActions,
        payload,
        created_at: createdAt
      }
    }
  };
}

export async function runEdenWorkflow(trigger: EdenWorkflowTrigger = 'manual') {
  const startedAt = new Date().toISOString();
  const validation = await runValidationAgent();
  const shopifyFeed = buildShopifyFeedReadiness();
  const finishedAt = new Date().toISOString();
  const supabaseReadyReceipts = createSupabaseReadyReceipts(trigger, validation, shopifyFeed, finishedAt);

  return {
    runId: createId('eden_run'),
    trigger,
    status: validation.readyForAutonomousCron ? 'ready' : 'blocked',
    startedAt,
    finishedAt,
    actionsPerformed: [
      'runtime_file_inventory_checked',
      'environment_readiness_checked',
      'governance_locks_checked',
      'shopify_feed_readiness_checked',
      'supabase_receipt_payloads_created'
    ],
    validation,
    shopifyFeed,
    supabaseReadyReceipts,
    blockedActions: validation.blockedActions
  } satisfies EdenWorkflowRun;
}

export async function getEdenStatusReport() {
  return runEdenWorkflow('status');
}
