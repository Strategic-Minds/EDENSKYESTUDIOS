const models = ['Eden Skye', 'Amara Vale', 'Mina Sol', 'Sora Kim', 'Nia Monroe', 'Vesper Hart'];

export default function ModelsPage() {
  return (
    <main className="shell">
      <p className="eyebrow">Model Roster</p>
      <h1>Fictional AI model roster</h1>
      <p className="subtle">Draft roster route sourced from the Eden Skye Studios OS package. All model experiences remain platform-safe and approval-gated.</p>
      <section className="grid">
        {models.map((name) => <article className="card" key={name}><h2>{name}</h2><p>Profile, wardrobe, voice, and content lane staged for review.</p></article>)}
      </section>
    </main>
  );
}
