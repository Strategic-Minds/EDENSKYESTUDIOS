import { NextResponse } from 'next/server';

const rootFolderId = '1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ';
const tempImagesFolderId = '1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE';
const approvalFolderId = '1EMnjZKTBT4wlO0ZgR5F6tXDKV1dvK76x';
const manifestFileId = '1aQmG63GyarR8XsS14u6-Sn_yG64vtnXI';
const batchQueueFileId = '1aH52Mk3xbLvLKvQ2cEGiJYRcxqGeydjB';

type ApprovalColor = 'green' | 'yellow' | 'red';
type ReviewFolder = 'Drafts' | 'Needs Review' | 'Approved' | 'Rejected' | 'Drive Ready';

type ManifestSlot = {
  assetId: string;
  outputFilename: string;
  purpose: string;
  shotType: string;
  aspectRatio: string;
  crop: string;
  wardrobe: string;
  platformTarget: string;
  qaMinScore: number;
};

type DriveAsset = {
  driveFileId: string;
  filename: string;
  manifestSlot: string;
  targetFilename: string;
  qaScore: number;
  qaMinScore: number;
  approvalColor: ApprovalColor;
  approvalStatus: string;
  reviewFolder: ReviewFolder;
  matchConfidence: 'provisional' | 'unmatched';
  matchMethod: string;
  note: string;
};

const manifestSlots: ManifestSlot[] = [
  { assetId: 'eden-skye-001', outputFilename: 'eden-skye-001_identity-lock_front-portrait_4x5_v1.png', purpose: 'Identity consistency master front portrait', shotType: 'front portrait', aspectRatio: '4:5', crop: 'bust', wardrobe: 'black luxury blazer', platformTarget: 'identity lock', qaMinScore: 92 },
  { assetId: 'eden-skye-002', outputFilename: 'eden-skye-002_identity-lock_three-quarter_4x5_v1.png', purpose: 'Identity consistency three-quarter portrait', shotType: 'three-quarter portrait', aspectRatio: '4:5', crop: 'bust', wardrobe: 'black satin top', platformTarget: 'identity lock', qaMinScore: 92 },
  { assetId: 'eden-skye-003', outputFilename: 'eden-skye-003_identity-lock_side-profile_4x5_v1.png', purpose: 'Identity consistency side profile', shotType: 'side profile', aspectRatio: '4:5', crop: 'bust', wardrobe: 'white tailored shirt', platformTarget: 'identity lock', qaMinScore: 92 },
  { assetId: 'eden-skye-004', outputFilename: 'eden-skye-004_portfolio_black-card-portrait_4x5_v1.png', purpose: 'Model portfolio black card portrait', shotType: 'portfolio portrait', aspectRatio: '4:5', crop: 'waist-up', wardrobe: 'black evening dress', platformTarget: 'models page', qaMinScore: 90 },
  { assetId: 'eden-skye-005', outputFilename: 'eden-skye-005_portfolio_white-blazer_4x5_v1.png', purpose: 'Model portfolio white look portrait', shotType: 'portfolio portrait', aspectRatio: '4:5', crop: 'waist-up', wardrobe: 'white structured blazer', platformTarget: 'models page', qaMinScore: 90 },
  { assetId: 'eden-skye-006', outputFilename: 'eden-skye-006_website-hero_black-neon-stage_16x9_v1.png', purpose: 'Homepage hero model image', shotType: 'website hero', aspectRatio: '16:9', crop: 'full body', wardrobe: 'black couture gown', platformTarget: 'home hero', qaMinScore: 90 },
  { assetId: 'eden-skye-007', outputFilename: 'eden-skye-007_website-hero_neon-runway_16x9_v1.png', purpose: 'Models page hero image', shotType: 'website hero', aspectRatio: '16:9', crop: 'three-quarter body', wardrobe: 'black leather jacket and tailored pants', platformTarget: 'models page hero', qaMinScore: 90 },
  { assetId: 'eden-skye-008', outputFilename: 'eden-skye-008_wardrobe-safe_full-body-black_9x16_v1.png', purpose: 'Closet full body wardrobe-safe model', shotType: 'full body wardrobe safe', aspectRatio: '9:16', crop: 'full body', wardrobe: 'black fitted bodysuit with opaque coverage', platformTarget: 'closet viewer', qaMinScore: 94 },
  { assetId: 'eden-skye-009', outputFilename: 'eden-skye-009_background_walk-in-closet_16x9_v1.png', purpose: 'Closet environment walk-in closet', shotType: 'environment plate', aspectRatio: '16:9', crop: 'room only', wardrobe: 'no model', platformTarget: 'closet environment', qaMinScore: 88 },
  { assetId: 'eden-skye-010', outputFilename: 'eden-skye-010_social-vertical_hot-pink-blazer_9x16_v1.png', purpose: 'Social reel portrait', shotType: 'social vertical', aspectRatio: '9:16', crop: 'knee-up', wardrobe: 'hot pink blazer over black look', platformTarget: 'instagram reels', qaMinScore: 90 },
  { assetId: 'eden-skye-011', outputFilename: 'eden-skye-011_heygen-headshot_dark-studio_1x1_v1.png', purpose: 'HeyGen avatar headshot source', shotType: 'heygen headshot', aspectRatio: '1:1', crop: 'head and shoulders', wardrobe: 'black blazer', platformTarget: 'heygen draft', qaMinScore: 95 },
  { assetId: 'eden-skye-012', outputFilename: 'eden-skye-012_heygen-half-body_white-blazer_9x16_v1.png', purpose: 'HeyGen half body presenter source', shotType: 'heygen half body', aspectRatio: '9:16', crop: 'half body', wardrobe: 'white blazer over black top', platformTarget: 'heygen draft', qaMinScore: 95 }
];

