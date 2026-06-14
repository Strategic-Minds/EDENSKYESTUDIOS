export const runtime = 'nodejs';

type ApprovalColor = 'green' | 'yellow' | 'red';
type ApprovalFolder = 'Drafts' | 'Needs Review' | 'Approved' | 'Rejected' | 'Drive Ready';

type IngestBody = {
  source?: string;
  reason?: string;
  filename?: string;
  originalPrompt?: string;
  productionPrompt?: string;
  model?: string;
  provider?: string;
  mimeType?: string;
  size?: number;
  approvalFolder?: ApprovalFolder;
  approvalStatus?: string;
  approvalColor?: ApprovalColor;
  qaScore?: number;
  qaMinScore?: number;
  manifestSlot?: string;
  targetFilename?: string;
  driveFileId?: string;
  driveUrl?: string;
  matchConfidence?: string;
};

const adminDrivePackage = {
  rootFolderId: '1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ',
  adminFolderId: '1EMnjZKTBT4wlO0ZgR5F6tXDKV1dvK76x',
  packageZipFileId: '104GT_RN95yIEeUybLXLd7Q2wFsk6lYjC',
  unzippedFolderId: '1vDvg27JrMUghw_-kwlP4yCvdHRU2MH98',
  manifestCsvFileId: '1ExzMzWaW1IqrGDk5n1_i0FI789-7N3JB',
  workflowReceiptFileId: '1fA-DjGEAeO3pRVVtk_zCZZcFeVipgtot',
  supabaseNotationFileId: '1nlWjKaTmQZMMHcg3m_zM2k-LIUjc7bkP',
  readmeFileId: '1AB3NpXbi3J634Z_p3bVRg-n_d3NBaNXu'
};

const manifestSlots = [
  ['eden-skye-001', 'eden-skye-001_identity-lock_front-portrait_4x5_v1.png', 92],
  ['eden-skye-002', 'eden-skye-002_identity-lock_three-quarter_4x5_v1.png', 92],
  ['eden-skye-003', 'eden-skye-003_identity-lock_side-profile_4x5_v1.png', 92],
  ['eden-skye-004', 'eden-skye-004_portfolio_black-card-portrait_4x5_v1.png', 90],
  ['eden-skye-005', 'eden-skye-005_portfolio_white-blazer_4x5_v1.png', 90],
  ['eden-skye-006', 'eden-skye-006_website-hero_black-neon-stage_16x9_v1.png', 90],
  ['eden-skye-007', 'eden-skye-007_website-hero_neon-runway_16x9_v1.png', 90],
  ['eden-skye-008', 'eden-skye-008_wardrobe-safe_full-body-black_9x16_v1.png', 94],
  ['eden-skye-009', 'eden-skye-009_background_walk-in-closet_16x9_v1.png', 88],
  ['eden-skye-010', 'eden-skye-010_social-vertical_hot-pink-blazer_9x16_v1.png', 90],
  ['eden-skye-011', 'eden-skye-011_heygen-headshot_dark-studio_1x1_v1.png', 95],
  ['eden-skye-012', 'eden-skye-012_heygen-half-body_white-blazer_9x16_v1.png', 95]
] as const;

function text(value: unknown, fallback = '') {
  return typeof value === 'string' ? value.slice(0, 4000) : fallback;
}

function numberValue(value: unknown, fallback = 0) {
  return typeof value === 'number' && Number.isFinite(value) ? Math.max(0, Math.min(100, Math.round(value))) : fallback;
}

function slug(value: string) {
  return value.toLowerCase().replace(/\.[a-z0-9]+$/i, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 80) || 'source-image';
}

