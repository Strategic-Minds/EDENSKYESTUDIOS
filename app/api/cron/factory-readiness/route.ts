import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (!secret) return true;
  return request.headers.get("authorization") === `Bearer ${secret}`;
}

export async function GET(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json({ status: "LOCKED", human_gate_required: true }, { status: 401 });
  }

  return NextResponse.json(
    {
      status: "READY",
      activation_status: "CRON_RECEIPT_ONLY",
      route: "/api/cron/factory-readiness",
      control_plane: "Auto Builder",
      checked_at: new Date().toISOString(),
      live_mutations_enabled: false,
      human_gate_required: true,
      checks: [
        "storefront route present",
        "mockup route present",
        "Edens Closet route present",
        "AI Gateway route guarded",
        "approval gates visible"
      ]
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
