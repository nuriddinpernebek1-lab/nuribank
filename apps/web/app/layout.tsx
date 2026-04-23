import type { Metadata } from 'next';
import { RegisterServiceWorker } from '../components/pwa/register-sw';
import './globals.css';

export const metadata: Metadata = {
  title: 'ILYAS BANK 2.0',
  description: 'Production-style fintech banking app with mobile-first UX.',
  manifest: '/manifest.json'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <RegisterServiceWorker />
        {children}
      </body>
    </html>
  );
}
