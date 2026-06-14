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

export const manifestSyncStatus = {
  title: 'Manifest sync required',
  state: 'red' as WorkflowTone,
  description: 'The prior placeholder model inventory and old source-image references were removed. Inventory will stay locked until the real Drive manifest is identified and synced.',
  requiredSource: 'Drive manifest file or sheet inside the Eden Skye Studios admin Drive folder',
  nextAction: 'Identify the exact manifest file or sheet, then rebuild model inventory from that source only.'
};

export const workflowSteps: WorkflowStep[] = [
  { id: 'discover', number: 1, label: 'Discover', tone: 'yellow', count: 1, href: '/eden-source-images' },
  { id: 'plan', number: 2, label: 'Plan', tone: 'yellow', count: 1, href: '/eden-source-images' },
  { id: 'create', number: 3, label: 'Create', tone: 'yellow', count: 0, href: '/eden-source-images/image-stack' },
  { id: 'review', number: 4, label: 'Review', tone: 'red', count: 1, href: '/eden-source-images/models' },
  { id: 'schedule', number: 5, label: 'Schedule', tone: 'yellow', count: 0, href: '/eden-source-images/video-stack' },
  { id: 'analyze', number: 6, label: 'Analyze', tone: 'yellow', count: 0, href: '/eden-source-images' }
];

export const adminLinks: AdminLink[] = [
  { label: 'Editor', href: '/eden-source-images/editor', helper: 'Open the Eden chat/editor workspace.', status: 'green' },
  { label: 'Image Stack', href: '/eden-source-images/image-stack', helper: 'Upload, stack, approve, and match source images.', status: 'yellow' },
  { label: 'Video Stack', href: '/eden-source-images/video-stack', helper: 'Draft HeyGen video jobs and approval receipts.', status: 'yellow' },
  { label: 'Model Inventory', href: '/eden-source-images/models', helper: 'Locked until the real Drive manifest is synced.', status: 'red' },
  { label: 'Female Models', href: '/eden-source-images/models/female', helper: 'Manifest-required lane; no placeholder models shown.', status: 'red' },
  { label: 'Male Models', href: '/eden-source-images/models/male', helper: 'Manifest-required lane; no placeholder models shown.', status: 'red' },
  { label: 'Faceless Content', href: '/eden-source-images/models/faceless', helper: 'Manifest-required lane; no placeholder models shown.', status: 'red' }
];

export const contentPlan: ContentPlanDay[] = [
  { day: 'Mon', date: '06/15', theme: 'Manifest source lock', channel: 'Drive', deliverable: 'Identify exact model/source-image manifest file', status: 'red' },
  { day: 'Tue', date: '06/16', theme: 'Inventory rebuild', channel: 'Admin', deliverable: 'Rebuild model inventory from manifest only', status: 'yellow' },
  { day: 'Wed', date: '06/17', theme: 'Source image matching', channel: 'Image Stack', deliverable: 'Match binaries to manifest slots and Drive IDs', status: 'yellow' },
  { day: 'Thu', date: '06/18', theme: 'Approval cleanup', channel: 'Admin', deliverable: 'Move verified items into approval state', status: 'yellow' },
  { day: 'Fri', date: '06/19', theme: 'Video readiness', channel: 'HeyGen', deliverable: 'Use only manifest-approved model assets', status: 'yellow' },
  { day: 'Sat', date: '06/20', theme: 'Automation gate', channel: 'GitHub / Vercel', deliverable: 'Keep PR #8 blocked until matching is clean', status: 'red' },
  { day: 'Sun', date: '06/21', theme: 'Readiness review', channel: 'Metricool / Admin', deliverable: 'Review verified inventory and content plan', status: 'yellow' }
];

export const models: ModelRecord[] = [];

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
