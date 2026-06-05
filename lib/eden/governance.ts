export const APPROVAL_LOCKED_ACTIONS = [
  'public publishing',
  'publish',
  'post live',
  'metricool publish',
  'metricool live schedule',
  'shopify mutation',
  'shopify update',
  'shopify product create',
  'payment change',
  'stripe price',
  'subscription change',
  'supabase production migration',
  'apply migration',
  'klaviyo send',
  'email campaign send',
  'heygen live session',
  'live avatar session',
  'production deploy',
  'vercel production deploy',
  'slack post'
] as const;

export type ApprovalGateCheck = {
  allowed: boolean;
  requiresApproval: boolean;
  risk: 'green' | 'yellow' | 'red';
  matchedGate?: string;
  recommendation: string;
};

export function checkApprovalGate(input: string | null | undefined): ApprovalGateCheck {
  const normalized = (input ?? '').toLowerCase();
  const matchedGate = APPROVAL_LOCKED_ACTIONS.find((gate) => normalized.includes(gate));

  if (matchedGate) {
    return {
      allowed: false,
      requiresApproval: true,
      risk: 'red',
      matchedGate,
      recommendation: 'Create an approval request and hold the external action until Jeremy approves it in the current operating session.'
    };
  }

  if (normalized.includes('draft') || normalized.includes('preview') || normalized.includes('recommend') || normalized.includes('analyze')) {
    return {
      allowed: true,
      requiresApproval: false,
      risk: 'green',
      recommendation: 'Proceed as a draft-only or analysis action and create a receipt.'
    };
  }

  return {
    allowed: true,
    requiresApproval: false,
    risk: 'yellow',
    recommendation: 'Proceed only as governed chat. If the next step touches an external system, create an approval request first.'
  };
}

export const EDEN_PUBLICATION_LOCKS = {
  publicPublishing: true,
  shopifyMutations: true,
  payments: true,
  supabaseProductionMigrations: true,
  klaviyoSends: true,
  liveHeyGenSessions: true,
  productionDeploys: true,
  slackPosts: true
} as const;
