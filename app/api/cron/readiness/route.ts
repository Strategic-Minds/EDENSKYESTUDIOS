import { getRuntimeReadiness } from "@/lib/env";
import { safeJson } from "@/lib/governance";
import { createSupabaseAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

type ReadinessReceipt = {
  readiness: ReturnType<typeof getRuntimeReadiness>;
  recorded: boolean;
  error?: string;
};

function isAuthorized(request: Request) {
  const secret = process.env.CRON_SECRET;
  const header = request.headers.get("authorization");

  if (!secret) {
    return false;
  }

  return header === `Bearer ${secret}`;
}

async function recordReadiness(method: string, authorized: boolean): Promise<ReadinessReceipt> {
  const readiness = getRuntimeReadiness();

  if (!authorized || !readiness.ok) {
    return { readiness, recorded: false };
  }

  const supabase = createSupabaseAdminClient();
  const { error } = await supabase.from("runtime_telemetry_events").insert({
    telemetry_key: "eden.readiness",
    event_status: readiness.ok ? "ok" : "missing_env",
    event_payload: {
      method,
      missingRequired: readiness.missingRequired,
      missingOptional: readiness.missingOptional
    }
  });

  return { readiness, recorded: !error, error: error?.message };
}

export async function GET(request: Request) {
  const authorized = isAuthorized(request);

  if (!authorized) {
    return safeJson({ ok: false, error: "Unauthorized cron request." }, { status: 401 });
  }

  const result = await recordReadiness("GET", authorized);

  return safeJson(
    {
      ok: result.readiness.ok,
      recorded: result.recorded,
      error: result.error,
      readiness: result.readiness,
      checkedAt: new Date().toISOString()
    },
    { status: result.readiness.ok ? 200 : 503 }
  );
}

export async function POST(request: Request) {
  return GET(request);
}
