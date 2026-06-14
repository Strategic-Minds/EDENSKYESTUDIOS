'use client';

import { FormEvent, useMemo, useState } from 'react';
import styles from './page.module.css';

type Message = {
  role: 'user' | 'assistant' | 'system';
  content: string;
};

type ModuleId = 'images' | 'videos' | 'approval' | 'folders' | 'manifest' | 'integrations' | 'customize' | 'leaks';

type ModuleItem = {
  id: ModuleId;
  label: string;
  helper: string;
};

type FileSummary = {
  name: string;
  type: string;
  size: number;
};

const drive = {
  imageFactory: '1lu7fo915TDlJPT4U3VZGexcWBJ9dpi2b',
  stockAssets: '1V8MNsOdvLNSd04JQrnyvH1ECnj3nOF8P',
  quarantine: '1sKBf_icBG8X_xKCm8QKOsbMhMxSZaOP2',
  temp: '1kokL57oAzvL40ee6nC3v1AA8hinarWJe',
  approvalControl: '1EMnjZKTBT4wlO0ZgR5F6tXDKV1dvK76x'
};

const visualRefs = {
  hero: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-001-public-home-hero-wide.png?v=1781224815',
  lookbook: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-002-public-lookbook-grid.png?v=1781224831',
  avatarMatrix: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-003-avatar-reference-matrix.png?v=1781224848',
  fullBody: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-010-avatar-full-body-reference.png?v=1781224924',
  media: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-012-media-library-dashboard.png?v=1781224947',
  calendar: 'https://cdn.shopify.com/s/files/1/0754/8905/0678/files/ess-vis-013-content-calendar-dashboard.png?v=1781224960'
};

const initialModules: ModuleItem[] = [
  { id: 'images', label: 'Images', helper: 'Review visible image slots' },
  { id: 'videos', label: 'Videos', helper: 'Review playable video slots' },
  { id: 'approval', label: 'Approval', helper: 'Approval inbox and admin gate' },
  { id: 'folders', label: 'Folders', helper: 'Organized Drive lanes' },
  { id: 'integrations', label: 'Gmail + Calendar', helper: 'Connected system lanes' },
  { id: 'customize', label: 'Customize', helper: 'Drag and reorder UI sections' },
  { id: 'manifest', label: 'Manifest', helper: '12 expected assets' },
  { id: 'leaks', label: 'Leak Tests', helper: 'Sandbox-only checks' }
];

const imagePreviews = [
  ['eden-skye-001', 'Identity lock', 'pending binary', visualRefs.avatarMatrix],
  ['eden-skye-004', 'Portfolio portrait', 'pending binary', visualRefs.lookbook],
  ['eden-skye-006', 'Homepage hero', 'pending binary', visualRefs.hero],
  ['eden-skye-008', 'Full-body source', 'pending binary', visualRefs.fullBody],
  ['eden-skye-009', 'Closet plate', 'pending binary', visualRefs.media],
  ['eden-skye-010', 'Social vertical', 'pending binary', visualRefs.calendar]
];

const videoPreviews = [
  ['vid-001', 'Headshot talking draft', 'awaiting MP4/WebM', visualRefs.avatarMatrix],
  ['vid-002', 'Closet walkthrough', 'awaiting MP4/WebM', visualRefs.fullBody],
  ['vid-003', 'Homepage bumper', 'awaiting MP4/WebM', visualRefs.hero]
];

const folders = [
  ['Source Image Approval Inbox', 'pending creation approval', drive.approvalControl],
  ['Identity Lock', '3 images', drive.temp],
  ['Portfolio Portraits', '2 images', drive.temp],
  ['Website Heroes', '2 images', drive.temp],
  ['Closet Sources', '2 images', drive.stockAssets],
  ['Video Drafts', '0 videos', drive.imageFactory],
  ['Quarantine', '0 held', drive.quarantine]
];

const imageQueue = [
  ['eden-skye-001', 'Identity lock front portrait', 'pending_binary'],
  ['eden-skye-002', 'Identity lock three-quarter portrait', 'pending_binary'],
  ['eden-skye-003', 'Identity lock side profile', 'pending_binary'],
  ['eden-skye-004', 'Portfolio black card portrait', 'pending_binary'],
  ['eden-skye-005', 'Portfolio white blazer', 'pending_binary'],
  ['eden-skye-006', 'Homepage hero', 'pending_binary'],
  ['eden-skye-007', 'Models page hero', 'pending_binary'],
  ['eden-skye-008', 'Wardrobe-safe full body', 'pending_binary'],
  ['eden-skye-009', 'Closet environment plate', 'pending_binary'],
  ['eden-skye-010', 'Social vertical portrait', 'pending_binary'],
  ['eden-skye-011', 'HeyGen headshot source', 'pending_binary'],
  ['eden-skye-012', 'HeyGen half-body presenter', 'pending_binary']
];

