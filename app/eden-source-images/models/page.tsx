import Link from 'next/link';
import styles from './models.module.css';
import { groupLabels, modelSummary, models } from '../admin-data';
import { GroupCard, ModelCard } from './model-cards';

export const metadata = {
  title: 'Eden Model Inventory',
  description: 'Model manifest inventory with source image readiness and missing source markers.'
};

export default function EdenModelInventoryPage() {
  const summary = modelSummary();
  const missingSources = Math.max(0, summary.sourceImagesNeeded - summary.sourceImagesReady);

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <div>
          <p>Model Inventory</p>
          <h1>Manifest Roster</h1>
          <span>Every model lane, source-image count, and missing source marker in one place.</span>
        </div>
        <div className={styles.actions}>
          <Link className={styles.button} href="/eden-source-images">Dashboard</Link>
          <Link className={styles.button} href="/eden-source-images/image-stack">Image Stack</Link>
        </div>
      </header>

      <section className={styles.summary} aria-label="Model inventory summary">
        <div className={styles.metric}><b>{summary.total}</b><span>Total models</span></div>
        <div className={styles.metric}><b>{summary.sourceImagesReady}/{summary.sourceImagesNeeded}</b><span>Source images ready</span></div>
        <div className={styles.metric}><b>{missingSources}</b><span>Source images needed</span></div>
        <div className={styles.metric}><b>{summary.needsReview}</b><span>Need review</span></div>
        <div className={styles.metric}><b>{summary.missing}</b><span>No source image</span></div>
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
          <span className={styles.sourceWarning}><b>X means action needed.</b><span>No source image has been attached to that model yet.</span></span>
        </div>
        <div className={styles.modelGrid}>
          {models.map((model) => <ModelCard model={model} key={model.id} />)}
        </div>
      </section>
    </main>
  );
}
