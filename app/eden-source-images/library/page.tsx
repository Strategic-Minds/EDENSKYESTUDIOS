import Link from 'next/link';
import { approvedBasicPortraits, driveThumbnailUrl } from '../models/approved-basic-portraits';
import { approvedFacelessAccounts } from '../models/approved-faceless-roster';
import { approvedInternationalModels, internationalThumbnailUrl } from '../models/approved-international-roster';
import { approvedMaleModels } from '../models/approved-male-roster';

export const metadata = {
  title: 'Eden Media Library',
  description: 'Site-native image, video, and content library for Eden Skye Studios admin.'
};

const femaleItems = approvedBasicPortraits.map((item) => ({
  id: `female-${item.driveFileId}`,
  name: item.name,
  group: 'Female',
  type: 'model portfolio',
  imageUrl: driveThumbnailUrl(item.driveFileId),
  primaryFile: item.fileName,
  sourceId: item.driveFileId,
  stats: `Roster ${item.index.toString().padStart(2, '0')}`,
  imageCount: 1,
  videoCount: 0,
  contentCount: 0,
  status: 'approved',
  notes: 'Approved female/basic portrait. Add generated images, videos, scripts, and captions here instead of scattering them in Drive.'
}));

const maleItems = approvedMaleModels.map((item) => ({
  id: `male-${item.textFileId}`,
  name: item.name,
  group: 'Male',
  type: item.archetype,
  imageUrl: item.portraitFileId ? driveThumbnailUrl(item.portraitFileId) : null,
  primaryFile: item.portraitFileName ?? 'Portrait pending',
  sourceId: item.portraitFileId ?? item.textFileId,
  stats: `Age ${item.age} - QA ${item.qaScore ?? 'pending'}/100`,
  imageCount: item.portraitFileId ? 1 : 0,
  videoCount: 0,
  contentCount: 0,
  status: item.portraitFileId ? 'approved' : 'needs image',
  notes: item.notes
}));

const internationalItems = approvedInternationalModels.map((item) => ({
  id: `international-${item.driveFileId}`,
  name: item.name,
  group: 'International',
  type: item.market,
  imageUrl: internationalThumbnailUrl(item.driveFileId),
  primaryFile: item.fileName,
  sourceId: item.driveFileId,
  stats: `Age ${item.age} - ${item.market}`,
  imageCount: 1,
  videoCount: 0,
  contentCount: 0,
  status: 'approved',
  notes: 'Approved international source portrait. Portfolio expansion can add image sets, video concepts, scripts, and platform copy.'
}));

const facelessItems = approvedFacelessAccounts.map((item) => ({
  id: `faceless-${item.sourceFileId}`,
  name: item.concept,
  group: 'Faceless',
  type: item.boardTheme,
  imageUrl: null,
  primaryFile: item.sourceFileName,
  sourceId: item.sourceFileId,
  stats: `${item.contentCalendar.length} content drafts - ${item.riskLevel}`,
  imageCount: 0,
  videoCount: 0,
  contentCount: item.contentCalendar.length,
  status: 'approved concept',
  notes: `${item.platformFit}. ${item.monetizationPath}`
}));

const libraryGroups = [
  { id: 'female', label: 'Female Library', items: femaleItems, description: 'Approved female model portfolios with image, video, script, and campaign slots.' },
  { id: 'male', label: 'Male Library', items: maleItems, description: 'Approved male model portfolios organized by name and portrait readiness.' },
  { id: 'international', label: 'International Library', items: internationalItems, description: 'International model source portraits and future localized content libraries.' },
  { id: 'faceless', label: 'Faceless Library', items: facelessItems, description: 'Faceless brands with calendars, asset packs, scripts, and video concepts.' }
];

const totals = libraryGroups.reduce(
  (acc, group) => {
    acc.portfolios += group.items.length;
    acc.images += group.items.reduce((sum, item) => sum + item.imageCount, 0);
    acc.videos += group.items.reduce((sum, item) => sum + item.videoCount, 0);
    acc.content += group.items.reduce((sum, item) => sum + item.contentCount, 0);
    return acc;
  },
  { portfolios: 0, images: 0, videos: 0, content: 0 }
);

