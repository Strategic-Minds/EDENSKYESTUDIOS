export type BridgeAdapterName =
  | 'google_drive'
  | 'github'
  | 'supabase'
  | 'ai_gateway'
  | 'heygen'
  | 'xyla'
  | 'metricool'
  | 'shopify'
  | 'slack'
  | 'google_chat';

export type BridgeActionRisk =
  | 'safe_read'
  | 'safe_write_receipt'
  | 'draft_write'
  | 'paid_action'
  | 'live_publish'
  | 'customer_message'
  | 'production_change'
  | 'destructive';

export type BridgeAdapterAction<TInput = unknown, TOutput = unknown> = {
  adapter: BridgeAdapterName;
  action: string;
  risk: BridgeActionRisk;
  requiresApproval: boolean;
  execute(input: TInput): Promise<TOutput>;
};
