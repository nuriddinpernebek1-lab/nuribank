import { AppShell } from '../../components/layout/app-shell';

const users = [
  { id: 'u1', name: 'Client 1', risk: 'Low', status: 'Active' },
  { id: 'u2', name: 'Client 7', risk: 'Medium', status: 'Under review' },
  { id: 'u3', name: 'Client 10', risk: 'High', status: 'Flagged' }
];

export default function AdminPage() {
  return (
    <AppShell heading="Admin operations panel" subheading="Role-based control surface for reviewing users, transactions, alerts and suspicious activity.">
      <main className="dashboard-grid">
        <section className="account-strip">
          <article className="balance-card">
            <span>Total customers</span>
            <strong>12</strong>
            <small>Seeded demo users</small>
          </article>
          <article className="balance-card">
            <span>Transactions</span>
            <strong>1 200+</strong>
            <small>Historical seeded ledger</small>
          </article>
          <article className="balance-card">
            <span>Flagged</span>
            <strong>48</strong>
            <small>Waiting for analyst review</small>
          </article>
        </section>

        <section className="panel">
          <div className="section-head">
            <div>
              <p className="eyebrow">Operations</p>
              <h2>User risk queue</h2>
            </div>
          </div>
          <div className="list">
            {users.map((user) => (
              <div key={user.id} className="list-row">
                <div>
                  <strong>{user.name}</strong>
                  <p>{user.status}</p>
                </div>
                <span className={`badge badge--${user.risk.toLowerCase()}`}>{user.risk}</span>
              </div>
            ))}
          </div>
        </section>
      </main>
    </AppShell>
  );
}
