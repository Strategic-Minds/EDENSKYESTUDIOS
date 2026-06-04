import { sampleApprovalRequests, sampleMediaAssets } from './admin-sample-data';
import type { ApprovalRequest, MediaAsset } from './contracts';
import { createSupabaseServerClient, hasSupabaseServerConfig } from './supabase-server';

export async function getMediaAssets(): Promise<{ data: MediaAsset[]; source: 'supabase' | 'sample'; error?: string }> {
  if (!hasSupabaseServerConfig()) {
    return { data: sampleMediaAssets, source: 'sample', error: 'Supabase env vars are not configured. Showing sample pre-production data.' };
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from('media_assets')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;
    return { data: (data ?? []) as MediaAsset[], source: 'supabase' };
  } catch (error) {
    return { data: sampleMediaAssets, source: 'sample', error: error instanceof Error ? error.message : 'Unknown Supabase error' };
  }
}

export async function getApprovalRequests(): Promise<{ data: ApprovalRequest[]; source: 'supabase' | 'sample'; error?: string }> {
  if (!hasSupabaseServerConfig()) {
    return { data: sampleApprovalRequests, source: 'sample', error: 'Supabase env vars are not configured. Showing sample pre-production data.' };
  }

  try {
    const supabase = createSupabaseServerClient();
    const { data, error } = await supabase
      .from('approval_requests')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(100);

    if (error) throw error;
    return { data: (data ?? []) as ApprovalRequest[], source: 'supabase' };
  } catch (error) {
    return { data: sampleApprovalRequests, source: 'sample', error: error instanceof Error ? error.message : 'Unknown Supabase error' };
  }
}
