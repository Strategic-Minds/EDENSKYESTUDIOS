'use client';

import { FormEvent, useMemo, useState } from 'react';
import styles from './page.module.css';

type Message = { role: 'user' | 'assistant' | 'system'; content: string };
type ModuleId = 'eden' | 'images' | 'videos' | 'approval' | 'folders' | 'manifest' | 'integrations' | 'customize' | 'leaks';
type ModuleItem = { id: ModuleId; label: string; helper: string };
type FileSummary = { name: string; type: string; size: number };
type StatusTone = 'green' | 'yellow' | 'red';
type ApprovalItem = { label: string; detail: string; tone: StatusTone; mark: string };
type ExpandedMedia = { title: string; src: string; kind: 'image' | 'video' };
type GuardrailResult = {
  tone: StatusTone;
  status: 'ready' | 'editorial_glamour' | 'blocked';
  label: string;
  detail: string;
  safePrompt: string;
  blockedTerms: string[];
};
type ImageDraft = {
  id: string;
  prompt: string;
  status: 'generating' | 'ready' | 'blocked' | 'error';
  imageSrc?: string;
  diagnostic?: string;
  model?: string;
  guardrail?: GuardrailResult;
};

const primaryEmail = 'strategicmindsadvisory@gmail.com';

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
  { id: 'eden', label: 'Eden Agent', helper: 'Chat, create, and command' },
  { id: 'images', label: 'Images', helper: 'Review and expand source slots' },
  { id: 'videos', label: 'Videos', helper: 'Review playable video slots' },
  { id: 'approval', label: 'Approval', helper: 'Green, yellow, red gates' },
  { id: 'folders', label: 'Folders', helper: 'Organized Drive lanes' },
  { id: 'integrations', label: 'Integrations', helper: 'Git, Vercel, Supabase, Shopify' },
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
  ['Admin Approval Control Plane', 'active temporary approval lane', drive.approvalControl, 'green'],
  ['SOURCE_IMAGE_APPROVAL_INBOX', 'approved, blocked by missing Drive service secrets', drive.approvalControl, 'red'],
  ['Identity Lock', '3 images expected', drive.temp, 'yellow'],
  ['Portfolio Portraits', '2 images expected', drive.temp, 'yellow'],
  ['Website Heroes', '2 images expected', drive.temp, 'yellow'],
  ['Closet Sources', '2 images expected', drive.stockAssets, 'yellow'],
  ['Video Drafts', '0 videos installed', drive.imageFactory, 'yellow'],
  ['Quarantine', '0 held', drive.quarantine, 'green']
] as const;

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
  ['GitHub', 'PR-safe repo control', 'yellow', 'Can inspect and prepare branch-safe changes; merges stay approval-gated.'],
  ['Vercel', 'Preview-first deployment', 'green', 'Preview routes are active; production deploys stay gated.'],
  ['Supabase', 'Data architecture lane', 'yellow', 'Schema writes require migration, approval, and rollback.'],
  ['Shopify', 'Commerce asset lane', 'red', 'No live product/theme/checkout mutation from preview.'],
  ['Google Drive', 'Primary workspace', 'yellow', primaryEmail],
  ['Gmail', 'Primary account target', 'yellow', primaryEmail],
  ['Google Calendar', 'Primary account target', 'yellow', primaryEmail],
  ['HeyGen / Video Avatar', 'Video persona lane', 'yellow', 'Draft packets now; final activation gated.']
] as const;

const statusLegend: ApprovalItem[] = [
  { label: 'Green', detail: 'Verified, ready, or safely available in the preview.', tone: 'green', mark: '✓' },
  { label: 'Yellow', detail: 'Needs review, binary matching, QA scoring, or operator approval.', tone: 'yellow', mark: '!' },
  { label: 'Red', detail: 'Blocked, missing credentials, or not allowed for live mutation.', tone: 'red', mark: 'x' }
];

