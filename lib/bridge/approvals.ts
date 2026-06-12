import { createSupabaseServerClient, hasSupabaseServerConfig } from '@/lib/supabase-server';
import { writeBridgeReceipt } from './receipts';

export type BridgeApprovalInput = {
  requestType: string;
  title: string;
  summary: string;
  riskLevel: 'green' | 'yellow' | 'red' | 'critical';
  payload: Record<string, unknown>;
};

export async function createApprovalRequest(input: BridgeApprovalInput) {
  if (!hasSupabaseServerConfig()) {
    await writeBridgeReceipt({
      eventType: 'bridge.approval.dry_run',
      action: 'create_approval_request',
      status: 'dry_run',
      riskLevel: input.riskLevel,
      target: input.requestType,
      details: input
    });

    return { source: 'dry_run' as const, data: input };
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('approval_requests')
    .insert({
      request_type: input.requestType,
      status: 'pending',
      title: input.title,
      summary: input.summary,
      risk_level: input.riskLevel,
      payload: input.payload,
      requested_by: 'eden_autonomous_bridge'
    })
    .select('*')
    .single();

  if (error) throw error;
  return { source: 'supabase' as const, data };
}
