import { edenLaunchWorkflow } from "@/lib/workflow";
import { safeJson } from "@/lib/governance";

export const dynamic = "force-dynamic";

export function GET() {
  return safeJson({
    workflow: edenLaunchWorkflow,
    checkedAt: new Date().toISOString()
  });
}
