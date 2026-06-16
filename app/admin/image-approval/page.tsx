const sourceImages = [
  {
    title: 'Eden Skye Labeled Source Portrait',
    fileName: '01-eden-labeled-eden-skye.png',
    driveFileId: '1lmOJBPF0G2wotinP7Q9iDiVqorZI8FQs',
    status: 'Approved for draft generator use',
    usage: 'Primary identity-lock source for branded website image packets.',
    generatorState: 'draft_ready_pending_review',
    sourceType: 'labeled_source_portrait'
  },
  {
    title: 'Eden Skye Basic Source Portrait',
    fileName: '01-eden-basic-eden-skye.png',
    driveFileId: '1ndzEOsotXMhwU_XeSb--4ajZtg0nuZg7',
    status: 'Approved for draft generator use',
    usage: 'Secondary source for website hero, section, and social proof variations.',
    generatorState: 'draft_ready_pending_review',
    sourceType: 'basic_source_portrait'
  }
];

const reviewSets = [
  {
    title: 'Labeled 13-Model Contact Sheet',
    driveFileId: '1AGx7Jn2w-WDamS8CdXB8KaI8yYzFDwMr',
    note: 'Reference only for the wider roster. Do not use for Eden Skye identity without a separate approval.'
  },
  {
    title: 'Basic 13-Model Contact Sheet',
    driveFileId: '1OirCLXguzctHipnwV6N9EIMMzJSLVV11',
    note: 'Reference only for the wider roster. Eden Skye is the first approved lane.'
  },
  {
    title: 'Basic Female 10-Model Contact Sheet',
    driveFileId: '1zrvChlWjquOVEN_UzK-DX919NN5vCkMj',
    note: 'Reference only. These images are not part of the Eden Skye identity lock.'
  }
];

function thumbnail(fileId: string, size = 900) {
  return `https://drive.google.com/thumbnail?id=${fileId}&sz=w${size}`;
}

function driveView(fileId: string) {
  return `https://drive.google.com/file/d/${fileId}/view`;
}

function approvalMailto(action: 'approve' | 'revise', title: string) {
  const subject = encodeURIComponent(`Eden Skye image ${action}: ${title}`);
  const body = encodeURIComponent([
    `Decision: ${action}`,
    `Image: ${title}`,
    'Scope: Eden Skye branded website image generator',
    'Notes:'
  ].join('\n'));

  return `mailto:strategicmindsadvisory@gmail.com?subject=${subject}&body=${body}`;
}

export const metadata = {
  title: 'Eden Skye Image Approval',
  description: 'Approval surface for Eden Skye source images and branded website image generator inputs.'
};

