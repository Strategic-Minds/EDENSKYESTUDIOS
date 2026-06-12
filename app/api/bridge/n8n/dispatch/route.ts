import { NextResponse } from "next/server";
import { bridgeCapabilities, bridgeSecretAuthorized } from "../../../../../lib/autonomous-bridge";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const auth = bridgeSecretAuthorized(request, ["N8N_BRIDGE_SECRET", "AUTO_BUILDER_GPT_BRIDGE_SECRET", "CRON_SECRET"]);
  if (!auth.authorized) {
    return NextResponse.json({ status: "LOCKED", reason: "Invalid bridge secret" }, { status: 401 });
  }

  return NextResponse.json(
    {
      status: "N8N_DISPATCH_READY",
      activation_status: "DRAFT_ONLY",
      live_mutations_enabled: false,
      human_gate_required: true,
      auth_mode: auth.mode,
      dispatch_queue: [
        {
          id: "eden-gates",
          method: "GET",
          route: "/api/eden/gates",
          purpose: "Read current protected-action gates before any bridge execution."
        },
        {
          id: "factory-readiness",
          method: "GET",
          route: "/api/factory/readiness",
          purpose: "Read sandbox/control-plane readiness."
        },
        {
          id: "bridge-worker",
          method: "GET",
          route: "/api/cron/bridge-queue-worker",
          purpose: "Process already approved Supabase bridge queue rows when configured."
        },
        {
          id: "visual-preview-bridge",
          method: "GITHUB_ACTIONS_MANUAL",
          workflow: "Eden Visual Preview Bridge",
          branch: "eden/readiness-scaffold-20260604",
          purpose: "Run npm test, npm run build, and Chromium screenshot evidence before visual approval."
        }
      ],
      capabilities: bridgeCapabilities
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  return GET(request);
}
