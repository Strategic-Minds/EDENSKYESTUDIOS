export const runtime = 'nodejs';

type ImageGenerationBody = {
  prompt?: string;
  size?: string;
  model?: string;
};

function getImageConfig() {
  return {
    endpoint: 'https://ai-gateway.vercel.sh/v1/images/generations',
    model: process.env.EDEN_IMAGE_MODEL || 'openai/gpt-image-2',
    token: process.env.AI_GATEWAY_API_KEY || process.env.VERCEL_OIDC_TOKEN
  };
}

async function readJsonSafely(response: Response) {
  const text = await response.text();
  if (!text) return {};
  try {
    return JSON.parse(text);
  } catch {
    return { raw: text.slice(0, 900) };
  }
}

function extractGatewayError(result: any) {
  if (typeof result?.error === 'string') return result.error;
  if (typeof result?.error?.message === 'string') return result.error.message;
  if (typeof result?.message === 'string') return result.message;
  if (typeof result?.raw === 'string') return result.raw;
  return JSON.stringify(result).slice(0, 900);
}

function normalizeSize(size: unknown) {
  if (typeof size !== 'string') return '1024x1024';
  if (/^\d{3,4}x\d{3,4}$/.test(size)) return size;
  return '1024x1024';
}

export async function GET() {
  const { endpoint, model, token } = getImageConfig();

  return Response.json({
    status: token ? 'ready' : 'missing_gateway_credentials',
    route: '/api/eden/source-images/generate-image',
    gateway: 'vercel-ai-gateway',
    endpoint,
    model,
    accepts: ['POST application/json'],
    supports: ['text_to_image'],
    returns: ['imageDataUrl', 'imageUrl', 'diagnostic'],
    storesGeneratedBinaries: false,
    approvalRequiredForDriveWrite: true,
    requiredEnvironment: ['AI_GATEWAY_API_KEY or VERCEL_OIDC_TOKEN'],
    optionalEnvironment: ['EDEN_IMAGE_MODEL']
  });
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ImageGenerationBody;
    const prompt = typeof body.prompt === 'string' ? body.prompt.trim().slice(0, 4000) : '';
    const { endpoint, model: defaultModel, token } = getImageConfig();
    const model = typeof body.model === 'string' && body.model.trim() ? body.model.trim() : defaultModel;
    const size = normalizeSize(body.size);

    if (!prompt) {
      return Response.json({ error: 'Image prompt is required.' }, { status: 400 });
    }

    if (!token) {
      return Response.json(
        {
          error: 'AI Gateway image generation is not configured for this deployment.',
          diagnostic: 'Set AI_GATEWAY_API_KEY or enable Vercel AI Gateway OIDC for this project.',
          model
        },
        { status: 503 }
      );
    }

    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model,
        prompt,
        n: 1,
        size,
        response_format: 'b64_json'
      })
    });

    const result = await readJsonSafely(response);

    if (!response.ok) {
      return Response.json(
        {
          error: 'Image generation failed.',
          diagnostic: extractGatewayError(result),
          model,
          status: response.status
        },
        { status: response.status || 502 }
      );
    }

    const firstImage = result?.data?.[0];
    const base64 = firstImage?.b64_json || firstImage?.b64;
    const imageUrl = firstImage?.url;

    if (!base64 && !imageUrl) {
      return Response.json(
        {
          error: 'Image generation returned no usable image payload.',
          diagnostic: JSON.stringify(result).slice(0, 900),
          model
        },
        { status: 502 }
      );
    }

    return Response.json({
      status: 'ready',
      prompt,
      model,
      size,
      imageDataUrl: base64 ? `data:image/png;base64,${base64}` : undefined,
      imageUrl,
      approvalRequiredForDriveWrite: true,
      storedInDrive: false
    });
  } catch (error) {
    return Response.json(
      {
        error: 'Image generation route failed.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}
