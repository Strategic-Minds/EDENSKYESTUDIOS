import { NextResponse } from 'next/server';

import { getPacketOrder, getRequiredRuntimeFiles, getRuntimeLocks } from '@/src/lib/eden/runtime/packet-loader';
import { runEdenWorkflow } from '@/src/lib/eden/runtime/workflow-runner';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const REQUIRED_ENV_KEYS = [
  'NEXT_PUBLIC_SUPABASE_URL',
  'SUPABASE_SERVICE_ROLE_KEY',
  'EDEN_CRON_SECRET',
  'SHOPIFY_STORE_DOMAIN',
  'SHOPIFY_ADMIN_ACCESS_TOKEN',
  'OPENAI_API_KEY',
  'GROQ_API_KEY'
];

function summarizeEnv() {
  return REQUIRED_ENV_KEYS.map((key) => ({
    key,
    present: Boolean(process.env[key])
  }));
}

async function buildInstallReport() {
  const run = await runEdenWorkflow('install');

  return {
    system: 'Eden Skye Studios autonomous cron runtime',
    route: '/api/eden/install',
    checkedAt: new Date().toISOString(),
    installStatus: run.status,
    packetOrder: getPacketOrder(),
    requiredRuntimeFiles: getRequiredRuntimeFiles(),
    fileChecks: run.validation.fileChecks,
    missingFiles: run.validation.missingFiles,
    environment: summarizeEnv(),
    migration: {
      path: 'supabase/migrations/001_eden_core_schema.sql',
      status: run.validation.missingFiles.includes('supabase/migrations/001_eden_core_schema.sql') ? 'missing' : 'available',
      targetTables: [
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
        'avatar_image_links',
        'website_page_specs',
        'website_visual_references',
        'drive_folder_targets',
        'source_truth_receipts',
        'automation_health_checks',
        'auto_heal_events',
        'hardening_findings'
      ]
    },
    vercelCron: {
      route: '/api/eden/cron',
      schedule: '*/5 * * * *',
      secretKey: 'EDEN_CRON_SECRET'
    },
    governanceLocks: getRuntimeLocks(),
    blockedActions: run.blockedActions,
    supabaseReadyReceipts: run.supabaseReadyReceipts
  };
}

export async function GET() {
  const report = await buildInstallReport();

  return NextResponse.json({
    ok: report.installStatus === 'ready',
    report
  });
}

export async function POST() {
  const report = await buildInstallReport();

  return NextResponse.json({
    ok: report.installStatus === 'ready',
    report
  });
}
