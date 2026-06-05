const studioImages = [
  'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/4992ef73-f8a0-4b4f-a10d-54a962066394/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZThkNjRhZDE4MjlkY2MyZCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc0NTE2OX0.o9ejT9pqsy64NI9NYK44xuF5SiY6lxRL9Zf0hBrexIY',
  'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/9c0b40df-6a61-435c-867c-662e8085b1c1/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZDkzOWMzMDA3Mzg2YmRhMCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc5MzM0NH0.vswFmLbPjjly8W4OQPKly8Yn2Eq1G87nyHZHXRgBcHI',
  'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/4605f045-10c8-4cdc-a570-d4b2861aa1a6/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiY2UxMGRiNzI5Njc2MTM2ZiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc5MjA1MH0.29e8ggnDwzl3FmDGCfP6jObsu25Q1J1HIJdUFO66KVQ'
];

const pipeline = [
  ['1', 'Brand canon', 'Voice, boundaries, persona memory, offer angle, and fictional AI disclosure stay fixed.'],
  ['2', 'Closet scene', 'Model, wardrobe, pose preset, voice mood, and channel intent are selected as a reusable scene packet.'],
  ['3', 'Xyla draft', 'Hooks, script, captions, visual prompts, CTAs, and channel variants are packaged for video creation.'],
  ['4', 'Approval gate', 'Publishing, Shopify, payments, live avatar, and production deploys stay locked until approved.'],
  ['5', 'Channel release', 'Approved packets can move to Facebook, Instagram, X, TikTok, Pinterest, and Snapchat workflows.']
];

const channels = ['Facebook', 'Instagram', 'X', 'TikTok', 'Pinterest', 'Snapchat'];

const closetCapabilities = [
  'AI chat with Eden in governed test mode',
  'Voice and video-chat preparation for approved avatar sessions',
  'Wardrobe, outfit, pose, and scene presets for every fictional adult model',
  'Personalization intake for name, passions, desires, needs, and boundaries',
  'Xyla-ready content packets for short-form video creation',
  'Approval receipts before any public publishing or commerce action'
];

export default function HomePage() {
  return (
    <main className="studioPage">
      <header className="studioHeader" aria-label="Primary navigation">
        <a className="studioLogo" href="/">Eden Skye Studios</a>
        <nav className="studioNav">
          <a href="#xyla">Xyla Engine</a>
          <a href="/closet">Edens Closet</a>
          <a href="#shopify">Shopify Bridge</a>
          <a href="/admin">Admin</a>
        </nav>
      </header>

      <section
        className="studioHero"
        style={{ backgroundImage: `linear-gradient(90deg, rgba(0,0,0,.92), rgba(0,0,0,.58) 48%, rgba(0,0,0,.16)), url(${studioImages[0]})` }}
      >
        <div className="heroCopy">
          <p className="eyebrow">Fictional AI luxury creator studio</p>
          <h1>Eden Skye Studios</h1>
          <p className="heroText">
            A premium content and model-personality system built to feed Xyla with polished, approval-ready video packets for every major social channel.
          </p>
          <div className="heroActions">
            <a className="buttonPrimary" href="/closet">Open Edens Closet</a>
            <a className="buttonGhost" href="#xyla">View Xyla Pipeline</a>
          </div>
        </div>
        <ul className="heroSignals" aria-label="Studio status">
          <li><strong>Draft-first</strong><span>No public publishing without approval</span></li>
          <li><strong>Shopify-ready</strong><span>Commerce path prepared for your link</span></li>
          <li><strong>Multi-model</strong><span>Wardrobe, voice, scene, persona</span></li>
        </ul>
      </section>

      <section className="studioBand studioIntro" id="studio">
        <div>
          <p className="eyebrow">Operating idea</p>
          <h2>The site is the front door. Closet is the content room.</h2>
        </div>
        <p>
          Eden Skye Studios is structured as one coherent brand system: public positioning, Shopify conversion, model identity, wardrobe direction, Xyla production packets, and governed release controls. The goal is not random content volume. The goal is a repeatable premium content engine.
        </p>
      </section>

      <section className="studioBand" id="xyla">
        <div className="sectionHeading">
          <p className="eyebrow">Xyla premium feed</p>
          <h2>Every approved idea becomes a reusable video packet.</h2>
          <p>
            Xyla receives structured inputs instead of loose prompts: model identity, scene, look, hook, script, caption, CTA, channel adaptations, and approval status.
          </p>
        </div>
        <div className="pipelineGrid">
          {pipeline.map(([step, title, detail]) => (
            <article className="pipelineStep" key={title}>
              <span>{step}</span>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="mediaSection" aria-label="Eden visual system preview">
        <div className="mediaCopy">
          <p className="eyebrow">Visual continuity</p>
          <h2>Premium, cinematic, platform-safe, adult fictional AI models.</h2>
          <p>
            The library stays luxury-editorial: expressive, polished, alluring by implication, and commercially usable. Wardrobe changes are treated as scene direction for content production, not unsafe explicit generation.
          </p>
          <a className="buttonGhost" href="/closet">Enter the changing room</a>
        </div>
        <div className="imageRail" aria-label="Editorial model previews">
          {studioImages.map((image, index) => (
            <img key={image} src={image} alt={`Eden Skye Studios editorial model preview ${index + 1}`} loading="lazy" />
          ))}
        </div>
      </section>

      <section className="studioBand closetPreview" id="closet">
        <div className="sectionHeading">
          <p className="eyebrow">Edens Closet</p>
          <h2>The admin control room for every model, outfit, voice, and video scene.</h2>
        </div>
        <div className="capabilityList">
          {closetCapabilities.map((capability) => (
            <div className="capability" key={capability}>{capability}</div>
          ))}
        </div>
      </section>

      <section className="studioBand channelBand">
        <div>
          <p className="eyebrow">Distribution map</p>
          <h2>Built for cross-channel social without losing the Eden identity.</h2>
        </div>
        <div className="channelGrid">
          {channels.map((channel) => (
            <article className="channel" key={channel}>
              <h3>{channel}</h3>
              <p>Hook, visual, caption, CTA, and format notes generated as draft-only assets.</p>
            </article>
          ))}
        </div>
      </section>

      <section className="shopifyBand" id="shopify">
        <div>
          <p className="eyebrow">Shopify bridge</p>
          <h2>Ready for the store link when you connect it.</h2>
          <p>
            The site is prepared to route traffic toward Shopify offers, collections, bundles, and Black Card experiences. Eden has not mutated Shopify, created products, changed pricing, or published anything live.
          </p>
        </div>
        <div className="shopifyPanel">
          <strong>Approval locks active</strong>
          <span>Shopify mutations</span>
          <span>Payment changes</span>
          <span>Public publishing</span>
          <span>Production deploys</span>
        </div>
      </section>

      <section className="finalCta">
        <p className="eyebrow">Next working surface</p>
        <h2>Build from Closet, feed Xyla, approve before release.</h2>
        <div className="heroActions">
          <a className="buttonPrimary" href="/closet">Open Edens Closet</a>
          <a className="buttonGhost" href="/api/xyla/draft">Inspect Xyla Draft API</a>
        </div>
      </section>
    </main>
  );
}
