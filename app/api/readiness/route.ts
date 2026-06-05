import { NextResponse } from 'next/server';
import { getApprovalRequests, getMediaAssets } from '@/lib/admin-data';
import { getConnectorStatus, getEdenFactoryMaps } from '@/lib/eden/factory-maps';
import { EDEN_PUBLICATION_LOCKS } from '@/lib/eden/governance';
import { hasSupabaseServerConfig, usesServiceRole } from '@/lib/supabase-server';

export async function GET() {
  const [media, approvals] = await Promise.all([getMediaAssets(), getApprovalRequests()]);
  const pendingApprovals = approvals.data.filter((item) => item.status === 'pending').length;
  const approvedPublicAssets = media.data.filter((item) => item.status === 'approved_public').length;
  const factoryMaps = getEdenFactoryMaps();
  const slack = getConnectorStatus('Slack');
  const aiGatewayReady = Boolean(process.env.AI_GATEWAY_API_KEY ?? process.env.VERCEL_OIDC_TOKEN);

  return NextResponse.json({
    name: 'Eden Skye Studios readiness',
    status: pendingApprovals > 0 ? 'yellow' : 'green',
    production_ready: false,
    governed_runtime: {
      factory_maps_loaded: true,
      template: factoryMaps.templatePack.name,
      agent_lanes: factoryMaps.agentLanes.length,
      cron_triggers: factoryMaps.cronMap.length,
      connectors: factoryMaps.connectorMap.length,
      job_types: factoryMaps.jobTypes.length,
      chat_route: '/api/eden/chat',
      ai_gateway_configured: aiGatewayReady,
      slack_channel: slack,
      approval_locks: EDEN_PUBLICATION_LOCKS
    },
    supabase_configured: hasSupabaseServerConfig(),
    service_role_available_server_side: usesServiceRole,
    media_asset_count: media.data.length,
    approval_request_count: approvals.data.length,
    pending_approvals: pendingApprovals,
    approved_public_assets: approvedPublicAssets,
    gates: {
      public_publishing: false,
      heygen_training: false,
      shopify_mutation: false,
      production_deploy: false,
      payment_change: false,
      supabase_production_migration: false,
      klaviyo_send: false,
      live_heygen_session: false
    },
    blockers: [
      'AI Gateway env must be set in Vercel preview before /api/eden/chat can call the model.',
      'Supabase schema is staged as a dry-run migration only; production migration requires approval.',
      'HeyGen private avatars are not live-session enabled.',
      'Public publishing, Shopify, payments, Klaviyo sends, production deploys, and live avatar sessions remain approval-gated.'
    ]
  });
}
