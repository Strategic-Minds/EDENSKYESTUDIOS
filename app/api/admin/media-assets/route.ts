import { NextResponse } from 'next/server';
import { getMediaAssets } from '@/lib/admin-data';
import { createSupabaseServerClient, hasSupabaseServerConfig, usesServiceRole } from '@/lib/supabase-server';

export async function GET() {
  const result = await getMediaAssets();
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  if (!hasSupabaseServerConfig() || !usesServiceRole) {
    return NextResponse.json(
      { error: 'Supabase service role is required to create media assets from the admin API.' },
      { status: 503 }
    );
  }

  const body = await request.json();
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('media_assets')
    .insert({
      model_id: body.model_id ?? null,
      model_code: body.model_code ?? null,
      asset_type: body.asset_type,
      asset_role: body.asset_role,
      file_name: body.file_name,
      drive_file_id: body.drive_file_id ?? null,
      drive_url: body.drive_url ?? null,
      storage_bucket: body.storage_bucket ?? null,
      storage_path: body.storage_path ?? null,
      sha256: body.sha256 ?? null,
      width: body.width ?? null,
      height: body.height ?? null,
      source_tool: body.source_tool ?? 'manual',
      prompt: body.prompt ?? null,
      status: body.status ?? 'indexed',
      approval_status: body.approval_status ?? 'pending',
      usage_scope: body.usage_scope ?? 'private_source',
      metadata: body.metadata ?? {}
    })
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
