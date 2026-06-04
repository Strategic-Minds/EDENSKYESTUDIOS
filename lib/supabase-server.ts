import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const publishableKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export function hasSupabaseServerConfig() {
  return Boolean(supabaseUrl && (serviceRoleKey || publishableKey));
}

export function createSupabaseServerClient() {
  if (!supabaseUrl) {
    throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL');
  }

  const key = serviceRoleKey ?? publishableKey;

  if (!key) {
    throw new Error('Missing Supabase server key. Set SUPABASE_SERVICE_ROLE_KEY for admin routes or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY for read-only routes.');
  }

  return createClient(supabaseUrl, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false
    }
  });
}

export const usesServiceRole = Boolean(serviceRoleKey);
