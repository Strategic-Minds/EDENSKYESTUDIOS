import { NextResponse } from 'next/server';
import { scheduleApprovedMetricoolPost } from '@/lib/admin/metricool-control-plane';

export const dynamic = 'force-dynamic';

async function readJson(request: Request) {
  try {
    return await request.json();
  } catch {
    return {};
  }
}

export async function POST(request: Request) {
  const input = await readJson(request);
  const response = await scheduleApprovedMetricoolPost(input);
  const status = response.status === 'single_test_schedule_submitted' ? 200 : 423;

  return NextResponse.json(response, {
    status,
    headers: {
      'Cache-Control': 'no-store'
    }
  });
}
