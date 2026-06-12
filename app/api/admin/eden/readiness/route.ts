export const dynamic = "force-dynamic";

export async function GET() {
  return Response.json(
    {
      system: "EDEN SKYE ADMIN",
      mode: "draft_control_plane",
      readiness_score: 72,
      live_mutations_enabled: false,
      visual_approval: "pending_chromium_evidence_review",
      next_best_action: "Run Eden Visual Preview Bridge, download evidence, review screenshots, keep PR draft.",
      blockers: [
        "Chromium screenshot evidence has not been reviewed in this install pass.",
        "Production deploy and live external mutations require explicit approval."
      ],
      safe_autonomy: ["inspect", "plan", "draft", "queue", "validate", "collect_evidence", "write_receipts", "prepare_preview"]
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
