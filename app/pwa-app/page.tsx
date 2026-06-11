import { Header } from '../components';
import { standaloneAssets } from '../visual-source-truth';

export default function Page() {
  return (
    <main className="eden-site">
      <Header />
      <section className="page-head pwa-showcase">
        <div>
          <h1>PWA App</h1>
          <p>Mobile Eden Skye app screens generated as standalone source assets from the approved PWA board direction.</p>
          <a className="hot-btn" href="/apply">Apply Now</a>
        </div>
        <img src={standaloneAssets.pwaHome.src} alt="Generated standalone Eden Skye PWA home mockup" />
        <img src={standaloneAssets.pwaNavigation.src} alt="Generated standalone Eden Skye PWA navigation mockup" />
      </section>
    </main>
  );
}
