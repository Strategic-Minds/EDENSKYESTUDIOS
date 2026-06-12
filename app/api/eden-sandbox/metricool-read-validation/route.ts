import { NextResponse } from 'next/server';
import { getMetricoolReadValidationResponse } from '@/lib/eden-sandbox/metricool-read-validation';

export const dynamic = 'force-dynamic';

export async function GET() {
  const response = await getMetricoolReadValidationResponse();
  return NextResponse.json(response, {
    headers: {
      'Cache-Control': 'no-store'
    }
  });
}
