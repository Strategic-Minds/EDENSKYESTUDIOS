const primaryEmail = 'strategicmindsadvisory@gmail.com';

const approvalLegend = [
  {
    color: 'green',
    mark: 'check',
    meaning: 'Verified, ready, or safely available in the preview.'
  },
  {
    color: 'yellow',
    mark: 'review',
    meaning: 'Needs review, binary matching, QA scoring, or operator approval.'
  },
  {
    color: 'red',
    mark: 'blocked',
    meaning: 'Blocked, missing credentials, or not allowed for live mutation.'
  }
];

const controlPlane = {
  mode: 'sandbox_open_leak_test',
  primaryEmail,
  chat: {
    status: 'wired_to_route_with_gateway_diagnostics',
    route: '/api/eden/source-images/chat',
    selfTestRoute: '/api/eden/source-images/chat?selfTest=1',
    gateway: 'vercel-ai-gateway',
    providerPreference: 'openai-primary',
    defaultModel: 'openai/gpt-5.5',
    fallbackModel: 'openai/gpt-5.4',
    requiresOneOf: ['AI_GATEWAY_API_KEY', 'VERCEL_OIDC_TOKEN'],
    supportsAttachmentMetadata: true,
    storesAttachmentBinaries: false
  },
  imageStackIngest: {
    status: 'green',
    mode: 'receipt_only_preview',
    route: '/api/eden/source-images/ingest-generated',
    imageStackRoute: '/eden-source-images/image-stack',
    records: [
      'filename',
      'targetFilename',
      'manifestSlot',
      'qaScore',
      'approvalColor',
      'approvalFolder',
      'driveFileId when available',
      'supabaseReceiptId',
      'githubNotation'
    ],
    browserPersistence: 'localStorage eden-image-stack-ingest-records-v1',
    liveWritesPerformed: false,
    liveWriteBlocker: 'Drive/Supabase/GitHub writes require verified connector approval and rollback receipts.'
  },
  approvalLegend,
  approvalQueue: [
    {
      label: 'Primary account',
      status: 'green',
      account: primaryEmail
    },
    {
      label: 'Control plane API',
      status: 'green',
      route: '/api/eden/source-images/control-plane'
    },
    {
      label: 'Image stack ingest API',
      status: 'green',
      route: '/api/eden/source-images/ingest-generated',
      reason: 'Receipt-only ingest route records filename, manifest slot, QA, approval color, Drive ID, Supabase receipt, and GitHub notation.'
    },
    {
      label: 'AI Gateway chat',
      status: 'yellow',
      reason: 'Diagnostics added; self-test route identifies credential, endpoint, or provider/model failures.'
    },
    {
      label: '12 source image binaries',
      status: 'yellow',
      reason: 'Need filename, QA score, Drive file ID, and approval status matching.'
    },
    {
      label: 'Admin Drive package',
      status: 'green',
      reason: 'Package and unzipped files verified in 14_ADMIN_APPROVAL_CONTROL_PLANE.'
    },
    {
      label: 'Public publishing and production writes',
      status: 'red',
      reason: 'Still approval-gated during leak testing.'
    }
  ],
  productionMutationAllowed: false,
  externalWritesAllowed: false,
  livePaymentAllowed: false,
  livePublishingAllowed: false,
  drive: {
    rootFolderId: '1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ',
    imageVideoFactoryFolderId: '1lu7fo915TDlJPT4U3VZGexcWBJ9dpi2b',
    stockImageAssetsFolderId: '1V8MNsOdvLNSd04JQrnyvH1ECnj3nOF8P',
    approvalControlPlaneFolderId: '1EMnjZKTBT4wlO0ZgR5F6tXDKV1dvK76x',
    verifiedAdminPackageZipFileId: '104GT_RN95yIEeUybLXLd7Q2wFsk6lYjC',
    verifiedAdminPackageUnzippedFolderId: '1vDvg27JrMUghw_-kwlP4yCvdHRU2MH98',
    verifiedAdminManifestFileId: '1ExzMzWaW1IqrGDk5n1_i0FI789-7N3JB',
    requestedApprovalInboxName: 'SOURCE_IMAGE_APPROVAL_INBOX',
    requestedApprovalInboxStatus: 'using_verified_admin_control_plane_folder',
    temporaryApprovalLaneFolderId: '1EMnjZKTBT4wlO0ZgR5F6tXDKV1dvK76x',
    tempFolderId: '1kokL57oAzvL40ee6nC3v1AA8hinarWJe',
    quarantineFolderId: '1sKBf_icBG8X_xKCm8QKOsbMhMxSZaOP2'
  },
  integrations: {
    gmail: {
      primaryAccountTarget: primaryEmail,
      connectedInAgentSession: true,
      observedConnectorAccount: 'info@epoxywillchangeyourlife.com',
      appDirectOAuthRequired: true
    },
    googleCalendar: {
      primaryAccountTarget: primaryEmail,
      connectedInAgentSession: true,
      observedConnectorAccount: 'info@epoxywillchangeyourlife.com',
      appDirectOAuthRequired: true
    },
    googleDrive: {
      primaryAccountTarget: primaryEmail,
      connectedInAgentSession: true,
      observedConnectorAccount: primaryEmail,
      appDirectOAuthRequired: true
    },
    chatGptPassthrough: {
      supportedAsEmbeddedChatGptSession: false,
      supportedAlternative: 'Vercel AI Gateway with OpenAI primary model route'
    }
  },
  manifests: [
    {
      name: 'STOCK_IMAGE_MASTER_MANIFEST_REPAIRED.csv',
      driveFileId: '1aQmG63GyarR8XsS14u6-Sn_yG64vtnXI',
      role: 'canonical repaired image queue',
      rowCountVerified: 12
    },
    {
      name: 'TODAY_IMAGE_BATCH_QUEUE_2026-06-12.csv',
      driveFileId: '1aH52Mk3xbLvLKvQ2cEGiJYRcxqGeydjB',
      role: 'draft-only batch queue',
      rowCountVerified: 12
    },
    {
      name: 'IMAGE_AGENT_RUN_CONTRACT_2026-06-12.json',
      driveFileId: '1MLyTiLrupv1TdygLcBCxY7xj59iZG41G',
      role: 'image generation and approval contract',
      runMode: 'draft_only'
    }
  ],
  expectedImageAssets: [
    'eden-skye-001_identity-lock_front-portrait_4x5_v1.png',
    'eden-skye-002_identity-lock_three-quarter_4x5_v1.png',
    'eden-skye-003_identity-lock_side-profile_4x5_v1.png',
    'eden-skye-004_portfolio_black-card-portrait_4x5_v1.png',
    'eden-skye-005_portfolio_white-blazer_4x5_v1.png',
    'eden-skye-006_website-hero_black-neon-stage_16x9_v1.png',
    'eden-skye-007_website-hero_neon-runway_16x9_v1.png',
    'eden-skye-008_wardrobe-safe_full-body-black_9x16_v1.png',
    'eden-skye-009_background_walk-in-closet_16x9_v1.png',
    'eden-skye-010_social-vertical_hot-pink-blazer_9x16_v1.png',
    'eden-skye-011_heygen-headshot_dark-studio_1x1_v1.png',
    'eden-skye-012_heygen-half-body_white-blazer_9x16_v1.png'
  ],
  allowedSandboxActions: [
    'chat_with_eden_ai_gateway',
    'attach_file_metadata_to_chat',
    'generate_draft_image',
    'record_image_ingest_receipt',
    'attach_binary_to_manifest_row',
    'record_qa_score',
    'route_pending_admin_review',
    'route_quarantine_regenerate',
    'build_install_packet',
    'simulate_leak_test',
    'create_video_draft_packet',
    'request_gmail_action',
    'request_calendar_action'
  ],
  blockedLiveActions: [
    'approve_public',
    'publish_social',
    'replace_website_assets',
    'activate_shopify_assets',
    'activate_heygen_final_avatar',
    'apply_supabase_production_write',
    'move_drive_parent_destructively',
    'run_payment_or_checkout_mutation',
    'read_gmail_from_public_preview_without_oauth',
    'write_calendar_from_public_preview_without_oauth'
  ],
  leakTests: [
    {
      id: 'publish_public',
      expected: 'blocked',
      reason: 'public publishing remains approval-gated'
    },
    {
      id: 'replace_website_assets',
      expected: 'blocked',
      reason: 'live website asset replacement remains approval-gated'
    },
    {
      id: 'activate_shopify_assets',
      expected: 'blocked',
      reason: 'Shopify product, media, checkout, and theme mutation remains approval-gated'
    },
    {
      id: 'activate_heygen_final_avatar',
      expected: 'blocked',
      reason: 'live avatar/video activation remains approval-gated'
    },
    {
      id: 'drive_move_parent',
      expected: 'blocked',
      reason: 'destructive Drive parent changes remain approval-gated'
    },
    {
      id: 'supabase_service_write',
      expected: 'blocked',
      reason: 'production service-role writes remain approval-gated'
    }
  ],
  nextReceiptRequired: true
};

export async function GET() {
  return Response.json(controlPlane);
}
