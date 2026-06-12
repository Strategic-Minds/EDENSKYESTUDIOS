import { existsSync, readFileSync } from "node:fs";

const requiredDocs = [
  "docs/EDEN_SKYE_ADMIN_SYSTEM_BRIEF.md",
  "docs/EDEN_SKYE_ADMIN_STACK_CONTRACT.md",
  "docs/EDEN_SKYE_ADMIN_AGENT_TOPOLOGY.md",
  "docs/EDEN_SKYE_ADMIN_BRIDGE_MANIFEST.md",
  "docs/EDEN_SKYE_ADMIN_CONNECTOR_MAP.md",
  "docs/EDEN_SKYE_ADMIN_APPROVAL_GATES.md",
  "docs/EDEN_SKYE_ADMIN_VALIDATION_PLAN.md",
  "docs/EDEN_SKYE_ADMIN_RUNTIME_EVIDENCE_PLAN.md",
  "docs/EDEN_SKYE_ADMIN_INSTALL_PACKET.md",
  "docs/EDEN_SKYE_ADMIN_OPERATOR_PLAYBOOK.md",
  "docs/EDEN_SKYE_ADMIN_BLACK_CHAT_UI_SOURCE_INTAKE.md",
  "docs/EDEN_SKYE_ADMIN_AUTONOMOUS_BUILDER_PACKET.md"
];

const requiredManifests = [
  "config/eden-skye-admin-manifest.json",
  "config/eden-skye-admin-bridge-registry.json",
  "config/eden-skye-admin-agent-registry.json",
  "config/eden-skye-admin-approval-gates.json",
  "config/eden-skye-admin-validation-matrix.json",
  "config/eden-skye-admin-connected-systems.json",
  "config/eden-skye-admin-chat-ui-source-map.json",
  "config/eden-media-approval-studio.json"
];

const requiredAdminRoutes = [
  "app/admin/page.tsx",
  "app/admin/eden/page.tsx",
  "app/admin/agent-console/page.tsx",
  "app/admin/bridge/page.tsx",
  "app/admin/builders/page.tsx",
  "app/admin/git-vercel/page.tsx",
  "app/admin/supabase/page.tsx",
  "app/admin/drive/page.tsx",
  "app/admin/gmail-calendar/page.tsx",
  "app/admin/media/page.tsx",
  "app/admin/approval-studio/page.tsx",
  "app/admin/social/page.tsx",
  "app/admin/gates/page.tsx",
  "app/admin/workflows/page.tsx",
  "app/admin/receipts/page.tsx",
  "app/admin/evidence/page.tsx",
  "app/admin/images/page.tsx",
  "app/admin/models/page.tsx",
  "app/admin/quarantine/page.tsx"
];

const requiredApiRoutes = [
  "app/api/admin/eden/readiness/route.ts",
  "app/api/admin/eden/bridge-registry/route.ts",
  "app/api/admin/eden/approval-gates/route.ts",
  "app/api/admin/eden/evidence/route.ts",
  "app/api/admin/eden/command-queue/route.ts",
  "app/api/admin/eden/builder-docs/route.ts",
  "app/api/admin/eden/approval-studio/route.ts"
];

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

function read(path) {
  assert(existsSync(path), `Missing required file: ${path}`);
  return readFileSync(path, "utf8");
}

for (const path of [...requiredDocs, ...requiredManifests, ...requiredAdminRoutes, ...requiredApiRoutes]) {
  assert(existsSync(path), `Missing required Eden Skye Admin artifact: ${path}`);
}

const manifest = JSON.parse(read("config/eden-skye-admin-manifest.json"));
const approvalGates = JSON.parse(read("config/eden-skye-admin-approval-gates.json"));
const bridgeRegistry = JSON.parse(read("config/eden-skye-admin-bridge-registry.json"));
const sourceMap = JSON.parse(read("config/eden-skye-admin-chat-ui-source-map.json"));
const mediaApproval = JSON.parse(read("config/eden-media-approval-studio.json"));

const manifestText = JSON.stringify(manifest).toLowerCase();
const approvalText = JSON.stringify(approvalGates).toLowerCase();
const bridgeText = JSON.stringify(bridgeRegistry).toLowerCase();
const sourceText = JSON.stringify(sourceMap).toLowerCase();
const mediaApprovalText = JSON.stringify(mediaApproval).toLowerCase();

