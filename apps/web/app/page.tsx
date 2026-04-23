import Link from 'next/link';
import { AppShell } from '../components/layout/app-shell';
import { MemeCopy } from '../components/meme-mode/meme-copy';
import { MemeSticker } from '../components/meme-mode/meme-sticker';

const features = [
  'JWT + refresh tokens + 2FA',
  'Multi-currency balances and FX rates',
  'Fraud flags, limits and admin review',
  'PWA install, push-ready service worker, mobile tab bar'
];

export default function HomePage() {
  return (
    <AppShell
      heading="Banking product that feels like a real fintech launch"
      subheading="The prototype is upgraded into a realistic platform with secure auth, transaction domain logic, admin tooling and a dedicated mobile experience."
    >
      <main className="hero-grid">
        <section className="hero-card">
          <p className="eyebrow">Startup-grade architecture</p>
          <h2>Fast dashboard, secure backend, ready for product growth</h2>
          <MemeCopy
            className="muted-copy"
            defaultText="Next.js renders the customer app, NestJS runs banking APIs, and PostgreSQL stores balances, transactions, alerts and audit logs."
            memeText="Next.js keeps it fast, NestJS keeps it serious, and PostgreSQL remembers every money move like it has receipts."
          />
          <div className="hero-actions">
            <Link href="/dashboard" className="button">
              Launch dashboard
            </Link>
            <Link href="/login" className="button button--ghost">
              Try auth flow
            </Link>
          </div>
          <MemeSticker
            label="(^^)"
            caption="Onboarding energy: sleek fintech in public, tiny internet brain in private."
          />
        </section>

        <section className="glass-panel">
          <div className="kpi">
            <span>Customer funds overview</span>
            <strong>1 280 450 KZT</strong>
          </div>
          <div className="kpi">
            <span>FX conversion latency</span>
            <strong>120 ms</strong>
          </div>
          <div className="kpi">
            <span>Flagged transactions</span>
            <strong>14 today</strong>
          </div>
        </section>

        <section className="feature-grid">
          {features.map((feature) => (
            <article key={feature} className="feature-card">
              <h3>{feature}</h3>
              <p className="muted-copy">Built to feel closer to a banking app than a marketing mockup.</p>
            </article>
          ))}
        </section>
      </main>
    </AppShell>
  );
}
