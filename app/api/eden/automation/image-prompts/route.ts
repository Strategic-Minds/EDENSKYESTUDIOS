import { NextResponse } from 'next/server';

import { buildBatch, capability } from '../_lib/batch';

const KIND = 'image-prompts' as const;

export function GET() {
  return NextResponse.json(capability(KIND));
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json(buildBatch(KIND, body));
}
