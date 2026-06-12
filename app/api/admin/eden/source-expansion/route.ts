import { NextResponse } from "next/server";

const driveUrl = "https://drive.google.com/drive/folders/1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE";

const files = [
  ["eden-source-expansion-001_female-model-service-product_4x5_v1", "eden-source-expansion-001_female-model-service-product_4x5_v1.png", "site/Shopify/Xyla draft"],
  ["eden-source-expansion-002_male-model-service-product_4x5_v1", "eden-source-expansion-002_male-model-service-product_4x5_v1.png", "site/Shopify/Xyla draft"],
  ["eden-source-expansion-003_faceless-content-studio-product_4x5_v1", "eden-source-expansion-003_faceless-content-studio-product_4x5_v1.png", "Xyla/social/faceless draft"],
  ["eden-source-expansion-004_faceless-vertical-neon-suite_9x16_v1", "eden-source-expansion-004_faceless-vertical-neon-suite_9x16_v1.png", "Xyla/social/faceless draft"],
  ["eden-source-expansion-005_heygen-presenter-halfbody-female_9x16_v1", "eden-source-expansion-005_heygen-presenter-halfbody-female_9x16_v1.png", "HeyGen/video packet draft"],
  ["eden-source-expansion-006_heygen-presenter-halfbody-male_9x16_v1", "eden-source-expansion-006_heygen-presenter-halfbody-male_9x16_v1.png", "HeyGen/video packet draft"],
  ["eden-source-expansion-007_closet-luxury-wardrobe-product_4x5_v1", "eden-source-expansion-007_closet-luxury-wardrobe-product_4x5_v1.png", "Closet/site/Shopify draft"],
  ["eden-source-expansion-008_closet-environment-neon-walkin_16x9_v1", "eden-source-expansion-008_closet-environment-neon-walkin_16x9_v1.png", "Closet/site/Shopify draft"],
  ["eden-source-expansion-009_investor-demo-home-hero_16x9_v1", "eden-source-expansion-009_investor-demo-home-hero_16x9_v1.png", "site/Shopify/Xyla draft"],
  ["eden-source-expansion-010_launch-social-vertical-blackcard_9x16_v1", "eden-source-expansion-010_launch-social-vertical-blackcard_9x16_v1.png", "Xyla/social/faceless draft"]
];

const registry = {
  system: "EDEN SOURCE EXPANSION BATCH 002",
  batch_id: "ES-SOURCE-EXPANSION-2026-06-12-002",
  status: "generated_pending_admin_review",
  created_at: "2026-06-12T22:47:30Z",
  admin_page: "/admin/source-expansion",
  source_package: "EDEN_SOURCE_EXPANSION_BATCH_002_IMAGES_2026_06_12.zip",
  manifest: "EDEN_SOURCE_EXPANSION_BATCH_002_MANIFEST_2026-06-12.csv",
  contract: "EDEN_SOURCE_EXPANSION_BATCH_002_CONTRACT_2026-06-12.json",
  contact_sheet: "eden-source-expansion-batch-002-contact-sheet-2026-06-12.jpg",
  drive_folder: { id: "1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE", url: driveUrl, file_status: "pending_drive_upload_or_validation" },
  allowed_next_states: ["approved_site_draft", "approved_shopify_draft", "approved_social_draft", "approved_heygen_packet", "quarantine_regenerate"],
  approval_policy: {
    public_use_allowed: false,
    shopify_live_allowed: false,
    xyla_public_posting_allowed: false,
    heygen_final_allowed: false,
    human_gate_required: true
  },
  protected_actions: ["live Shopify product mutation", "payment activation", "public social publishing", "final HeyGen avatar activation", "production deploy", "merge or release"],
  files: files.map(([asset_id, filename, platform_target]) => ({
    asset_id,
    filename,
    platform_target,
    status: "generated_pending_admin_review",
    drive_file_id: "PENDING_DRIVE_UPLOAD",
    drive_url: driveUrl,
    generator_safe_use: "draft_review_only_until_human_approval",
    collage_use_rule: "standalone_generated_no_collage_crop"
  }))
};

export async function GET() {
  return NextResponse.json(registry, { headers: { "Cache-Control": "no-store" } });
}
