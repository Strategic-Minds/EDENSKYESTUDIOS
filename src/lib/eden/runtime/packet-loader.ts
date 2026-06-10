import { EDEN_RUNTIME_LOCKS } from './locks';

export const packetOrder = [
  'docs/eden/PACKET_MANIFEST.json',
  'docs/eden/AUTONOMOUS_INSTALL_PLAN.json',
  'docs/eden/RUNTIME_IMPLEMENTATION_BACKLOG.json',
  'docs/eden/WORKFLOW_RUNTIME_MANIFEST.json',
  'docs/eden/CONTROL_PLANE_MANIFEST.json',
  'docs/eden/SUPABASE_SCHEMA_MANIFEST.json',
  'docs/eden/RECEIPT_SCHEMA_MANIFEST.json'
];

export const requiredRuntimeFiles = [
  'vercel.json',
  'app/api/eden/cron/route.ts',
  'app/api/eden/status/route.ts',
  'app/api/eden/install/route.ts',
  'src/lib/eden/runtime/packet-loader.ts',
  'src/lib/eden/runtime/receipt-writer.ts',
  'src/lib/eden/runtime/validation-agent.ts',
  'src/lib/eden/runtime/workflow-runner.ts',
  'src/lib/eden/runtime/shopify-feed.ts',
  'supabase/migrations/001_eden_core_schema.sql'
];

export function getPacketOrder() { return packetOrder; }
export function getRequiredRuntimeFiles() { return requiredRuntimeFiles; }
export function getRuntimeLocks() { return EDEN_RUNTIME_LOCKS; }

export function calculateReadiness(installed: string[]) {
  const total = requiredRuntimeFiles.length;
  const complete = requiredRuntimeFiles.filter((file) => installed.includes(file)).length;
  return Math.round((complete / total) * 100);
}
