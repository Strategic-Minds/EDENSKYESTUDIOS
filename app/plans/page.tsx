import Link from 'next/link';
import { plans } from '../site-data';

export default function PlansPage() {
  return (
    <main className="siteShell innerPage">
      <header className="topNav"><Link className="brand" href="/">ES <span>Eden Skye Studios</span></Link><nav><Link href="/models">Models</Link><Link href="/dashboard">Dashboard</Link><Link href="/closet">Closet</Link></nav></header>
      <section className="centerHeader">
        <p className="kicker">Choose your plan</p>
        <h1>Black Card access starts here.</h1>
        <p>Unlock exclusive model content, Eden&apos;s Closet, AI chat, video experiences, and campaign-ready creator assets.</p>
      </section>
      <section className="pricingGrid">
        {plans.map((plan) => (
          <article className={plan.featured ? 'priceCard featured' : 'priceCard'} key={plan.name}>
            {plan.featured && <span className="badge">Best value</span>}
            <h2>{plan.name}</h2>
            <strong>{plan.price}<small>/month</small></strong>
            <p>{plan.note}</p>
            <Link className="buttonPrimary" href="/dashboard">Choose plan</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
