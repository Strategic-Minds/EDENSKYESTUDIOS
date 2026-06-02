import './eden-skye-homepage.css';

export default function Home() {
  return (
    <main className="ess-page">
      <section className="ess-hero">
        <nav className="ess-nav">
          <div className="ess-logo">EDEN SKYE STUDIOS</div>
          <div className="ess-links"><span>Creators</span><span>Chat</span><span>Downloads</span><span>Shop</span><span>Membership</span></div>
        </nav>
        <div className="ess-hero-grid">
          <div className="ess-copy">
            <p className="ess-kicker">Private creator platform</p>
            <h1>LUXURY. CONNECTION. FREEDOM.</h1>
            <p className="ess-sub">Connect with your favorite creators, chat in real time, video chat face-to-face, download exclusive content, and shop premium products all in one place.</p>
            <div className="ess-buttons"><a>EXPLORE CREATORS</a><a>JOIN NOW</a></div>
          </div>
          <div className="ess-portrait"><img src="/eden-skye-hero.png" alt="Ultra lifelike Eden Skye luxury woman hero" /></div>
        </div>
      </section>
      <section className="ess-strip"><span>Chat</span><span>Video Chat</span><span>Downloads</span><span>Shop</span><span>Licenses</span><span>Membership</span><span>Secure</span></section>
      <section className="ess-cards">
        {['Chat','Video Chat','Downloads','Licenses'].map((title) => <article key={title}><h2>{title}</h2><p>Premium access, cinematic creator experiences, and exclusive Eden Skye content.</p></article>)}
      </section>
      <section className="ess-vip"><p>BLACK CARD VIP</p><h2>Private membership. Premium access. Creator luxury.</h2><a>JOIN THE CLUB</a></section>
    </main>
  );
}
