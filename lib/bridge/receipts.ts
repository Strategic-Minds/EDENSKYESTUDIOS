import { logEdenReceipt, type EdenReceiptInput } from '@/lib/eden/receipts';

export async function writeBridgeReceipt(input: EdenReceiptInput) {
  return logEdenReceipt({
    ...input,
    actor: input.actor ?? 'Eden Skye Autonomous Bridge'
  });
}
