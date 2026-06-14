import { NextResponse } from 'next/server';
import { previewMetricoolSchedule } from '@/lib/admin/metricool-control-plane';

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
  return NextResponse.json(previewMetricoolSchedule(input), {
    headers: {
      'Cache-Control': 'no-store'
    }
  });
}