const manifestFiles = [
  ['Repaired stock manifest', '1aQmG63GyarR8XsS14u6-Sn_yG64vtnXI'],
  ['Daily image queue', '1aH52Mk3xbLvLKvQ2cEGiJYRcxqGeydjB'],
  ['Image agent contract', '1MLyTiLrupv1TdygLcBCxY7xj59iZG41G'],
  ['Original 80-slot manifest', '1j5s6ZKDBsIaGe7CIzphxg2CznmSgpCYj'],
  ['Model requirements', '1Jg39oqnhjYtfkXat5MMU3j15u6710euO']
];

const connectedSystems = [
  ['Gmail', 'Connected in agent session', 'info@epoxywillchangeyourlife.com'],
  ['Google Calendar', 'Connected in agent session', 'info@epoxywillchangeyourlife.com'],
  ['Google Drive', 'Connected in agent session', 'strategicmindsadvisory@gmail.com'],
  ['ChatGPT passthrough', 'Not embeddable directly', 'Use AI Gateway OpenAI route']
];

const leakTests = [
  ['Public publish', 'blocked'],
  ['Website replacement', 'blocked'],
  ['Shopify activation', 'blocked'],
  ['HeyGen final avatar', 'blocked'],
  ['Drive destructive move', 'blocked'],
  ['Production write', 'blocked']
];

function fileListToSummaries(files: FileList | null): FileSummary[] {
  if (!files) return [];
  return Array.from(files).map((file) => ({ name: file.name, type: file.type || 'unknown', size: file.size }));
}

