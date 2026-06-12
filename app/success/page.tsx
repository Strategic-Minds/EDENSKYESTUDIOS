import { Header } from "../components";

const statusCards = [
  ["Entitlement", "Black Card test entitlement", "Granted only from approved paid test events."],
  ["Webhook", "Signed event required", "Unsigned payloads are rejected."],
  ["Activation", "Draft/test only", "Live Shopify activation remains blocked."],
  ["Next step", "Dashboard handoff", "Move the user into the protected member surfaces."]
];

export default function SuccessPage() {
  return (
    <main className="eden-site">
      <Header />
      <section className="page-head center">
        <p className="pink">Payment Success / Draft Handoff</p>
        <h1>Success</h1>
        <p>This is the draft-safe handoff after a test paid event. It confirms the entitlement sync path without enabling any live commerce mutation.</p>
      </section>
      <section className="pricing-grid">
        {statusCards.map(([label, value, body]) => (
          <article className="price-card" key={label}>
            <span>{label}</span>
            <h2 style={{ fontSize: 28 }}>{value}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
      <section className="black-card-cta">
        <p className="pink">Protected result</p>
        <h2>Black Card access may proceed only after a test-mode paid event.</h2>
        <div className="hero-actions" style={{ justifyContent: "center" }}>
          <a className="hot-btn" href="/dashboard">
            Dashboard
          </a>
          <a className="outline-btn" href="/shopify">
            Shopify Bridge
          </a>
          <a className="outline-btn" href="/admin/gates">
            Review Gates
          </a>
        </div>
      </section>
    </main>
  );
}
