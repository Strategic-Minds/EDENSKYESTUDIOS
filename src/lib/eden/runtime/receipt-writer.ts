type ReceiptInput = {
  receipt_type: string;
  actor?: string;
  status?: string;
  payload?: Record<string, unknown>;
  blocked_actions?: string[];
};

export function createReceiptDraft(input: ReceiptInput) {
  return {
    receipt_id: `eden_${Date.now()}`,
    receipt_type: input.receipt_type,
    created_at: new Date().toISOString(),
    mode: 'sandbox_only',
    actor: input.actor || 'eden-autonomous-runtime',
    source_truth: [
      'docs/eden/PACKET_MANIFEST.json',
      'docs/eden/RECEIPT_SCHEMA_MANIFEST.json',
      'docs/eden/AUTONOMOUS_INSTALL_PLAN.json'
    ],
    status: input.status || 'draft_created',
    blocked_actions: input.blocked_actions || [],
    payload: input.payload || {},
    write_status: 'draft_only_not_persisted'
  };
}
