import { approvalGates } from "./brand";

export type RiskAction = "publicPublishing" | "paidAds" | "shopifyMutation" | "productionDeploy";

export function assertApproved(action: RiskAction) {
  if (!approvalGates[action]) {
    return {
      approved: false,
      reason: `${action} is disabled by default and requires explicit operator approval.`
    };
  }

  return {
    approved: true,
    reason: `${action} is approved for this runtime.`
  };
}

export function safeJson(data: unknown, init?: ResponseInit) {
  return Response.json(data, {
    headers: {
      "Cache-Control": "no-store"
    },
    ...init
  });
}
