import { NextResponse } from "next/server";
import { fetchQueuedBridgePackets, patchBridgePacket, bridgeQueueConfigured } from "../../../../lib/supabase-bridge-queue";
import { persistToolReceipt } from "../../../../lib/receipt-persistence";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type WorkerResult = {
  bridge_request_id: string;
  status: "completed" | "failed";
  http_status?: number;
  response?: unknown;
  error?: string;
};

function cronAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

function routerUrl() {
  return process.env.AUTO_BUILDER_ROUTER_URL || "https://auto-builder-livid.vercel.app/api/factory/router";
}

function routerHeaders() {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (process.env.AUTO_BUILDER_GPT_BRIDGE_SECRET) {
    headers["x-auto-builder-gpt-secret"] = process.env.AUTO_BUILDER_GPT_BRIDGE_SECRET;
  }
  if (process.env.CRON_SECRET) {
    headers.authorization = `Bearer ${process.env.CRON_SECRET}`;
  }
  return headers;
}

async function sendToAutoBuilder(payload: Record<string, unknown>) {
  const response = await fetch(routerUrl(), {
    method: "POST",
    headers: routerHeaders(),
    body: JSON.stringify(payload)
  });
  const text = await response.text();
  let body: unknown = text;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    // Keep non-JSON responses as text for diagnostics.
  }
  return { ok: response.ok, status: response.status, body };
}

async function processPacket(row: Awaited<ReturnType<typeof fetchQueuedBridgePackets>>[number]): Promise<WorkerResult> {
  const startedAt = new Date().toISOString();
  const processingPayload = {
    ...row.payload,
    worker: {
      status: "processing",
      started_at: startedAt,
      runtime: "vercel_cron_bridge_queue_worker"
    }
  };

  await patchBridgePacket(row.bridge_request_id, {
    queue_state: "processing",
    payload: processingPayload,
    updated_at: startedAt
  });

  try {
    const dispatch = await sendToAutoBuilder({
      ...row.payload,
      relay_metadata: {
        bridge_request_id: row.bridge_request_id,
        source: "eden_bridge_queue",
        worker_route: "/api/cron/bridge-queue-worker",
        dispatched_at: new Date().toISOString()
      }
    });

    const completed = dispatch.ok;
    const finalStatus = completed ? "completed" : "failed";
    const finalPayload = {
      ...row.payload,
      worker: {
        status: finalStatus,
        started_at: startedAt,
        finished_at: new Date().toISOString(),
        router_url: routerUrl(),
        http_status: dispatch.status,
        response: dispatch.body
      }
    };

    await patchBridgePacket(row.bridge_request_id, {
      queue_state: finalStatus,
      payload: finalPayload,
      updated_at: new Date().toISOString()
    });

    await persistToolReceipt({
      receipt_id: `bridge-queue-worker-${row.bridge_request_id}`,
      tool_name: "bridge_queue_worker",
      action_type: row.requested_action,
      status: completed ? "AUTO_BUILDER_PACKET_DISPATCHED" : "AUTO_BUILDER_PACKET_FAILED",
      payload: finalPayload
    });

    return {
      bridge_request_id: row.bridge_request_id,
      status: finalStatus,
      http_status: dispatch.status,
      response: dispatch.body
    };
  } catch (caught) {
    const error = caught instanceof Error ? caught.message : String(caught);
    const failedPayload = {
      ...row.payload,
      worker: {
        status: "failed",
        started_at: startedAt,
        finished_at: new Date().toISOString(),
        router_url: routerUrl(),
        error
      }
    };

    await patchBridgePacket(row.bridge_request_id, {
      queue_state: "failed",
      payload: failedPayload,
      updated_at: new Date().toISOString()
    });

    await persistToolReceipt({
      receipt_id: `bridge-queue-worker-${row.bridge_request_id}`,
      tool_name: "bridge_queue_worker",
      action_type: row.requested_action,
      status: "AUTO_BUILDER_PACKET_FAILED",
      payload: failedPayload
    });

    return { bridge_request_id: row.bridge_request_id, status: "failed", error };
  }
}

export async function GET(request: Request) {
  if (!cronAuthorized(request)) {
    return NextResponse.json({ status: "LOCKED", reason: "Invalid cron secret" }, { status: 401 });
  }

  if (!bridgeQueueConfigured()) {
    return NextResponse.json(
      {
        status: "BRIDGE_QUEUE_WORKER_PENDING_SUPABASE_ENV",
        worker: "/api/cron/bridge-queue-worker",
        required_env: ["SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY"],
        router_url: routerUrl()
      },
      { status: 503, headers: { "Cache-Control": "no-store" } }
    );
  }

  const limit = Number(new URL(request.url).searchParams.get("limit") ?? "5");
  const packets = await fetchQueuedBridgePackets(Number.isFinite(limit) ? Math.max(1, Math.min(limit, 10)) : 5);
  const results: WorkerResult[] = [];

  for (const packet of packets) {
    results.push(await processPacket(packet));
  }

  return NextResponse.json(
    {
      status: results.length ? "BRIDGE_QUEUE_WORKER_PROCESSED" : "BRIDGE_QUEUE_WORKER_IDLE",
      worker: "/api/cron/bridge-queue-worker",
      router_url: routerUrl(),
      processed_count: results.length,
      results
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  return GET(request);
}
