import Link from 'next/link';

const activity = ['Viewed Alexis Voss', 'Opened Eden Closet', 'AI chat session drafted', 'New content available'];

export default function DashboardPage() {
  return (
    <main className="appSurface">
      <aside className="sideNav"><Link className="brand" href="/">ES <span>Eden</span></Link>{['Dashboard','My Models','Messages','Video Chat','Eden Closet','Favorites','Settings'].map((item) => <span key={item}>{item}</span>)}</aside>
      <section className="workArea">
        <header className="workspaceHeader"><div><p className="kicker">Member dashboard</p><h1>Black Card command center.</h1></div><Link className="buttonPrimary" href="/closet">Enter closet</Link></header>
        <div className="metricGrid">{['Black Card','May 24, 2026','129 profile views','16 favorites'].map((metric) => <article key={metric}><strong>{metric}</strong><span>Current status</span></article>)}</div>
        <section className="workspaceGrid">
          <article><h2>Recent activity</h2>{activity.map((item) => <p className="activity" key={item}>{item}<span>2m ago</span></p>)}</article>
          <article><h2>Quick access</h2><div className="quickGrid"><Link href="/ai-chat">AI Chat</Link><Link href="/closet">Closet</Link><Link href="/models">Models</Link><Link href="/plans">Plans</Link></div></article>
        </section>
      </section>
    </main>
  );
}