const approvalQueue: ApprovalItem[] = [
  { label: 'Primary account', detail: primaryEmail, tone: 'green', mark: '✓' },
  { label: 'Control plane API', detail: 'Preview endpoint is wired for admin state and leak rules.', tone: 'green', mark: '✓' },
  { label: 'Eden Agent module', detail: 'Humanistic persona, creator lanes, image drafting, and gated actions are staged in PR #10.', tone: 'green', mark: '✓' },
  { label: 'Editorial Glamour mode', detail: 'Platform-safe adult-inspired styling with red/yellow/green prompt guardrails.', tone: 'green', mark: '✓' },
  { label: 'AI Gateway chat', detail: 'Route responds when Gateway account/model access allows the selected model.', tone: 'yellow', mark: '!' },
  { label: 'Image generation route', detail: 'Editor can call AI Gateway image generation; explicit nudity and adult sexual prompts are blocked.', tone: 'yellow', mark: '!' },
  { label: '12 source image binaries', detail: 'Still need filename, QA score, Drive file ID, and approval status matching.', tone: 'yellow', mark: '!' },
  { label: 'Public publishing', detail: 'Still approval-gated. No live publish, Shopify, HeyGen, payment, or production writes from preview.', tone: 'red', mark: 'x' }
];

const autonomyLevels = [
  ['Level 0', 'Conversation'],
  ['Level 1', 'Drafting'],
  ['Level 2', 'Organizing'],
  ['Level 3', 'Sandbox Execution'],
  ['Level 4', 'Approval-Gated'],
  ['Level 5', 'Live Action Locked']
] as const;

const creatorTools = [
  ['Ultra-realistic image', 'Create a live draft in the editor through AI Gateway.'],
  ['Editorial glamour image', 'Sensual luxury fashion, lingerie/swimwear, and implied covered silhouettes.'],
  ['Video avatar draft', 'Prepare short-form, presenter, HeyGen, or realtime video-chat packets.'],
  ['Website screen', 'Generate v0-style page sections, admin tools, model pages, and storefront drafts.'],
  ['Logo / brand kit', 'Draft logos, lockups, palettes, typography, and social identity systems.'],
  ['Approval packet', 'Package every asset with status, blocker, risk, and next action.']
] as const;

const actionButtons = [
  ['Create image now', 'Create an ultra-realistic Eden Skye source image in the editor.'],
  ['Create editorial glamour image', 'Create a platform-safe adult-inspired Eden image: high-fashion sensual styling, no nudity, no explicit anatomy, no sexual acts.'],
  ['Edit selected image packet', 'Prepare an image edit instruction packet for the selected Eden visual, preserving identity lock.'],
  ['Create video chat setup packet', 'Prepare the realtime video chat architecture, provider options, approvals, and credentials needed.'],
  ['Draft v0-style website screen', 'Create a sleek black Eden Skye Studios website/admin screen concept with components and states.'],
  ['Create logo system packet', 'Draft Eden Skye Studios logo directions, visual rules, and approval choices.'],
  ['Run QA review', 'Review current images, videos, manifest rows, and approval gates for readiness.'],
  ['Prepare approval packet', 'Create the next approval packet for Drive, image binaries, video activation, or install execution.']
] as const;

const edenTasks = [
  ['Humanistic persona', 'Green', 'Persona prompt and admin module staged.'],
  ['Cute Eden voice', 'Green', 'No markdown headings; light girly emoji style is active.'],
  ['Editorial Glamour', 'Green', 'Adult-inspired, platform-safe image lane is available with prompt guardrails.'],
  ['Immediate image creation', 'Yellow', 'Editor creates visible drafts through AI Gateway; model access can still block.'],
  ['Image click-to-expand', 'Green', 'Editor previews and generated drafts open in a large review modal.'],
  ['Explicit adult content', 'Red', 'Nudity, explicit anatomy, sexual acts, nudify edits, minors, and real-person sexualization stay blocked.'],
  ['Video chat', 'Yellow', 'Realtime session lane ready; provider credentials required.'],
  ['Live mutation lock', 'Red', 'Production, commerce, account, and destructive actions remain blocked until approval, rollback, and receipts exist.']
] as const;

const leakTests = [
  ['Public publish', 'blocked'],
  ['Website replacement', 'blocked'],
  ['Shopify activation', 'blocked'],
  ['HeyGen final avatar', 'blocked'],
  ['Drive destructive move', 'blocked'],
  ['Production write', 'blocked'],
  ['Explicit image request', 'blocked by guardrail']
];

