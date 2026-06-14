import './globals.css';
import './site-styles.css';
import type { ReactNode } from 'react';

export const metadata = {
  title: 'Eden Skye Studios',
  description: 'Governed AI digital modeling and content creation control surface.'
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
