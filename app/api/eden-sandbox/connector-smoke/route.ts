import { NextResponse } from 'next/server';
import { getConnectorSmokeResponse } from '@/lib/eden-sandbox/connector-smoke';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(getConnectorSmokeResponse(), {
    headers: {
      'Cache-Control': 'no-store'
    }
  });
}
