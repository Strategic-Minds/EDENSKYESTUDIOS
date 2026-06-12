import { createSupabaseServerClient, hasSupabaseServerConfig } from '@/lib/supabase-server';

export async function acquireBridgeLock(lockKey: string, ttlSeconds: number) {
  const owner = `eden-bridge-${Date.now()}`;
  const lockedUntil = new Date(Date.now() + ttlSeconds * 1000).toISOString();

  if (!hasSupabaseServerConfig()) {
    return { acquired: true, owner, source: 'memory_dry_run' as const };
  }

  const supabase = createSupabaseServerClient();

  await supabase.from('bridge_locks').delete().eq('lock_key', lockKey).lt('locked_until', new Date().toISOString());

  const { error } = await supabase.from('bridge_locks').insert({
    lock_key: lockKey,
    owner,
    locked_until: lockedUntil
  });

  if (error) {
    return { acquired: false, owner, source: 'supabase' as const, error: error.message };
  }

  return { acquired: true, owner, source: 'supabase' as const };
}

export async function releaseBridgeLock(lockKey: string, owner: string) {
  if (!hasSupabaseServerConfig()) return { released: true, source: 'memory_dry_run' as const };

  const supabase = createSupabaseServerClient();
  const { error } = await supabase.from('bridge_locks').delete().eq('lock_key', lockKey).eq('owner', owner);

  return { released: !error, error: error?.message };
}
