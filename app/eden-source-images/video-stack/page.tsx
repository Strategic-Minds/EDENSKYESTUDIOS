'use client';

import { FormEvent, useEffect, useMemo, useState } from 'react';
import styles from './video-stack.module.css';

type ApprovalColor = 'green' | 'yellow' | 'red';

type HeyGenVideo = {
  id: string;
  title: string;
  status: string;
  duration?: number | null;
  videoUrl?: string | null;
  thumbnailUrl?: string | null;
  pageUrl?: string | null;
};

type HeyGenAvatar = {
  id: string;
  name: string;
  avatarType: string;
  groupId?: string | null;
  previewImageUrl?: string | null;
  defaultVoiceId?: string | null;
  status?: string | null;
};

type HeyGenStyle = {
  id: string;
  name: string;
  aspectRatio?: string | null;
  thumbnailUrl?: string | null;
  previewVideoUrl?: string | null;
};

type InventoryResponse = {
  ok: boolean;
  source: string;
  heygenApiConfigured: boolean;
  liveCreateBlocked: boolean;
  videos: HeyGenVideo[];
  avatars: HeyGenAvatar[];
  styles: HeyGenStyle[];
  notes: string[];
};

type DraftJob = {
  receiptId: string;
  title: string;
  script: string;
  avatarId: string;
  avatarName: string;
  voiceId: string;
  styleId: string;
  aspectRatio: string;
  approvalStatus: string;
  approvalColor: ApprovalColor;
  supabaseReceiptId: string;
  githubNotation: string;
  createdAt: string;
  heygen: {
    createVideoPerformed: boolean;
    videoId: string | null;
    videoUrl: string | null;
    reason: string;
  };
};

type DraftJobResponse = {
  ok: boolean;
  job: DraftJob;
};

const primaryEmail = 'strategicmindsadvisory@gmail.com';
const localJobKey = 'eden-video-stack-draft-jobs-v1';

