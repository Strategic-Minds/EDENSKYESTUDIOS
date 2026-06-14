export type WorkflowTone = 'green' | 'yellow' | 'red';
export type ModelGroup = 'female' | 'male' | 'faceless';
export type SourceState = 'ready' | 'needs-review' | 'missing';
export type MatchStatus = 'matched' | 'candidate' | 'unmatched';

export type WorkflowStep = {
  id: string;
  number: number;
  label: string;
  tone: WorkflowTone;
  count: number;
  href: string;
};

export type AdminLink = {
  label: string;
  href: string;
  helper: string;
  status: WorkflowTone;
};

export type ContentPlanDay = {
  day: string;
  date: string;
  theme: string;
  channel: string;
  deliverable: string;
  status: WorkflowTone;
};

export type ModelRecord = {
  id: string;
  name: string;
  group: ModelGroup;
  role: string;
  stats: string;
  manifestSlot: string;
  sourceState: SourceState;
  sourceImagesNeeded: number;
  sourceImagesReady: number;
  image?: string;
};

export type DriveSourceFolder = {
  id: string;
  name: string;
  role: string;
  state: WorkflowTone;
  url: string;
  itemCount: number;
  note: string;
};

export type SourceImageManifestRecord = {
  assetId: string;
  model: string;
  manifestSlot: string;
  assetType: string;
  purpose: string;
  outputFilename: string;
  qaMinScore: number;
  qaScore: number | null;
  approvalColor: WorkflowTone;
  approvalStatus: string;
  driveFileId: string | null;
  driveFileName: string | null;
  proposedFilename: string | null;
  matchStatus: MatchStatus;
};

export const repairedManifest = {
  title: 'STOCK_IMAGE_MASTER_MANIFEST_REPAIRED.csv',
  driveFileId: '1aQmG63GyarR8XsS14u6-Sn_yG64vtnXI',
  folder: '07_IMAGE_VIDEO_FACTORY',
  batchId: 'ES-IMG-2026-06-12-001',
  model: 'Eden Skye',
  ageFloor: 25,
  requiredRows: 12
};

export const driveSourceFolders: DriveSourceFolder[] = [
  {
    id: '1G3r4I99_c59p3HhZ_EQX-MoPvzWEGK_M',
    name: '2026-06-14 Roster Board Batch',
    role: 'canonical source-image destination folder',
    state: 'yellow',
    url: 'https://drive.google.com/drive/folders/1G3r4I99_c59p3HhZ_EQX-MoPvzWEGK_M',
    itemCount: 0,
    note: 'Folder is confirmed and empty from connector listing. Move approved binaries here after exact manifest naming is clean.'
  },
  {
    id: '1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE',
    name: 'TEMP IMAGES',
    role: 'visual candidate source folder',
    state: 'yellow',
    url: 'https://drive.google.com/drive/folders/1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE',
    itemCount: 16,
    note: 'Visual scan found mostly closet and black-wardrobe candidates. These are candidates only, not approval-ready exact matches.'
  }
];

export const manifestSyncStatus = {
  title: 'Manifest candidate map active',
  state: 'yellow' as WorkflowTone,
  description: 'The repaired Drive manifest is loaded as the only inventory source. Candidate Drive PNGs are mapped visually where defensible, but PR #8 remains blocked until all 12 files have exact manifest filenames, Drive file IDs, QA scores, and approval state.',
  requiredSource: `${repairedManifest.title} (${repairedManifest.driveFileId})`,
  sourceFolder: '2026-06-14 Roster Board Batch (1G3r4I99_c59p3HhZ_EQX-MoPvzWEGK_M)',
  nextAction: 'Move or upload approved binaries into the source-image folder, rename/map each one to output_filename, then promote only green matches.'
};

export const workflowSteps: WorkflowStep[] = [
  { id: 'discover', number: 1, label: 'Discover', tone: 'green', count: 1, href: '/eden-source-images' },
  { id: 'plan', number: 2, label: 'Plan', tone: 'green', count: 12, href: '/eden-source-images/models' },
  { id: 'create', number: 3, label: 'Create', tone: 'yellow', count: 16, href: '/eden-source-images/image-stack' },
  { id: 'review', number: 4, label: 'Review', tone: 'yellow', count: 3, href: '/eden-source-images/models' },
  { id: 'schedule', number: 5, label: 'Schedule', tone: 'yellow', count: 0, href: '/eden-source-images/video-stack' },
  { id: 'analyze', number: 6, label: 'Analyze', tone: 'red', count: 9, href: '/eden-source-images' }
];

