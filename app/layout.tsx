import './globals.css';
import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: 'Eden Skye Studios',
  description: 'Digital modeling, creator production, Auto Social, and governed automation control surface.',
  applicationName: 'Eden Skye Studios',
  manifest: '/manifest.webmanifest',
  appleWebApp: {
    capable: true,
    title: 'Eden Skye',
    statusBarStyle: 'black-translucent'
  },
  icons: {
    icon: [
      { url: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' },
      { url: '/icon-512.svg', sizes: '512x512', type: 'image/svg+xml' }
    ],
    apple: [{ url: '/icon-192.svg', sizes: '192x192', type: 'image/svg+xml' }]
  }
};

export const viewport: Viewport = {
  themeColor: '#ff1493',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