export default function EdenChatEditor() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'system',
      content: 'Chat is wired to the Eden AI Gateway route. Ask for image batches, approvals, uploads, Gmail, Calendar, or folder actions.'
    }
  ]);
  const [input, setInput] = useState('');
  const [attachments, setAttachments] = useState<FileSummary[]>([]);
  const [activeModule, setActiveModule] = useState<ModuleId | null>(null);
  const [modules, setModules] = useState(initialModules);
  const [draggedModule, setDraggedModule] = useState<ModuleId | null>(null);
  const [isSending, setIsSending] = useState(false);

  const activeModuleLabel = useMemo(
    () => modules.find((module) => module.id === activeModule)?.label,
    [activeModule, modules]
  );

  function reorderModules(targetId: ModuleId) {
    if (!draggedModule || draggedModule === targetId) return;
    setModules((current) => {
      const next = [...current];
      const from = next.findIndex((module) => module.id === draggedModule);
      const to = next.findIndex((module) => module.id === targetId);
      if (from < 0 || to < 0) return current;
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }

  async function sendMessage(event: FormEvent) {
    event.preventDefault();
    const trimmed = input.trim();
    if (!trimmed && attachments.length === 0) return;

    const userMessage: Message = {
      role: 'user',
      content: trimmed || 'Review the attached draft files.'
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput('');
    setIsSending(true);

    try {
      const response = await fetch('/api/eden/source-images/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, attachments })
      });
      const result = await response.json();
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: result.content || result.error || 'The AI route responded without content.'
        }
      ]);
    } catch (error) {
      setMessages((current) => [
        ...current,
        {
          role: 'assistant',
          content: `Chat request failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        }
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className={styles.shell}>
      <aside className={styles.chat}>
        <header className={styles.chatHeader}>
          <div className={styles.brandMark}>ES</div>
          <div>
            <p>Eden Media OS</p>
            <span>OpenAI primary via AI Gateway</span>
          </div>
        </header>

        <section className={styles.chatStream} aria-label="Chat history">
          {messages.map((message, index) => (
            <article key={`${message.role}-${index}`} className={`${styles.message} ${message.role === 'user' ? styles.userMessage : ''}`}>
              <b>{message.role === 'user' ? 'You' : message.role === 'assistant' ? 'Eden AI' : 'System'}</b>
              <span>{message.content}</span>
            </article>
          ))}
          {isSending ? <article className={styles.message}><b>Eden AI</b><span>Thinking through the control plane...</span></article> : null}
        </section>

        <form className={styles.chatInput} onSubmit={sendMessage}>
          {attachments.length > 0 ? (
            <div className={styles.attachmentTray}>
              {attachments.map((file) => <span key={`${file.name}-${file.size}`}>{file.name}</span>)}
              <button type="button" onClick={() => setAttachments([])}>Clear</button>
            </div>
          ) : null}
          <label className={styles.dropZone}>
            <input
              aria-label="Attach files"
              multiple
              type="file"
              accept="image/*,video/*,.csv,.json,.pdf,.txt"
              onChange={(event) => setAttachments(fileListToSummaries(event.currentTarget.files))}
            />
            <span>Attach images, videos, folders, or files</span>
          </label>
          <textarea
            aria-label="Chat input"
            placeholder="Tell Eden what to generate, review, approve, organize, or test..."
            value={input}
            onChange={(event) => setInput(event.currentTarget.value)}
          />
          <button type="submit" disabled={isSending}>{isSending ? 'Sending...' : 'Send'}</button>
        </form>
      </aside>

      <section className={styles.editor}>
        <header className={styles.editorTopbar}>
          <div>
            <p>Eden source control</p>
            <h1>{activeModuleLabel || 'Clean review editor'}</h1>
          </div>
          <div className={styles.topbarActions}>
            <a href="/api/eden/source-images/control-plane">API</a>
            <button type="button" onClick={() => setActiveModule('customize')}>Customize</button>
          </div>
        </header>

        <nav className={styles.moduleDock} aria-label="Editor modules">
          {modules.map((module) => (
            <button
              key={module.id}
              type="button"
              draggable
              onClick={() => setActiveModule(module.id)}
              onDragStart={() => setDraggedModule(module.id)}
              onDragOver={(event) => event.preventDefault()}
              onDrop={() => reorderModules(module.id)}
              onDragEnd={() => setDraggedModule(null)}
            >
              <b>{module.label}</b>
              <span>{module.helper}</span>
            </button>
          ))}
        </nav>

        {!activeModule ? (
          <section className={styles.emptyState} aria-label="Empty editor state">
            <span>Ready</span>
            <h2>Open a module or type in chat.</h2>
          </section>
        ) : null}

        {activeModule === 'images' ? (
          <section className={styles.modulePanel}>
            <header><div><p>Visual review</p><h2>Images</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header>
            <div className={styles.mediaGrid}>{imagePreviews.map(([id, title, status, src]) => <figure key={id} className={styles.mediaCard}><img src={src} alt={`${title} preview`} /><figcaption><b>{id}</b><span>{title}</span><em>{status}</em></figcaption></figure>)}</div>
          </section>
        ) : null}

        {activeModule === 'videos' ? (
          <section className={styles.modulePanel}>
            <header><div><p>Visual review</p><h2>Videos</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header>
            <div className={styles.videoGrid}>{videoPreviews.map(([id, title, status, poster]) => <figure key={id} className={styles.mediaCard}><video controls preload="metadata" poster={poster} aria-label={`${title} video preview`} /><figcaption><b>{id}</b><span>{title}</span><em>{status}</em></figcaption></figure>)}</div>
          </section>
        ) : null}

        {activeModule === 'approval' ? (
          <section className={styles.modulePanel}>
            <header><div><p>Admin control</p><h2>Approval Inbox</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header>
            <div className={styles.noticeBox}><b>Folder requested</b><span>SOURCE_IMAGE_APPROVAL_INBOX is staged under the admin approval control plane. Live Drive creation needs the approval phrase shown below.</span><code>APPROVE DRIVE FOLDER CREATE</code></div>
            <div className={styles.buttonGrid}>{manifestFiles.map(([label, id]) => <a key={id} href={`https://drive.google.com/file/d/${id}/view`}><b>{label}</b><span>{id}</span></a>)}</div>
          </section>
        ) : null}

        {activeModule === 'folders' ? (
          <section className={styles.modulePanel}>
            <header><div><p>Drive storage</p><h2>Folders</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header>
            <div className={styles.buttonGrid}>{folders.map(([name, count, id]) => <a key={name} href={`https://drive.google.com/drive/folders/${id}`}><b>{name}</b><span>{count}</span></a>)}</div>
          </section>
        ) : null}

        {activeModule === 'manifest' ? (
          <section className={styles.modulePanel}>
            <header><div><p>Source truth</p><h2>Manifest</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header>
            <div className={styles.listPanel}>{imageQueue.map(([asset, purpose, status]) => <div key={asset}><b>{asset}</b><span>{purpose}</span><em>{status}</em></div>)}</div>
          </section>
        ) : null}

        {activeModule === 'integrations' ? (
          <section className={styles.modulePanel}>
            <header><div><p>Connected systems</p><h2>Gmail + Calendar</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header>
            <div className={styles.buttonGrid}>{connectedSystems.map(([name, status, account]) => <button key={name} type="button"><b>{name}</b><span>{status}</span><em>{account}</em></button>)}</div>
            <div className={styles.noticeBox}><b>Connector boundary</b><span>The agent session can use Gmail and Calendar. The public preview app needs its own OAuth/server integration before it can read or mutate those accounts directly.</span></div>
          </section>
        ) : null}

        {activeModule === 'customize' ? (
          <section className={styles.modulePanel}>
            <header><div><p>Workspace control</p><h2>Customize Layout</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header>
            <div className={styles.noticeBox}><b>Drag modules</b><span>Drag the buttons at the top to reorder the UI for this session. The next build can persist these preferences per operator.</span></div>
            <div className={styles.buttonGrid}>{modules.map((module) => <button key={module.id} type="button" draggable onDragStart={() => setDraggedModule(module.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => reorderModules(module.id)} onDragEnd={() => setDraggedModule(null)}><b>{module.label}</b><span>Drag to reorder</span></button>)}</div>
          </section>
        ) : null}

        {activeModule === 'leaks' ? (
          <section className={styles.modulePanel}>
            <header><div><p>Sandbox checks</p><h2>Leak Tests</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header>
            <div className={styles.buttonGrid}>{leakTests.map(([label, status]) => <button key={label} type="button"><b>{label}</b><span>{status}</span></button>)}</div>
          </section>
        ) : null}
      </section>
    </main>
  );
}