export const adminLinks: AdminLink[] = [
  { label: 'Editor', href: '/eden-source-images/editor', helper: 'Open the Eden chat/editor workspace.', status: 'green' },
  { label: 'Image Stack', href: '/eden-source-images/image-stack', helper: 'Upload, stack, approve, and match source images.', status: 'yellow' },
  { label: 'Video Stack', href: '/eden-source-images/video-stack', helper: 'Draft HeyGen video jobs and approval receipts.', status: 'yellow' },
  { label: 'Model Inventory', href: '/eden-source-images/models', helper: 'Manifest-driven roster and source image requirements.', status: 'yellow' },
  { label: 'Female Models', href: '/eden-source-images/models/female', helper: 'Eden Skye manifest lane with 12 required source images.', status: 'yellow' },
  { label: 'Male Models', href: '/eden-source-images/models/male', helper: 'No male manifest rows loaded yet.', status: 'red' },
  { label: 'Faceless Content', href: '/eden-source-images/models/faceless', helper: 'No faceless manifest rows loaded yet.', status: 'red' }
];

export const contentPlan: ContentPlanDay[] = [
  { day: 'Mon', date: '06/15', theme: 'Manifest source lock', channel: 'Drive', deliverable: 'Use repaired source-image manifest as inventory truth', status: 'green' },
  { day: 'Tue', date: '06/16', theme: 'Inventory rebuild', channel: 'Admin', deliverable: 'Show Eden Skye and the 12 required source slots only', status: 'green' },
  { day: 'Wed', date: '06/17', theme: 'Source image matching', channel: 'Image Stack', deliverable: 'Review 3 candidates and source the 9 missing exact slots', status: 'yellow' },
  { day: 'Thu', date: '06/18', theme: 'Approval cleanup', channel: 'Admin', deliverable: 'Move verified items into approval state', status: 'yellow' },
  { day: 'Fri', date: '06/19', theme: 'Video readiness', channel: 'HeyGen', deliverable: 'Use only manifest-approved model assets', status: 'yellow' },
  { day: 'Sat', date: '06/20', theme: 'Automation gate', channel: 'GitHub / Vercel', deliverable: 'Keep PR #8 blocked until matching is clean', status: 'red' },
  { day: 'Sun', date: '06/21', theme: 'Readiness review', channel: 'Metricool / Admin', deliverable: 'Review verified inventory and content plan', status: 'yellow' }
];

export const models: ModelRecord[] = [
  {
    id: 'eden-skye',
    name: 'Eden Skye',
    group: 'female',
    role: 'Primary Eden Skye model from repaired source image manifest',
    stats: 'Age floor 25. 12 required source-image slots. 3 visual candidates, 9 missing exact slots.',
    manifestSlot: repairedManifest.batchId,
    sourceState: 'needs-review',
    sourceImagesNeeded: 12,
    sourceImagesReady: 0
  }
];

