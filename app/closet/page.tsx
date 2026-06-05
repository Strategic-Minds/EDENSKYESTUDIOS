import EdenChatPanel from './EdenChatPanel';

const generatedImages = [
  'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/4992ef73-f8a0-4b4f-a10d-54a962066394/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZThkNjRhZDE4MjlkY2MyZCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc0NTE2OX0.o9ejT9pqsy64NI9NYK44xuF5SiY6lxRL9Zf0hBrexIY',
  'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/9c0b40df-6a61-435c-867c-662e8085b1c1/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiZDkzOWMzMDA3Mzg2YmRhMCIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc5MzM0NH0.vswFmLbPjjly8W4OQPKly8Yn2Eq1G87nyHZHXRgBcHI',
  'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/4605f045-10c8-4cdc-a570-d4b2861aa1a6/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiY2UxMGRiNzI5Njc2MTM2ZiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc5MjA1MH0.29e8ggnDwzl3FmDGCfP6jObsu25Q1J1HIJdUFO66KVQ',
  'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/bdfb6bbc-0e73-4454-b6b9-ea5c2e4ffff4/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNzRjZmFmY2RiMjE5YzYzMiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc0NzIxM30.OVmf7x29m3YZCKG7v-x9nmZpt2zQKa0mxTN_4b_mIMg',
  'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/c61940cd-3041-4b69-b08e-6d8ad254c7de/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiMGQ3Y2NmNzZiY2IxNjYwZSIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc5MjE4Mn0.OoxXOB0jiOdOz7ke54RywoocSwkHW70f35Ipn6EGxSU',
  'https://dnznrvs05pmza.cloudfront.net/gemini/gemini-3-pro-image-preview/images/25149955-7c3b-4059-8679-4a1436a6d4e9/Create_four_distinct_premium_editorial_model_card_portraits_.png?_jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJrZXlIYXNoIjoiNjIwMzIwNTI3MmQ3MzIzNiIsImJ1Y2tldCI6InJ1bndheS10YXNrLWFydGlmYWN0cyIsInN0YWdlIjoicHJvZCIsImV4cCI6MTc4MDc5NzY1MH0.MyW5QiJAGgtmtTGOWFydxnmAvEuyIb_djmtsYIvOxfo'
] as const;

const models = [
  ['Eden Skye', 'Signature host', 'soft command, luxury warmth', 'Live', 'good', generatedImages[0]],
  ['Amara Vale', 'Editorial model', 'velvet confidence', 'Live', 'good', generatedImages[1]],
  ['Mina Sol', 'Nightlife model', 'warm midnight', 'Live', 'good', generatedImages[2]],
  ['Sora Kim', 'Precision model', 'quiet focus, polished teasing', 'Live', 'good', generatedImages[3]],
  ['Nia Monroe', 'Deep luxury model', 'calm desire, composed charm', 'Live', 'good', generatedImages[4]],
  ['Vesper Hart', 'Edge model', 'tattooed glamour, direct eye contact', 'Live', 'good', generatedImages[5]],
  ['Pixie Rose', 'Playful editorial', 'bright, witty, high-trust', 'Queued', 'warn', null],
  ['Priya Rai', 'Couture model', 'graceful intimacy, refined presence', 'Queued', 'warn', null]
] as const;

const wardrobeLooks = [
  ['Black Card Satin', 'black satin, silver hardware, private lounge lighting'],
  ['After Dark Blazer', 'tailored oversized blazer, sculpted silhouette, city-window backdrop'],
  ['Pearl Studio Set', 'white pearl styling, soft studio shadows, premium skincare glow'],
  ['Hot Pink Signal', 'high-fashion pink accent, confident social hook energy'],
  ['Cinematic Night Out', 'glossy evening styling, hotel corridor, polished motion-ready pose'],
  ['Shopify Feature Look', 'product-forward styling built for offer banners and collection cards']
] as const;

