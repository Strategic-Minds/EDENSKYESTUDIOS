import { getApprovalRequests, getMediaAssets } from '@/lib/admin-data';

function badgeClass(status: string) {
  if (status.includes('approved')) return 'badge good';
  if (status.includes('reject')) return 'badge bad';
  return 'badge warn';
}

export default async function AdminPage() {
  const [media, approvals] = await Promise.all([getMediaAssets(), getApprovalRequests()]);
  const pendingApprovals = approvals.data.filter((item) => item.status === 'pending').length;
  const publicAssets = media.data.filter((item) => item.status === 'approved_public').length;

  return (
    <main className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Admin Console</p>
          <h1>Media assets and approval queue</h1>
          <p className="subtle">
            This is the first operational cockpit for Eden Skye Studios. It keeps assets private until the approval workflow says otherwise.
          </p>
        </div>
        <nav className="nav" aria-label="Admin">
          <a href="/">Home</a>
          <a href="/api/admin/media-assets">Media API</a>
          <a href="/api/admin/approval-requests">Approvals API</a>
        </nav>
      </header>

      {(media.error || approvals.error) && (
        <div className="notice">
          {media.error || approvals.error} The console is still usable as a sandbox view.
        </div>
      )}

      <section className="grid" aria-label="Admin metrics">
        <div className="metric"><strong>{media.data.length}</strong><span>Media assets ({media.source})</span></div>
        <div className="metric"><strong>{approvals.data.length}</strong><span>Approval requests ({approvals.source})</span></div>
        <div className="metric"><strong>{pendingApprovals}</strong><span>Pending decisions</span></div>
        <div className="metric"><strong>{publicAssets}</strong><span>Approved public assets</span></div>
      </section>

      <section className="section">
        <h2>Media asset registry</h2>
        <div className="table">
          {media.data.map((asset) => (
            <article className="asset" key={asset.id}>
              <div>
                <h3>{asset.file_name}</h3>
                <p className="subtle">{asset.model_code ?? 'No model'} · {asset.asset_type} · {asset.asset_role}</p>
              </div>
              <span className={badgeClass(asset.status)}>{asset.status}</span>
              <span className={badgeClass(asset.approval_status)}>{asset.approval_status}</span>
              <div className="actions">
                {asset.drive_url ? <a className="button" href={asset.drive_url}>Drive</a> : <span className="badge">No Drive ID</span>}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <h2>Approval queue</h2>
        <div className="table">
          {approvals.data.map((request) => (
            <article className="approval" key={request.id}>
              <div>
                <h3>{request.request_type}</h3>
                <p className="subtle">{request.requested_action}</p>
              </div>
              <span className={badgeClass(request.risk_level)}>{request.risk_level}</span>
              <span className={badgeClass(request.status)}>{request.status}</span>
              <div className="actions">
                <button className="primary" type="button">Approve</button>
                <button className="danger" type="button">Reject</button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
