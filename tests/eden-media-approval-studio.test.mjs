import { existsSync, readFileSync } from "node:fs";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(path) {
  assert(existsSync(path), `Missing required file: ${path}`);
  return readFileSync(path, "utf8");
}

const page = read("app/admin/approval-studio/page.tsx");
const api = read("app/api/admin/eden/approval-studio/route.ts");
const registry = JSON.parse(read("config/eden-media-approval-studio.json"));

assert(page.includes("EDEN MEDIA APPROVAL STUDIO"), "Approval studio page must show system name.");
assert(page.includes("1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE"), "Approval studio must reference the readable Drive intake folder.");
assert(page.includes("eden-skye-canonical-source-v004.png"), "Approval studio must include approved Eden Skye V004 source.");
assert(page.includes("EDEN_STOCK_CANONICAL_SOURCE_MANIFEST_2026-06-12.csv"), "Approval studio must show the generated stock source manifest.");
assert(page.includes("eden-skye-012_heygen-half-body_white-blazer_9x16_v1.png"), "Approval studio must show the full 12-image stock source batch.");
assert(page.includes("Generated pending admin review"), "Approval studio must show generated source images as pending admin review.");
assert(page.includes("pending Drive upload") || page.includes("pending drive upload"), "Approval studio must expose pending Drive upload state.");
assert(page.includes("Video / HeyGen Packets"), "Approval studio must cover video/HeyGen packets.");
assert(page.includes("Site Content"), "Approval studio must cover website/PWA content.");
assert(page.includes("Social / Shopify"), "Approval studio must cover social and Shopify draft content.");
assert(page.includes("Never use a collage crop"), "Approval studio must forbid collage crops as final sources.");
assert(page.includes("live mutation locked"), "Approval studio must visibly lock live mutations.");
assert(page.includes("#030305") && page.includes("#ff2bd6"), "Approval studio must preserve black/hot-pink admin styling.");

assert(api.includes("canonical_stock_sources"), "Approval studio API must expose canonical stock sources.");
assert(api.includes("eden-skye-006_website-hero_black-neon-stage_16x9_v1.png"), "Approval studio API must include website hero source.");
assert(api.includes("PENDING_DRIVE_UPLOAD"), "Approval studio API must expose pending Drive file IDs rather than fake them.");
assert(api.includes("live_mutations_enabled: false"), "Approval studio API must keep live mutations disabled.");
assert(api.includes("human_gate_required: true"), "Approval studio API must require human gates.");
assert(api.includes("approved_internal"), "Approval studio API must expose approved internal source state.");
assert(api.includes("protected_actions"), "Approval studio API must expose protected actions.");

assert(registry.system === "EDEN MEDIA APPROVAL STUDIO", "Registry must identify Eden Media Approval Studio.");
assert(registry.source_drive_folder.folder_id === "1RZVPpvAhrBikTLJ2rwIOVedfwoTqpAsE", "Registry must lock the readable Drive source folder.");
assert(registry.canonical_stock_sources.count === 12, "Registry must include the 12-image stock source batch.");
assert(registry.canonical_stock_sources.drive_file_status === "pending_drive_upload_or_validation", "Registry must keep Drive IDs pending until verified.");
assert(JSON.stringify(registry.canonical_stock_sources.files).includes("eden-skye-008_wardrobe-safe_full-body-black_9x16_v1.png"), "Registry must include closet viewer source image.");
assert(registry.gpt_bridge_contract.live_mutations_enabled === false, "Registry must block live mutations.");
assert(registry.gpt_bridge_contract.human_gate_required === true, "Registry must require human approval.");
assert(JSON.stringify(registry).includes("approved_internal_after_user_confirmation"), "Registry must capture the approved internal model source state.");

console.log("Eden Media Approval Studio page, API, stock source registry, and guardrails are installed.");
