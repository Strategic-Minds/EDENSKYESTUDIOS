import styles from './page.module.css';

const drive = {
  imageFactory: '1lu7fo915TDlJPT4U3VZGexcWBJ9dpi2b',
  stockAssets: '1V8MNsOdvLNSd04JQrnyvH1ECnj3nOF8P',
  quarantine: '1sKBf_icBG8X_xKCm8QKOsbMhMxSZaOP2',
  temp: '1kokL57oAzvL40ee6nC3v1AA8hinarWJe',
  approvalControl: '1EMnjZKTBT4wlO0ZgR5F6tXDKV1dvK76x'
};

const visualRefs = {
  hero: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-001-public-home-hero-wide.png?v=1781224815',
  lookbook: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-002-public-lookbook-grid.png?v=1781224831',
  avatarMatrix: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-003-avatar-reference-matrix.png?v=1781224848',
  fullBody: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-010-avatar-full-body-reference.png?v=1781224924',
  media: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-012-media-library-dashboard.png?v=1781224947',
  calendar: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-013-content-calendar-dashboard.png?v=1781224960'
};

const modules = [
  ['images-panel', 'Images', 'Review visible image slots'],
  ['videos-panel', 'Videos', 'Review playable video slots'],
  ['folders-panel', 'Folders', 'Open organized Drive lanes'],
  ['manifest-panel', 'Manifest', 'Check the 12 expected assets'],
  ['approvals-panel', 'Approvals', 'Open admin manifests'],
  ['leaks-panel', 'Leak Tests', 'Run sandbox-only checks']
];

const imagePreviews = [
  ['eden-skye-001', 'Identity lock', 'pending binary', visualRefs.avatarMatrix],
  ['eden-skye-004', 'Portfolio portrait', 'pending binary', visualRefs.lookbook],
  ['eden-skye-006', 'Homepage hero', 'pending binary', visualRefs.hero],
  ['eden-skye-008', 'Full-body source', 'pending binary', visualRefs.fullBody],
  ['eden-skye-009', 'Closet plate', 'pending binary', visualRefs.media],
  ['eden-skye-010', 'Social vertical', 'pending binary', visualRefs.calendar]
];

const videoPreviews = [
  ['vid-001', 'Headshot talking draft', 'awaiting MP4/WebM', visualRefs.avatarMatrix],
  ['vid-002', 'Closet walkthrough', 'awaiting MP4/WebM', visualRefs.fullBody],
  ['vid-003', 'Homepage bumper', 'awaiting MP4/WebM', visualRefs.hero]
];

const folders = [
  ['Identity Lock', '3 images', drive.temp],
  ['Portfolio Portraits', '2 images', drive.temp],
  ['Website Heroes', '2 images', drive.temp],
  ['Closet Sources', '2 images', drive.stockAssets],
  ['Social Verticals', '1 image', drive.temp],
  ['HeyGen Sources', '2 images', drive.temp],
  ['Video Drafts', '0 videos', drive.imageFactory],
  ['Quarantine', '0 held', drive.quarantine]
];

const imageQueue = [
  ['eden-skye-001', 'Identity lock front portrait', 'pending_binary'],
  ['eden-skye-002', 'Identity lock three-quarter portrait', 'pending_binary'],
  ['eden-skye-003', 'Identity lock side profile', 'pending_binary'],
  ['eden-skye-004', 'Portfolio black card portrait', 'pending_binary'],
  ['eden-skye-005', 'Portfolio white blazer', 'pending_binary'],
  ['eden-skye-006', 'Homepage hero', 'pending_binary'],
  ['eden-skye-007', 'Models page hero', 'pending_binary'],
  ['eden-skye-008', 'Wardrobe-safe full body', 'pending_binary'],
  ['eden-skye-009', 'Closet environment plate', 'pending_binary'],
  ['eden-skye-010', 'Social vertical portrait', 'pending_binary'],
  ['eden-skye-011', 'HeyGen headshot source', 'pending_binary'],
  ['eden-skye-012', 'HeyGen half-body presenter', 'pending_binary']
];

const manifestFiles = [
  ['Repaired stock manifest', '1aQmG63GyarR8XsS14u6-Sn_yG64vtnXI'],
  ['Daily image queue', '1aH52Mk3xbLvLKvQ2cEGiJYRcxqGeydjB'],
  ['Image agent contract', '1MLyTiLrupv1TdygLcBCxY7xj59iZG41G'],
  ['Original 80-slot manifest', '1j5s6ZKDBsIaGe7CIzphxg2CznmSgpCYj'],
  ['Model requirements', '1Jg39oqnhjYtfkXat5MMU3j15u6710euO']
];

