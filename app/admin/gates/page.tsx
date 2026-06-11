const gates = ['Production Deployment Gate', 'Payment Activation Gate', 'Social Publishing Gate', 'External Email Gate', 'Public Release Gate', 'Black Card Release Gate', 'HeyGen Live Activation Gate', 'Spend Gate'];

export default function AdminGatesPage() {
  return (
    <main className="shell">
      <p className="eyebrow">Admin Gates</p>
      <h1>Release gates locked</h1>
      <section className="grid">
        {gates.map((gate) => <article className="card" key={gate}><h2>{gate}</h2><p>Status: locked. Approver: Jeremy.</p></article>)}
      </section>
    </main>
  );
}
