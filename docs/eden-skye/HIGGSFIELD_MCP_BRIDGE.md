# Higgsfield MCP Bridge

Endpoint: `https://mcp.higgsfield.ai/mcp`

Official setup page: https://higgsfield.ai/mcp

## Purpose

This bridge connects the Eden Skye Auto Social MAX OS content queue to Higgsfield's MCP generation surface for images, video, character training, marketing video generation, video analysis, viral clips, and virality scoring.

Higgsfield MCP is not a plain public REST API. It is a remote MCP server using OAuth-style authentication through an MCP-compatible client. Direct unauthenticated requests to `https://mcp.higgsfield.ai/mcp` return unauthorized by design.

## Supported Connection Modes

### Mode 1: Native MCP Client

Use this when the runtime supports custom MCP connectors.

1. Open the MCP-compatible client settings.
2. Add a custom connector.
3. Name: `Higgsfield`.
4. URL: `https://mcp.higgsfield.ai/mcp`.
5. Connect and sign in with the Higgsfield account.
6. Ask the agent to list tools and confirm Higgsfield generation/history tools are visible.

Once connected, the agent can submit prompt packets from the Drive workbook queue and return asset URLs/receipts.

### Mode 2: Browser Handoff Surface

Use this when the runtime cannot attach a new MCP connector directly.

1. Open `/higgsfield/bridge` in the Eden Skye Vercel preview.
2. Open the Drive control plane queue.
3. Copy a batch packet from `CONTENT_QUEUE_7DAY`.
4. Paste the packet into a Higgsfield-connected MCP client.
5. Generate assets.
6. Put generated links into the workbook approval/asset columns.
7. Log receipts in `SYSTEM_RECEIPTS`.

This mode is immediately usable and does not require pretending the website can bypass Higgsfield OAuth.

### Mode 3: Future Dedicated Worker

Use this only after credentials/session handling is approved.

A dedicated worker can run an MCP client session, keep OAuth state securely, process queue rows, poll jobs, and write results to Drive/Supabase. This should run behind approval gates and budget limits.

## Queue Contract

Every Higgsfield job packet must include:

- `queue_id`
- `platform`
- `model_or_persona`
- `format`
- `hook`
- `prompt`
- `aspect_ratio`
- `duration_seconds` when video
- `approval_status`
- `receipt_destination`

Example:

```json
{
  "queue_id": "MAX-Q0001",
  "platform": "TikTok",
  "model_or_persona": "Eden Skye",
  "format": "9:16 short video",
  "hook": "POV: luxury AI muse becomes impossible to ignore in one clean move",
  "prompt": "Ultra-realistic cinematic luxury editorial vertical video, platform-safe, premium lighting, strong first-frame clarity, no explicit nudity.",
  "aspect_ratio": "9:16",
  "duration_seconds": 8,
  "approval_status": "Needs approval before publish",
  "receipt_destination": "Drive workbook SYSTEM_RECEIPTS"
}
```

## Governance

Allowed without owner approval:

- Generate draft prompts
- Prepare Higgsfield batch packets
- Score assets
- Write queue and receipt updates
- Prepare approval previews

Locked until owner approval:

- Public publishing
- Production deployment
- Shopify mutation
- Payment or discount changes
- Mass email
- Paid ad spend

## Installed Eden Routes

- `/higgsfield/bridge` browser handoff and connection surface
- `/api/bridge/higgsfield/mcp/status` readiness/status contract
- `/api/bridge/higgsfield/mcp/packet` queue-packet template contract

## Source Control

This bridge is installed on branch `shopify/v1-website-preview` under PR #6. Production remains locked.
