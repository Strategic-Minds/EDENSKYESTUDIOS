import Link from 'next/link';
import { campaignImage, models } from './site-data';

export default function Home() {
  return (
    <main className="siteShell">
      <header className="topNav">
        <Link className="brand" href="/">ES <span>Eden Skye Studios</span></Link>
        <nav>
          <Link href="/models">Models</Link>
          <Link href="/plans">Plans</Link>
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/closet">Eden&apos;s Closet</Link>
          <Link href="/ai-chat">AI Chat</Link>
        </nav>
        <Link className="navAction" href="/plans">Apply Now</Link>
      </header>

      <section className="heroStage">
        <div className="heroImage" style={{ backgroundImage: `url(${campaignImage})` }} />
        <div className="heroScrim" />
        <div className="heroCopy">
          <p className="kicker">Digital modeling agency and creator engine</p>
          <h1>Beauty. <span>Influence.</span> Impact.</h1>
          <p>AI-powered model experiences, Black Card membership, creator campaigns, and immersive Eden&apos;s Closet content built for premium digital brands.</p>
          <div className="actions">
            <Link className="buttonPrimary" href="/models">Explore Models</Link>
            <Link className="buttonGhost" href="/closet">Enter Eden&apos;s Closet</Link>
          </div>
        </div>
      </section>

      <section className="modelRail" aria-label="Featured models">
        {models.map((model, index) => (
          <Link href="/models" className="modelTile" key={model.name}>
            <div className={`portraitCrop crop${index % 6}`} />
            <strong>{model.name}</strong>
            <span>{model.city} / {model.status}</span>
          </Link>
        ))}
      </section>

      <section className="wideBand">
        <div>
          <p className="kicker">The Eden difference</p>
          <h2>One studio for models, members, content, campaigns, and AI experiences.</h2>
        </div>
        <div className="featureList">
          {['Elite talent roster', 'Ultra-real image stack', 'Eden Closet', 'Black Card memberships', 'AI video chat', 'Brand campaign ops'].map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
