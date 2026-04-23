import { MemeCopy } from '../../components/meme-mode/meme-copy';

export default function DashboardLoading() {
  return (
    <main className="shell">
      <section className="panel">
        <p className="eyebrow">Loading</p>
        <h2>Preparing accounts, analytics and recent activity...</h2>
        <MemeCopy
          className="micro-copy"
          defaultText="Fetching balances and transaction summaries."
          memeText="Summoning your balances. The ledger is doing its little loading dance."
        />
      </section>
    </main>
  );
}
