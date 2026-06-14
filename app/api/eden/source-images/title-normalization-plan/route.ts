import { NextResponse } from 'next/server';

const tempImagesFolderId = '1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE';
const approvalFolderId = '1EMnjZKTBT4wlO0ZgR5F6tXDKV1dvK76x';

type ManifestSlot = { assetId: string; proposedTitle: string; category: string; approvalFolder: string };
type TempImage = { driveFileId: string; oldTitle: string };

const manifestSlots: ManifestSlot[] = [
  { assetId: 'eden-skye-001', proposedTitle: 'eden-skye-001_identity-lock_front-portrait_4x5_v1.png', category: 'identity-lock', approvalFolder: 'Needs Review' },
  { assetId: 'eden-skye-002', proposedTitle: 'eden-skye-002_identity-lock_three-quarter_4x5_v1.png', category: 'identity-lock', approvalFolder: 'Needs Review' },
  { assetId: 'eden-skye-003', proposedTitle: 'eden-skye-003_identity-lock_side-profile_4x5_v1.png', category: 'identity-lock', approvalFolder: 'Needs Review' },
  { assetId: 'eden-skye-004', proposedTitle: 'eden-skye-004_portfolio_black-card-portrait_4x5_v1.png', category: 'portfolio-portrait', approvalFolder: 'Needs Review' },
  { assetId: 'eden-skye-005', proposedTitle: 'eden-skye-005_portfolio_white-blazer_4x5_v1.png', category: 'portfolio-portrait', approvalFolder: 'Needs Review' },
  { assetId: 'eden-skye-006', proposedTitle: 'eden-skye-006_website-hero_black-neon-stage_16x9_v1.png', category: 'website-hero', approvalFolder: 'Needs Review' },
  { assetId: 'eden-skye-007', proposedTitle: 'eden-skye-007_website-hero_neon-runway_16x9_v1.png', category: 'website-hero', approvalFolder: 'Needs Review' },
  { assetId: 'eden-skye-008', proposedTitle: 'eden-skye-008_wardrobe-safe_full-body-black_9x16_v1.png', category: 'wardrobe-safe', approvalFolder: 'Needs Review' },
  { assetId: 'eden-skye-009', proposedTitle: 'eden-skye-009_background_walk-in-closet_16x9_v1.png', category: 'closet-background', approvalFolder: 'Needs Review' },
  { assetId: 'eden-skye-010', proposedTitle: 'eden-skye-010_social-vertical_hot-pink-blazer_9x16_v1.png', category: 'social-vertical', approvalFolder: 'Needs Review' },
  { assetId: 'eden-skye-011', proposedTitle: 'eden-skye-011_heygen-headshot_dark-studio_1x1_v1.png', category: 'heygen-source', approvalFolder: 'Needs Review' },
  { assetId: 'eden-skye-012', proposedTitle: 'eden-skye-012_heygen-half-body_white-blazer_9x16_v1.png', category: 'heygen-source', approvalFolder: 'Needs Review' }
];

