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
    prompt: 'Use the approved Eden Skye portrait as the exact face and identity reference. Create a realistic editorial website hero photograph, shot on a full-frame camera with natural skin texture, believable hair detail, accurate eyes, real fabric texture, and soft luxury studio lighting. Eden wears understated black premium styling. Background is a real black and graphite studio with very subtle champagne highlights and only a restrained orchid accent. Keep the face close to the source image, adult, human-realistic, calm, confident, premium, no plastic AI look, no fantasy glow, no illustration style, no text, no logos, leave clean negative space on the left for website copy.',
    negativePrompt: 'No cartoon, no CGI, no wax skin, no over-smoothed face, no anime, no fantasy neon halo, no celebrity likeness, no private-person imitation, no minors, no explicit content, no nudity, no readable text, no fake UI, no platform logos, no distorted hands, no extra faces, no low-quality stock-photo look.',
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
    prompt: 'Use the approved Eden Skye portrait as the exact face and identity reference. Create a vertical realistic editorial portrait for a mobile website hero, natural skin texture, believable hair, premium black styling, soft studio light, subtle graphite background, restrained champagne and orchid accents. Keep the face identity close to the source image. Leave calm top and bottom spacing for mobile UI. Make it look like a high-end real fashion photograph, not AI art, no text, no logos.',
    negativePrompt: 'No cartoon, no CGI, no wax skin, no over-smoothed face, no fantasy neon halo, no celebrity likeness, no private-person imitation, no minors, no explicit content, no readable text, no platform logos, no warped anatomy, no extra limbs.',
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
    prompt: 'Use the approved Eden Skye portrait as the exact identity reference. Create a face-forward realistic beauty portrait, natural skin pores, real hair strands, accurate eyes, soft makeup, premium black wardrobe, neutral graphite studio backdrop, subtle warm highlights. Preserve the face shape, eye spacing, hair color, expression family, and adult identity from the source image. The output should look like a real high-end portrait photograph, not an avatar render. No text, no logos.',
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
    prompt: 'Use the approved Eden Skye portrait as the exact face and identity reference. Create a realistic editorial photograph of Eden in a premium AI content studio, standing naturally near a sleek production desk. Screens may show abstract soft light only, no readable UI. Natural skin texture, real hair detail, believable hands, black premium styling, subtle graphite/champagne studio design, restrained orchid accent light. Make it look photographed, not generated, no logos.',
    negativePrompt: 'No readable text, no real software logos, no cartoon, no CGI, no wax skin, no celebrity likeness, no private-person imitation, no explicit content, no minors, no messy clutter, no cheap stock office lighting.',
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
    prompt: 'Use the approved Eden Skye portrait as the exact identity reference. Create a realistic luxury wardrobe photograph with Eden in tasteful black premium fashion styling, natural pose, believable hands, natural skin texture, real fabric and wardrobe detail, black wardrobe rails, champagne metal hardware, soft studio light, subtle orchid accent. Keep identity close to the source image. No text, no logos.',
    negativePrompt: 'No cartoon, no CGI, no wax skin, no explicit wardrobe, no nudity, no minors, no celebrity likeness, no private-person imitation, no readable labels, no brand logos, no distorted clothing or hands.',
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
    prompt: 'Use the approved Eden Skye portrait as the exact face and identity reference. Create a realistic waist-up editorial campaign portrait, natural skin pores, realistic hair, premium black styling, soft studio lighting, subtle graphite background, restrained champagne highlight. Keep the source identity, expression family, and adult face. Make it look like a real fashion campaign photograph, not synthetic art, no text, no logos.',
    negativePrompt: 'No cartoon, no CGI, no wax skin, no celebrity likeness, no private-person imitation, no minors, no explicit content, no readable text, no extra faces, no distorted hands, no plastic skin.',
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
    prompt: 'Use the approved Eden Skye portrait as the exact face and identity reference. Create a realistic clean Open Graph photograph with Eden in a premium black studio, natural skin texture, real hair detail, subtle graphite background, restrained champagne and orchid accents, strong but believable subject presence, safe for social preview cropping, no text, no logos.',
    negativePrompt: 'No cartoon, no CGI, no wax skin, no text, no logos, no celebrity likeness, no private-person imitation, no minors, no explicit content, no distorted face, no clutter.',
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
    'Critical visual standard: photorealistic commercial photography only. Preserve the approved source portrait identity when source images are attached. Output must look like a real person photographed in a real studio, not a render, avatar, illustration, synthetic model, or AI glamour shot.',
    `Placement: ${prompt.placement}`,
    `Format: ${prompt.format}`,
    `Objective: ${prompt.objective}`,
    'Brand palette: black, graphite, warm ivory skin tones, restrained champagne highlights, tiny orchid accent only when useful. Avoid heavy neon dominance.',
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
