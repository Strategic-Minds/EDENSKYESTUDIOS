export const runtime = 'nodejs';

type DraftJobBody = {
  title?: string;
  script?: string;
  avatarId?: string;
  avatarName?: string;
  voiceId?: string;
  styleId?: string;
  aspectRatio?: string;
  sourceAssetId?: string;
  approvalStatus?: 'Draft' | 'Needs Review' | 'Approved' | 'Rejected' | 'Queued';
};

function text(value: unknown, fallback = '') {
  return typeof value === 'string' ? value.slice(0, 4000) : fallback;
}

function makeReceiptId(seed: string) {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) hash = ((hash << 5) - hash + seed.charCodeAt(index)) | 0;
  return `eden-video-${Math.abs(hash).toString(16).padStart(8, '0')}`;
}

function buildDraftJob(body: DraftJobBody) {
  const title = text(body.title, 'Eden Skye HeyGen Draft');
  const script = text(body.script, '');
  const avatarId = text(body.avatarId, 'unselected-avatar');
  const styleId = text(body.styleId, 'manual-style');
  const aspectRatio = text(body.aspectRatio, '9:16');
  const approvalStatus = body.approvalStatus || 'Draft';
  const createdAt = new Date().toISOString();
  const receiptId = makeReceiptId([title, script, avatarId, styleId, aspectRatio, createdAt].join('|'));

  return {
    receiptId,
    title,
    script,
    avatarId,
    avatarName: text(body.avatarName, 'Unselected avatar'),
    voiceId: text(body.voiceId, 'default_or_unselected_voice'),
    styleId,
    aspectRatio,
    sourceAssetId: text(body.sourceAssetId, 'not_linked'),
    approvalStatus,
    approvalColor: approvalStatus === 'Approved' ? 'green' : approvalStatus === 'Rejected' ? 'red' : 'yellow',
    supabaseReceiptId: `planned:${receiptId}`,
    githubNotation: `docs/source-videos/generated-ingest/${receiptId}.json`,
    heygen: {
      createVideoPerformed: false,
      videoId: null,
      videoUrl: null,
      reason: 'Receipt-only draft job. Live HeyGen generation requires verified API credentials and explicit approval.'
    },
    liveMutation: {
      heygenCreatePerformed: false,
      metricoolSchedulePerformed: false,
      driveUploadPerformed: false,
      supabaseWritePerformed: false,
      githubCommitPerformed: false
    },
    createdAt
  };
}

export async function GET() {
  return Response.json({
    ok: true,
    route: '/api/eden/videos/draft-jobs',
    mode: 'receipt_only',
    accepts: ['POST application/json'],
    requiredFields: ['title', 'script', 'avatarId or selected asset', 'approvalStatus'],
    blockedLiveActions: ['heygen_create_without_verified_credentials', 'metricool_schedule_without_approval', 'public_publish', 'drive_upload_without_verified_connector'],
    recommendedTables: ['eden_video_assets', 'eden_video_draft_jobs', 'eden_video_receipts']
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as DraftJobBody;
    const job = buildDraftJob(body);

    return Response.json({
      ok: true,
      job,
      notation: {
        supabase: {
          receiptId: job.supabaseReceiptId,
          migrationStatus: 'staged_for_video_stack'
        },
        heygen: job.heygen,
        github: {
          notationPath: job.githubNotation,
          commitStatus: 'not_committed_from_preview'
        }
      }
    });
  } catch (error) {
    return Response.json({ ok: false, error: 'Video draft receipt failed.', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
