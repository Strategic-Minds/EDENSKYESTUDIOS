import { brand, launchPillars } from "@/lib/brand";
import { edenLaunchWorkflow } from "@/lib/workflow";

const systemCards = [
  ["Drive", "Campaign intelligence, workbooks, images, plans, and reusable launch context."],
  ["GitHub", "Build packets, repo changes, pull requests, validation receipts, and source control."],
  ["Vercel", "Preview deployments, cron triggers, route health, and production promotion gates."],
  ["Supabase", "Leads, drafts, receipts, approval queues, media assets, and agent run records."],
  ["Shopify", "Offer routing, conversion paths, collections, checkout, and post-click monetization."],
  ["Media Stack", "HeyGen, Runway, Xyla, and scheduling tools for repeatable content production."]
];

export default function Home() {
  return (
    <main>
      <section className="hero" aria-labelledby="hero-title">
        <div className="heroOverlay" />
        <div className="heroInner">
          <p className="eyebrow">Fictional AI creator brand and launch control surface</p>
          <h1 id="hero-title">{brand.name}</h1>
          <p className="heroCopy">
            A cinematic, platform-safe operating system for turning attention into owned audience,
            draft-ready content, and governed commerce momentum.
          </p>
          <div className="heroActions">
            <a href="/api/readiness">Check readiness</a>
            <a href="/api/workflows/eden-launch">View workflow</a>
          </div>
        </div>
      </section>

      <section className="band introBand">
        <div className="sectionGrid">
          <div>
            <p className="eyebrow">Launch architecture</p>
            <h2>One brand system, three demand engines.</h2>
          </div>
          <p>
            Eden Skye creates the public magnetism. AI Can't Do This captures the fear and
            curiosity around AI. Epoxy Will Change Your Life gives the audience a tangible,
            hopeful conversion path. The system is designed to draft, measure, and clone what works.
          </p>
        </div>
      </section>

      <section className="band pillars" aria-label="Launch pillars">
        {launchPillars.map((pillar) => (
          <article key={pillar.title}>
            <h3>{pillar.title}</h3>
            <p>{pillar.body}</p>
          </article>
        ))}
      </section>

      <section className="band darkBand">
        <div className="sectionGrid">
          <div>
            <p className="eyebrow">Operating stack</p>
            <h2>Built for automation with receipts.</h2>
          </div>
          <div className="stackList">
            {systemCards.map(([title, body]) => (
              <div className="stackRow" key={title}>
                <strong>{title}</strong>
                <span>{body}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="band workflowBand">
        <p className="eyebrow">Current sprint</p>
        <h2>{edenLaunchWorkflow.name}</h2>
        <div className="laneGrid">
          {edenLaunchWorkflow.lanes.map((lane) => (
            <span key={lane}>{lane.replaceAll("-", " ")}</span>
          ))}
        </div>
      </section>
    </main>
  );
}
