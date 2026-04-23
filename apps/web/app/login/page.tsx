import Link from 'next/link';

export default function LoginPage() {
  return (
    <main className="auth-page">
      <section className="auth-card">
        <p className="eyebrow">Secure access</p>
        <h1>Sign in to ILYAS BANK</h1>
        <p className="subheading">Access tokens stay short-lived, refresh tokens rotate, and 2FA is ready for TOTP apps.</p>
        <form className="auth-form">
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
        <p className="muted-copy">
          Demo credentials are seeded on the backend. After wiring fetch calls, this page can post to
          <code> /api/auth/login</code>.
        </p>
        <Link href="/" className="link-back">
          Back to overview
        </Link>
      </section>
    </main>
  );
}
