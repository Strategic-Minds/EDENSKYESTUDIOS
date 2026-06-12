export function getNextRetryAt(attempts: number) {
  const minutes = Math.min(60, Math.pow(2, attempts));
  return new Date(Date.now() + minutes * 60 * 1000).toISOString();
}

export function shouldRetry(attempts: number, maxAttempts: number) {
  return attempts < maxAttempts;
}
