const campaignImage = 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/eden-skye-studios-homepage-campaign.png?v=1780873477';

export default function Home() {
  return (
    <main className="site">
      <section className="mockupWrap">
        <img src={campaignImage} alt="Eden Skye Studios campaign homepage" className="mockupImage" />
      </section>
      <style>{`
        *{box-sizing:border-box}body{margin:0;background:#000;color:#fff;font-family:Inter,Arial,sans-serif}.site{min-height:100vh;background:#000}.mockupWrap{width:100%;min-height:100vh;display:flex;align-items:flex-start;justify-content:center;background:#000}.mockupImage{width:100%;height:auto;display:block;object-fit:contain;background:#000}@media(min-width:1400px){.mockupImage{max-width:1402px}}
      `}</style>
    </main>
  );
}
