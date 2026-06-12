import { getConnectorSmokeReceipts } from '@/lib/eden-sandbox/connector-smoke';
import styles from '../page.module.css';

export const dynamic = 'force-dynamic';

const receiptActions = [
  ['Approve', 'Internal draft batch', 'Records approval intent for preview review only', 'receipt_only_no_external_write'],
  ['Reject', 'Unfit or off-brand draft', 'Records rejection reason and keeps asset unpublished', 'receipt_only_no_external_write'],
  ['Quarantine', 'Rights, safety, or quality risk', 'Routes item to blocked review lane without deleting source', 'receipt_only_no_external_write'],
  ['Hold', 'Needs owner context', 'Pauses movement until manual review clears the gate', 'receipt_only_no_external_write'],
  ['Retry', 'Recoverable preview failure', 'Queues a mock retry receipt without running a live job', 'receipt_only_no_external_write']
];

const supportingReadReceipts = [
  ['Supabase', 'Project, health, and public table metadata read smoke passed for Strategic Minds Advisory.', 'Read-only; no SQL, migration, branch, storage, or production data mutation.'],
  ['Google Drive', 'Drive profile and root listing read smoke passed for connected Eden working docs.', 'Read-only; no file, folder, upload, move, archive, or permission mutation.'],
  ['AUTO BUILDER', 'Strict MCP health/bootstrap smoke passed with default dry-run governance.', 'Read-only; no Drive write, provisioning, rollback, deploy, or platform mutation.']
];

const gates = [
  ['Preview action class', 'Class 2 receipt-only'],
  ['External writes', 'Locked'],
  ['Production mutation', 'Locked'],
  ['Checkout and publishing', 'Locked']
];

const anchorOffset = { scrollMarginTop: 190 };

export const metadata = {
  title: 'Eden Skye Receipt Actions | AUTO BUILDER',
  description: 'Receipt-only preview actions and connector smoke receipts for the Eden Skye sandbox.'
};

export default function EdenSandboxActionsPage() {
  const routedSmokeReceipts = getConnectorSmokeReceipts();
  const smokeRows = [
    ...routedSmokeReceipts.map((receipt) => [
      receipt.connector,
      `${receipt.status}: ${receipt.summary}`,
      `${receipt.evidence} Missing required env: ${receipt.missingRequiredEnv.length ? receipt.missingRequiredEnv.join(', ') : 'none'}.`
    ]),
    ...supportingReadReceipts
  ];

  return (
    <main className={styles.shell}>
      <header className={styles.topbar}>
        <a className={styles.brand} href="/eden-sandbox#home"><span>ES</span>Eden Skye Studios</a>
        <nav>
          <a href="/eden-sandbox#approval-queue">Approvals</a>
          <a href="/eden-sandbox#agent-ops">Ops</a>
          <a href="/eden-sandbox#connectors">Connectors</a>
        </nav>
        <a className={styles.topAction} href="/eden-sandbox">Back to Preview</a>
      </header>

      <section id="action-ledger" className={styles.workMain} style={anchorOffset}>
        <section className={styles.workHeader}>
          <div>
            <p className={styles.eyebrow}>Receipt-only preview gate</p>
            <h2>Admin Action Ledger</h2>
            <p>These controls model approve, reject, quarantine, hold, and retry outcomes without executing live workflow, database, commerce, publishing, or Drive writes.</p>
          </div>
          <span className={styles.dangerPill}>No external mutation</span>
        </section>

        <section className={styles.statusStrip}>
          {gates.map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}
        </section>

        <section className={styles.approvals} aria-label="Receipt-only preview actions">
          {receiptActions.map(([name, target, result, state]) => (
            <article key={name}>
              <span>{state}</span>
              <h3>{name}</h3>
              <p><b>{target}</b><br />{result}</p>
              <button disabled>{name} Receipt Only</button>
            </article>
          ))}
        </section>
      </section>

      <section id="connector-smoke" className={styles.workMain} style={anchorOffset}>
        <section className={styles.workSection}>
          <div className={styles.sectionRow}>
            <div>
              <p className={styles.eyebrow}>Dry-run connector evidence</p>
              <h2>Connector Smoke Receipts</h2>
              <p>Route-backed smoke endpoint: <code>/api/eden-sandbox/connector-smoke</code></p>
            </div>
            <span className={styles.lockPill}>Read-only checks only</span>
          </div>
          <div className={styles.table}>
            {smokeRows.map((row) => <div key={row[0]}>{row.map((cell) => <span key={cell}>{cell}</span>)}</div>)}
          </div>
        </section>
      </section>
    </main>
  );
}
