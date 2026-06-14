export type ApprovedFacelessAccount = {
  rank: number;
  concept: string;
  boardTheme: string;
  platformFit: string;
  monetizationPath: string;
  riskLevel: 'Low-Medium' | 'Medium' | 'Medium-High';
  sourceFileName: string;
  sourceFileId: string;
  status: 'approved-source' | 'source-verified' | 'asset-pending';
};

export const approvedFacelessSourceBatch = {
  title: 'Faceless Social Source Pack',
  rootFolderId: '1HFLOuRB65gjmLCiBp0Jhft5cw2xSZ6fQ',
  packFolderId: '1zGFnq-DP_1B8izE-LTRlOIRQw8Y-gYs5',
  masterIndexFileId: '1gbQlenqs7mFAS3kabKIAC46Wxhr7SHgz',
  verificationFileId: '1PuB0JVZWtpGNErOnbJ4DeEzvG52rjUwh',
  count: 5,
  created: '2026-06-14',
  approvalStatus: 'operator-approved',
  operatingNote: '30-day proof loop. No live publishing, billing, paid ads, or lead collection without approval.',
  validationThreshold: '1 sale, 10 leads, 50 clicks, or 1,000 views.',
  sourceStatus: 'Five faceless account source docs are verified from Drive and operator-approved for workflow buildout. Visual brand kits, account handles, platform accounts, and publishing permissions remain separate activation steps.'
};

export const approvedFacelessAccounts: ApprovedFacelessAccount[] = [
  {
    rank: 1,
    concept: 'AI Future Lab',
    boardTheme: 'AI Future',
    platformFit: 'YouTube Shorts, TikTok, Instagram Reels, LinkedIn',
    monetizationPath: 'AI tool affiliate, workflow templates, setup service',
    riskLevel: 'Medium',
    sourceFileName: '01_AI_FUTURE_LAB.source.md',
    sourceFileId: '1e6ZzCu9i7OtLgP4v8e-5x2sz9H1jloxy',
    status: 'approved-source'
  },
  {
    rank: 2,
    concept: 'Business Breakdowns Daily',
    boardTheme: 'Business Breakdowns',
    platformFit: 'YouTube, Shorts, LinkedIn, Instagram Reels',
    monetizationPath: 'Business research pack, newsletter, sponsorship, consulting leads',
    riskLevel: 'Low-Medium',
    sourceFileName: '02_BUSINESS_BREAKDOWNS_DAILY.source.md',
    sourceFileId: '17kg44wzmkBCIOcU2DEJXS9wHsKoFlJ0V',
    status: 'approved-source'
  },
  {
    rank: 3,
    concept: 'Hidden Wealth Files',
    boardTheme: 'Hidden Wealth',
    platformFit: 'Instagram Reels, TikTok, YouTube Shorts, Pinterest',
    monetizationPath: 'Wealth checklist, digital workbook, affiliate stack, setup service',
    riskLevel: 'Medium',
    sourceFileName: '03_HIDDEN_WEALTH_FILES.source.md',
    sourceFileId: '1ZcBsQKteyPm2I5ACWq7-GiSYAB9U956P',
    status: 'approved-source'
  },
  {
    rank: 4,
    concept: 'Billionaire Habits Blueprint',
    boardTheme: 'Billionaire Habits',
    platformFit: 'Instagram Reels, TikTok, YouTube Shorts',
    monetizationPath: 'Habit templates, productivity packs, coaching/setup offer',
    riskLevel: 'Low-Medium',
    sourceFileName: '04_BILLIONAIRE_HABITS_BLUEPRINT.source.md',
    sourceFileId: '1Le7gRPs1VCRBGTJKKIaA6NpxGvHNUbSQ',
    status: 'approved-source'
  },
  {
    rank: 5,
    concept: 'Psychology Defense Lab',
    boardTheme: 'Dark Psychology',
    platformFit: 'TikTok, Instagram Reels, YouTube Shorts',
    monetizationPath: 'Ethical persuasion guide, self-defense checklist, course funnel',
    riskLevel: 'Medium-High',
    sourceFileName: '05_PSYCHOLOGY_DEFENSE_LAB.source.md',
    sourceFileId: '1VMPQcD91Hl-Sw-iHg9i39SbkduUGqi1k',
    status: 'approved-source'
  }
];
