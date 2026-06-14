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
          <span>Inventory is now rebuilt from the repaired Drive manifest only. Generic image titles stay red until they are matched to exact manifest filenames and Drive file IDs.</span>
        </div>
        <div className={styles.actions}>
          <Link className={styles.button} href="/eden-source-images">Dashboard</Link>
          <Link className={styles.button} href="/eden-source-images/image-stack">Image Stack</Link>
        </div>
      </header>

      <section className={styles.summary} aria-label="Model inventory summary">
        <div className={styles.metric}><b>{summary.total}</b><span>Total manifest models loaded</span></div>
        <div className={styles.metric}><b>{summary.sourceImagesReady}/{summary.sourceImagesNeeded}</b><span>Verified source images</span></div>
        <div className={styles.metric}><b>{missingSources}</b><span>Source images needed</span></div>
        <div className={styles.metric}><b>{sourceSummary.matched}/{sourceSummary.total}</b><span>Drive filename matches</span></div>
        <div className={styles.metric}><b>{sourceSummary.needsReview}</b><span>Need approval cleanup</span></div>
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
            <p>All manifest models</p>
            <h2>Source-image readiness</h2>
          </div>
          <span className={styles.sourceWarning}><b>X means action needed.</b><span>Only manifest-backed records are shown here. No placeholder model or old source image is allowed.</span></span>
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
          <span className={styles.sourceWarning}><b>0 exact matches found.</b><span>TEMP IMAGES has generic ChatGPT filenames, so these stay red until each binary is renamed or mapped.</span></span>
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