const tempImages = [
  ['120IqkAl-Dlx8PhpO8dpmJa7ZQ1OKqx6r', 'ChatGPT Image Jun 11, 2026, 07_49_04 PM (19).png'],
  ['1ASCx3yiWTpEDligCX2yXveZTjm0hI8AP', 'ChatGPT Image Jun 11, 2026, 07_49_03 PM (16).png'],
  ['1PSus_DUdH4fLhfq1-oKXVNzieQ9ld-HA', 'ChatGPT Image Jun 11, 2026, 07_49_04 PM (18).png'],
  ['1Q0sS7aYzApqCnXbSrRpaS_OG3YbXstqM', 'ChatGPT Image Jun 11, 2026, 07_49_04 PM (17).png'],
  ['1Kb3cQKRUqieEorIsmSLgBbyam2bIPLen', 'ChatGPT Image Jun 11, 2026, 07_49_02 PM (14).png'],
  ['1AcLtEDH_8AkFEbCyzSXzD0Z6UwMF4A_a', 'ChatGPT Image Jun 11, 2026, 07_49_03 PM (15).png'],
  ['1SpPa8CmVIiLIbZ_iy9epIxEdAnNIaAxC', 'ChatGPT Image Jun 11, 2026, 07_49_01 PM (11).png'],
  ['10qOF1MTTUHCfWIee0VnP9WrvV_4gofJ8', 'ChatGPT Image Jun 11, 2026, 07_49_02 PM (13).png'],
  ['1LABcSceQhdU5yPAjr9oUFAPO8v9TGTX4', 'ChatGPT Image Jun 11, 2026, 07_49_01 PM (12).png'],
  ['1_-_5E6eIsFLhxM8leKGuFEvzktER9Wal', 'ChatGPT Image Jun 11, 2026, 07_49_01 PM (10).png'],
  ['1woZkdPUgn4_Q7XSkHBo5i9NMK_lRZWUi', 'ChatGPT Image Jun 11, 2026, 07_49_00 PM (9).png'],
  ['1Yvj7fKCvzfoLLAs42N-oGVFdr1jiZwPR', 'ChatGPT Image Jun 11, 2026, 07_49_00 PM (8).png'],
  ['1rdzX5781tRS6CEmLndwKRiXgGGICFqXH', 'ChatGPT Image Jun 11, 2026, 07_48_59 PM (7).png'],
  ['17_0epBsf-Gg9uOrCPozmDya-3UNT-822', 'ChatGPT Image Jun 11, 2026, 07_48_59 PM (6).png'],
  ['1LW5LbUbsHZE6N0sNkJNRQuYb2tXFNbUj', 'ChatGPT Image Jun 11, 2026, 07_48_58 PM (4).png'],
  ['103iC1rhks5X-2lSEA_wXweOSKdDK7jnB', 'ChatGPT Image Jun 11, 2026, 07_48_59 PM (5).png'],
  ['1JCoQ5tL0vXWOOltX4QS_84LgXMdEYoxL', 'ChatGPT Image Jun 11, 2026, 07_48_57 PM (2).png'],
  ['1OK9QF1CAzNY47AhooD5PH6e25TSpPkOw', 'ChatGPT Image Jun 11, 2026, 07_48_58 PM (3).png'],
  ['1mlnvwRkVNnqG3DRpWxKt1D_h_FhxUqcS', 'ChatGPT Image Jun 11, 2026, 07_48_57 PM (1).png'],
  ['1P-A0x5ErXZ_okyhJZwwSzBrULqbMlRNd', 'ChatGPT Image Jun 11, 2026, 06_02_14 PM (6).png'],
  ['18GS8LFWRKhjyuRVMuDLl8BeL6nx7TQhC', 'ChatGPT Image Jun 11, 2026, 06_02_14 PM (6).png'],
  ['1Zlf-oLcAkkxvYxWjiRV92Fd49zvfjaCD', 'ChatGPT Image Jun 11, 2026, 06_02_14 PM (7).png'],
  ['1bk1cInidAfImRFP-W1P3FMbhw2WI2xvN', 'ChatGPT Image Jun 11, 2026, 06_02_14 PM (7).png'],
  ['1viyaMfJzPBu1uuFyj00TcpiQiglGlBEf', 'ChatGPT Image Jun 11, 2026, 06_02_13 PM (5).png'],
  ['1R94t-DQ3ZKXOMSz0UT4vc1l4BJ5b3qX5', 'ChatGPT Image Jun 11, 2026, 06_02_13 PM (5).png'],
  ['1NLMJQgVKVozT1nfzQhsHs5gDvl_qz6BB', 'ChatGPT Image Jun 11, 2026, 06_02_13 PM (4).png'],
  ['1tcd07Zq1b5HVjMDuG-JJrU6D6o-vF8mR', 'ChatGPT Image Jun 11, 2026, 06_02_12 PM (3).png'],
  ['1WqJ_jeuK9MkofDSMdW-TfIY6Zee2fDe4', 'ChatGPT Image Jun 11, 2026, 06_02_13 PM (4).png'],
  ['1Cp9wtJuAMJOKKeoTwcc8GA48kbOuRL87', 'ChatGPT Image Jun 11, 2026, 06_02_12 PM (3).png'],
  ['1GDtMs73pIA8tJQvX4U0XuWIuJvMR57KV', 'ChatGPT Image Jun 11, 2026, 06_02_11 PM (1).png'],
  ['1o0EtFckI49399BPI3nzmOLmCjyGwpvmc', 'ChatGPT Image Jun 11, 2026, 06_02_11 PM (2).png'],
  ['1g13eWR3dxnM-I7M8ETAL66RVuPoCqTOt', 'ChatGPT Image Jun 11, 2026, 06_02_11 PM (2).png'],
  ['1bKr5iODlaUPZuiJVCv4Ui8pnMvsy77wi', 'ChatGPT Image Jun 11, 2026, 06_02_11 PM (1).png'],
  ['1DPAu7lQ1xqVCqjCMvOTFy8DkbffjZgyI', 'ChatGPT Image Jun 11, 2026, 06_00_51 PM.png'],
  ['1aeHRC3vNUdXe3r8H23javAORUri_Ip5f', 'ChatGPT Image Jun 11, 2026, 06_00_44 PM.png'],
  ['1Nx8pw8zuGD1TH4uBIAVytbAG6n2atcSU', 'ChatGPT Image Jun 11, 2026, 06_00_37 PM.png'],
  ['14nUdAOxf9jICkYOU_6m0NQxlwk2P0jYs', 'ChatGPT Image Jun 11, 2026, 06_00_28 PM.png'],
  ['1UoMYVKEELPJ_u03kt__T0LVny6_jYCfb', 'ChatGPT Image Jun 11, 2026, 06_00_19 PM.png'],
  ['1qFnjzBw2q5OVuqSIgZnegkd-djxJXWRT', 'ChatGPT Image Jun 11, 2026, 06_00_08 PM.png'],
  ['1IsB8lfSGDC9RhEKKEwKuBpHE139R7bsW', 'ChatGPT Image Jun 11, 2026, 06_00_00 PM.png']
] as const;

