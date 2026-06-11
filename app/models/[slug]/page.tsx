type PageProps = { params: Promise<{ slug: string }> };

export default async function ModelProfilePage({ params }: PageProps) {
  const { slug } = await params;
  const name = slug.split('-').map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');

  return (
    <main className="shell">
      <p className="eyebrow">Model Profile</p>
      <h1>{name}</h1>
      <p className="subtle">Draft-only profile route. Identity lock, wardrobe, HeyGen readiness, and content packets require admin approval before live release.</p>
    </main>
  );
}
