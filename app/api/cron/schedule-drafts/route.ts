import { NextResponse } from "next/server";
import { buildScheduleDrafts, cronAuthorized, enterpriseCronResponse } from "../../../../lib/enterprise-content-automation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!cronAuthorized(request)) {
    return NextResponse.json({ status: "LOCKED", reason: "Invalid cron secret" }, { status: 401 });
  }

  const limit = Number(new URL(request.url).searchParams.get("limit") ?? "25");
  const schedule_drafts = buildScheduleDrafts(Number.isFinite(limit) ? Math.max(1, Math.min(limit, 100)) : 25);
  const { receipt, persistence } = await enterpriseCronResponse("schedule-drafts", {
    schedule_drafts,
    public_publishing_enabled: false,
    next_route: "/api/cron/analytics-review"
  });

  return NextResponse.json(
    {
      status: "SCHEDULE_DRAFTS_READY",
      activation_status: "DRAFT_ONLY",
      schedule_drafts,
      receipt,
      persistence
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  return GET(request);
}
