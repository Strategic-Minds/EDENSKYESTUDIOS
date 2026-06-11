import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    name: 'Drive Image Upload Bridge',
    status: 'installed_stub',
    mode: 'private_studio_assets',
    purpose: 'Accept approved Eden Skye source images and install them into the canonical Drive image library.',
    nextStep: 'Wire POST execution to lib/eden/drive-upload.ts after preview validation.'
  });
}

export async function POST() {
  return NextResponse.json(
    {
      status: 'queued_not_executed',
      reason: 'Runtime upload execution is intentionally held behind preview validation.',
      nextStep: 'Use the image-generation-install bridge packet or approved executor path.'
    },
    { status: 202 }
  );
}