const posePresets = [
  ['Standing editorial', 'front, three-quarter, and side angles for hero stills'],
  ['Seated lounge', 'calm conversation framing for chat and voice clips'],
  ['Runway walk', 'short-form motion prompt for Xyla video cuts'],
  ['Product hold', 'hands visible, item-forward, Shopify-safe framing'],
  ['Close portrait', 'face continuity, eye contact, voice-video thumbnail'],
  ['Creator desk', 'admin/control-room scene for Eden as operator']
] as const;

const xylaQueues = [
  ['Daily Reel Packet', 'Hook, 18-second script, 3 visual beats, caption, CTA', 'Draft'],
  ['Pinterest Mood Pin', 'Vertical still prompt, title, description, destination link', 'Draft'],
  ['TikTok Story Cut', 'Cold open, tension line, reveal, soft CTA', 'Draft'],
  ['Snapchat Lens Brief', 'Model look, outfit note, scene prompt, boundary notes', 'Planned'],
  ['X Thread Teaser', 'One-line hook, 4-post thread, image prompt', 'Draft'],
  ['Instagram Carousel', 'Cover, 4 panels, caption, Black Card CTA', 'Draft']
] as const;

const approvals = [
  ['Draft generation', 'Allowed', 'Xyla packets, scripts, prompts, captions, and scene plans can be created now.', 'good'],
  ['Voice/video chat', 'Approval gated', 'HeyGen live sessions and paid avatar generation require explicit approval first.', 'bad'],
  ['Shopify bridge', 'Prepared only', 'The site can route to offers later; product creation, price changes, and mutations stay locked.', 'warn'],
  ['Public posting', 'Approval gated', 'Metricool/social publishing is held until a release approval exists.', 'bad']
] as const;

const workflow = [
  ['Xyla', 'Receives structured draft packets for video creation and channel adaptation.', 'good'],
  ['OpenAI image path', 'Cheap GPT image creation can be used for draft stills and scene exploration.', 'good'],
  ['HeyGen', 'Reserved for approved voice, avatar, and presenter-led video sessions.', 'warn'],
  ['Drive', 'Keeps content plant, image library, and workflow bridge records together.', 'good']
] as const;

