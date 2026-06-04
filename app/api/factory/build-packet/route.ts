import { NextResponse } from "next/server";

const packets = [
  {
    lane: "website",
    target: "Eden Skye Studios storefront and /mockup brand-pack review surface",
    status: "sandbox-built",
    gate: "Vercel preview validation before promotion"
  },
  {
    lane: "admin-control-plane",
    target: "Edens Closet operator dashboard with chat, assets, files, workflow, and gates",
    status: "sandbox-built",
    gate: "Human approval before production promotion"
  },
  {
    lane: "ai-gateway",
    target: "/api/eden/chat",
    status: "wired-stub-first",
    gate: "AI_GATEWAY_API_KEY or Vercel OIDC approval required"
  },
  {
    lane: "crons",
    target: "readiness and passive reverse-engineering cron routes",
    status: "draft-only",
    gate: "No worker mutation; routes only return receipts"
  },
  {
    lane: "agents",
    target: "intake, planning, sandbox, validation, promotion, improvement, Eden Skye",
    status: "asset-backed",
    gate: "No public action without approval"
  }
];

export async function GET() {
  return NextResponse.json(
    {
      status: "READY",
      activation_status: "BUILD_PACKET_DRAFT",
      source_of_truth: "Auto Builder factory workflow",
      human_gate_required: true,
      live_mutations_enabled: false,
      packets
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
