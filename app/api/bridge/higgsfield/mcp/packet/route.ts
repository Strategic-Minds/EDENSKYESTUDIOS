import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const defaultPacket = {
  provider: 'higgsfield',
  connection: {
    mcpEndpoint: 'https://mcp.higgsfield.ai/mcp',
    authMode: 'oauth_via_mcp_client',
    executionMode: 'browser_handoff_or_native_mcp_client'
  },
  job: {
    queue_id: 'MAX-Q0001',
    platform: 'TikTok',
    model_or_persona: 'Eden Skye',
    format: '9:16 short video',
    hook: 'POV: luxury AI muse becomes impossible to ignore in one clean move',
    prompt: 'Ultra-realistic cinematic luxury editorial vertical video for Eden Skye, platform-safe, premium lighting, strong first-frame clarity, refined glamour styling, no explicit nudity.',
    aspect_ratio: '9:16',
    duration_seconds: 8,
    approval_status: 'Needs approval before publish',
    receipt_destination: 'Drive workbook SYSTEM_RECEIPTS'
  },
  expectedReceipt: {
    queue_id: 'MAX-Q0001',
    asset_url: 'Paste Higgsfield output URL here',
    thumbnail_url: 'Paste thumbnail or preview URL here',
    generated_at: 'ISO timestamp',
    tool_used: 'Higgsfield MCP tool name',
    status: 'generated_pending_review'
  },
  instruction: 'Use this packet as the base shape for Higgsfield MCP generation. Replace the job fields with the selected row from CONTENT_QUEUE_7DAY, generate through a connected Higgsfield MCP client, then write the receipt back to the Drive control plane.'
};

export async function GET() {
  return NextResponse.json(defaultPacket, { headers: { 'Cache-Control': 'no-store' } });
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));

  return NextResponse.json({
    ...defaultPacket,
    job: {
      ...defaultPacket.job,
      ...body
    },
    instruction: 'Packet accepted for handoff formatting. Submit this payload through an authenticated Higgsfield MCP client; this endpoint does not call Higgsfield directly because OAuth is owned by the MCP client session.'
  }, { headers: { 'Cache-Control': 'no-store' } });
}
