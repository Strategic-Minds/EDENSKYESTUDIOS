import { NextResponse } from 'next/server';
import { getApprovalRequests } from '@/lib/admin-data';
import { createSupabaseServerClient, hasSupabaseServerConfig, usesServiceRole } from '@/lib/supabase-server';

export async function GET() {
  const result = await getApprovalRequests();
  return NextResponse.json(result);
}

export async function POST(request: Request) {
  if (!hasSupabaseServerConfig() || !usesServiceRole) {
    return NextResponse.json(
      { error: 'Supabase service role is required to create approval requests from the admin API.' },
      { status: 503 }
    );
  }

  const body = await request.json();
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('approval_requests')
    .insert({
      request_type: body.request_type,
      target_table: body.target_table,
      target_id: body.target_id ?? null,
      requested_action: body.requested_action,
      risk_level: body.risk_level ?? 'medium',
      status: 'pending',
      requester: body.requester ?? 'Eden Skye',
      notes: body.notes ?? null,
      metadata: body.metadata ?? {}
    })
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data }, { status: 201 });
}
