const offers = [
  ['Black Card Preview', 'Private Edens Closet access, model experiences, saved looks, and draft-only content unlocks.', 'Approval gated'],
  ['Creator Licensing', 'Commercial-use campaign assets and licensing packages staged for Shopify checkout.', 'Draft'],
  ['Studio Services', 'Premium creator production, visual systems, and content workflow setup services.', 'Draft']
];

export default function PricingPage() {
  return (
    <main className="shell">
      <p className="eyebrow">Eden Skye Studios</p>
      <h1>Pricing and offer ladder</h1>
      <p className="subtle">Draft-only pricing surface. Payments, discounts, subscriptions, and checkout activation remain locked until explicit approval.</p>
      <section className="grid">
        {offers.map(([title, body, status]) => (
          <article className="card" key={title}>
            <span className="badge">{status}</span>
            <h2>{title}</h2>
            <p>{body}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
