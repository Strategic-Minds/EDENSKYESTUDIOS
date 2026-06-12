import { NextResponse } from "next/server";

const driveUrl = "https://drive.google.com/drive/folders/1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE";

const files = [
  ["eden-glam-editorial-001_female-black-lace-evening-dress_4x5_v1", "eden-glam-editorial-001_female-black-lace-evening-dress_4x5_v1.png", "female model / Shopify / social draft"],
  ["eden-glam-editorial-002_female-hot-pink-mini-dress_4x5_v1", "eden-glam-editorial-002_female-hot-pink-mini-dress_4x5_v1.png", "female model / Shopify / social draft"],
  ["eden-glam-editorial-003_female-black-club-fashion_4x5_v1", "eden-glam-editorial-003_female-black-club-fashion_4x5_v1.png", "female model / Shopify / social draft"],
  ["eden-glam-editorial-004_male-open-shirt-nightlife_4x5_v1", "eden-glam-editorial-004_male-open-shirt-nightlife_4x5_v1.png", "male model / Shopify / social draft"],
  ["eden-glam-editorial-005_male-black-tank-editorial_4x5_v1", "eden-glam-editorial-005_male-black-tank-editorial_4x5_v1.png", "male model / Shopify / social draft"],
  ["eden-glam-editorial-006_female-fullbody-black-gown_9x16_v1", "eden-glam-editorial-006_female-fullbody-black-gown_9x16_v1.png", "female model / Closet / social draft"],
  ["eden-glam-editorial-007_male-fullbody-open-shirt_9x16_v1", "eden-glam-editorial-007_male-fullbody-open-shirt_9x16_v1.png", "male model / Shopify / social draft"],
  ["eden-glam-editorial-008_female-social-closeup-glam_4x5_v1", "eden-glam-editorial-008_female-social-closeup-glam_4x5_v1.png", "female model / Shopify / social draft"]
];

const registry = {
  system: "EDEN GLAM EDITORIAL BATCH 003",
  batch_id: "ES-GLAM-EDITORIAL-2026-06-12-003",
  status: "generated_pending_admin_review",
  style_correction: "sexier editorial female and male source images, not business suits",
  admin_page: "/admin/glam-editorial",
  source_package: "EDEN_GLAM_EDITORIAL_BATCH_003_IMAGES_2026_06_12.zip",
  manifest: "EDEN_GLAM_EDITORIAL_BATCH_003_MANIFEST_2026-06-12.csv",
  contract: "EDEN_GLAM_EDITORIAL_BATCH_003_CONTRACT_2026-06-12.json",
  contact_sheet: "eden-glam-editorial-batch-003-contact-sheet-2026-06-12.jpg",
  drive_folder: { id: "1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE", url: driveUrl, file_status: "pending_drive_upload_or_validation" },
  allowed_next_states: ["approved_site_draft", "approved_shopify_draft", "approved_social_draft", "approved_heygen_packet", "quarantine_regenerate"],
  approval_policy: { public_use_allowed: false, shopify_live_allowed: false, xyla_public_posting_allowed: false, heygen_final_allowed: false, human_gate_required: true },
  protected_actions: ["live Shopify product mutation", "payment activation", "public social publishing", "final HeyGen avatar activation", "production deploy", "merge or release"],
  files: files.map(([asset_id, filename, platform_target]) => ({
    asset_id,
    filename,
    platform_target,
    status: "generated_pending_admin_review",
    drive_file_id: "PENDING_DRIVE_UPLOAD",
    drive_url: driveUrl,
    style_direction: "sexier_glam_editorial_non_explicit_no_suits",
    generator_safe_use: "draft_review_only_until_human_approval",
    collage_use_rule: "standalone_generated_no_collage_crop",
    safety_rule: "adult_non_explicit_no_nudity_no_minors_no_celebrity_likeness"
  }))
};

export async function GET() {
  return NextResponse.json(registry, { headers: { "Cache-Control": "no-store" } });
}
