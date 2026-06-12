import { Header } from "../components";
import { buildDraftPaymentSnapshot } from "../../lib/commerce/black-card.mjs";

const snapshot = buildDraftPaymentSnapshot();

const checklist = [
  "Draft/test mode only",
  "No live Shopify product mutation",
  "No live payment activation",
  "No public release or deploy action",
  "Success handoff stays gated behind test entitlement sync"
];

export default function PaymentPage() {
  return (
    <main className="eden-site">
      <Header />
      <section className="checkout-shell">
        <aside>
          <p className="pink">Black Card / Draft Payment</p>
          <h2>{snapshot.product}</h2>
          <div className="order-line">
            <span>Membership</span>
            <strong>{snapshot.amount}</strong>
          </div>
          <div className="order-line">
            <span>Environment</span>
            <strong>{snapshot.environment}</strong>
          </div>
          <div className="order-line total">
            <span>Live payment</span>
            <strong>{snapshot.livePaymentActivation}</strong>
          </div>
          <a className="hot-btn" href="/checkout" style={{ width: "100%", marginTop: 16 }}>
            Open Draft Checkout
          </a>
        </aside>
        <section>
          <h1 style={{ fontSize: 56, lineHeight: 1, margin: "0 0 14px", textTransform: "uppercase" }}>Payment Ready</h1>
          <p>
            This page exists as the draft-safe payment surface for Eden Skye Studios. It shows the Black Card purchase state, but keeps live payment activation blocked until an explicit approval receipt is created.
          </p>
          <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
            {checklist.map((item) => (
              <article className="price-card" key={item}>
                <span>Guardrail</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
          <div className="hero-actions">
            <a className="hot-btn" href="/success">
              Test Success Page
            </a>
            <a className="outline-btn" href="/shopify">
              Shopify Bridge
            </a>
            <a className="outline-btn" href="/admin/gates">
              Approval Gates
            </a>
          </div>
          <small>Protected action rule: no live Shopify product/payment/theme/discount/inventory mutation without explicit human approval receipt.</small>
        </section>
      </section>
    </main>
  );
}
