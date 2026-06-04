import { NextResponse } from 'next/server';
import type { ApprovalDecision } from '@/lib/contracts';
import { createSupabaseServerClient, hasSupabaseServerConfig, usesServiceRole } from '@/lib/supabase-server';

const decisionToStatus: Record<ApprovalDecision, 'approved' | 'rejected' | 'pending'> = {
  approve: 'approved',
  reject: 'rejected',
  needs_revision: 'pending'
};

export async function POST(request: Request, context: { params: Promise<{ id: string }> }) {
  if (!hasSupabaseServerConfig() || !usesServiceRole) {
    return NextResponse.json(
      { error: 'Supabase service role is required to decide approval requests.' },
      { status: 503 }
    );
  }

  const { id } = await context.params;
  const body = await request.json();
  const decision = body.decision as ApprovalDecision;

  if (!['approve', 'reject', 'needs_revision'].includes(decision)) {
    return NextResponse.json({ error: 'Invalid decision.' }, { status: 400 });
  }

  const status = decisionToStatus[decision];
  const now = new Date().toISOString();
  const supabase = createSupabaseServerClient();

  const { data, error } = await supabase
    .from('approval_requests')
    .update({
      status,
      approver: body.approver ?? 'Eden Skye Admin',
      approved_at: decision === 'approve' ? now : null,
      rejected_at: decision === 'reject' ? now : null,
      decision_notes: body.decision_notes ?? null
    })
    .eq('id', id)
    .select('*')
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ data });
}
