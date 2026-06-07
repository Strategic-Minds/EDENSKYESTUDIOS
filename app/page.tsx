const images = [
  'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1400&auto=format&fit=crop',
  'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1400&auto=format&fit=crop'
];

const talent = ['Editorial Campaigns', 'Creator Shoots', 'Brand Launches', 'Commercial Licensing', 'Social Content', 'Product Stories'];
const services = ['Digital Modeling Campaigns', 'Content Creator Packages', 'Brand Visual Systems', 'Commercial Licensing', 'AUTO SOCIAL Setup', 'Website + Social Launch'];

export default function Home() {
  return (
    <main className="site">
      <nav className="nav">
        <div className="brand">EDEN SKYE <span>STUDIOS</span></div>
        <div className="links"><a>Models</a><a>Creators</a><a>Services</a><a>Auto Social</a><a className="pill">Apply</a></div>
      </nav>

      <section className="hero">
        <div className="heroCopy">
          <p className="eyebrow">Digital Modeling + Content Creator Agency</p>
          <h1>Luxury content built to stop the scroll.</h1>
          <p>Eden Skye Studios creates image-heavy campaigns, creator content systems, commercial licensing assets, and automated social media engines for modern brands.</p>
          <div className="actions"><a className="hot">Book a Campaign</a><a className="ghost">Build AUTO SOCIAL</a></div>
        </div>
        <div className="heroGrid">
          {images.slice(0,4).map((src,i)=><img key={i} src={src} alt="Eden Skye Studios editorial campaign" />)}
        </div>
      </section>

      <section className="marquee">{talent.map(x=><span key={x}>{x}</span>)}</section>

      <section className="gallery">
        <div className="intro"><p className="eyebrow">Image Library</p><h2>Built for campaigns, posts, ads, launches, and brand heat.</h2></div>
        <div className="cards">{images.map((src,i)=><article key={src}><img src={src} alt="Premium campaign visual"/><b>{talent[i]}</b><span>Ready for Shopify, social, ads, landing pages, and content batches.</span></article>)}</div>
      </section>

      <section className="split">
        <div><p className="eyebrow">AUTO SOCIAL</p><h2>From discovery to posting.</h2><p>Trend discovery, hooks, prompts, content production, approval, Metricool scheduling, analytics, and repeatable campaigns.</p></div>
        <div className="steps">{['Discover','Create','Approve','Schedule','Post','Analyze'].map(x=><span key={x}>{x}</span>)}</div>
      </section>

      <section className="services">
        <div className="intro"><p className="eyebrow">Services</p><h2>Agency offers that sell visual attention.</h2></div>
        <div className="serviceGrid">{services.map(x=><div key={x}><h3>{x}</h3><p>Premium, fast, organized, approval-gated, and built for repeatable content creation.</p></div>)}</div>
      </section>

      <section className="cta"><h2>Launch the studio. Build the system. Turn every business into content.</h2><a className="hot">Apply Now</a></section>

      <style>{`
        *{box-sizing:border-box} body{margin:0;background:#000;color:#fff;font-family:Inter,Arial,sans-serif}.site{background:#000;color:#fff;min-height:100vh}.nav{position:fixed;top:0;left:0;right:0;z-index:10;display:flex;justify-content:space-between;align-items:center;padding:18px 32px;background:rgba(0,0,0,.78);backdrop-filter:blur(18px);border-bottom:1px solid rgba(255,255,255,.1)}.brand{font-weight:950;letter-spacing:.12em}.brand span{color:#ff2fb3}.links{display:flex;gap:18px;align-items:center}.links a{color:#fff;text-decoration:none;font-weight:800;font-size:13px}.pill,.hot{background:#ff2fb3!important;color:#fff!important;border:1px solid #ff2fb3!important;box-shadow:0 0 34px rgba(255,47,179,.35)}.hero{min-height:100vh;display:grid;grid-template-columns:.88fr 1.12fr;gap:44px;align-items:center;padding:110px 42px 56px;background:radial-gradient(circle at 78% 18%,rgba(255,47,179,.34),transparent 28%),#000}.heroCopy h1{font-size:82px;line-height:.9;margin:0 0 22px;max-width:760px}.heroCopy p{font-size:21px;line-height:1.5;color:#ddd;max-width:680px}.eyebrow{color:#ff2fb3!important;text-transform:uppercase;font-weight:950;letter-spacing:.14em;font-size:12px!important}.actions{display:flex;gap:14px;margin-top:28px}.actions a,.cta a{padding:15px 20px;border-radius:999px;text-decoration:none;font-weight:950}.ghost{border:1px solid rgba(255,255,255,.25);color:#fff}.heroGrid{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.heroGrid img,.cards img{width:100%;height:100%;object-fit:cover;display:block}.heroGrid img{height:340px;border-radius:22px;border:1px solid rgba(255,47,179,.45);box-shadow:0 24px 80px rgba(255,47,179,.16)}.marquee{display:grid;grid-template-columns:repeat(6,1fr);border-top:1px solid #222;border-bottom:1px solid #222}.marquee span{padding:24px 14px;text-align:center;color:#ff2fb3;font-weight:950;border-right:1px solid #222}.gallery,.services,.split,.cta{width:min(1240px,calc(100% - 40px));margin:0 auto;padding:86px 0}.intro h2,.split h2,.cta h2{font-size:52px;line-height:1;margin:0 0 22px}.cards{display:grid;grid-template-columns:repeat(3,1fr);gap:14px}.cards article{background:#080808;border:1px solid #202020;border-radius:24px;overflow:hidden}.cards img{height:430px}.cards b,.cards span{display:block;padding:16px 18px}.cards b{font-size:22px}.cards span{padding-top:0;color:#bbb}.split{display:grid;grid-template-columns:.8fr 1fr;gap:48px;border-top:1px solid #222;border-bottom:1px solid #222}.split p{color:#ccc;font-size:19px;line-height:1.55}.steps{display:grid;grid-template-columns:repeat(2,1fr);gap:12px}.steps span,.serviceGrid div{background:linear-gradient(145deg,#080808,#151015);border:1px solid rgba(255,47,179,.35);border-radius:22px;padding:28px;font-weight:950}.serviceGrid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.serviceGrid p{color:#bbb}.cta{text-align:center;padding-bottom:120px}.cta h2{max-width:980px;margin:0 auto 28px}@media(max-width:900px){.hero,.split{grid-template-columns:1fr}.heroCopy h1{font-size:52px}.cards,.serviceGrid,.marquee{grid-template-columns:1fr 1fr}.links{display:none}}`}</style>
    </main>
  );
}
