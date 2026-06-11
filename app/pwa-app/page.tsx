import { Header, MissingAssetNotice } from '../components';

export default function Page() {
  return (
    <main className="eden-site">
      <Header />
      <section className="page-head">
        <h1>PWA App</h1>
        <p>Mobile Eden Skye app screens are specified; missing standalone screen assets are tracked.</p>
        <MissingAssetNotice />
        <a className="hot-btn" href="/apply">Apply Now</a>
      </section>
    </main>
  );
}
