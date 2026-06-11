import { NextResponse } from 'next/server';

export async function GET(_request, { params }) {
  return NextResponse.json({
    request_id: params.request_id,
    status: 'dry_run_only',
    message: 'Step 35 preview branch does not persist install jobs or mutate Drive/Supabase.'
  });
}
