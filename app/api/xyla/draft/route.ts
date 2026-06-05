import { NextResponse } from 'next/server';
import { checkApprovalGate } from '@/lib/eden/governance';
import { logEdenReceipt } from '@/lib/eden/receipts';

export const dynamic = 'force-dynamic';

const defaultChannels = ['facebook', 'instagram', 'x', 'tiktok', 'pinterest', 'snapchat'];

type DraftBody = Record<string, unknown>;

function stringField(body: DraftBody, key: string, fallback: string) {
  const value = body[key];
  return typeof value === 'string' && value.trim() ? value.trim() : fallback;
}

function channelsField(body: DraftBody) {
  const value = body.channels;
  if (!Array.isArray(value)) return defaultChannels;

  const channels = value.filter((channel): channel is string => typeof channel === 'string' && channel.trim().length > 0);
  return channels.length > 0 ? channels : defaultChannels;
}

function buildPacket(body: DraftBody = {}) {
  const modelName = stringField(body, 'modelName', 'Eden Skye');
  const wardrobeLook = stringField(body, 'wardrobeLook', 'Black Card Satin');
  const posePreset = stringField(body, 'posePreset', 'Standing editorial');
  const userName = stringField(body, 'userName', 'Guest');

  return {
    packet_type: 'xyla_video_draft',
    approval_status: 'draft_only',
    publishing_enabled: false,
    shopify_mutation_enabled: false,
    live_avatar_enabled: false,
    model: {
      name: modelName,
      fictional_ai_identity: true,
      persona: stringField(body, 'persona', 'warm, composed, premium, emotionally intelligent, platform-safe')
    },
    personalization: {
      user_name: userName,
      passions: stringField(body, 'passions', 'luxury, AI media, beauty, freedom'),
      desired_energy: stringField(body, 'desiredEnergy', 'intimate, strategic, calm, high-trust'),
      boundaries: stringField(body, 'boundaries', 'adult, fictional, non-explicit, platform-safe, approval-gated')
    },
    scene: {
      wardrobe_look: wardrobeLook,
      pose_preset: posePreset,
      visual_prompt: stringField(
        body,
        'visualPrompt',
        `${modelName} in ${wardrobeLook}, ${posePreset}, cinematic luxury editorial lighting, polished fictional AI creator brand, tasteful and platform-safe`
      )
    },
    script: {
      hook: stringField(body, 'hook', 'The room changes when the energy is designed for you.'),
      spoken_line: stringField(body, 'spokenLine', 'Tell Eden what you want the moment to feel like, and she will shape the look, the mood, and the message.'),
      caption: stringField(body, 'caption', 'A premium AI creator studio built around mood, memory, wardrobe, and cinematic restraint.'),
      cta: stringField(body, 'cta', 'Enter Edens Closet')
    },
    channels: channelsField(body).map((channel) => ({
      channel,
      status: 'draft',
      output: {
        hook_variant: `${channel}: ${stringField(body, 'hook', 'The room changes when the energy is designed for you.')}`,
        caption_required: true,
        publish_locked: true
      }
    }))
  };
}

export async function GET() {
  const packet = buildPacket();
  return NextResponse.json({
    name: 'Xyla draft packet API',
    route: '/api/xyla/draft',
    ready: true,
    mode: 'draft_only',
    packet,
    locked_actions: ['public publishing', 'metricool publish', 'shopify mutation', 'payment change', 'live avatar session', 'production deploy']
  });
}

export async function POST(request: Request) {
  const body = (await request.json().catch(() => ({}))) as DraftBody;
  const requestedAction = stringField(body, 'requestedAction', 'draft xyla video packet');
  const gate = checkApprovalGate(requestedAction);

  if (!gate.allowed) {
    const receipt = await logEdenReceipt({
      eventType: 'xyla.draft.gate_blocked',
      action: requestedAction,
      status: 'blocked',
      riskLevel: gate.risk,
      target: gate.matchedGate,
      details: { recommendation: gate.recommendation }
    });

    return NextResponse.json({ blocked: true, gate, receipt }, { status: 423 });
  }

  const packet = buildPacket(body);
  const receipt = await logEdenReceipt({
    eventType: 'xyla.draft.created',
    action: 'create_draft_packet',
    status: 'dry_run',
    riskLevel: gate.risk,
    target: 'xyla',
    details: { packet }
  });

  return NextResponse.json({ ready: true, gate, packet, receipt });
}
