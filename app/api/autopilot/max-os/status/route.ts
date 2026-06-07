import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const maxOsStatus = {
  systemName: 'Eden Skye Auto Social MAX Revised OS v1',
  sourceWorkbook: {
    title: 'Eden Skye Auto Social MAX Revised OS v1 - 2026-06-07',
    spreadsheetId: '16abS0dwSDs1H33P4FE05RBBukWAHpxq1mWMq3B4H2qA',
    url: 'https://docs.google.com/spreadsheets/d/16abS0dwSDs1H33P4FE05RBBukWAHpxq1mWMq3B4H2qA/edit?usp=drivesdk'
  },
  queue: {
    dailyTarget: 195,
    sevenDayTarget: 1365,
    platforms: {
      tiktok: { daily: 60, status: 'metricool_draft_ready_after_approval' },
      instagram: { daily: 40, status: 'metricool_draft_ready_after_approval' },
      youtubeShorts: { daily: 40, status: 'queue_only_connector_needed' },
      x: { daily: 30, status: 'queue_only_connector_needed' },
      pinterest: { daily: 25, status: 'queue_only_connector_needed' }
    }
  },
  connectedSystems: {
    drive: 'connected',
    github: 'connected',
    vercelPreview: 'branch_connected',
    metricool: ['facebook', 'instagram', 'tiktok'],
    shopify: 'approval_required_before_mutation',
    supabase: 'schema_targets_defined_write_approval_required',
    heygen: 'winner_conversion_queue',
    higgsfield: 'queue_ready_direct_execution_blocked_until_connector_or_api'
  },
  approvalGates: {
    publicPublishing: 'locked',
    productionDeploy: 'locked',
    shopifyMutation: 'locked',
    paymentsAndDiscounts: 'locked',
    massEmail: 'locked'
  },
  routes: {
    adminPreview: '/autopilot/max-os',
    statusApi: '/api/autopilot/max-os/status'
  }
};

export async function GET() {
  return NextResponse.json(maxOsStatus, {
    headers: {
      'Cache-Control': 'no-store'
    }
  });
}
