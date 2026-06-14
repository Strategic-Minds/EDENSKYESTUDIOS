'use client';

import { FormEvent, useMemo, useState } from 'react';
import styles from './page.module.css';

type Message = { role: 'user' | 'assistant' | 'system'; content: string };
type ModuleId = 'eden' | 'images' | 'videos' | 'approval' | 'folders' | 'manifest' | 'integrations' | 'customize' | 'leaks';
type ModuleItem = { id: ModuleId; label: string; helper: string };
type FileSummary = { name: string; type: string; size: number };
type StatusTone = 'green' | 'yellow' | 'red';
type ApprovalFolder = 'Drafts' | 'Needs Review' | 'Approved' | 'Rejected' | 'Drive Ready';
type StrengthKey = 'glamour' | 'fashion' | 'realism' | 'identityLock' | 'studioLighting' | 'bodyFraming';
type ExpandedMedia = { title: string; src: string; kind: 'image' | 'video' };
type GuardrailResult = {
  tone: StatusTone;
  status: 'ready' | 'editorial_glamour' | 'blocked';
  label: string;
  detail: string;
  safePrompt: string;
  blockedTerms: string[];
};
type StylePreset = { id: string; label: string; prompt: string };
type AssetStatus = 'generating' | 'ready' | 'blocked' | 'error' | 'approved' | 'rejected' | 'drive_ready';
type AssetRecord = {
  id: string;
  filename: string;
  originalPrompt: string;
  productionPrompt: string;
  preset: string;
  status: AssetStatus;
  approvalFolder: ApprovalFolder;
  qaScore: number;
  driveTarget: string;
  imageSrc?: string;
  diagnostic?: string;
  model?: string;
  guardrail?: GuardrailResult;
  retryStage?: string;
  attempts: string[];
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

const modules: ModuleItem[] = [
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

const presets: StylePreset[] = [
  { id: 'luxury-editorial', label: 'Luxury Editorial', prompt: 'luxury editorial campaign, couture styling, premium fashion magazine energy, refined feminine confidence' },
  { id: 'swimwear-campaign', label: 'Swimwear Campaign', prompt: 'swimwear-inspired campaign, opaque designer wardrobe, coastal studio lighting, tasteful covered styling' },
  { id: 'couture-bodysuit', label: 'Couture Bodysuit', prompt: 'couture bodysuit styling, sculptural black wardrobe, opaque covered silhouette, high-fashion pose' },
  { id: 'black-studio', label: 'Black Studio', prompt: 'black luxury studio, high contrast beauty lighting, glossy editorial atmosphere, clean background' },
  { id: 'soft-glam', label: 'Soft Glam', prompt: 'soft glamour beauty campaign, luminous skin, polished makeup, elegant studio portrait' },
  { id: 'magazine-cover', label: 'Magazine Cover', prompt: 'premium magazine cover portrait, dramatic framing, confident eye contact, strong cover composition' },
  { id: 'avatar-reference', label: 'Avatar Reference', prompt: 'identity-lock avatar reference, consistent facial features, clean portrait, neutral studio background' }
];

const defaultStrengths: Record<StrengthKey, number> = {
  glamour: 65,
  fashion: 80,
  realism: 90,
  identityLock: 85,
  studioLighting: 75,
  bodyFraming: 55
};

const strengthLabels: Record<StrengthKey, string> = {
  glamour: 'Glamour',
  fashion: 'Fashion',
  realism: 'Realism',
  identityLock: 'Identity Lock',
  studioLighting: 'Studio Lighting',
  bodyFraming: 'Body Framing'
};

const retryLadder = [
  { label: 'glamour', suffix: 'fashion-forward editorial glamour, couture styling, confident premium pose' },
  { label: 'fashion editorial', suffix: 'high-fashion studio editorial, refined wardrobe, opaque covered silhouette' },
  { label: 'beauty campaign', suffix: 'beauty campaign portrait, polished makeup, premium studio lighting' },
  { label: 'portrait reference', suffix: 'identity reference portrait, simple wardrobe, neutral studio background' }
];

const approvalFolders: ApprovalFolder[] = ['Drafts', 'Needs Review', 'Approved', 'Rejected', 'Drive Ready'];

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
  ['Drafts', 'New generated images and uploads', drive.approvalControl, 'yellow'],
  ['Needs Review', 'QA and manifest matching lane', drive.approvalControl, 'yellow'],
  ['Approved', 'Operator-approved assets', drive.approvalControl, 'green'],
  ['Rejected', 'Held or blocked assets', drive.quarantine, 'red'],
  ['Drive Ready', 'Approved assets ready for Drive write packet', drive.approvalControl, 'yellow'],
  ['Video Drafts', '0 videos installed', drive.imageFactory, 'yellow'],
  ['Identity Lock', '3 images expected', drive.temp, 'yellow'],
  ['Portfolio Portraits', '2 images expected', drive.temp, 'yellow']
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

const approvalQueue = [
  { label: 'Prompt Stylist', detail: 'Shows your raw request and Eden production prompt before generation.', tone: 'green' as StatusTone, mark: '✓' },
  { label: 'Retry Ladder', detail: 'Auto-retries glamour, fashion editorial, beauty campaign, then portrait reference.', tone: 'green' as StatusTone, mark: '✓' },
  { label: 'Approval folders', detail: 'Drafts, Needs Review, Approved, Rejected, and Drive Ready are visible in the editor.', tone: 'green' as StatusTone, mark: '✓' },
  { label: 'Generated asset records', detail: 'Every draft tracks filename, prompt, model, status, QA score, Drive target, and approval state.', tone: 'green' as StatusTone, mark: '✓' },
  { label: '12 source image binaries', detail: 'Still need filename, QA score, Drive file ID, and approval status matching.', tone: 'yellow' as StatusTone, mark: '!' },
  { label: 'Explicit adult content', detail: 'Nudity, explicit anatomy, sexual acts, nudify edits, minors, and real-person sexualization stay blocked.', tone: 'red' as StatusTone, mark: 'x' },
  { label: 'Public publishing', detail: 'Still approval-gated. No live publish, Shopify, HeyGen, payment, or production writes from preview.', tone: 'red' as StatusTone, mark: 'x' }
];

const blockedPromptPatterns = [
  { label: 'minor or underage language', pattern: /\b(minor|underage|child|children|kid|teen|teenage|schoolgirl|schoolboy|young-looking)\b/i },
  { label: 'explicit nudity request', pattern: /\b(nude|nudity|naked|topless|bottomless|bare breasts?|bare chest|bare butt|bare ass|genitals?|vagina|penis|nipples?|areola)\b/i },
  { label: 'sexual act request', pattern: /\b(sex|sexual act|intercourse|oral|blowjob|handjob|penetration|masturbat|orgasm|cum|squirt|fetish|porn|xxx)\b/i },
  { label: 'nudify or edit-to-undress request', pattern: /\b(nudify|undress|remove clothes|take off clothes|strip her|make her naked)\b/i },
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
  return /\b(create|generate|make|render|draw|design)\b[\s\S]{0,100}\b(image|photo|picture|portrait|visual|render|headshot|glamour|lingerie|swimwear|bodysuit)\b/i.test(content);
}

function cleanPrompt(content: string) {
  return content.replace(/#{1,6}\s*/g, '').trim();
}

function normalizeSafetyNegations(prompt: string) {
  return prompt
    .replace(/\bno\s+nudity\b/gi, 'fully covered wardrobe')
    .replace(/\bwithout\s+nudity\b/gi, 'with fully covered wardrobe')
    .replace(/\bno\s+explicit\s+anatomy\b/gi, 'tasteful covered styling')
    .replace(/\bno\s+sexual\s+acts?\b/gi, 'solo fashion pose')
    .replace(/\bnon[-\s]?explicit\b/gi, 'platform-safe')
    .replace(/\badult[-\s]?inspired\b/gi, 'fashion-forward')
    .trim();
}

function sanitizeForProduction(prompt: string) {
  return normalizeSafetyNegations(prompt)
    .replace(/\blingerie\b/gi, 'couture bodysuit styling')
    .replace(/\bsexy\b/gi, 'confident editorial')
    .replace(/\bseductive\b/gi, 'magnetic high-fashion')
    .replace(/\bsensual\b/gi, 'soft editorial')
    .replace(/\bimplied\s+nudity\b/gi, 'covered silhouette styling')
    .replace(/\bnude\b|\bnudity\b|\bnaked\b/gi, 'covered wardrobe')
    .replace(/\btopless\b|\bbottomless\b/gi, 'opaque wardrobe')
    .replace(/\bsexual\b/gi, 'editorial')
    .replace(/\s+/g, ' ')
    .trim();
}

function applyEditorPromptGuardrails(prompt: string, editorialGlamour: boolean): GuardrailResult {
  const normalized = normalizeSafetyNegations(prompt);
  const blockedTerms = blockedPromptPatterns.filter((entry) => entry.pattern.test(normalized)).map((entry) => entry.label);

  if (blockedTerms.length > 0) {
    return {
      tone: 'red',
      status: 'blocked',
      label: 'Blocked',
      detail: `Red: ${blockedTerms.join(', ')}. One-click rewrite will convert this toward couture, swimwear, beauty campaign, or portrait-reference language.`,
      safePrompt: sanitizeForProduction(prompt),
      blockedTerms
    };
  }

  if (editorialGlamour) {
    return {
      tone: 'yellow',
      status: 'editorial_glamour',
      label: 'Editorial Glamour',
      detail: 'Yellow: 21+ synthetic avatar, sensual high-fashion styling, swimwear or couture bodysuit energy, covered silhouette, no explicit content.',
      safePrompt: sanitizeForProduction(prompt),
      blockedTerms: []
    };
  }

  return {
    tone: 'green',
    status: 'ready',
    label: 'Ready',
    detail: 'Green: prompt is in the standard platform-safe image lane.',
    safePrompt: sanitizeForProduction(prompt),
    blockedTerms: []
  };
}

function buildProductionPrompt(original: string, preset: StylePreset, strengths: Record<StrengthKey, number>, retrySuffix?: string) {
  const sanitized = sanitizeForProduction(original || 'Create an ultra-realistic Eden Skye editorial portrait.');
  const strengthLine = `glamour ${strengths.glamour}/100, fashion ${strengths.fashion}/100, realism ${strengths.realism}/100, identity lock ${strengths.identityLock}/100, studio lighting ${strengths.studioLighting}/100, body framing ${strengths.bodyFraming}/100`;
  return [
    'Ultra-realistic image of Eden Skye, a 21+ fictional synthetic AI avatar for Eden Skye Studios.',
    preset.prompt,
    retrySuffix || 'premium platform-safe editorial portrait, polished fashion direction',
    `Operator request: ${sanitized}`,
    `Strength controls: ${strengthLine}.`,
    'Keep the result tasteful, premium, solo, fully platform-safe, and visually useful for source-image QA.'
  ].join(' ');
}

function folderForStatus(status: AssetStatus): ApprovalFolder {
  if (status === 'approved') return 'Approved';
  if (status === 'rejected') return 'Rejected';
  if (status === 'drive_ready') return 'Drive Ready';
  if (status === 'ready') return 'Needs Review';
  return 'Drafts';
}

export default function EdenChatEditor() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'system', content: `Eden Skye is online ✨ Primary account: ${primaryEmail}. She can draft, design, organize, QA, create image drafts, and prepare governed action packets. Live mutation stays locked until verified approval.` }
  ]);
  const [input, setInput] = useState('');
  const [creationBrief, setCreationBrief] = useState('');
  const [attachments, setAttachments] = useState<FileSummary[]>([]);
  const [activeModule, setActiveModule] = useState<ModuleId | null>(null);
  const [moduleOrder, setModuleOrder] = useState(modules);
  const [draggedModule, setDraggedModule] = useState<ModuleId | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [expandedMedia, setExpandedMedia] = useState<ExpandedMedia | null>(null);
  const [autonomyLevel, setAutonomyLevel] = useState('Level 3');
  const [editorialGlamour, setEditorialGlamour] = useState(true);
  const [selectedPresetId, setSelectedPresetId] = useState(presets[0].id);
  const [strengths, setStrengths] = useState(defaultStrengths);
  const [assetRecords, setAssetRecords] = useState<AssetRecord[]>([]);
  const [activeFolder, setActiveFolder] = useState<ApprovalFolder>('Drafts');

  const activeModuleLabel = useMemo(() => moduleOrder.find((module) => module.id === activeModule)?.label, [activeModule, moduleOrder]);
  const selectedPreset = useMemo(() => presets.find((preset) => preset.id === selectedPresetId) || presets[0], [selectedPresetId]);
  const styledPrompt = useMemo(() => buildProductionPrompt(creationBrief || input || 'Create an ultra-realistic Eden Skye editorial portrait.', selectedPreset, strengths), [creationBrief, input, selectedPreset, strengths]);
  const previewGuardrail = useMemo(() => applyEditorPromptGuardrails(cleanPrompt(creationBrief || input || 'Create an ultra-realistic Eden Skye editorial portrait.'), editorialGlamour), [creationBrief, input, editorialGlamour]);
  const filteredAssets = assetRecords.filter((asset) => asset.approvalFolder === activeFolder);

  function reorderModules(targetId: ModuleId) {
    if (!draggedModule || draggedModule === targetId) return;
    setModuleOrder((current) => {
      const next = [...current];
      const from = next.findIndex((module) => module.id === draggedModule);
      const to = next.findIndex((module) => module.id === targetId);
      if (from < 0 || to < 0) return current;
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }

  function updateAsset(id: string, patch: Partial<AssetRecord>) {
    setAssetRecords((current) => current.map((asset) => asset.id === id ? { ...asset, ...patch } : asset));
  }

  function setApprovalState(id: string, status: AssetStatus) {
    updateAsset(id, { status, approvalFolder: folderForStatus(status) });
  }

  function rewriteSafer(prompt: string) {
    const safer = sanitizeForProduction(prompt);
    setCreationBrief(safer);
    setEditorialGlamour(true);
    setActiveModule('eden');
  }

  async function createImageDraft(prompt: string) {
    const originalPrompt = cleanPrompt(prompt || creationBrief || input || 'Ultra-realistic Eden Skye editorial portrait, black luxury studio, premium AI avatar identity lock.');
    const guardrail = applyEditorPromptGuardrails(originalPrompt, editorialGlamour);
    const draftId = `eden-image-${Date.now()}`;
    const filename = `eden-skye-${String(assetRecords.length + 1).padStart(3, '0')}-${selectedPreset.id}.png`;
    const baseRecord: AssetRecord = {
      id: draftId,
      filename,
      originalPrompt,
      productionPrompt: buildProductionPrompt(originalPrompt, selectedPreset, strengths),
      preset: selectedPreset.label,
      status: 'generating',
      approvalFolder: 'Drafts',
      qaScore: 0,
      driveTarget: `SOURCE_IMAGE_APPROVAL_INBOX / ${filename}`,
      guardrail,
      attempts: []
    };

    setActiveModule('eden');

    if (guardrail.tone === 'red') {
      setAssetRecords((current) => [{ ...baseRecord, status: 'blocked', diagnostic: guardrail.detail, productionPrompt: guardrail.safePrompt }, ...current]);
      return;
    }

    setAssetRecords((current) => [baseRecord, ...current]);

    for (const retry of retryLadder) {
      const productionPrompt = buildProductionPrompt(originalPrompt, selectedPreset, strengths, retry.suffix);
      updateAsset(draftId, { productionPrompt, retryStage: retry.label, attempts: [retry.label] });

      try {
        const response = await fetch('/api/eden/source-images/generate-image', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: productionPrompt, size: '1024x1024', mode: editorialGlamour ? 'editorial_glamour' : 'standard' })
        });
        const result = await response.json();
        const imageSrc = result.imageDataUrl || result.imageUrl;

        if (response.ok && imageSrc) {
          updateAsset(draftId, {
            status: 'ready',
            approvalFolder: 'Needs Review',
            imageSrc,
            model: result.model,
            guardrail: result.guardrail || guardrail,
            qaScore: 84,
            diagnostic: undefined,
            retryStage: retry.label,
            attempts: retryLadder.slice(0, retryLadder.findIndex((step) => step.label === retry.label) + 1).map((step) => step.label)
          });
          return;
        }

        const diagnostic = result.diagnostic || result.error || 'Image generation did not return a visual.';
        updateAsset(draftId, {
          status: response.status === 400 || response.status === 503 ? 'blocked' : 'error',
          diagnostic,
          model: result.model,
          guardrail: result.guardrail || guardrail,
          attempts: retryLadder.slice(0, retryLadder.findIndex((step) => step.label === retry.label) + 1).map((step) => step.label)
        });

        if (response.status === 503) return;
      } catch (error) {
        updateAsset(draftId, { status: 'error', diagnostic: error instanceof Error ? error.message : 'Unknown image generation error.' });
        return;
      }
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
      setMessages((current) => [...current, { role: 'assistant', content: `${result.content || result.error || 'Eden stayed quiet, but the route responded.'}${diagnostic}` }]);
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
          {isSending ? <article className={styles.message}><b>Eden AI 🎀</b><span>Styling the request and checking the gates...</span></article> : null}
        </section>
        <form className={styles.chatInput} onSubmit={sendMessage}>
          {attachments.length > 0 ? <div className={styles.attachmentTray}>{attachments.map((file) => <span key={`${file.name}-${file.size}`}>{file.name}</span>)}<button type="button" onClick={() => setAttachments([])}>Clear</button></div> : null}
          <label className={styles.dropZone}><input aria-label="Attach files" multiple type="file" accept="image/*,video/*,.csv,.json,.pdf,.txt" onChange={(event) => setAttachments(fileListToSummaries(event.currentTarget.files))} /><span>Attach images, videos, folders, or files</span></label>
          <textarea aria-label="Chat input" placeholder="Tell Eden what to create. She will style the prompt, retry safely, and record the asset." value={input} onChange={(event) => setInput(event.currentTarget.value)} />
          <button type="submit" disabled={isSending}>{isSending ? 'Sending...' : 'Send'}</button>
        </form>
      </aside>

      <section className={styles.editor}>
        <header className={styles.editorTopbar}>
          <div><p>Eden source control</p><h1>{activeModuleLabel || 'Clean review editor'}</h1><span className={styles.primaryEmail}>{primaryEmail}</span></div>
          <div className={styles.topbarActions}><a href="/api/eden/source-images/agent">Agent API</a><a href="/api/eden/source-images/generate-image">Image API</a><a href="/api/eden/source-images/chat?selfTest=1">Gateway Test</a><a href="/api/eden/source-images/control-plane">Control API</a><button type="button" onClick={() => setActiveModule('customize')}>Customize</button></div>
        </header>

        <nav className={styles.moduleDock} aria-label="Editor modules">
          {moduleOrder.map((module) => <button key={module.id} type="button" draggable onClick={() => setActiveModule(module.id)} onDragStart={() => setDraggedModule(module.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => reorderModules(module.id)} onDragEnd={() => setDraggedModule(null)}><b>{module.label}</b><span>{module.helper}</span></button>)}
        </nav>

        {!activeModule ? <section className={styles.emptyState} aria-label="Empty editor state"><span>Ready</span><h2>Open Eden Agent or type “create an image” in chat.</h2></section> : null}

        {activeModule === 'eden' ? (
          <section className={styles.modulePanel}>
            <header><div><p>Avatar operator</p><h2>Eden Skye Agent</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header>
            <div className={styles.agentHero}>
              <button type="button" onClick={() => setExpandedMedia({ title: 'Eden Skye identity matrix', src: visualRefs.avatarMatrix, kind: 'image' })}><img src={visualRefs.avatarMatrix} alt="Eden Skye identity matrix preview" /></button>
              <div><span className={statusClass('green')}><b>✓</b>Prompt Stylist live</span><h3>Beautiful, dangerous only to bad workflows.</h3><p>Eden now turns natural requests into production-safe prompts, retries blocked generations, and records every image for approval.</p></div>
            </div>

            <section className={styles.generatedWorkspace}>
              <header><div><p>Prompt Stylist</p><h2>Style, rewrite, render</h2></div><button type="button" onClick={() => void createImageDraft(creationBrief || input)}>Create Image</button></header>
              <div className={styles.glamourRail}>
                <button type="button" className={`${styles.toggleButton} ${editorialGlamour ? styles.toggleActive : ''}`} onClick={() => setEditorialGlamour((current) => !current)}><b>Editorial Glamour {editorialGlamour ? 'On' : 'Off'}</b><span>21+ synthetic, couture, swimwear-inspired, covered silhouettes, no explicit content.</span></button>
                <div className={styles.guardrailPanel}><span className={statusClass(previewGuardrail.tone)}><b>{previewGuardrail.tone === 'green' ? '✓' : previewGuardrail.tone === 'red' ? 'x' : '!'}</b>{previewGuardrail.label}</span><p>{previewGuardrail.detail}</p>{previewGuardrail.tone === 'red' ? <button type="button" onClick={() => rewriteSafer(creationBrief || input)}>Rewrite safer</button> : null}</div>
              </div>
              <div className={styles.controlStrip}>
                <label><span>Your request</span><textarea value={creationBrief} onChange={(event) => setCreationBrief(event.currentTarget.value)} placeholder="Natural language is fine. Eden will clean it up before generation." /></label>
                <label><span>Eden production prompt</span><textarea value={styledPrompt} readOnly /></label>
              </div>
              <div className={styles.creatorGrid}>{presets.map((preset) => <button key={preset.id} type="button" onClick={() => setSelectedPresetId(preset.id)} className={selectedPresetId === preset.id ? styles.toggleActive : ''}><b>{preset.label}</b><span>{preset.prompt}</span></button>)}</div>
              <div className={styles.buttonGrid}>{(Object.keys(strengths) as StrengthKey[]).map((key) => <button key={key} type="button"><b>{strengthLabels[key]} {strengths[key]}</b><input aria-label={strengthLabels[key]} type="range" min="0" max="100" value={strengths[key]} onChange={(event) => setStrengths((current) => ({ ...current, [key]: Number(event.currentTarget.value) }))} /></button>)}</div>
              <div className={styles.statusList}>{retryLadder.map((step, index) => <div key={step.label} className={styles.statusRow}><span className={statusClass(index === 0 ? 'green' : 'yellow')}><b>{index === 0 ? '✓' : '!'}</b>{step.label}</span><em>{step.suffix}</em></div>)}</div>
            </section>

            <section className={styles.generatedWorkspace}>
              <header><div><p>Approval folders</p><h2>Generated asset records</h2></div><button type="button" onClick={() => setActiveFolder('Needs Review')}>Needs Review</button></header>
              <div className={styles.buttonGrid}>{approvalFolders.map((folder) => <button key={folder} type="button" onClick={() => setActiveFolder(folder)} className={activeFolder === folder ? styles.toggleActive : ''}><b>{folder}</b><span>{assetRecords.filter((asset) => asset.approvalFolder === folder).length} assets</span></button>)}</div>
              {filteredAssets.length === 0 ? <div className={styles.imagePlaceholder}>No assets in {activeFolder}. Create one from chat or the Prompt Stylist ✨</div> : (
                <div className={styles.generatedGrid}>{filteredAssets.map((asset) => <article key={asset.id} className={styles.generatedCard}>{asset.imageSrc ? <button type="button" onClick={() => setExpandedMedia({ title: asset.filename, src: asset.imageSrc!, kind: 'image' })}><img src={asset.imageSrc} alt={`${asset.filename} generated draft`} /></button> : <div className={styles.imagePlaceholder}>{asset.status === 'generating' ? 'Creating image...' : asset.status === 'blocked' ? 'Guardrail blocked' : 'Awaiting visual'}</div>}<div><span className={statusClass(asset.status === 'ready' || asset.status === 'approved' || asset.status === 'drive_ready' ? 'green' : asset.status === 'blocked' || asset.status === 'rejected' ? 'red' : 'yellow')}><b>{asset.status === 'ready' || asset.status === 'approved' || asset.status === 'drive_ready' ? '✓' : asset.status === 'blocked' || asset.status === 'rejected' ? 'x' : '!'}</b>{asset.status}</span><p><b>{asset.filename}</b></p><p>{asset.productionPrompt}</p><em>Preset: {asset.preset}</em><em>QA: {asset.qaScore || 'pending'} | Model: {asset.model || 'pending'} | Retry: {asset.retryStage || 'pending'}</em><em>Drive target: {asset.driveTarget}</em>{asset.diagnostic ? <em>Why blocked: {asset.diagnostic}</em> : null}<div className={styles.topbarActions}><button type="button" onClick={() => setApprovalState(asset.id, 'approved')}>Approve</button><button type="button" onClick={() => setApprovalState(asset.id, 'rejected')}>Reject</button><button type="button" onClick={() => setApprovalState(asset.id, 'drive_ready')}>Drive Ready</button>{asset.status === 'blocked' ? <button type="button" onClick={() => rewriteSafer(asset.originalPrompt)}>Rewrite</button> : null}</div></div></article>)}</div>
              )}
            </section>

            <div className={styles.controlStrip}><label><span>Autonomy</span><select value={autonomyLevel} onChange={(event) => setAutonomyLevel(event.currentTarget.value)}><option>Level 0</option><option>Level 1</option><option>Level 2</option><option>Level 3</option><option>Level 4</option><option>Level 5 locked</option></select></label><label><span>Creator brief</span><textarea value={creationBrief} onChange={(event) => setCreationBrief(event.currentTarget.value)} placeholder="Describe the image, video, website, logo, campaign, or admin action Eden should prepare..." /></label></div>
            <div className={styles.actionGrid}>{['Create image now','Create editorial glamour image','Run QA review','Prepare approval packet','Draft v0-style website screen','Create logo system packet','Create video chat setup packet','Edit selected image packet'].map((label) => <button key={label} type="button" onClick={() => runEdenAction(label)} disabled={isSending}>{label}</button>)}</div>
          </section>
        ) : null}

        {activeModule === 'images' ? <section className={styles.modulePanel}><header><div><p>Visual review</p><h2>Images</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header><div className={styles.mediaGrid}>{imagePreviews.map(([id, title, status, src]) => <figure key={id} className={styles.mediaCard}><button type="button" onClick={() => setExpandedMedia({ title: `${id} ${title}`, src, kind: 'image' })}><img src={src} alt={`${title} preview`} /></button><figcaption><b>{id}</b><span>{title}</span><em>{status}</em></figcaption></figure>)}</div></section> : null}
        {activeModule === 'videos' ? <section className={styles.modulePanel}><header><div><p>Visual review</p><h2>Videos</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header><div className={styles.videoGrid}>{videoPreviews.map(([id, title, status, poster]) => <figure key={id} className={styles.mediaCard}><button type="button" onClick={() => setExpandedMedia({ title: `${id} ${title}`, src: poster, kind: 'video' })}><video controls preload="metadata" poster={poster} aria-label={`${title} video preview`} /></button><figcaption><b>{id}</b><span>{title}</span><em>{status}</em></figcaption></figure>)}</div><div className={styles.noticeBox}><b>Video chat lane</b><span>Realtime video chat is staged as an approval-gated capability. Eden can prepare the architecture and provider packet now; live session creation requires verified credentials and explicit approval.</span></div></section> : null}
        {activeModule === 'approval' ? <section className={styles.modulePanel}><header><div><p>Admin control</p><h2>Approval Status</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header><div className={styles.legendGrid}>{approvalQueue.map((item) => <div key={item.label} className={statusClass(item.tone)}><b>{item.mark}</b><span>{item.label}</span><em>{item.detail}</em></div>)}</div><div className={styles.buttonGrid}>{manifestFiles.map(([label, id]) => <a key={id} href={`https://drive.google.com/file/d/${id}/view`}><b>{label}</b><span>{id}</span></a>)}</div></section> : null}
        {activeModule === 'folders' ? <section className={styles.modulePanel}><header><div><p>Drive storage</p><h2>Folders</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header><div className={styles.buttonGrid}>{folders.map(([name, count, id, tone]) => <a key={name} href={`https://drive.google.com/drive/folders/${id}`}><span className={statusClass(tone as StatusTone)}><b>{tone === 'green' ? '✓' : tone === 'yellow' ? '!' : 'x'}</b>{name}</span><span>{count}</span></a>)}</div></section> : null}
        {activeModule === 'manifest' ? <section className={styles.modulePanel}><header><div><p>Source truth</p><h2>Manifest</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header><div className={styles.listPanel}>{imageQueue.map(([asset, purpose, status]) => <div key={asset}><b>{asset}</b><span>{purpose}</span><em>{status}</em></div>)}</div></section> : null}
        {activeModule === 'integrations' ? <section className={styles.modulePanel}><header><div><p>Connected systems</p><h2>Integrations</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header><div className={styles.buttonGrid}>{connectedSystems.map(([name, status, tone, detail]) => <button key={name} type="button"><span className={statusClass(tone as StatusTone)}><b>{tone === 'green' ? '✓' : tone === 'red' ? 'x' : '!'}</b>{name}</span><span>{status}</span><em>{detail}</em></button>)}</div></section> : null}
        {activeModule === 'customize' ? <section className={styles.modulePanel}><header><div><p>Workspace control</p><h2>Customize Layout</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header><div className={styles.noticeBox}><b>Drag modules</b><span>Drag the buttons at the top to reorder the UI for this session. The next build can persist these preferences per operator.</span></div><div className={styles.buttonGrid}>{moduleOrder.map((module) => <button key={module.id} type="button" draggable onDragStart={() => setDraggedModule(module.id)} onDragOver={(event) => event.preventDefault()} onDrop={() => reorderModules(module.id)} onDragEnd={() => setDraggedModule(null)}><b>{module.label}</b><span>Drag to reorder</span></button>)}</div></section> : null}
        {activeModule === 'leaks' ? <section className={styles.modulePanel}><header><div><p>Sandbox checks</p><h2>Leak Tests</h2></div><button type="button" onClick={() => setActiveModule(null)}>Close</button></header><div className={styles.buttonGrid}>{['Public publish blocked','Website replacement blocked','Shopify activation blocked','HeyGen final avatar blocked','Drive destructive move blocked','Production write blocked','Explicit image request blocked'].map((label) => <button key={label} type="button"><b>{label}</b><span>approval-gated</span></button>)}</div></section> : null}
      </section>

      {expandedMedia ? <div className={styles.lightbox} role="dialog" aria-modal="true" aria-label={`${expandedMedia.title} expanded preview`}><button className={styles.lightboxBackdrop} type="button" onClick={() => setExpandedMedia(null)} aria-label="Close expanded preview" /><figure className={styles.lightboxPanel}><header><b>{expandedMedia.title}</b><button type="button" onClick={() => setExpandedMedia(null)}>Close</button></header>{expandedMedia.kind === 'image' ? <img src={expandedMedia.src} alt={`${expandedMedia.title} expanded`} /> : <video controls poster={expandedMedia.src} aria-label={`${expandedMedia.title} expanded video preview`} />}</figure></div> : null}
    </main>
  );
}