const leakTests = [
  ['Public publish', 'blocked'],
  ['Website replacement', 'blocked'],
  ['Shopify activation', 'blocked'],
  ['HeyGen final avatar', 'blocked'],
  ['Drive destructive move', 'blocked'],
  ['Production write', 'blocked']
];

export const metadata = {
  title: 'Eden Source Image Control Plane',
  description: 'Temporary Drive-connected image and video storage, approval, and leak-test surface.'
};

function CloseButton() {
  return <a className={styles.closeButton} href="#home" aria-label="Close editor panel">Close</a>;
}

export default function EdenSourceImagesPage() {
  return (
    <main className={styles.shell}>
      <aside className={styles.chat}>
        <header className={styles.chatHeader}>
          <div className={styles.brandMark}>ES</div>
          <div>
            <p>Eden Media OS</p>
            <span>AI chat editor</span>
          </div>
        </header>

        <section className={styles.chatStream} aria-label="Chat history">
          <article className={styles.message}>
            <b>System</b>
            <span>Choose a module in the editor. I will keep the work sandboxed until approval.</span>
          </article>
        </section>

        <form className={styles.chatInput}>
          <textarea aria-label="Chat input" placeholder="Ask for an image batch, video review, folder action, or leak test..." />
          <button type="button">Send</button>
        </form>
      </aside>

      <section className={styles.editor} id="home">
        <header className={styles.editorTopbar}>
          <div>
            <p>Eden source control</p>
            <h1>Clean review editor</h1>
          </div>
          <a href="/api/eden/source-images/control-plane">API</a>
        </header>

        <nav className={styles.moduleDock} aria-label="Editor modules">
          {modules.map(([id, label, helper]) => (
            <a key={id} href={`#${id}`}>
              <b>{label}</b>
              <span>{helper}</span>
            </a>
          ))}
        </nav>

        <section className={styles.emptyState} aria-label="Empty editor state">
          <span>Ready</span>
          <h2>Select a module to open it in the editor.</h2>
        </section>

        <section id="images-panel" className={styles.modulePanel}>
          <header><div><p>Visual review</p><h2>Images</h2></div><CloseButton /></header>
          <div className={styles.mediaGrid}>
            {imagePreviews.map(([id, title, status, src]) => (
              <figure key={id} className={styles.mediaCard}>
                <img src={src} alt={`${title} preview`} />
                <figcaption><b>{id}</b><span>{title}</span><em>{status}</em></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="videos-panel" className={styles.modulePanel}>
          <header><div><p>Visual review</p><h2>Videos</h2></div><CloseButton /></header>
          <div className={styles.videoGrid}>
            {videoPreviews.map(([id, title, status, poster]) => (
              <figure key={id} className={styles.mediaCard}>
                <video controls preload="metadata" poster={poster} aria-label={`${title} video preview`} />
                <figcaption><b>{id}</b><span>{title}</span><em>{status}</em></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="folders-panel" className={styles.modulePanel}>
          <header><div><p>Drive storage</p><h2>Folders</h2></div><CloseButton /></header>
          <div className={styles.buttonGrid}>
            {folders.map(([name, count, id]) => (
              <a key={name} href={`https://drive.google.com/drive/folders/${id}`}>
                <b>{name}</b>
                <span>{count}</span>
              </a>
            ))}
          </div>
        </section>

        <section id="manifest-panel" className={styles.modulePanel}>
          <header><div><p>Source truth</p><h2>Manifest</h2></div><CloseButton /></header>
          <div className={styles.listPanel}>
            {imageQueue.map(([asset, purpose, status]) => (
              <div key={asset}><b>{asset}</b><span>{purpose}</span><em>{status}</em></div>
            ))}
          </div>
        </section>

        <section id="approvals-panel" className={styles.modulePanel}>
          <header><div><p>Admin control</p><h2>Approvals</h2></div><CloseButton /></header>
          <div className={styles.buttonGrid}>
            {manifestFiles.map(([label, id]) => (
              <a key={id} href={`https://drive.google.com/file/d/${id}/view`}>
                <b>{label}</b>
                <span>{id}</span>
              </a>
            ))}
          </div>
        </section>

        <section id="leaks-panel" className={styles.modulePanel}>
          <header><div><p>Sandbox checks</p><h2>Leak Tests</h2></div><CloseButton /></header>
          <div className={styles.buttonGrid}>
            {leakTests.map(([label, status]) => (
              <button key={label} type="button">
                <b>{label}</b>
                <span>{status}</span>
              </button>
            ))}
          </div>
        </section>
      </section>
    </main>
  );
}
