import { logEdenReceipt } from '@/lib/eden/receipts'
import { createSupabaseServerClient, hasSupabaseServerConfig, usesServiceRole } from '@/lib/supabase-server'

export type EdenImagePrompt = {
  id: string
  persona: 'Eden Skye'
  sourceImageIds: string[]
  assetType:
    | 'identity_lock'
    | 'website_hero'
    | 'portfolio_portrait'
    | 'lifestyle'
    | 'social_vertical'
    | 'social_square'
    | 'background_context'
  placement: string
  format: '16:9' | '9:16' | '1:1' | '4:5' | '3:2'
  objective: string
  prompt: string
  negativePrompt: string
  approvalGate: 'image_review_required'
  status: 'approved_for_draft_generation'
}

export type EdenImageGenerationMode = 'validate' | 'generate'

export type EdenGeneratedImage = {
  promptId: string
  status: 'generated' | 'blocked'
  placement: string
  assetType: EdenImagePrompt['assetType']
  sourceImageIds: string[]
  imageBase64?: string
  mimeType?: string
  revisedPrompt?: string
  storageBucket?: string
  storagePath?: string
  mediaAssetId?: string
  persistenceStatus?: 'stored' | 'skipped' | 'failed'
  persistenceError?: string
  blockedReason?: string
}

export const EDEN_SKYE_SOURCE_IMAGES = [
  {
    fileName: '01-eden-labeled-eden-skye.png',
    driveFileId: '1lmOJBPF0G2wotinP7Q9iDiVqorZI8FQs',
    sourceType: 'labeled_source_portrait',
    approvalStatus: 'approved_for_draft_generation'
  },
  {
    fileName: '01-eden-basic-eden-skye.png',
    driveFileId: '1ndzEOsotXMhwU_XeSb--4ajZtg0nuZg7',
    sourceType: 'basic_source_portrait',
    approvalStatus: 'approved_for_draft_generation'
  }
] as const

const sourceImageIds = EDEN_SKYE_SOURCE_IMAGES.map((image) => image.driveFileId)

