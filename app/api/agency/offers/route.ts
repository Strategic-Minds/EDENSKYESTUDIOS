import { agencyOfferMap } from "@/lib/agency";
import { safeJson } from "@/lib/governance";
import { createSupabaseAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("avatar_offers")
      .select("id, offer_type, title, price_cents, currency, delivery_mode, offer_status, shopify_product_gid, avatar_profiles(slug, display_name)")
      .order("created_at", { ascending: false });

    if (error) {
      return safeJson({ ok: false, error: error.message, offerMap: agencyOfferMap }, { status: 500 });
    }

    return safeJson({ ok: true, offers: data ?? [], offerMap: agencyOfferMap });
  } catch (error) {
    return safeJson(
      { ok: false, error: error instanceof Error ? error.message : "Unknown agency offer error.", offerMap: agencyOfferMap },
      { status: 500 }
    );
  }
}
