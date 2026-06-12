import { writeBridgeReceipt } from './receipts';

export async function requestBridgeRollback(reason: string, target: Record<string, unknown>) {
  await writeBridgeReceipt({
    eventType: 'bridge.rollback.requested',
    action: 'rollback_request',
    status: 'blocked',
    riskLevel: 'red',
    target: 'eden-autonomous-bridge',
    details: { reason, target }
  });

  return {
    rollbackRequested: true,
    reason,
    safeState: {
      BRIDGE_KILL_SWITCH: true,
      BRIDGE_DRY_RUN: true
    }
  };
}
