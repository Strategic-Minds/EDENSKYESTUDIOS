const workbookUrl = 'https://docs.google.com/spreadsheets/d/16abS0dwSDs1H33P4FE05RBBukWAHpxq1mWMq3B4H2qA/edit?usp=drivesdk';
const mcpUrl = 'https://mcp.higgsfield.ai/mcp';

const steps = [
  ['1', 'Connect MCP', 'In a compatible client, add a custom connector named Higgsfield with the MCP URL, then sign in with the Higgsfield account.'],
  ['2', 'Pull Queue', 'Open the Drive control plane and select rows from CONTENT_QUEUE_7DAY that need generation.'],
  ['3', 'Create Packet', 'Use the packet API shape to format queue rows into Higgsfield-ready image/video jobs.'],
  ['4', 'Generate', 'Submit the packet through the authenticated Higgsfield MCP client and wait for the asset result.'],
  ['5', 'Receipt', 'Paste the generated asset URL, thumbnail, tool name, and timestamp back into Drive/Supabase receipts.'],
  ['6', 'Approve', 'Keep every public post behind the approval queue until Jeremy approves it.']
] as const;

const packet = `{
  "queue_id": "MAX-Q0001",
  "platform": "TikTok",
  "model_or_persona": "Eden Skye",
  "format": "9:16 short video",
  "hook": "POV: luxury AI muse becomes impossible to ignore in one clean move",
  "prompt": "Ultra-realistic cinematic luxury editorial vertical video for Eden Skye, platform-safe, premium lighting, strong first-frame clarity, refined glamour styling, no explicit nudity.",
  "aspect_ratio": "9:16",
  "duration_seconds": 8,
  "approval_status": "Needs approval before publish",
  "receipt_destination": "Drive workbook SYSTEM_RECEIPTS"
}`;

export default function HiggsfieldBridgePage() {
  return (
    <main style={{ minHeight: '100vh', background: '#050505', color: '#f7efe2', fontFamily: 'Arial, Helvetica, sans-serif', padding: 32 }}>
      <section style={{ maxWidth: 1180, margin: '0 auto' }}>
        <p style={{ color: '#d8b46d', textTransform: 'uppercase', fontWeight: 800, fontSize: 12 }}>Eden Skye Studios Provider Bridge</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 48, lineHeight: 1.05, margin: '0 0 16px' }}>Higgsfield MCP Bridge</h1>
        <p style={{ maxWidth: 820, color: '#d9cfbf', fontSize: 18, lineHeight: 1.55 }}>
          Higgsfield MCP is an OAuth-authenticated remote MCP server. This page is the governed browser handoff surface for connecting Eden's content queue to Higgsfield generation without bypassing authentication or approval gates.
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
            <a href="/api/bridge/higgsfield/mcp/status" style={{ display: 'block', marginTop: 10, color: '#fff' }}>Read status API</a>
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
            <h2 style={{ marginTop: 0, fontFamily: 'Georgia, serif' }}>Job Packet Template</h2>
            <pre style={{ whiteSpace: 'pre-wrap', wordBreak: 'break-word', background: '#020202', color: '#f7efe2', padding: 16, borderRadius: 8, border: '1px solid rgba(255,255,255,.08)', fontSize: 13, lineHeight: 1.45 }}>{packet}</pre>
            <p style={{ color: '#cec2b1', lineHeight: 1.5 }}>Use `/api/bridge/higgsfield/mcp/packet` to fetch this as JSON or POST queue-row fields into the same shape.</p>
          </div>
        </section>

        <section style={{ marginTop: 18, border: '1px solid rgba(216,180,109,.28)', borderRadius: 8, padding: 18, background: '#090909' }}>
          <h2 style={{ marginTop: 0, fontFamily: 'Georgia, serif' }}>Governance</h2>
          <p style={{ color: '#cec2b1', lineHeight: 1.55 }}>This surface can prepare and route generation work. It does not publish, deploy production, mutate Shopify, change payments, send mass email, or spend on ads without explicit owner approval.</p>
        </section>
      </section>
    </main>
  );
}
