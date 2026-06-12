import { getBridgeConfig } from './config';
import { acquireBridgeLock, releaseBridgeLock } from './locks';
import { claimSafeJobs, completeJob, failJob } from './queue';
import { writeBridgeReceipt } from './receipts';
import { evaluateBridgeRisk } from './risk-engine';
import { createApprovalRequest } from './approvals';

export type RecursiveControlInput = {
  trigger: string;
  route: string;
  schedule: string;
  dryRun: boolean;
};

export async function runRecursiveControl(input: RecursiveControlInput) {
  const config = getBridgeConfig({ dryRun: input.dryRun });

  const summary = {
    ok: true,
    mode: config.dryRun ? 'dry_run' : 'approved_execution',
    trigger: input.trigger,
    route: input.route,
    schedule: input.schedule,
    killSwitch: config.killSwitch,
    claimedJobs: 0,
    completedJobs: 0,
    approvalRequests: 0,
    failedJobs: 0,
    receipts: [] as unknown[]
  };

  await writeBridgeReceipt({
    eventType: 'bridge.recursive_control.started',
    action: 'recursive_control_start',
    status: 'dry_run',
    riskLevel: 'green',
    target: input.route,
    details: summary
  });

  if (config.killSwitch) {
    await writeBridgeReceipt({
      eventType: 'bridge.recursive_control.skipped',
      action: 'kill_switch_skip',
      status: 'blocked',
      riskLevel: 'red',
      target: input.route,
      details: { reason: 'BRIDGE_KILL_SWITCH=true' }
    });

    return { ...summary, ok: true, skipped: true, reason: 'kill_switch_enabled' };
  }

  const lock = await acquireBridgeLock('recursive-control', config.lockTtlSeconds);

  if (!lock.acquired) {
    await writeBridgeReceipt({
      eventType: 'bridge.recursive_control.lock_not_acquired',
      action: 'lock_not_acquired',
      status: 'blocked',
      riskLevel: 'yellow',
      target: input.route,
      details: lock
    });

    return { ...summary, ok: true, skipped: true, reason: 'lock_not_acquired' };
  }

  try {
    const jobs = await claimSafeJobs(config.maxJobsPerRun);
    summary.claimedJobs = jobs.length;

    for (const job of jobs) {
      const risk = evaluateBridgeRisk(job.job_type, job.payload);

      if (risk.requiresApproval) {
        await createApprovalRequest({
          requestType: job.job_type,
          title: `Approval required: ${job.job_type}`,
          summary: risk.reason,
          riskLevel: risk.riskLevel,
          payload: job.payload
        });

        summary.approvalRequests += 1;

        await writeBridgeReceipt({
          eventType: 'bridge.job.approval_required',
          action: job.job_type,
          status: 'blocked',
          riskLevel: risk.riskLevel,
          target: job.id,
          details: { job, risk }
        });

        continue;
      }

      if (config.dryRun) {
        await writeBridgeReceipt({
          eventType: 'bridge.job.dry_run',
          action: job.job_type,
          status: 'dry_run',
          riskLevel: risk.riskLevel,
          target: job.id,
          details: { job, risk }
        });

        await completeJob(job.id, { dryRun: true });
        summary.completedJobs += 1;
        continue;
      }

      await completeJob(job.id, { executed: true });
      summary.completedJobs += 1;
    }

    await writeBridgeReceipt({
      eventType: 'bridge.recursive_control.completed',
      action: 'recursive_control_complete',
      status: 'allowed',
      riskLevel: 'green',
      target: input.route,
      details: summary
    });

    return summary;
  } catch (error) {
    summary.ok = false;
    summary.failedJobs += 1;

    await failJob('recursive-control', error instanceof Error ? error.message : 'Unknown bridge error');

    await writeBridgeReceipt({
      eventType: 'bridge.recursive_control.failed',
      action: 'recursive_control_failed',
      status: 'failed',
      riskLevel: 'red',
      target: input.route,
      details: { error: error instanceof Error ? error.message : 'Unknown error' }
    });

    return summary;
  } finally {
    await releaseBridgeLock('recursive-control', lock.owner);
  }
}
