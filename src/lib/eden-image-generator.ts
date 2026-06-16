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
  generationMethod?: 'reference_edit' | 'text_generation'
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
    objective: 'Photoreal premium first-viewport brand signal for Eden Skye Studios.',
    prompt: 'Create a new realistic editorial website hero photograph of Eden Skye in a different setting from the source portrait. Use the attached portrait only for facial identity. New output: three-quarter body composition, standing in a premium black and graphite studio, tailored black blazer over elegant black styling, hands relaxed at side or lightly touching a studio table, soft cinematic key light, subtle champagne highlights, very restrained orchid accent, clean negative space on the left for website copy. Real camera photograph, natural skin texture, believable hair, real fabric, confident calm expression, no text, no logos.',
    negativePrompt: 'Do not recreate the source portrait. No beige portrait background, no same front-facing headshot crop, no identical black scoop-neck top, no pearl earrings, no same pose, no same camera angle, no cartoon, no CGI, no wax skin, no over-smoothed face, no fantasy neon halo, no celebrity likeness, no private-person imitation, no minors, no explicit content, no nudity, no readable text, no fake UI, no platform logos, no distorted hands, no extra faces.',
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
    objective: 'Photoreal mobile-first hero image for the Eden Skye homepage.',
    prompt: 'Create a new vertical mobile hero photograph of Eden Skye using the attached portrait only as face identity reference. New output: waist-up editorial composition, turned slightly toward camera, premium black blazer or structured black dress, dark graphite studio background, soft realistic lighting, subtle champagne reflection, tiny orchid accent at edge only, natural skin texture, real hair detail, space above and below for mobile UI. No text, no logos.',
    negativePrompt: 'Do not recreate the source portrait. No beige portrait background, no same front-facing headshot crop, no identical scoop-neck top, no pearl earrings, no same pose, no cartoon, no CGI, no wax skin, no over-smoothed face, no fantasy neon halo, no celebrity likeness, no private-person imitation, no minors, no explicit content, no readable text, no platform logos, no warped anatomy, no extra limbs.',
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
    objective: 'Photoreal identity-consistent reference image for future website and social assets.',
    prompt: 'Create a realistic face-forward identity reference portrait for Eden Skye. This one may stay close to the source face identity, but still improve polish: natural skin pores, real hair strands, accurate eyes, soft makeup, premium black wardrobe, neutral graphite studio backdrop, subtle warm highlights. The output should look like a real high-end portrait photograph, not an avatar render. No text, no logos.',
    negativePrompt: 'No cartoon, no CGI, no wax skin, no childlike features, no explicit content, no readable text, no logo marks, no face morphing, no duplicate faces, no distorted eyes, no plastic skin.',
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
    objective: 'Photoreal premium AI content control room image.',
    prompt: 'Create a new realistic editorial photograph of Eden Skye in a premium AI content studio. Use the source portrait only for her face identity. New output: Eden standing naturally beside a sleek production desk, one hand near the desk, abstract soft light on screens with no readable UI, black premium wardrobe different from the source top, dark graphite/champagne studio design, restrained orchid edge light. Real photographed scene, believable hands, natural skin texture, real hair detail, no logos.',
    negativePrompt: 'Do not recreate the source portrait. No beige portrait background, no same front-facing crop, no identical outfit, no readable text, no real software logos, no cartoon, no CGI, no wax skin, no celebrity likeness, no private-person imitation, no explicit content, no minors, no messy clutter, no cheap stock office lighting.',
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
    objective: 'Photoreal website section image for fashion, wardrobe, and premium creator styling.',
    prompt: 'Create a new realistic luxury wardrobe photograph of Eden Skye. Use the source portrait only for face identity. New output: Eden standing in a black luxury wardrobe room, tasteful tailored black fashion look different from the source top, one hand on a wardrobe rail, champagne metal hardware, soft realistic studio light, subtle orchid accent, natural skin texture, real fabric and wardrobe detail. No text, no logos.',
    negativePrompt: 'Do not recreate the source portrait. No beige portrait background, no same headshot crop, no same outfit, no cartoon, no CGI, no wax skin, no explicit wardrobe, no nudity, no minors, no celebrity likeness, no private-person imitation, no readable labels, no brand logos, no distorted clothing or hands.',
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
    objective: 'Photoreal campaign card image for the Models and Services sections.',
    prompt: 'Create a new realistic waist-up editorial campaign portrait of Eden Skye using the source portrait only for face identity. New output: different pose, slightly angled shoulders, premium black blazer or structured fashion top, graphite studio background, soft fashion lighting, natural skin pores, realistic hair, restrained champagne highlight. Make it look like a real fashion campaign photograph, no text, no logos.',
    negativePrompt: 'Do not recreate the source portrait. No beige portrait background, no same front-facing crop, no identical scoop-neck top, no pearl earrings, no cartoon, no CGI, no wax skin, no celebrity likeness, no private-person imitation, no minors, no explicit content, no readable text, no extra faces, no distorted hands, no plastic skin.',
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
    prompt: 'Create a photoreal dark luxury membership still life: a blank matte black invitation card on glossy black stone, subtle champagne edge light, soft orchid reflection, no visible person, no readable text, no payment network marks. Realistic product photography, clean composition, premium but restrained.',
    negativePrompt: 'No readable text, no payment logos, no credit card numbers, no explicit content, no celebrity likeness, no fake legal claims, no clutter, no cartoon, no CGI glow overload.',
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
    objective: 'Photoreal share-preview image for Eden Skye Studios pages.',
    prompt: 'Create a new realistic Open Graph photograph of Eden Skye using the source portrait only for face identity. New output: Eden in a premium black studio, half-body composition, different pose and wardrobe from the source, graphite background, restrained champagne and orchid accents, realistic camera depth, natural skin texture, real hair detail, safe for social preview cropping, no text, no logos.',
    negativePrompt: 'Do not recreate the source portrait. No beige portrait background, no same headshot crop, no identical outfit, no cartoon, no CGI, no wax skin, no text, no logos, no celebrity likeness, no private-person imitation, no minors, no explicit content, no distorted face, no clutter.',
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
        : 'Validate confirms env and queue readiness. Generate one draft first, then review before scaling.'
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
      referenceImageMode: readiness.referenceImageMode,
      persistenceEnabled: readiness.persistenceEnabled,
      storageBucketConfigured: readiness.storageBucketConfigured,
      blockers: readiness.blockers
    }
  })

  return { ...result, receipt }
}

