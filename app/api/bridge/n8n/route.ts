import { NextResponse } from "next/server";
import { bridgeActionLocked, bridgeCapabilities, bridgeSecretAuthorized, buildBridgeReceipt, type AutonomousBridgePacket } from "../../../../lib/autonomous-bridge";
import { persistToolReceipt } from "../../../../lib/receipt-persistence";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

async function readPacket(request: Request): Promise<AutonomousBridgePacket> {
  try {
    return (await request.json()) as AutonomousBridgePacket;
  } catch {
    return { requested_action: "bridge_status", source: "n8n_bridge_empty_body" };
  }
}

export async function GET() {
  return NextResponse.json(
    {
      capability_status: "N8N_AUTONOMOUS_BRIDGE_READY",
      activation_status: "DRAFT_ONLY",
      ...bridgeCapabilities,
      expected_header: "x-eden-bridge-secret when N8N_BRIDGE_SECRET is configured"
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  const auth = bridgeSecretAuthorized(request, ["N8N_BRIDGE_SECRET", "AUTO_BUILDER_GPT_BRIDGE_SECRET", "CRON_SECRET"]);
  if (!auth.authorized) {
    return NextResponse.json({ status: "LOCKED", reason: "Invalid bridge secret" }, { status: 401 });
  }

  const packet = await readPacket(request);
  const lock = bridgeActionLocked(packet);

  if (lock.locked) {
    const receipt = buildBridgeReceipt(packet, "PROTECTED_ACTION_BLOCKED", { lock });
    const persistence = await persistToolReceipt(receipt);
    return NextResponse.json(
      {
        status: "PROTECTED_ACTION_BLOCKED",
        activation_status: "DRAFT_ONLY",
        live_mutations_enabled: false,
        human_gate_required: true,
        lock,
        receipt,
        persistence
      },
      { status: 423, headers: { "Cache-Control": "no-store" } }
    );
  }

  const receipt = buildBridgeReceipt(packet, "DRAFT_PACKET_ACCEPTED", {
    auth_mode: auth.mode,
    next_routes: ["/api/eden/gates", "/api/factory/readiness", "/api/cron/bridge-queue-worker"]
  });
  const persistence = await persistToolReceipt(receipt);

  return NextResponse.json(
    {
      status: "DRAFT_PACKET_ACCEPTED",
      activation_status: "DRAFT_ONLY",
      live_mutations_enabled: false,
      human_gate_required: true,
      receipt,
      persistence,
      capabilities: bridgeCapabilities
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