export default function EdenMediaLibraryPage() {
  return (
    <main style={shellStyle}>
      <header style={headerStyle}>
        <div>
          <p style={eyebrowStyle}>Eden Skye Studios Admin</p>
          <h1 style={titleStyle}>Media Library</h1>
          <span style={subtitleStyle}>A site-first library for images, videos, prompts, scripts, calendars, and approvals by model or faceless brand. Drive becomes an import/source layer, not the daily operating surface.</span>
        </div>
        <div style={headerActionsStyle}>
          <Link href="/eden-source-images" style={buttonStyle}>Dashboard</Link>
          <Link href="/eden-source-images/image-stack" style={primaryButtonStyle}>Add Images</Link>
        </div>
      </header>

      <section style={summaryGridStyle} aria-label="Library summary">
        <Metric label="Portfolios" value={totals.portfolios} />
        <Metric label="Images indexed" value={totals.images} />
        <Metric label="Videos staged" value={totals.videos} />
        <Metric label="Content drafts" value={totals.content} />
        <Metric label="Storage mode" value="Site library" />
      </section>

      <section style={controlPanelStyle}>
        <div>
          <p style={eyebrowStyle}>Storage direction</p>
          <h2 style={sectionTitleStyle}>Keep the work on the site</h2>
          <span style={subtitleStyle}>This library gives each model or concept a home on the admin. Current approved images are indexed from existing sources, and the next persistence step should copy generated/uploaded assets into Supabase Storage or Vercel Blob so the admin no longer depends on Drive for day-to-day work.</span>
        </div>
        <div style={pillRowStyle}>
          <span style={greenPillStyle}>Images: indexed</span>
          <span style={yellowPillStyle}>Videos: draft slots</span>
          <span style={yellowPillStyle}>Content: calendars staged</span>
          <span style={redPillStyle}>Live publish: blocked</span>
        </div>
      </section>

      {libraryGroups.map((group) => (
        <section id={group.id} key={group.id} style={sectionStyle}>
          <div style={sectionHeaderStyle}>
            <div>
              <p style={eyebrowStyle}>{group.items.length} portfolios</p>
              <h2 style={sectionTitleStyle}>{group.label}</h2>
              <span style={subtitleStyle}>{group.description}</span>
            </div>
            <a href={`#${group.id}`} style={buttonStyle}>Open lane</a>
          </div>
          <div style={gridStyle}>
            {group.items.map((item) => (
              <article key={item.id} style={cardStyle}>
                {item.imageUrl ? (
                  <img src={item.imageUrl} alt={`${item.name} primary asset`} style={imageStyle} />
                ) : (
                  <div style={placeholderStyle}>
                    <span style={pinkPillStyle}>{item.group}</span>
                    <b style={{ color: '#fff', fontSize: 18 }}>{item.name}</b>
                  </div>
                )}
                <div style={cardBodyStyle}>
                  <div style={cardTopStyle}>
                    <span style={greenPillStyle}>{item.status}</span>
                    <span style={tinyTextStyle}>{item.group}</span>
                  </div>
                  <h3 style={cardTitleStyle}>{item.name}</h3>
                  <span style={mutedTextStyle}>{item.type}</span>
                  <span style={mutedTextStyle}>{item.stats}</span>
                  <div style={slotGridStyle}>
                    <LibrarySlot label="Images" value={item.imageCount} />
                    <LibrarySlot label="Videos" value={item.videoCount} />
                    <LibrarySlot label="Content" value={item.contentCount} />
                  </div>
                  <div style={folderStyle}>
                    <b>Portfolio folders</b>
                    <span>Primary image set</span>
                    <span>Generated variants</span>
                    <span>Video drafts</span>
                    <span>Scripts and captions</span>
                    <span>Approvals and receipts</span>
                  </div>
                  <span style={tinyTextStyle}>{item.primaryFile}</span>
                  <span style={tinyTextStyle}>Source ID: {item.sourceId}</span>
                  <p style={notesStyle}>{item.notes}</p>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </main>
  );
}

function Metric({ label, value }: { label: string; value: string | number }) {
  return (
    <div style={metricStyle}>
      <b>{value}</b>
      <span>{label}</span>
    </div>
  );
}

function LibrarySlot({ label, value }: { label: string; value: number }) {
  return (
    <div style={slotStyle}>
      <b>{value}</b>
      <span>{label}</span>
    </div>
  );
}

const shellStyle = {
  minHeight: '100vh',
  padding: '116px 28px 64px',
  background: '#050505',
  color: '#fff'
} as const;

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  gap: 24,
  alignItems: 'flex-end',
  maxWidth: 1440,
  margin: '0 auto 22px'
} as const;

const headerActionsStyle = { display: 'flex', gap: 10, flexWrap: 'wrap' } as const;
const eyebrowStyle = { margin: 0, color: '#ff1493', fontSize: 12, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.08em' } as const;
const titleStyle = { margin: '8px 0', fontSize: 44, lineHeight: 1.02, letterSpacing: 0 } as const;
const sectionTitleStyle = { margin: '6px 0', fontSize: 24, lineHeight: 1.1, letterSpacing: 0 } as const;
const subtitleStyle = { display: 'block', maxWidth: 860, color: 'rgba(255,255,255,0.66)', fontSize: 14, lineHeight: 1.55 } as const;

const buttonStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 40,
  padding: '0 14px',
  border: '1px solid rgba(255,255,255,0.16)',
  borderRadius: 8,
  background: 'rgba(255,255,255,0.05)',
  color: '#fff',
  fontSize: 12,
  fontWeight: 900,
  textDecoration: 'none',
  textTransform: 'uppercase',
  letterSpacing: '0.06em'
} as const;

const primaryButtonStyle = { ...buttonStyle, border: '1px solid #ff1493', background: '#ff1493', boxShadow: '0 0 34px rgba(255,20,147,0.34)' } as const;

const summaryGridStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
  gap: 12,
  maxWidth: 1440,
  margin: '0 auto 12px'
} as const;

const metricStyle = {
  minHeight: 96,
  display: 'grid',
  alignContent: 'center',
  gap: 6,
  padding: 16,
  border: '1px solid rgba(255,255,255,0.13)',
  borderRadius: 8,
  background: 'rgba(255,255,255,0.04)'
} as const;

const controlPanelStyle = {
  maxWidth: 1440,
  margin: '0 auto 14px',
  display: 'grid',
  gridTemplateColumns: 'minmax(0, 1fr) auto',
  gap: 18,
  alignItems: 'center',
  padding: 18,
  border: '1px solid rgba(255,255,255,0.13)',
  borderRadius: 8,
  background: 'rgba(255,255,255,0.035)'
} as const;

const pillRowStyle = { display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'flex-end' } as const;
const greenPillStyle = { display: 'inline-flex', width: 'fit-content', padding: '5px 8px', borderRadius: 999, background: 'rgba(34,197,94,0.16)', color: '#86efac', fontSize: 11, fontWeight: 900, textTransform: 'uppercase', letterSpacing: '0.05em' } as const;
const yellowPillStyle = { ...greenPillStyle, background: 'rgba(234,179,8,0.16)', color: '#fde68a' } as const;
const redPillStyle = { ...greenPillStyle, background: 'rgba(239,68,68,0.16)', color: '#fca5a5' } as const;
const pinkPillStyle = { ...greenPillStyle, background: 'rgba(255,20,147,0.2)', color: '#ff8ac8' } as const;

const sectionStyle = { maxWidth: 1440, margin: '0 auto 18px' } as const;
const sectionHeaderStyle = { display: 'flex', justifyContent: 'space-between', gap: 18, alignItems: 'flex-end', marginBottom: 12 } as const;
const gridStyle = { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14 } as const;
const cardStyle = { border: '1px solid rgba(255,255,255,0.13)', borderRadius: 8, overflow: 'hidden', background: 'rgba(255,255,255,0.035)' } as const;
const imageStyle = { width: '100%', aspectRatio: '4 / 5', objectFit: 'cover', display: 'block', background: '#080808' } as const;
const placeholderStyle = { minHeight: 260, aspectRatio: '4 / 5', display: 'grid', placeItems: 'center', gap: 10, padding: 18, textAlign: 'center', background: 'linear-gradient(135deg, rgba(255,20,147,0.18), rgba(255,255,255,0.025))' } as const;
const cardBodyStyle = { display: 'grid', gap: 8, padding: 13 } as const;
const cardTopStyle = { display: 'flex', justifyContent: 'space-between', gap: 8, alignItems: 'center' } as const;
const cardTitleStyle = { margin: 0, color: '#fff', fontSize: 18, lineHeight: 1.15, letterSpacing: 0 } as const;
const mutedTextStyle = { color: 'rgba(255,255,255,0.68)', fontSize: 12, lineHeight: 1.45 } as const;
const tinyTextStyle = { color: 'rgba(255,255,255,0.48)', fontSize: 11, lineHeight: 1.4 } as const;
const notesStyle = { margin: 0, color: 'rgba(255,255,255,0.62)', fontSize: 12, lineHeight: 1.5 } as const;
const slotGridStyle = { display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginTop: 4 } as const;
const slotStyle = { display: 'grid', gap: 2, padding: 8, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, background: 'rgba(0,0,0,0.22)' } as const;
const folderStyle = { display: 'grid', gap: 4, padding: 10, border: '1px solid rgba(255,255,255,0.1)', borderRadius: 8, background: 'rgba(255,255,255,0.025)', color: 'rgba(255,255,255,0.62)', fontSize: 11, lineHeight: 1.35 } as const;
