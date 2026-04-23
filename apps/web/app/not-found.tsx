import Link from 'next/link';
import { MemeCopy } from '../components/meme-mode/meme-copy';

export default function NotFound() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">404</p>
        <h1>Page not found</h1>
        <MemeCopy
          defaultText="The page you requested does not exist or was moved."
          memeText="This page dipped. Very offline behavior."
        />
        <div className="hero-actions">
          <Link href="/" className="button">
            Back home
          </Link>
          <Link href="/dashboard" className="button button--ghost">
            Open dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}
