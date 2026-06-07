const libraryUrl = 'https://docs.google.com/spreadsheets/d/1B7tJ46arQP59WnfpEWgXxkG0Drlbsn3ObqS7Tq37mUg/edit?usp=drivesdk';

const models = [
  ['F01','Eden Skye','Primary icon','#d7a75b','Luxury creator'],
  ['F02','Solara Vane','Bombshell creator','#f0c978','Resort glow'],
  ['F03','Liora Vale','Quiet luxury creator','#b78b56','Quiet luxury'],
  ['F04','Nova Rain','Nightlife creator','#c75f8d','Night luxe'],
  ['F05','Celeste Noir','Editorial creator','#9d86ff','Couture'],
  ['F06','Maya Velvet','Soft glamour creator','#c47d6d','Soft glam'],
  ['F07','Isla Vey','Wellness glamour','#d19b6a','Wellness'],
  ['F08','Marina Vale','Quiet luxury nightlife','#be8a48','VIP night'],
  ['F09','Elena Sol','Resort beauty','#edbd66','Travel'],
  ['F10','Nadia Rose','Fitness elegance','#bb6247','Fitness'],
  ['F11','Camille Noa','Business beauty','#c19160','Business'],
  ['F12','Sasha Lumi','Fashion social','#e9d6ad','Social'],
  ['F13','Priya Saint','Luxury tech','#9cc8c4','Tech'],
  ['F14','Bianca Hart','Dating confidence','#d8b47a','Confidence'],
  ['F15','Aurelia Knox','Cinematic fashion','#d86b44','Fashion'],
  ['F16','Leah Sable','Luxury interiors','#b6a26b','Interior'],
  ['F17','Aspyn Vale','Supermodel blonde','#e7c475','Runway'],
  ['F18','Imani Vale','Creator culture','#ff5bb7','Pink streak'],
  ['M01','Atlas Vale','Luxury fitness lead','#b8a074','Fitness'],
  ['M02','Roman Skye','Executive luxury','#cfa05d','Executive'],
  ['M03','Cassian Grey','Cinematic rebel','#a7a7ad','Nightlife'],
  ['M04','Kai Mercer','Warm lifestyle','#d0a06f','Lifestyle'],
  ['M05','Dante Lux','High-fashion nightlife','#d6a24e','VIP'],
  ['M06','Julian Cross','Creative director','#c9b287','Director'],
  ['M07','Orion Saint','Wellness calm','#98bfa7','Wellness'],
  ['M08','Nico Voss','European editorial','#b89c7c','Gallery'],
  ['M09','Rafael Stone','Resort luxury','#e0b76f','Resort'],
  ['M10','Soren Black','Minimalist couture','#8e9fb7','Couture'],
  ['M11','Malik Sterling','Silver couture','#c0c4cc','Silver'],
  ['M12','Theo Hart','Romantic lifestyle','#d5a86f','Lounge']
] as const;

const features = [
  ['Chat','Real-time messaging'], ['Video Chat','Live face-to-face'], ['Downloads','Images and videos'], ['Licenses','Commercial use'],
  ['Products','Digital and physical'], ['Services','Custom solutions'], ['Secure','Private and safe'], ['Support','24/7 assistance']
] as const;

function initials(name: string) {
  return name.split(' ').map((part) => part[0]).join('');
}

function Visual({ model, large = false }: { model: typeof models[number]; large?: boolean }) {
  const [id, name, role, accent, look] = model;
  return (
    <span
      className={large ? 'avatar avatarLarge' : 'avatar'}
      style={{ background: `radial-gradient(circle at 50% 22%, ${accent}88, transparent 34%), linear-gradient(140deg, #040404 0%, #17110d 48%, ${accent} 100%)` }}
      aria-label={`${name} ${look} visual preview`}
      role="img"
    >
      <i>{id}</i><b>{initials(name)}</b><em>{look}</em><small>{role}</small>
    </span>
  );
}

