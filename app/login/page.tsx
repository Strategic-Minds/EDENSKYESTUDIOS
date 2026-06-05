const models = ['Eden Skye', 'Solara Vane', 'Liora Vale', 'Nova Rain', 'Celeste Noir'];

const styles = `
  .portalPage { min-height: 100vh; display: grid; grid-template-columns: minmax(0,.9fr) minmax(360px,.7fr); gap: 42px; align-items: center; padding: 96px 28px 56px; background: radial-gradient(circle at 18% 16%, rgba(216,182,106,.18), transparent 28%), linear-gradient(180deg,#050505,#090909); color: #f7f3ee; }
  .portalCopy { max-width: 680px; }
  .eyebrowLocal { margin: 0 0 12px; color: #d8b66a; font-size: 12px; font-weight: 950; text-transform: uppercase; }
  .portalCopy h1 { margin: 0 0 18px; font-size: 68px; line-height: .92; letter-spacing: 0; }
  .portalCopy p, .portalCard p, .modelPick span, .gateNote { color: #b9b4ad; line-height: 1.58; }
  .portalActions { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 26px; }
  .buttonGold, .buttonDark { min-height: 42px; display: inline-flex; align-items: center; justify-content: center; padding: 10px 14px; border-radius: 8px; text-decoration: none; font-weight: 900; font-size: 13px; }
  .buttonGold { border: 1px solid #d8b66a; background: #d8b66a; color: #050505; }
  .buttonDark { border: 1px solid rgba(255,255,255,.16); background: rgba(255,255,255,.06); color: #fff; }
  .portalCard { padding: 20px; border: 1px solid rgba(255,255,255,.13); border-radius: 8px; background: linear-gradient(145deg,#090909,#141414); box-shadow: 0 30px 80px rgba(0,0,0,.42); }
  .portalCard h2 { margin: 0 0 14px; font-size: 30px; letter-spacing: 0; }
  .fieldStack { display: grid; gap: 12px; margin-top: 18px; }
  label { display: grid; gap: 6px; color: #d8d2bf; font-size: 12px; font-weight: 900; text-transform: uppercase; }
  input, select { width: 100%; border: 1px solid rgba(255,255,255,.16); border-radius: 8px; background: #050505; color: #fff; padding: 12px; }
  .modelPick { display: grid; gap: 8px; margin-top: 18px; }
  .modelPick div { display: flex; justify-content: space-between; gap: 12px; padding: 12px; border: 1px solid rgba(255,255,255,.12); border-radius: 8px; background: rgba(255,255,255,.04); }
  .gateNote { margin-top: 16px; padding: 12px; border: 1px solid rgba(216,182,106,.36); border-radius: 8px; background: rgba(216,182,106,.08); }
  @media (max-width: 860px) { .portalPage { grid-template-columns: 1fr; padding: 72px 16px 42px; } .portalCopy h1 { font-size: 44px; } }
`;

export default function LoginPage() {
  return (
    <main className="portalPage">
      <style>{styles}</style>
      <section className="portalCopy">
        <p className="eyebrowLocal">Member portal preview</p>
        <h1>Login to choose your model and enter Edens Closet.</h1>
        <p>
          This is the v1 frontend for member access. In v2, successful login will remember the member name, chosen model, access level, preferences, and safe personalization boundaries before opening the behind-the-scenes Closet room.
        </p>
        <div className="portalActions">
          <a className="buttonGold" href="/payment">Need access? Join Black Card</a>
          <a className="buttonDark" href="/">Back to storefront</a>
        </div>
      </section>

      <section className="portalCard" aria-label="Login form preview">
        <p className="eyebrowLocal">Black Card Login</p>
        <h2>Member access</h2>
        <p>Frontend-only preview. No real authentication is wired until approval.</p>
        <div className="fieldStack">
          <label>Email<input type="email" placeholder="member@example.com" /></label>
          <label>Password<input type="password" placeholder="••••••••" /></label>
          <label>Choose model<select defaultValue="Eden Skye">{models.map((model) => <option key={model}>{model}</option>)}</select></label>
        </div>
        <div className="modelPick">
          {models.slice(0, 3).map((model) => (
            <div key={model}><strong>{model}</strong><span>Private room ready after access check</span></div>
          ))}
        </div>
        <div className="portalActions">
          <a className="buttonGold" href="/closet">Preview Closet room</a>
        </div>
        <p className="gateNote">Auth, saved preferences, and member-only gating are not live yet. This protects the system until you approve backend wiring.</p>
      </section>
    </main>
  );
}
