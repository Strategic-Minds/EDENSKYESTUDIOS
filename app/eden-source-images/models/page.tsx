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
import { additionalFemalePortraitBatch, approvedBasicPortraitBatch, approvedBasicPortraits, driveThumbnailUrl } from './approved-basic-portraits';
import { approvedFacelessAccounts, approvedFacelessSourceBatch } from './approved-faceless-roster';
import { approvedInternationalModels, approvedInternationalRosterBatch, internationalThumbnailUrl } from './approved-international-roster';
import { approvedMaleModels, approvedMaleRosterBatch } from './approved-male-roster';
import { GroupCard, ModelCard } from './model-cards';

export const metadata = {
  title: 'Eden Model Inventory',
  description: 'Model manifest inventory with source image readiness and missing source markers.'
};

const cardShell = {
  border: '1px solid rgba(255,255,255,0.14)',
  borderRadius: 8,
  overflow: 'hidden',
  background: 'rgba(255,255,255,0.035)'
};

const cardGrid = (min = 188) => ({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fit, minmax(${min}px, 1fr))`,
  gap: 16,
  marginTop: 18
});

const mutedLine = {
  color: 'rgba(255,255,255,0.68)',
  fontSize: 12,
  lineHeight: 1.5
};

const tinyLine = {
  color: 'rgba(255,255,255,0.52)',
  fontSize: 11,
  lineHeight: 1.4
};

export default function EdenModelInventoryPage() {
  const summary = modelSummary();
  const sourceSummary = sourceManifestSummary();
  const missingSources = Math.max(0, summary.sourceImagesNeeded - summary.sourceImagesReady);
  const loadedRosterRecords = approvedBasicPortraitBatch.count + approvedInternationalRosterBatch.count + approvedMaleRosterBatch.count + approvedFacelessSourceBatch.count;

  return (
    <main className={styles.shell}>
      <header className={styles.header}>
        <div>
          <p>Model Inventory</p>
          <h1>Manifest Roster</h1>
          <span>Approved female, international, male, and faceless source records are loaded from Drive. Production manifest slots stay gated until exact filenames, QA, and approval states are clean.</span>
        </div>
        <div className={styles.actions}>
          <Link className={styles.button} href="/eden-source-images">Dashboard</Link>
          <Link className={styles.button} href="/eden-source-images/image-stack">Image Stack</Link>
        </div>
      </header>

      <section className={styles.summary} aria-label="Model inventory summary">
        <div className={styles.metric}><b>{loadedRosterRecords}</b><span>Roster records loaded</span></div>
        <div className={styles.metric}><b>{approvedBasicPortraitBatch.count}</b><span>Female/basic portraits</span></div>
        <div className={styles.metric}><b>{approvedInternationalRosterBatch.count}</b><span>International sources</span></div>
        <div className={styles.metric}><b>{approvedMaleRosterBatch.count}</b><span>Male portraits approved</span></div>
        <div className={styles.metric}><b>{approvedFacelessSourceBatch.count}</b><span>Faceless accounts approved</span></div>
        <div className={styles.metric}><b>{summary.sourceImagesReady}/{summary.sourceImagesNeeded}</b><span>Verified production slots</span></div>
        <div className={styles.metric}><b>{missingSources}</b><span>Production images needed</span></div>
        <div className={styles.metric}><b>{sourceSummary.needsReview}</b><span>Need approval cleanup</span></div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div><p>green</p><h2>Female Basic Portrait Roster</h2></div>
          <span className={styles.sourceWarning}><b>{approvedBasicPortraitBatch.title}</b><span>{approvedBasicPortraitBatch.count} Drive-backed portrait files are approved for basic female/model inventory. Additional female QA report: {additionalFemalePortraitBatch.qaReportFileId}</span></span>
        </div>
        <div className={styles.manifestEmpty}>
          <b>Root folder</b><span>{approvedBasicPortraitBatch.rootFolderId}</span>
          <b>Basic folder</b><span>{approvedBasicPortraitBatch.basicFolderId}</span>
          <b>QA standard</b><span>{approvedBasicPortraitBatch.qaStandard}</span>
        </div>
        <div style={cardGrid()}>
          {approvedBasicPortraits.map((portrait) => (
            <article key={portrait.driveFileId} style={cardShell}>
              <img src={driveThumbnailUrl(portrait.driveFileId)} alt={`${portrait.name} basic portrait`} style={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', display: 'block', background: '#050505' }} />
              <div style={{ display: 'grid', gap: 8, padding: 12 }}>
                <span className={`${styles.badge} ${styles.green}`}>approved</span>
                <b style={{ color: '#fff', fontSize: 16 }}>{portrait.index.toString().padStart(2, '0')} - {portrait.name}</b>
                <span style={mutedLine}>{portrait.fileName}</span>
                <span style={tinyLine}>Drive ID: {portrait.driveFileId}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div><p>green</p><h2>International Model Sources</h2></div>
          <span className={styles.sourceWarning}><b>{approvedInternationalRosterBatch.title}</b><span>{approvedInternationalRosterBatch.count} approved Drive-backed international source portraits. {approvedInternationalRosterBatch.governanceNote}</span></span>
        </div>
        <div className={styles.manifestEmpty}>
          <b>Root folder</b><span>{approvedInternationalRosterBatch.rootFolderId}</span>
          <b>Source folder</b><span>{approvedInternationalRosterBatch.sourceFolderId}</span>
          <b>Contact sheet</b><span>{approvedInternationalRosterBatch.contactSheetFileId}</span>
        </div>
        <div style={cardGrid()}>
          {approvedInternationalModels.map((model) => (
            <article key={model.driveFileId} style={cardShell}>
              <img src={internationalThumbnailUrl(model.driveFileId)} alt={`${model.name} international source portrait`} style={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', display: 'block', background: '#050505' }} />
              <div style={{ display: 'grid', gap: 8, padding: 12 }}>
                <span className={`${styles.badge} ${styles.green}`}>approved</span>
                <b style={{ color: '#fff', fontSize: 16 }}>{model.index.toString().padStart(2, '0')} - {model.name}</b>
                <span style={{ color: 'rgba(255,255,255,0.78)', fontSize: 13 }}>Age {model.age} - {model.market}</span>
                <span style={mutedLine}>{model.fileName}</span>
                <span style={tinyLine}>Drive ID: {model.driveFileId}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div><p>green</p><h2>Male Model Roster</h2></div>
          <span className={styles.sourceWarning}><b>{approvedMaleRosterBatch.title}</b><span>All {approvedMaleRosterBatch.count} male profiles are operator-approved and matched to Drive-backed portrait PNGs. {approvedMaleRosterBatch.qaStandard}</span></span>
        </div>
        <div className={styles.manifestEmpty}>
          <b>Root folder</b><span>{approvedMaleRosterBatch.rootFolderId}</span>
          <b>Profile text folder</b><span>{approvedMaleRosterBatch.profileTextFolderId}</span>
          <b>Portrait folder</b><span>{approvedMaleRosterBatch.duplicatePortraitsFolderId}</span>
          <b>Status</b><span>{approvedMaleRosterBatch.portraitStatus}</span>
        </div>
        <div style={cardGrid(220)}>
          {approvedMaleModels.map((model) => (
            <article key={model.textFileId} style={cardShell}>
              {model.portraitFileId ? (
                <img src={driveThumbnailUrl(model.portraitFileId)} alt={`${model.name} male portrait`} style={{ width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', display: 'block', background: '#050505' }} />
              ) : (
                <div style={{ display: 'grid', placeItems: 'center', minHeight: 220, aspectRatio: '4 / 5', background: 'linear-gradient(135deg, rgba(255,255,255,0.075), rgba(255,255,255,0.018))', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <span className={`${styles.badge} ${styles.green}`}>approved profile</span>
                </div>
              )}
              <div style={{ display: 'grid', gap: 8, padding: 12 }}>
                <span className={`${styles.badge} ${styles.green}`}>approved portrait</span>
                <b style={{ color: '#fff', fontSize: 16 }}>{model.index.toString().padStart(2, '0')} - {model.name}</b>
                <span style={{ color: 'rgba(255,255,255,0.78)', fontSize: 13 }}>Age {model.age} - {model.archetype}</span>
                <span style={{ color: 'rgba(255,255,255,0.78)', fontSize: 13 }}>QA {model.qaScore ?? 'Pending'}/100 - {model.qaStatus.replaceAll('-', ' ')}</span>
                <span style={{ color: 'rgba(255,255,255,0.58)', fontSize: 11, lineHeight: 1.4 }}>{model.qaNotes}</span>
                <span style={mutedLine}>{model.notes}</span>
                <span style={mutedLine}>{model.portraitFileName ?? 'Portrait file pending'}</span>
                <span style={tinyLine}>Drive ID: {model.portraitFileId ?? 'Missing'}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div><p>green</p><h2>Faceless Account Source Pack</h2></div>
          <span className={styles.sourceWarning}><b>{approvedFacelessSourceBatch.title}</b><span>{approvedFacelessSourceBatch.sourceStatus} {approvedFacelessSourceBatch.planningStatus}</span></span>
        </div>
        <div className={styles.manifestEmpty}>
          <b>Root folder</b><span>{approvedFacelessSourceBatch.rootFolderId}</span>
          <b>Pack folder</b><span>{approvedFacelessSourceBatch.packFolderId}</span>
          <b>Master index</b><span>{approvedFacelessSourceBatch.masterIndexFileId}</span>
          <b>30-day proof loop</b><span>{approvedFacelessSourceBatch.validationThreshold}</span>
        </div>
        <div style={cardGrid(260)}>
          {approvedFacelessAccounts.map((account) => (
            <article key={account.sourceFileId} style={cardShell}>
              <div style={{ display: 'grid', placeItems: 'center', minHeight: 132, background: `linear-gradient(135deg, ${account.brandKit.accentColor}33, rgba(255,255,255,0.02))`, borderBottom: '1px solid rgba(255,255,255,0.1)', padding: 16, textAlign: 'center' }}>
                <span className={`${styles.badge} ${styles.green}`}>approved concept</span>
              </div>
              <div style={{ display: 'grid', gap: 8, padding: 12 }}>
                <span className={`${styles.badge} ${styles.green}`}>30-day calendar staged</span>
                <b style={{ color: '#fff', fontSize: 16 }}>{account.rank.toString().padStart(2, '0')} - {account.concept}</b>
                <span style={{ color: 'rgba(255,255,255,0.78)', fontSize: 13 }}>{account.boardTheme} - {account.riskLevel}</span>
                <span style={mutedLine}>{account.platformFit}</span>
                <span style={mutedLine}>{account.monetizationPath}</span>
                <span style={{ color: 'rgba(255,255,255,0.78)', fontSize: 12, lineHeight: 1.5 }}>Brand kit: {account.brandKit.visualStyle}</span>
                <span style={{ color: 'rgba(255,255,255,0.62)', fontSize: 11, lineHeight: 1.5 }}>Pillars: {account.brandKit.contentPillars.join(' / ')}</span>
                <span style={{ color: 'rgba(255,255,255,0.62)', fontSize: 11, lineHeight: 1.5 }}>Assets needed: {account.brandKit.assetNeeds.join(' / ')}</span>
                <span style={{ color: 'rgba(255,255,255,0.78)', fontSize: 12, lineHeight: 1.5 }}>{account.contentCalendar.length} draft posts staged. Showing first 5:</span>
                <div style={{ display: 'grid', gap: 6, paddingTop: 4 }}>
                  {account.contentCalendar.slice(0, 5).map((item) => (
                    <span key={item.day} style={{ color: 'rgba(255,255,255,0.62)', fontSize: 11, lineHeight: 1.45 }}>
                      Day {item.day}: {item.theme} - {item.format} - {item.hook}
                    </span>
                  ))}
                </div>
                <span style={tinyLine}>{account.sourceFileName} - {account.sourceFileId}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div><p>{manifestSyncStatus.state}</p><h2>{manifestSyncStatus.title}</h2></div>
          <span className={styles.sourceWarning}><b>PR #8 remains blocked.</b><span>{manifestSyncStatus.description}</span></span>
        </div>
        <div className={styles.manifestEmpty}>
          <b>Manifest file</b><span>{manifestSyncStatus.requiredSource}</span>
          <b>Drive folder</b><span>{repairedManifest.folder}</span>
          <b>Batch</b><span>{repairedManifest.batchId}</span>
          <b>Next action</b><span>{manifestSyncStatus.nextAction}</span>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}><div><p>Inventory lanes</p><h2>Choose a model group</h2></div></div>
        <div className={styles.groupGrid}>
          {(Object.keys(groupLabels) as Array<keyof typeof groupLabels>).map((group) => <GroupCard group={group} key={group} />)}
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div><p>Production manifest model</p><h2>Source-image readiness</h2></div>
          <span className={styles.sourceWarning}><b>X means action needed.</b><span>Only manifest-backed production records are shown here. The approved rosters above are inventory references, not production-slot replacements.</span></span>
        </div>
        <div className={styles.modelGrid}>{models.map((model) => <ModelCard model={model} key={model.id} />)}</div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <div><p>Drive manifest slots</p><h2>12 required source images</h2></div>
          <span className={styles.sourceWarning}><b>0 exact matches found.</b><span>Three candidates are yellow; the remaining production slots stay red until exact source binaries are renamed or mapped.</span></span>
        </div>
        <div className={styles.manifestList}>
          {sourceImageManifest.map((record) => (
            <article className={styles.manifestRow} key={record.assetId}>
              <div className={styles.manifestTitle}>
                <span className={`${styles.badge} ${styles[record.approvalColor]}`}>{record.approvalColor}</span>
                <div><b>{record.outputFilename}</b><span>{record.purpose}</span></div>
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
