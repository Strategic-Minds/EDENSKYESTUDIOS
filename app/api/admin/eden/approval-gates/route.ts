export const dynamic = "force-dynamic";

export const protectedActions = [
  "production deploy",
  "shopify live mutation",
  "supabase production schema mutation",
  "public social publishing",
  "gmail send to real customer",
  "calendar external attendee event creation",
  "domain dns billing change",
  "secret rotation",
  "destructive git operation",
  "merge release pr movement"
];

export async function GET() {
  return Response.json(
    {
      system: "EDEN SKYE ADMIN",
      manifest: "config/eden-skye-admin-approval-gates.json",
      default_decision: "blocked_until_explicit_human_approval",
      live_mutations_enabled: false,
      protected_actions: protectedActions.map((action) => ({ action, allowed_by_default: false, human_approval_required: true }))
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
