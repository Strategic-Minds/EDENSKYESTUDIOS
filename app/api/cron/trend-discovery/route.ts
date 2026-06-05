import { NextResponse } from "next/server";
import { buildTrendSignals, cronAuthorized, discoverySources, driveSourceTruth, enterpriseCronResponse } from "../../../../lib/enterprise-content-automation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!cronAuthorized(request)) {
    return NextResponse.json({ status: "LOCKED", reason: "Invalid cron secret" }, { status: 401 });
  }

  const trend_signals = buildTrendSignals();
  const { receipt, persistence } = await enterpriseCronResponse("trend-discovery", {
    source_truth: driveSourceTruth,
    discovery_sources: discoverySources,
    trend_signals,
    next_route: "/api/cron/content-plan-builder"
  });

  return NextResponse.json(
    {
      status: "TREND_DISCOVERY_QUEUE_READY",
      activation_status: "SANDBOX_ONLY",
      live_research_required: true,
      trend_signals,
      receipt,
      persistence
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  return GET(request);
}
