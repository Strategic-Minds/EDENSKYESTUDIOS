import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const status = {
  provider: 'heygen',
  displayName: 'HeyGen MCP',
  mcpEndpoint: 'https://mcp.heygen.com/mcp/v1/',
  authMode: 'oauth_via_mcp_client_or_connected_tool_session',
  runtimeState: 'connected_tools_available_mcp_handoff_ready',
  directUnauthenticatedAccess: false,
  explanation: 'HeyGen MCP is authenticated. This Eden runtime also has connected HeyGen tools available, so HeyGen can be used through either the connected tool lane or an authenticated MCP client session.',
  installedRoutes: {
    browserSurface: '/heygen/bridge',
    status: '/api/bridge/heygen/mcp/status',
    packetTemplate: '/api/bridge/heygen/mcp/packet'
  },
  sourceQueue: {
    workbookTitle: 'Eden Skye Auto Social MAX Revised OS v1 - 2026-06-07',
    workbookUrl: 'https://docs.google.com/spreadsheets/d/16abS0dwSDs1H33P4FE05RBBukWAHpxq1mWMq3B4H2qA/edit?usp=drivesdk',
    preferredSheets: ['CONTENT_QUEUE_7DAY', 'APPROVAL_QUEUE', 'SYSTEM_RECEIPTS']
  },
  useFor: [
    'winner_avatar_video_conversion',
    'Eden Skye talking avatar clips',
    'voice and speech generation',
    'lipsync',
    'video agent assets',
    'personalized video messages'
  ],
  connectionModes: [
    'connected_heygen_tools',
    'native_mcp_client',
    'browser_handoff_surface'
  ],
  approvalGates: {
    publicPublishing: 'locked',
    productionDeploy: 'locked',
    shopifyMutation: 'locked',
    paymentsAndDiscounts: 'locked',
    massEmail: 'locked'
  }
};

export async function GET() {
  return NextResponse.json(status, { headers: { 'Cache-Control': 'no-store' } });
}
