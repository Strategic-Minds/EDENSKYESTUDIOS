type ReceiptInput = {
  receipt_id: string;
  tool_name: string;
  action_type: string;
  status: string;
  payload: Record<string, unknown>;
};

type PersistResult = {
  persisted: boolean;
  status: "stored" | "skipped" | "failed";
  reason?: string;
};

function supabaseConfig() {
  const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SECRET_KEY;
  return { url, key };
}

export function receiptPersistenceConfigured() {
  const { url, key } = supabaseConfig();
  return Boolean(url && key);
}

export async function persistToolReceipt(receipt: ReceiptInput): Promise<PersistResult> {
  const { url, key } = supabaseConfig();

  if (!url || !key) {
    return {
      persisted: false,
      status: "skipped",
      reason: "SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required for persistent receipt storage."
    };
  }

  const endpoint = `${url.replace(/\/$/, "")}/rest/v1/eden_tool_receipts`;
  const response = await fetch(endpoint, {
    method: "POST",
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
      Prefer: "resolution=merge-duplicates,return=minimal"
    },
    body: JSON.stringify(receipt)
  });

  if (!response.ok) {
    return {
      persisted: false,
      status: "failed",
      reason: `Supabase receipt insert failed with ${response.status}: ${await response.text()}`
    };
  }

  return { persisted: true, status: "stored" };
}
