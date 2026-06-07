const workbookUrl = 'https://docs.google.com/spreadsheets/d/16abS0dwSDs1H33P4FE05RBBukWAHpxq1mWMq3B4H2qA/edit?usp=drivesdk';
const mcpUrl = 'https://mcp.heygen.com/mcp/v1/';

const steps = [
  ['1', 'Choose Lane', 'Use connected HeyGen tools in this Eden runtime when available, or add the HeyGen MCP connector in an MCP-compatible client.'],
  ['2', 'Connect MCP', 'Name the connector HeyGen, paste the MCP URL, then sign in with the paid HeyGen account.'],
  ['3', 'Select Winner', 'Pull approved winner rows or avatar-video rows from the Drive control plane.'],
  ['4', 'Create Packet', 'Use the packet API shape to format the script, avatar, voice direction, duration, and aspect ratio.'],
  ['5', 'Generate', 'Create the avatar video, lipsync, voice, or video-agent asset through HeyGen.'],
  ['6', 'Receipt', 'Write video ID, asset URL, thumbnail, and status back to the Drive approval and receipt tabs.']
] as const;

const packet = `{
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
}`;

export default function HeyGenBridgePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#050505', color: '#f7efe2', fontFamily: 'Arial, Helvetica, sans-serif', padding: 32 }}>
      <section style={{ maxWidth: 1180, margin: '0 auto' }}>
        <p style={{ color: '#d8b46d', textTransform: 'uppercase', fontWeight: 800, fontSize: 12 }}>Eden Skye Studios Provider Bridge</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 48, lineHeight: 1.05, margin: '0 0 16px' }}>HeyGen MCP Bridge</h1>
        <p style={{ maxWidth: 850, color: '#d9cfbf', fontSize: 18, lineHeight: 1.55 }}>
          HeyGen is Eden's premium avatar-video layer for winner conversion, voice identity, personalized video, lipsync, and video-agent assets. This bridge supports both connected HeyGen tools and authenticated MCP handoff.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 14, margin: '26px 0' }}>
          <div style={{ border: '1px solid rgba(216,180,109,.32)', borderRadius: 8, padding: 18, background: '#0b0b0b' }}>
            <b style={{ color: '#d8b46d', textTransform: 'uppercase', fontSize: 12 }}>MCP URL</b>
            <code style={{ display: 'block', marginTop: 10, color: '#fff', wordBreak: 'break-all' }}>{mcpUrl}</code>
          </div>
          <div style={{ border: '1px solid rgba(216,180,109,.32)', borderRadius: 8, padding: 18, background: '#0b0b0b' }}>
            <b style={{ color: '#d8b46d', textTransform: 'uppercase', fontSize: 12 }}>Source Queue</b>
            <a href={workbookUrl} style={{ display: 'block', marginTop: 10, color: '#fff', wordBreak: 'break-word' }}>Open Drive control plane</a>
          </div>
          <div style={{ border: '1px solid rgba(216,180,109,.32)', borderRadius: 8, padding: 18, background: '#0b0b0b' }}>
            <b style={{ color: '#d8b46d', textTransform: 'uppercase', fontSize: 12 }}>Bridge Status</b>
            <a href="/api/bridge/heygen/mcp/status" style={{ display: 'block', marginTop: 10, color: '#fff' }}>Read status API</a>
          </div>
        </div>

        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
          <div style={{ border: '1px solid rgba(216,180,109,.28)', borderRadius: 8, padding: 18, background: '#090909' }}>
            <h2 style={{ marginTop: 0, fontFamily: 'Georgia, serif' }}>Connection Flow</h2>
            {steps.map(([number, title, copy]) => (
              <div key={number} style={{ display: 'grid', gridTemplateColumns: '36px 1fr', gap: 12, borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 14, marginTop: 14 }}>
                <span style={{ width: 30, height: 30, borderRadius: 999, display: 'grid', placeItems: 'center', background: '#d8b46d', color: '#050505', fontWeight: 900 }}>{number}</span>
                <p style={{ margin: 0, color: '#cec2b1', lineHeight: 1.45 }}><b style={{ color: '#fff' }}>{title}</b><br />{copy}</p>
              </div>
            ))}
          </div>

          <div style={{ border: '1px solid rgba(216,180,109,.28)', borderRadius: 8, padding: 18, background: '#090909' }}>
            <h2 style={{ marginTop: 0, fontFamily: 'Georgia, serif' }}>Avatar Packet Template</h2>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', background: '#020202', color: '#f7efe2', padding: 16, borderRadius: 8, border: '1px solid rgba(255,255,255,.08)', fontSize: 13, lineHeight: 1.45 }}>{packet}</pre>
            <p style={{ color: '#cec2b1', lineHeight: 1.5 }}>Use `/api/bridge/heygen/mcp/packet` to fetch this as JSON or POST queue-row fields into the same shape.</p>
          </div>
        </section>

        <section style={{ marginTop: 18, border: '1px solid rgba(216,180,109,.28)', borderRadius: 8, padding: 18, background: '#090909' }}>
          <h2 style={{ marginTop: 0, fontFamily: 'Georgia, serif' }}>Governance</h2>
          <p style={{ color: '#cec2b1', lineHeight: 1.55 }}>HeyGen is for internal review assets and approved winner conversion first. Public publishing, production deploys, Shopify mutations, payment changes, paid spend, and mass email stay locked until owner approval.</p>
        </section>
      </section>
    </main>
  );
}
