const checks = ['Release gates locked', 'Supabase migrations staged', 'Shopify mutations blocked', 'Metricool publishing blocked', 'HeyGen live activation blocked'];

export default function DashboardPage() {
  return (
    <main className="shell">
      <p className="eyebrow">Member Dashboard</p>
      <h1>Eden Skye Studios OS dashboard preview</h1>
      <p className="subtle">Draft-only operational dashboard for member state, entitlements, saved looks, content receipts, and Black Card readiness.</p>
      <ul>
        {checks.map((check) => <li key={check}>{check}</li>)}
      </ul>
    </main>
  );
}
