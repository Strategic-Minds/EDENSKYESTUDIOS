import styles from './page.module.css';

const drive = {
  root: '1oCEjD6kUm9FiYDh1w-dNE9PPiggj65MQ',
  imageFactory: '1lu7fo915TDlJPT4U3VZGexcWBJ9dpi2b',
  stockAssets: '1V8MNsOdvLNSd04JQrnyvH1ECnj3nOF8P',
  quarantine: '1sKBf_icBG8X_xKCm8QKOsbMhMxSZaOP2',
  temp: '1kokL57oAzvL40ee6nC3v1AA8hinarWJe',
  approvalControl: '1EMnjZKTBT4wlO0ZgR5F6tXDKV1dvK76x'
};

const manifestFiles = [
  ['Repaired stock manifest', 'STOCK_IMAGE_MASTER_MANIFEST_REPAIRED.csv', '1aQmG63GyarR8XsS14u6-Sn_yG64vtnXI'],
  ['Daily image queue', 'TODAY_IMAGE_BATCH_QUEUE_2026-06-12.csv', '1aH52Mk3xbLvLKvQ2cEGiJYRcxqGeydjB'],
  ['Image agent contract', 'IMAGE_AGENT_RUN_CONTRACT_2026-06-12.json', '1MLyTiLrupv1TdygLcBCxY7xj59iZG41G'],
  ['Original 80-slot manifest', 'STOCK_IMAGE_MASTER_MANIFEST.csv', '1j5s6ZKDBsIaGe7CIzphxg2CznmSgpCYj'],
  ['Model image requirements', 'MODEL_IMAGE_REQUIREMENTS.csv', '1Jg39oqnhjYtfkXat5MMU3j15u6710euO']
];

const imageQueue = [
  ['eden-skye-001', 'Identity lock front portrait', '4:5', 'pending_binary', '92', 'manual review'],
  ['eden-skye-002', 'Identity lock three-quarter portrait', '4:5', 'pending_binary', '92', 'manual review'],
  ['eden-skye-003', 'Identity lock side profile', '4:5', 'pending_binary', '92', 'manual review'],
  ['eden-skye-004', 'Portfolio black card portrait', '4:5', 'pending_binary', '90', 'manual review'],
  ['eden-skye-005', 'Portfolio white blazer', '4:5', 'pending_binary', '90', 'manual review'],
  ['eden-skye-006', 'Homepage hero', '16:9', 'pending_binary', '90', 'manual review'],
  ['eden-skye-007', 'Models page hero', '16:9', 'pending_binary', '90', 'manual review'],
  ['eden-skye-008', 'Wardrobe-safe full body', '9:16', 'pending_binary', '94', 'manual review'],
  ['eden-skye-009', 'Closet environment plate', '16:9', 'pending_binary', '88', 'manual review'],
  ['eden-skye-010', 'Social vertical portrait', '9:16', 'pending_binary', '90', 'manual review'],
  ['eden-skye-011', 'HeyGen headshot source', '1:1', 'pending_binary', '95', 'manual review'],
  ['eden-skye-012', 'HeyGen half-body presenter', '9:16', 'pending_binary', '95', 'manual review']
];

const leakTests = [
  ['publish_public', 'Simulate public publish attempt', 'must stay blocked'],
  ['replace_website_assets', 'Simulate live website asset replacement', 'must stay blocked'],
  ['activate_shopify_assets', 'Simulate Shopify media/product activation', 'must stay blocked'],
  ['activate_heygen_final_avatar', 'Simulate final HeyGen avatar activation', 'must stay blocked'],
  ['drive_move_parent', 'Simulate destructive Drive parent move', 'must stay blocked'],
  ['supabase_service_write', 'Simulate service-role production write', 'must stay blocked']
];

const editorJobs = [
  ['Generate', 'Create image drafts from manifest prompts in editor UI only'],
  ['Ingest', 'Attach or map generated files to expected output filenames'],
  ['Score', 'Record QA score, crop match, identity drift, safety notes'],
  ['Approve', 'Move to pending admin review or quarantine in test mode'],
  ['Install', 'Only create install packet until exact approval is present']
];

export const metadata = {
  title: 'Eden Source Image Control Plane',
  description: 'Temporary Drive-connected image storage, approval, and leak-test surface.'
};

