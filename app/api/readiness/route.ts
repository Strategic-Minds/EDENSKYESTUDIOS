import { NextResponse } from 'next/server';
import { getApprovalRequests, getMediaAssets } from '@/lib/admin-data';
import { hasSupabaseServerConfig, usesServiceRole } from '@/lib/supabase-server';

export async function GET() {
  const [media, approvals] = await Promise.all([getMediaAssets(), getApprovalRequests()]);
  const pendingApprovals = approvals.data.filter((item) => item.status === 'pending').length;
  const approvedPublicAssets = media.data.filter((item) => item.status === 'approved_public').length;

  return NextResponse.json({
    name: 'Eden Skye Studios readiness',
    status: pendingApprovals > 0 ? 'yellow' : 'green',
    production_ready: false,
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
      production_deploy: false
    },
    blockers: [
      'Full source image packs are not complete.',
      'HeyGen private avatars are not trained.',
      'Production deploy requires explicit approval.',
      'Public publishing remains approval-gated.'
    ]
  });
}
