import dynamic from 'next/dynamic';
import { BalanceCard } from '../../components/dashboard/balance-card';
import { DashboardOnboarding } from '../../components/dashboard/dashboard-onboarding';
import { AppShell } from '../../components/layout/app-shell';
import { MemeCopy } from '../../components/meme-mode/meme-copy';
import { EmptyState } from '../../components/states/empty-state';
import { getDashboardSnapshot } from '../../lib/api';

const SpendingChart = dynamic(
  () => import('../../components/charts/spending-chart').then((module) => module.SpendingChart),
  {
    ssr: false,
    loading: () => <div className="chart-card">Loading analytics...</div>
  }
);

export default async function DashboardPage() {
  const snapshot = await getDashboardSnapshot();

  return (
    <AppShell heading="Customer dashboard" subheading="Balances, recent activity, FX quotes and fraud-aware transaction monitoring in one mobile-friendly surface.">
      <main className="dashboard-grid">
        <DashboardOnboarding />

        <section className="account-strip">
          {snapshot.accounts.map((account) => (
            <BalanceCard
              key={account.id}
              currency={account.currency}
              balance={account.balance}
              note={account.isPrimary ? 'Primary spending wallet' : 'Secondary currency account'}
            />
          ))}
        </section>

        <section className="quick-actions">
          <button className="button">Transfer</button>
          <button className="button button--ghost">Top up</button>
          <button className="button button--ghost">Withdraw</button>
          <button className="button button--ghost">Exchange</button>
        </section>

        <SpendingChart data={snapshot.analytics} />

        <section className="grid-two">
          <article className="panel">
            <div className="section-head">
              <div>
                <p className="eyebrow">Live market</p>
                <h2>FX board</h2>
                <MemeCopy
                  className="micro-copy"
                  defaultText="Exchange rates update quietly in the background."
                  memeText="FX board is calm right now. No currency drama, just vibes and decimals."
                />
              </div>
            </div>
            <div className="list">
              {snapshot.rates.map((rate) => (
                <div className="list-row" key={rate.pair}>
                  <span>{rate.pair}</span>
                  <strong>{rate.rate}</strong>
                </div>
              ))}
            </div>
          </article>

          <article className="panel">
            <div className="section-head">
              <div>
                <p className="eyebrow">Alerts</p>
                <h2>Notification center</h2>
              </div>
            </div>
            <div className="list">
              {snapshot.notifications.map((notification) => (
                <div key={notification.id} className="notification-card">
                  <strong>{notification.title}</strong>
                  <p>{notification.body}</p>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="panel">
          <div className="section-head">
            <div>
              <p className="eyebrow">Recent operations</p>
              <h2>Transaction history</h2>
              <MemeCopy
                className="micro-copy"
                defaultText="Latest ledger activity across your wallets."
                memeText="Your financial lore, now in chronological order."
              />
            </div>
          </div>
          <div className="list">
            {snapshot.transactions.map((transaction) => (
              <div className="list-row" key={transaction.id}>
                <div>
                  <strong>{transaction.description || transaction.type}</strong>
                  <p>{new Date(transaction.createdAt).toLocaleString()}</p>
                </div>
                <div className="list-row__side">
                  <strong>{transaction.amount.toLocaleString()} {transaction.currency}</strong>
                  <span className={`badge badge--${transaction.status.toLowerCase()}`}>{transaction.status}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="panel">
          <div className="section-head">
            <div>
              <p className="eyebrow">Waiting room</p>
              <h2>Disputes queue</h2>
            </div>
          </div>
          <EmptyState
            title="Nothing needs attention"
            strictMessage="No active charge disputes or unresolved operations."
            memeMessage="Inbox is clear. Fraud team currently has zero plot twists."
          />
        </section>
      </main>
    </AppShell>
  );
}
