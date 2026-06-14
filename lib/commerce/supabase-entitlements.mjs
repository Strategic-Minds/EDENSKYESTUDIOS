import { createClient } from "@supabase/supabase-js";

export const EDEN_SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://prhppuuwcnmfdhwsagug.supabase.co";
export const EDEN_SUPABASE_PUBLISHABLE_KEY =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY ||
  "sb_publishable_kGj9PTt1biObaT6q1uOTHw_nEJI1Rov";

const ENTITLEMENT = "black_card_member";

export function getSupabaseRuntimeStatus() {
  return {
    urlConfigured: Boolean(EDEN_SUPABASE_URL),
    publishableKeyConfigured: Boolean(EDEN_SUPABASE_PUBLISHABLE_KEY),
    serviceRoleConfigured: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
    projectRef: "prhppuuwcnmfdhwsagug"
  };
}

function createPublicClient(accessToken) {
  return createClient(EDEN_SUPABASE_URL, EDEN_SUPABASE_PUBLISHABLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
    global: accessToken ? { headers: { Authorization: `Bearer ${accessToken}` } } : undefined
  });
}

function createServiceClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) return null;
  return createClient(EDEN_SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY, {
    auth: { persistSession: false, autoRefreshToken: false }
  });
}

export function extractBearerToken(authorization) {
  if (!authorization || typeof authorization !== "string") return null;
  const match = authorization.match(/^Bearer\s+(.+)$/i);
  return match?.[1]?.trim() || null;
}

async function findActiveEntitlement(client, user) {
  if (user?.id) {
    const byUser = await client
      .from("eden_black_card_entitlements")
      .select("id,user_id,email,entitlement,status,valid_until,source,shopify_order_id,created_at")
      .eq("user_id", user.id)
      .eq("entitlement", ENTITLEMENT)
      .eq("status", "active")
      .maybeSingle();
    if (byUser.data) return byUser.data;
  }

  if (user?.email) {
    const byEmail = await client
      .from("eden_black_card_entitlements")
      .select("id,user_id,email,entitlement,status,valid_until,source,shopify_order_id,created_at")
      .ilike("email", user.email)
      .eq("entitlement", ENTITLEMENT)
      .eq("status", "active")
      .maybeSingle();
    if (byEmail.data) return byEmail.data;
  }

  return null;
}

export async function getBlackCardAccess(authorization) {
  const token = extractBearerToken(authorization);
  const runtime = getSupabaseRuntimeStatus();

  if (!token) {
    return {
      authenticated: false,
      entitled: false,
      entitlement: ENTITLEMENT,
      state: "login_required",
      runtime
    };
  }

  const client = createPublicClient(token);
  const { data, error } = await client.auth.getUser(token);
  const user = data?.user;

  if (error || !user) {
    return {
      authenticated: false,
      entitled: false,
      entitlement: ENTITLEMENT,
      state: "invalid_session",
      runtime,
      error: error?.message || "No user returned"
    };
  }

  const entitlement = await findActiveEntitlement(client, user);
  return {
    authenticated: true,
    entitled: Boolean(entitlement),
    entitlement: ENTITLEMENT,
    state: entitlement ? "active" : "payment_required",
    user: { id: user.id, email: user.email },
    entitlementRecord: entitlement,
    runtime
  };
}

export function extractShopifyCustomer(payload = {}) {
  const customer = payload.customer && typeof payload.customer === "object" ? payload.customer : {};
  return {
    email:
      payload.email ||
      payload.contact_email ||
      payload.customer_email ||
      customer.email ||
      payload?.billing_address?.email ||
      null,
    shopifyCustomerId: String(customer.id || payload.customer_id || "") || null,
    shopifyOrderId: String(payload.admin_graphql_api_id || payload.id || payload.order_id || payload.name || "") || null
  };
}

export async function persistBlackCardEntitlement({ event, payload, decision }) {
  const client = createServiceClient();
  const runtime = getSupabaseRuntimeStatus();
  const customer = extractShopifyCustomer(payload);

  if (!client) {
    return {
      persisted: false,
      reason: "missing_SUPABASE_SERVICE_ROLE_KEY",
      runtime,
      customer
    };
  }

  await client.from("eden_payment_handoffs").insert({
    provider: "shopify",
    event,
    email: customer.email,
    entitlement: ENTITLEMENT,
    status: decision.state,
    payload
  });

  if (!customer.email) {
    return { persisted: false, reason: "missing_customer_email", runtime, customer };
  }

  if (decision.state === "granted") {
    const existing = await client
      .from("eden_black_card_entitlements")
      .select("id")
      .ilike("email", customer.email)
      .eq("entitlement", ENTITLEMENT)
      .eq("status", "active")
      .maybeSingle();

    if (existing.data?.id) {
      const updated = await client
        .from("eden_black_card_entitlements")
        .update({
          source: "shopify",
          shopify_order_id: customer.shopifyOrderId,
          shopify_customer_id: customer.shopifyCustomerId,
          metadata: payload,
          updated_at: new Date().toISOString()
        })
        .eq("id", existing.data.id)
        .select("id,status,entitlement,email")
        .single();
      return { persisted: !updated.error, action: "updated", record: updated.data, error: updated.error?.message, runtime, customer };
    }

    const inserted = await client
      .from("eden_black_card_entitlements")
      .insert({
        email: customer.email,
        entitlement: ENTITLEMENT,
        status: "active",
        source: "shopify",
        shopify_order_id: customer.shopifyOrderId,
        shopify_customer_id: customer.shopifyCustomerId,
        metadata: payload
      })
      .select("id,status,entitlement,email")
      .single();
    return { persisted: !inserted.error, action: "inserted", record: inserted.data, error: inserted.error?.message, runtime, customer };
  }

  if (decision.state === "revoked") {
    const revoked = await client
      .from("eden_black_card_entitlements")
      .update({ status: "revoked", updated_at: new Date().toISOString(), metadata: payload })
      .ilike("email", customer.email)
      .eq("entitlement", ENTITLEMENT)
      .eq("status", "active")
      .select("id,status,entitlement,email");
    return { persisted: !revoked.error, action: "revoked", records: revoked.data || [], error: revoked.error?.message, runtime, customer };
  }

  return { persisted: true, action: "handoff_recorded", runtime, customer };
}
