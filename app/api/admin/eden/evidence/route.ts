export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(
    {
      system: "EDEN SKYE ADMIN",
      evidence_state: "pending_runtime_capture",
      required_screenshots: [
        "/admin",
        "/admin/eden",
        "/admin/gates",
        "/admin/workflows",
        "/admin/receipts",
        "/admin/images",
        "/admin/models",
        "/admin/quarantine"
      ],
      required_logs: ["npm test", "npm run build", "bridge enablement", "readiness API", "approval gate API", "blocked protected command"],
      visual_approval: "unapproved_until_reviewed",
      pr_state_required: "draft"
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
