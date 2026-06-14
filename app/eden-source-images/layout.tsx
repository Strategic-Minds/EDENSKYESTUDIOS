import type { ReactNode } from 'react';

export default function EdenSourceImagesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <nav aria-label="Eden source image navigation" style={navStyle}>
        <a href="/eden-source-images" style={brandStyle}>EDEN <span style={{ color: '#ff1493' }}>ADMIN</span></a>
        <div style={navLinksStyle}>
          <a href="/eden-source-images" style={navLinkStyle}>Dashboard</a>
          <a href="/eden-source-images/library" style={navLinkStyle}>Library</a>
          <a href="/eden-source-images/models" style={navLinkStyle}>Inventory</a>
          <a href="/eden-source-images/image-stack" style={navLinkStyle}>Images</a>
          <a href="/eden-source-images/video-stack" style={navLinkStyle}>Videos</a>
          <a href="/eden-source-images/editor" style={navCtaStyle}>Editor</a>
        </div>
      </nav>
      {children}
    </>
  );
}

const navStyle = {
  position: 'fixed',
  top: 16,
  left: 28,
  right: 28,
  zIndex: 100,
  display: 'flex',
  gap: 18,
  alignItems: 'center',
  justifyContent: 'space-between',
  minHeight: 62,
  padding: '10px 12px 10px 18px',
  border: '1px solid rgba(255, 255, 255, 0.16)',
  borderRadius: 18,
  background: 'rgba(0, 0, 0, 0.72)',
  boxShadow: '0 24px 80px rgba(0, 0, 0, 0.48)',
  backdropFilter: 'blur(22px)'
} as const;

const brandStyle = {
  color: '#fff',
  fontSize: 14,
  fontWeight: 1000,
  letterSpacing: '0.08em',
  textDecoration: 'none',
  whiteSpace: 'nowrap'
} as const;

const navLinksStyle = {
  display: 'flex',
  gap: 8,
  alignItems: 'center',
  justifyContent: 'flex-end',
  flexWrap: 'wrap'
} as const;

const navLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 38,
  padding: '0 12px',
  border: '1px solid rgba(255, 255, 255, 0.13)',
  borderRadius: 8,
  background: 'rgba(255, 255, 255, 0.04)',
  color: '#fff',
  fontSize: 12,
  fontWeight: 900,
  letterSpacing: '0.06em',
  textDecoration: 'none',
  textTransform: 'uppercase'
} as const;

const navCtaStyle = {
  ...navLinkStyle,
  border: '1px solid #ff1493',
  background: '#ff1493',
  boxShadow: '0 0 32px rgba(255, 20, 147, 0.38)'
} as const;