export const dynamic = "force-dynamic";

const protectedKeywords = [
  "production deploy",
  "promote production",
  "shopify live",
  "payment",
  "supabase schema",
  "drop table",
  "delete from",
  "public social",
  "publish social",
  "send email",
  "create calendar event",
  "external attendee",
  "domain",
  "dns",
  "billing",
  "secret rotation",
  "git reset",
  "merge pull request",
  "release"
];

const draftQueue = [
  { id: "ESADMIN-001", command: "inspect bridge registry", state: "safe_to_queue" },
  { id: "ESADMIN-002", command: "collect admin screenshots", state: "waiting_for_browser_evidence" },
  { id: "ESADMIN-003", command: "prepare preview deployment packet", state: "draft_only" }
];

function isProtected(input: string) {
  const lower = input.toLowerCase();
  return protectedKeywords.some((keyword) => lower.includes(keyword));
}

export async function GET() {
  return Response.json(
    {
      system: "EDEN SKYE ADMIN",
      live_mutations_enabled: false,
      queue: draftQueue
    },
    { headers: { "Cache-Control": "no-store" } }
  );
}

export async function POST(request: Request) {
  const body = await request.json().catch(() => ({}));
  const command = String(body.command || body.action || "");

  if (!command.trim()) {
    return Response.json({ ok: false, state: "rejected", reason: "missing_command" }, { status: 400 });
  }

  if (isProtected(command)) {
    return Response.json(
      {
        ok: false,
        state: "blocked_pending_human_approval",
        live_mutations_enabled: false,
        command,
        approval_required: true,
        receipt: "protected_action_blocked"
      },
      { status: 423, headers: { "Cache-Control": "no-store" } }
    );
  }

  return Response.json(
    {
      ok: true,
      state: "draft_command_queued",
      live_mutations_enabled: false,
      command,
      receipt: "draft_queue_receipt"
    },
    { status: 202, headers: { "Cache-Control": "no-store" } }
  );
}
