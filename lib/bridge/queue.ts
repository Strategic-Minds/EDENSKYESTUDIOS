import { createSupabaseServerClient, hasSupabaseServerConfig } from '@/lib/supabase-server';

export type BridgeJob = {
  id: string;
  job_type: string;
  status: string;
  priority: number;
  payload: Record<string, unknown>;
};

export async function claimSafeJobs(limit: number): Promise<BridgeJob[]> {
  if (!hasSupabaseServerConfig()) return [];

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from('bridge_queue')
    .select('*')
    .eq('status', 'queued')
    .lte('not_before', new Date().toISOString())
    .order('priority', { ascending: true })
    .limit(limit);

  if (error) throw error;

  return data ?? [];
}

export async function completeJob(jobId: string, result: Record<string, unknown>) {
  if (!hasSupabaseServerConfig()) return { source: 'dry_run', jobId, result };

  const supabase = createSupabaseServerClient();
  return supabase
    .from('bridge_queue')
    .update({ status: 'completed', result, updated_at: new Date().toISOString() })
    .eq('id', jobId);
}

export async function failJob(jobId: string, errorMessage: string) {
  if (!hasSupabaseServerConfig()) return { source: 'dry_run', jobId, errorMessage };

  const supabase = createSupabaseServerClient();
  return supabase
    .from('bridge_queue')
    .update({ status: 'failed', error: errorMessage, updated_at: new Date().toISOString() })
    .eq('id', jobId);
}
