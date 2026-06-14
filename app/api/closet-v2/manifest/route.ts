import manifest from "../../../../config/eden-closet-v2-ultralifelike-pwa.json";

export const dynamic = "force-static";

export async function GET() {
  return Response.json({
    ok: true,
    generatedAt: new Date().toISOString(),
    manifest
  });
}
