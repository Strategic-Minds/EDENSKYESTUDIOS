export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(
    {
      system: "EDEN SKYE ADMIN",
      evidence_state: "pending_runtime_capture",
      required_screenshots: [
        "/",
        "/models",
        "/models/alexis-voss",
        "/models/alexis-voss/portfolio",
        "/pricing",
        "/shopify",
        "/checkout",
        "/admin",
        "/admin/eden",
        "/admin/agent-console",
        "/admin/bridge",
        "/admin/builders",
        "/admin/git-vercel",
        "/admin/supabase",
        "/admin/drive",
        "/admin/gmail-calendar",
        "/admin/media",
        "/admin/social",
        "/admin/gates",
        "/admin/workflows",
        "/admin/receipts",
        "/admin/evidence",
        "/admin/images",
        "/admin/models",
        "/admin/quarantine",
        "/closet",
        "/closet/alexis-voss",
        "/closet/alexis-voss/viewer"
      ],
      required_logs: ["npm test", "npm run build", "bridge enablement", "readiness API", "builder docs API", "approval gate API", "blocked protected command"],
      source_package: "01-black-chat-ui-2-7-.zip",
      source_map_manifest: "config/eden-skye-admin-chat-ui-source-map.json",
      visual_approval: "unapproved_until_reviewed",
      pr_state_required: "draft"
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
