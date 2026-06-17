"use client"

import { useState } from 'react'

const sourceImages = [
  {
    title: 'Eden Skye Labeled Source Portrait',
    fileName: '01-eden-labeled-eden-skye.png',
    driveFileId: '1lmOJBPF0G2wotinP7Q9iDiVqorZI8FQs',
    status: 'Approved for draft generator use',
    usage: 'Primary identity-lock source for branded website image packets.',
    generatorState: 'draft_ready_pending_review',
    sourceType: 'labeled_source_portrait'
  },
  {
    title: 'Eden Skye Basic Source Portrait',
    fileName: '01-eden-basic-eden-skye.png',
    driveFileId: '1ndzEOsotXMhwU_XeSb--4ajZtg0nuZg7',
    status: 'Approved for draft generator use',
    usage: 'Secondary source for website hero, section, and social proof variations.',
    generatorState: 'draft_ready_pending_review',
    sourceType: 'basic_source_portrait'
  }
]

const promptQueue = [
  { id: 'eden-web-hero-001', placement: 'Homepage hero desktop', format: '16:9', assetType: 'website_hero', objective: 'Photoreal premium first-viewport brand signal for Eden Skye Studios.' },
  { id: 'eden-web-hero-mobile-001', placement: 'Homepage hero mobile crop', format: '9:16', assetType: 'website_hero', objective: 'Photoreal mobile-first hero image for the Eden Skye homepage.' },
  { id: 'eden-identity-lock-001', placement: 'Identity lock reference', format: '4:5', assetType: 'identity_lock', objective: 'Photoreal identity-consistent reference image for future website and social assets.' },
  { id: 'eden-studio-control-room-001', placement: 'AI content studio section', format: '16:9', assetType: 'lifestyle', objective: 'Photoreal premium AI content control room image.' },
  { id: 'eden-luxury-closet-001', placement: 'Eden closet / wardrobe section', format: '3:2', assetType: 'lifestyle', objective: 'Photoreal website section image for fashion, wardrobe, and premium creator styling.' },
  { id: 'eden-campaign-card-001', placement: 'Model campaign card', format: '4:5', assetType: 'portfolio_portrait', objective: 'Photoreal campaign card image for the Models and Services sections.' },
  { id: 'eden-black-card-001', placement: 'Black card / membership visual', format: '16:9', assetType: 'background_context', objective: 'Premium membership section visual without exposing payment or live offer details.' },
  { id: 'eden-og-image-001', placement: 'Open Graph / social share image', format: '16:9', assetType: 'website_hero', objective: 'Photoreal share-preview image for Eden Skye Studios pages.' }
]

const reviewSets = [
  {
    title: 'Labeled 13-Model Contact Sheet',
    driveFileId: '1AGx7Jn2w-WDamS8CdXB8KaI8yYzFDwMr',
    note: 'Reference only for the wider roster. Do not use for Eden Skye identity without a separate approval.'
  },
  {
    title: 'Basic 13-Model Contact Sheet',
    driveFileId: '1OirCLXguzctHipnwV6N9EIMMzJSLVV11',
    note: 'Reference only for the wider roster. Eden Skye is the first approved lane.'
  },
  {
    title: 'Basic Female 10-Model Contact Sheet',
    driveFileId: '1zrvChlWjquOVEN_UzK-DX919NN5vCkMj',
    note: 'Reference only. These images are not part of the Eden Skye identity lock.'
  }
]

type RuntimeSettings = {
  quality: 'low' | 'medium' | 'high' | 'auto'
  referenceMode: 'on' | 'off'
  referenceCount: number
  maxBatchSize: number
  providerTimeoutMs: number
  saveMediaAssets: boolean
}

type GeneratedImage = {
  promptId: string
  status: 'generated' | 'blocked'
  placement: string
  assetType: string
  imageBase64?: string
  mimeType?: string
  storageBucket?: string
  storagePath?: string
  mediaAssetId?: string
  persistenceStatus?: 'stored' | 'skipped' | 'failed'
  persistenceError?: string
  generationMethod?: 'reference_edit' | 'text_generation'
  blockedReason?: string
}

