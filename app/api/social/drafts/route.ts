import { z } from "zod";
import { createSupabaseAdminClient } from "@/lib/supabase";
import { assertApproved, safeJson } from "@/lib/governance";

export const dynamic = "force-dynamic";

const DraftRequestSchema = z.object({
  channel: z.enum(["facebook", "instagram", "tiktok", "youtube", "pinterest"]),
  contentDraft: z.string().min(12).max(2200),
  publishSafe: z.boolean().default(false)
});

export async function POST(request: Request) {
  const publishGate = assertApproved("publicPublishing");
  const body = DraftRequestSchema.safeParse(await request.json());

  if (!body.success) {
    return safeJson({ ok: false, errors: body.error.flatten() }, { status: 400 });
  }

  const supabase = createSupabaseAdminClient();
  const { channel, contentDraft, publishSafe } = body.data;

  const { data, error } = await supabase
    .from("social_media_bridge")
    .insert({
      channel,
      content_draft: contentDraft,
      publish_safe: publishSafe && publishGate.approved,
      approved: false,
      status: "drafted"
    })
    .select("id, channel, status, approved, publish_safe, created_at")
    .single();

  if (error) {
    return safeJson({ ok: false, error: error.message }, { status: 500 });
  }

  return safeJson(
    {
      ok: true,
      draft: data,
      governance: publishGate
    },
    { status: 201 }
  );
}
