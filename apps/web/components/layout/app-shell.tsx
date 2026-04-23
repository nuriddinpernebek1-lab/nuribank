import { ReactNode } from 'react';
import Link from 'next/link';
import { MemeToggle } from '../meme-mode/meme-toggle';
import { MobileTabBar } from './mobile-tabbar';
import { ThemeToggle } from './theme-toggle';

export function AppShell({
  children,
  heading,
  subheading
}: {
  children: ReactNode;
  heading: string;
  subheading: string;
}) {
  return (
    <div className="shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">ILYAS BANK 2.0</p>
          <h1>{heading}</h1>
          <p className="subheading">{subheading}</p>
        </div>
        <div className="topbar__actions">
          <MemeToggle />
          <ThemeToggle />
          <Link href="/login" className="button button--ghost">
            Sign in
          </Link>
          <Link href="/dashboard" className="button">
            Open app
          </Link>
        </div>
      </header>
      {children}
      <MobileTabBar />
    </div>
  );
}
