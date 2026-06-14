const previewScreens = [
  {
    title: 'Home',
    label: 'Hero / Login',
    image: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-standalone-home-hero-alexis-neon-es.png?v=1781219008'
  },
  {
    title: 'Models',
    label: 'Roster Grid',
    image: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-model-luna-moretti-card.png?v=1781219024'
  },
  {
    title: 'Profile',
    label: 'Alexis Voss',
    image: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-model-alexis-voss-profile.png?v=1781219041'
  },
  {
    title: "Eden's Closet",
    label: 'VIP Wardrobe',
    image: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-model-sienna-cole-card.png?v=1781219032'
  },
  {
    title: 'Full Body',
    label: '360 Viewer',
    image: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-model-natalia-vega-card.png?v=1781219049'
  },
  {
    title: 'AI Chat',
    label: 'Model Presence',
    image: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-model-zoey-parker-card.png?v=1781219065'
  }
];

export const metadata = {
  title: 'Eden Skye Pixel Lock Preview',
  description: 'Preview app route for Eden Skye PWA alignment work.'
};

export default function PixelLockPreview() {
  return (
    <main className="pixelLockPage">
      <section className="boardStage">
        <div className="boardChrome">
          <header className="boardHeader">
            <div>
              <p>EDEN SKYE STUDIOS</p>
              <h1>Pixel Lock Preview</h1>
            </div>
            <span>offset x: 0 / y: 0</span>
          </header>

          <div className="phoneGrid">
            {previewScreens.map((screen, index) => (
              <article className="phone" key={screen.title}>
                <div className="notch" />
                <div className="phoneTop">
                  <small>{String(index + 1).padStart(2, '0')}</small>
                  <strong>{screen.title}</strong>
                </div>
                <img src={screen.image} alt={`${screen.title} preview`} />
                <div className="phoneCaption">
                  <span>{screen.label}</span>
                  <b>VIEW</b>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <style>{`
        *{box-sizing:border-box}.pixelLockPage{min-height:100vh;margin:0;background:#050505;color:#fff;font-family:Inter,Arial,sans-serif}.boardStage{min-height:100vh;display:grid;place-items:center;padding:24px;background:radial-gradient(circle at 50% 0%,rgba(255,20,147,.2),transparent 38%),#050505}.boardChrome{width:min(1536px,100%);min-height:min(1024px,calc(100vh - 48px));border:1px solid rgba(255,20,147,.55);border-radius:18px;background:linear-gradient(180deg,#090909,#030303);box-shadow:0 0 44px rgba(255,20,147,.18);padding:22px}.boardHeader{display:flex;align-items:center;justify-content:space-between;gap:18px;border-bottom:1px solid rgba(255,20,147,.35);padding-bottom:18px}.boardHeader p{margin:0;color:#ff1493;font-size:12px;font-weight:900}.boardHeader h1{margin:4px 0 0;font-size:42px;line-height:1;font-family:Georgia,serif;font-weight:400;letter-spacing:0}.boardHeader span{border:1px solid rgba(255,20,147,.45);border-radius:999px;padding:10px 14px;color:#ddd;font-size:12px;text-transform:uppercase}.phoneGrid{display:grid;grid-template-columns:repeat(6,1fr);gap:18px;align-items:start;padding-top:24px}.phone{position:relative;overflow:hidden;border:1px solid rgba(255,20,147,.55);border-radius:28px;background:#080808;box-shadow:0 0 30px rgba(255,20,147,.18);padding:14px 12px 12px;min-height:520px}.notch{position:absolute;top:8px;left:50%;width:64px;height:8px;transform:translateX(-50%);border-radius:99px;background:#111}.phoneTop{height:54px;display:flex;align-items:end;justify-content:space-between;gap:8px;padding:10px 2px 8px}.phoneTop small{color:#ff1493;font-size:11px;font-weight:900}.phoneTop strong{font-size:13px;text-transform:uppercase}.phone img{width:100%;height:360px;object-fit:cover;border-radius:18px;border:1px solid rgba(255,255,255,.12);object-position:center top}.phoneCaption{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-top:12px;border-top:1px solid rgba(255,20,147,.28);padding-top:12px}.phoneCaption span{color:#ccc;font-size:12px}.phoneCaption b{border-radius:999px;background:#ff1493;padding:7px 10px;font-size:10px}@media(max-width:1200px){.phoneGrid{grid-template-columns:repeat(3,1fr)}.phone{min-height:470px}.phone img{height:310px}}@media(max-width:720px){.boardStage{padding:10px}.boardChrome{border-radius:12px;padding:12px}.boardHeader{display:block}.boardHeader span{display:inline-flex;margin-top:12px}.phoneGrid{grid-template-columns:1fr}.phone{min-height:500px}.phone img{height:340px}}
      `}</style>
    </main>
  );
}
