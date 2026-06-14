import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from '../models.module.css';
import { ModelGroup, groupLabels, manifestSyncStatus, models, repairedManifest } from '../../admin-data';
import { ModelCard } from '../model-cards';

const groups: ModelGroup[] = ['female', 'male', 'faceless'];
type GroupParams = Promise<{ group: string }>;

export function generateStaticParams() {
  return groups.map((group) => ({ group }));
}

export async function generateMetadata({ params }: { params: GroupParams }) {
  const { group: rawGroup } = await params;
  const group = rawGroup as ModelGroup;
  return {
    title: groupLabels[group] ? `${groupLabels[group]} Inventory` : 'Model Inventory',
    description: 'Eden Skye Studios model inventory category page.'
  };
}

export default async function EdenModelGroupPage({ params }: { params: GroupParams }) {
  const { group: rawGroup } = await params;
  const group = rawGroup as ModelGroup;
  if (!groups.includes(group)) notFound();

  const groupModels = models.filter((model) => model.group === group);
  const sourceNeeded = groupModels.reduce((sum, model) => sum + model.sourceImagesNeeded, 0);
  const sourceReady = groupModels.reduce((sum, model) => sum + model.sourceImagesReady, 0);
  const missing = groupModels.filter((model) => model.sourceState === 'missing').length;
  const laneEmpty = groupModels.length === 0;

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <div>
          <p>{group} inventory</p>
          <h1>{groupLabels[group]}</h1>
          <span>Only model cards found in the repaired Drive manifest appear here. Empty lanes are intentionally clean.</span>
        </div>
        <div className={styles.actions}>
          <Link className={styles.button} href="/eden-source-images/models">All Models</Link>
          <Link className={styles.button} href="/eden-source-images">Dashboard</Link>
        </div>
      </header>

      <section className={styles.summary} aria-label={`${groupLabels[group]} summary`}>
        <div className={styles.metric}><b>{groupModels.length}</b><span>Manifest models loaded</span></div>
        <div className={styles.metric}><b>{sourceReady}/{sourceNeeded}</b><span>Verified source images</span></div>
        <div className={styles.metric}><b>{Math.max(0, sourceNeeded - sourceReady)}</b><span>Source images needed</span></div>
        <div className={styles.metric}><b>{missing}</b><span>No source image</span></div>
        <div className={styles.metric}><b>{group.toUpperCase()}</b><span>Manifest group</span></div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div>
            <p>Roster</p>
            <h2>{groupLabels[group]} source readiness</h2>
          </div>
          <span className={styles.sourceWarning}><b>Manifest only.</b><span>No placeholder model or old source image is allowed in this lane.</span></span>
        </div>
        {laneEmpty ? (
          <div className={styles.manifestEmpty}>
            <b>No manifest rows</b>
            <span>{groupLabels[group]} has no records in {repairedManifest.title}.</span>
            <b>Source rule</b>
            <span>{manifestSyncStatus.description}</span>
          </div>
        ) : (
          <div className={styles.modelGrid}>
            {groupModels.map((model) => <ModelCard model={model} key={model.id} />)}
          </div>
        )}
      </section>
    </main>
  );
}
