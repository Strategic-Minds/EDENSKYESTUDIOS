import { NextResponse } from 'next/server';

import { createSupabaseServerClient, hasSupabaseServerConfig, usesServiceRole } from '@/lib/supabase-server';

const IMAGE_MIME_TYPES = new Set(['image/png', 'image/jpeg', 'image/webp', 'image/gif']);
const VIDEO_MIME_TYPES = new Set(['video/mp4', 'video/webm', 'video/quicktime']);

export const runtime = 'nodejs';

export function GET() {
  return NextResponse.json({
    success: true,
    method: 'POST',
    route: '/api/admin/media-assets/upload',
    mode: 'service-role-gated',
    liveMutation: hasSupabaseServerConfig() && usesServiceRole,
    acceptedFields: ['file', 'model_id', 'model_code', 'portfolio_key', 'manifest_slot', 'prompt', 'approval_status', 'usage_scope'],
    buckets: ['eden-images', 'eden-videos', 'eden-generated'],
    blocks: ['missing Supabase service role', 'unsupported file type', 'public bucket writes']
  });
}

export async function POST(request: Request) {
  if (!hasSupabaseServerConfig() || !usesServiceRole) {
    return NextResponse.json(
      { success: false, error: 'Supabase service role is required for site-storage uploads.' },
      { status: 503 }
    );
  }

  const formData = await request.formData();
  const file = formData.get('file');

  if (!(file instanceof File)) {
    return NextResponse.json({ success: false, error: 'Upload requires a file field.' }, { status: 400 });
  }

  const contentType = file.type || 'application/octet-stream';
  const bucket = resolveBucket(contentType);

  if (!bucket) {
    return NextResponse.json(
      { success: false, error: `Unsupported file type: ${contentType}` },
      { status: 415 }
    );
  }

  const modelCode = textField(formData, 'model_code') ?? textField(formData, 'model_id') ?? 'unassigned';
  const portfolioKey = textField(formData, 'portfolio_key') ?? modelCode;
  const manifestSlot = textField(formData, 'manifest_slot') ?? 'unmapped';
  const safeName = safeFilename(file.name || 'eden-upload.bin');
  const storagePath = [portfolioKey, manifestSlot, `${Date.now()}-${crypto.randomUUID()}-${safeName}`]
    .map((part) => slug(part))
    .join('/');

  const supabase = createSupabaseServerClient();
  const bytes = Buffer.from(await file.arrayBuffer());

  const upload = await supabase.storage.from(bucket).upload(storagePath, bytes, {
    contentType,
    upsert: false
  });

  if (upload.error) {
    return NextResponse.json({ success: false, error: upload.error.message }, { status: 400 });
  }

  const assetType = VIDEO_MIME_TYPES.has(contentType) ? 'video' : 'uploaded_image';
  const record = await supabase
    .from('media_assets')
    .insert({
      model_id: textField(formData, 'model_id'),
      model_code: modelCode,
      asset_type: assetType,
      asset_role: textField(formData, 'asset_role') ?? 'admin_upload',
      file_name: safeName,
      drive_file_id: null,
      drive_url: null,
      storage_bucket: bucket,
      storage_path: upload.data.path,
      sha256: null,
      width: numberField(formData, 'width'),
      height: numberField(formData, 'height'),
      source_tool: 'eden-admin-site-storage',
      prompt: textField(formData, 'prompt'),
      status: textField(formData, 'status') ?? 'indexed',
      approval_status: textField(formData, 'approval_status') ?? 'pending',
      usage_scope: textField(formData, 'usage_scope') ?? 'private_source',
      metadata: {
        portfolio_key: portfolioKey,
        manifest_slot: manifestSlot,
        original_filename: file.name,
        content_type: contentType,
        size: file.size,
        approval_color: textField(formData, 'approval_color') ?? 'yellow'
      }
    })
    .select('*')
    .single();

  if (record.error) {
    await supabase.storage.from(bucket).remove([upload.data.path]);
    return NextResponse.json({ success: false, error: record.error.message }, { status: 400 });
  }

  return NextResponse.json(
    {
      success: true,
      data: record.data,
      receipt: {
        storage_bucket: bucket,
        storage_path: upload.data.path,
        file_name: safeName,
        content_type: contentType,
        approval_status: record.data.approval_status,
        usage_scope: record.data.usage_scope
      }
    },
    { status: 201 }
  );
}

function resolveBucket(contentType: string) {
  if (IMAGE_MIME_TYPES.has(contentType)) {
    return 'eden-images';
  }

  if (VIDEO_MIME_TYPES.has(contentType)) {
    return 'eden-videos';
  }

  if (contentType === 'application/json' || contentType === 'text/plain') {
    return 'eden-generated';
  }

  return null;
}

function textField(formData: FormData, key: string) {
  const value = formData.get(key);
  return typeof value === 'string' && value.trim() ? value.trim() : null;
}

function numberField(formData: FormData, key: string) {
  const value = textField(formData, key);
  if (!value) {
    return null;
  }

  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function safeFilename(value: string) {
  const extension = value.includes('.') ? `.${value.split('.').pop()}` : '';
  const basename = value.replace(/\.[^.]+$/, '');
  return `${slug(basename) || 'eden-upload'}${extension.toLowerCase()}`;
}

function slug(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9.]+/g, '-')
    .replace(/(^-|-$)+/g, '')
    .slice(0, 120);
}
