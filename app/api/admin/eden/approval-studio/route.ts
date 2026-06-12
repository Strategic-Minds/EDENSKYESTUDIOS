import { NextResponse } from "next/server";

const stockSourceFiles = [
  { id: "eden-skye-001", file: "eden-skye-001_identity-lock_front-portrait_4x5_v1.png", type: "identity_lock", use: ["identity lock"], status: "generated_pending_admin_review" },
  { id: "eden-skye-002", file: "eden-skye-002_identity-lock_three-quarter_4x5_v1.png", type: "identity_lock", use: ["identity lock"], status: "generated_pending_admin_review" },
  { id: "eden-skye-003", file: "eden-skye-003_identity-lock_side-profile_4x5_v1.png", type: "identity_lock", use: ["identity lock"], status: "generated_pending_admin_review" },
  { id: "eden-skye-004", file: "eden-skye-004_portfolio_black-card-portrait_4x5_v1.png", type: "portfolio_portrait", use: ["models page", "Black Card draft"], status: "generated_pending_admin_review" },
  { id: "eden-skye-005", file: "eden-skye-005_portfolio_white-blazer_4x5_v1.png", type: "portfolio_portrait", use: ["models page"], status: "generated_pending_admin_review" },
  { id: "eden-skye-006", file: "eden-skye-006_website-hero_black-neon-stage_16x9_v1.png", type: "website_hero", use: ["home hero"], status: "generated_pending_admin_review" },
  { id: "eden-skye-007", file: "eden-skye-007_website-hero_neon-runway_16x9_v1.png", type: "website_hero", use: ["models page hero"], status: "generated_pending_admin_review" },
  { id: "eden-skye-008", file: "eden-skye-008_wardrobe-safe_full-body-black_9x16_v1.png", type: "wardrobe_safe", use: ["closet viewer"], status: "generated_pending_admin_review" },
  { id: "eden-skye-009", file: "eden-skye-009_background_walk-in-closet_16x9_v1.png", type: "background_context", use: ["closet environment"], status: "generated_pending_admin_review" },
  { id: "eden-skye-010", file: "eden-skye-010_social-vertical_hot-pink-blazer_9x16_v1.png", type: "social_vertical", use: ["social draft", "reels draft"], status: "generated_pending_admin_review" },
  { id: "eden-skye-011", file: "eden-skye-011_heygen-headshot_dark-studio_1x1_v1.png", type: "heygen_headshot", use: ["HeyGen draft"], status: "generated_pending_admin_review" },
  { id: "eden-skye-012", file: "eden-skye-012_heygen-half-body_white-blazer_9x16_v1.png", type: "heygen_half_body", use: ["HeyGen draft"], status: "generated_pending_admin_review" }
];

const registry = {
  system: "EDEN MEDIA APPROVAL STUDIO",
  status: "draft_safe_approval_surface",
  updated_at: "2026-06-12T19:25:00Z",
  source_drive_folder: {
    label: "TEMP IMAGES",
    folder_id: "1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE",
    url: "https://drive.google.com/drive/folders/1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE",
    access_status: "readable_by_connector",
    write_status: "queued_or_pending_validation_for_generated_stock_sources"
  },
  canonical_model_sources: [
    { id: "eden-skye-001", file: "eden-skye-canonical-source-v004.png", status: "approved_internal", lane: "source_images", use: ["site draft", "shopify draft", "closet draft", "heygen packet draft"] },
    { id: "eden-model-002", file: "eden-model-002-canonical-source-v001.png", status: "approved_internal", lane: "source_images", use: ["model profile", "shopify draft", "social draft"] },
    { id: "eden-model-003", file: "eden-model-003-canonical-source-v001.png", status: "approved_internal", lane: "source_images", use: ["male model profile", "shopify draft", "social draft"] },
    { id: "eden-model-004", file: "eden-model-004-canonical-source-v001.png", status: "approved_internal", lane: "source_images", use: ["male model profile", "shopify draft", "social draft"] },
    { id: "eden-model-005", file: "eden-model-005-canonical-source-v001.png", status: "approved_internal", lane: "source_images", use: ["model profile", "shopify draft", "social draft"] },
    { id: "eden-model-006", file: "eden-model-006-canonical-source-v001.png", status: "approved_internal", lane: "source_images", use: ["male model profile", "shopify draft", "social draft"] }
  ],
  canonical_stock_sources: {
    batch_id: "ES-IMG-2026-06-12-001",
    count: stockSourceFiles.length,
    current_state: "generated_pending_admin_review",
    drive_folder_id: "1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE",
    drive_folder_url: "https://drive.google.com/drive/folders/1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE",
    drive_file_status: "pending_drive_upload_or_validation",
    source_package: "EDEN_STOCK_CANONICAL_SOURCE_IMAGES_2026_06_12.zip",
    manifest: "EDEN_STOCK_CANONICAL_SOURCE_MANIFEST_2026-06-12.csv",
    contract: "EDEN_STOCK_CANONICAL_SOURCE_CONTRACT_2026-06-12.json",
    contact_sheet: "eden-stock-canonical-source-contact-sheet-2026-06-12.jpg",
    files: stockSourceFiles.map((asset) => ({
      ...asset,
      lane: "source_images",
      drive_file_id: "PENDING_DRIVE_UPLOAD",
      drive_url: "https://drive.google.com/drive/folders/1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE",
      collage_use_rule: "no_collage_crop_reference_only",
      generator_safe_use: "draft_review_only_until_human_approval"
    }))
  },
  queues: [
    { id: "source_images", label: "Canonical Source Images", next_state: "approved_site_or_quarantine", human_gate_required: true },
    { id: "video_packets", label: "Video / HeyGen Packets", next_state: "approved_heygen_packet_or_quarantine", human_gate_required: true },
    { id: "site_content", label: "Website / PWA Content", next_state: "approved_preview_or_quarantine", human_gate_required: true },
    { id: "social_shopify", label: "Social / Shopify Draft Content", next_state: "approved_draft_only_or_quarantine", human_gate_required: true }
  ],
  protected_actions: [
    "public website production",
    "live Shopify product mutation",
    "payment activation",
    "public social publishing",
    "final HeyGen avatar activation",
    "production deploy",
    "merge or release"
  ],
  gpt_bridge_contract: {
    read_endpoint: "/api/admin/eden/approval-studio",
    live_mutations_enabled: false,
    human_gate_required: true,
    default_intake_state: "generated_pending_review",
    approval_receipt_required: true,
    generator_must_read_before_generation: true,
    forbidden_source_use: ["collage crop", "reference board crop", "unapproved Drive image as final asset"]
  }
};

export async function GET() {
  return NextResponse.json(registry, {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
