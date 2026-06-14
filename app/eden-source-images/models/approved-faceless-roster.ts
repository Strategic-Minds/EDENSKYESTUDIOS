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

type CalendarSeed = {
  themes: string[];
  formats: string[];
  hooks: string[];
  ctas: string[];
};

const buildThirtyDayCalendar = (seed: CalendarSeed): FacelessCalendarItem[] =>
  Array.from({ length: 30 }, (_, index) => ({
    day: index + 1,
    theme: seed.themes[index % seed.themes.length],
    format: seed.formats[index % seed.formats.length],
    hook: seed.hooks[index % seed.hooks.length],
    cta: seed.ctas[index % seed.ctas.length]
  }));

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
  planningStatus: 'Each approved faceless source now has a 30-day draft content calendar and starter brand kit. Publishing remains approval-gated.',
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
    contentCalendar: buildThirtyDayCalendar({
      themes: ['Tool discovery', 'Workflow build', 'Agent demo', 'Prompt system', 'Founder leverage', 'AI stack review'],
      formats: ['Short', 'Carousel', 'Short', 'Thread', 'Short', 'Checklist'],
      hooks: [
        'Three AI tools I would use before hiring another assistant.',
        'The 5-step AI workflow that removes manual admin work.',
        'Watch an AI agent turn a messy idea into a launch checklist.',
        'Most prompts fail because they skip the operating context.',
        'The fastest founders are not doing more. They are routing better.',
        'This is the AI stack I would build before scaling content.'
      ],
      ctas: ['Comment AI for the workflow list.', 'Save this before your next build.', 'Ask for the starter template.', 'Follow for the next lab test.']
    })
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
    contentCalendar: buildThirtyDayCalendar({
      themes: ['Company teardown', 'Offer lesson', 'Pricing psychology', 'Funnel review', 'Brand positioning', 'Revenue model'],
      formats: ['Short', 'Carousel', 'Short', 'Newsletter teaser', 'Short', 'Checklist'],
      hooks: [
        'This brand makes boring products feel expensive.',
        'The offer stack hiding inside a million-dollar homepage.',
        'The pricing trick that makes the middle option irresistible.',
        'A funnel does not fail at checkout. It fails at clarity.',
        'The best brands tell you who they are before they sell.',
        'Here is the revenue model hiding under the content.'
      ],
      ctas: ['Follow for the full breakdown.', 'Save the structure.', 'Comment pricing for the notes.', 'Join the breakdown list.']
    })
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
    contentCalendar: buildThirtyDayCalendar({
      themes: ['Asset map', 'Income system', 'Automation leverage', 'Money habit', 'Digital product', 'Proof loop'],
      formats: ['Carousel', 'Short', 'Short', 'Checklist', 'Short', 'Scorecard'],
      hooks: [
        'Most people chase money. Builders collect assets.',
        'One digital asset can become five income paths.',
        'The quiet difference between working more and compounding faster.',
        'This money habit is boring until it starts buying back time.',
        'A digital product is not the business. The system around it is.',
        'If it cannot prove signal in 30 days, it does not scale yet.'
      ],
      ctas: ['Save the map.', 'Comment asset for the checklist.', 'Follow for the proof loop.', 'Use this as your weekly scorecard.']
    })
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
    contentCalendar: buildThirtyDayCalendar({
      themes: ['Morning system', 'Decision discipline', 'Focus routine', 'Weekly review', 'Energy audit', 'Rule sheet'],
      formats: ['Short', 'Carousel', 'Short', 'Checklist', 'Short', 'Template'],
      hooks: [
        'A wealthy day is usually decided before 9 AM.',
        'Five decisions successful operators make once, not daily.',
        'Your focus problem may actually be a system problem.',
        'The Sunday review that keeps the week from owning you.',
        'Energy leaks are expensive because they look harmless.',
        'A rule sheet beats motivation when the week gets loud.'
      ],
      ctas: ['Save the routine.', 'Use this as your rule sheet.', 'Comment weekly for the template.', 'Follow for tomorrow’s system.']
    })
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
    contentCalendar: buildThirtyDayCalendar({
      themes: ['Red flag education', 'Self-defense script', 'Ethical persuasion', 'Boundary reset', 'Pressure tactics', 'Myth versus fact'],
      formats: ['Short', 'Carousel', 'Short', 'Script card', 'Short', 'Checklist'],
      hooks: [
        'If someone rushes your decision, slow the room down.',
        'Three calm lines that stop pressure tactics.',
        'Influence is not the problem. Coercion is.',
        'A boundary does not need to sound angry to work.',
        'This pressure tactic works because it borrows urgency.',
        'Not every confident person is safe. Watch the pattern.'
      ],
      ctas: ['Save this boundary script.', 'Use the script, do not escalate.', 'Follow for ethical breakdowns.', 'Share this with someone who needs a reset.']
    })
  }
];
