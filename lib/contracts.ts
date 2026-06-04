export type ApprovalStatus = 'pending' | 'approved' | 'rejected' | 'needs_revision';
export type MediaStatus = 'draft' | 'generated' | 'indexed' | 'rejected' | 'approved_private' | 'approved_public' | 'archived';
export type UsageScope = 'private_source' | 'private_test' | 'public_marketing' | 'commerce' | 'training_source';
export type RiskLevel = 'low' | 'medium' | 'high' | 'critical';
export type ApprovalRequestStatus = 'pending' | 'approved' | 'rejected' | 'cancelled' | 'expired';

export type ModelProfile = {
  id: string;
  model_code: string;
  primary_name: string;
  status: string;
  gender?: string | null;
  age?: number | null;
  archetype?: string | null;
  niche?: string | null;
};

export type MediaAsset = {
  id: string;
  model_id?: string | null;
  model_code?: string | null;
  asset_type: string;
  asset_role: string;
  file_name: string;
  drive_file_id?: string | null;
  drive_url?: string | null;
  storage_bucket?: string | null;
  storage_path?: string | null;
  sha256?: string | null;
  width?: number | null;
  height?: number | null;
  source_tool?: string | null;
  prompt?: string | null;
  status: MediaStatus;
  approval_status: ApprovalStatus;
  usage_scope: UsageScope;
  created_at: string;
  approved_at?: string | null;
};

export type ApprovalRequest = {
  id: string;
  request_type: string;
  target_table: string;
  target_id?: string | null;
  requested_action: string;
  risk_level: RiskLevel;
  status: ApprovalRequestStatus;
  requester?: string | null;
  approver?: string | null;
  approved_at?: string | null;
  rejected_at?: string | null;
  notes?: string | null;
  decision_notes?: string | null;
  created_at: string;
};

export type ApprovalDecision = 'approve' | 'reject' | 'needs_revision';

export const APPROVAL_GATES = [
  'heygen_training',
  'public_publishing',
  'shopify_mutation',
  'payment_change',
  'production_deploy',
  'public_asset_use'
] as const;
