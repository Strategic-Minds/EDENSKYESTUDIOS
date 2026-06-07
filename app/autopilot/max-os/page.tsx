const workbookUrl = 'https://docs.google.com/spreadsheets/d/16abS0dwSDs1H33P4FE05RBBukWAHpxq1mWMq3B4H2qA/edit?usp=drivesdk';

const gates = [
  ['Public publishing', 'Locked'],
  ['Production deploy', 'Locked'],
  ['Shopify mutations', 'Locked'],
  ['Payments and discounts', 'Locked'],
  ['Mass email', 'Locked']
] as const;

const systems = [
  ['Drive', 'Installed native Google Sheet'],
  ['GitHub', 'Installed docs, config, API, preview page'],
  ['Vercel', 'Preview branch ready'],
  ['Metricool', 'Facebook, Instagram, TikTok connected'],
  ['Supabase', 'Schema targets defined; writes require approval'],
  ['Shopify', 'Revenue engine defined; mutations require approval'],
  ['HeyGen', 'Winner avatar conversion queue'],
  ['Higgsfield', 'Queue ready; direct execution needs connector/API']
] as const;

export default function MaxOsPage() {
  return (
    <main style={{ minHeight: '100vh', background: '#050505', color: '#f7efe2', fontFamily: 'Arial, Helvetica, sans-serif', padding: 32 }}>
      <section style={{ maxWidth: 1180, margin: '0 auto' }}>
        <p style={{ color: '#d8b46d', textTransform: 'uppercase', fontWeight: 800, fontSize: 12 }}>Eden Skye Studios Autopilot</p>
        <h1 style={{ fontFamily: 'Georgia, serif', fontSize: 48, lineHeight: 1.05, margin: '0 0 16px' }}>Auto Social MAX Revised OS</h1>
        <p style={{ maxWidth: 760, color: '#d9cfbf', fontSize: 18, lineHeight: 1.55 }}>
          The revised workbook is installed as the source of truth for the 24/7 content engine: trend discovery, hooks, prompts, generation queues, approvals, scheduling, analytics, and winner replication.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', margin: '24px 0 32px' }}>
          <a href={workbookUrl} style={{ background: '#d2a25f', color: '#050505', padding: '14px 22px', borderRadius: 6, fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none' }}>Open Drive Control Plane</a>
          <a href="/api/autopilot/max-os/status" style={{ border: '1px solid rgba(210,162,95,.55)', color: '#f7efe2', padding: '14px 22px', borderRadius: 6, fontWeight: 900, textTransform: 'uppercase', textDecoration: 'none' }}>Read Status API</a>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 14, marginBottom: 28 }}>
          {[
            ['Daily target', '195 posts'],
            ['7-day queue', '1,365 items'],
            ['Approval rows', '60 seeded'],
            ['Workbook tabs', '37 total'],
            ['Preview branch', 'shopify/v1-website-preview']
          ].map(([label, value]) => (
            <div key={label} style={{ border: '1px solid rgba(210,162,95,.28)', borderRadius: 8, padding: 18, background: '#0b0b0b' }}>
              <b style={{ display: 'block', color: '#d2a25f', fontSize: 13, textTransform: 'uppercase' }}>{label}</b>
              <span style={{ display: 'block', fontFamily: 'Georgia, serif', fontSize: 28, marginTop: 8 }}>{value}</span>
            </div>
          ))}
        </div>
        <section style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 18 }}>
          <div style={{ border: '1px solid rgba(210,162,95,.28)', borderRadius: 8, padding: 18, background: '#090909' }}>
            <h2 style={{ marginTop: 0, fontFamily: 'Georgia, serif' }}>System Status</h2>
            {systems.map(([name, status]) => (
              <p key={name} style={{ borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 12 }}><b>{name}</b><br /><span style={{ color: '#cec2b1' }}>{status}</span></p>
            ))}
          </div>
          <div style={{ border: '1px solid rgba(210,162,95,.28)', borderRadius: 8, padding: 18, background: '#090909' }}>
            <h2 style={{ marginTop: 0, fontFamily: 'Georgia, serif' }}>Approval Gates</h2>
            {gates.map(([name, status]) => (
              <p key={name} style={{ display: 'flex', justifyContent: 'space-between', gap: 14, borderTop: '1px solid rgba(255,255,255,.08)', paddingTop: 12 }}><b>{name}</b><span style={{ color: '#ffcf91' }}>{status}</span></p>
            ))}
            <p style={{ color: '#cec2b1', lineHeight: 1.5 }}>Drafting, scoring, queueing, validation, and receipts are allowed. External publishing, production deploys, payment changes, and Shopify mutations remain owner-approved actions.</p>
          </div>
        </section>
      </section>
    </main>
  );
}