const provisionalScores = [74, 73, 72, 76, 75, 78, 77, 71, 70, 76, 74, 73];

const assets: DriveAsset[] = tempImages.map(([driveFileId, filename], index) => {
  const slot = manifestSlots[index];
  if (slot) {
    return {
      driveFileId,
      filename,
      manifestSlot: slot.assetId,
      targetFilename: slot.outputFilename,
      qaScore: provisionalScores[index],
      qaMinScore: slot.qaMinScore,
      approvalColor: 'yellow',
      approvalStatus: 'Needs visual QA and filename confirmation',
      reviewFolder: 'Needs Review',
      matchConfidence: 'provisional',
      matchMethod: 'TEMP IMAGES order mapped to ES-IMG-2026-06-12-001 priority order',
      note: `${slot.purpose}. Provisional only: Drive filename does not equal manifest output filename.`
    };
  }

  return {
    driveFileId,
    filename,
    manifestSlot: 'unassigned-temp-image',
    targetFilename: 'Not matched yet',
    qaScore: 0,
    qaMinScore: 90,
    approvalColor: 'yellow',
    approvalStatus: 'Unmatched temp image',
    reviewFolder: 'Drafts',
    matchConfidence: 'unmatched',
    matchMethod: 'awaiting manual manifest classification',
    note: 'Available in TEMP IMAGES pool. Needs manifest slot assignment before approval.'
  };
});

export function GET() {
  return NextResponse.json({
    generatedAt: '2026-06-14T11:25:00Z',
    governance: {
      rootFolderId,
      tempImagesFolderId,
      approvalFolderId,
      manifestFileId,
      batchQueueFileId,
      pr8Promotion: 'blocked_until_manifest_matching_is_clean',
      liveMutation: 'blocked_without_verified_approval'
    },
    legend: {
      green: 'Verified or admin-approved',
      yellow: 'Needs QA, manifest matching, or approval',
      red: 'Blocked, rejected, unsafe, or failed manifest requirements'
    },
    summary: {
      totalTempImages: assets.length,
      manifestSlots: manifestSlots.length,
      provisionalMatches: assets.filter((asset) => asset.matchConfidence === 'provisional').length,
      cleanMatches: 0,
      unmatched: assets.filter((asset) => asset.matchConfidence === 'unmatched').length,
      readyForPr8Promotion: false
    },
    manifestSlots,
    assets: assets.map((asset) => ({
      ...asset,
      driveUrl: `https://drive.google.com/file/d/${asset.driveFileId}/view`,
      thumbnailUrl: `https://drive.google.com/thumbnail?id=${asset.driveFileId}&sz=w1200`
    }))
  });
}
