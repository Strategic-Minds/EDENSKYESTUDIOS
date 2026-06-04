export default function HomePage() {
  return (
    <main className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Eden Skye Studios</p>
          <h1>Governed AI modeling and content creation control surface.</h1>
          <p className="subtle">
            The public site remains approval-gated. The first production slice is the internal media asset registry and approval console.
          </p>
        </div>
        <nav className="nav" aria-label="Primary">
          <a href="/admin">Admin Console</a>
          <a href="/api/readiness">Readiness API</a>
        </nav>
      </header>

      <section className="grid" aria-label="Operating status">
        <div className="metric"><strong>Level 2-3</strong><span>Automation target</span></div>
        <div className="metric"><strong>Draft only</strong><span>Publishing status</span></div>
        <div className="metric"><strong>Gated</strong><span>HeyGen / Shopify / deploy</span></div>
        <div className="metric"><strong>Active</strong><span>Media registry build</span></div>
      </section>

      <section className="section">
        <h2>Current implementation slice</h2>
        <p className="subtle">
          Supabase-backed media assets, approval requests, admin review views, and API routes. No public mutation path is enabled without approval.
        </p>
      </section>
    </main>
  );
}
