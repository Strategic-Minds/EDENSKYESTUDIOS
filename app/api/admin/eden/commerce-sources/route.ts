import { NextResponse } from "next/server";

const driveUrl = "https://drive.google.com/drive/folders/1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE";

const files = [
  ["eden-commerce-001", "eden-commerce-001_female-models-collection-hero_16x9_v1.png", "female_models_collection_hero", "Female models collection, Shopify draft, Xyla video source", "approved_shopify_draft"],
  ["eden-commerce-002", "eden-commerce-002_male-models-collection-hero_16x9_v1.png", "male_models_collection_hero", "Male models collection, Shopify draft, Xyla video source", "approved_shopify_draft"],
  ["eden-commerce-003", "eden-commerce-003_faceless-content-collection-hero_16x9_v1.png", "faceless_content_collection_hero", "Faceless content page, Shopify collection, Xyla video source", "approved_shopify_draft"],
  ["eden-commerce-004", "eden-commerce-004_black-card-product-hero_4x5_v1.png", "black_card_product_hero", "Black Card product page, Shopify draft", "approved_shopify_draft"],
  ["eden-commerce-005", "eden-commerce-005_xyla-ai-automation-product-hero_4x5_v1.png", "xyla_ai_automation_product_hero", "Xyla automation page/product, Shopify draft", "approved_shopify_draft"],
  ["eden-commerce-006", "eden-commerce-006_ai-video-creation-product-hero_4x5_v1.png", "ai_video_creation_product_hero", "Video product, HeyGen/Xyla packet", "approved_heygen_packet"],
  ["eden-commerce-007", "eden-commerce-007_social-posting-system-product-hero_4x5_v1.png", "social_posting_system_product_hero", "Social automation product/page", "approved_social_draft"],
  ["eden-commerce-008", "eden-commerce-008_model-campaign-packet-product-hero_4x5_v1.png", "model_campaign_packet_product_hero", "Model campaign product, Shopify draft", "approved_shopify_draft"],
  ["eden-commerce-009", "eden-commerce-009_closet-content-pack-product-hero_4x5_v1.png", "closet_content_pack_product_hero", "Eden Closet content pack, Shopify draft", "approved_shopify_draft"],
  ["eden-commerce-010", "eden-commerce-010_faceless-video-background_neon-studio_9x16_v1.png", "faceless_video_background_neon_studio", "Xyla vertical video background", "approved_social_draft"],
  ["eden-commerce-011", "eden-commerce-011_faceless-video-background_content-console_9x16_v1.png", "faceless_video_background_content_console", "Xyla vertical video background", "approved_social_draft"],
  ["eden-commerce-012", "eden-commerce-012_faceless-content-product-card_4x5_v1.png", "faceless_content_product_card", "Faceless content product, Shopify draft", "approved_shopify_draft"]
];

const registry = {
  system: "EDEN SHOPIFY XYLA COMMERCE SOURCES",
  batch_id: "ES-COMMERCE-XYLA-2026-06-12-001",
  status: "approved_bulk_draft",
  approval_receipt: "Jeremy approved bulk batch in chat on 2026-06-12",
  admin_page: "/admin/commerce-sources",
  approval_studio: "/admin/approval-studio",
  source_package: "EDEN_SHOPIFY_XYLA_COMMERCE_SOURCE_IMAGES_2026_06_12.zip",
  manifest: "EDEN_SHOPIFY_XYLA_COMMERCE_SOURCE_MANIFEST_2026-06-12.csv",
  contract: "EDEN_SHOPIFY_XYLA_COMMERCE_SOURCE_CONTRACT_2026-06-12.json",
  contact_sheet: "eden-shopify-xyla-commerce-source-contact-sheet-2026-06-12.jpg",
  drive_folder: { id: "1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE", url: driveUrl, file_status: "pending_drive_upload_or_validation" },
  allowed_use_states: ["approved_shopify_draft", "approved_social_draft", "approved_heygen_packet"],
  protected_actions: ["live Shopify product mutation", "payment activation", "public social publishing", "final HeyGen avatar activation", "production deploy", "merge or release"],
  approval_policy: {
    public_use_allowed: false,
    shopify_live_allowed: false,
    xyla_public_posting_allowed: false,
    heygen_final_allowed: false,
    human_gate_required_for_live_actions: true
  },
  files: files.map(([asset_id, filename, asset_type, platform_target, status]) => ({
    asset_id,
    filename,
    asset_type,
    platform_target,
    status,
    drive_file_id: "PENDING_DRIVE_UPLOAD",
    drive_url: driveUrl,
    generator_safe_use: "approved_for_draft_use_only",
    collage_use_rule: "standalone_generated_no_collage_crop"
  }))
};

export async function GET() {
  return NextResponse.json(registry, { headers: { "Cache-Control": "no-store" } });
}