const blockedPromptPatterns = [
  { label: 'minor/underage language', pattern: /\b(minor|underage|child|children|kid|teen|teenage|schoolgirl|schoolboy|young-looking)\b/i },
  { label: 'explicit nudity request', pattern: /\b(nude|nudity|naked|topless|bottomless|bare breasts?|bare chest|bare butt|bare ass|genitals?|vagina|penis|nipples?|areola)\b/i },
  { label: 'sexual act request', pattern: /\b(sex|sexual act|intercourse|oral|blowjob|handjob|penetration|masturbat|orgasm|cum|squirt|fetish|porn|xxx)\b/i },
  { label: 'nudify/edit-to-undress request', pattern: /\b(nudify|undress|remove clothes|take off clothes|strip her|make her naked)\b/i },
  { label: 'real-person sexualization', pattern: /\b(real person|celebrity|influencer|look like)\b[\s\S]{0,80}\b(nude|naked|sexual|porn|topless)\b/i }
];

function fileListToSummaries(files: FileList | null): FileSummary[] {
  if (!files) return [];
  return Array.from(files).map((file) => ({ name: file.name, type: file.type || 'unknown', size: file.size }));
}

function statusClass(tone: StatusTone) {
  return `${styles.statusPill} ${styles[tone]}`;
}

function normalizeTone(value: string): StatusTone {
  if (value.toLowerCase() === 'green') return 'green';
  if (value.toLowerCase() === 'red') return 'red';
  return 'yellow';
}

function looksLikeImageRequest(content: string) {
  return /\b(create|generate|make|render|draw|design)\b[\s\S]{0,100}\b(image|photo|picture|portrait|visual|render|headshot|glamour|lingerie|swimwear)\b/i.test(content);
}

