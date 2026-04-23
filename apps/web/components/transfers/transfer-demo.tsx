'use client';

import { FormEvent } from 'react';
import { MemeSticker } from '../meme-mode/meme-sticker';
import { useMemeMode } from '../meme-mode/meme-mode-provider';
import { MemeToastDemo } from '../meme-mode/meme-toast-demo';
import { EmptyState } from '../states/empty-state';

export function TransferDemo() {
  const { enabled } = useMemeMode();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  };

  return (
    <main className="transfer-layout">
      <section className="panel">
        <div className="section-head">
          <div>
            <p className="eyebrow">New transfer</p>
            <h2>{enabled ? 'Send money. Stay iconic.' : 'Send money in seconds'}</h2>
          </div>
        </div>
        <form className="transfer-form" onSubmit={onSubmit}>
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
        <MemeToastDemo
          successText="Transfer completed successfully."
          memeSuccessText="Transfer sent. Wallet said: understood the assignment."
          errorText="Transfer failed. Please verify balance and recipient details."
          memeErrorText="Transfer flopped. The ledger was not emotionally available for that move."
        />
      </section>

      <section className="panel transfer-aside">
        <h2>Risk & limits</h2>
        <ul className="bullets">
          <li>Daily outbound cap: 1 500 000 KZT</li>
          <li>Large transfers are flagged for manual review</li>
          <li>2FA challenge required for sensitive flows</li>
          <li>Recipient verification runs before execution</li>
        </ul>
        <MemeSticker
          label="(._.)"
          caption="Fraud engine watching every suspicious transfer like it saw the comments."
        />
      </section>

      <section className="panel">
        <div className="section-head">
          <div>
            <p className="eyebrow">Empty state</p>
            <h2>Scheduled transfers</h2>
          </div>
        </div>
        <EmptyState
          title="No scheduled transfers yet"
          strictMessage="Create recurring payouts once payroll or subscriptions are configured."
          memeMessage="No recurring transfers yet. Your money is free-range and currently unbooked."
        />
      </section>
    </main>
  );
}
