import fs from "node:fs";

const manifestPath = "config/eden-closet-v2-ultralifelike-pwa.json";
const pagePath = "app/closet-v2/page.tsx";
const appPath = "app/closet-v2/ClosetV2Experience.tsx";
const cssPath = "app/closet-v2/closet-v2.css";

for (const path of [manifestPath, pagePath, appPath, cssPath]) {
  if (!fs.existsSync(path)) {
    throw new Error(`Missing Eden Closet V2 required file: ${path}`);
  }
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf8"));
if (manifest.system !== "EDEN_CLOSET_V2_ULTRALIFELIKE_PWA") {
  throw new Error("Eden Closet V2 manifest system id is wrong");
}

if (manifest.livePaymentActivation !== false) {
  throw new Error("Eden Closet V2 must not activate live payment automatically");
}

if (manifest.memberEntitlement !== "black_card_member") {
  throw new Error("Eden Closet V2 must target black_card_member entitlement");
}

if (!Array.isArray(manifest.approvedSourceImages) || manifest.approvedSourceImages.length !== 4) {
  throw new Error("Eden Closet V2 must register the four approved source images");
}

for (const asset of manifest.approvedSourceImages) {
  if (!asset.shopifyCdnUrl?.startsWith("https://cdn.shopify.com/")) {
    throw new Error(`Source image is not Shopify CDN hosted: ${asset.slot}`);
  }
  if (!asset.uploadedFile?.startsWith("user_files/")) {
    throw new Error(`Source image is missing uploaded file lineage: ${asset.slot}`);
  }
}

const source = `${fs.readFileSync(pagePath, "utf8")}\n${fs.readFileSync(appPath, "utf8")}\n${fs.readFileSync(cssPath, "utf8")}`;
const requiredCopy = [
  "Eden's Closet",
  "Black Card",
  "AI Chat",
  "Voice",
  "Video",
  "Full Body",
  "Wardrobe",
  "Environment",
  "Shopify"
];

for (const token of requiredCopy) {
  if (!source.includes(token)) {
    throw new Error(`Eden Closet V2 UI is missing required copy: ${token}`);
  }
}

const forbiddenPublicCopy = ["Xyla", "approval studio", "protected mutation", "source pending"];
for (const token of forbiddenPublicCopy) {
  if (source.toLowerCase().includes(token.toLowerCase())) {
    throw new Error(`Eden Closet V2 public UI contains forbidden internal wording: ${token}`);
  }
}

console.log("PASS Eden Closet V2 ultra-lifelike PWA is wired with approved assets and gated payment flow.");
