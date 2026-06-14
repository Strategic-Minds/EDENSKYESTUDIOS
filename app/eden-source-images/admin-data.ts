export type WorkflowTone = 'green' | 'yellow' | 'red';
export type ModelGroup = 'female' | 'male' | 'faceless';
export type SourceState = 'ready' | 'needs-review' | 'missing';

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

export const workflowSteps: WorkflowStep[] = [
  { id: 'discover', number: 1, label: 'Discover', tone: 'green', count: 7, href: '/eden-source-images' },
  { id: 'plan', number: 2, label: 'Plan', tone: 'yellow', count: 14, href: '/eden-source-images' },
  { id: 'create', number: 3, label: 'Create', tone: 'yellow', count: 12, href: '/eden-source-images/image-stack' },
  { id: 'review', number: 4, label: 'Review', tone: 'red', count: 9, href: '/eden-source-images/image-stack' },
  { id: 'schedule', number: 5, label: 'Schedule', tone: 'yellow', count: 5, href: '/eden-source-images/video-stack' },
  { id: 'analyze', number: 6, label: 'Analyze', tone: 'yellow', count: 3, href: '/eden-source-images' }
];

export const adminLinks: AdminLink[] = [
  { label: 'Editor', href: '/eden-source-images/editor', helper: 'Open the Eden chat/editor workspace.', status: 'green' },
  { label: 'Image Stack', href: '/eden-source-images/image-stack', helper: 'Upload, stack, approve, and match source images.', status: 'yellow' },
  { label: 'Video Stack', href: '/eden-source-images/video-stack', helper: 'Draft HeyGen video jobs and approval receipts.', status: 'yellow' },
  { label: 'Model Inventory', href: '/eden-source-images/models', helper: 'See every model, manifest slot, and source-image gap.', status: 'red' },
  { label: 'Female Models', href: '/eden-source-images/models/female', helper: 'Female model roster and source-image readiness.', status: 'yellow' },
  { label: 'Male Models', href: '/eden-source-images/models/male', helper: 'Male model roster and source-image readiness.', status: 'red' },
  { label: 'Faceless Content', href: '/eden-source-images/models/faceless', helper: 'Faceless content brands, formats, and image needs.', status: 'yellow' }
];

export const contentPlan: ContentPlanDay[] = [
  { day: 'Mon', date: '06/15', theme: 'Model identity lock', channel: 'TikTok / IG', deliverable: '3 portrait tests + hook batch', status: 'yellow' },
  { day: 'Tue', date: '06/16', theme: 'Source image cleanup', channel: 'Drive', deliverable: 'Fill missing manifest source slots', status: 'red' },
  { day: 'Wed', date: '06/17', theme: 'Video scripts', channel: 'HeyGen', deliverable: '5 draft video receipts', status: 'yellow' },
  { day: 'Thu', date: '06/18', theme: 'Approval sprint', channel: 'Admin', deliverable: 'Move green assets to Drive Ready', status: 'yellow' },
  { day: 'Fri', date: '06/19', theme: 'Campaign packaging', channel: 'Shopify / Site', deliverable: 'Lookbook section + offer draft', status: 'yellow' },
  { day: 'Sat', date: '06/20', theme: 'Faceless testing', channel: 'Shorts', deliverable: '3 faceless content templates', status: 'green' },
  { day: 'Sun', date: '06/21', theme: 'Analytics review', channel: 'Metricool', deliverable: 'Winner notes + next-week plan', status: 'yellow' }
];

export const models: ModelRecord[] = [
  {
    id: 'eden-skye',
    name: 'Eden Skye',
    group: 'female',
    role: 'Primary avatar, creative director, luxury editorial face',
    stats: '21+ synthetic, high-fashion, image/video lead',
    manifestSlot: 'F-001',
    sourceState: 'needs-review',
    sourceImagesNeeded: 12,
    sourceImagesReady: 7,
    image: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-010-avatar-full-body-reference.png?v=1781224924'
  },
  {
    id: 'aria-noir',
    name: 'Aria Noir',
    group: 'female',
    role: 'Night studio fashion and beauty editorial',
    stats: '21+ synthetic, black studio, glam portrait lane',
    manifestSlot: 'F-002',
    sourceState: 'needs-review',
    sourceImagesNeeded: 8,
    sourceImagesReady: 3,
    image: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-003-avatar-reference-matrix.png?v=1781224848'
  },
  {
    id: 'luna-vale',
    name: 'Luna Vale',
    group: 'female',
    role: 'Soft glam, lifestyle, wellness-adjacent creator',
    stats: '21+ synthetic, warm beauty content',
    manifestSlot: 'F-003',
    sourceState: 'missing',
    sourceImagesNeeded: 8,
    sourceImagesReady: 0
  },
  {
    id: 'marcellus-king',
    name: 'Marcellus King',
    group: 'male',
    role: 'Luxury menswear, founder energy, product authority',
    stats: '21+ synthetic, fashion and business lane',
    manifestSlot: 'M-001',
    sourceState: 'missing',
    sourceImagesNeeded: 8,
    sourceImagesReady: 0
  },
  {
    id: 'dante-vale',
    name: 'Dante Vale',
    group: 'male',
    role: 'Fitness, travel, and aspirational lifestyle shorts',
    stats: '21+ synthetic, vertical social content',
    manifestSlot: 'M-002',
    sourceState: 'missing',
    sourceImagesNeeded: 8,
    sourceImagesReady: 0
  },
  {
    id: 'resin-lab',
    name: 'Resin Lab',
    group: 'faceless',
    role: 'Hands, products, studio process, satisfying craft loops',
    stats: 'Faceless, product/process content',
    manifestSlot: 'X-001',
    sourceState: 'needs-review',
    sourceImagesNeeded: 10,
    sourceImagesReady: 4,
    image: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-012-media-library-dashboard.png?v=1781224947'
  },
  {
    id: 'luxury-hooks',
    name: 'Luxury Hooks',
    group: 'faceless',
    role: 'Text-led hooks, trend discovery, offer education',
    stats: 'Faceless, carousel and short-form templates',
    manifestSlot: 'X-002',
    sourceState: 'missing',
    sourceImagesNeeded: 6,
    sourceImagesReady: 0
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