export default function HomePage() {
  return (
    <main className="storefront">
      <header className="siteHeader">
        <a className="brand" href="/" aria-label="Eden Skye Studios home"><span className="brandMonogram">ES</span><span><b>EDEN SKYE</b><small>STUDIOS</small></span></a>
        <nav className="mainNav" aria-label="Storefront navigation">
          {['Home','Creators','Downloads','Chat','Video Chat','Licenses','Products','Services'].map((item) => <a key={item} href={item === 'Home' ? '/' : `#${item.toLowerCase().replaceAll(' ', '-')}`}>{item}</a>)}
        </nav>
        <div className="headerActions"><a className="outlineBtn" href="/login">Sign In</a><a className="goldBtn" href="/payment">Join Now</a></div>
      </header>

      <section className="hero" id="home">
        <div className="heroArt"><Visual model={models[0]} large /></div>
        <div className="heroCopy">
          <span className="kicker">30-model Drive library connected</span>
          <h1><span>Creator Experience.</span><strong>Real. Beautiful.<br />Unforgettable.</strong></h1>
          <p>Connect, chat, video chat, download content, unlock exclusive images and videos, and enjoy premium experiences with your favorite creators.</p>
          <div className="heroCtas"><a className="goldBtn large" href="#creators">Explore Creators</a><a className="outlineBtn large" href="/payment">Join Now</a></div>
        </div>
        <aside className="actionRail" aria-label="Membership actions">
          {['Chat','Video Chat','Downloads','Licenses','Membership'].map((title, index) => (
            <a className="railCard" href={index < 2 ? '/login' : index === 4 ? '/payment' : '#downloads'} key={title}>
              <span className="circleIcon">{index + 1}</span><span className="railCopy"><b>{title}</b><small>{index < 2 ? 'Private member access.' : 'Premium creator content.'}</small><em>Open -&gt;</em></span><Visual model={models[index]} />
            </a>
          ))}
        </aside>
      </section>

      <section className="featureStrip" aria-label="Primary features">
        {features.map(([title, copy]) => <a href={`#${title.toLowerCase().replaceAll(' ', '-')}`} key={title}><b>{title}</b><small>{copy}</small></a>)}
      </section>

      <section className="panel creatorsPanel" id="creators">
        <div className="sectionHead"><div><span className="eyebrow">Female and male fictional AI creator roster</span><h2>Meet Our Creators</h2></div><a href={libraryUrl}>Open Drive Library</a></div>
        <div className="creatorGrid">
          {models.map((model) => <a className="creatorCard" href="/login" key={model[0]}><Visual model={model} /><span><b>{model[1]}</b><small><i />{model[2]}</small></span></a>)}
        </div>
      </section>

      <div className="commerceGrid">
        <section className="panel" id="downloads"><div className="sectionHead"><h2>Popular Downloads</h2><a href="/payment">View All</a></div><div className="downloadGrid">{models.slice(0, 4).map((model) => <a className="commerceCard" href="/payment" key={model[0]}><Visual model={model} /><b>{model[4]} Set</b><span>$24.99</span></a>)}</div></section>
        <section className="panel" id="products"><div className="sectionHead"><h2>Top Products</h2><a href="/payment">View All</a></div><div className="productGrid">{[['Creator Starter Pack','$29.00',models[0]],['Content Creator Toolkit','$49.00',models[12]],['Video Content Pack','$97.00',models[3]],['Behind The Scenes Pack','$79.00',models[5]]].map(([title, price, model]) => <a className="commerceCard" href="/payment" key={title as string}><Visual model={model as typeof models[number]} /><b>{title as string}</b><span>{price as string}</span></a>)}</div></section>
        <section className="panel servicesPanel" id="services"><div className="sectionHead"><h2>Premium Services</h2><a href="/login">View All</a></div><div className="serviceGrid">{[['Custom Creator Build','Starting at $499',models[0]],['Content Creation Service','Starting at $999',models[12]],['Brand Collaborations','Custom Pricing',models[18]]].map(([title, price, model]) => <a className="serviceCard" href="/login" key={title as string}><Visual model={model as typeof models[number]} /><b>{title as string}</b><span>{price as string}</span></a>)}</div></section>
      </div>

      <section className="trustStrip" id="licenses">{[['100% Secure','Your data is protected'],['Private and Encrypted','Bank-level security'],['Safe Payments','Trusted payment processing'],['24/7 Support',"We're here anytime"],['Approval Gated','Production stays locked']].map(([title, copy]) => <div key={title}><b>{title}</b><small>{copy}</small></div>)}</section>
    </main>
  );
}