export const EDEN_SKYE_WEBSITE_IMAGE_PROMPTS: EdenImagePrompt[] = [
  {
    id: 'eden-web-hero-001',
    persona: 'Eden Skye',
    sourceImageIds,
    assetType: 'website_hero',
    placement: 'homepage hero desktop',
    format: '16:9',
    objective: 'Premium first-viewport brand signal for Eden Skye Studios.',
    prompt: 'Create a cinematic luxury website hero image for Eden Skye Studios using Eden Skye as the identity anchor: original adult synthetic digital model, black studio environment, neon orchid rim light, champagne metallic accents, glossy reflections, premium fashion editorial pose, confident but warm expression, high-end AI avatar modeling agency atmosphere, no text, no logos, website-safe composition with clean negative space on the left for headline copy.',
    negativePrompt: 'No celebrity likeness, no private-person imitation, no minors, no explicit content, no nudity, no readable text, no fake UI, no platform logos, no distorted hands, no extra faces, no low-quality stock-photo look.',
    approvalGate: 'image_review_required',
    status: 'approved_for_draft_generation'
  },
  {
    id: 'eden-web-hero-mobile-001',
    persona: 'Eden Skye',
    sourceImageIds,
    assetType: 'website_hero',
    placement: 'homepage hero mobile crop',
    format: '9:16',
    objective: 'Mobile-first hero image for the Eden Skye homepage.',
    prompt: 'Create a vertical cinematic Eden Skye Studios mobile hero image with Eden Skye centered as an original adult synthetic luxury creator, black studio, neon orchid rim lighting, champagne glow, editorial beauty and fashion styling, clean top and bottom space for mobile UI, high contrast, premium campaign energy, no text and no logos.',
    negativePrompt: 'No celebrity likeness, no private-person imitation, no minors, no explicit content, no readable text, no platform logos, no cheap stock posing, no warped anatomy, no extra limbs.',
    approvalGate: 'image_review_required',
    status: 'approved_for_draft_generation'
  },
  {
    id: 'eden-identity-lock-001',
    persona: 'Eden Skye',
    sourceImageIds,
    assetType: 'identity_lock',
    placement: 'identity lock reference',
    format: '4:5',
    objective: 'Identity-consistent reference image for future website and social assets.',
    prompt: 'Create an identity-lock portrait for Eden Skye as an original adult synthetic AI creator and luxury digital model: face-forward editorial portrait, consistent facial identity, black and graphite glass background, neon orchid edge light, champagne highlights, premium beauty campaign styling, calm confident gaze, no text, no logos, no props competing with the face.',
    negativePrompt: 'No celebrity likeness, no private-person imitation, no childlike features, no explicit content, no readable text, no logo marks, no face morphing, no duplicate faces, no distorted eyes.',
    approvalGate: 'image_review_required',
    status: 'approved_for_draft_generation'
  },
  {
    id: 'eden-studio-control-room-001',
    persona: 'Eden Skye',
    sourceImageIds,
    assetType: 'lifestyle',
    placement: 'AI content studio section',
    format: '16:9',
    objective: 'Show Eden Skye Studios as a premium AI content control room.',
    prompt: 'Create a luxury AI content studio scene with Eden Skye as an original adult synthetic creator standing near a sleek content control console, abstract glowing dashboards without readable text, black glass surfaces, neon orchid and champagne lighting, high-end campaign production mood, editorial composition, no visible brand logos.',
    negativePrompt: 'No readable text, no real software logos, no celebrity likeness, no private-person imitation, no explicit content, no minors, no messy clutter, no cheap stock office lighting.',
    approvalGate: 'image_review_required',
    status: 'approved_for_draft_generation'
  },
  {
    id: 'eden-luxury-closet-001',
    persona: 'Eden Skye',
    sourceImageIds,
    assetType: 'lifestyle',
    placement: 'Eden closet / wardrobe section',
    format: '3:2',
    objective: 'Website section image for fashion, wardrobe, and premium creator styling.',
    prompt: 'Create a premium luxury closet scene for Eden Skye Studios with Eden Skye as an original adult synthetic model in brand-safe fashion styling, black wardrobe rails, champagne metal hardware, neon orchid accent lighting, elegant editorial styling, upscale textures, no text, no logos, website-ready composition.',
    negativePrompt: 'No explicit wardrobe, no nudity, no minors, no celebrity likeness, no private-person imitation, no readable labels, no brand logos, no distorted clothing.',
    approvalGate: 'image_review_required',
    status: 'approved_for_draft_generation'
  },
  {
    id: 'eden-campaign-card-001',
    persona: 'Eden Skye',
    sourceImageIds,
    assetType: 'portfolio_portrait',
    placement: 'model campaign card',
    format: '4:5',
    objective: 'Campaign card image for the Models and Services sections.',
    prompt: 'Create a premium model campaign card for Eden Skye Studios with Eden Skye as an original adult synthetic fashion model, waist-up editorial pose, black studio, neon orchid rim light, champagne highlights, polished luxury beauty campaign look, clean background, no text, no logos.',
    negativePrompt: 'No celebrity likeness, no private-person imitation, no minors, no explicit content, no readable text, no extra faces, no distorted hands, no plastic skin.',
    approvalGate: 'image_review_required',
    status: 'approved_for_draft_generation'
  },
  {
    id: 'eden-black-card-001',
    persona: 'Eden Skye',
    sourceImageIds,
    assetType: 'background_context',
    placement: 'black card / membership visual',
    format: '16:9',
    objective: 'Premium membership section visual without exposing payment or live offer details.',
    prompt: 'Create a dark luxury membership visual for Eden Skye Studios: elegant black card-inspired object on glossy black surface, champagne edge light, neon orchid glow, Eden Skye presence implied through silhouette/reflection only, premium invitation mood, no readable text, no logos, no payment network marks.',
    negativePrompt: 'No readable text, no payment logos, no credit card numbers, no explicit content, no celebrity likeness, no fake legal claims, no clutter.',
    approvalGate: 'image_review_required',
    status: 'approved_for_draft_generation'
  },
  {
    id: 'eden-og-image-001',
    persona: 'Eden Skye',
    sourceImageIds,
    assetType: 'website_hero',
    placement: 'Open Graph / social share image',
    format: '16:9',
    objective: 'Share-preview image for Eden Skye Studios pages.',
    prompt: 'Create a clean Open Graph image for Eden Skye Studios featuring Eden Skye as an original adult synthetic luxury creator in a black studio with neon orchid rim light and champagne accents. Strong central subject, crisp silhouette, premium campaign feel, no text, no logos, safe for social preview cropping.',
    negativePrompt: 'No text, no logos, no celebrity likeness, no private-person imitation, no minors, no explicit content, no distorted face, no clutter.',
    approvalGate: 'image_review_required',
    status: 'approved_for_draft_generation'
  }
]

