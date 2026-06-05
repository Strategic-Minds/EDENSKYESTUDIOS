import { NextResponse } from "next/server";
import { buildAnalyticsReview, cronAuthorized, enterpriseCronResponse } from "../../../../lib/enterprise-content-automation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!cronAuthorized(request)) {
    return NextResponse.json({ status: "LOCKED", reason: "Invalid cron secret" }, { status: 401 });
  }

  const analytics_review = buildAnalyticsReview();
  const { receipt, persistence } = await enterpriseCronResponse("analytics-review", {
    analytics_review,
    next_route: "/api/cron/winner-cloning"
  });

  return NextResponse.json(
    {
      status: "ANALYTICS_REVIEW_PACKET_READY",
      activation_status: "SANDBOX_ONLY",
      analytics_review,
      receipt,
      persistence
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  return GET(request);
}
