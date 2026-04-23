import { AppShell } from '../../components/layout/app-shell';

export default function TransfersPage() {
  return (
    <AppShell heading="Money transfer flow" subheading="Designed specifically for phones: thumb-friendly inputs, concise confirmations and fast repeat actions.">
      <main className="transfer-layout">
        <section className="panel">
          <div className="section-head">
            <div>
              <p className="eyebrow">New transfer</p>
              <h2>Send money in seconds</h2>
            </div>
          </div>
          <form className="transfer-form">
            <label>
              From account
              <select defaultValue="KZT">
                <option>KZT main account</option>
                <option>USD wallet</option>
                <option>EUR wallet</option>
              </select>
            </label>
            <label>
              Recipient email
              <input type="email" placeholder="client2@ilyasbank.demo" />
            </label>
            <label>
              Amount
              <input type="number" placeholder="150000" />
            </label>
            <label>
              Note
              <input type="text" placeholder="Invoice payment" />
            </label>
            <button className="button" type="submit">
              Review transfer
            </button>
          </form>
        </section>

        <section className="panel transfer-aside">
          <h2>Risk & limits</h2>
          <ul className="bullets">
            <li>Daily outbound cap: 1 500 000 KZT</li>
            <li>Large transfers are flagged for manual review</li>
            <li>2FA challenge required for sensitive flows</li>
            <li>Recipient verification runs before execution</li>
          </ul>
        </section>
      </main>
    </AppShell>
  );
}