type PipelineResponse = {
  ok: boolean
  mode: 'validate' | 'generate'
  readiness?: {
    canGenerate: boolean
    enabled: boolean
    apiKeyConfigured: boolean
    provider?: string
    model?: string
    quality?: string
    providerBaseUrlConfigured?: boolean
    providerTimeoutMs?: number
    maxBatchSize?: number
    referenceImageMode?: boolean
    referenceImageCount?: number | string
    persistenceEnabled?: boolean
    storageBucketConfigured?: boolean
    runtimeSettings?: RuntimeSettings
    blockers: string[]
  }
  generated?: GeneratedImage[]
  promptCount?: number
  nextAction?: string
  error?: string
}

type Decision = 'approve' | 'revise' | 'reject'

type DecisionState = {
  decision: Decision
  status: 'saved' | 'failed'
  message: string
}

function thumbnail(fileId: string, size = 900) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`
}

function driveView(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/view`
}

const defaultRuntimeSettings: RuntimeSettings = {
  quality: 'medium',
  referenceMode: 'on',
  referenceCount: 1,
  maxBatchSize: 1,
  providerTimeoutMs: 120000,
  saveMediaAssets: false
}

export default function ImageApprovalPage() {
  const [pipeline, setPipeline] = useState<PipelineResponse | null>(null)
  const [generatedImages, setGeneratedImages] = useState<Record<string, GeneratedImage>>({})
  const [busy, setBusy] = useState<'validate' | 'generate-one' | 'generate-batch' | `generate-${string}` | null>(null)
  const [operatorToken, setOperatorToken] = useState('')
  const [decisions, setDecisions] = useState<Record<string, DecisionState>>({})
  const [settings, setSettings] = useState<RuntimeSettings>(defaultRuntimeSettings)

  async function runPipeline(mode: 'validate' | 'generate', input?: { limit?: number; promptId?: string }) {
    const busyState = mode === 'validate' ? 'validate' : input?.promptId ? `generate-${input.promptId}` as const : 'generate-batch'
    setBusy(busyState)
    try {
      const headers = buildHeaders()
      const response = await fetch('/api/media/eden-image-generator', {
        method: 'POST',
        headers,
        body: JSON.stringify({ mode, limit: input?.limit, promptId: input?.promptId, settings })
      })
      const payload = await response.json() as PipelineResponse
      setPipeline(payload)
      if (payload.generated?.length) {
        setGeneratedImages((current) => {
          const next = { ...current }
          for (const image of payload.generated ?? []) next[image.promptId] = image
          return next
        })
      }
    } catch (error) {
      setPipeline({ ok: false, mode, nextAction: error instanceof Error ? error.message : 'Pipeline request failed.' })
    } finally {
      setBusy(null)
    }
  }

  async function submitDecision(input: { promptId: string; placement: string; decision: Decision; mediaAssetId?: string }) {
    const label = input.decision === 'approve' ? 'Approved for next review step' : input.decision === 'revise' ? 'Revision requested' : 'Rejected'
    setDecisions((current) => ({ ...current, [input.promptId]: { decision: input.decision, status: 'saved', message: `${label} locally...` } }))

    try {
      const response = await fetch('/api/media/eden-image-generator/decision', {
        method: 'POST',
        headers: buildHeaders(),
        body: JSON.stringify(input)
      })
      const payload = await response.json()

      if (!response.ok || !payload.ok) {
        throw new Error(payload.error ?? 'Decision was not saved.')
      }

      const persistence = payload.decisionPersistence?.status === 'updated' ? ' Stored in media_assets.' : ''
      setDecisions((current) => ({ ...current, [input.promptId]: { decision: input.decision, status: 'saved', message: `${label}.${persistence}` } }))
    } catch (error) {
      setDecisions((current) => ({
        ...current,
        [input.promptId]: {
          decision: input.decision,
          status: 'failed',
          message: error instanceof Error ? error.message : 'Decision failed.'
        }
      }))
    }
  }

  function buildHeaders() {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' }
    const token = operatorToken.trim()
    if (token) headers.Authorization = `Bearer ${token}`
    return headers
  }

  function updateSetting<K extends keyof RuntimeSettings>(key: K, value: RuntimeSettings[K]) {
    setSettings((current) => ({ ...current, [key]: value }))
  }

  function applyPreset(preset: 'fast' | 'quality' | 'storage') {
    if (preset === 'fast') {
      setSettings({ quality: 'medium', referenceMode: 'on', referenceCount: 1, maxBatchSize: 1, providerTimeoutMs: 90000, saveMediaAssets: false })
    }
    if (preset === 'quality') {
      setSettings({ quality: 'high', referenceMode: 'on', referenceCount: 1, maxBatchSize: 1, providerTimeoutMs: 180000, saveMediaAssets: false })
    }
    if (preset === 'storage') {
      setSettings({ quality: 'high', referenceMode: 'on', referenceCount: 1, maxBatchSize: 1, providerTimeoutMs: 180000, saveMediaAssets: true })
    }
  }

  const approvedCount = promptQueue.filter((prompt) => decisions[prompt.id]?.decision === 'approve').length
  const generatedCount = Object.values(generatedImages).filter((image) => image.status === 'generated').length
  const storedCount = Object.values(generatedImages).filter((image) => image.persistenceStatus === 'stored').length
  const nextPrompt = promptQueue.find((prompt) => decisions[prompt.id]?.decision !== 'approve') ?? promptQueue[0]
  const generatedByPrompt = new Map(Object.entries(generatedImages))

  return (
    <main className="approvalPage">
      <header className="hero">
        <div>
          <p className="eyebrow">Admin Approval</p>
          <h1>Eden Skye Image Pipeline</h1>
          <p>
            Advanced controls tune each generation run while server secrets remain protected in Vercel.
          </p>
        </div>
        <div className="statusPanel">
          <span>Next prompt</span>
          <strong>{nextPrompt.placement}</strong>
          <small>{approvedCount} approved | {generatedCount} generated | {storedCount} stored</small>
        </div>
      </header>

      <section className="controlBar" aria-label="Image generator controls">
        <div>
          <p className="eyebrow">Pipeline Controls</p>
          <h2>Enterprise image controls</h2>
          <p>Next target: <code>{nextPrompt.id}</code>. Runtime controls apply to validation, generation, and per-card regeneration.</p>
        </div>
        <div className="controlActions">
          <label>
            <span>Admin token</span>
            <input
              type="password"
              value={operatorToken}
              onChange={(event) => setOperatorToken(event.target.value)}
              placeholder="Required in production"
              autoComplete="off"
            />
          </label>
          <button type="button" onClick={() => runPipeline('validate')} disabled={busy !== null}>{busy === 'validate' ? 'Validating...' : 'Validate queue'}</button>
          <button type="button" className="primaryButton" onClick={() => runPipeline('generate', { promptId: nextPrompt.id })} disabled={busy !== null}>{busy === `generate-${nextPrompt.id}` ? 'Generating...' : `Generate next: ${nextPrompt.placement}`}</button>
          <button type="button" onClick={() => runPipeline('generate', { limit: settings.maxBatchSize })} disabled={busy !== null}>{busy === 'generate-batch' ? 'Generating...' : `Generate capped batch (${settings.maxBatchSize})`}</button>
        </div>
      </section>

      <section className="advancedPanel" aria-label="Advanced generator settings">
        <div className="presetRow">
          <button type="button" onClick={() => applyPreset('fast')}>Fast review preset</button>
          <button type="button" onClick={() => applyPreset('quality')}>High quality preset</button>
          <button type="button" onClick={() => applyPreset('storage')}>Storage final preset</button>
        </div>
        <div className="settingsGrid">
          <label>
            <span>Quality</span>
            <select value={settings.quality} onChange={(event) => updateSetting('quality', event.target.value as RuntimeSettings['quality'])}>
              <option value="medium">Medium - faster review</option>
              <option value="high">High - final candidate</option>
              <option value="low">Low - cheap test</option>
              <option value="auto">Auto - provider decides</option>
            </select>
          </label>
          <label>
            <span>Reference mode</span>
            <select value={settings.referenceMode} onChange={(event) => updateSetting('referenceMode', event.target.value as RuntimeSettings['referenceMode'])}>
              <option value="on">On - use Eden source image</option>
              <option value="off">Off - text only</option>
            </select>
          </label>
          <label>
            <span>Reference images</span>
            <input type="number" min={1} max={2} value={settings.referenceCount} onChange={(event) => updateSetting('referenceCount', Number(event.target.value) || 1)} />
          </label>
          <label>
            <span>Max batch size</span>
            <input type="number" min={1} max={8} value={settings.maxBatchSize} onChange={(event) => updateSetting('maxBatchSize', Number(event.target.value) || 1)} />
          </label>
          <label>
            <span>Timeout ms</span>
            <input type="number" min={10000} max={300000} step={10000} value={settings.providerTimeoutMs} onChange={(event) => updateSetting('providerTimeoutMs', Number(event.target.value) || 120000)} />
          </label>
          <label className="toggleLabel">
            <input type="checkbox" checked={settings.saveMediaAssets} onChange={(event) => updateSetting('saveMediaAssets', event.target.checked)} />
            <span>Save generated media to Supabase</span>
          </label>
        </div>
      </section>

      {pipeline && (
        <section className="pipelineStatus" aria-live="polite">
          <strong>{pipeline.ok ? 'Pipeline response ready' : 'Pipeline needs attention'}</strong>
          <span>Mode: {pipeline.mode} | Provider: {pipeline.readiness?.provider ?? 'pending'} | Model: {pipeline.readiness?.model ?? 'pending'} | Quality: {pipeline.readiness?.quality ?? settings.quality}</span>
          {pipeline.error ? <p>{pipeline.error}</p> : null}
          {pipeline.readiness && (
            <span>
              Enabled: {String(pipeline.readiness.enabled)} | API key: {String(pipeline.readiness.apiKeyConfigured)} | Reference images: {String(pipeline.readiness.referenceImageMode)} ({String(pipeline.readiness.referenceImageCount)}) | Storage: {String(pipeline.readiness.persistenceEnabled && pipeline.readiness.storageBucketConfigured)} | Batch cap: {pipeline.readiness.maxBatchSize}
            </span>
          )}
          {pipeline.readiness?.blockers?.length ? <p>{pipeline.readiness.blockers.join(' | ')}</p> : null}
          {pipeline.nextAction ? <p>{pipeline.nextAction}</p> : null}
        </section>
      )}

      <section className="imageGrid" aria-label="Eden Skye approved source images">
        {sourceImages.map((image) => {
          const decision = decisions[image.driveFileId]
          return (
            <article className="imageCard" key={image.driveFileId}>
              <a className="imageFrame" href={driveView(image.driveFileId)} target="_blank" rel="noreferrer">
                <img src={thumbnail(image.driveFileId)} alt={image.title} />
              </a>
              <div className="cardBody">
                <div className="cardTopline">
                  <span className="pill">{image.status}</span>
                  <span className="sourceType">{image.sourceType}</span>
                </div>
                <h2>{image.title}</h2>
                <p className="fileName">{image.fileName}</p>
                <p>{image.usage}</p>
                <dl>
                  <div><dt>Drive ID</dt><dd>{image.driveFileId}</dd></div>
                  <div><dt>Generator state</dt><dd>{image.generatorState}</dd></div>
                </dl>
                {decision ? <p className={decision.status === 'failed' ? 'blockedReason' : 'decisionMessage'}>{decision.message}</p> : null}
                <div className="actions">
                  <button type="button" className="primary" onClick={() => submitDecision({ promptId: image.driveFileId, placement: image.title, decision: 'approve' })}>Approve</button>
                  <button type="button" className="secondary" onClick={() => submitDecision({ promptId: image.driveFileId, placement: image.title, decision: 'revise' })}>Request revision</button>
                  <a className="link" href={driveView(image.driveFileId)} target="_blank" rel="noreferrer">Open in Drive</a>
                </div>
              </div>
            </article>
          )
        })}
      </section>

      <section className="promptSection" aria-label="Website generated image approval queue">
        <div className="sectionHeader">
          <p className="eyebrow">Website Image Queue</p>
          <h2>Draft outputs for approval</h2>
          <p>Each card can be regenerated with the current advanced settings. Approvals are still review-only until final website promotion.</p>
        </div>
        <div className="promptGrid">
          {promptQueue.map((prompt) => {
            const generated = generatedByPrompt.get(prompt.id)
            const decision = decisions[prompt.id]
            const isPromptBusy = busy === `generate-${prompt.id}`
            return (
              <article className="promptCard" key={prompt.id}>
                <div className="generatedFrame">
                  {generated?.imageBase64 ? (
                    <img src={`data:${generated.mimeType ?? 'image/png'};base64,${generated.imageBase64}`} alt={`${prompt.placement} generated draft`} />
                  ) : (
                    <div className="placeholderFrame">
                      <span>{generated?.status === 'blocked' ? 'Blocked' : 'Pending generation'}</span>
                    </div>
                  )}
                </div>
                <div className="cardBody">
                  <div className="cardTopline">
                    <span className="pill">{decision?.decision ?? generated?.status ?? 'queued'}</span>
                    <span className="sourceType">{prompt.assetType}</span>
                  </div>
                  <h3>{prompt.placement}</h3>
                  <p className="fileName">{prompt.id} | {prompt.format}</p>
                  <p>{prompt.objective}</p>
                  {generated?.generationMethod ? <p className="fileName">Method: {generated.generationMethod}</p> : null}
                  {generated?.storagePath ? <p className="fileName">Stored: {generated.storageBucket}/{generated.storagePath}</p> : null}
                  {generated?.mediaAssetId ? <p className="fileName">Media asset: {generated.mediaAssetId}</p> : null}
                  {generated?.persistenceError ? <p className="storageWarning">Storage warning: {generated.persistenceError}</p> : null}
                  {generated?.blockedReason ? <p className="blockedReason">{generated.blockedReason}</p> : null}
                  {decision ? <p className={decision.status === 'failed' ? 'blockedReason' : 'decisionMessage'}>{decision.message}</p> : null}
                  <div className="actions">
                    <button type="button" className="primary" disabled={!generated?.imageBase64} onClick={() => submitDecision({ promptId: prompt.id, placement: prompt.placement, decision: 'approve', mediaAssetId: generated?.mediaAssetId })}>Approve</button>
                    <button type="button" className="secondary" onClick={() => submitDecision({ promptId: prompt.id, placement: prompt.placement, decision: 'revise', mediaAssetId: generated?.mediaAssetId })}>Request revision</button>
                    <button type="button" className="secondary" onClick={() => submitDecision({ promptId: prompt.id, placement: prompt.placement, decision: 'reject', mediaAssetId: generated?.mediaAssetId })}>Reject</button>
                    <button type="button" className="secondary" disabled={busy !== null} onClick={() => runPipeline('generate', { promptId: prompt.id })}>{isPromptBusy ? 'Generating...' : 'Regenerate this'}</button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="referenceSection" aria-label="Reference contact sheets">
        <div className="sectionHeader">
          <p className="eyebrow">Reference Only</p>
          <h2>Roster contact sheets</h2>
          <p>Use these for visual review of the wider image library. They are not automatically approved for the Eden Skye identity lock.</p>
        </div>
        <div className="referenceGrid">
          {reviewSets.map((set) => (
            <article className="referenceCard" key={set.driveFileId}>
              <a href={driveView(set.driveFileId)} target="_blank" rel="noreferrer">
                <img src={thumbnail(set.driveFileId, 700)} alt={set.title} />
              </a>
              <h3>{set.title}</h3>
              <p>{set.note}</p>
            </article>
          ))}
        </div>
      </section>

      <style>{`
        *{box-sizing:border-box}body{margin:0;background:#050507;color:#f7efe5;font-family:Inter,Arial,sans-serif}.approvalPage{min-height:100vh;background:linear-gradient(180deg,#050507,#0b070d 48%,#050507);color:#f7efe5}.hero,.controlBar{display:grid;grid-template-columns:minmax(0,1fr) 380px;gap:32px;align-items:end;width:min(1240px,calc(100% - 40px));margin:0 auto;padding:72px 0 34px;border-bottom:1px solid rgba(255,255,255,.14)}.controlBar{align-items:center;padding:28px 0}.eyebrow{margin:0 0 10px;color:#ff3ba7;text-transform:uppercase;font-size:12px;font-weight:900;letter-spacing:.14em}.hero h1{margin:0;font-size:56px;line-height:.95;text-transform:uppercase;letter-spacing:0;font-weight:1000}.controlBar h2,.sectionHeader h2{margin:0 0 10px;font-size:36px;text-transform:uppercase}.hero p,.sectionHeader p,.cardBody p,.referenceCard p,.controlBar p{color:#d8cfd8;line-height:1.55}.statusPanel,.pipelineStatus,.advancedPanel{border:1px solid rgba(255,59,167,.34);background:rgba(255,255,255,.04);border-radius:8px;padding:20px;box-shadow:0 18px 60px rgba(255,0,122,.08)}.statusPanel span,.statusPanel small,.pipelineStatus span{display:block;color:#b9aeba}.statusPanel strong{display:block;margin:6px 0 8px;font-size:24px}.controlActions{display:grid;gap:10px;justify-items:stretch}.controlActions label,.settingsGrid label{display:grid;gap:6px;color:#b9aeba;font-size:12px;text-transform:uppercase;font-weight:900}.controlActions input,.settingsGrid input,.settingsGrid select{width:100%;min-height:42px;border:1px solid rgba(255,255,255,.22);border-radius:6px;background:#08060a;color:#fff;padding:0 12px}.controlActions button,.presetRow button{border:1px solid rgba(255,59,167,.55);background:transparent;color:#fff;border-radius:6px;min-height:44px;padding:0 16px;font-weight:900;cursor:pointer}.controlActions button:disabled{opacity:.58;cursor:wait}.controlActions .primaryButton{background:#ff007a;border-color:#ff007a}.advancedPanel,.pipelineStatus{width:min(1240px,calc(100% - 40px));margin:20px auto 0}.presetRow{display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px}.settingsGrid{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:14px}.toggleLabel{display:flex!important;align-items:center;gap:10px;align-self:end;min-height:42px;border:1px solid rgba(255,255,255,.16);border-radius:6px;padding:0 12px;background:#08060a}.toggleLabel input{width:auto;min-height:auto}.pipelineStatus strong{display:block;margin-bottom:8px}.imageGrid,.promptGrid{width:min(1240px,calc(100% - 40px));margin:34px auto 0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}.imageCard,.referenceCard,.promptCard{overflow:hidden;border:1px solid rgba(255,255,255,.14);border-radius:8px;background:#0e0b12}.imageFrame,.generatedFrame{display:block;background:#08060a;aspect-ratio:4/5;overflow:hidden}.imageFrame img,.generatedFrame img{width:100%;height:100%;object-fit:cover;display:block}.placeholderFrame{height:100%;display:flex;align-items:center;justify-content:center;color:#b9aeba;text-transform:uppercase;font-weight:900;letter-spacing:.08em;background:linear-gradient(135deg,#09060b,#17101a)}.cardBody{padding:20px}.cardTopline{display:flex;gap:10px;flex-wrap:wrap;align-items:center}.pill,.sourceType{display:inline-flex;border-radius:999px;padding:7px 10px;font-size:11px;text-transform:uppercase;font-weight:900}.pill{background:#ff007a;color:#fff}.sourceType{border:1px solid rgba(255,255,255,.22);color:#d7b56d}.cardBody h2,.cardBody h3{margin:16px 0 6px;font-size:28px;line-height:1.05}.fileName{margin-top:0;color:#b9aeba!important;font-family:monospace;font-size:13px;overflow-wrap:anywhere}dl{display:grid;gap:8px;margin:18px 0;padding:14px;border:1px solid rgba(255,255,255,.1);border-radius:8px;background:rgba(255,255,255,.03)}dl div{display:grid;grid-template-columns:120px minmax(0,1fr);gap:12px}dt{color:#b9aeba;font-size:12px;text-transform:uppercase;font-weight:900}dd{margin:0;overflow-wrap:anywhere}.actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}.actions a,.actions button{display:inline-flex;align-items:center;justify-content:center;min-height:42px;border-radius:6px;padding:0 14px;text-decoration:none;font-weight:900;font:inherit;cursor:pointer}.actions button:disabled{opacity:.45;cursor:not-allowed}.primary{background:#ff007a;color:#fff;border:1px solid #ff007a}.secondary{border:1px solid rgba(255,59,167,.55);color:#fff;background:transparent}.link{color:#d7b56d}.blockedReason{color:#ff9ecb!important}.storageWarning{color:#d7b56d!important}.decisionMessage{color:#7cf4c8!important;font-weight:900}.promptSection,.referenceSection{width:min(1240px,calc(100% - 40px));margin:58px auto 0;padding:34px 0 70px;border-top:1px solid rgba(255,255,255,.14)}.promptGrid{width:100%;grid-template-columns:repeat(4,minmax(0,1fr));margin-top:22px}.promptCard .generatedFrame{aspect-ratio:1/1}.promptCard .cardBody h3{font-size:19px}.referenceGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:22px}.referenceCard img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;background:#08060a}.referenceCard h3{margin:16px 16px 8px;font-size:18px}.referenceCard p{margin:0 16px 18px;font-size:14px}code{color:#d7b56d}@media(max-width:1100px){.settingsGrid{grid-template-columns:repeat(3,minmax(0,1fr))}.promptGrid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:760px){.hero,.controlBar,.imageGrid,.referenceGrid,.promptGrid,.settingsGrid{grid-template-columns:1fr}.hero{padding-top:42px}.hero h1{font-size:40px}}
      `}</style>
    </main>
  )
}
