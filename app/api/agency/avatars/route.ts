import { agencyAvatars, agencyOfferMap, agencyWorkstreams } from "@/lib/agency";
import { safeJson } from "@/lib/governance";
import { createSupabaseAdminClient } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const supabase = createSupabaseAdminClient();
    const { data, error } = await supabase
      .from("avatar_profiles")
      .select("slug, display_name, agency_role, brand_lane, avatar_status, primary_channels, shopify_collection_handle, visual_direction, voice_direction")
      .order("display_name", { ascending: true });

    if (error) {
      return safeJson({ ok: false, error: error.message, fallback: agencyAvatars }, { status: 500 });
    }

    return safeJson({
      ok: true,
      avatars: data?.length ? data : agencyAvatars,
      workstreams: agencyWorkstreams,
      offerMap: agencyOfferMap
    });
  } catch (error) {
    return safeJson(
      {
        ok: false,
        error: error instanceof Error ? error.message : "Unknown avatar agency error.",
        fallback: agencyAvatars
      },
      { status: 500 }
    );
  }
}
