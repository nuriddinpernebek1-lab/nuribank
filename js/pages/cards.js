/**
 * Cards Page
 */

const CardsPage = {
  render: () => {
    const isAuthenticated = Store.getValue('isAuthenticated');

    const cards = [
      {
        name: 'Everyday',
        type: 'Дебетовая карта',
        accent: '#667eea',
        price: '0 ₸',
        perks: ['Бесплатное обслуживание', 'Кэшбэк до 5%', 'Мгновенные переводы']
      },
      {
        name: 'Travel',
        type: 'Карта для поездок',
        accent: '#10B981',
        price: '990 ₸/мес',
        perks: ['Снятие без комиссии', 'Страхование в поездках', 'Кэшбэк за билеты']
      },
      {
        name: 'Premium',
        type: 'Премиальная карта',
        accent: '#F59E0B',
        price: '2 990 ₸/мес',
        perks: ['Повышенный кэшбэк', 'Priority support', 'Лимиты для крупных операций']
      }
    ];

    return `
      <section class="section">
        <div class="container">
          <div style="max-width: 760px; margin-bottom: 2.5rem;">
            <h1 style="margin-bottom: 1rem; color: var(--text-dark);">Банковские карты</h1>
            <p style="font-size: 1.1rem; color: var(--text-light); margin: 0;">
              Выберите карту для ежедневных платежей, поездок или премиального обслуживания.
            </p>
          </div>

          <div class="grid grid-3" style="gap: 2rem; margin-bottom: 3rem;">
            ${cards.map(card => `
              <article class="card" style="padding: 0; overflow: hidden;">
                <div style="
                  min-height: 180px;
                  padding: 1.5rem;
                  background: linear-gradient(135deg, ${card.accent}, #0F172A);
                  color: white;
                  display: flex;
                  flex-direction: column;
                  justify-content: space-between;
                ">
                  <div style="font-size: 0.85rem; opacity: 0.8;">ILYAS BANK</div>
                  <div>
                    <div style="font-size: 1.5rem; font-weight: 700;">${card.name}</div>
                    <div style="opacity: 0.8;">•••• 4821</div>
                  </div>
                </div>

                <div style="padding: 1.5rem;">
                  <p style="margin: 0 0 0.5rem 0; color: var(--text-light);">${card.type}</p>
                  <h3 style="margin: 0 0 1rem 0; color: var(--text-dark);">${card.price}</h3>
                  <ul style="margin: 0 0 1.5rem 0; padding-left: 1.2rem; color: var(--text-dark);">
                    ${card.perks.map(perk => `<li style="margin-bottom: 0.5rem;">${perk}</li>`).join('')}
                  </ul>
                  <button class="btn btn-primary" style="width: 100%;" onclick="Router.navigate('${isAuthenticated ? '/profile' : '/register'}')">
                    ${isAuthenticated ? 'Оформить' : 'Создать аккаунт'}
                  </button>
                </div>
              </article>
            `).join('')}
          </div>

          <div class="card" style="padding: 2rem; background: #F9FAFB; border: 1px solid var(--border-color);">
            <h2 style="margin-top: 0; color: var(--text-dark);">Что включено</h2>
            <div class="grid grid-3" style="gap: 1.5rem;">
              <div>
                <h3 style="margin-bottom: 0.5rem;">Безопасность</h3>
                <p style="margin: 0; color: var(--text-light);">Подтверждение операций и быстрая блокировка карты.</p>
              </div>
              <div>
                <h3 style="margin-bottom: 0.5rem;">Контроль</h3>
                <p style="margin: 0; color: var(--text-light);">Лимиты, история операций и баланс в личном кабинете.</p>
              </div>
              <div>
                <h3 style="margin-bottom: 0.5rem;">Поддержка</h3>
                <p style="margin: 0; color: var(--text-light);">Помощь по карте через раздел поддержки.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init: () => {}
};

window.CardsPage = CardsPage;
