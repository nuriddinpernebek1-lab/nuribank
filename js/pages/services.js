/**
 * Services Page
 */

const ServicesPage = {
  render: () => {
    return `
      <section class="section">
        <div class="container">
          <h1 style="margin-bottom: 2rem; color: var(--text-dark);">Наши сервисы</h1>

          <div class="grid grid-3" style="gap: 2rem; margin-bottom: 3rem;">
            <div class="card" style="padding: 2rem; text-align: center;">
              <div style="font-size: 3rem; margin-bottom: 1rem;">💳</div>
              <h3 style="margin-bottom: 1rem; color: var(--text-dark);">Банковские карты</h3>
              <p style="margin-bottom: 1.5rem; color: var(--text-light);">
                Дебетовые и кредитные карты с выгодными условиями и кэшбеком до 10%.
              </p>
              <button onclick="Router.navigate('/cards')" class="btn btn-primary">Подробнее</button>
            </div>

            <div class="card" style="padding: 2rem; text-align: center;">
              <div style="font-size: 3rem; margin-bottom: 1rem;">💰</div>
              <h3 style="margin-bottom: 1rem; color: var(--text-dark);">Кредиты</h3>
              <p style="margin-bottom: 1.5rem; color: var(--text-light);">
                Кредиты на любые цели от 50K до 5M ₸ с гибкими условиями погашения.
              </p>
              <button onclick="Router.navigate('/credits')" class="btn btn-primary">Подробнее</button>
            </div>

            <div class="card" style="padding: 2rem; text-align: center;">
              <div style="font-size: 3rem; margin-bottom: 1rem;">🏦</div>
              <h3 style="margin-bottom: 1rem; color: var(--text-dark);">Депозиты</h3>
              <p style="margin-bottom: 1.5rem; color: var(--text-light);">
                Накопительные счета с понятными условиями, прогнозом дохода и быстрым пополнением.
              </p>
              <button class="btn btn-outline">Скоро</button>
            </div>

            <div class="card" style="padding: 2rem; text-align: center;">
              <div style="font-size: 3rem; margin-bottom: 1rem;">↗️</div>
              <h3 style="margin-bottom: 1rem; color: var(--text-dark);">Переводы</h3>
              <p style="margin-bottom: 1.5rem; color: var(--text-light);">
                Мгновенные переводы между картами и на другие банки без комиссий.
              </p>
              <button onclick="Router.navigate('/transfers')" class="btn btn-primary">Подробнее</button>
            </div>

            <div class="card" style="padding: 2rem; text-align: center;">
              <div style="font-size: 3rem; margin-bottom: 1rem;">📊</div>
              <h3 style="margin-bottom: 1rem; color: var(--text-dark);">Инвестиции</h3>
              <p style="margin-bottom: 1.5rem; color: var(--text-light);">
                Инвестиционные продукты с гарантированной доходностью.
              </p>
              <button class="btn btn-outline">Скоро</button>
            </div>

            <div class="card" style="padding: 2rem; text-align: center;">
              <div style="font-size: 3rem; margin-bottom: 1rem;">🏠</div>
              <h3 style="margin-bottom: 1rem; color: var(--text-dark);">Ипотека</h3>
              <p style="margin-bottom: 1.5rem; color: var(--text-light);">
                Ипотечные кредиты на покупку жилья с низкими процентными ставками.
              </p>
              <button class="btn btn-outline">Скоро</button>
            </div>
          </div>

          <div class="card" style="padding: 3rem; text-align: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
            <h2 style="margin-bottom: 1rem;">Нужен другой сервис?</h2>
            <p style="margin-bottom: 2rem; opacity: 0.9;">
              Свяжитесь с нашей поддержкой, и мы поможем подобрать оптимальное решение для ваших нужд.
            </p>
            <button onclick="Router.navigate('/support')" class="btn" style="background: white; color: #667eea; border: none;">
              Связаться с поддержкой
            </button>
          </div>
        </div>
      </section>
    `;
  },

  init: () => {
    // Ничего не нужно инициализировать
  }
};