export const sourceImageManifest: SourceImageManifestRecord[] = [
  {
    assetId: 'eden-skye-001',
    model: 'Eden Skye',
    manifestSlot: repairedManifest.batchId,
    assetType: 'identity_lock',
    purpose: 'Identity consistency master front portrait',
    outputFilename: 'eden-skye-001_identity-lock_front-portrait_4x5_v1.png',
    qaMinScore: 92,
    qaScore: null,
    approvalColor: 'red',
    approvalStatus: 'Missing exact front portrait source binary',
    driveFileId: null,
    driveFileName: null,
    proposedFilename: null,
    matchStatus: 'unmatched'
  },
  {
    assetId: 'eden-skye-002',
    model: 'Eden Skye',
    manifestSlot: repairedManifest.batchId,
    assetType: 'identity_lock',
    purpose: 'Identity consistency three-quarter portrait',
    outputFilename: 'eden-skye-002_identity-lock_three-quarter_4x5_v1.png',
    qaMinScore: 92,
    qaScore: null,
    approvalColor: 'red',
    approvalStatus: 'Missing exact three-quarter portrait source binary',
    driveFileId: null,
    driveFileName: null,
    proposedFilename: null,
    matchStatus: 'unmatched'
  },
  {
    assetId: 'eden-skye-003',
    model: 'Eden Skye',
    manifestSlot: repairedManifest.batchId,
    assetType: 'identity_lock',
    purpose: 'Identity consistency side profile',
    outputFilename: 'eden-skye-003_identity-lock_side-profile_4x5_v1.png',
    qaMinScore: 92,
    qaScore: null,
    approvalColor: 'red',
    approvalStatus: 'Missing exact side-profile source binary',
    driveFileId: null,
    driveFileName: null,
    proposedFilename: null,
    matchStatus: 'unmatched'
  },
  {
    assetId: 'eden-skye-004',
    model: 'Eden Skye',
    manifestSlot: repairedManifest.batchId,
    assetType: 'portfolio',
    purpose: 'Portfolio black card portrait',
    outputFilename: 'eden-skye-004_portfolio_black-card-portrait_4x5_v1.png',
    qaMinScore: 90,
    qaScore: null,
    approvalColor: 'red',
    approvalStatus: 'Missing black card portrait source binary',
    driveFileId: null,
    driveFileName: null,
    proposedFilename: null,
    matchStatus: 'unmatched'
  },
  {
    assetId: 'eden-skye-005',
    model: 'Eden Skye',
    manifestSlot: repairedManifest.batchId,
    assetType: 'portfolio',
    purpose: 'Portfolio white blazer portrait',
    outputFilename: 'eden-skye-005_portfolio_white-blazer_4x5_v1.png',
    qaMinScore: 90,
    qaScore: 89,
    approvalColor: 'yellow',
    approvalStatus: 'Candidate white-blazer portrait found; needs exact rename, identity QA, and approval before green',
    driveFileId: '1g13eWR3dxnM-I7M8ETAL66RVuPoCqTOt',
    driveFileName: 'ChatGPT Image Jun 11, 2026, 06_02_11 PM (2).png',
    proposedFilename: 'eden-skye-005_portfolio_white-blazer_4x5_v1.png',
    matchStatus: 'candidate'
  },
  {
    assetId: 'eden-skye-006',
    model: 'Eden Skye',
    manifestSlot: repairedManifest.batchId,
    assetType: 'website_hero',
    purpose: 'Website hero black neon stage',
    outputFilename: 'eden-skye-006_website-hero_black-neon-stage_16x9_v1.png',
    qaMinScore: 90,
    qaScore: null,
    approvalColor: 'red',
    approvalStatus: 'Missing black neon stage website hero source binary',
    driveFileId: null,
    driveFileName: null,
    proposedFilename: null,
    matchStatus: 'unmatched'
  },
  {
    assetId: 'eden-skye-007',
    model: 'Eden Skye',
    manifestSlot: repairedManifest.batchId,
    assetType: 'website_hero',
    purpose: 'Website hero neon runway',
    outputFilename: 'eden-skye-007_website-hero_neon-runway_16x9_v1.png',
    qaMinScore: 90,
    qaScore: null,
    approvalColor: 'red',
    approvalStatus: 'Missing neon runway website hero source binary',
    driveFileId: null,
    driveFileName: null,
    proposedFilename: null,
    matchStatus: 'unmatched'
  },
  {
    assetId: 'eden-skye-008',
    model: 'Eden Skye',
    manifestSlot: repairedManifest.batchId,
    assetType: 'wardrobe_safe',
    purpose: 'Wardrobe safe full body black',
    outputFilename: 'eden-skye-008_wardrobe-safe_full-body-black_9x16_v1.png',
    qaMinScore: 94,
    qaScore: 91,
    approvalColor: 'yellow',
    approvalStatus: 'Candidate full-body black wardrobe image found; needs exact rename and QA because current file is a generic ChatGPT title',
    driveFileId: '1MPcVT5lZvst1hWrm7-NssPIwkFpr5giW',
    driveFileName: 'ChatGPT Image Jun 14, 2026, 08_00_59 AM (22).png',
    proposedFilename: 'eden-skye-008_wardrobe-safe_full-body-black_9x16_v1.png',
    matchStatus: 'candidate'
  },
  {
    assetId: 'eden-skye-009',
    model: 'Eden Skye',
    manifestSlot: repairedManifest.batchId,
    assetType: 'background',
    purpose: 'Walk-in closet background',
    outputFilename: 'eden-skye-009_background_walk-in-closet_16x9_v1.png',
    qaMinScore: 88,
    qaScore: 86,
    approvalColor: 'yellow',
    approvalStatus: 'Candidate walk-in closet image found, but it includes Eden in frame; approve only if model-present background is acceptable',
    driveFileId: '1MksJByAVNFfXXKzaUVJy317vTs51iTiV',
    driveFileName: 'ChatGPT Image Jun 14, 2026, 08_00_55 AM (17).png',
    proposedFilename: 'eden-skye-009_background_walk-in-closet_16x9_v1.png',
    matchStatus: 'candidate'
  },
  {
    assetId: 'eden-skye-010',
    model: 'Eden Skye',
    manifestSlot: repairedManifest.batchId,
    assetType: 'social_vertical',
    purpose: 'Social vertical hot pink blazer',
    outputFilename: 'eden-skye-010_social-vertical_hot-pink-blazer_9x16_v1.png',
    qaMinScore: 90,
    qaScore: null,
    approvalColor: 'red',
    approvalStatus: 'Missing hot pink blazer vertical source binary',
    driveFileId: null,
    driveFileName: null,
    proposedFilename: null,
    matchStatus: 'unmatched'
  },
  {
    assetId: 'eden-skye-011',
    model: 'Eden Skye',
    manifestSlot: repairedManifest.batchId,
    assetType: 'heygen_headshot',
    purpose: 'HeyGen headshot dark studio',
    outputFilename: 'eden-skye-011_heygen-headshot_dark-studio_1x1_v1.png',
    qaMinScore: 95,
    qaScore: null,
    approvalColor: 'red',
    approvalStatus: 'Missing strict HeyGen dark-studio 1:1 headshot source binary',
    driveFileId: null,
    driveFileName: null,
    proposedFilename: null,
    matchStatus: 'unmatched'
  },
  {
    assetId: 'eden-skye-012',
    model: 'Eden Skye',
    manifestSlot: repairedManifest.batchId,
    assetType: 'heygen_half_body',
    purpose: 'HeyGen half-body white blazer',
    outputFilename: 'eden-skye-012_heygen-half-body_white-blazer_9x16_v1.png',
    qaMinScore: 95,
    qaScore: null,
    approvalColor: 'red',
    approvalStatus: 'Missing strict HeyGen half-body white blazer source binary',
    driveFileId: null,
    driveFileName: null,
    proposedFilename: null,
    matchStatus: 'unmatched'
  }
];

