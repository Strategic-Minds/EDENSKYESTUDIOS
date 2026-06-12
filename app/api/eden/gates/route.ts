import { NextResponse } from "next/server";

const gates = [
  { name: "Production deploy", state: "Locked", note: "Requires Jeremy approval" },
  { name: "Shopify publishing", state: "Locked", note: "Draft products only" },
  { name: "Supabase schema", state: "Locked", note: "Migration scaffold only" },
  { name: "Metricool posting", state: "Locked", note: "Draft routing only" },
  { name: "AI Gateway", state: "Wired", note: "Activates when Vercel env is approved" },
  { name: "Licensing", state: "Review", note: "Not public until asset pack approved" }
];

export async function GET() {
  return NextResponse.json(
    {
      status: "READY",
      activation_status: "DRAFT_CONTROL_PLANE",
      human_gate_required: true,
      live_mutations_enabled: false,
      updated_at: new Date().toISOString(),
      gates
    },
    {
      headers: {
        "Cache-Control": "no-store"
      }
    }
  );
}
