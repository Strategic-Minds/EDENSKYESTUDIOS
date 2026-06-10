export const EDEN_RUNTIME_LOCKS = {
  production: false,
  social: false,
  messages: false,
  dns: false,
  shopify: false,
  secrets: false,
  destructive: false,
  driveUploadNeedsApproval: true
} as const;

export function canRunEdenAction(action: string) {
  const blocked = ['production', 'social', 'messages', 'dns', 'shopify', 'secrets', 'destructive'];
  return { ok: !blocked.includes(action), action };
}