export const groupLabels: Record<ModelGroup, string> = {
  female: 'Female Models',
  male: 'Male Models',
  faceless: 'Faceless Content'
};

export function modelSummary() {
  const total = models.length;
  const ready = models.filter((model) => model.sourceState === 'ready').length;
  const needsReview = models.filter((model) => model.sourceState === 'needs-review').length;
  const missing = models.filter((model) => model.sourceState === 'missing').length;
  const sourceImagesNeeded = models.reduce((sum, model) => sum + model.sourceImagesNeeded, 0);
  const sourceImagesReady = models.reduce((sum, model) => sum + model.sourceImagesReady, 0);
  return { total, ready, needsReview, missing, sourceImagesNeeded, sourceImagesReady };
}

export function sourceManifestSummary() {
  const total = sourceImageManifest.length;
  const matched = sourceImageManifest.filter((record) => record.matchStatus === 'matched').length;
  const candidates = sourceImageManifest.filter((record) => record.matchStatus === 'candidate').length;
  const missing = sourceImageManifest.filter((record) => record.matchStatus === 'unmatched').length;
  const needsReview = sourceImageManifest.filter((record) => record.approvalColor !== 'green').length;
  const requiredQaFloor = Math.min(...sourceImageManifest.map((record) => record.qaMinScore));
  return { total, matched, candidates, missing, needsReview, requiredQaFloor };
}
