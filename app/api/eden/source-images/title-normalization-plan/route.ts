import { NextResponse } from 'next/server';

const tempImagesFolderId = '1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE';
const approvalFolderId = '1EMnjZKTBT4wlO0ZgR5F6tXDKV1dvK76x';

const manifestSlots = [
  ['eden-skye-001', 'eden-skye-001_identity-lock_front-portrait_4x5_v1.png', 'identity-lock', 'Needs Review'],
  ['eden-skye-002', 'eden-skye-002_identity-lock_three-quarter_4x5_v1.png', 'identity-lock', 'Needs Review'],
  ['eden-skye-003', 'eden-skye-003_identity-lock_side-profile_4x5_v1.png', 'identity-lock', 'Needs Review'],
  ['eden-skye-004', 'eden-skye-004_portfolio_black-card-portrait_4x5_v1.png', 'portfolio-portrait', 'Needs Review'],
  ['eden-skye-005', 'eden-skye-005_portfolio_white-blazer_4x5_v1.png', 'portfolio-portrait', 'Needs Review'],
  ['eden-skye-006', 'eden-skye-006_website-hero_black-neon-stage_16x9_v1.png', 'website-hero', 'Needs Review'],
  ['eden-skye-007', 'eden-skye-007_website-hero_neon-runway_16x9_v1.png', 'website-hero', 'Needs Review'],
  ['eden-skye-008', 'eden-skye-008_wardrobe-safe_full-body-black_9x16_v1.png', 'wardrobe-safe', 'Needs Review'],
  ['eden-skye-009', 'eden-skye-009_background_walk-in-closet_16x9_v1.png', 'closet-background', 'Needs Review'],
  ['eden-skye-010', 'eden-skye-010_social-vertical_hot-pink-blazer_9x16_v1.png', 'social-vertical', 'Needs Review'],
  ['eden-skye-011', 'eden-skye-011_heygen-headshot_dark-studio_1x1_v1.png', 'heygen-source', 'Needs Review'],
  ['eden-skye-012', 'eden-skye-012_heygen-half-body_white-blazer_9x16_v1.png', 'heygen-source', 'Needs Review']
] as const;

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

function suggestedUnmatchedTitle(index: number) {
  const sequence = String(index + 1).padStart(3, '0');
  if (index < 19) return `eden-skye-temp-${sequence}_reference-review_7-49-batch_v1.png`;
  if (index < 33) return `eden-skye-temp-${sequence}_source-review_6-02-batch_v1.png`;
  return `eden-skye-temp-${sequence}_manifest-board-source_6-00-batch_v1.png`;
}

const actions = tempImages.map(([driveFileId, oldTitle], index) => {
  const slot = manifestSlots[index];
  const proposedTitle = slot?.[1] || suggestedUnmatchedTitle(index);
  const category = slot?.[2] || 'unassigned-reference';
  const manifestSlot = slot?.[0] || 'unassigned-temp-image';
  return {
    driveFileId,
    oldTitle,
    proposedTitle,
    manifestSlot,
    category,
    approvalFolder: slot?.[3] || 'Drafts',
    approvalColor: 'yellow',
    renameRequired: oldTitle !== proposedTitle,
    status: slot ? 'proposed_manifest_title_needs_visual_qa' : 'proposed_temp_title_needs_classification',
    liveRenameAllowed: false,
    driveUrl: `https://drive.google.com/file/d/${driveFileId}/view`,
    thumbnailUrl: `https://drive.google.com/thumbnail?id=${driveFileId}&sz=w1200`
  };
});

export function GET() {
  return NextResponse.json({
    generatedAt: '2026-06-14T11:55:00Z',
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
