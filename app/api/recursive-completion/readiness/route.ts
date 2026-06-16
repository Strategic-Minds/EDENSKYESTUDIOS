import { NextResponse } from "next/server"

import { getRecursiveCompletionReadiness } from "@/src/lib/recursive-completion"

export const dynamic = "force-dynamic"

export async function GET() {
  return NextResponse.json(getRecursiveCompletionReadiness())
}
