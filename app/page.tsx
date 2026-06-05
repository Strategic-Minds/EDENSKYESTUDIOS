export default function HomePage() {
  return (
    <main className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Eden Skye Studios</p>
          <h1>Eden&apos;s Closet is the working Black Card control plane.</h1>
          <p className="subtle">
            Open the live app to test Eden chat, model cards, approvals, workflow status, and governed runtime receipts. Public publishing and commerce actions remain approval-gated.
          </p>
        </div>
        <nav className="nav" aria-label="Primary">
          <a href="/closet">Open Eden&apos;s Closet</a>
          <a href="/admin">Admin Console</a>
          <a href="/api/readiness">Readiness API</a>
        </nav>
      </header>

      <section className="grid" aria-label="Operating status">
        <div className="metric"><strong>Live</strong><span>Closet app route</span></div>
        <div className="metric"><strong>Test mode</strong><span>Eden GPT runtime</span></div>
        <div className="metric"><strong>Branch only</strong><span>Supabase schema</span></div>
        <div className="metric"><strong>Locked</strong><span>Publishing and commerce</span></div>
      </section>

      <section className="section">
        <h2>Open the app</h2>
        <p className="subtle">
          Start at Eden&apos;s Closet. The chat panel should respond immediately in governed test mode, and risky commands should show an approval gate instead of taking live action.
        </p>
        <div className="actions">
          <a className="button" href="/closet">Launch Eden&apos;s Closet</a>
          <a className="button" href="/api/eden/chat">Check Chat Runtime</a>
        </div>
      </section>
    </main>
  );
}
