import { getRuntimeReadiness } from "@/lib/env";
import { safeJson } from "@/lib/governance";

export const dynamic = "force-dynamic";

export function GET() {
  const readiness = getRuntimeReadiness();

  return safeJson(
    {
      service: "edenskyestudios",
      ...readiness,
      checkedAt: new Date().toISOString()
    },
    { status: readiness.ok ? 200 : 503 }
  );
}
