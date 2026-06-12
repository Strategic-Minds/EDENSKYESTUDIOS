export type BridgeConfig = {
  dryRun: boolean;
  killSwitch: boolean;
  maxJobsPerRun: number;
  lockTtlSeconds: number;
};

export function getBridgeConfig(input?: Partial<BridgeConfig>): BridgeConfig {
  return {
    dryRun: input?.dryRun ?? process.env.BRIDGE_DRY_RUN !== 'false',
    killSwitch: input?.killSwitch ?? process.env.BRIDGE_KILL_SWITCH === 'true',
    maxJobsPerRun: input?.maxJobsPerRun ?? Number(process.env.BRIDGE_MAX_JOBS_PER_RUN ?? 10),
    lockTtlSeconds: input?.lockTtlSeconds ?? Number(process.env.BRIDGE_LOCK_TTL_SECONDS ?? 240)
  };
}
