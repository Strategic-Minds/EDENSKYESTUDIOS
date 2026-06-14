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

if (!Array.isArray(manifest.approvedPageBoards) || manifest.approvedPageBoards.length !== 2) {
  throw new Error("Eden Closet V2 must register the approved page and 360 boards");
}

if (!Array.isArray(manifest.approvedSourceImages) || manifest.approvedSourceImages.length !== 4) {
  throw new Error("Eden Closet V2 must register the four core approved source images");
}

if (!Array.isArray(manifest.angleFrames) || manifest.angleFrames.length !== 12) {
  throw new Error("Eden Closet V2 must register all 12 standalone 360 angle frames");
}

for (const collection of [manifest.approvedPageBoards, manifest.approvedSourceImages, manifest.angleFrames]) {
  for (const asset of collection) {
    const url = asset.shopifyCdnUrl;
    if (!url?.startsWith("https://cdn.shopify.com/")) {
      throw new Error(`Asset is not Shopify CDN hosted: ${asset.slot || asset.label}`);
    }
  }
}

const source = `${fs.readFileSync(pagePath, "utf8")}\n${fs.readFileSync(appPath, "utf8")}\n${fs.readFileSync(cssPath, "utf8")}`;
const requiredCopy = [
  "Eden's Closet",
  "Black Card",
  "AI Chat",
  "Voice Chat",
  "Video Chat",
  "Full Body 360 Viewer",
  "Virtual Closet",
  "Environments",
  "Select Your Model",
  "Dashboard",
  "Open Payment"
];

for (const token of requiredCopy) {
  if (!source.includes(token)) {
    throw new Error(`Eden Closet V2 UI is missing required copy: ${token}`);
  }
}

for (const frame of manifest.angleFrames) {
  if (!source.includes(frame.shopifyCdnUrl)) {
    throw new Error(`Eden Closet V2 UI is missing 360 frame: ${frame.label}`);
  }
}

const forbiddenPublicCopy = ["Xyla", "approval studio", "protected mutation", "source pending", "admin shell"];
for (const token of forbiddenPublicCopy) {
  if (source.toLowerCase().includes(token.toLowerCase())) {
    throw new Error(`Eden Closet V2 public UI contains forbidden internal wording: ${token}`);
  }
}

console.log("PASS Eden Closet V2 production PWA source truth, 360 frames, and member flow are wired.");