function inferSlot(filename: string, explicitSlot?: string) {
  const explicit = explicitSlot && manifestSlots.find(([assetId]) => assetId === explicitSlot);
  if (explicit) return explicit;
  const assetId = filename.match(/eden-skye-\d{3}/i)?.[0]?.toLowerCase();
  const byAssetId = assetId && manifestSlots.find(([slotAssetId]) => slotAssetId === assetId);
  if (byAssetId) return byAssetId;
  const byFilename = manifestSlots.find(([, outputFilename]) => outputFilename === filename);
  return byFilename || null;
}

function folderFromStatus(color: ApprovalColor, folder?: ApprovalFolder): ApprovalFolder {
  if (folder) return folder;
  if (color === 'green') return 'Approved';
  if (color === 'red') return 'Rejected';
  return 'Needs Review';
}

function colorFromFolder(folder: ApprovalFolder, requested?: ApprovalColor): ApprovalColor {
  if (requested) return requested;
  if (folder === 'Approved' || folder === 'Drive Ready') return 'green';
  if (folder === 'Rejected') return 'red';
  return 'yellow';
}

function makeReceiptId(seed: string) {
  let hash = 0;
  for (let index = 0; index < seed.length; index += 1) hash = ((hash << 5) - hash + seed.charCodeAt(index)) | 0;
  return `eden-img-${Math.abs(hash).toString(16).padStart(8, '0')}`;
}

function buildRecord(body: IngestBody) {
  const sourceFilename = text(body.filename, 'untitled-source-image.png');
  const slot = inferSlot(sourceFilename, text(body.manifestSlot));
  const manifestSlot = slot?.[0] || text(body.manifestSlot, 'unassigned-upload');
  const targetFilename = text(body.targetFilename, slot?.[1] || `eden-skye-upload_${slug(sourceFilename)}.png`);
  const qaMinScore = numberValue(body.qaMinScore, slot?.[2] || 90);
  const qaScore = numberValue(body.qaScore, 0);
  const approvalFolder = folderFromStatus(text(body.approvalColor) as ApprovalColor, body.approvalFolder);
  const approvalColor = colorFromFolder(approvalFolder, body.approvalColor);
  const status = text(body.approvalStatus, approvalColor === 'green' ? 'Approved by admin review' : approvalColor === 'red' ? 'Rejected or blocked' : 'Needs QA, Drive ID, or manifest review');
  const driveFileId = text(body.driveFileId) || null;
  const driveUrl = text(body.driveUrl) || (driveFileId ? `https://drive.google.com/file/d/${driveFileId}/view` : null);
  const seed = [sourceFilename, targetFilename, manifestSlot, driveFileId || 'no-drive-file', qaScore, approvalFolder, text(body.reason, 'ingest')].join('|');
  const receiptId = makeReceiptId(seed);
  const supabaseReceiptId = `planned:${receiptId}`;
  const githubNotation = `docs/source-images/generated-ingest/${receiptId}.json`;
  const recordedAt = new Date().toISOString();

  return {
    receiptId,
    source: text(body.source, 'editor'),
    reason: text(body.reason, 'image_stack_ingest'),
    filename: sourceFilename,
    targetFilename,
    manifestSlot,
    qaScore,
    qaMinScore,
    approvalColor,
    approvalStatus: status,
    approvalFolder,
    driveFileId,
    driveUrl,
    mimeType: text(body.mimeType, 'image/png'),
    size: typeof body.size === 'number' ? Math.max(0, Math.round(body.size)) : 0,
    originalPrompt: text(body.originalPrompt, 'Not captured yet'),
    productionPrompt: text(body.productionPrompt, 'Not captured yet'),
    model: text(body.model, 'unknown'),
    provider: text(body.provider, 'eden-image-stack'),
    matchConfidence: text(body.matchConfidence, slot ? 'clean_or_provisional' : 'unmatched'),
    supabaseReceiptId,
    githubNotation,
    recordedAt,
    writeMode: 'receipt_only' as const,
    liveMutation: {
      driveUploadPerformed: false,
      supabaseWritePerformed: false,
      githubCommitPerformed: false,
      reason: 'Preview route records receipt metadata only. Live Drive/Supabase/GitHub writes require verified connector approval.'
    }
  };
}