export default function ImageApprovalPage() {
  return (
    <main className="approvalPage">
      <header className="hero">
        <div>
          <p className="eyebrow">Admin Approval</p>
          <h1>Eden Skye Source Images</h1>
          <p>
            These are the approved Eden Skye source images for draft branded website image generation.
            Generated outputs still require review before public website use.
          </p>
        </div>
        <div className="statusPanel">
          <span>Generator mode</span>
          <strong>Draft packets only</strong>
          <small>No live publish, paid generation, or public asset use without final approval.</small>
        </div>
      </header>

      <section className="imageGrid" aria-label="Eden Skye approved source images">
        {sourceImages.map((image) => (
          <article className="imageCard" key={image.driveFileId}>
            <a className="imageFrame" href={driveView(image.driveFileId)} target="_blank" rel="noreferrer">
              <img src={thumbnail(image.driveFileId)} alt={image.title} />
            </a>
            <div className="cardBody">
              <div className="cardTopline">
                <span className="pill">{image.status}</span>
                <span className="sourceType">{image.sourceType}</span>
              </div>
              <h2>{image.title}</h2>
              <p className="fileName">{image.fileName}</p>
              <p>{image.usage}</p>
              <dl>
                <div><dt>Drive ID</dt><dd>{image.driveFileId}</dd></div>
                <div><dt>Generator state</dt><dd>{image.generatorState}</dd></div>
              </dl>
              <div className="actions">
                <a className="primary" href={approvalMailto('approve', image.title)}>Approve</a>
                <a className="secondary" href={approvalMailto('revise', image.title)}>Request revision</a>
                <a className="link" href={driveView(image.driveFileId)} target="_blank" rel="noreferrer">Open in Drive</a>
              </div>
            </div>
          </article>
        ))}
      </section>

      <section className="referenceSection" aria-label="Reference contact sheets">
        <div className="sectionHeader">
          <p className="eyebrow">Reference Only</p>
          <h2>Roster contact sheets</h2>
          <p>Use these for visual review of the wider image library. They are not automatically approved for the Eden Skye identity lock.</p>
        </div>
        <div className="referenceGrid">
          {reviewSets.map((set) => (
            <article className="referenceCard" key={set.driveFileId}>
              <a href={driveView(set.driveFileId)} target="_blank" rel="noreferrer">
                <img src={thumbnail(set.driveFileId, 700)} alt={set.title} />
              </a>
              <h3>{set.title}</h3>
              <p>{set.note}</p>
            </article>
          ))}
        </div>
      </section>

      <style>{`
        *{box-sizing:border-box}body{margin:0;background:#050507;color:#f7efe5;font-family:Inter,Arial,sans-serif}.approvalPage{min-height:100vh;background:linear-gradient(180deg,#050507,#0b070d 48%,#050507);color:#f7efe5}.hero{display:grid;grid-template-columns:minmax(0,1fr) 340px;gap:32px;align-items:end;width:min(1180px,calc(100% - 40px));margin:0 auto;padding:72px 0 34px;border-bottom:1px solid rgba(255,255,255,.14)}.eyebrow{margin:0 0 10px;color:#ff3ba7;text-transform:uppercase;font-size:12px;font-weight:900;letter-spacing:.14em}.hero h1{margin:0;font-size:56px;line-height:.95;text-transform:uppercase;letter-spacing:0;font-weight:1000}.hero p,.sectionHeader p,.cardBody p,.referenceCard p{color:#d8cfd8;line-height:1.55}.statusPanel{border:1px solid rgba(255,59,167,.34);background:rgba(255,255,255,.04);border-radius:8px;padding:20px;box-shadow:0 18px 60px rgba(255,0,122,.08)}.statusPanel span,.statusPanel small{display:block;color:#b9aeba}.statusPanel strong{display:block;margin:6px 0 8px;font-size:24px}.imageGrid{width:min(1180px,calc(100% - 40px));margin:34px auto 0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:22px}.imageCard,.referenceCard{overflow:hidden;border:1px solid rgba(255,255,255,.14);border-radius:8px;background:#0e0b12}.imageFrame{display:block;background:#08060a;aspect-ratio:4/5;overflow:hidden}.imageFrame img{width:100%;height:100%;object-fit:cover;display:block}.cardBody{padding:20px}.cardTopline{display:flex;gap:10px;flex-wrap:wrap;align-items:center}.pill,.sourceType{display:inline-flex;border-radius:999px;padding:7px 10px;font-size:11px;text-transform:uppercase;font-weight:900}.pill{background:#ff007a;color:#fff}.sourceType{border:1px solid rgba(255,255,255,.22);color:#d7b56d}.cardBody h2{margin:16px 0 6px;font-size:28px;line-height:1.05}.fileName{margin-top:0;color:#b9aeba!important;font-family:monospace;font-size:13px}dl{display:grid;gap:8px;margin:18px 0;padding:14px;border:1px solid rgba(255,255,255,.1);border-radius:8px;background:rgba(255,255,255,.03)}dl div{display:grid;grid-template-columns:120px minmax(0,1fr);gap:12px}dt{color:#b9aeba;font-size:12px;text-transform:uppercase;font-weight:900}dd{margin:0;overflow-wrap:anywhere}.actions{display:flex;flex-wrap:wrap;gap:10px;margin-top:18px}.actions a{display:inline-flex;align-items:center;justify-content:center;min-height:42px;border-radius:6px;padding:0 14px;text-decoration:none;font-weight:900}.primary{background:#ff007a;color:#fff}.secondary{border:1px solid rgba(255,59,167,.55);color:#fff}.link{color:#d7b56d}.referenceSection{width:min(1180px,calc(100% - 40px));margin:58px auto 0;padding:34px 0 70px;border-top:1px solid rgba(255,255,255,.14)}.sectionHeader{max-width:720px}.sectionHeader h2{margin:0 0 10px;font-size:36px;text-transform:uppercase}.referenceGrid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px;margin-top:22px}.referenceCard img{display:block;width:100%;aspect-ratio:4/3;object-fit:cover;background:#08060a}.referenceCard h3{margin:16px 16px 8px;font-size:18px}.referenceCard p{margin:0 16px 18px;font-size:14px}@media(max-width:860px){.hero,.imageGrid,.referenceGrid{grid-template-columns:1fr}.hero{padding-top:42px}.hero h1{font-size:40px}}
      `}</style>
    </main>
  );
}