function readLocalJobs(): DraftJob[] {
  if (typeof window === 'undefined') return [];
  try {
    const parsed = JSON.parse(window.localStorage.getItem(localJobKey) || '[]');
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function writeLocalJobs(jobs: DraftJob[]) {
  if (typeof window === 'undefined') return;
  window.localStorage.setItem(localJobKey, JSON.stringify(jobs.slice(0, 100)));
}

function formatDuration(duration?: number | null) {
  if (!duration) return 'Duration pending';
  return `${Math.round(duration)} sec`;
}

export default function EdenVideoStackPage() {
  const [inventory, setInventory] = useState<InventoryResponse | null>(null);
  const [inventoryState, setInventoryState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [jobs, setJobs] = useState<DraftJob[]>([]);
  const [selectedAvatarId, setSelectedAvatarId] = useState('');
  const [selectedStyleId, setSelectedStyleId] = useState('');
  const [title, setTitle] = useState('Eden Skye vertical content draft');
  const [script, setScript] = useState('');
  const [jobState, setJobState] = useState<'idle' | 'saving' | 'ready' | 'error'>('idle');

  useEffect(() => {
    setJobs(readLocalJobs());
    fetch('/api/eden/videos/heygen-inventory')
      .then((response) => {
        if (!response.ok) throw new Error('HeyGen inventory unavailable');
        return response.json() as Promise<InventoryResponse>;
      })
      .then((data) => {
        setInventory(data);
        setSelectedAvatarId(data.avatars[0]?.id || '');
        setSelectedStyleId(data.styles[0]?.id || '');
        setInventoryState('ready');
      })
      .catch(() => setInventoryState('error'));
  }, []);

  const selectedAvatar = useMemo(() => inventory?.avatars.find((avatar) => avatar.id === selectedAvatarId) || null, [inventory, selectedAvatarId]);
  const selectedStyle = useMemo(() => inventory?.styles.find((style) => style.id === selectedStyleId) || null, [inventory, selectedStyleId]);
  const approvedJobs = jobs.filter((job) => job.approvalStatus === 'Approved').length;
  const needsReview = jobs.filter((job) => job.approvalStatus !== 'Approved' && job.approvalStatus !== 'Rejected').length;

  async function createDraftJob(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setJobState('saving');
    try {
      const response = await fetch('/api/eden/videos/draft-jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          script,
          avatarId: selectedAvatar?.id,
          avatarName: selectedAvatar?.name,
          voiceId: selectedAvatar?.defaultVoiceId,
          styleId: selectedStyle?.id,
          aspectRatio: selectedStyle?.aspectRatio || '9:16',
          approvalStatus: 'Needs Review'
        })
      });
      if (!response.ok) throw new Error('Draft receipt failed');
      const data = await response.json() as DraftJobResponse;
      const nextJobs = [data.job, ...readLocalJobs().filter((job) => job.receiptId !== data.job.receiptId)];
      writeLocalJobs(nextJobs);
      setJobs(nextJobs);
      setScript('');
      setJobState('ready');
    } catch {
      setJobState('error');
    }
  }

  function updateJob(receiptId: string, approvalStatus: DraftJob['approvalStatus'], approvalColor: ApprovalColor) {
    const nextJobs = jobs.map((job) => job.receiptId === receiptId ? { ...job, approvalStatus, approvalColor } : job);
    writeLocalJobs(nextJobs);
    setJobs(nextJobs);
  }

  return (
    <main className={styles.shell}>
      <aside className={styles.sidebar}>
        <div className={styles.brandMark}>ES</div>
        <div>
          <p>Eden Skye Studios</p>
          <h1>Video Stack</h1>
          <span>{primaryEmail}</span>
        </div>
        <div className={styles.statusPanel}>
          <b>HeyGen connection</b>
          <span>{inventoryState === 'loading' ? 'Loading inventory...' : inventoryState === 'error' ? 'Inventory route unavailable' : inventory?.heygenApiConfigured ? 'API key configured' : 'Connector snapshot mode'}</span>
          <span>Live generation blocked until verified approval</span>
        </div>
        <div className={styles.statusPanel}>
          <b>Draft queue</b>
          <span>{jobs.length} draft receipts</span>
          <span>{approvedJobs} approved / {needsReview} need review</span>
        </div>
        <nav className={styles.sideLinks}>
          <a href="/eden-source-images/image-stack">Image Stack</a>
          <a href="/eden-source-images">Eden Editor</a>
          <a href="/api/eden/videos/heygen-inventory">Inventory API</a>
          <a href="/api/eden/videos/draft-jobs">Draft Jobs API</a>
        </nav>
      </aside>

      <section className={styles.workspace}>
        <header className={styles.topbar}>
          <div>
            <p>Create / Video</p>
            <h2>HeyGen Draft Studio</h2>
            <span>Pick an avatar, write a script, create a receipt-only draft job, then approve before live generation.</span>
          </div>
          <div className={styles.legend}>
            <span><i className={styles.greenDot} /> Approved</span>
            <span><i className={styles.yellowDot} /> Needs review</span>
            <span><i className={styles.redDot} /> Blocked</span>
          </div>
        </header>

        <section className={styles.summaryStrip}>
          <span><b>{inventory?.videos.length || 0}</b> Existing videos</span>
          <span><b>{inventory?.avatars.length || 0}</b> Avatars</span>
          <span><b>{inventory?.styles.length || 0}</b> Styles</span>
          <span><b>{jobs.length}</b> Draft jobs</span>
          <span><b>Blocked</b> Live create</span>
        </section>

        <section className={styles.studioGrid}>
          <form className={styles.formPanel} onSubmit={createDraftJob}>
            <span className={styles.stepBadge}>1</span>
            <h3>Create a video draft job</h3>
            <label>
              <span>Title</span>
              <input value={title} onChange={(event) => setTitle(event.currentTarget.value)} />
            </label>
            <label>
              <span>Avatar/look</span>
              <select value={selectedAvatarId} onChange={(event) => setSelectedAvatarId(event.currentTarget.value)}>
                {inventory?.avatars.map((avatar) => <option key={avatar.id} value={avatar.id}>{avatar.name} / {avatar.avatarType}</option>)}
              </select>
            </label>
            <label>
              <span>Style</span>
              <select value={selectedStyleId} onChange={(event) => setSelectedStyleId(event.currentTarget.value)}>
                {inventory?.styles.map((style) => <option key={style.id} value={style.id}>{style.name} / {style.aspectRatio || '9:16'}</option>)}
              </select>
            </label>
            <label>
              <span>Script</span>
              <textarea value={script} onChange={(event) => setScript(event.currentTarget.value)} placeholder="Write Eden's short-form script, hook, CTA, or video direction here." />
            </label>
            <button type="submit" disabled={!script.trim() || jobState === 'saving'}>{jobState === 'saving' ? 'Saving receipt...' : 'Create Draft Receipt'}</button>
            <em>{jobState === 'error' ? 'Draft receipt failed.' : jobState === 'ready' ? 'Draft receipt created.' : 'No HeyGen render happens from this button yet.'}</em>
          </form>

          <section className={styles.previewPanel}>
            <span className={styles.stepBadge}>2</span>
            <h3>Selected setup</h3>
            <div className={styles.selectedAvatar}>
              {selectedAvatar?.previewImageUrl ? <img src={selectedAvatar.previewImageUrl} alt={selectedAvatar.name} referrerPolicy="no-referrer" /> : <div className={styles.avatarPlaceholder}>Avatar</div>}
              <div>
                <b>{selectedAvatar?.name || 'No avatar selected'}</b>
                <span>{selectedAvatar?.avatarType || 'Select an avatar'}</span>
                <span>Voice: {selectedAvatar?.defaultVoiceId || 'Default/unselected'}</span>
                <span>Style: {selectedStyle?.name || 'Manual'} / {selectedStyle?.aspectRatio || '9:16'}</span>
              </div>
            </div>
            <div className={styles.guardrailBox}>
              <b>Governance</b>
              <span>Yellow until reviewed. Green only after admin approval. Red if blocked or unsafe.</span>
              <span>Live HeyGen create stays blocked until API credentials and approval are verified.</span>
            </div>
          </section>
        </section>

        <section className={styles.sectionHeader}>
          <div>
            <p>Existing HeyGen media</p>
            <h3>Video Gallery</h3>
          </div>
          <span>{inventoryState === 'ready' ? inventory?.source : 'loading'}</span>
        </section>
        <section className={styles.videoGrid}>
          {inventory?.videos.map((video) => (
            <article key={video.id} className={styles.videoCard}>
              {video.thumbnailUrl ? <img src={video.thumbnailUrl} alt={video.title} referrerPolicy="no-referrer" /> : <div className={styles.videoPlaceholder}>Video</div>}
              <div>
                <b>{video.title}</b>
                <span>{video.status} / {formatDuration(video.duration)}</span>
                {video.pageUrl && <a href={video.pageUrl} target="_blank" rel="noreferrer">Open HeyGen</a>}
              </div>
            </article>
          ))}
        </section>

        <section className={styles.sectionHeader}>
          <div>
            <p>Approval queue</p>
            <h3>Draft Video Jobs</h3>
          </div>
          <span>Receipt-only until live generation is enabled</span>
        </section>
        {jobs.length === 0 ? (
          <section className={styles.emptyState}>
            <span>No video jobs yet</span>
            <h3>Create the first draft receipt above.</h3>
            <p>Drafts will hold the script, avatar, style, approval color, Supabase receipt placeholder, and HeyGen blocked/live state.</p>
          </section>
        ) : (
          <section className={styles.jobList}>
            {jobs.map((job) => (
              <article key={job.receiptId} className={styles.jobCard}>
                <div>
                  <span className={`${styles.statusBadge} ${styles[job.approvalColor]}`}>{job.approvalColor}</span>
                  <h4>{job.title}</h4>
                  <p>{job.script}</p>
                  <span>Avatar: {job.avatarName}</span>
                  <span>Receipt: {job.receiptId}</span>
                  <span>Supabase: {job.supabaseReceiptId}</span>
                  <span>GitHub: {job.githubNotation}</span>
                </div>
                <div className={styles.jobActions}>
                  <button type="button" onClick={() => updateJob(job.receiptId, 'Approved', 'green')}>Approve</button>
                  <button type="button" onClick={() => updateJob(job.receiptId, 'Needs Review', 'yellow')}>Review</button>
                  <button type="button" onClick={() => updateJob(job.receiptId, 'Rejected', 'red')}>Reject</button>
                </div>
              </article>
            ))}
          </section>
        )}
      </section>
    </main>
  );
}
