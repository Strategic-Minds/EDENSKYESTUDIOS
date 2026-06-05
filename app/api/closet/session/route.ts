import { NextResponse } from 'next/server';
import { checkApprovalGate } from '@/lib/eden/governance';
import { logEdenReceipt } from '@/lib/eden/receipts';

export const dynamic = 'force-dynamic';

type ClosetBody = Record<string, unknown>;

const wardrobeLooks = ['Black Card Satin', 'After Dark Blazer', 'Pearl Studio Set', 'Hot Pink Signal', 'Cinematic Night Out', 'Shopify Feature Look'];
const posePresets = ['Standing editorial', 'Seated lounge', 'Runway walk', 'Product hold', 'Close portrait', 'Creator desk'];

function stringField(body: ClosetBody, key: string, fallback: string) {
  const value = body[key];
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function buildSession(body: ClosetBody = {}) {
  return {
    session_type: 'edens_closet_draft',
    status: 'draft_only',
    storage_enabled: false,
    live_video_enabled: false,
    live_voice_enabled: false,
    model: {
      selected: stringField(body, 'modelName', 'Eden Skye'),
      fictional_ai_identity: true,
      personality: stringField(body, 'personality', 'soft command, warm intelligence, polished intimacy, strategic clarity')
    },
    user_profile: {
      name: stringField(body, 'userName', 'Jeremy'),
      passions: stringField(body, 'passions', 'luxury brand building, AI media, freedom, beauty'),
      desires: stringField(body, 'desires', 'a custom, emotionally intelligent premium AI companion experience'),
      needs: stringField(body, 'needs', 'clarity, momentum, calm support, and content leverage'),
      boundaries: stringField(body, 'boundaries', 'platform-safe, non-explicit, approval-gated')
    },
    changing_room: {
      wardrobe_look: stringField(body, 'wardrobeLook', wardrobeLooks[0]),
      pose_preset: stringField(body, 'posePreset', posePresets[0]),
      angle_set: ['front', 'three-quarter', 'side', 'close portrait'],
      wardrobe_options: wardrobeLooks,
      pose_options: posePresets
    },
    voice_video: {
      chat_ready: true,
      voice_ready: 'planned_after_approval',
      video_chat_ready: 'planned_after_approval',
      heygen_live_session_locked: true
    },
    xyla_bridge: {
      draft_route: '/api/xyla/draft',
      output_type: 'video_packet',
      channels: ['facebook', 'instagram', 'x', 'tiktok', 'pinterest', 'snapchat']
    }
  };
}

export async function GET() {
  return NextResponse.json({
    name: 'Edens Closet session API',
    route: '/api/closet/session',
    ready: true,
    mode: 'draft_only',
    session: buildSession()
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as ClosetBody;
  const requestedAction = stringField(body, 'requestedAction', 'draft closet session');
  const gate = checkApprovalGate(requestedAction);

  if (!gate.allowed) {
    const receipt = await logEdenReceipt({
      eventType: 'closet.session.gate_blocked',
      action: requestedAction,
      status: 'blocked',
      riskLevel: gate.risk,
      target: gate.matchedGate,
      details: { recommendation: gate.recommendation }
    });

    return NextResponse.json({ blocked: true, gate, receipt }, { status: 423 });
  }

  const session = buildSession(body);
  const receipt = await logEdenReceipt({
    eventType: 'closet.session.created',
    action: 'create_closet_draft_session',
    status: 'dry_run',
    riskLevel: gate.risk,
    target: 'edens_closet',
    details: { session }
  });

  return NextResponse.json({ ready: true, gate, session, receipt });
}