export default function ClosetPreviewPage() {
  return (
    <main className="closetPage">
      <header className="closetHero">
        <nav className="closetNav" aria-label="Edens Closet navigation">
          <a href="/">Studio Home</a>
          <a href="#models">Models</a>
          <a href="#personalize">Personalize</a>
          <a href="#wardrobe">Wardrobe</a>
          <a href="#xyla">Xyla Queue</a>
          <a href="#approvals">Approvals</a>
        </nav>
        <section className="closetHeroGrid">
          <div>
            <p className="eyebrow">Edens Closet Control Room</p>
            <h1>Change the model, the mood, the look, and the content packet.</h1>
            <p className="copy">
              This is the working changing room for Eden Skye Studios: AI chat with Eden, model personality design, wardrobe and pose direction, voice/video readiness, and draft-only Xyla packets for every social channel.
            </p>
            <div className="actions">
              <a className="buttonPrimary" href="#personalize">Build a user profile</a>
              <a className="buttonGhost" href="/api/closet/session">Inspect Closet API</a>
              <a className="buttonGhost" href="/api/xyla/draft">Inspect Xyla API</a>
            </div>
          </div>
          <aside className="statusCard" aria-label="Closet readiness summary">
            <span className="pill good">Draft room active</span>
            <h2>Governed changing room</h2>
            <p>Outfit, pose, personality, and video-prep workflows are supported as draft instructions. Live avatar, publishing, Shopify, and payment actions remain locked.</p>
            <div className="statusRow"><span>Model profiles</span><strong className="warnText">8 staged</strong></div>
            <div className="statusRow"><span>Xyla packets</span><strong className="warnText">Draft-only</strong></div>
            <div className="statusRow"><span>External actions</span><strong className="dangerText">Approval gated</strong></div>
          </aside>
        </section>
      </header>

      <div id="chat">
        <EdenChatPanel />
      </div>

      <section className="closetSection" id="models">
        <div className="heading">
          <p className="eyebrow">Model profiles</p>
          <h2>Each model carries a distinct personality, wardrobe lane, and video use case.</h2>
        </div>
        <div className="modelGrid">
          {models.map(([name, role, tone, status, risk, image]) => (
            <article className="card" key={name}>
              <div className="portrait">
                <span>{name.split(' ').map((part) => part[0]).join('')}</span>
                {image ? (
                  <img src={image} alt={`${name}, fictional adult AI model editorial preview`} loading="lazy" />
                ) : (
                  <div className="queuedPortrait"><strong>Queued</strong><p>Ready for the next approved image run</p></div>
                )}
              </div>
              <div className="info">
                <div className="topline"><h3>{name}</h3><span className={`pill ${risk}`}>{status}</span></div>
                <p>{role}</p>
                <p className="outfit">Personality: {tone}</p>
                <div className="mini"><button type="button">Chat</button><button type="button">Voice</button><button type="button">Look</button></div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="closetSection" id="personalize">
        <div className="heading">
          <p className="eyebrow">Personalization intake</p>
          <h2>Turn a user name and desire profile into a safe custom model experience.</h2>
          <p className="subtle">These fields define the draft session contract. Storage, memory, payment, live video, and publishing require the next approved implementation pass.</p>
        </div>
        <div className="intakePanel">
          <div className="intakeGrid">
            <label className="intakeField">User name<input value="Jeremy" readOnly /></label>
            <label className="intakeField">Passions<input value="luxury brand building, AI media, freedom, beauty" readOnly /></label>
            <label className="intakeField">Desired energy<input value="warm, intimate, strategic, high-trust" readOnly /></label>
            <label className="intakeField">Boundaries<input value="platform-safe, non-explicit, approval-gated" readOnly /></label>
          </div>
        </div>
      </section>

      <section className="closetSection" id="wardrobe">
        <div className="heading">
          <p className="eyebrow">Wardrobe and position controls</p>
          <h2>Change clothes, outfits, angles, and content framing without breaking brand safety.</h2>
        </div>
        <div className="lookGrid">
          {wardrobeLooks.map(([title, detail]) => (
            <article className="look" key={title}><h3>{title}</h3><p>{detail}</p></article>
          ))}
        </div>
        <div className="poseGrid" style={{ marginTop: 14 }}>
          {posePresets.map(([title, detail]) => (
            <article className="pose" key={title}><h3>{title}</h3><p>{detail}</p></article>
          ))}
        </div>
      </section>

      <section className="closetSection" id="xyla">
        <div className="heading">
          <p className="eyebrow">Xyla content queue</p>
          <h2>Draft packets are formatted for video automation before any channel goes live.</h2>
        </div>
        <div className="queueGrid">
          {xylaQueues.map(([title, detail, status]) => (
            <article className="queueItem" key={title}>
              <strong>{status}</strong>
              <h3>{title}</h3>
              <p>{detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="closetSection" id="approvals">
        <div className="heading"><p className="eyebrow">Approval theater</p><h2>Protected actions are visible, but held.</h2></div>
        <div className="approvalList">
          {approvals.map(([type, title, recommendation, risk]) => (
            <article className="approval" key={title}>
              <div><span className={`pill ${risk}`}>{type}</span><h3>{title}</h3><p>{recommendation}</p></div>
              <div className="media">Receipt</div>
              <div className="approvalButtons"><button type="button" className="approve">Approve</button><button type="button">Revise</button><button type="button" className="reject">Hold</button></div>
            </article>
          ))}
        </div>
      </section>

      <section className="closetSection" id="workflow">
        <div className="heading"><p className="eyebrow">System lanes</p><h2>GPT drafts stills and scripts. HeyGen makes approved video. Xyla packages and routes.</h2></div>
        <div className="workflowGrid">
          {workflow.map(([system, note, risk]) => (
            <article className="workflow" key={system}><span className={`dot ${risk}`} /><h3>{system}</h3><p>{note}</p></article>
          ))}
        </div>
      </section>
    </main>
  );
}
