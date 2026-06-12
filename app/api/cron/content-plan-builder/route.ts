import { NextResponse } from "next/server";
import { buildContentPlan, cronAuthorized, enterpriseCronResponse } from "../../../../lib/enterprise-content-automation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!cronAuthorized(request)) {
    return NextResponse.json({ status: "LOCKED", reason: "Invalid cron secret" }, { status: 401 });
  }

  const url = new URL(request.url);
  const days = Number(url.searchParams.get("days") ?? "360");
  const postsPerDay = Number(url.searchParams.get("posts_per_day") ?? "3");
  const sampleDays = Number(url.searchParams.get("sample_days") ?? "30");
  const content_plan = buildContentPlan({
    days: Number.isFinite(days) ? days : 360,
    postsPerDay: Number.isFinite(postsPerDay) ? postsPerDay : 3,
    sampleDays: Number.isFinite(sampleDays) ? sampleDays : 30
  });

  const { receipt, persistence } = await enterpriseCronResponse("content-plan-builder", {
    content_plan_summary: {
      total_days: content_plan.total_days,
      posts_per_day: content_plan.posts_per_day,
      accounts: content_plan.accounts,
      models: content_plan.models,
      projected_full_queue_count: content_plan.projected_full_queue_count,
      materialized_sample_count: content_plan.materialized_sample_count
    },
    next_route: "/api/cron/media-task-builder"
  });

  return NextResponse.json(
    {
      status: "CONTENT_PLAN_READY",
      activation_status: "SANDBOX_ONLY",
      content_plan,
      receipt,
      persistence
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  return GET(request);
}