export async function runEdenImagePipeline(input: {
  mode: EdenImageGenerationMode
  limit?: number
  trigger: 'manual' | 'cron' | 'system'
}) {
  const prompts = EDEN_SKYE_WEBSITE_IMAGE_PROMPTS.slice(0, input.limit ?? EDEN_SKYE_WEBSITE_IMAGE_PROMPTS.length)
  const readiness = getImageGeneratorReadiness(input.mode)
  const generated: EdenGeneratedImage[] = []

  if (input.mode === 'generate' && !readiness.canGenerate) {
    for (const prompt of prompts) {
      generated.push({
        promptId: prompt.id,
        status: 'blocked',
        placement: prompt.placement,
        assetType: prompt.assetType,
        sourceImageIds: prompt.sourceImageIds,
        persistenceStatus: 'skipped',
        blockedReason: readiness.blockers.join('; ')
      })
    }
  } else if (input.mode === 'generate') {
    for (const prompt of prompts) {
      generated.push(await generateWithOpenAI(prompt))
    }
  }

  const result = {
    ok: input.mode === 'validate' || generated.some((item) => item.status === 'generated'),
    system: 'eden-skye-website-image-generator',
    mode: input.mode,
    trigger: input.trigger,
    livePublicationLocked: true,
    publicUseAllowedByDefault: false,
    sourceImages: EDEN_SKYE_SOURCE_IMAGES,
    promptCount: prompts.length,
    prompts,
    readiness,
    generated,
    nextAction:
      input.mode === 'generate'
        ? 'Review generated draft images in the approval UI, then approve, revise, or block.'
        : 'Set EDEN_IMAGE_AUTOGENERATION_ENABLED=true and OPENAI_API_KEY or AI_GATEWAY_API_KEY to allow draft generation.'
  }

  const receipt = await logEdenReceipt({
    eventType: 'eden.image_generator.run',
    action: input.mode === 'generate' ? 'generate_draft_website_images' : 'validate_image_generation_queue',
    status: input.mode === 'generate' && generated.some((item) => item.status === 'generated') ? 'created' : 'dry_run',
    riskLevel: input.mode === 'generate' ? 'yellow' : 'green',
    target: 'eden_skye_website_images',
    details: {
      mode: input.mode,
      trigger: input.trigger,
      promptCount: prompts.length,
      generatedCount: generated.filter((item) => item.status === 'generated').length,
      blockedCount: generated.filter((item) => item.status === 'blocked').length,
      storedCount: generated.filter((item) => item.persistenceStatus === 'stored').length,
      providerBaseUrlConfigured: readiness.providerBaseUrlConfigured,
      persistenceEnabled: readiness.persistenceEnabled,
      storageBucketConfigured: readiness.storageBucketConfigured,
      blockers: readiness.blockers
    }
  })

  return { ...result, receipt }
}

function getImageGeneratorReadiness(mode: EdenImageGenerationMode) {
  const apiKey = process.env.OPENAI_API_KEY || process.env.AI_GATEWAY_API_KEY
  const enabled = process.env.EDEN_IMAGE_AUTOGENERATION_ENABLED === 'true'
  const model = process.env.EDEN_IMAGE_MODEL || 'gpt-image-1'
  const baseUrl = getOpenAIBaseUrl()
  const persistenceEnabled = process.env.EDEN_IMAGE_SAVE_MEDIA_ASSETS === 'true'
  const storageBucket = process.env.EDEN_IMAGE_SUPABASE_BUCKET?.trim()
  const blockers: string[] = []

  if (mode === 'generate') {
    if (!enabled) blockers.push('EDEN_IMAGE_AUTOGENERATION_ENABLED must be true')
    if (!apiKey) blockers.push('OPENAI_API_KEY or AI_GATEWAY_API_KEY is required')
    if (persistenceEnabled && !hasSupabaseServerConfig()) blockers.push('Supabase env vars are required when EDEN_IMAGE_SAVE_MEDIA_ASSETS is true')
    if (persistenceEnabled && !usesServiceRole) blockers.push('SUPABASE_SERVICE_ROLE_KEY is required to store generated draft images')
    if (persistenceEnabled && !storageBucket) blockers.push('EDEN_IMAGE_SUPABASE_BUCKET is required when EDEN_IMAGE_SAVE_MEDIA_ASSETS is true')
  }

  return {
    canGenerate: mode === 'generate' && blockers.length === 0,
    provider: 'openai-images',
    model,
    enabled,
    apiKeyConfigured: Boolean(apiKey),
    providerBaseUrlConfigured: baseUrl !== 'https://api.openai.com/v1',
    persistenceEnabled,
    storageBucketConfigured: Boolean(storageBucket),
    blockers
  }
}

function imageSizeForFormat(format: EdenImagePrompt['format']) {
  if (format === '9:16' || format === '4:5') return '1024x1536'
  if (format === '1:1') return '1024x1024'
  return '1536x1024'
}

