import { Header } from "../components";
import { buildBlackCardPaymentSnapshot } from "../../lib/commerce/black-card.mjs";

const snapshot = buildBlackCardPaymentSnapshot();

const memberFlow = [
  "Choose your model or media experience.",
  "Join through the secure Shopify Black Card payment page.",
  "Return to Eden Skye and open your member dashboard.",
  "Enter Eden's Closet for AI chat, voice, video, private galleries, and the 360 viewer."
];

export default function PaymentPage() {
  return (
    <main className="eden-site eden-closet-pwa">
      <Header />
      <section className="checkout-shell">
        <aside>
          <p className="pink">Black Card Access</p>
          <h2>{snapshot.product}</h2>
          <div className="order-line">
            <span>Membership</span>
            <strong>{snapshot.amount}</strong>
          </div>
          <div className="order-line">
            <span>Payment</span>
            <strong>Secure Shopify checkout</strong>
          </div>
          <div className="order-line total">
            <span>Access</span>
            <strong>Eden's Closet PWA</strong>
          </div>
          <a className="hot-btn" href={snapshot.checkout} style={{ width: "100%", marginTop: 16 }}>
            Continue to Shopify Payment
          </a>
        </aside>
        <section>
          <h1 style={{ fontSize: 56, lineHeight: 1, margin: "0 0 14px", textTransform: "uppercase" }}>Unlock the Black Card</h1>
          <p>
            Black Card members get the private Eden Skye experience: premium model galleries, Eden's Closet, AI text and voice chat, video room previews, and the full-body 360 viewer.
          </p>
          <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
            {memberFlow.map((item, index) => (
              <article className="price-card" key={item}>
                <span>Step {index + 1}</span>
                <p>{item}</p>
              </article>
            ))}
          </div>
          <div className="hero-actions">
            <a className="hot-btn" href={snapshot.checkout}>
              Pay with Shopify
            </a>
            <a className="outline-btn" href="/success">
              Member Handoff
            </a>
            <a className="outline-btn" href="/closet">
              Preview Closet
            </a>
          </div>
          <small>After Shopify confirms payment, Eden Skye checks your Supabase member entitlement and opens the protected PWA experience.</small>
        </section>
      </section>
    </main>
  );
}
