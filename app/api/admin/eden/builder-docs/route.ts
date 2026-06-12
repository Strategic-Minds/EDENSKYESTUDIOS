export const dynamic = "force-dynamic";

const builderDocs = [
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

const sourceFiles = [
  "components/workspace/workspace-shell.tsx",
  "components/workspace/chat-panel.tsx",
  "components/bridge-command-center.tsx",
  "lib/autonomous-bridge-registry.ts",
  "lib/approvals/gate.ts",
  "lib/agent/workflow-orchestrator.ts",
  "lib/agent/safety-validator.ts",
  "lib/browser/evidence.ts",
  "app/api/bridge/preflight/route.ts",
  "app/api/bridge/policy-check/route.ts",
  "app/api/bridge/command/route.ts",
  "app/api/bridge/zero-inference/route.ts"
];

export async function GET() {
  return Response.json(
    {
      system: "EDEN SKYE ADMIN",
      source_package: "01-black-chat-ui-2-7-.zip",
      source_map_manifest: "config/eden-skye-admin-chat-ui-source-map.json",
      builder_docs: builderDocs,
      source_files_adapted: sourceFiles,
      live_mutations_enabled: false,
      visual_approval: "pending_chromium_evidence_review"
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}
