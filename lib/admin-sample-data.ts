import type { ApprovalRequest, MediaAsset } from './contracts';

export const sampleMediaAssets: MediaAsset[] = [
  {
    id: 'sample-f01-primary-portrait',
    model_code: 'F01',
    asset_type: 'portrait',
    asset_role: 'heygen_primary_candidate',
    file_name: 'f01_eden_skye_heygen_primary_portrait.png',
    drive_url: null,
    sha256: '57fbe694ddf546a1c356d7acac043f75678ba8c5edbda43d544d6e79700fc44c',
    width: 1122,
    height: 1402,
    source_tool: 'imagegen',
    status: 'indexed',
    approval_status: 'pending',
    usage_scope: 'private_source',
    created_at: '2026-06-04T00:00:00.000Z'
  },
  {
    id: 'sample-f01-base-layer-sheet',
    model_code: 'F01',
    asset_type: 'model_sheet',
    asset_role: 'private_body_frame_reference',
    file_name: 'f01_eden_skye_base_layer_multi_angle_sheet.png',
    drive_url: null,
    sha256: null,
    width: 1536,
    height: 1024,
    source_tool: 'imagegen',
    status: 'generated',
    approval_status: 'pending',
    usage_scope: 'private_source',
    created_at: '2026-06-04T00:00:00.000Z'
  }
];

export const sampleApprovalRequests: ApprovalRequest[] = [
  {
    id: 'sample-approve-f01-portrait',
    request_type: 'public_asset_use',
    target_table: 'media_assets',
    target_id: 'sample-f01-primary-portrait',
    requested_action: 'Approve F01 primary portrait for private HeyGen source preparation.',
    risk_level: 'high',
    status: 'pending',
    requester: 'Eden Skye',
    notes: 'Do not train HeyGen or publish publicly until explicit approval is recorded.',
    created_at: '2026-06-04T00:00:00.000Z'
  }
];
