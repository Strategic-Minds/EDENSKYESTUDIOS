type PageProps = { params: Promise<{ slug: string }> };

export default async function ClosetProfilePage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <main className="shell">
      <p className="eyebrow">Edens Closet Black Card</p>
      <h1>Private closet preview: {slug}</h1>
      <p className="subtle">Black Card route exists for sandbox verification only. Membership entitlements, payments, video chat, and live content remain locked.</p>
    </main>
  );
}
