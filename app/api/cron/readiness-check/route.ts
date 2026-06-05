import { NextResponse } from "next/server";
import { approvalGates, cronAuthorized, enterpriseCronResponse } from "../../../../lib/enterprise-content-automation";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  if (!cronAuthorized(request)) {
    return NextResponse.json({ status: "LOCKED", reason: "Invalid cron secret" }, { status: 401 });
  }

  const checks = {
    routes: [
      "/",
      "/admin/eden",
      "/api/eden/health",
      "/api/factory/stack-alignment",
      "/api/cron/trend-discovery",
      "/api/cron/content-plan-builder",
      "/api/cron/media-task-builder",
      "/api/cron/schedule-drafts",
      "/api/cron/analytics-review",
      "/api/cron/winner-cloning"
    ],
    required_env: ["CRON_SECRET", "SUPABASE_URL", "SUPABASE_SERVICE_ROLE_KEY", "EDEN_ADMIN_TOKEN"],
    optional_env: ["AI_GATEWAY_API_KEY", "N8N_BRIDGE_SECRET"],
    approval_gates: approvalGates
  };
  const { receipt, persistence } = await enterpriseCronResponse("readiness-check", {
    checks,
    next_route: "/api/factory/production-readiness"
  });

  return NextResponse.json(
    {
      status: "ENTERPRISE_READINESS_CHECK_READY",
      activation_status: "SANDBOX_ONLY",
      checks,
      receipt,
      persistence
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  return GET(request);
}