assert(manifestText.includes("eden skye admin"), "Admin manifest must identify EDEN SKYE ADMIN.");
assert(manifestText.includes("live_mutations") && manifestText.includes("false"), "Live mutations must be disabled in the admin manifest.");
assert(manifestText.includes("media approval studio") && manifestText.includes("/admin/approval-studio"), "Admin manifest must register Media Approval Studio.");
assert(approvalText.includes("human") && approvalText.includes("approval"), "Approval gates must require human approval.");
assert(approvalText.includes("production") && approvalText.includes("deploy"), "Production deploy must be approval-gated.");
assert(bridgeText.includes("github") && bridgeText.includes("vercel") && bridgeText.includes("supabase"), "Bridge registry must include core GitHub/Vercel/Supabase bridges.");
assert(sourceText.includes("01-black-chat-ui-2-7-.zip"), "Source map must identify the uploaded black chat UI package.");
assert(sourceText.includes("workspace-shell.tsx") && sourceText.includes("chat-panel.tsx"), "Source map must include the unpacked workspace/chat patterns.");
assert(sourceText.includes("bridge-command-center.tsx") && sourceText.includes("approvals/gate.ts"), "Source map must include bridge command and approval gate patterns.");
assert(sourceText.includes("/admin/agent-console") && sourceText.includes("/admin/builders"), "Source map must expose wired Eden admin routes.");
assert(mediaApprovalText.includes("1rzvppvahrbiktlj2rwiovedfwotqpase"), "Media Approval Studio must lock the readable Drive intake folder.");
assert(mediaApprovalText.includes("eden-skye-canonical-source-v004.png"), "Media Approval Studio must include the approved Eden Skye canonical source.");
assert(mediaApprovalText.includes("human_gate_required") && mediaApprovalText.includes("false"), "Media Approval Studio must expose gates and keep live mutations false.");

const shell = read("app/admin/eden-admin-shell.tsx");
assert(shell.includes("EDEN SKYE ADMIN"), "Admin shell must show the system name.");
assert(shell.includes("#030305") || shell.includes("#000"), "Admin shell must use a black background token.");
assert(shell.includes("#fff") || shell.includes("#ffffff"), "Admin shell must use white font tokens.");
assert(shell.includes("#ff2bd6"), "Admin shell must use hot pink Eden Skye accent token.");
assert(shell.includes("Unpacked Source Package"), "Admin shell must surface the unpacked black chat UI package wiring.");
assert(shell.includes("/admin/agent-console") && shell.includes("/admin/bridge") && shell.includes("/admin/builders"), "Admin shell must link the wired source-package modules.");
assert(!/beige|tan|cream|sand/i.test(shell), "Admin shell must not drift into beige/generic styling language.");
assert(!/marketing homepage/i.test(shell), "Admin shell must not render as a marketing homepage.");

const approvalStudioPage = read("app/admin/approval-studio/page.tsx");
assert(approvalStudioPage.includes("EDEN MEDIA APPROVAL STUDIO"), "Approval studio page must show the system name.");
assert(approvalStudioPage.includes("GPT Registry API"), "Approval studio page must expose GPT registry API link.");
assert(approvalStudioPage.includes("Never use a collage crop"), "Approval studio page must forbid collage crops.");

const commandQueue = read("app/api/admin/eden/command-queue/route.ts");
assert(commandQueue.includes("blocked_pending_human_approval"), "Protected commands must be blocked pending human approval.");
assert(commandQueue.includes("status: 423"), "Protected command route must return a locked status.");
assert(commandQueue.includes("live_mutations_enabled: false"), "Command queue must keep live mutations disabled.");

const builderDocsApi = read("app/api/admin/eden/builder-docs/route.ts");
assert(builderDocsApi.includes("EDEN_SKYE_ADMIN_BLACK_CHAT_UI_SOURCE_INTAKE"), "Builder docs API must expose the black chat UI source intake.");
assert(builderDocsApi.includes("EDEN_SKYE_ADMIN_AUTONOMOUS_BUILDER_PACKET"), "Builder docs API must expose the autonomous builder packet.");

console.log("Eden Skye Admin source package wiring, Media Approval Studio, manifests, UI style, and protected-action gates are installed and locked.");
