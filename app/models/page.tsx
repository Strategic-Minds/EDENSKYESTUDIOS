import Link from 'next/link';
import { campaignImage, models } from '../site-data';

export default function ModelsPage() {
  return (
    <main className="siteShell innerPage">
      <header className="topNav"><Link className="brand" href="/">ES <span>Eden Skye Studios</span></Link><nav><Link href="/plans">Plans</Link><Link href="/closet">Closet</Link><Link href="/dashboard">Dashboard</Link></nav></header>
      <section className="pageHeader">
        <div><p className="kicker">Our models</p><h1>Premium AI creator roster.</h1><p>Review model profiles, campaign status, media readiness, and Black Card access.</p></div>
        <div className="headerPortrait" style={{ backgroundImage: `url(${campaignImage})` }} />
      </section>
      <section className="registryGrid">
        {models.map((model, index) => (
          <article className="registryCard" key={model.name}>
            <div className={`portraitCrop crop${index % 6}`} />
            <div><h2>{model.name}</h2><p>{model.city}</p></div>
            <ul><li>{model.reach} reach</li><li>{model.score} match</li><li>{model.status}</li></ul>
            <Link className="buttonPrimary" href="/plans">Apply to work with {model.name.split(' ')[0]}</Link>
          </article>
        ))}
      </section>
    </main>
  );
}
