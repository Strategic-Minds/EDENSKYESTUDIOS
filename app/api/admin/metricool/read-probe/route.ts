import { NextResponse } from 'next/server';
import { runMetricoolAdminReadProbe } from '@/lib/admin/metricool-control-plane';

export const dynamic = 'force-dynamic';

export async function POST() {
  const response = await runMetricoolAdminReadProbe();
  return NextResponse.json(response, {
    headers: {
      'Cache-Control': 'no-store'
    }
  });
}
