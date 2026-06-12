export const dynamic = "force-dynamic";

const bridges = [
  "GitHub",
  "Vercel",
  "Supabase",
  "Google Drive",
  "Gmail",
  "Google Calendar",
  "Shopify",
  "HeyGen",
  "image generation",
  "video generation",
  "social media automation",
  "AUTO BUILDER",
  "Eden Skye OS",
  "n8n / external workflow bridge",
  "browser / Playwright evidence bridge"
];

export async function GET() {
  return Response.json(
    {
      system: "EDEN SKYE ADMIN",
      registry_manifest: "config/eden-skye-admin-bridge-registry.json",
      activation_mode: "draft_only",
      live_mutations_enabled: false,
      bridges: bridges.map((name) => ({
        name,
        status: "registered",
        allowed_without_approval: ["inspect", "plan", "draft", "queue", "validate", "collect_evidence", "write_receipt"],
        protected_mutation_requires_approval: true
      }))
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
