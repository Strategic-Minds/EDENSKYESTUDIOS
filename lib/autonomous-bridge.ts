export const autonomousBridgeManifestPath = "config/autonomous-bridge-manifest.json";

export const protectedBridgeActions = [
  "production_deploy",
  "shopify_mutation",
  "payment_or_discount_change",
  "supabase_schema_mutation",
  "public_social_publish",
  "domain_or_billing_change",
  "secret_write_or_rotation",
  "database_delete_or_overwrite",
  "theme_publish",
  "pr_ready_for_review",
  "merge_or_release"
] as const;

export type ProtectedBridgeAction = (typeof protectedBridgeActions)[number];

export type AutonomousBridgePacket = {
  bridge_request_id?: string;
  source?: string;
  requested_action?: string;
  protected_action?: string;
  live_mutation_allowed?: boolean;
  approval_state?: string;
  payload?: Record<string, unknown>;
};

export function bridgeNow() {
  return new Date().toISOString();
}

export function bridgeRequestId(prefix = "eden-autonomous-bridge") {
  return `${prefix}-${Date.now()}`;
}

export function bridgeSecretAuthorized(request: Request, envNames: string[]) {
  const configured = envNames
    .map((name) => process.env[name])
    .find((value): value is string => Boolean(value));

  if (!configured) {
    return { authorized: true, mode: "NO_SECRET_CONFIGURED" as const };
  }

  const bearer = request.headers.get("authorization")?.replace(/^Bearer\s+/i, "");
  const edenSecret = request.headers.get("x-eden-bridge-secret");
  const autoBuilderSecret = request.headers.get("x-auto-builder-gpt-secret");
  const authorized = [bearer, edenSecret, autoBuilderSecret].includes(configured);
  return { authorized, mode: "SECRET_REQUIRED" as const };
}

export function bridgeActionLocked(packet: AutonomousBridgePacket) {
  const action = packet.protected_action || packet.requested_action || "unknown";
  const protectedMatch = protectedBridgeActions.includes(action as ProtectedBridgeAction);
  const liveMutationRequested = packet.live_mutation_allowed === true;
  const approvalMissing = packet.approval_state !== "approved_for_production";

  if (protectedMatch || liveMutationRequested) {
    return {
      locked: true,
      action,
      reason: approvalMissing
        ? "Protected action or live mutation requested without an approved production packet."
        : "Protected live action still requires a capability-specific human approval gate."
    };
  }

  return { locked: false, action, reason: "Draft-safe action." };
}

export function buildBridgeReceipt(packet: AutonomousBridgePacket, status: string, extra: Record<string, unknown> = {}) {
  const requestId = packet.bridge_request_id || bridgeRequestId();
  return {
    receipt_id: `autonomous-bridge-${requestId}`,
    bridge_request_id: requestId,
    tool_name: "autonomous_gpt_bridge",
    action_type: packet.requested_action || packet.protected_action || "bridge_status",
    status,
    payload: {
      source: packet.source || "unknown",
      live_mutations_enabled: false,
      human_gate_required: true,
      manifest: autonomousBridgeManifestPath,
      received_at: bridgeNow(),
      packet,
      ...extra
    }
  };
}

export const bridgeCapabilities = {
  status: "INSTALLED_DRAFT_ONLY",
  live_mutations_enabled: false,
  human_gate_required: true,
  routes: [
    "/api/bridge/n8n",
    "/api/bridge/n8n/dispatch",
    "/api/cron/bridge-queue-worker",
    "/api/eden/gates",
    "/api/factory/readiness"
  ],
  scripts: [
    "npm run bridge:enable",
    "npm run bridge:auto-builder-gpt",
    "npm run bridge:codex",
    "npm run bridge:gpt-runtime",
    "npm run bridge:relay:auto-builder"
  ],
  protected_actions: protectedBridgeActions
} as const;
