import { existsSync, readFileSync } from "node:fs";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(path) {
  assert(existsSync(path), `Missing required file: ${path}`);
  return readFileSync(path, "utf8");
}

const config = JSON.parse(read("config/eden-glam-editorial-batch-003.json"));
const api = read("app/api/admin/eden/glam-editorial/route.ts");
const page = read("app/admin/glam-editorial/page.tsx");

const required = [
  "eden-glam-editorial-001_female-black-lace-evening-dress_4x5_v1.png",
  "eden-glam-editorial-002_female-hot-pink-mini-dress_4x5_v1.png",
  "eden-glam-editorial-003_female-black-club-fashion_4x5_v1.png",
  "eden-glam-editorial-004_male-open-shirt-nightlife_4x5_v1.png",
  "eden-glam-editorial-005_male-black-tank-editorial_4x5_v1.png",
  "eden-glam-editorial-006_female-fullbody-black-gown_9x16_v1.png",
  "eden-glam-editorial-007_male-fullbody-open-shirt_9x16_v1.png",
  "eden-glam-editorial-008_female-social-closeup-glam_4x5_v1.png"
];

assert(config.batch_id === "ES-GLAM-EDITORIAL-2026-06-12-003", "Glam editorial batch id must remain locked.");
assert(config.generated_source_count === 8, "Glam editorial batch must register 8 assets.");
assert(config.status === "generated_pending_admin_review", "Glam editorial batch must start pending admin review.");
assert(config.style_correction.includes("not business suits"), "Glam batch must preserve no-suit style correction.");
assert(config.approval_policy.public_use_allowed === false, "Public use must be blocked by default.");
assert(config.approval_policy.shopify_live_allowed === false, "Live Shopify must be blocked by default.");
assert(config.approval_policy.xyla_public_posting_allowed === false, "Public Xyla/social posting must be blocked by default.");
assert(config.approval_policy.heygen_final_allowed === false, "Final HeyGen activation must be blocked by default.");
assert(page.includes("black-command-center"), "Glam editorial admin page must use black admin styling.");
assert(page.includes("Sexier Editorial Source Review"), "Glam editorial page must show the revised direction.");
assert(api.includes("EDEN GLAM EDITORIAL BATCH 003"), "Glam editorial API must expose registry identity.");
assert(api.includes("PENDING_DRIVE_UPLOAD"), "Glam editorial API must keep Drive IDs pending until verified.");
assert(api.includes("standalone_generated_no_collage_crop"), "Glam editorial API must forbid collage crops.");
assert(api.includes("adult_non_explicit_no_nudity_no_minors_no_celebrity_likeness"), "Glam editorial API must preserve safety rule.");

for (const filename of required) {
  assert(page.includes(filename), `Glam editorial page missing ${filename}`);
  assert(api.includes(filename), `Glam editorial API missing ${filename}`);
  assert(config.files.some((file) => file.filename === filename), `Glam editorial config missing ${filename}`);
}

console.log("Eden glam editorial batch 003 is registered, pending approval, and live actions remain gated.");
