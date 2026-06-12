import { Header } from "../../components";

const facelessCreators = [
  { slug: "morning-atelier", title: "Morning Atelier", body: "Anonymous beauty and lifestyle content.", products: ["Faceless Beauty Pack", "Product Story Pack", "Studio Reels"] },
  { slug: "noir-diary", title: "Noir Diary", body: "Shadow-first social campaigns and reels.", products: ["Noir Reels", "Anonymous Editorial", "Draft Social Pack"] },
  { slug: "glass-studio", title: "Glass Studio", body: "Product, room, and hands-only storytelling.", products: ["Hands-Only Product Demo", "Room Detail Pack", "Social Feed Draft"] }
];

export function generateStaticParams() {
  return facelessCreators.map((creator) => ({ slug: creator.slug }));
}

export default function FacelessProfile({ params }: { params: { slug: string } }) {
  const creator = facelessCreators.find((item) => item.slug === params.slug) || facelessCreators[0];

  return (
    <main className="eden-site">
      <Header />
      <section className="page-head">
        <p className="pink">Faceless Social</p>
        <h1>{creator.title}</h1>
        <p>{creator.body}</p>
        <div className="hero-actions">
          <a className="hot-btn" href="/shopify">
            Back to Shopify
          </a>
          <a className="outline-btn" href="/admin/approval-studio">
            Review Content
          </a>
        </div>
      </section>
      <section className="gallery-block">
        <h2>Draft Product / Content Packets</h2>
        <div>
          {creator.products.map((product) => (
            <article key={product} className="price-card">
              <span>Packet</span>
              <h2>{product}</h2>
              <p>Draft-only autonomous content creation package.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
