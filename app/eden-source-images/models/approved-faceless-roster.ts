export type FacelessBrandKit = {
  primaryColor: string;
  accentColor: string;
  visualStyle: string;
  contentPillars: string[];
  assetNeeds: string[];
};

export type FacelessCalendarItem = {
  day: number;
  theme: string;
  format: string;
  hook: string;
  cta: string;
};

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
  brandKit: FacelessBrandKit;
  contentCalendar: FacelessCalendarItem[];
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
  planningStatus: 'Brand kits and starter content calendars are staged for admin planning only. Publishing remains approval-gated.',
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
    status: 'approved-source',
    brandKit: {
      primaryColor: '#0B0F19',
      accentColor: '#38BDF8',
      visualStyle: 'black glass dashboard, neon blue signal lines, clean AI lab overlays',
      contentPillars: ['AI tools', 'automation workflows', 'agent demos', 'founder productivity'],
      assetNeeds: ['tool demo b-roll', 'workflow diagrams', 'AI dashboard screenshots', 'short captions pack']
    },
    contentCalendar: [
      { day: 1, theme: 'Tool discovery', format: 'Short', hook: 'Three AI tools I would use before hiring another assistant.', cta: 'Comment AI for the workflow list.' },
      { day: 2, theme: 'Workflow build', format: 'Carousel', hook: 'The 5-step AI workflow that removes manual admin work.', cta: 'Save this before your next build.' },
      { day: 3, theme: 'Agent demo', format: 'Short', hook: 'Watch an AI agent turn a messy idea into a launch checklist.', cta: 'Ask for the starter template.' }
    ]
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
    status: 'approved-source',
    brandKit: {
      primaryColor: '#09090B',
      accentColor: '#D4AF37',
      visualStyle: 'premium business editorial, clean charts, gold annotations, boardroom pacing',
      contentPillars: ['company breakdowns', 'offer strategy', 'pricing lessons', 'market positioning'],
      assetNeeds: ['brand tear-down templates', 'chart cards', 'case-study thumbnails', 'newsletter CTA cards']
    },
    contentCalendar: [
      { day: 1, theme: 'Company teardown', format: 'Short', hook: 'This brand makes boring products feel expensive.', cta: 'Follow for the full breakdown.' },
      { day: 2, theme: 'Offer lesson', format: 'Carousel', hook: 'The offer stack hiding inside a million-dollar homepage.', cta: 'Save the structure.' },
      { day: 3, theme: 'Pricing psychology', format: 'Short', hook: 'The pricing trick that makes the middle option irresistible.', cta: 'Comment pricing for the notes.' }
    ]
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
    status: 'approved-source',
    brandKit: {
      primaryColor: '#050505',
      accentColor: '#22C55E',
      visualStyle: 'dark wealth notebook, green proof markers, simple asset maps, discreet luxury',
      contentPillars: ['asset building', 'income systems', 'money habits', 'automation leverage'],
      assetNeeds: ['wealth map cards', 'checklist covers', 'income ladder graphics', 'green/yellow/red score tiles']
    },
    contentCalendar: [
      { day: 1, theme: 'Asset map', format: 'Carousel', hook: 'Most people chase money. Builders collect assets.', cta: 'Save the map.' },
      { day: 2, theme: 'Income system', format: 'Short', hook: 'One digital asset can become five income paths.', cta: 'Comment asset for the checklist.' },
      { day: 3, theme: 'Automation leverage', format: 'Short', hook: 'The quiet difference between working more and compounding faster.', cta: 'Follow for the proof loop.' }
    ]
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
    status: 'approved-source',
    brandKit: {
      primaryColor: '#111111',
      accentColor: '#F8FAFC',
      visualStyle: 'minimal black-and-white luxury, routine cards, crisp habit trackers, quiet confidence',
      contentPillars: ['morning systems', 'decision discipline', 'focus routines', 'weekly reviews'],
      assetNeeds: ['habit tracker graphics', 'routine cards', 'desk b-roll prompts', 'template mockups']
    },
    contentCalendar: [
      { day: 1, theme: 'Morning system', format: 'Short', hook: 'A wealthy day is usually decided before 9 AM.', cta: 'Save the routine.' },
      { day: 2, theme: 'Decision discipline', format: 'Carousel', hook: 'Five decisions successful operators make once, not daily.', cta: 'Use this as your rule sheet.' },
      { day: 3, theme: 'Weekly review', format: 'Short', hook: 'The Sunday review that keeps the week from owning you.', cta: 'Comment weekly for the template.' }
    ]
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
    status: 'approved-source',
    brandKit: {
      primaryColor: '#0A0A0A',
      accentColor: '#EF4444',
      visualStyle: 'ethical warning lab, red signal labels, sharp myth-versus-fact cards, protective tone',
      contentPillars: ['manipulation defense', 'boundary scripts', 'social proof literacy', 'ethical persuasion'],
      assetNeeds: ['red flag cards', 'script templates', 'myth/fact overlays', 'safe-language review checklist']
    },
    contentCalendar: [
      { day: 1, theme: 'Red flag education', format: 'Short', hook: 'If someone rushes your decision, slow the room down.', cta: 'Save this boundary script.' },
      { day: 2, theme: 'Self-defense script', format: 'Carousel', hook: 'Three calm lines that stop pressure tactics.', cta: 'Use the script, do not escalate.' },
      { day: 3, theme: 'Ethical persuasion', format: 'Short', hook: 'Influence is not the problem. Coercion is.', cta: 'Follow for ethical breakdowns.' }
    ]
  }
];
