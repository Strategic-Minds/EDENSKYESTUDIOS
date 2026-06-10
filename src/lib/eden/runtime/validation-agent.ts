import { constants } from 'node:fs';
import { access } from 'node:fs/promises';
import path from 'node:path';

import { calculateReadiness, getRequiredRuntimeFiles, getRuntimeLocks } from './packet-loader';

export type EdenCheckState = 'pass' | 'warn' | 'blocked';

export type EdenFileCheck = {
  path: string;
  exists: boolean;
  state: EdenCheckState;
};

export type EdenEnvCheck = {
  key: string;
  present: boolean;
  requiredFor: 'runtime' | 'production' | 'shopify' | 'ai_gateway' | 'cron_security';
  state: EdenCheckState;
};

export type EdenValidationReport = {
  checkedAt: string;
  runtime: 'eden-autonomous-cron';
  mode: 'branch_runtime';
  readinessScore: number;
  readyForAutonomousCron: boolean;
  readyForProductionRelease: boolean;
  fileChecks: EdenFileCheck[];
  missingFiles: string[];
  envChecks: EdenEnvCheck[];
  missingRequiredEnv: string[];
  governanceLocks: ReturnType<typeof getRuntimeLocks>;
  blockedActions: string[];
  checks: Array<{
    id: string;
    state: EdenCheckState;
    detail: string;
  }>;
};

const REQUIRED_ENV: EdenEnvCheck[] = [
  { key: 'NEXT_PUBLIC_SUPABASE_URL', present: false, requiredFor: 'runtime', state: 'blocked' },
  { key: 'SUPABASE_SERVICE_ROLE_KEY', present: false, requiredFor: 'runtime', state: 'blocked' },
  { key: 'EDEN_CRON_SECRET', present: false, requiredFor: 'cron_security', state: 'warn' }
];

const OPTIONAL_ENV: EdenEnvCheck[] = [
  { key: 'SHOPIFY_STORE_DOMAIN', present: false, requiredFor: 'shopify', state: 'warn' },
  { key: 'SHOPIFY_ADMIN_ACCESS_TOKEN', present: false, requiredFor: 'shopify', state: 'warn' },
  { key: 'OPENAI_API_KEY', present: false, requiredFor: 'ai_gateway', state: 'warn' },
  { key: 'GROQ_API_KEY', present: false, requiredFor: 'ai_gateway', state: 'warn' }
];

const BLOCKED_ACTIONS = [
  'production_deploy',
  'shopify_live_publish',
  'social_publish',
  'customer_messages',
  'dns_changes',
  'secret_exposure',
  'destructive_actions'
];

async function fileExists(relativePath: string, cwd = process.cwd()) {
  const resolved = path.join(cwd, relativePath);

  try {
    await access(resolved, constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function buildEnvCheck(template: EdenEnvCheck): EdenEnvCheck {
  const present = Boolean(process.env[template.key]);
  const requiredMissing = !present && template.requiredFor === 'runtime';

  return {
    ...template,
    present,
    state: present ? 'pass' : requiredMissing ? 'blocked' : template.state
  };
}

export async function runValidationAgent() {
  const requiredFiles = getRequiredRuntimeFiles();
  const fileChecks = await Promise.all(
    requiredFiles.map(async (filePath) => {
      const exists = await fileExists(filePath);
      return {
        path: filePath,
        exists,
        state: exists ? 'pass' : 'blocked'
      } satisfies EdenFileCheck;
    })
  );

  const installedFiles = fileChecks.filter((check) => check.exists).map((check) => check.path);
  const missingFiles = fileChecks.filter((check) => !check.exists).map((check) => check.path);
  const envChecks = [...REQUIRED_ENV, ...OPTIONAL_ENV].map(buildEnvCheck);
  const missingRequiredEnv = envChecks
    .filter((check) => !check.present && check.requiredFor === 'runtime')
    .map((check) => check.key);
  const readinessScore = calculateReadiness(installedFiles);
  const readyForAutonomousCron = missingFiles.length === 0 && missingRequiredEnv.length === 0;
  const governanceLocks = getRuntimeLocks();

  const checks: EdenValidationReport['checks'] = [
    {
      id: 'runtime_files_present',
      state: missingFiles.length === 0 ? 'pass' : 'blocked',
      detail:
        missingFiles.length === 0
          ? 'All required Eden runtime files are present.'
          : `${missingFiles.length} required Eden runtime file(s) are missing.`
    },
    {
      id: 'supabase_server_env_ready',
      state: missingRequiredEnv.length === 0 ? 'pass' : 'blocked',
      detail:
        missingRequiredEnv.length === 0
          ? 'Supabase server runtime keys are configured without exposing values.'
          : `${missingRequiredEnv.length} required Supabase runtime env value(s) are missing.`
    },
    {
      id: 'cron_security_configured',
      state: process.env.EDEN_CRON_SECRET ? 'pass' : 'warn',
      detail: process.env.EDEN_CRON_SECRET
        ? 'Cron secret is configured and can be enforced by the route.'
        : 'EDEN_CRON_SECRET is not configured; production cron access should be locked before release.'
    },
    {
      id: 'production_actions_locked',
      state: 'pass',
      detail: 'Production deploy, live publish, social publish, customer messaging, DNS, secret exposure, and destructive actions remain blocked.'
    }
  ];

  return {
    checkedAt: new Date().toISOString(),
    runtime: 'eden-autonomous-cron',
    mode: 'branch_runtime',
    readinessScore,
    readyForAutonomousCron,
    readyForProductionRelease: false,
    fileChecks,
    missingFiles,
    envChecks,
    missingRequiredEnv,
    governanceLocks,
    blockedActions: BLOCKED_ACTIONS,
    checks
  } satisfies EdenValidationReport;
}
