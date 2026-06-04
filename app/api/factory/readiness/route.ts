import { NextResponse } from "next/server";

const workflow = [
  "executive-intake",
  "self-reflection",
  "discovery",
  "branding",
  "build-in-sandbox",
  "promote-source",
  "promote-frontend",
  "validate",
  "audit",
  "improve"
];

export async function GET() {
  return NextResponse.json(
    {
      status: "READY",
      activation_status: "AUTO_BUILDER_SANDBOX_ONLY",
      control_plane: "Strategic-Minds/AUTO_BUILDER",
      sandbox_repo: "Strategic-Minds/SANDBOX",
      frontend_repo: "Strategic-Minds/FRONTEND",
      target_repo: "Strategic-Minds/EDENSKYESTUDIOS",
      live_mutations_enabled: false,
      human_gate_required: true,
      ai_gateway_route: "/api/eden/chat",
      gate_route: "/api/eden/gates",
      cron_routes: ["/api/cron/factory-readiness", "/api/cron/reverse-engineering-passive"],
      factory_routes: ["/api/factory/readiness", "/api/factory/build-packet"],
      workflow
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
