/**
 * Transfers Page
 */

const TransfersPage = {
  render: () => {
    return `
      <section class="section">
        <div class="container">
          <h1 style="margin-bottom: 2rem; color: var(--text-dark);">Переводы</h1>

          <div class="grid grid-2" style="gap: 2rem;">
            <!-- Форма перевода -->
            <div class="card" style="padding: 2rem;">
              <h2 style="margin-top: 0; margin-bottom: 1.5rem; color: var(--text-dark);">Отправить деньги</h2>

              <form id="transfer-form">
                ${Components.input('tel', '+7 700 000 0000', {
                  label: 'Телефон получателя',
                  name: 'recipientPhone',
                  required: true
                })}

                ${Components.input('text', 'Иван Сидоров', {
                  label: 'Имя получателя',
                  name: 'recipientName',
                  required: true
                })}

                ${Components.input('number', '', {
                  label: 'Сумма (₸)',
                  name: 'amount',
                  type: 'number',
                  required: true
                })}

                <div class="form-group" style="margin-bottom: 1.5rem;">
                  <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text-dark);">Сообщение (опционально)</label>
                  <textarea id="transfer-message" placeholder="Добавьте сообщение..." style="
                    width: 100%;
                    padding: 10px;
                    border-radius: 8px;
                    border: 1px solid var(--border-color);
                    font-size: 0.95rem;
                    font-family: inherit;
                    resize: vertical;
                    min-height: 80px;
                  "></textarea>
                </div>

                <button type="submit" class="btn btn-green" style="
                  width: 100%;
                  padding: 12px;
                  background: var(--success-color);
                  color: white;
                  border: none;
                  border-radius: 8px;
                  font-weight: 600;
                  cursor: pointer;
                  font-size: 1rem;
                  transition: all 0.2s ease;
                " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
                  Отправить →
                </button>

                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color); font-size: 0.85rem; color: var(--text-light);">
                  <p style="margin: 0 0 0.5rem 0;"><strong>✓ Без комиссии</strong></p>
                  <p style="margin: 0;">Переводы между друзьями и семьей совершенно бесплатны</p>
                </div>
              </form>
            </div>

            <!-- Последние переводы -->
            <div class="card" style="padding: 2rem;">
              <h2 style="margin-top: 0; margin-bottom: 1rem; color: var(--text-dark);">Последние переводы</h2>
              
              ${(() => {
                const transfers = TransactionsModule.getTransactions().filter(tx => tx.type === 'TRANSFER').slice(0, 5);
                return transfers.length > 0 
                  ? transfers.map(tx => `
                      <div style="padding: 0.75rem 0; border-bottom: 1px solid var(--border-color);">
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.25rem;">
                          <strong style="color: var(--text-dark);">${Sanitizer.escapeHTML(tx.description)}</strong>
                          <span style="color: var(--success-color); font-weight: 600;">-${formatPrice(tx.amount)} ₸</span>
                        </div>
                        <p style="margin: 0; font-size: 0.8rem; color: var(--text-light);">
                          ${new Date(tx.createdAt).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                    `).join('')
                  : '<p style="color: var(--text-light); text-align: center;">Переводов еще нет</p>';
              })()}
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init: () => {
    const form = document.getElementById('transfer-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const recipientPhone = form.querySelector('[name="recipientPhone"]').value;
      const recipientName = form.querySelector('[name="recipientName"]').value;
      const amount = Number(form.querySelector('[name="amount"]').value);
      const message = document.getElementById('transfer-message').value;

      try {
        await TransactionsModule.createTransaction('TRANSFER', amount, {
          description: `Перевод ${recipientName}`,
          toUser: recipientPhone,
          metadata: { message }
        });

        form.reset();
      } catch (error) {
        // Ошибка выведена
      }
    });
  }
};
