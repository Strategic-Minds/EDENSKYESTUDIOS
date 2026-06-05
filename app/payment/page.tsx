const included = [
  'Member login and model selection',
  'Behind-the-scenes Edens Closet preview access',
  'Private creator room direction for the chosen model',
  'Draft-only chat, voice, and video lane preparation',
  'Downloads and premium content drops after approval'
] as const;

const styles = `
  .paymentPage { min-height: 100vh; padding: 96px 28px 56px; background: radial-gradient(circle at 78% 8%, rgba(216,182,106,.2), transparent 28%), linear-gradient(180deg,#050505,#090909); color: #f7f3ee; }
  .paymentShell { width: min(1160px,100%); margin: 0 auto; display: grid; grid-template-columns: minmax(0,.82fr) minmax(360px,.7fr); gap: 34px; align-items: start; }
  .eyebrowLocal { margin: 0 0 12px; color: #d8b66a; font-size: 12px; font-weight: 950; text-transform: uppercase; }
  h1 { margin: 0 0 18px; font-size: 68px; line-height: .92; letter-spacing: 0; }
  h2 { margin: 0 0 14px; font-size: 30px; letter-spacing: 0; }
  p, li, .muted { color: #b9b4ad; line-height: 1.58; }
  .copy { max-width: 680px; }
  .buttonGold, .buttonDark { min-height: 42px; display: inline-flex; align-items: center; justify-content: center; padding: 10px 14px; border-radius: 8px; text-decoration: none; font-weight: 900; font-size: 13px; }
  .buttonGold { border: 1px solid #d8b66a; background: #d8b66a; color: #050505; }
  .buttonDark { border: 1px solid rgba(255,255,255,.16); background: rgba(255,255,255,.06); color: #fff; }
  .actions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 24px; }
  .priceCard, .checkoutCard, .gateCard { border: 1px solid rgba(255,255,255,.13); border-radius: 8px; background: linear-gradient(145deg,#090909,#141414); box-shadow: 0 30px 80px rgba(0,0,0,.42); }
  .priceCard { min-height: 430px; display: grid; align-content: space-between; padding: 24px; border-color: rgba(216,182,106,.44); background: linear-gradient(135deg,#080808,#1b1608 56%,#060606); }
  .price { display: flex; align-items: end; gap: 8px; margin: 18px 0; color: #fff; font-size: 54px; font-weight: 950; }
  .price span { color: #b9b4ad; font-size: 14px; font-weight: 800; }
  ul { margin: 18px 0 0; padding-left: 18px; }
  .checkoutCard { padding: 20px; margin-top: 18px; }
  .fieldGrid { display: grid; grid-template-columns: repeat(2,minmax(0,1fr)); gap: 12px; margin-top: 16px; }
  label { display: grid; gap: 6px; color: #d8d2bf; font-size: 12px; font-weight: 900; text-transform: uppercase; }
  input, select { width: 100%; border: 1px solid rgba(255,255,255,.16); border-radius: 8px; background: #050505; color: #fff; padding: 12px; }
  .gateCard { margin-top: 18px; padding: 16px; border-color: rgba(255,76,106,.38); background: rgba(255,76,106,.08); }
  .steps { display: grid; gap: 10px; margin-top: 24px; }
  .steps div { padding: 14px; border: 1px solid rgba(255,255,255,.12); border-radius: 8px; background: rgba(255,255,255,.04); }
  @media (max-width: 880px) { .paymentShell { grid-template-columns: 1fr; } h1 { font-size: 44px; } .paymentPage { padding: 72px 16px 42px; } .fieldGrid { grid-template-columns: 1fr; } }
`;

export default function PaymentPage() {
  return (
    <main className="paymentPage">
      <style>{styles}</style>
      <div className="paymentShell">
        <section>
          <p className="eyebrowLocal">Black Card payment preview</p>
          <h1>Unlock the private path into Edens Closet.</h1>
          <p className="copy">
            This page is designed to become the Shopify or Stripe checkout entry for Black Card access. For now it is frontend-only so you can approve the flow before Eden wires real payment processing.
          </p>
          <div className="actions">
            <a className="buttonGold" href="/login">Continue to login preview</a>
            <a className="buttonDark" href="/">Back to storefront</a>
          </div>
          <div className="steps">
            <div><strong>1. Pay</strong><p>Member buys Black Card access through Shopify/Stripe after approval.</p></div>
            <div><strong>2. Login</strong><p>Member signs in and selects the model they want to enter with.</p></div>
            <div><strong>3. Enter Closet</strong><p>Edens Closet opens the behind-the-scenes version for the chosen model.</p></div>
          </div>
          <section className="checkoutCard">
            <h2>Checkout fields preview</h2>
            <p>No live card collection. These fields show the future payment shape only.</p>
            <div className="fieldGrid">
              <label>Name<input placeholder="Member name" /></label>
              <label>Email<input type="email" placeholder="member@example.com" /></label>
              <label>Access tier<select defaultValue="Black Card"><option>Black Card</option><option>Creator License</option><option>Private Room</option></select></label>
              <label>Chosen model<select defaultValue="Eden Skye"><option>Eden Skye</option><option>Solara Vane</option><option>Liora Vale</option><option>Nova Rain</option><option>Celeste Noir</option></select></label>
            </div>
          </section>
        </section>

        <aside>
          <section className="priceCard">
            <div>
              <p className="eyebrowLocal">EDEN SKYE STUDIOS</p>
              <h2>Black Card</h2>
              <div className="price">$99<span>/ preview price</span></div>
              <p>VIP access product page for the Shopify storefront. Final pricing, subscription logic, and payment processor require approval.</p>
              <ul>{included.map((item) => <li key={item}>{item}</li>)}</ul>
            </div>
            <a className="buttonGold" href="/login">Preview member login</a>
          </section>
          <section className="gateCard">
            <strong>Payment gate active</strong>
            <p>Real payment collection, Stripe pricing, Shopify checkout, discounts, and subscriptions remain locked until you approve the exact processor and offer.</p>
          </section>
        </aside>
      </div>
    </main>
  );
}
