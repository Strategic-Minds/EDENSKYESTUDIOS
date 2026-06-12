import { checkApprovalGate } from '@/lib/eden/governance';

export type BridgeRiskResult = {
  requiresApproval: boolean;
  allowed: boolean;
  riskLevel: 'green' | 'yellow' | 'red' | 'critical';
  reason: string;
};

const liveActionTerms = [
  'publish',
  'live',
  'schedule',
  'shopify',
  'payment',
  'deploy',
  'migration',
  'heygen',
  'customer_message',
  'delete',
  'env'
];

export function evaluateBridgeRisk(jobType: string, payload: Record<string, unknown>): BridgeRiskResult {
  const serialized = `${jobType} ${JSON.stringify(payload)}`.toLowerCase();
  const gate = checkApprovalGate(serialized);

  if (gate.requiresApproval) {
    return {
      requiresApproval: true,
      allowed: false,
      riskLevel: gate.risk === 'red' ? 'red' : 'yellow',
      reason: gate.recommendation
    };
  }

  if (liveActionTerms.some((term) => serialized.includes(term))) {
    return {
      requiresApproval: true,
      allowed: false,
      riskLevel: 'red',
      reason: 'Potential live, paid, production, customer, or destructive action requires approval.'
    };
  }

  return {
    requiresApproval: false,
    allowed: true,
    riskLevel: 'green',
    reason: 'Safe draft/readiness/receipt action.'
  };
}
