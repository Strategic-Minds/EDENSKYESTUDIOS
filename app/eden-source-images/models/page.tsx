import Link from 'next/link';
import styles from './models.module.css';
import {
  groupLabels,
  manifestSyncStatus,
  modelSummary,
  models,
  repairedManifest,
  sourceImageManifest,
  sourceManifestSummary
} from '../admin-data';
import { approvedBasicPortraitBatch, approvedBasicPortraits, driveThumbnailUrl } from './approved-basic-portraits';
import { GroupCard, ModelCard } from './model-cards';

export const metadata = {
  title: 'Eden Model Inventory',
  description: 'Model manifest inventory with source image readiness and missing source markers.'
};

export default function EdenModelInventoryPage() {
  const summary = modelSummary();
  const sourceSummary = sourceManifestSummary();
  const missingSources = Math.max(0, summary.sourceImagesNeeded - summary.sourceImagesReady);

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <div>
          <p>Model Inventory</p>
          <h1>Manifest Roster</h1>
          <span>Approved basic portraits are now loaded from Drive. Production manifest slots stay gated until exact filenames, QA, and approval states are clean.</span>
        </div>
        <div className={styles.actions}>
          <Link className={styles.button} href="/eden-source-images">Dashboard</Link>
          <Link className={styles.button} href="/eden-source-images/image-stack">Image Stack</Link>
        </div>
      </header>

      <section className={styles.summary} aria-label="Model inventory summary">
        <div className={styles.metric}><b>{approvedBasicPortraitBatch.count}</b><span>Approved basic portraits</span></div>
        <div className={styles.metric}><b>{summary.sourceImagesReady}/{summary.sourceImagesNeeded}</b><span>Verified production slots</span></div>
        <div className={styles.metric}><b>{missingSources}</b><span>Production images needed</span></div>
        <div className={styles.metric}><b>{sourceSummary.candidates}/{sourceSummary.total}</b><span>Candidate manifest matches</span></div>
        <div className={styles.metric}><b>{sourceSummary.needsReview}</b><span>Need approval cleanup</span></div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <p>green</p>
            <h2>Approved Basic Portrait Roster</h2>
          </div>
          <span className={styles.sourceWarning}><b>{approvedBasicPortraitBatch.title}</b><span>These 13 Drive-backed portrait files are approved for the basic model inventory. They do not automatically unblock the separate 12-slot Eden production manifest.</span></span>
        </div>
        <div className={styles.manifestEmpty}>
          <b>Root folder</b>
          <span>{approvedBasicPortraitBatch.rootFolderId}</span>
          <b>Basic folder</b>
          <span>{approvedBasicPortraitBatch.basicFolderId}</span>
          <b>QA report</b>
          <span>{approvedBasicPortraitBatch.qaReportFileId}</span>
          <b>QA standard</b>
          <span>{approvedBasicPortraitBatch.qaStandard}</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(188px, 1fr))', gap: 16, marginTop: 18 }}>
          {approvedBasicPortraits.map((portrait) => (
            <article key={portrait.driveFileId} style={{ border: '1px solid rgba(255,255,255,0.14)', borderRadius: 8, overflow: 'hidden', background: 'rgba(255,255,255,0.035)' }}>
              <img src={driveThumbnailUrl(portrait.driveFileId)} alt={`${portrait.name} approved basic portrait`} style={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', display: 'block', background: '#050505' }} />
              <div style={{ display: 'grid', gap: 8, padding: 12 }}>
                <span className={`${styles.badge} ${styles.green}`}>approved</span>
                <b style={{ color: '#fff', fontSize: 16 }}>{portrait.index.toString().padStart(2, '0')} - {portrait.name}</b>
                <span style={{ color: 'rgba(255,255,255,0.68)', fontSize: 12, lineHeight: 1.5 }}>{portrait.fileName}</span>
                <span style={{ color: 'rgba(255,255,255,0.52)', fontSize: 11, lineHeight: 1.4 }}>Drive ID: {portrait.driveFileId}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <p>{manifestSyncStatus.state}</p>
            <h2>{manifestSyncStatus.title}</h2>
          </div>
          <span className={styles.sourceWarning}><b>PR #8 remains blocked.</b><span>{manifestSyncStatus.description}</span></span>
        </div>
        <div className={styles.manifestEmpty}>
          <b>Manifest file</b>
          <span>{manifestSyncStatus.requiredSource}</span>
          <b>Drive folder</b>
          <span>{repairedManifest.folder}</span>
          <b>Batch</b>
          <span>{repairedManifest.batchId}</span>
          <b>Next action</b>
          <span>{manifestSyncStatus.nextAction}</span>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <p>Inventory lanes</p>
            <h2>Choose a model group</h2>
          </div>
        </div>
        <div className={styles.groupGrid}>
          {(Object.keys(groupLabels) as Array<keyof typeof groupLabels>).map((group) => <GroupCard group={group} key={group} />)}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <p>Production manifest model</p>
            <h2>Source-image readiness</h2>
          </div>
          <span className={styles.sourceWarning}><b>X means action needed.</b><span>Only manifest-backed production records are shown here. The approved basic portraits above are inventory references, not production-slot replacements.</span></span>
        </div>
        <div className={styles.modelGrid}>
          {models.map((model) => <ModelCard model={model} key={model.id} />)}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <p>Drive manifest slots</p>
            <h2>12 required source images</h2>
          </div>
          <span className={styles.sourceWarning}><b>0 exact matches found.</b><span>Three candidates are yellow; the remaining production slots stay red until exact source binaries are renamed or mapped.</span></span>
        </div>
        <div className={styles.manifestList}>
          {sourceImageManifest.map((record) => (
            <article className={styles.manifestRow} key={record.assetId}>
              <div className={styles.manifestTitle}>
                <span className={`${styles.badge} ${styles[record.approvalColor]}`}>{record.approvalColor}</span>
                <div>
                  <b>{record.outputFilename}</b>
                  <span>{record.purpose}</span>
                </div>
              </div>
              <div className={styles.manifestMeta}>
                <span><b>Slot</b>{record.manifestSlot}</span>
                <span><b>Asset</b>{record.assetType}</span>
                <span><b>QA floor</b>{record.qaMinScore}</span>
                <span><b>Drive file ID</b>{record.driveFileId ?? 'Missing'}</span>
                <span><b>Status</b>{record.approvalStatus}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