export default function EdenSourceImagesPage() {
  return (
    <main className={styles.shell}>
      <aside className={styles.chat}>
        <div className={styles.brandMark}>ES</div>
        <div>
          <p className={styles.eyebrow}>Eden image editor</p>
          <h1>Source Image Control Plane</h1>
          <p className={styles.chatIntro}>
            Chat drives the image and video work. The editor records manifest matches, Drive storage,
            approvals, quarantine, and leak-test receipts.
          </p>
        </div>

        <div className={styles.composer}>
          <div className={styles.message}>
            <b>System</b>
            <span>Sandbox-open mode is active for testing. Live external mutation remains locked.</span>
          </div>
          <div className={styles.message}>
            <b>Operator</b>
            <span>Generate image drafts from manifest rows, attach binaries, then score before approval.</span>
          </div>
          <textarea
            aria-label="Eden source image command"
            defaultValue={'Generate eden-skye-001 through eden-skye-012 as draft images, store in TEMP, and run leak checks.'}
          />
          <div className={styles.composerActions}>
            <button type="button">Queue draft</button>
            <button type="button">Run leak test</button>
          </div>
        </div>

        <nav className={styles.chatNav} aria-label="Control plane sections">
          <a href="#manifest">Manifest</a>
          <a href="#bulk-storage">Bulk Storage</a>
          <a href="#approval">Approval</a>
          <a href="#leak-tests">Leak Tests</a>
          <a href="#video">Video Queue</a>
        </nav>
      </aside>

      <section className={styles.editor}>
        <header className={styles.topbar}>
          <div>
            <p className={styles.eyebrow}>Temporary Drive-connected admin surface</p>
            <h2>Bulk image storage, approval, and leak detection</h2>
          </div>
          <a href="/api/eden/source-images/control-plane">JSON control packet</a>
        </header>

        <section className={styles.statusGrid} aria-label="Pipeline status">
          <div><span>Manifest rows</span><strong>12</strong><em>draft image queue</em></div>
          <div><span>Verified binaries</span><strong>0</strong><em>must be attached</em></div>
          <div><span>Drive mode</span><strong>Temp</strong><em>bulk storage only</em></div>
          <div><span>Leak mode</span><strong>Open</strong><em>simulated tests</em></div>
        </section>

        <section className={styles.canvas}>
          <div className={styles.visualStage}>
            <div className={styles.stageGlow} />
            <div className={styles.placeholder}>
              <span>ES</span>
              <b>Awaiting source image binaries</b>
              <p>Drop generated image outputs here, then match each file to the manifest output filename.</p>
            </div>
          </div>
          <div className={styles.sidePanel}>
            <h3>Editor workflow</h3>
            {editorJobs.map(([step, copy]) => (
              <div key={step} className={styles.job}>
                <b>{step}</b>
                <span>{copy}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="manifest" className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>Source truth</p>
              <h3>Manifest-connected image queue</h3>
            </div>
            <span className={styles.testPill}>draft_only</span>
          </div>
          <div className={styles.table}>
            <div className={styles.tableHead}>
              <span>Asset</span><span>Purpose</span><span>Ratio</span><span>Status</span><span>QA</span><span>Gate</span>
            </div>
            {imageQueue.map(([asset, purpose, ratio, status, qa, gate]) => (
              <div key={asset}>
                <span>{asset}</span><span>{purpose}</span><span>{ratio}</span><span>{status}</span><span>{qa}</span><span>{gate}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="bulk-storage" className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>Drive temporary bridge</p>
              <h3>Bulk storage and manifest files</h3>
            </div>
            <span className={styles.testPill}>no destructive moves</span>
          </div>
          <div className={styles.driveGrid}>
            <div><b>Root</b><span>{drive.root}</span></div>
            <div><b>Image factory</b><span>{drive.imageFactory}</span></div>
            <div><b>Stock assets</b><span>{drive.stockAssets}</span></div>
            <div><b>Temp storage</b><span>{drive.temp}</span></div>
            <div><b>Quarantine</b><span>{drive.quarantine}</span></div>
            <div><b>Approvals</b><span>{drive.approvalControl}</span></div>
          </div>
          <div className={styles.fileList}>
            {manifestFiles.map(([label, name, id]) => (
              <a key={id} href={`https://drive.google.com/file/d/${id}/view`}>
                <b>{label}</b>
                <span>{name}</span>
                <em>{id}</em>
              </a>
            ))}
          </div>
        </section>

        <section id="approval" className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>Admin control plane</p>
              <h3>Approval actions exposed for testing</h3>
            </div>
            <span className={styles.warnPill}>live install blocked</span>
          </div>
          <div className={styles.approvalGrid}>
            <button type="button">Mark pending review</button>
            <button type="button">Quarantine regenerate</button>
            <button type="button">Attach QA receipt</button>
            <button type="button">Build install packet</button>
            <button type="button" disabled>Approve public</button>
            <button type="button" disabled>Replace live asset</button>
          </div>
        </section>

        <section id="leak-tests" className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>Leak and bypass testing</p>
              <h3>Open test pipeline, closed live mutation</h3>
            </div>
            <span className={styles.testPill}>sandbox_open</span>
          </div>
          <div className={styles.leakGrid}>
            {leakTests.map(([id, label, expected]) => (
              <article key={id}>
                <b>{label}</b>
                <span>{id}</span>
                <em>{expected}</em>
                <button type="button">Simulate</button>
              </article>
            ))}
          </div>
        </section>

        <section id="video" className={styles.section}>
          <div className={styles.sectionHeader}>
            <div>
              <p className={styles.eyebrow}>Video creation lane</p>
              <h3>Editor-created video assets stay draft-only</h3>
            </div>
            <span className={styles.warnPill}>HeyGen final activation locked</span>
          </div>
          <p className={styles.copy}>
            Video prompts and avatar packets can be created in this editor and stored as draft packets.
            The page intentionally separates draft packet creation from final avatar/video activation so
            leaks are visible without burning money or publishing assets.
          </p>
        </section>
      </section>
    </main>
  );
}
