'use client';

import { ChangeEvent, DragEvent, useEffect, useMemo, useState } from 'react';
import styles from './image-stack.module.css';

type ReviewFolder = 'Drafts' | 'Needs Review' | 'Approved' | 'Rejected' | 'Drive Ready';
type Filter = 'All Images' | ReviewFolder;
type ApprovalColor = 'green' | 'yellow' | 'red';
type AssetSource = 'drive' | 'local' | 'generated';

type Asset = {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  folder: ReviewFolder;
  qa: number;
  qaMin: number;
  note: string;
  selected: boolean;
  source: AssetSource;
  approvalColor: ApprovalColor;
  approvalStatus: string;
  driveFileId?: string;
  driveUrl?: string;
  manifestSlot?: string;
  targetFilename?: string;
  matchConfidence?: 'clean' | 'provisional' | 'unmatched';
  originalPrompt?: string;
  productionPrompt?: string;
  model?: string;
  ingestReceiptId?: string;
  githubNotation?: string;
  supabaseReceiptId?: string;
  recordedAt?: string;
};

type ApprovalMapResponse = {
  summary: {
    totalTempImages: number;
    manifestSlots: number;
    provisionalMatches: number;
    cleanMatches: number;
    unmatched: number;
    readyForPr8Promotion: boolean;
  };
  assets: Array<{
    driveFileId: string;
    filename: string;
    manifestSlot: string;
    targetFilename: string;
    qaScore: number;
    qaMinScore: number;
    approvalColor: ApprovalColor;
    approvalStatus: string;
    reviewFolder: ReviewFolder;
    matchConfidence: 'provisional' | 'unmatched';
    note: string;
    driveUrl: string;
    thumbnailUrl: string;
  }>;
};

type IngestRecord = {
  receiptId: string;
  filename: string;
  targetFilename: string;
  manifestSlot: string;
  qaScore: number;
  qaMinScore: number;
  approvalColor: ApprovalColor;
  approvalStatus: string;
  approvalFolder: ReviewFolder;
  driveFileId: string | null;
  driveUrl: string | null;
  supabaseReceiptId: string;
  githubNotation: string;
  recordedAt: string;
  writeMode: 'receipt_only';
};

type IngestResponse = {
  ok: boolean;
  record: IngestRecord;
};

const filters: Filter[] = ['All Images', 'Drafts', 'Needs Review', 'Approved', 'Rejected', 'Drive Ready'];
const primaryEmail = 'strategicmindsadvisory@gmail.com';
const ingestStorageKey = 'eden-image-stack-ingest-records-v1';

function formatSize(size: number) {
  if (!size) return 'Drive image';
  if (size > 1024 * 1024) return `${(size / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(size / 1024))} KB`;
}

function folderNote(folder: ReviewFolder) {
  if (folder === 'Approved') return 'Approved by admin review';
  if (folder === 'Rejected') return 'Rejected for regeneration';
  if (folder === 'Drive Ready') return 'Approved and ready for Drive upload packet';
  if (folder === 'Needs Review') return 'Needs visual QA and manifest confirmation';
  return 'Pending admin review';
}

function approvalColorForFolder(folder: ReviewFolder): ApprovalColor {
  if (folder === 'Approved' || folder === 'Drive Ready') return 'green';
  if (folder === 'Rejected') return 'red';
  return 'yellow';
}

