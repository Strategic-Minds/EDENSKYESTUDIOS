import { Header } from "../components";

const facelessCreators = [
  { slug: "morning-atelier", title: "Morning Atelier", body: "Anonymous beauty and lifestyle content.", cta: "Open Faceless Portfolio" },
  { slug: "noir-diary", title: "Noir Diary", body: "Shadow-first social campaigns and reels.", cta: "Open Faceless Portfolio" },
  { slug: "glass-studio", title: "Glass Studio", body: "Product, room, and hands-only storytelling.", cta: "Open Faceless Portfolio" }
];

export default function FacelessIndex() {
  return (
    <main className="eden-site">
      <Header />
      <section className="page-head">
        <p className="pink">Faceless Social</p>
        <h1>Anonymous Creator Pages</h1>
        <p>Draft-only faceless social plans for anonymous content creation, product content, and campaign support.</p>
      </section>
      <section className="models-grid">
        {facelessCreators.map((item) => (
          <article key={item.slug} className="price-card">
            <span>Faceless</span>
            <h2>{item.title}</h2>
            <p>{item.body}</p>
            <a className="hot-btn" href={`/faceless/${item.slug}`}>
              {item.cta}
            </a>
          </article>
        ))}
      </section>
    </main>
  );
}
