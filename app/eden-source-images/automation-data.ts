import type { WorkflowTone } from './admin-data';

export type AutomationLane = {
  id: 'discovery' | 'planning' | 'scheduling' | 'image-generation';
  label: string;
  status: WorkflowTone;
  automationLevel: 'draft-only' | 'approval-gated' | 'ready-for-test';
  activeCount: number;
  goal: string;
  nextAction: string;
  guardrail: string;
};

export type AutomationQueueItem = {
  id: string;
  lane: AutomationLane['id'];
  title: string;
  owner: 'Eden AI' | 'Admin' | 'System';
  status: WorkflowTone;
  trigger: string;
  output: string;
  approvalRequired: boolean;
};

export type ImageGenerationPreset = {
  id: string;
  label: string;
  status: WorkflowTone;
  promptMode: string;
  outputTarget: string;
  approvalGate: string;
};

export type SchedulingTarget = {
  day: string;
  focus: string;
  channel: string;
  automationState: WorkflowTone;
  plannedOutput: string;
};

export const automationLanes: AutomationLane[] = [
  {
    id: 'discovery',
    label: 'Automated Discovery',
    status: 'yellow',
    automationLevel: 'ready-for-test',
    activeCount: 5,
    goal: 'Find content angles, visual trends, model opportunities, and faceless account ideas from approved sources.',
    nextAction: 'Run discovery drafts from faceless concepts and Eden source-image gaps.',
    guardrail: 'No external publishing or scraping claims without verified connector receipts.'
  },
  {
    id: 'planning',
    label: 'Planning Engine',
    status: 'green',
    automationLevel: 'ready-for-test',
    activeCount: 30,
    goal: 'Convert approved models, faceless concepts, and campaign ideas into daily content plans.',
    nextAction: 'Promote 30-day faceless calendars into approval packets.',
    guardrail: 'Plans can be generated freely; calendar writes remain approval-gated.'
  },
  {
    id: 'scheduling',
    label: 'Scheduling Queue',
    status: 'yellow',
    automationLevel: 'approval-gated',
    activeCount: 7,
    goal: 'Stage daily posts for Google Calendar, Metricool, and admin review without live publishing.',
    nextAction: 'Create draft schedule receipts for the next 7 days.',
    guardrail: 'No Metricool/social/Calendar mutations until destination and approval are verified.'
  },
  {
    id: 'image-generation',
    label: 'Image Generation',
    status: 'yellow',
    automationLevel: 'approval-gated',
    activeCount: 12,
    goal: 'Generate source images and campaign visuals into the Image Stack with receipts and manifest matching.',
    nextAction: 'Generate missing Eden source-image prompts and route outputs to approval.',
    guardrail: 'Images must record prompt, model, status, QA score, approval color, Drive target, and manifest slot.'
  }
];

export const automationQueue: AutomationQueueItem[] = [
  {
    id: 'DISC-001',
    lane: 'discovery',
    title: 'Daily trend and content-angle discovery',
    owner: 'Eden AI',
    status: 'yellow',
    trigger: 'Manual admin button now; cron later',
    output: '10 ranked content ideas with model/faceless fit and image needs',
    approvalRequired: false
  },
  {
    id: 'PLAN-001',
    lane: 'planning',
    title: 'Faceless 30-day calendar approval packet',
    owner: 'Eden AI',
    status: 'green',
    trigger: 'Approved faceless source pack',
    output: '30-day draft calendar per concept, first-pass hooks, CTAs, asset needs',
    approvalRequired: false
  },
  {
    id: 'SCHED-001',
    lane: 'scheduling',
    title: 'Google Calendar content schedule draft',
    owner: 'System',
    status: 'yellow',
    trigger: 'Approved content packet',
    output: 'Draft calendar map; live Google Calendar write requires approval',
    approvalRequired: true
  },
  {
    id: 'IMG-001',
    lane: 'image-generation',
    title: 'Missing Eden source-image generation prompts',
    owner: 'Eden AI',
    status: 'yellow',
    trigger: '12-slot production manifest gaps',
    output: 'Prompt batch for missing red/yellow source slots routed to Image Stack',
    approvalRequired: false
  },
  {
    id: 'IMG-002',
    lane: 'image-generation',
    title: 'Image Stack receipt recorder',
    owner: 'System',
    status: 'yellow',
    trigger: 'Upload or generated image event',
    output: 'Filename, prompt, model, QA score, approval color, manifest slot, Drive file ID, Supabase receipt',
    approvalRequired: true
  }
];

export const imageGenerationPresets: ImageGenerationPreset[] = [
  {
    id: 'identity-lock',
    label: 'Identity Lock Source',
    status: 'yellow',
    promptMode: 'Controlled front/three-quarter/profile portrait prompt with strict identity consistency language.',
    outputTarget: 'Image Stack -> production manifest slot',
    approvalGate: 'Requires visual QA and exact manifest filename before green.'
  },
  {
    id: 'campaign-visual',
    label: 'Campaign Visual',
    status: 'green',
    promptMode: 'Platform-safe editorial campaign image with brand styling and channel crop.',
    outputTarget: 'Image Stack -> approval folder',
    approvalGate: 'Admin approval before scheduling or reuse.'
  },
  {
    id: 'faceless-asset',
    label: 'Faceless Asset Pack',
    status: 'green',
    promptMode: 'Text-safe graphics, b-roll prompts, carousel covers, and visual systems for faceless channels.',
    outputTarget: 'Faceless brand kit -> content calendar day',
    approvalGate: 'Draft-only until channel destination is verified.'
  }
];

export const schedulingTargets: SchedulingTarget[] = [
  { day: 'Mon', focus: 'Discovery run', channel: 'Admin', automationState: 'yellow', plannedOutput: 'Ranked idea queue and source-image needs' },
  { day: 'Tue', focus: 'Planning packet', channel: 'Admin', automationState: 'green', plannedOutput: 'Daily content plan and asset requests' },
  { day: 'Wed', focus: 'Image generation', channel: 'Image Stack', automationState: 'yellow', plannedOutput: 'Draft visuals and receipts' },
  { day: 'Thu', focus: 'Approval review', channel: 'Admin', automationState: 'yellow', plannedOutput: 'Green/yellow/red approvals' },
  { day: 'Fri', focus: 'Schedule draft', channel: 'Google Calendar / Metricool', automationState: 'yellow', plannedOutput: 'Draft schedule, no live publish' },
  { day: 'Sat', focus: 'QA and leak test', channel: 'Admin', automationState: 'yellow', plannedOutput: 'Blocked items and fixes' },
  { day: 'Sun', focus: 'Analyze and reset', channel: 'Admin', automationState: 'red', plannedOutput: 'Analytics placeholder until Metricool is connected' }
];