function getImageGeneratorReadiness(mode: EdenImageGenerationMode) {
  const provider = getImageProvider()
  const enabled = process.env.EDEN_IMAGE_AUTOGENERATION_ENABLED === 'true'
  const model = process.env.EDEN_IMAGE_MODEL || 'gpt-image-2'
  const persistenceEnabled = process.env.EDEN_IMAGE_SAVE_MEDIA_ASSETS === 'true'
  const storageBucket = process.env.EDEN_IMAGE_SUPABASE_BUCKET?.trim()
  const referenceImageMode = process.env.EDEN_IMAGE_REFERENCE_MODE !== 'off'
  const blockers: string[] = []

  if (mode === 'generate') {
    if (!enabled) blockers.push('EDEN_IMAGE_AUTOGENERATION_ENABLED must be true')
    if (!provider.apiKey) blockers.push('OPENAI_API_KEY or AI_GATEWAY_API_KEY is required')
    if (persistenceEnabled && !hasSupabaseServerConfig()) blockers.push('Supabase env vars are required when EDEN_IMAGE_SAVE_MEDIA_ASSETS is true')
    if (persistenceEnabled && !usesServiceRole) blockers.push('SUPABASE_SERVICE_ROLE_KEY is required to store generated draft images')
    if (persistenceEnabled && !storageBucket) blockers.push('EDEN_IMAGE_SUPABASE_BUCKET is required when EDEN_IMAGE_SAVE_MEDIA_ASSETS is true')
  }

  return {
    canGenerate: mode === 'generate' && blockers.length === 0,
    provider: provider.name,
    model,
    enabled,
    apiKeyConfigured: Boolean(provider.apiKey),
    providerBaseUrlConfigured: provider.baseUrl !== 'https://api.openai.com/v1',
    referenceImageMode,
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

function getImageProvider() {
  const requestedProvider = process.env.EDEN_IMAGE_PROVIDER?.trim().toLowerCase()
  const gatewayKey = process.env.AI_GATEWAY_API_KEY?.trim()
  const gatewayBaseUrl = process.env.AI_GATEWAY_BASE_URL?.trim()
  const openAiKey = process.env.OPENAI_API_KEY?.trim()

  if (requestedProvider === 'openai') {
    return { name: 'openai-images', apiKey: openAiKey, baseUrl: getOpenAIBaseUrl('openai') }
  }

  if (requestedProvider === 'ai_gateway') {
    return { name: 'vercel-ai-gateway-images', apiKey: gatewayKey, baseUrl: getOpenAIBaseUrl('ai_gateway') }
  }

  if (gatewayKey && gatewayBaseUrl) {
    return { name: 'vercel-ai-gateway-images', apiKey: gatewayKey, baseUrl: getOpenAIBaseUrl('ai_gateway') }
  }

  return { name: 'openai-images', apiKey: openAiKey, baseUrl: getOpenAIBaseUrl('openai') }
}

function getOpenAIBaseUrl(provider: 'openai' | 'ai_gateway') {
  if (provider === 'ai_gateway') {
    return (process.env.AI_GATEWAY_BASE_URL || 'https://ai-gateway.vercel.sh/v1').replace(/\/$/, '')
  }

  return (process.env.OPENAI_BASE_URL || 'https://api.openai.com/v1').replace(/\/$/, '')
}

async function generateWithOpenAI(prompt: EdenImagePrompt): Promise<EdenGeneratedImage> {
  const provider = getImageProvider()
  const model = process.env.EDEN_IMAGE_MODEL || 'gpt-image-2'

  if (!provider.apiKey) {
    return blocked(prompt, 'Missing image provider API key')
  }

  const useReferences = process.env.EDEN_IMAGE_REFERENCE_MODE !== 'off' && prompt.assetType !== 'background_context'
  const generated = useReferences
    ? await generateReferenceEdit(prompt, provider, model)
    : await generateTextImage(prompt, provider, model)

  if (generated.status === 'blocked') return generated

  return persistGeneratedImage(prompt, generated)
}

async function generateReferenceEdit(
  prompt: EdenImagePrompt,
  provider: { apiKey?: string; baseUrl: string; name: string },
  model: string
): Promise<EdenGeneratedImage> {
  try {
    const formData = new FormData()
    formData.set('model', model)
    formData.set('prompt', buildProviderPrompt(prompt))
    formData.set('size', imageSizeForFormat(prompt.format))
    formData.set('quality', process.env.EDEN_IMAGE_QUALITY || 'high')
    formData.set('output_format', 'png')
    formData.set('n', '1')

    const referenceImages = await fetchReferenceImageBlobs(prompt.sourceImageIds.slice(0, 2))
    for (const image of referenceImages) {
      formData.append('image[]', image.blob, image.fileName)
    }

    if (referenceImages.length === 0) {
      return blocked(prompt, 'No reference images could be loaded from Drive thumbnails.')
    }

    const response = await fetch(`${provider.baseUrl}/images/edits`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${provider.apiKey}` },
      body: formData
    })

    return handleImageProviderResponse(response, prompt, 'reference_edit')
  } catch (error) {
    return blocked(prompt, `Reference-image generation failed: ${describePersistenceError(error)}`)
  }
}

async function generateTextImage(
  prompt: EdenImagePrompt,
  provider: { apiKey?: string; baseUrl: string; name: string },
  model: string
): Promise<EdenGeneratedImage> {
  const response = await fetch(`${provider.baseUrl}/images/generations`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${provider.apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model,
      prompt: buildProviderPrompt(prompt),
      size: imageSizeForFormat(prompt.format),
      quality: process.env.EDEN_IMAGE_QUALITY || 'high',
      output_format: 'png',
      n: 1
    })
  })

  return handleImageProviderResponse(response, prompt, 'text_generation')
}

async function handleImageProviderResponse(
  response: Response,
  prompt: EdenImagePrompt,
  generationMethod: 'reference_edit' | 'text_generation'
): Promise<EdenGeneratedImage> {
  if (!response.ok) {
    const errorText = await response.text()
    return blocked(prompt, `Image generation failed: ${response.status} ${errorText.slice(0, 300)}`)
  }

  const payload = (await response.json()) as {
    data?: Array<{ b64_json?: string; revised_prompt?: string }>
  }
  const image = payload.data?.[0]

  if (!image?.b64_json) {
    return blocked(prompt, 'Image provider response did not include b64_json image data')
  }

  return {
    promptId: prompt.id,
    status: 'generated',
    placement: prompt.placement,
    assetType: prompt.assetType,
    sourceImageIds: prompt.sourceImageIds,
    imageBase64: image.b64_json,
    mimeType: 'image/png',
    revisedPrompt: image.revised_prompt,
    persistenceStatus: 'skipped',
    generationMethod
  }
}

async function fetchReferenceImageBlobs(fileIds: string[]) {
  const images: Array<{ blob: Blob; fileName: string }> = []

  for (const fileId of fileIds) {
    const response = await fetch(`https://drive.google.com/thumbnail?id=${fileId}&sz=w1536`)
    if (!response.ok) continue

    const arrayBuffer = await response.arrayBuffer()
    const contentType = response.headers.get('content-type') || 'image/png'
    images.push({
      blob: new Blob([arrayBuffer], { type: contentType }),
      fileName: `${fileId}.png`
    })
  }

  return images
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
    referenceVariationInstruction(prompt),
    'Critical visual standard: photorealistic commercial photography only. Output must look like a real person photographed in a real studio, not a render, avatar, illustration, synthetic model, or AI glamour shot.',
    `Placement: ${prompt.placement}`,
    `Format: ${prompt.format}`,
    `Objective: ${prompt.objective}`,
    'Brand palette: black, graphite, warm ivory skin tones, restrained champagne highlights, tiny orchid accent only when useful. Avoid heavy neon dominance.',
    'Governance: draft image only; output requires review before public website use.',
    `Negative prompt: ${prompt.negativePrompt}`
  ].join('\n')
}

function referenceVariationInstruction(prompt: EdenImagePrompt) {
  if (prompt.assetType === 'identity_lock') {
    return 'Reference handling: for this identity-lock prompt, preserve face identity closely while still producing a polished new portrait.'
  }

  if (prompt.assetType === 'background_context') {
    return 'Reference handling: no person is needed for this still-life prompt.'
  }

  return 'Reference handling: the attached source portrait is NOT the desired output. Use it only to identify Eden Skye face identity. Create a new photograph with different pose, different crop, different wardrobe, different background, and different lighting. Do not copy the source portrait composition, beige background, scoop-neck top, pearl earrings, front-facing headshot crop, or original camera angle.'
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