function safeStorageRead(): IngestRecord[] {
  if (typeof window === 'undefined') return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(ingestStorageKey) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function safeStorageWrite(records: IngestRecord[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(ingestStorageKey, JSON.stringify(records.slice(0, 250)));
}

function buildLocalTargetFilename(file: File, index: number) {
  const extension = file.name.match(/\.([a-z0-9]+)$/i)?.[1]?.toLowerCase() || 'png';
  const cleanName = file.name.toLowerCase().replace(/\.[a-z0-9]+$/i, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 42) || 'source-upload';
  return `eden-skye-upload-${String(index + 1).padStart(3, '0')}_${cleanName}.${extension}`;
}

function applyRecordToAsset(asset: Asset, record: IngestRecord): Asset {
  return {
    ...asset,
    name: asset.source === 'local' ? record.targetFilename : asset.name,
    folder: record.approvalFolder,
    qa: record.qaScore,
    qaMin: record.qaMinScore,
    approvalColor: record.approvalColor,
    approvalStatus: record.approvalStatus,
    note: `${record.approvalStatus}. Receipt ${record.receiptId}.`,
    manifestSlot: record.manifestSlot,
    targetFilename: record.targetFilename,
    driveFileId: record.driveFileId || asset.driveFileId,
    driveUrl: record.driveUrl || asset.driveUrl,
    ingestReceiptId: record.receiptId,
    githubNotation: record.githubNotation,
    supabaseReceiptId: record.supabaseReceiptId,
    recordedAt: record.recordedAt,
    matchConfidence: record.manifestSlot === 'unassigned-upload' ? 'unmatched' : asset.matchConfidence || 'provisional'
  };
}

export default function EdenImageStackPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [ingestRecords, setIngestRecords] = useState<IngestRecord[]>([]);
  const [activeFilter, setActiveFilter] = useState<Filter>('All Images');
  const [view, setView] = useState<'grid' | 'dense'>('grid');
  const [sort, setSort] = useState<'newest' | 'name' | 'qa'>('newest');
  const [expandedAsset, setExpandedAsset] = useState<Asset | null>(null);
  const [mapSummary, setMapSummary] = useState<ApprovalMapResponse['summary'] | null>(null);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [ingestState, setIngestState] = useState<'idle' | 'recording' | 'ready' | 'error'>('idle');

  useEffect(() => {
    setIngestRecords(safeStorageRead());
  }, []);

  useEffect(() => {
    let mounted = true;

    fetch('/api/eden/source-images/drive-approval-map')
      .then((response) => {
        if (!response.ok) throw new Error('Approval map unavailable');
        return response.json() as Promise<ApprovalMapResponse>;
      })
      .then((data) => {
        if (!mounted) return;
        setMapSummary(data.summary);
        setAssets((current) => {
          const localAssets = current.filter((asset) => asset.source === 'local' || asset.source === 'generated');
          const driveAssets = data.assets.map((asset): Asset => ({
            id: `drive-${asset.driveFileId}`,
            name: asset.filename,
            size: 0,
            type: 'image/png',
            url: asset.thumbnailUrl,
            folder: asset.reviewFolder,
            qa: asset.qaScore,
            qaMin: asset.qaMinScore,
            note: asset.note,
            selected: false,
            source: 'drive',
            approvalColor: asset.approvalColor,
            approvalStatus: asset.approvalStatus,
            driveFileId: asset.driveFileId,
            driveUrl: asset.driveUrl,
            manifestSlot: asset.manifestSlot,
            targetFilename: asset.targetFilename,
            matchConfidence: asset.matchConfidence
          }));
          return [...driveAssets, ...localAssets].sort((a, b) => b.id.localeCompare(a.id));
        });
        setLoadState('ready');
      })
      .catch(() => {
        if (!mounted) return;
        setLoadState('error');
      });

    return () => {
      mounted = false;
    };
  }, []);

  const visibleAssets = useMemo(() => {
    const filtered = activeFilter === 'All Images' ? assets : assets.filter((asset) => asset.folder === activeFilter);
    return [...filtered].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'qa') return b.qa - a.qa;
      return b.id.localeCompare(a.id);
    });
  }, [activeFilter, assets, sort]);

  const selectedCount = assets.filter((asset) => asset.selected).length;
  const driveCount = assets.filter((asset) => asset.source === 'drive').length;
  const cleanMatches = mapSummary?.cleanMatches ?? 0;
  const provisionalMatches = mapSummary?.provisionalMatches ?? 0;
  const lastRecord = ingestRecords[0];

  async function recordAsset(asset: Asset, reason: string, overrides: Partial<Asset> = {}) {
    setIngestState('recording');
    const nextAsset = { ...asset, ...overrides };
    try {
      const response = await fetch('/api/eden/source-images/ingest-generated', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          source: nextAsset.source,
          reason,
          filename: nextAsset.name,
          originalPrompt: nextAsset.originalPrompt || 'Uploaded or generated in Eden Image Stack editor.',
          productionPrompt: nextAsset.productionPrompt || 'Pending Eden production prompt capture.',
          model: nextAsset.model || 'unknown-editor-source',
          mimeType: nextAsset.type,
          size: nextAsset.size,
          approvalFolder: nextAsset.folder,
          approvalStatus: nextAsset.approvalStatus,
          approvalColor: nextAsset.approvalColor,
          qaScore: nextAsset.qa,
          qaMinScore: nextAsset.qaMin,
          manifestSlot: nextAsset.manifestSlot,
          targetFilename: nextAsset.targetFilename,
          driveFileId: nextAsset.driveFileId,
          driveUrl: nextAsset.driveUrl,
          matchConfidence: nextAsset.matchConfidence
        })
      });
      if (!response.ok) throw new Error('Ingest receipt failed');
      const data = await response.json() as IngestResponse;
      const nextRecords = [data.record, ...safeStorageRead().filter((record) => record.receiptId !== data.record.receiptId)];
      safeStorageWrite(nextRecords);
      setIngestRecords(nextRecords);
      setAssets((current) => current.map((currentAsset) => currentAsset.id === asset.id ? applyRecordToAsset(currentAsset, data.record) : currentAsset));
      setIngestState('ready');
    } catch {
      setIngestState('error');
    }
  }

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const files = Array.from(fileList).filter((file) => file.type.startsWith('image/'));
    const nextAssets = files.map((file, index): Asset => {
      const targetFilename = buildLocalTargetFilename(file, index);
      return {
        id: `local-${Date.now()}-${file.name}-${Math.random().toString(16).slice(2)}`,
        name: file.name,
        size: file.size,
        type: file.type || 'image',
        url: URL.createObjectURL(file),
        folder: 'Needs Review',
        qa: 0,
        qaMin: 90,
        note: 'Local browser draft. Ingest receipt is being prepared; binary still needs Drive upload.',
        selected: false,
        source: 'local',
        approvalColor: 'yellow',
        approvalStatus: 'Needs visual QA and Drive upload',
        manifestSlot: targetFilename.match(/eden-skye-\d{3}/)?.[0] || 'unassigned-upload',
        targetFilename,
        matchConfidence: 'unmatched'
      };
    });
    setAssets((current) => [...nextAssets, ...current]);
    setActiveFilter('Needs Review');
    nextAssets.forEach((asset) => void recordAsset(asset, 'local_upload_metadata_ingest'));
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    addFiles(event.dataTransfer.files);
  }

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    addFiles(event.currentTarget.files);
    event.currentTarget.value = '';
  }

  function moveSelected(folder: ReviewFolder) {
    const selectedAssets = assets.filter((asset) => asset.selected);
    setAssets((current) => current.map((asset) => asset.selected ? { ...asset, folder, selected: false, note: folderNote(folder), approvalColor: approvalColorForFolder(folder), approvalStatus: folderNote(folder) } : asset));
    setActiveFilter(folder);
    selectedAssets.forEach((asset) => void recordAsset(asset, `batch_move_${folder.toLowerCase().replace(/\s+/g, '_')}`, { folder, selected: false, note: folderNote(folder), approvalColor: approvalColorForFolder(folder), approvalStatus: folderNote(folder) }));
  }

  function moveOne(id: string, folder: ReviewFolder) {
    const asset = assets.find((candidate) => candidate.id === id);
    setAssets((current) => current.map((currentAsset) => currentAsset.id === id ? { ...currentAsset, folder, selected: false, note: folderNote(folder), approvalColor: approvalColorForFolder(folder), approvalStatus: folderNote(folder) } : currentAsset));
    if (asset) void recordAsset(asset, `move_${folder.toLowerCase().replace(/\s+/g, '_')}`, { folder, selected: false, note: folderNote(folder), approvalColor: approvalColorForFolder(folder), approvalStatus: folderNote(folder) });
  }

  function setQa(id: string, qa: number) {
    setAssets((current) => current.map((asset) => asset.id === id ? { ...asset, qa } : asset));
  }

  function recordQa(id: string) {
    const asset = assets.find((candidate) => candidate.id === id);
    if (asset) void recordAsset(asset, 'qa_score_update');
  }

  function toggleSelected(id: string) {
    setAssets((current) => current.map((asset) => asset.id === id ? { ...asset, selected: !asset.selected } : asset));
  }

  function selectVisible() {
    const visibleIds = new Set(visibleAssets.map((asset) => asset.id));
    setAssets((current) => current.map((asset) => visibleIds.has(asset.id) ? { ...asset, selected: true } : asset));
  }

  function clearSelection() {
    setAssets((current) => current.map((asset) => ({ ...asset, selected: false })));
  }

  function countFor(filter: Filter) {
    if (filter === 'All Images') return assets.length;
    return assets.filter((asset) => asset.folder === filter).length;
  }

  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brandMark}>ES</div>
        <div>
          <p>Eden Skye Studios</p>
          <h1>Image Stack Admin</h1>
          <span>{primaryEmail}</span>
        </div>
        <div className={styles.statusPanel}>
          <b>Drive pool</b>
          <span>{loadState === 'loading' ? 'Loading TEMP IMAGES...' : loadState === 'error' ? 'Approval map unavailable' : `${driveCount} Drive images loaded`}</span>
          <span>{cleanMatches} clean matches / {provisionalMatches} provisional / PR #8 blocked</span>
        </div>
        <div className={styles.ingestPanel}>
          <b>Ingest receipts</b>
          <span>{ingestRecords.length} browser-saved records</span>
          <span>{ingestState === 'recording' ? 'Recording...' : ingestState === 'error' ? 'Last record failed' : lastRecord ? `Last: ${lastRecord.receiptId}` : 'Ready for uploads'}</span>
          {lastRecord && <em>{lastRecord.filename} / {lastRecord.approvalColor.toUpperCase()} / {lastRecord.manifestSlot}</em>}
        </div>
        <div className={styles.legend}>
          <span><i className={styles.greenDot} /> Green verified</span>
          <span><i className={styles.yellowDot} /> Yellow needs review</span>
          <span><i className={styles.redDot} /> Red blocked</span>
        </div>
        <label className={styles.dropZone} onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
          <input type="file" accept="image/*" multiple onChange={handleInput} />
          <b>Drop images here</b>
          <span>Uploads are titled, categorized, routed to review, saved as browser receipts, and sent to the ingest API for notation.</span>
        </label>
        <div className={styles.folderList}>
          {filters.map((filter) => (
            <button key={filter} type="button" className={activeFilter === filter ? styles.activeFolder : ''} onClick={() => setActiveFilter(filter)}>
              <b>{filter}</b>
              <span>{countFor(filter)}</span>
            </button>
          ))}
        </div>
      </aside>

      <section className={styles.workspace}>
        <header className={styles.topbar}>
          <div>
            <p>Admin-safe approval plane</p>
            <h2>{activeFilter}</h2>
            <span>{assets.length} stacked images / {selectedCount} selected / every change creates an ingest receipt</span>
          </div>
          <nav>
            <a href="/eden-source-images">Editor</a>
            <a href="/api/eden/source-images/ingest-generated">Ingest API</a>
            <button type="button" onClick={() => setView(view === 'grid' ? 'dense' : 'grid')}>{view === 'grid' ? 'Dense View' : 'Grid View'}</button>
            <select value={sort} onChange={(event) => setSort(event.currentTarget.value as 'newest' | 'name' | 'qa')}>
              <option value="newest">Newest</option>
              <option value="name">Name</option>
              <option value="qa">QA score</option>
            </select>
          </nav>
        </header>

        <div className={styles.batchBar}>
          <button type="button" onClick={selectVisible}>Select visible</button>
          <button type="button" onClick={clearSelection}>Clear</button>
          <button type="button" onClick={() => moveSelected('Needs Review')} disabled={!selectedCount}>Move to review</button>
          <button type="button" onClick={() => moveSelected('Approved')} disabled={!selectedCount}>Approve</button>
          <button type="button" onClick={() => moveSelected('Rejected')} disabled={!selectedCount}>Reject</button>
          <button type="button" onClick={() => moveSelected('Drive Ready')} disabled={!selectedCount}>Drive ready</button>
        </div>

        {visibleAssets.length === 0 ? (
          <section className={styles.emptyState}>
            <span>{loadState === 'loading' ? 'Loading' : 'Ready'}</span>
            <h3>{loadState === 'loading' ? 'Pulling Drive images into the stack.' : `No images in ${activeFilter}.`}</h3>
            <p>Drop a batch on the left or switch to All Images. Nothing publishes from this preview until Drive approval and manifest matching are verified.</p>
          </section>
        ) : (
          <section className={view === 'grid' ? styles.grid : styles.denseList}>
            {visibleAssets.map((asset) => (
              <article key={asset.id} className={`${styles.card} ${asset.selected ? styles.selected : ''}`}>
                <button type="button" className={styles.imageButton} onClick={() => setExpandedAsset(asset)}>
                  <img src={asset.url} alt={asset.name} referrerPolicy="no-referrer" />
                </button>
                <div className={styles.cardBody}>
                  <div className={styles.badgeRow}>
                    <span className={`${styles.statusBadge} ${styles[asset.approvalColor]}`}>{asset.approvalColor}</span>
                    <span>{asset.source === 'drive' ? 'Drive' : asset.source === 'generated' ? 'Generated' : 'Local'}</span>
                    {asset.matchConfidence && <span>{asset.matchConfidence}</span>}
                  </div>
                  <label>
                    <input type="checkbox" checked={asset.selected} onChange={() => toggleSelected(asset.id)} />
                    <b>{asset.name}</b>
                  </label>
                  <span>{asset.type} / {formatSize(asset.size)}</span>
                  <span>Slot: {asset.manifestSlot || 'not assigned'}</span>
                  <span>Target: {asset.targetFilename || 'not assigned'}</span>
                  {asset.driveFileId && <span>Drive ID: {asset.driveFileId}</span>}
                  {asset.ingestReceiptId && <span>Receipt: {asset.ingestReceiptId}</span>}
                  {asset.supabaseReceiptId && <span>Supabase: {asset.supabaseReceiptId}</span>}
                  {asset.githubNotation && <span>GitHub: {asset.githubNotation}</span>}
                  <label className={styles.qaSlider}>
                    <span>QA {asset.qa || 'pending'} / min {asset.qaMin}</span>
                    <input type="range" min="0" max="100" value={asset.qa} onChange={(event) => setQa(asset.id, Number(event.currentTarget.value))} onMouseUp={() => recordQa(asset.id)} onTouchEnd={() => recordQa(asset.id)} />
                  </label>
                  <div className={styles.cardActions}>
                    <button type="button" onClick={() => moveOne(asset.id, 'Needs Review')}>Review</button>
                    <button type="button" onClick={() => moveOne(asset.id, 'Approved')}>Approve</button>
                    <button type="button" onClick={() => moveOne(asset.id, 'Rejected')}>Reject</button>
                    <button type="button" onClick={() => moveOne(asset.id, 'Drive Ready')}>Drive</button>
                  </div>
                  {asset.driveUrl && <a className={styles.driveLink} href={asset.driveUrl} target="_blank" rel="noreferrer">Open Drive file</a>}
                  <em>{asset.note}</em>
                </div>
              </article>
            ))}
          </section>
        )}
      </section>

      {expandedAsset && (
        <div className={styles.modalBackdrop} role="dialog" aria-modal="true" aria-label="Expanded image review">
          <div className={styles.modalPanel}>
            <header>
              <div>
                <p>Expanded review</p>
                <h3>{expandedAsset.manifestSlot || expandedAsset.name}</h3>
                <span>{expandedAsset.approvalStatus}</span>
              </div>
              <button type="button" onClick={() => setExpandedAsset(null)}>Close</button>
            </header>
            <img src={expandedAsset.url} alt={expandedAsset.name} referrerPolicy="no-referrer" />
            <footer>
              <span>{expandedAsset.name}</span>
              <span>QA {expandedAsset.qa || 'pending'} / min {expandedAsset.qaMin}</span>
              {expandedAsset.ingestReceiptId && <span>Receipt {expandedAsset.ingestReceiptId}</span>}
              {expandedAsset.driveUrl && <a href={expandedAsset.driveUrl} target="_blank" rel="noreferrer">Open in Drive</a>}
            </footer>
          </div>
        </div>
      )}
    </main>
  );
}
