'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { MemeSticker } from '../meme-mode/meme-sticker';
import { useMemeMode } from '../meme-mode/meme-mode-provider';

export function LoginDemoForm() {
  const { enabled } = useMemeMode();
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(
      enabled
        ? "Password said 'be serious' and your keyboard chose chaos. Try the seeded demo credentials."
        : 'Invalid login attempt. Use the seeded demo credentials to continue.'
    );
  };

  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">Secure access</p>
        <h1>{enabled ? 'Sign in, main character of finance' : 'Sign in to ILYAS BANK'}</h1>
        <p className="subheading">
          {enabled
            ? 'Access tokens stay short-lived. Your vibe can stay long-lived.'
            : 'Access tokens stay short-lived, refresh tokens rotate, and 2FA is ready for TOTP apps.'}
        </p>
        <form className="auth-form" onSubmit={onSubmit}>
          <label>
            Email
            <input type="email" placeholder="client1@ilyasbank.demo" />
          </label>
          <label>
            Password
            <input type="password" placeholder="DemoBank123!" />
          </label>
          <label>
            2FA code
            <input type="text" placeholder="123456" />
          </label>
          <button className="button" type="submit">
            Sign in
          </button>
        </form>
        {error ? <div className="inline-alert inline-alert--error">{error}</div> : null}
        <p className="muted-copy">
          Demo credentials are seeded on the backend. After wiring fetch calls, this page can post to
          <code> /api/auth/login</code>.
        </p>
        <Link href="/" className="link-back">
          Back to overview
        </Link>
        <MemeSticker
          label="(o_o)"
          caption="When the password field judges you silently, but with enterprise-grade encryption."
        />
      </section>
    </main>
  );
}
