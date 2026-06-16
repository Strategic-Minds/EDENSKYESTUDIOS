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
    const { data, error } = await supabase
      .from('tool_receipts')
      .insert({
        connector: receipt.connector,
        action: receipt.action,
        receipt_json: receipt
      })
      .select('*')
      .single();

    if (error) throw error;
    return { source: 'supabase' as const, data };
  } catch (error) {
    const message = describeReceiptError(error);
    console.error('Eden receipt failed', message);
    return {
      source: 'failed' as const,
      data: receipt,
      error: message
    };
  }
}

function describeReceiptError(error: unknown) {
  if (error instanceof Error) {
    return error.message;
  }

  if (error && typeof error === 'object') {
    const maybeMessage = 'message' in error ? error.message : undefined;
    const maybeCode = 'code' in error ? error.code : undefined;
    const maybeDetails = 'details' in error ? error.details : undefined;
    const maybeHint = 'hint' in error ? error.hint : undefined;

    return JSON.stringify({
      message: maybeMessage,
      code: maybeCode,
      details: maybeDetails,
      hint: maybeHint
    });
  }

  return String(error);
}
