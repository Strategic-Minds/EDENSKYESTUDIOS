import { safeJson } from "@/lib/governance";

export const dynamic = "force-dynamic";

export function GET() {
  return safeJson({
    ok: true,
    service: "edenskyestudios",
    runtime: "nextjs-vercel",
    checkedAt: new Date().toISOString()
  });
}
