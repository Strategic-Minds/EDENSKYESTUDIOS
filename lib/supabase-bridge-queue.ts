type BridgeQueueRow = {
  id: string;
  bridge_request_id: string;
  bridge_name: string;
  requested_action: string;
  target_repo: string;
  target_branch: string;
  queue_state: string;
  approval_state: string;
  live_mutation_allowed: boolean;
  payload: Record<string, unknown>;
  created_at: string;
  updated_at: string;
};

type QueuePatch = {
  queue_state: "processing" | "completed" | "failed";
  payload: Record<string, unknown>;
  updated_at: string;
};

function supabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  return { url: url?.replace(/\/$/, ""), key };
}

function supabaseHeaders(key: string, prefer = "return=representation") {
  return {
    apikey: key,
    Authorization: `Bearer ${key}`,
    "Content-Type": "application/json",
    Prefer: prefer
  };
}

export function bridgeQueueConfigured() {
  const { url, key } = supabaseConfig();
  return Boolean(url && key);
}

export async function fetchQueuedBridgePackets(limit = 5): Promise<BridgeQueueRow[]> {
  const { url, key } = supabaseConfig();
  if (!url || !key) return [];

  const query = new URLSearchParams({
    select: "*",
    bridge_name: "eq.sandbox_egress_relay",
    queue_state: "eq.queued",
    approval_state: "eq.approved_for_production",
    order: "created_at.asc",
    limit: String(limit)
  });

  const response = await fetch(`${url}/rest/v1/eden_bridge_queue?${query}`, {
    headers: supabaseHeaders(key)
  });

  if (!response.ok) {
    throw new Error(`Fetch bridge queue failed ${response.status}: ${await response.text()}`);
  }

  return (await response.json()) as BridgeQueueRow[];
}

export async function patchBridgePacket(
  bridgeRequestId: string,
  patch: QueuePatch
): Promise<BridgeQueueRow | null> {
  const { url, key } = supabaseConfig();
  if (!url || !key) return null;

  const query = new URLSearchParams({
    bridge_request_id: `eq.${bridgeRequestId}`
  });

  const response = await fetch(`${url}/rest/v1/eden_bridge_queue?${query}`, {
    method: "PATCH",
    headers: supabaseHeaders(key),
    body: JSON.stringify(patch)
  });

  if (!response.ok) {
    throw new Error(`Patch bridge packet failed ${response.status}: ${await response.text()}`);
  }

  const rows = (await response.json()) as BridgeQueueRow[];
  return rows[0] ?? null;
}
