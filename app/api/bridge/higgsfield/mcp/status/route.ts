import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const status = {
  provider: 'higgsfield',
  displayName: 'Higgsfield MCP',
  mcpEndpoint: 'https://mcp.higgsfield.ai/mcp',
  officialSetupUrl: 'https://higgsfield.ai/mcp',
  authMode: 'oauth_via_mcp_client',
  runtimeState: 'handoff_ready_connector_auth_required',
  directUnauthenticatedAccess: false,
  explanation: 'Higgsfield MCP is an OAuth-authenticated remote MCP server. Add the endpoint as a custom MCP connector in a compatible client, sign in, then the agent can call its tools. This route exposes Eden queue readiness and handoff state; it does not bypass Higgsfield OAuth.',
  installedRoutes: {
    browserSurface: '/higgsfield/bridge',
    status: '/api/bridge/higgsfield/mcp/status',
    packetTemplate: '/api/bridge/higgsfield/mcp/packet'
  },
  sourceQueue: {
    workbookTitle: 'Eden Skye Auto Social MAX Revised OS v1 - 2026-06-07',
    workbookUrl: 'https://docs.google.com/spreadsheets/d/16abS0dwSDs1H33P4FE05RBBukWAHpxq1mWMq3B4H2qA/edit?usp=drivesdk',
    sheet: 'CONTENT_QUEUE_7DAY',
    sevenDayQueueSize: 1365
  },
  connectionModes: [
    'native_mcp_client',
    'browser_handoff_surface',
    'future_dedicated_worker'
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
