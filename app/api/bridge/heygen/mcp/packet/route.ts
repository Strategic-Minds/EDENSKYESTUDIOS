import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const defaultPacket = {
  provider: 'heygen',
  connection: {
    mcpEndpoint: 'https://mcp.heygen.com/mcp/v1/',
    authMode: 'oauth_via_mcp_client_or_connected_tool_session',
    executionMode: 'connected_heygen_tools_or_native_mcp_client'
  },
  job: {
    queue_id: 'HEY-WIN-0001',
    source_winner_id: 'MAX-Q0001',
    avatar_or_model: 'Eden Skye',
    voice_direction: 'warm, smooth, feminine, premium, composed, subtly magnetic, platform-safe',
    script: 'I kept this one quiet until it was ready. Now it is yours to step inside.',
    format: '9:16 talking avatar video',
    aspect_ratio: '9:16',
    duration_target_seconds: 12,
    approval_status: 'Needs approval before publish',
    receipt_destination: 'Drive workbook SYSTEM_RECEIPTS'
  },
  expectedReceipt: {
    queue_id: 'HEY-WIN-0001',
    heygen_video_id: 'Paste HeyGen video ID here',
    asset_url: 'Paste HeyGen output URL here',
    thumbnail_url: 'Paste thumbnail or preview URL here',
    generated_at: 'ISO timestamp',
    tool_used: 'HeyGen connected tool or MCP tool name',
    status: 'generated_pending_review'
  },
  instruction: 'Use this packet for HeyGen avatar or winner-conversion jobs. Replace the job fields with the selected winner or queue row, generate through connected HeyGen tools or an authenticated HeyGen MCP client, then write the receipt back to the Drive control plane.'
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
    instruction: 'Packet accepted for HeyGen handoff formatting. Submit this payload through connected HeyGen tools or an authenticated HeyGen MCP client; this endpoint does not bypass HeyGen authentication.'
  }, { headers: { 'Cache-Control': 'no-store' } });
}