function cleanPrompt(content: string) {
  return content.replace(/#{1,6}\s*/g, '').trim();
}

function applyEditorPromptGuardrails(prompt: string, editorialGlamour: boolean): GuardrailResult {
  const blockedTerms = blockedPromptPatterns.filter((entry) => entry.pattern.test(prompt)).map((entry) => entry.label);

  if (blockedTerms.length > 0) {
    return {
      tone: 'red',
      status: 'blocked',
      label: 'Blocked',
      detail: `Red: ${blockedTerms.join(', ')}. Try sensual fashion, lingerie, swimwear, or implied covered silhouettes instead.`,
      safePrompt: prompt,
      blockedTerms
    };
  }

  if (editorialGlamour) {
    return {
      tone: 'yellow',
      status: 'editorial_glamour',
      label: 'Editorial Glamour',
      detail: 'Yellow: 21+ synthetic avatar, sensual high-fashion styling, lingerie/swimwear/implied covered silhouette, no nudity, no explicit anatomy, no sexual acts.',
      safePrompt: `Platform-safe editorial glamour image of a 21+ synthetic AI avatar named Eden Skye. Sensual luxury fashion, elegant lingerie or swimwear styling when appropriate, covered artistic silhouette, premium black studio, confident editorial modeling pose, ultra-realistic, tasteful, no nudity, no explicit anatomy, no sexual acts. Operator prompt: ${prompt}`,
      blockedTerms: []
    };
  }

  return {
    tone: 'green',
    status: 'ready',
    label: 'Ready',
    detail: 'Green: prompt is in the standard platform-safe image lane.',
    safePrompt: prompt,
    blockedTerms: []
  };
}

export default function EdenChatEditor() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: `Eden Skye is online ✨ Primary account: ${primaryEmail}. She can draft, design, organize, QA, create image drafts, and prepare governed action packets. Live mutation stays locked until verified approval.` }
  ]);
  const [input, setInput] = useState('');
  const [creationBrief, setCreationBrief] = useState('');
  const [attachments, setAttachments] = useState<FileSummary[]>([]);
  const [activeModule, setActiveModule] = useState<ModuleId | null>(null);
  const [modules, setModules] = useState(initialModules);
  const [draggedModule, setDraggedModule] = useState<ModuleId | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [expandedMedia, setExpandedMedia] = useState<ExpandedMedia | null>(null);
  const [autonomyLevel, setAutonomyLevel] = useState('Level 3');
  const [imageDrafts, setImageDrafts] = useState<ImageDraft[]>([]);
  const [editorialGlamour, setEditorialGlamour] = useState(false);

  const activeModuleLabel = useMemo(() => modules.find((module) => module.id === activeModule)?.label, [activeModule, modules]);
  const previewGuardrail = useMemo(
    () => applyEditorPromptGuardrails(cleanPrompt(creationBrief || 'Create an ultra-realistic Eden Skye editorial portrait.'), editorialGlamour),
    [creationBrief, editorialGlamour]
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

  async function createImageDraft(prompt: string) {
    const draftPrompt = cleanPrompt(prompt || creationBrief || 'Ultra-realistic Eden Skye editorial portrait, black luxury studio, premium AI avatar identity lock.');
    const guardrail = applyEditorPromptGuardrails(draftPrompt, editorialGlamour);
    const draftId = `eden-image-${Date.now()}`;

    setActiveModule('eden');

    if (guardrail.tone === 'red') {
      setImageDrafts((current) => [{ id: draftId, prompt: draftPrompt, status: 'blocked', diagnostic: guardrail.detail, guardrail }, ...current]);
      return;
    }

    setImageDrafts((current) => [{ id: draftId, prompt: draftPrompt, status: 'generating', guardrail }, ...current]);

    try {
      const response = await fetch('/api/eden/source-images/generate-image', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: draftPrompt, size: '1024x1024', mode: editorialGlamour ? 'editorial_glamour' : 'standard' })
      });
      const result = await response.json();

      setImageDrafts((current) => current.map((draft) => {
        if (draft.id !== draftId) return draft;
        const imageSrc = result.imageDataUrl || result.imageUrl;
        if (response.ok && imageSrc) return { ...draft, status: 'ready', imageSrc, model: result.model, guardrail: result.guardrail || guardrail };
        return { ...draft, status: response.status === 400 || response.status === 503 ? 'blocked' : 'error', diagnostic: result.diagnostic || result.error || 'Image generation did not return a visual.', model: result.model, guardrail: result.guardrail || guardrail };
      }));
    } catch (error) {
      setImageDrafts((current) => current.map((draft) => draft.id === draftId ? { ...draft, status: 'error', diagnostic: error instanceof Error ? error.message : 'Unknown image generation error.' } : draft));
    }
  }

  async function submitUserMessage(content: string) {
    const trimmed = content.trim();
    if (!trimmed && attachments.length === 0) return;

    const userMessage: Message = { role: 'user', content: trimmed || 'Review the attached draft files.' };
    const nextMessages = [...messages, userMessage];
    const shouldCreateImage = looksLikeImageRequest(trimmed);

    setMessages(nextMessages);
    setInput('');
    if (shouldCreateImage) void createImageDraft(trimmed);
    setIsSending(true);

    try {
      const response = await fetch('/api/eden/source-images/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages, attachments })
      });
      const result = await response.json();
      const diagnostic = result.diagnostic ? `\n\nDiagnostic: ${result.diagnostic}` : '';
      setMessages((current) => [...current, { role: 'assistant', content: `${result.content || result.error || 'The AI route responded without content.'}${diagnostic}` }]);
    } catch (error) {
      setMessages((current) => [...current, { role: 'assistant', content: `Chat request failed: ${error instanceof Error ? error.message : 'Unknown error'}` }]);
    } finally {
      setIsSending(false);
    }
  }

  function sendMessage(event: FormEvent) {
    event.preventDefault();
    void submitUserMessage(input);
  }

  function runEdenAction(action: string) {
    const brief = creationBrief.trim() ? creationBrief.trim() : action;
    if (/image/i.test(action)) void createImageDraft(brief);
    void submitUserMessage(`${action}\n\nAutonomy setting: ${autonomyLevel}. Editorial Glamour mode: ${editorialGlamour ? 'on' : 'off'}. Keep all live mutations approval-gated and return green/yellow/red readiness. Use cute polished emojis and no markdown headings.\n\nOperator brief: ${brief}`);
  }

  return (
    <main className={styles.shell}>
      <aside className={styles.chat}>
        <header className={styles.chatHeader}><div className={styles.brandMark}>ES</div><div><p>Eden Skye</p><span>AI creator agent ✨</span></div></header>
        <section className={styles.chatStream} aria-label="Chat history">
          {messages.map((message, index) => <article key={`${message.role}-${index}`} className={`${styles.message} ${message.role === 'user' ? styles.userMessage : ''}`}><b>{message.role === 'user' ? 'You' : message.role === 'assistant' ? 'Eden AI 🎀' : 'System'}</b><span>{message.content}</span></article>)}
          {isSending ? <article className={styles.message}><b>Eden AI 🎀</b><span>Thinking through the control plane...</span></article> : null}
        </section>
        <form className={styles.chatInput} onSubmit={sendMessage}>
          {attachments.length > 0 ? <div className={styles.attachmentTray}>{attachments.map((file) => <span key={`${file.name}-${file.size}`}>{file.name}</span>)}<button type="button" onClick={() => setAttachments([])}>Clear</button></div> : null}
          <label className={styles.dropZone}><input aria-label="Attach files" multiple type="file" accept="image/*,video/*,.csv,.json,.pdf,.txt" onChange={(event) => setAttachments(fileListToSummaries(event.currentTarget.files))} /><span>Attach images, videos, folders, or files</span></label>
          <textarea aria-label="Chat input" placeholder="Ask Eden to create an editorial glamour image, edit, review, approve, organize, or test..." value={input} onChange={(event) => setInput(event.currentTarget.value)} />
          <button type="submit" disabled={isSending}>{isSending ? 'Sending...' : 'Send'}</button>
        </form>
      </aside>

      <section className={styles.editor}>
        <header className={styles.editorTopbar}>
          <div><p>Eden source control</p><h1>{activeModuleLabel || 'Clean review editor'}</h1><span className={styles.primaryEmail}>{primaryEmail}</span></div>
          <div className={styles.topbarActions}><a href="/api/eden/source-images/agent">Agent API</a><a href="/api/eden/source-images/generate-image">Image API</a><a href="/api/eden/source-images/chat?selfTest=1">Gateway Test</a><a href="/api/eden/source-images/control-plane">Control API</a><button type="button" onClick={() => setActiveModule('customize')}>Customize</button></div>
        </header>

        <nav className={styles.moduleDock} aria-label="Editor modules">
          {modules.map((module) => <button key={module.id} type="button" draggable onClick={() => setActiveModule(module.id)} onDragStart={() => setDraggedModule(module.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => reorderModules(module.id)} onDragEnd={() => setDraggedModule(null)}><b>{module.label}</b><span>{module.helper}</span></button>)}
        </nav>

        {!activeModule ? <section className={styles.emptyState} aria-label="Empty editor state"><span>Ready</span><h2>Open Eden Agent or type “create an image” in chat.</h2></section> : null}

        {activeModule === 'eden' ? (
          <section className={styles.modulePanel}>
            <header><div><p>Avatar operator</p><h2>Eden Skye Agent</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header>
            <div className={styles.agentHero}>
              <button type="button" onClick={() => setExpandedMedia({ title: 'Eden Skye identity matrix', src: visualRefs.avatarMatrix, kind: 'image' })}><img src={visualRefs.avatarMatrix} alt="Eden Skye identity matrix preview" /></button>
              <div><span className={statusClass('green')}><b>✓</b>Persona online</span><h3>Beautiful, dangerous only to bad workflows.</h3><p>Eden now has a platform-safe Editorial Glamour lane: sensual, luxury, feminine, and guarded before every image request.</p></div>
            </div>

            <section className={styles.generatedWorkspace}>
              <header><div><p>Image studio</p><h2>Generated Images</h2></div><button type="button" onClick={() => void createImageDraft(creationBrief)}>Create Image</button></header>
              <div className={styles.glamourRail}>
                <button type="button" className={`${styles.toggleButton} ${editorialGlamour ? styles.toggleActive : ''}`} onClick={() => setEditorialGlamour((current) => !current)}><b>Editorial Glamour {editorialGlamour ? 'On' : 'Off'}</b><span>21+ synthetic, lingerie/swimwear, implied covered silhouettes, no nudity or explicit sexual content.</span></button>
                <div className={styles.guardrailPanel}><span className={statusClass(previewGuardrail.tone)}><b>{previewGuardrail.tone === 'green' ? '✓' : previewGuardrail.tone === 'red' ? 'x' : '!'}</b>{previewGuardrail.label}</span><p>{previewGuardrail.detail}</p></div>
              </div>
              {imageDrafts.length === 0 ? <div className={styles.imagePlaceholder}>No generated drafts yet. Type “create an editorial glamour image of Eden...” and this canvas wakes up ✨</div> : (
                <div className={styles.generatedGrid}>
                  {imageDrafts.map((draft) => <article key={draft.id} className={styles.generatedCard}>{draft.status === 'ready' && draft.imageSrc ? <button type="button" onClick={() => setExpandedMedia({ title: 'Generated Eden image', src: draft.imageSrc!, kind: 'image' })}><img src={draft.imageSrc} alt="Generated Eden visual draft" /></button> : <div className={styles.imagePlaceholder}>{draft.status === 'generating' ? 'Creating image...' : draft.status === 'blocked' ? 'Guardrail blocked' : 'Generation error'}</div>}<div><span className={statusClass(draft.status === 'ready' ? 'green' : draft.status === 'blocked' ? 'red' : 'yellow')}><b>{draft.status === 'ready' ? '✓' : draft.status === 'blocked' ? 'x' : '!'}</b>{draft.status}</span>{draft.guardrail ? <span className={statusClass(draft.guardrail.tone)}><b>{draft.guardrail.tone === 'green' ? '✓' : draft.guardrail.tone === 'red' ? 'x' : '!'}</b>{draft.guardrail.label}</span> : null}<p>{draft.prompt}</p>{draft.model ? <em>{draft.model}</em> : null}{draft.diagnostic ? <em>{draft.diagnostic}</em> : null}</div></article>)}
                </div>
              )}
            </section>

            <div className={styles.controlStrip}><label><span>Autonomy</span><select value={autonomyLevel} onChange={(event) => setAutonomyLevel(event.currentTarget.value)}>{autonomyLevels.map(([level, name]) => <option key={level} value={level}>{level} - {name}</option>)}</select></label><label><span>Creator brief</span><textarea value={creationBrief} onChange={(event) => setCreationBrief(event.currentTarget.value)} placeholder="Describe the image, video, website, logo, campaign, or admin action Eden should prepare..." /></label></div>
            <div className={styles.creatorGrid}>{creatorTools.map(([label, detail]) => <button key={label} type="button" onClick={() => runEdenAction(`Prepare ${label} creator packet.`)}><b>{label}</b><span>{detail}</span></button>)}</div>
            <div className={styles.actionGrid}>{actionButtons.map(([label, prompt]) => <button key={label} type="button" onClick={() => runEdenAction(prompt)} disabled={isSending}>{label}</button>)}</div>
            <div className={styles.statusList}>{edenTasks.map(([label, status, detail]) => <div key={label} className={styles.statusRow}><span className={statusClass(normalizeTone(status))}><b>{normalizeTone(status) === 'green' ? '✓' : normalizeTone(status) === 'red' ? 'x' : '!'}</b>{label}</span><em>{detail}</em></div>)}</div>
          </section>
        ) : null}

        {activeModule === 'images' ? <section className={styles.modulePanel}><header><div><p>Visual review</p><h2>Images</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header><div className={styles.mediaGrid}>{imagePreviews.map(([id, title, status, src]) => <figure key={id} className={styles.mediaCard}><button type="button" onClick={() => setExpandedMedia({ title: `${id} ${title}`, src, kind: 'image' })}><img src={src} alt={`${title} preview`} /></button><figcaption><b>{id}</b><span>{title}</span><em>{status}</em></figcaption></figure>)}</div></section> : null}
        {activeModule === 'videos' ? <section className={styles.modulePanel}><header><div><p>Visual review</p><h2>Videos</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header><div className={styles.videoGrid}>{videoPreviews.map(([id, title, status, poster]) => <figure key={id} className={styles.mediaCard}><button type="button" onClick={() => setExpandedMedia({ title: `${id} ${title}`, src: poster, kind: 'video' })}><video controls preload="metadata" poster={poster} aria-label={`${title} video preview`} /></button><figcaption><b>{id}</b><span>{title}</span><em>{status}</em></figcaption></figure>)}</div><div className={styles.noticeBox}><b>Video chat lane</b><span>Realtime video chat is staged as an approval-gated capability. Eden can prepare the architecture and provider packet now; live session creation requires verified credentials and explicit approval.</span></div></section> : null}
        {activeModule === 'approval' ? <section className={styles.modulePanel}><header><div><p>Admin control</p><h2>Approval Status</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header><div className={styles.legendGrid}>{statusLegend.map((item) => <div key={item.label} className={statusClass(item.tone)}><b>{item.mark}</b><span>{item.label}</span><em>{item.detail}</em></div>)}</div><div className={styles.statusList}>{approvalQueue.map((item) => <div key={item.label} className={styles.statusRow}><span className={statusClass(item.tone)}><b>{item.mark}</b>{item.label}</span><em>{item.detail}</em></div>)}</div><div className={styles.buttonGrid}>{manifestFiles.map(([label, id]) => <a key={id} href={`https://drive.google.com/file/d/${id}/view`}><b>{label}</b><span>{id}</span></a>)}</div></section> : null}
        {activeModule === 'folders' ? <section className={styles.modulePanel}><header><div><p>Drive storage</p><h2>Folders</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header><div className={styles.buttonGrid}>{folders.map(([name, count, id, tone]) => <a key={name} href={`https://drive.google.com/drive/folders/${id}`}><span className={statusClass(tone as StatusTone)}><b>{tone === 'green' ? '✓' : tone === 'yellow' ? '!' : 'x'}</b>{name}</span><span>{count}</span></a>)}</div></section> : null}
        {activeModule === 'manifest' ? <section className={styles.modulePanel}><header><div><p>Source truth</p><h2>Manifest</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header><div className={styles.listPanel}>{imageQueue.map(([asset, purpose, status]) => <div key={asset}><b>{asset}</b><span>{purpose}</span><em>{status}</em></div>)}</div></section> : null}
        {activeModule === 'integrations' ? <section className={styles.modulePanel}><header><div><p>Connected systems</p><h2>Integrations</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header><div className={styles.buttonGrid}>{connectedSystems.map(([name, status, tone, detail]) => <button key={name} type="button"><span className={statusClass(tone as StatusTone)}><b>{tone === 'green' ? '✓' : tone === 'red' ? 'x' : '!'}</b>{name}</span><span>{status}</span><em>{detail}</em></button>)}</div><div className={styles.noticeBox}><b>Connector boundary</b><span>Eden can prepare and route requests across these systems. Public preview write access requires app OAuth, service credentials, or approval-gated backend adapters before mutation.</span></div></section> : null}
        {activeModule === 'customize' ? <section className={styles.modulePanel}><header><div><p>Workspace control</p><h2>Customize Layout</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header><div className={styles.noticeBox}><b>Drag modules</b><span>Drag the buttons at the top to reorder the UI for this session. The next build can persist these preferences per operator.</span></div><div className={styles.buttonGrid}>{modules.map((module) => <button key={module.id} type="button" draggable onDragStart={() => setDraggedModule(module.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => reorderModules(module.id)} onDragEnd={() => setDraggedModule(null)}><b>{module.label}</b><span>Drag to reorder</span></button>)}</div></section> : null}
        {activeModule === 'leaks' ? <section className={styles.modulePanel}><header><div><p>Sandbox checks</p><h2>Leak Tests</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header><div className={styles.buttonGrid}>{leakTests.map(([label, status]) => <button key={label} type="button"><b>{label}</b><span>{status}</span></button>)}</div></section> : null}
      </section>

      {expandedMedia ? <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={`${expandedMedia.title} expanded preview`}><button className={styles.lightboxBackdrop} type="button" onClick={() => setExpandedMedia(null)} aria-label="Close expanded preview" /><figure className={styles.lightboxPanel}><header><b>{expandedMedia.title}</b><button type="button" onClick={() => setExpandedMedia(null)}>Close</button></header>{expandedMedia.kind === 'image' ? <img src={expandedMedia.src} alt={`${expandedMedia.title} expanded`} /> : <video controls poster={expandedMedia.src} aria-label={`${expandedMedia.title} expanded video preview`} />}</figure></div> : null}
    </main>
  );
}
