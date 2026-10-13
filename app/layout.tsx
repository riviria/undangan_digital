import type { Metadata, Viewport } from 'next';
import { Gloock, Manrope } from 'next/font/google';
import './globals.css';

const display = Gloock({ subsets: ['latin'], weight: '400', variable: '--font-display' });
const body = Manrope({ subsets: ['latin'], variable: '--font-body' });

export const metadata: Metadata = {
  title: 'Raisa & Arjuna, 12 Desember 2026',
  description: 'Undangan pernikahan digital Raisa & Arjuna.',
};
export const viewport: Viewport = { themeColor: '#0A0D26', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body>{children}</body>
    </html>
  );
}