const tempImages: TempImage[] = [
  { driveFileId: '120IqkAl-Dlx8PhpO8dpmJa7ZQ1OKqx6r', oldTitle: 'ChatGPT Image Jun 11, 2026, 07_49_04 PM (19).png' },
  { driveFileId: '1ASCx3yiWTpEDligCX2yXveZTjm0hI8AP', oldTitle: 'ChatGPT Image Jun 11, 2026, 07_49_03 PM (16).png' },
  { driveFileId: '1PSus_DUdH4fLhfq1-oKXVNzieQ9ld-HA', oldTitle: 'ChatGPT Image Jun 11, 2026, 07_49_04 PM (18).png' },
  { driveFileId: '1Q0sS7aYzApqCnXbSrRpaS_OG3YbXstqM', oldTitle: 'ChatGPT Image Jun 11, 2026, 07_49_04 PM (17).png' },
  { driveFileId: '1Kb3cQKRUqieEorIsmSLgBbyam2bIPLen', oldTitle: 'ChatGPT Image Jun 11, 2026, 07_49_02 PM (14).png' },
  { driveFileId: '1AcLtEDH_8AkFEbCyzSXzD0Z6UwMF4A_a', oldTitle: 'ChatGPT Image Jun 11, 2026, 07_49_03 PM (15).png' },
  { driveFileId: '1SpPa8CmVIiLIbZ_iy9epIxEdAnNIaAxC', oldTitle: 'ChatGPT Image Jun 11, 2026, 07_49_01 PM (11).png' },
  { driveFileId: '10qOF1MTTUHCfWIee0VnP9WrvV_4gofJ8', oldTitle: 'ChatGPT Image Jun 11, 2026, 07_49_02 PM (13).png' },
  { driveFileId: '1LABcSceQhdU5yPAjr9oUFAPO8v9TGTX4', oldTitle: 'ChatGPT Image Jun 11, 2026, 07_49_01 PM (12).png' },
  { driveFileId: '1_-_5E6eIsFLhxM8leKGuFEvzktER9Wal', oldTitle: 'ChatGPT Image Jun 11, 2026, 07_49_01 PM (10).png' },
  { driveFileId: '1woZkdPUgn4_Q7XSkHBo5i9NMK_lRZWUi', oldTitle: 'ChatGPT Image Jun 11, 2026, 07_49_00 PM (9).png' },
  { driveFileId: '1Yvj7fKCvzfoLLAs42N-oGVFdr1jiZwPR', oldTitle: 'ChatGPT Image Jun 11, 2026, 07_49_00 PM (8).png' },
  { driveFileId: '1rdzX5781tRS6CEmLndwKRiXgGGICFqXH', oldTitle: 'ChatGPT Image Jun 11, 2026, 07_48_59 PM (7).png' },
  { driveFileId: '17_0epBsf-Gg9uOrCPozmDya-3UNT-822', oldTitle: 'ChatGPT Image Jun 11, 2026, 07_48_59 PM (6).png' },
  { driveFileId: '1LW5LbUbsHZE6N0sNkJNRQuYb2tXFNbUj', oldTitle: 'ChatGPT Image Jun 11, 2026, 07_48_58 PM (4).png' },
  { driveFileId: '103iC1rhks5X-2lSEA_wXweOSKdDK7jnB', oldTitle: 'ChatGPT Image Jun 11, 2026, 07_48_59 PM (5).png' },
  { driveFileId: '1JCoQ5tL0vXWOOltX4QS_84LgXMdEYoxL', oldTitle: 'ChatGPT Image Jun 11, 2026, 07_48_57 PM (2).png' },
  { driveFileId: '1OK9QF1CAzNY47AhooD5PH6e25TSpPkOw', oldTitle: 'ChatGPT Image Jun 11, 2026, 07_48_58 PM (3).png' },
  { driveFileId: '1mlnvwRkVNnqG3DRpWxKt1D_h_FhxUqcS', oldTitle: 'ChatGPT Image Jun 11, 2026, 07_48_57 PM (1).png' },
  { driveFileId: '1P-A0x5ErXZ_okyhJZwwSzBrULqbMlRNd', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_02_14 PM (6).png' },
  { driveFileId: '18GS8LFWRKhjyuRVMuDLl8BeL6nx7TQhC', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_02_14 PM (6).png' },
  { driveFileId: '1Zlf-oLcAkkxvYxWjiRV92Fd49zvfjaCD', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_02_14 PM (7).png' },
  { driveFileId: '1bk1cInidAfImRFP-W1P3FMbhw2WI2xvN', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_02_14 PM (7).png' },
  { driveFileId: '1viyaMfJzPBu1uuFyj00TcpiQiglGlBEf', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_02_13 PM (5).png' },
  { driveFileId: '1R94t-DQ3ZKXOMSz0UT4vc1l4BJ5b3qX5', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_02_13 PM (5).png' },
  { driveFileId: '1NLMJQgVKVozT1nfzQhsHs5gDvl_qz6BB', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_02_13 PM (4).png' },
  { driveFileId: '1tcd07Zq1b5HVjMDuG-JJrU6D6o-vF8mR', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_02_12 PM (3).png' },
  { driveFileId: '1WqJ_jeuK9MkofDSMdW-TfIY6Zee2fDe4', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_02_13 PM (4).png' },
  { driveFileId: '1Cp9wtJuAMJOKKeoTwcc8GA48kbOuRL87', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_02_12 PM (3).png' },
  { driveFileId: '1GDtMs73pIA8tJQvX4U0XuWIuJvMR57KV', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_02_11 PM (1).png' },
  { driveFileId: '1o0EtFckI49399BPI3nzmOLmCjyGwpvmc', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_02_11 PM (2).png' },
  { driveFileId: '1g13eWR3dxnM-I7M8ETAL66RVuPoCqTOt', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_02_11 PM (2).png' },
  { driveFileId: '1bKr5iODlaUPZuiJVCv4Ui8pnMvsy77wi', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_02_11 PM (1).png' },
  { driveFileId: '1DPAu7lQ1xqVCqjCMvOTFy8DkbffjZgyI', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_00_51 PM.png' },
  { driveFileId: '1aeHRC3vNUdXe3r8H23javAORUri_Ip5f', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_00_44 PM.png' },
  { driveFileId: '1Nx8pw8zuGD1TH4uBIAVytbAG6n2atcSU', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_00_37 PM.png' },
  { driveFileId: '14nUdAOxf9jICkYOU_6m0NQxlwk2P0jYs', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_00_28 PM.png' },
  { driveFileId: '1UoMYVKEELPJ_u03kt__T0LVny6_jYCfb', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_00_19 PM.png' },
  { driveFileId: '1qFnjzBw2q5OVuqSIgZnegkd-djxJXWRT', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_00_08 PM.png' },
  { driveFileId: '1IsB8lfSGDC9RhEKKEwKuBpHE139R7bsW', oldTitle: 'ChatGPT Image Jun 11, 2026, 06_00_00 PM.png' }
];

function suggestedUnmatchedTitle(index: number) {
  const sequence = String(index + 1).padStart(3, '0');
  if (index < 19) return `eden-skye-temp-${sequence}_reference-review_7-49-batch_v1.png`;
  if (index < 33) return `eden-skye-temp-${sequence}_source-review_6-02-batch_v1.png`;
  return `eden-skye-temp-${sequence}_manifest-board-source_6-00-batch_v1.png`;
}

const actions = tempImages.map((image, index) => {
  const slot = manifestSlots[index];
  const proposedTitle = slot?.proposedTitle || suggestedUnmatchedTitle(index);
  return {
    driveFileId: image.driveFileId,
    oldTitle: image.oldTitle,
    proposedTitle,
    manifestSlot: slot?.assetId || 'unassigned-temp-image',
    category: slot?.category || 'unassigned-reference',
    approvalFolder: slot?.approvalFolder || 'Drafts',
    approvalColor: 'yellow',
    renameRequired: image.oldTitle !== proposedTitle,
    status: slot ? 'proposed_manifest_title_needs_visual_qa' : 'proposed_temp_title_needs_classification',
    liveRenameAllowed: false,
    driveUrl: `https://drive.google.com/file/d/${image.driveFileId}/view`,
    thumbnailUrl: `https://drive.google.com/thumbnail?id=${image.driveFileId}&sz=w1200`
  };
});

export function GET() {
  return NextResponse.json({
    generatedAt: '2026-06-14T11:58:00Z',
    governance: {
      tempImagesFolderId,
      approvalFolderId,
      liveDriveRename: 'blocked_until_explicit_rename_approval_and_receipt_logging',
      pr8Promotion: 'blocked_until_clean_manifest_matching'
    },
    summary: {
      totalImages: actions.length,
      manifestTitleProposals: manifestSlots.length,
      tempTitleProposals: actions.length - manifestSlots.length,
      renameRequired: actions.filter((action) => action.renameRequired).length,
      cleanMatches: 0
    },
    actions
  });
}
