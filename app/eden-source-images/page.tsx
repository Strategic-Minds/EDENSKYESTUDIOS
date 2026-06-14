import styles from './page.module.css';

const drive = {
  root: '1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ',
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

const folders = [
  ['01 Identity Lock', '3 images', 'Eden face consistency masters', drive.temp],
  ['02 Portfolio Portraits', '2 images', 'Model profile and Black Card visuals', drive.temp],
  ['03 Website Heroes', '2 images', 'Homepage and models page hero media', drive.temp],
  ['04 Closet Sources', '2 images', 'Wardrobe-safe model and room plate', drive.stockAssets],
  ['05 Social Verticals', '1 image', 'Reels/story source media', drive.temp],
  ['06 HeyGen Sources', '2 images', 'Headshot and half-body video sources', drive.temp],
  ['07 Video Drafts', '0 videos', 'MP4/WebM review slots', drive.imageFactory],
  ['08 Quarantine', '0 held', 'Failed QA and regeneration queue', drive.quarantine]
];

const imagePreviews = [
  ['eden-skye-001', 'Identity lock front portrait', '4:5', 'pending binary', visualRefs.avatarMatrix],
  ['eden-skye-004', 'Portfolio black card portrait', '4:5', 'pending binary', visualRefs.lookbook],
  ['eden-skye-006', 'Homepage hero', '16:9', 'pending binary', visualRefs.hero],
  ['eden-skye-008', 'Wardrobe-safe full body', '9:16', 'pending binary', visualRefs.fullBody],
  ['eden-skye-009', 'Closet environment plate', '16:9', 'pending binary', visualRefs.media],
  ['eden-skye-010', 'Social vertical portrait', '9:16', 'pending binary', visualRefs.calendar]
];

const videoPreviews = [
  ['vid-001', 'HeyGen headshot talking draft', '1:1', 'awaiting video file', visualRefs.avatarMatrix],
  ['vid-002', 'Closet walkthrough draft', '9:16', 'awaiting video file', visualRefs.fullBody],
  ['vid-003', 'Homepage cinematic bumper', '16:9', 'awaiting video file', visualRefs.hero]
];

const manifestFiles = [
  ['Repaired stock manifest', 'STOCK_IMAGE_MASTER_MANIFEST_REPAIRED.csv', '1aQmG63GyarR8XsS14u6-Sn_yG64vtnXI'],
  ['Daily image queue', 'TODAY_IMAGE_BATCH_QUEUE_2026-06-12.csv', '1aH52Mk3xbLvLKvQ2cEGiJYRcxqGeydjB'],
  ['Image agent contract', 'IMAGE_AGENT_RUN_CONTRACT_2026-06-12.json', '1MLyTiLrupv1TdygLcBCxY7xj59iZG41G'],
  ['Original 80-slot manifest', 'STOCK_IMAGE_MASTER_MANIFEST.csv', '1j5s6ZKDBsIaGe7CIzphxg2CznmSgpCYj'],
  ['Model requirements', 'MODEL_IMAGE_REQUIREMENTS.csv', '1Jg39oqnhjYtfkXat5MMU3j15u6710euO']
];

const imageQueue = [
  ['eden-skye-001', 'Identity lock front portrait', '4:5', 'pending_binary', '92'],
  ['eden-skye-002', 'Identity lock three-quarter portrait', '4:5', 'pending_binary', '92'],
  ['eden-skye-003', 'Identity lock side profile', '4:5', 'pending_binary', '92'],
  ['eden-skye-004', 'Portfolio black card portrait', '4:5', 'pending_binary', '90'],
  ['eden-skye-005', 'Portfolio white blazer', '4:5', 'pending_binary', '90'],
  ['eden-skye-006', 'Homepage hero', '16:9', 'pending_binary', '90'],
  ['eden-skye-007', 'Models page hero', '16:9', 'pending_binary', '90'],
  ['eden-skye-008', 'Wardrobe-safe full body', '9:16', 'pending_binary', '94'],
  ['eden-skye-009', 'Closet environment plate', '16:9', 'pending_binary', '88'],
  ['eden-skye-010', 'Social vertical portrait', '9:16', 'pending_binary', '90'],
  ['eden-skye-011', 'HeyGen headshot source', '1:1', 'pending_binary', '95'],
  ['eden-skye-012', 'HeyGen half-body presenter', '9:16', 'pending_binary', '95']
];

const leakTests = [
  ['publish_public', 'Public publish attempt', 'blocked'],
  ['replace_website_assets', 'Live website asset replacement', 'blocked'],
  ['activate_shopify_assets', 'Shopify media/product activation', 'blocked'],
  ['activate_heygen_final_avatar', 'Final HeyGen avatar activation', 'blocked'],
  ['drive_move_parent', 'Destructive Drive parent move', 'blocked'],
  ['supabase_service_write', 'Service-role production write', 'blocked']
];

export const metadata = {
  title: 'Eden Source Image Control Plane',
  description: 'Temporary Drive-connected image and video storage, approval, and leak-test surface.'
};

export default function EdenSourceImagesPage() {
  return (
    <main className={styles.shell}>
      <aside className={styles.chat}>
        <div className={styles.chatHeader}>
          <div className={styles.brandMark}>ES</div>
          <div>
            <p className={styles.eyebrow}>AI chat editor</p>
            <h1>Eden Media OS</h1>
          </div>
        </div>

        <div className={styles.chatStream}>
          <div className={styles.message}><b>System</b><span>Sandbox-open testing is active. Live external mutation remains locked.</span></div>
          <div className={styles.message}><b>AI Operator</b><span>I can generate, ingest, score, approve, quarantine, and build install packets against the manifest.</span></div>
          <div className={styles.message}><b>Current task</b><span>Attach visible image and video binaries into organized Drive folders, then run leak tests.</span></div>
        </div>

        <div className={styles.promptBox}>
          <textarea aria-label="Eden media command" defaultValue={'Create the first image batch, place files into organized folders, then show me every image and video before approval.'} />
          <div className={styles.composerActions}>
            <button type="button">Generate</button>
            <button type="button">Attach media</button>
            <button type="button">Run leak test</button>
          </div>
        </div>

        <nav className={styles.chatNav} aria-label="Editor sections">
          <a href="#dashboard">Dashboard</a>
          <a href="#images">Images</a>
          <a href="#videos">Videos</a>
          <a href="#manifest">Manifest</a>
          <a href="#approvals">Approvals</a>
          <a href="#leaks">Leaks</a>
        </nav>
      </aside>

      <section id="dashboard" className={styles.dashboard}>
        <header className={styles.topbar}>
          <div>
            <p className={styles.eyebrow}>Center screen dashboard</p>
            <h2>Image and video review board</h2>
          </div>
          <a href="/api/eden/source-images/control-plane">JSON packet</a>
        </header>

        <section className={styles.statusGrid} aria-label="Pipeline status">
          <div><span>Manifest rows</span><strong>12</strong><em>draft image queue</em></div>
          <div><span>Visible previews</span><strong>9</strong><em>image/video slots</em></div>
          <div><span>Verified binaries</span><strong>0</strong><em>pending upload</em></div>
          <div><span>Folder lanes</span><strong>8</strong><em>organized storage</em></div>
        </section>

        <section className={styles.heroPreview}>
          <figure>
            <img src={visualRefs.hero} alt="Eden Skye visual reference preview" />
            <figcaption><b>Selected preview</b><span>Homepage hero source slot. Replace reference image with generated binary when attached.</span></figcaption>
          </figure>
          <div className={styles.reviewPanel}>
            <p className={styles.eyebrow}>Review actions</p>
            <h3>Approve only after visual inspection</h3>
            <button type="button">Mark pending review</button>
            <button type="button">Send to quarantine</button>
            <button type="button">Attach QA receipt</button>
            <button type="button" disabled>Approve public</button>
          </div>
        </section>

        <section id="images" className={styles.section}>
          <div className={styles.sectionHeader}><div><p className={styles.eyebrow}>Direct visuals</p><h3>Image preview gallery</h3></div><span className={styles.testPill}>visible media required</span></div>
          <div className={styles.mediaGrid}>
            {imagePreviews.map(([id, title, ratio, status, src]) => (
              <figure key={id} className={styles.mediaCard}>
                <img src={src} alt={`${title} preview`} />
                <figcaption><b>{id}</b><span>{title}</span><em>{ratio} - {status}</em></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="videos" className={styles.section}>
          <div className={styles.sectionHeader}><div><p className={styles.eyebrow}>Direct visuals</p><h3>Video preview gallery</h3></div><span className={styles.warnPill}>awaiting MP4/WebM</span></div>
          <div className={styles.videoGrid}>
            {videoPreviews.map(([id, title, ratio, status, poster]) => (
              <figure key={id} className={styles.videoCard}>
                <video controls preload="metadata" poster={poster} aria-label={`${title} video preview`} />
                <figcaption><b>{id}</b><span>{title}</span><em>{ratio} - {status}</em></figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section id="manifest" className={styles.section}>
          <div className={styles.sectionHeader}><div><p className={styles.eyebrow}>Source truth</p><h3>Manifest queue</h3></div><span className={styles.testPill}>draft_only</span></div>
          <div className={styles.table}>
            <div className={styles.tableHead}><span>Asset</span><span>Purpose</span><span>Ratio</span><span>Status</span><span>QA</span></div>
            {imageQueue.map(([asset, purpose, ratio, status, qa]) => (
              <div key={asset}><span>{asset}</span><span>{purpose}</span><span>{ratio}</span><span>{status}</span><span>{qa}</span></div>
            ))}
          </div>
        </section>

        <section id="approvals" className={styles.section}>
          <div className={styles.sectionHeader}><div><p className={styles.eyebrow}>Admin control plane</p><h3>Approval and storage manifests</h3></div><span className={styles.warnPill}>live install blocked</span></div>
          <div className={styles.fileList}>
            {manifestFiles.map(([label, name, id]) => (
              <a key={id} href={`https://drive.google.com/file/d/${id}/view`}><b>{label}</b><span>{name}</span><em>{id}</em></a>
            ))}
          </div>
        </section>

        <section id="leaks" className={styles.section}>
          <div className={styles.sectionHeader}><div><p className={styles.eyebrow}>Leak testing</p><h3>Open test pipeline, closed live mutation</h3></div><span className={styles.testPill}>sandbox_open</span></div>
          <div className={styles.leakGrid}>
            {leakTests.map(([id, label, expected]) => (
              <article key={id}><b>{label}</b><span>{id}</span><em>{expected}</em><button type="button">Simulate</button></article>
            ))}
          </div>
        </section>
      </section>

      <aside className={styles.folders} aria-label="Organized media folders">
        <div className={styles.folderHeader}>
          <p className={styles.eyebrow}>Drive folders</p>
          <h3>Organized storage</h3>
        </div>
        <div className={styles.folderList}>
          {folders.map(([name, count, description, id]) => (
            <a key={name} href={`https://drive.google.com/drive/folders/${id}`}>
              <b>{name}</b>
              <span>{count}</span>
              <em>{description}</em>
            </a>
          ))}
        </div>
        <div className={styles.driveBox}>
          <b>Active temp folder</b>
          <span>{drive.temp}</span>
          <b>Quarantine folder</b>
          <span>{drive.quarantine}</span>
        </div>
      </aside>
    </main>
  );
}
