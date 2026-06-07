# HeyGen MCP Bridge

Endpoint: `https://mcp.heygen.com/mcp/v1/`

## Purpose

This bridge connects the Eden Skye Auto Social MAX OS to HeyGen for avatar video workflows, voice/video generation, personalized avatar content, and winner conversion.

HeyGen is used after content has proven itself or when the workflow requires a talking avatar, video agent, lipsync, avatar look, or voice asset. Higgsfield handles high-volume image/video generation queues; HeyGen handles personality-led avatar content and winner conversion.

## Connection Modes

### Mode 1: Connected HeyGen Tools

This Eden runtime already has connected HeyGen tools available for grounded operations such as:

- list avatar groups
- create photo/prompt avatar
- list avatar looks
- create avatar videos
- create image/video speech and lipsync flows
- list voices
- create speech
- inspect current HeyGen user

Use these tools when they are available in the current runtime.

### Mode 2: HeyGen MCP Client

Use this when an MCP-compatible client supports custom connectors.

1. Add a custom MCP connector.
2. Name: `HeyGen`.
3. URL: `https://mcp.heygen.com/mcp/v1/`.
4. Connect and sign in with the paid HeyGen account.
5. Ask the client to list HeyGen tools.
6. Use workbook queue packets for winner conversion or avatar-video jobs.

### Mode 3: Browser Handoff Surface

Use this when the runtime cannot attach a new MCP connector directly.

1. Open `/heygen/bridge` in the Eden Skye Vercel preview.
2. Pull rows from the Drive workbook's HeyGen/winner queue.
3. Format them with `/api/bridge/heygen/mcp/packet`.
4. Generate via a HeyGen-authenticated MCP client or the connected HeyGen tools.
5. Paste asset links, video IDs, voice IDs, and receipts back into Drive/Supabase.

## HeyGen Role In The Auto Social MAX OS

HeyGen should not be the first tool for every mass-content idea. It is the premium avatar layer.

Use HeyGen for:

- converting winners into avatar videos
- Eden Skye talking-avatar clips
- personalized user-facing video messages
- voice and lipsync workflows
- video-agent or AI-chat experience assets
- creator personality continuity

Use Higgsfield/GPT for:

- bulk image prompts
- bulk cinematic B-roll
- visual concept testing
- high-volume first-pass assets

## Packet Contract

Every HeyGen job packet must include:

- `queue_id`
- `source_winner_id` when applicable
- `avatar_or_model`
- `voice_direction`
- `script`
- `format`
- `aspect_ratio`
- `duration_target_seconds`
- `approval_status`
- `receipt_destination`

Example:

```json
{
  "queue_id": "HEY-WIN-0001",
  "source_winner_id": "MAX-Q0001",
  "avatar_or_model": "Eden Skye",
  "voice_direction": "warm, smooth, feminine, premium, composed, subtly magnetic, platform-safe",
  "script": "I kept this one quiet until it was ready. Now it is yours to step inside.",
  "format": "9:16 talking avatar video",
  "aspect_ratio": "9:16",
  "duration_target_seconds": 12,
  "approval_status": "Needs approval before publish",
  "receipt_destination": "Drive workbook SYSTEM_RECEIPTS"
}
```

## Governance

Allowed without owner approval:

- Prepare avatar scripts
- Prepare HeyGen job packets
- Generate internal review assets when connected tools are available and credits are approved
- Log receipts
- Attach review links to approval queue

Locked until owner approval:

- Public publishing
- Production deploy
- Shopify mutation
- Payment or discount changes
- Mass email
- Paid ad spend

## Installed Eden Routes

- `/heygen/bridge` browser handoff and connection surface
- `/api/bridge/heygen/mcp/status` readiness/status contract
- `/api/bridge/heygen/mcp/packet` queue-packet template contract

## Source Control

This bridge is installed on branch `shopify/v1-website-preview` under PR #6. Production remains locked.
