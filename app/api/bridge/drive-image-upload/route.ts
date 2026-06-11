import { NextRequest, NextResponse } from 'next/server';
import { uploadImageToDrive } from '@/lib/eden/drive-upload';
import { createSupabaseServerClient, hasSupabaseServerConfig } from '@/lib/supabase-server';

export const dynamic = 'force-dynamic';

type UploadBody = {
  assetId?: string;
  modelId?: string;
  modelName?: string;
  shotNumber?: number;
  shotName?: string;
  filename?: string;
  mimeType?: string;
  base64Data?: string;
  targetFolderId?: string;
  approvalStatus?: string;
  qaStatus?: string;
  usageBoundary?: string;
  publicUseAllowed?: boolean;
};

export async function GET() {
  return NextResponse.json({
    name: 'Drive Image Upload Bridge',
    status: 'executor_preview_installed',
    mode: 'private_studio_assets',
    requiredFields: ['assetId', 'filename', 'mimeType', 'base64Data', 'approvalStatus'],
    acceptedMimeTypes: ['image/png', 'image/jpeg', 'image/webp']
  });
}

export async function POST(request: NextRequest) {
  const body = (await request.json().catch(() => ({}))) as UploadBody;

  if (body.approvalStatus !== 'approved_locked') {
    return NextResponse.json({ status: 'blocked', reason: 'approvalStatus must be approved_locked' }, { status: 423 });
  }

  if (!body.assetId || !body.filename || !body.mimeType || !body.base64Data) {
    return NextResponse.json({ status: 'failed', reason: 'Missing assetId, filename, mimeType, or base64Data' }, { status: 400 });
  }

  if (!['image/png', 'image/jpeg', 'image/webp'].includes(body.mimeType)) {
    return NextResponse.json({ status: 'failed', reason: 'Unsupported image MIME type' }, { status: 400 });
  }

  try {
    const driveFile = await uploadImageToDrive({
      filename: body.filename,
      mimeType: body.mimeType,
      base64Data: body.base64Data,
      targetFolderId: body.targetFolderId
    });

    const metadata = {
      asset_id: body.assetId,
      model_id: body.modelId,
      model_name: body.modelName,
      shot_number: body.shotNumber,
      shot_name: body.shotName,
      filename: body.filename,
      qa_status: body.qaStatus,
      approval_status: body.approvalStatus,
      usage_boundary: body.usageBoundary ?? 'private_studio_only',
      public_use_allowed: body.publicUseAllowed === true,
      drive_file: driveFile
    };

    let supabaseResult: Record<string, unknown> = { source: 'dry_run', reason: 'Supabase server config unavailable' };

    if (hasSupabaseServerConfig()) {
      const supabase = createSupabaseServerClient();
      const storageUrl = driveFile.webViewLink ?? driveFile.webContentLink ?? driveFile.id;
      const receiptId = `drive-upload-${body.assetId}-${Date.now()}`;

      const media = await supabase.from('media_assets').insert({
        asset_type: 'image',
        title: `${body.assetId} ${body.shotName ?? body.filename}`,
        storage_url: storageUrl,
        source_tool: 'drive-image-upload-bridge',
        usage_rights: body.usageBoundary ?? 'private_studio_only',
        metadata
      }).select('id').single();

      const log = await supabase.from('ai_execution_logs').insert({
        event: 'drive_upload',
        status: media.error ? 'warning' : 'success',
        action: 'upload_es001_asset',
        details: { asset_id: body.assetId, media_asset_id: media.data?.id ?? null, media_error: media.error?.message ?? null, metadata }
      }).select('id').single();

      const receipt = await supabase.from('eden_tool_receipts').insert({
        receipt_id: receiptId,
        tool_name: 'drive-image-upload',
        action_type: 'upload',
        status: media.error ? 'warning' : 'success',
        payload: { asset_id: body.assetId, media_asset_id: media.data?.id ?? null, execution_log_id: log.data?.id ?? null, metadata }
      }).select('id').single();

      supabaseResult = {
        source: 'supabase',
        media_asset_id: media.data?.id ?? null,
        execution_log_id: log.data?.id ?? null,
        receipt_id: receipt.data?.id ?? null,
        errors: { media: media.error?.message ?? null, log: log.error?.message ?? null, receipt: receipt.error?.message ?? null }
      };
    }

    return NextResponse.json({ status: 'uploaded', driveFile, supabase: supabaseResult });
  } catch (error) {
    return NextResponse.json({ status: 'failed', reason: error instanceof Error ? error.message : 'Unknown upload error' }, { status: 500 });
  }
}
