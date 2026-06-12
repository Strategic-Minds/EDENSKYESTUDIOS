import { NextResponse } from "next/server";
import { buildMediaTasks, cronAuthorized, enterpriseCronResponse } from "../../../../lib/enterprise-content-automation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!cronAuthorized(request)) {
    return NextResponse.json({ status: "LOCKED", reason: "Invalid cron secret" }, { status: 401 });
  }

  const limit = Number(new URL(request.url).searchParams.get("limit") ?? "25");
  const media_tasks = buildMediaTasks(Number.isFinite(limit) ? Math.max(1, Math.min(limit, 100)) : 25);
  const { receipt, persistence } = await enterpriseCronResponse("media-task-builder", {
    media_tasks,
    next_route: "/api/cron/schedule-drafts",
    media_generation_note: "Use Drive approved assets first; create new Runway/imagegen/HeyGen tasks only for verified gaps."
  });

  return NextResponse.json(
    {
      status: "MEDIA_TASK_QUEUE_READY",
      activation_status: "SANDBOX_ONLY",
      media_tasks,
      receipt,
      persistence
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  return GET(request);
}