function selfTestBody(): IngestBody {
  return {
    source: 'vercel_preview_self_test',
    reason: 'ingest_api_contract_self_test',
    filename: 'eden-skye-001_identity-lock_front-portrait_4x5_v1.png',
    targetFilename: 'eden-skye-001_identity-lock_front-portrait_4x5_v1.png',
    manifestSlot: 'eden-skye-001',
    qaScore: 94,
    qaMinScore: 92,
    approvalFolder: 'Approved',
    approvalColor: 'green',
    approvalStatus: 'Self-test record only. No live external write performed.',
    mimeType: 'image/png',
    size: 2048,
    originalPrompt: 'Self-test upload record for Eden image stack.',
    productionPrompt: 'Platform-safe Eden source image receipt test.',
    model: 'self-test',
    provider: 'vercel-runtime',
    matchConfidence: 'clean_self_test'
  };
}

export async function GET(request: Request) {
  const url = new URL(request.url);

  if (url.searchParams.get('selfTest') === '1') {
    const postResponse = await POST(new Request(`${url.origin}/api/eden/source-images/ingest-generated`, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(selfTestBody())
    }));
    const result = await postResponse.json();

    return Response.json({
      ok: postResponse.ok,
      selfTest: true,
      transport: 'GET wrapper executed exported POST handler inside the Vercel runtime',
      postStatus: postResponse.status,
      assertions: {
        receiptBuilt: Boolean(result.record?.receiptId),
        manifestMatched: result.record?.manifestSlot === 'eden-skye-001',
        targetFilenameMatched: result.record?.targetFilename === 'eden-skye-001_identity-lock_front-portrait_4x5_v1.png',
        approvalColorGreen: result.record?.approvalColor === 'green',
        supabaseWriteBlocked: result.record?.liveMutation?.supabaseWritePerformed === false,
        driveWriteBlocked: result.record?.liveMutation?.driveUploadPerformed === false,
        githubWriteBlocked: result.record?.liveMutation?.githubCommitPerformed === false
      },
      ...result
    }, { status: postResponse.status });
  }

  return Response.json({
    status: 'ready',
    route: '/api/eden/source-images/ingest-generated',
    mode: 'receipt_only',
    adminDrivePackage,
    selfTest: '/api/eden/source-images/ingest-generated?selfTest=1',
    requiredRecordFields: [
      'filename',
      'targetFilename',
      'manifestSlot',
      'qaScore',
      'approvalColor',
      'approvalFolder',
      'driveFileId when available',
      'supabaseReceiptId',
      'githubNotation'
    ],
    blockedLiveActions: ['drive_upload_without_verified_connector', 'supabase_production_write', 'github_commit_from_preview', 'public_publish', 'pr8_promotion_without_clean_manifest_matching'],
    manifestSlots: manifestSlots.map(([assetId, outputFilename, qaMinScore]) => ({ assetId, outputFilename, qaMinScore }))
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json() as IngestBody;
    const record = buildRecord(body);
    return Response.json({
      ok: true,
      record,
      notation: {
        drive: {
          adminFolderId: adminDrivePackage.adminFolderId,
          packageManifestFileId: adminDrivePackage.manifestCsvFileId,
          intendedFolder: record.approvalFolder,
          driveFileId: record.driveFileId,
          driveUrl: record.driveUrl
        },
        supabase: {
          receiptId: record.supabaseReceiptId,
          recommendedTable: 'eden_source_image_assets',
          migrationStatus: 'not_applied_from_preview'
        },
        github: {
          notationPath: record.githubNotation,
          commitStatus: 'not_committed_from_preview'
        }
      }
    });
  } catch (error) {
    return Response.json({ ok: false, error: 'Image ingest receipt failed.', details: error instanceof Error ? error.message : 'Unknown error' }, { status: 500 });
  }
}
