import type { ReactNode } from 'react';

export default function EdenSourceImagesLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <nav aria-label="Eden source image navigation" style={{
        position: 'fixed',
        right: 16,
        bottom: 16,
        zIndex: 100,
        display: 'flex',
        gap: 8,
        alignItems: 'center',
        flexWrap: 'wrap',
        maxWidth: 'calc(100vw - 32px)',
        padding: 8,
        border: '1px solid rgba(255, 255, 255, 0.14)',
        background: 'rgba(0, 0, 0, 0.88)',
        boxShadow: '0 18px 60px rgba(0, 0, 0, 0.45)'
      }}>
        <a href="/eden-source-images/image-stack" style={navLinkStyle}>Image Stack</a>
        <a href="/eden-source-images/video-stack" style={navLinkStyle}>Video Stack</a>
        <a href="/eden-source-images" style={navLinkStyle}>Editor</a>
      </nav>
    </>
  );
}

const navLinkStyle = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: 38,
  padding: '0 12px',
  border: '1px solid rgba(255, 20, 147, 0.7)',
  background: '#050505',
  color: '#fff',
  fontSize: 13,
  fontWeight: 900,
  textDecoration: 'none'
} as const;
