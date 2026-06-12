import { NextResponse } from "next/server";
import { buildAnalyticsReview, cronAuthorized, enterpriseCronResponse } from "../../../../lib/enterprise-content-automation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!cronAuthorized(request)) {
    return NextResponse.json({ status: "LOCKED", reason: "Invalid cron secret" }, { status: 401 });
  }

  const analytics = buildAnalyticsReview();
  const winner_cloning = {
    status: "WAITING_FOR_PERFORMANCE_DATA",
    aspirational_target: analytics.follower_growth_target,
    clone_rules: analytics.rules,
    output_queues: ["content_queue", "media_tasks", "schedule_drafts", "approval_requests"],
    safety: "No public publishing. No fabricated performance claims. Weak patterns become tests, not conclusions."
  };
  const { receipt, persistence } = await enterpriseCronResponse("winner-cloning", {
    winner_cloning,
    next_route: "/api/cron/trend-discovery"
  });

  return NextResponse.json(
    {
      status: "WINNER_CLONING_PACKET_READY",
      activation_status: "SANDBOX_ONLY",
      winner_cloning,
      receipt,
      persistence
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  return GET(request);
}
