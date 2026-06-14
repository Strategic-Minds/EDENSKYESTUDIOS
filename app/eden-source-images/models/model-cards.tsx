import Link from 'next/link';
import styles from './models.module.css';
import { ModelGroup, ModelRecord, groupLabels, models } from '../admin-data';

function stateLabel(state: ModelRecord['sourceState']) {
  if (state === 'ready') return 'Ready';
  if (state === 'needs-review') return 'Needs review';
  return 'Missing source';
}

function stateClass(state: ModelRecord['sourceState']) {
  if (state === 'ready') return styles.green;
  if (state === 'needs-review') return styles.yellow;
  return styles.red;
}

export function ModelCard({ model }: { model: ModelRecord }) {
  const percent = model.sourceImagesNeeded > 0 ? Math.round((model.sourceImagesReady / model.sourceImagesNeeded) * 100) : 0;

  return (
    <article className={styles.modelCard}>
      <div className={styles.imageFrame}>
        {model.image ? <img src={model.image} alt={`${model.name} source reference`} /> : <div className={styles.missingImage}>X</div>}
        {model.sourceState === 'missing' ? <span className={styles.xBadge}>X</span> : null}
      </div>
      <div className={styles.body}>
        <div className={styles.badgeRow}>
          <span className={`${styles.badge} ${stateClass(model.sourceState)}`}>{stateLabel(model.sourceState)}</span>
          <span className={`${styles.badge} ${styles.yellow}`}>{model.manifestSlot}</span>
        </div>
        <h3>{model.name}</h3>
        <span>{model.role}</span>
        <span>{model.stats}</span>
        <div className={styles.needBox}>
          <span>Source images</span>
          <b>{model.sourceImagesReady}/{model.sourceImagesNeeded}</b>
        </div>
        <div className={styles.progress} aria-label={`${model.name} source image progress`}>
          <i style={{ width: `${percent}%` }} />
        </div>
      </div>
    </article>
  );
}

export function GroupCard({ group }: { group: ModelGroup }) {
  const groupModels = models.filter((model) => model.group === group);
  const missing = groupModels.filter((model) => model.sourceState === 'missing').length;
  const needed = groupModels.reduce((sum, model) => sum + model.sourceImagesNeeded, 0);
  const ready = groupModels.reduce((sum, model) => sum + model.sourceImagesReady, 0);

  return (
    <Link className={styles.groupCard} href={`/eden-source-images/models/${group}`}>
      <p>{group}</p>
      <h3>{groupLabels[group]}</h3>
      <span>{groupModels.length} model{groupModels.length === 1 ? '' : 's'} in this lane</span>
      <div className={styles.groupStats}>
        <span><b>{groupModels.length}</b>Models</span>
        <span><b>{ready}/{needed}</b>Sources</span>
        <span><b>{missing}</b>Missing</span>
      </div>
    </Link>
  );
}
