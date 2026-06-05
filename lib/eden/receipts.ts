import { createSupabaseServerClient, hasSupabaseServerConfig, usesServiceRole } from '@/lib/supabase-server';

export type EdenReceiptInput = {
  eventType: string;
  action: string;
  status: 'created' | 'allowed' | 'blocked' | 'failed' | 'dry_run';
  actor?: string;
  riskLevel?: 'green' | 'yellow' | 'red' | 'critical';
  requestId?: string;
  target?: string;
  details?: Record<string, unknown>;
};

export async function logEdenReceipt(input: EdenReceiptInput) {
  const details = input.details ?? {};
  const receipt = {
    event_type: input.eventType,
    actor: input.actor ?? 'Eden Skye Runtime',
    connector: 'eden-runtime',
    action: input.action,
    status: input.status,
    risk_level: input.riskLevel ?? 'yellow',
    request_id: input.requestId ?? null,
    target: input.target ?? null,
    details,
    receipt_json: details
  };

  if (!hasSupabaseServerConfig() || !usesServiceRole) {
    console.info('Eden receipt dry-run', receipt);
    return { source: 'dry_run' as const, data: receipt };
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase.from('tool_receipts').insert(receipt).select('*').single();

    if (error) throw error;
    return { source: 'supabase' as const, data };
  } catch (error) {
    console.error('Eden receipt failed', error);
    return {
      source: 'failed' as const,
      data: receipt,
      error: error instanceof Error ? error.message : 'Unknown receipt logging error'
    };
  }
}
