import { NextResponse } from 'next/server';
import { getApprovalRequests, getMediaAssets } from '@/lib/admin-data';
import { getConnectorStatus, getEdenFactoryMaps } from '@/lib/eden/factory-maps';
import { EDEN_PUBLICATION_LOCKS } from '@/lib/eden/governance';
import { logEdenReceipt } from '@/lib/eden/receipts';
import { hasSupabaseServerConfig, usesServiceRole } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

const driveSources = {
  masterMediaRouter: 'https://docs.google.com/spreadsheets/d/12PaW83ldj_vvQ0OoKYtbHzbGzzf-w0tSoFSu-YAWKX4/edit?usp=drivesdk',
  gptImageQueue: 'https://docs.google.com/spreadsheets/d/1B_P1mi-wxxKzpsMB4X14gi2hQdjssFUBPstCYxU6R18/edit?usp=drivesdk',
  imageLibrary: 'https://docs.google.com/spreadsheets/d/1XUZzOsCHbz6JEftYJy2RKiM3QizVn_TIJ915hQeV-q0/edit?usp=drivesdk',
  driveWorkflowBridge: 'https://docs.google.com/spreadsheets/d/1R-nLyThF1lYXvntL7tlopyjwjBWw4lRaJGaKic8TGiI/edit?usp=drivesdk',
  contentPlant: 'https://docs.google.com/spreadsheets/d/1eMdKjlJZwWcsInvSJO_yhypqjd2Gw5ZfEYmmSg3wkoA/edit?usp=drivesdk'
};

function isVercelCron(request: Request) {
  return request.headers.get('x-vercel-cron') === '1';
}

export async function GET(request: Request) {
  const [media, approvals] = await Promise.all([getMediaAssets(), getApprovalRequests()]);
  const factoryMaps = getEdenFactoryMaps();
  const vercel = getConnectorStatus('Vercel');
  const openai = getConnectorStatus('OpenAI / Vercel AI Gateway');
  const heygen = getConnectorStatus('HeyGen');
  const pendingApprovals = approvals.data.filter((item) => item.status === 'pending').length;
  const approvedPublicAssets = media.data.filter((item) => item.status === 'approved_public').length;
  const openaiReady = Boolean(process.env.AI_GATEWAY_API_KEY ?? process.env.OPENAI_API_KEY ?? process.env.VERCEL_OIDC_TOKEN);
  const heygenReady = Boolean(process.env.HEYGEN_API_KEY);
  const cronHeaderPresent = isVercelCron(request);

  const details = {
    mode: 'vercel-sandbox-preview',
    cronHeaderPresent,
    driveSources,
    routing: {
      imageProvider: 'OpenAI GPT image generation through Eden/Vercel runtime',
      videoProvider: 'HeyGen after explicit approval',
      workflowRecord: 'Google Drive sheets',
      orchestration: 'EDENSKYESTUDIOS Vercel cron route'
    },
    readiness: {
      supabaseConfigured: hasSupabaseServerConfig(),
      serviceRoleAvailableServerSide: usesServiceRole,
      openaiReady,
      heygenReady,
      mediaAssetCount: media.data.length,
      approvalRequestCount: approvals.data.length,
      pendingApprovals,
      approvedPublicAssets
    },
    factory: {
      template: factoryMaps.templatePack.name,
      cronTriggers: factoryMaps.cronMap.length,
      connectors: factoryMaps.connectorMap.length,
      jobTypes: factoryMaps.jobTypes.length
    },
    connectors: { vercel, openai, heygen },
    locks: EDEN_PUBLICATION_LOCKS,
    blockedActions: [
      'production deploy',
      'public publishing',
      'shopify mutation',
      'payment or discount change',
      'klaviyo send',
      'live HeyGen session',
      'paid HeyGen generation without approval'
    ],
    nextActions: [
      'Review due rows in the Drive GPT image queue',
      'Generate draft-only image prompts or asset receipts when OpenAI runtime is configured',
      'Create approval requests before any HeyGen video creation',
      'Keep production deploy and public publishing locked'
    ]
  };

  const receipt = await logEdenReceipt({
    eventType: 'eden.cron.media_preview.readiness',
    action: 'vercel_sandbox_media_preview_cron',
    status: 'dry_run',
    riskLevel: pendingApprovals > 0 ? 'yellow' : 'green',
    target: '/api/cron/eden-media-preview',
    details
  });

  return NextResponse.json({
    name: 'Eden Skye Studios media preview cron',
    status: pendingApprovals > 0 ? 'yellow' : 'green',
    productionReady: false,
    previewSafe: true,
    cronHeaderPresent,
    details,
    receipt
  });
}