function getOpenAIBaseUrl() {
  return (process.env.OPENAI_BASE_URL || process.env.AI_GATEWAY_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')
}

async function generateWithOpenAI(prompt: EdenImagePrompt): Promise<EdenGeneratedImage> {
  const apiKey = process.env.OPENAI_API_KEY || process.env.AI_GATEWAY_API_KEY
  const model = process.env.EDEN_IMAGE_MODEL || 'gpt-image-1'

  if (!apiKey) {
    return blocked(prompt, 'Missing OpenAI API key')
  }

  const response = await fetch(`${getOpenAIBaseUrl()}/images/generations`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      prompt: buildProviderPrompt(prompt),
      size: imageSizeForFormat(prompt.format),
      quality: process.env.EDEN_IMAGE_QUALITY || 'medium',
      output_format: 'png',
      n: 1
    })
  })

  if (!response.ok) {
    const errorText = await response.text()
    return blocked(prompt, `OpenAI image generation failed: ${response.status} ${errorText.slice(0, 300)}`)
  }

  const payload = (await response.json()) as {
    data?: Array<{ b64_json?: string; revised_prompt?: string }>
  }
  const image = payload.data?.[0]

  if (!image?.b64_json) {
    return blocked(prompt, 'OpenAI response did not include b64_json image data')
  }

  const generated: EdenGeneratedImage = {
    promptId: prompt.id,
    status: 'generated',
    placement: prompt.placement,
    assetType: prompt.assetType,
    sourceImageIds: prompt.sourceImageIds,
    imageBase64: image.b64_json,
    mimeType: 'image/png',
    revisedPrompt: image.revised_prompt,
    persistenceStatus: 'skipped'
  }

  return persistGeneratedImage(prompt, generated)
}

async function persistGeneratedImage(prompt: EdenImagePrompt, generated: EdenGeneratedImage): Promise<EdenGeneratedImage> {
  if (process.env.EDEN_IMAGE_SAVE_MEDIA_ASSETS !== 'true') {
    return generated
  }

  const bucket = process.env.EDEN_IMAGE_SUPABASE_BUCKET?.trim()

  if (!bucket || !generated.imageBase64 || !hasSupabaseServerConfig() || !usesServiceRole) {
    return {
      ...generated,
      persistenceStatus: 'failed',
      persistenceError: 'Supabase storage persistence is enabled but storage configuration is incomplete.'
    }
  }

  try {
    const supabase = createSupabaseServerClient()
    const createdAt = new Date().toISOString()
    const slug = createdAt.replace(/[:.]/g, '-').replace('T', '-').replace('Z', '')
    const storagePath = `generated/eden-skye/website/${prompt.id}-${slug}.png`
    const imageBuffer = Buffer.from(generated.imageBase64, 'base64')

    const { error: uploadError } = await supabase.storage
      .from(bucket)
      .upload(storagePath, imageBuffer, {
        contentType: generated.mimeType ?? 'image/png',
        upsert: false
      })

    if (uploadError) throw uploadError

    const { data: mediaAsset, error: insertError } = await supabase
      .from('media_assets')
      .insert({
        model_code: 'eden_skye',
        asset_type: prompt.assetType,
        asset_role: prompt.placement,
        file_name: `${prompt.id}.png`,
        storage_bucket: bucket,
        storage_path: storagePath,
        source_tool: 'eden-skye-website-image-generator',
        prompt: buildProviderPrompt(prompt),
        status: 'generated',
        approval_status: 'pending',
        usage_scope: 'private_test',
        created_at: createdAt
      })
      .select('id')
      .single()

    if (insertError) throw insertError

    return {
      ...generated,
      storageBucket: bucket,
      storagePath,
      mediaAssetId: mediaAsset?.id,
      persistenceStatus: 'stored'
    }
  } catch (error) {
    return {
      ...generated,
      persistenceStatus: 'failed',
      persistenceError: describePersistenceError(error)
    }
  }
}

function blocked(prompt: EdenImagePrompt, blockedReason: string): EdenGeneratedImage {
  return {
    promptId: prompt.id,
    status: 'blocked',
    placement: prompt.placement,
    assetType: prompt.assetType,
    sourceImageIds: prompt.sourceImageIds,
    persistenceStatus: 'skipped',
    blockedReason
  }
}

function buildProviderPrompt(prompt: EdenImagePrompt) {
  return [
    prompt.prompt,
    '',
    `Placement: ${prompt.placement}`,
    `Format: ${prompt.format}`,
    `Objective: ${prompt.objective}`,
    'Identity anchor: use the approved Eden Skye source images as the identity reference in the pipeline metadata. Maintain consistent adult synthetic identity.',
    'Brand palette: eden black, graphite glass, velvet charcoal, neon orchid, hot bloom, champagne, warm ivory, soft smoke.',
    'Governance: draft image only; output requires review before public website use.',
    `Negative prompt: ${prompt.negativePrompt}`
  ].join('\n')
}

function describePersistenceError(error: unknown) {
  if (error instanceof Error) return error.message

  if (error && typeof error === 'object') {
    const maybeMessage = 'message' in error ? error.message : undefined
    const maybeCode = 'code' in error ? error.code : undefined
    const maybeDetails = 'details' in error ? error.details : undefined
    return JSON.stringify({ message: maybeMessage, code: maybeCode, details: maybeDetails })
  }

  return String(error)
}
