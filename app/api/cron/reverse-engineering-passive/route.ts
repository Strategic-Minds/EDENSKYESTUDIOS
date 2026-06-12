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
      activation_status: "PASSIVE_RECEIPT_ONLY",
      route: "/api/cron/reverse-engineering-passive",
      control_plane: "Auto Builder",
      checked_at: new Date().toISOString(),
      live_mutations_enabled: false,
      human_gate_required: true,
      passive_queue: [
        "review Drive brand pack changes",
        "compare storefront against locked homepage structure",
        "inspect Edens Closet gate visibility",
        "prepare improvement packet for approval"
      ]
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
