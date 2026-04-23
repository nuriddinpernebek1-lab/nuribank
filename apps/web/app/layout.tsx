import type { Metadata } from 'next';
import { MemeModeProvider } from '../components/meme-mode/meme-mode-provider';
import { RegisterServiceWorker } from '../components/pwa/register-sw';
import { withBasePath } from '../lib/base-path';
import './globals.css';

export const metadata: Metadata = {
  title: 'ILYAS BANK 2.0',
  description: 'Production-style fintech banking app with mobile-first UX.',
  manifest: withBasePath('/manifest.webmanifest')
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <MemeModeProvider>
          <RegisterServiceWorker />
          {children}
        </MemeModeProvider>
      </body>
    </html>
  );
}
