import { safeJson } from "@/lib/governance";
import { createSupabaseAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createSupabaseAdminClient();
    const [{ data: campaigns, error: campaignError }, { data: receipts, error: receiptError }] = await Promise.all([
      supabase
        .from("media_campaigns")
        .select("id, campaign_name, objective, stage, channels, source_site, shopify_cta, approval_status, avatar_profiles(slug, display_name)")
        .order("created_at", { ascending: false })
        .limit(25),
      supabase
        .from("agency_automation_receipts")
        .select("id, lane, run_status, receipt_payload, created_at")
        .order("created_at", { ascending: false })
        .limit(25)
    ]);

    const error = campaignError ?? receiptError;
    if (error) {
      return safeJson({ ok: false, error: error.message }, { status: 500 });
    }

    return safeJson({ ok: true, campaigns: campaigns ?? [], receipts: receipts ?? [] });
  } catch (error) {
    return safeJson(
      { ok: false, error: error instanceof Error ? error.message : "Unknown agency automation error." },
      { status: 500 }
    );
  }
}
