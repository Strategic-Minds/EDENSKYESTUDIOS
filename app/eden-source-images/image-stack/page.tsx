'use client';

import { ChangeEvent, DragEvent, useMemo, useState } from 'react';
import styles from './image-stack.module.css';

type Folder = 'Drafts' | 'Needs Review' | 'Approved' | 'Rejected' | 'Drive Ready';
type Asset = {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  folder: Folder;
  qa: number;
  note: string;
  selected: boolean;
};

const folders: Folder[] = ['Drafts', 'Needs Review', 'Approved', 'Rejected', 'Drive Ready'];
const primaryEmail = 'strategicmindsadvisory@gmail.com';

function formatSize(size: number) {
  if (size > 1024 * 1024) return `${(size / 1024 / 1024).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(size / 1024))} KB`;
}

export default function EdenImageStackPage() {
  const [assets, setAssets] = useState<Asset[]>([]);
  const [activeFolder, setActiveFolder] = useState<Folder>('Drafts');
  const [view, setView] = useState<'grid' | 'dense'>('grid');
  const [sort, setSort] = useState<'newest' | 'name' | 'qa'>('newest');

  const visibleAssets = useMemo(() => {
    const filtered = assets.filter((asset) => asset.folder === activeFolder);
    return [...filtered].sort((a, b) => {
      if (sort === 'name') return a.name.localeCompare(b.name);
      if (sort === 'qa') return b.qa - a.qa;
      return b.id.localeCompare(a.id);
    });
  }, [activeFolder, assets, sort]);

  const selectedCount = assets.filter((asset) => asset.selected).length;

  function addFiles(fileList: FileList | null) {
    if (!fileList) return;
    const nextAssets = Array.from(fileList)
      .filter((file) => file.type.startsWith('image/'))
      .map((file) => ({
        id: `${Date.now()}-${file.name}-${Math.random().toString(16).slice(2)}`,
        name: file.name,
        size: file.size,
        type: file.type || 'image',
        url: URL.createObjectURL(file),
        folder: 'Drafts' as Folder,
        qa: 0,
        note: 'Pending admin review',
        selected: false
      }));
    setAssets((current) => [...nextAssets, ...current]);
    setActiveFolder('Drafts');
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    addFiles(event.dataTransfer.files);
  }

  function handleInput(event: ChangeEvent<HTMLInputElement>) {
    addFiles(event.currentTarget.files);
    event.currentTarget.value = '';
  }

  function moveSelected(folder: Folder) {
    setAssets((current) => current.map((asset) => asset.selected ? { ...asset, folder, selected: false, note: folder === 'Approved' ? 'Approved by admin review' : folder === 'Rejected' ? 'Rejected for regeneration' : folder === 'Drive Ready' ? 'Approved and ready for Drive upload packet' : 'Pending admin review' } : asset));
    setActiveFolder(folder);
  }

  function moveOne(id: string, folder: Folder) {
    setAssets((current) => current.map((asset) => asset.id === id ? { ...asset, folder, selected: false, note: folder === 'Approved' ? 'Approved by admin review' : folder === 'Rejected' ? 'Rejected for regeneration' : folder === 'Drive Ready' ? 'Approved and ready for Drive upload packet' : asset.note } : asset));
  }

  function setQa(id: string, qa: number) {
    setAssets((current) => current.map((asset) => asset.id === id ? { ...asset, qa } : asset));
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

  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brandMark}>ES</div>
        <div>
          <p>Eden Skye Studios</p>
          <h1>Image Stack Admin</h1>
          <span>{primaryEmail}</span>
        </div>
        <label className={styles.dropZone} onDragOver={(event) => event.preventDefault()} onDrop={handleDrop}>
          <input type="file" accept="image/*" multiple onChange={handleInput} />
          <b>Drop images here</b>
          <span>Bulk stack source images, generated drafts, references, and approval candidates.</span>
        </label>
        <div className={styles.folderList}>
          {folders.map((folder) => (
            <button key={folder} type="button" className={activeFolder === folder ? styles.activeFolder : ''} onClick={() => setActiveFolder(folder)}>
              <b>{folder}</b>
              <span>{assets.filter((asset) => asset.folder === folder).length}</span>
            </button>
          ))}
        </div>
      </aside>

      <section className={styles.workspace}>
        <header className={styles.topbar}>
          <div>
            <p>Admin-safe approval plane</p>
            <h2>{activeFolder}</h2>
            <span>{assets.length} stacked images · {selectedCount} selected</span>
          </div>
          <nav>
            <a href="/eden-source-images">Editor</a>
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
            <span>Ready</span>
            <h3>Start stacking images into {activeFolder}.</h3>
            <p>Drop a batch on the left. Nothing uploads or publishes from this preview until Drive write approval is verified.</p>
          </section>
        ) : (
          <section className={view === 'grid' ? styles.grid : styles.denseList}>
            {visibleAssets.map((asset) => (
              <article key={asset.id} className={`${styles.card} ${asset.selected ? styles.selected : ''}`}>
                <button type="button" className={styles.imageButton} onClick={() => toggleSelected(asset.id)}>
                  <img src={asset.url} alt={asset.name} />
                </button>
                <div className={styles.cardBody}>
                  <label>
                    <input type="checkbox" checked={asset.selected} onChange={() => toggleSelected(asset.id)} />
                    <b>{asset.name}</b>
                  </label>
                  <span>{asset.type} · {formatSize(asset.size)}</span>
                  <label className={styles.qaSlider}>
                    <span>QA {asset.qa || 'pending'}</span>
                    <input type="range" min="0" max="100" value={asset.qa} onChange={(event) => setQa(asset.id, Number(event.currentTarget.value))} />
                  </label>
                  <div className={styles.cardActions}>
                    <button type="button" onClick={() => moveOne(asset.id, 'Needs Review')}>Review</button>
                    <button type="button" onClick={() => moveOne(asset.id, 'Approved')}>Approve</button>
                    <button type="button" onClick={() => moveOne(asset.id, 'Rejected')}>Reject</button>
                    <button type="button" onClick={() => moveOne(asset.id, 'Drive Ready')}>Drive</button>
                  </div>
                  <em>{asset.note}</em>
                </div>
              </article>
            ))}
          </section>
        )}
      </section>
    </main>
  );
}
