import { NextResponse } from "next/server";

const registry = {
  system: "EDEN MEDIA APPROVAL STUDIO",
  status: "draft_safe_approval_surface",
  source_drive_folder: {
    label: "TEMP IMAGES",
    folder_id: "1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE",
    url: "https://drive.google.com/drive/folders/1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE",
    access_status: "readable_by_connector",
    write_status: "drive_write_bridge_pending"
  },
  canonical_model_sources: [
    { id: "eden-skye-001", file: "eden-skye-canonical-source-v004.png", status: "approved_internal", lane: "source_images", use: ["site draft", "shopify draft", "closet draft", "heygen packet draft"] },
    { id: "eden-model-002", file: "eden-model-002-canonical-source-v001.png", status: "approved_internal", lane: "source_images", use: ["model profile", "shopify draft", "social draft"] },
    { id: "eden-model-003", file: "eden-model-003-canonical-source-v001.png", status: "approved_internal", lane: "source_images", use: ["male model profile", "shopify draft", "social draft"] },
    { id: "eden-model-004", file: "eden-model-004-canonical-source-v001.png", status: "approved_internal", lane: "source_images", use: ["male model profile", "shopify draft", "social draft"] },
    { id: "eden-model-005", file: "eden-model-005-canonical-source-v001.png", status: "approved_internal", lane: "source_images", use: ["model profile", "shopify draft", "social draft"] },
    { id: "eden-model-006", file: "eden-model-006-canonical-source-v001.png", status: "approved_internal", lane: "source_images", use: ["male model profile", "shopify draft", "social draft"] }
  ],
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
    approval_receipt_required: true
  }
};

export async function GET() {
  return NextResponse.json(registry, {
    headers: {
      "Cache-Control": "no-store"
    }
  });
}
