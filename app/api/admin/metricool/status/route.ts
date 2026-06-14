import { NextResponse } from 'next/server';
import { getMetricoolAdminStatusResponse } from '@/lib/admin/metricool-control-plane';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(getMetricoolAdminStatusResponse(), {
    headers: {
      'Cache-Control': 'no-store'
    }
  });
}
