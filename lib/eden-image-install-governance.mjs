export const IMAGE_STATUSES = Object.freeze([
  'reference_board',
  'temporary_preview',
  'generated_pending_review',
  'approved_public',
  'rejected',
  'quarantined',
  'missing_asset'
]);

export const BLOCKED_FINAL_STATUSES = Object.freeze([
  'reference_board',
  'temporary_preview',
  'generated_pending_review',
  'rejected',
  'quarantined',
  'missing_asset'
]);

export const PUBLIC_INSTALL_GATES = Object.freeze([
  'public_use',
  'drive_use',
  'supabase_use'
]);

export function normalizeInstallMode(mode) {
  return mode === 'install' ? 'install' : 'dry_run';
}

export function isApprovedForPublicInstall(asset) {
  return asset?.status === 'approved_public';
}

export function validateInstallRequest(payload = {}) {
  const mode = normalizeInstallMode(payload.mode);
  const errors = [];
  const warnings = [];
  const assets = Array.isArray(payload.assets) ? payload.assets : [];
  const gates = payload.gates && typeof payload.gates === 'object' ? payload.gates : {};

  if (!payload.request_id) {
    errors.push('request_id is required');
  }

  if (!payload.approval_receipt_id) {
    errors.push('approval_receipt_id is required before any approved image installation');
  }

  if (!assets.length) {
    errors.push('assets must include at least one image asset');
  }

  for (const gate of PUBLIC_INSTALL_GATES) {
    if (gates[gate] !== true) {
      errors.push(`approval gate ${gate} must be true`);
    }
  }

  for (const asset of assets) {
    if (!asset?.asset_id) {
      errors.push('each asset requires asset_id');
      continue;
    }

    if (!IMAGE_STATUSES.includes(asset.status)) {
      errors.push(`${asset.asset_id} has unknown status ${asset.status}`);
      continue;
    }

    if (!isApprovedForPublicInstall(asset)) {
      errors.push(`${asset.asset_id} is ${asset.status}; only approved_public may install`);
    }

    if (asset.source_kind === 'page_board' || asset.source_kind === 'mockup' || asset.source_kind === 'temporary_crop') {
      errors.push(`${asset.asset_id} uses blocked source_kind ${asset.source_kind}`);
    }

    if (!asset.drive_target_folder_id) {
      warnings.push(`${asset.asset_id} has no drive_target_folder_id`);
    }

    if (!asset.supabase_bucket || !asset.supabase_path) {
      warnings.push(`${asset.asset_id} has incomplete Supabase destination metadata`);
    }
  }

  return {
    ok: errors.length === 0,
    mode,
    install_allowed: errors.length === 0 && mode === 'install',
    dry_run: mode !== 'install',
    errors,
    warnings,
    asset_count: assets.length
  };
}

export function buildInstallPlan(payload = {}) {
  const validation = validateInstallRequest(payload);
  const assets = Array.isArray(payload.assets) ? payload.assets : [];

  return {
    request_id: payload.request_id ?? null,
    mode: validation.mode,
    status: validation.ok ? 'ready' : 'blocked',
    install_allowed: validation.install_allowed,
    dry_run: validation.dry_run,
    approval_receipt_id: payload.approval_receipt_id ?? null,
    asset_count: validation.asset_count,
    actions: validation.ok
      ? assets.map((asset) => ({
          asset_id: asset.asset_id,
          drive_target_folder_id: asset.drive_target_folder_id,
          supabase_bucket: asset.supabase_bucket,
          supabase_path: asset.supabase_path,
          action: validation.dry_run ? 'would_install' : 'install'
        }))
      : [],
    errors: validation.errors,
    warnings: validation.warnings
  };
}
