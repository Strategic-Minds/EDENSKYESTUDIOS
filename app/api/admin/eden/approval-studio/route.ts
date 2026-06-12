import { NextResponse } from "next/server";

const driveUrl = "https://drive.google.com/drive/folders/1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE";

const edenStockFiles = [
  "eden-skye-001_identity-lock_front-portrait_4x5_v1.png",
  "eden-skye-002_identity-lock_three-quarter_4x5_v1.png",
  "eden-skye-003_identity-lock_side-profile_4x5_v1.png",
  "eden-skye-004_portfolio_black-card-portrait_4x5_v1.png",
  "eden-skye-005_portfolio_white-blazer_4x5_v1.png",
  "eden-skye-006_website-hero_black-neon-stage_16x9_v1.png",
  "eden-skye-007_website-hero_neon-runway_16x9_v1.png",
  "eden-skye-008_wardrobe-safe_full-body-black_9x16_v1.png",
  "eden-skye-009_background_walk-in-closet_16x9_v1.png",
  "eden-skye-010_social-vertical_hot-pink-blazer_9x16_v1.png",
  "eden-skye-011_heygen-headshot_dark-studio_1x1_v1.png",
  "eden-skye-012_heygen-half-body_white-blazer_9x16_v1.png"
];

const approvedModelFiles = [
  "eden-model-002_portfolio-shopify_black-luxury_4x5_v1.png",
  "eden-model-002_full-body-viewer_social_9x16_v1.png",
  "eden-model-002_heygen-headshot_dark-studio_1x1_v1.png",
  "eden-model-003_portfolio-shopify_black-luxury_4x5_v1.png",
  "eden-model-003_full-body-viewer_social_9x16_v1.png",
  "eden-model-003_heygen-headshot_dark-studio_1x1_v1.png",
  "eden-model-004_portfolio-shopify_black-luxury_4x5_v1.png",
  "eden-model-004_full-body-viewer_social_9x16_v1.png",
  "eden-model-004_heygen-headshot_dark-studio_1x1_v1.png",
  "eden-model-005_portfolio-shopify_black-luxury_4x5_v1.png",
  "eden-model-005_full-body-viewer_social_9x16_v1.png",
  "eden-model-005_heygen-headshot_dark-studio_1x1_v1.png",
  "eden-model-006_portfolio-shopify_black-luxury_4x5_v1.png",
  "eden-model-006_full-body-viewer_social_9x16_v1.png",
  "eden-model-006_heygen-headshot_dark-studio_1x1_v1.png"
];

const approvedModelStockSources = approvedModelFiles.map((file) => {
  const [modelId, type] = file.split("_");
  return {
    asset_id: `${modelId}-${type.startsWith("portfolio") ? "portfolio" : type.startsWith("full-body") ? "full-body" : "heygen"}`,
    filename: file,
    model_id: modelId,
    status: "approved_internal",
    drive_file_id: "PENDING_DRIVE_UPLOAD"
  };
});

const withPendingDrive = (file: string) => ({
  file,
  status: "generated_pending_admin_review",
  lane: "source_images",
  drive_file_id: "PENDING_DRIVE_UPLOAD",
  drive_url: driveUrl,
  collage_use_rule: "no_collage_crop_reference_only",
  generator_safe_use: "draft_review_only_until_human_approval"
});

export async function GET() {
  return NextResponse.json({
    system: "EDEN_MEDIA_APPROVAL_STUDIO",
    status: "draft_safe_approval_surface",
    updated_at: "2026-06-12T20:00:00Z",
    source_drive_folder: {
      label: "TEMP IMAGES",
      folder_id: "1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE",
      url: driveUrl,
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
      count: edenStockFiles.length,
      source_package: "EDEN_STOCK_CANONICAL_SOURCE_IMAGES_2026_06_12.zip",
      current_state: "generated_pending_admin_review",
      drive_file_status: "pending_drive_upload_or_validation",
      files: edenStockFiles.map(withPendingDrive)
    },
    approved_model_stock_sources: {
      batch_id: "ES-APPROVED-MODELS-2026-06-12-001",
      manifest: "EDEN_APPROVED_MODELS_STOCK_SOURCE_MANIFEST_2026-06-12.csv",
      contract: "EDEN_APPROVED_MODELS_STOCK_SOURCE_CONTRACT_2026-06-12.json",
      source_package: "EDEN_APPROVED_MODELS_STOCK_SOURCE_IMAGES_2026_06_12.zip",
      contact_sheet: "eden-approved-models-stock-source-contact-sheet-2026-06-12.jpg",
      model_count: 5,
      assets_per_model: 3,
      count: 15,
      current_state: "approved_internal",
      drive_folder_id: "1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE",
      drive_folder_url: driveUrl,
      drive_file_status: "pending_drive_upload_or_validation",
      asset_types: ["portfolio_shopify", "full_body_viewer_social", "heygen_headshot"],
      files: approvedModelStockSources
    },
    content_batches: [
      {
        batch_id: "ES-CONTENT-001",
        file: "config/eden-content-draft-batch-001.json",
        status: "draft_created",
        source_registry: "/api/admin/eden/approval-studio",
        allowed_next_states: ["approved_site_draft", "approved_shopify_draft", "approved_social_draft", "approved_heygen_packet"],
        protected_action_warning: "No public publishing, live Shopify activation, final HeyGen activation, production deploy, or social posting is approved by this batch."
      }
    ],
    queues: [
      { id: "source_images", label: "Canonical Source Images", state: "approved_internal", next: "human review" },
      { id: "video_packets", label: "Video / HeyGen Packets", state: "draft_packet", next: "approval gate" },
      { id: "site_content", label: "Website / PWA Content", state: "draft", next: "preview evidence" },
      { id: "social_shopify", label: "Social / Shopify Draft Content", state: "draft_only", next: "approval gate" }
    ],
    approval_lanes: [
      { id: "source_images", label: "Canonical Source Images", allowed_outputs: ["website draft", "Shopify draft", "Closet draft", "HeyGen packet draft"], protected_outputs: ["public website production", "live Shopify product image", "public social post", "final HeyGen avatar"] },
      { id: "video_packets", label: "Video / HeyGen Packets", allowed_outputs: ["script draft", "avatar packet", "shot list", "review render"], protected_outputs: ["public video publish", "paid ad launch", "final avatar activation"] },
      { id: "site_content", label: "Website / PWA Content", allowed_outputs: ["page draft", "component draft", "preview evidence"], protected_outputs: ["production deploy", "PR ready for review", "merge/release"] },
      { id: "social_shopify", label: "Social / Shopify Draft Content", allowed_outputs: ["caption draft", "collection draft", "product copy draft"], protected_outputs: ["public posting", "live product mutation", "payment activation"] }
    ],
    gpt_bridge_contract: {
      read_endpoint: "/api/admin/eden/approval-studio",
      human_gate_required: true,
      live_mutations_enabled: false,
      default_next_state: "generated_pending_review",
      approved_internal_requires: "operator visual approval in Eden Media Approval Studio"
    },
    protected_actions: ["production deploy", "shopify live mutation", "public social publishing", "supabase production schema mutation", "drive write automation"]
  });
}
