/**
 * About Page
 */

const AboutPage = {
  render: () => {
    return `
      <section class="section">
        <div class="container">
          <h1 style="margin-bottom: 2rem; color: var(--text-dark);">О компании</h1>

          <div class="grid grid-2" style="gap: 3rem; align-items: start;">
            <div>
              <h2 style="margin-bottom: 1rem; color: var(--text-dark);">FinTech Bank - ваш надежный партнер</h2>

              <p style="margin-bottom: 1.5rem; line-height: 1.6; color: var(--text-dark);">
                Мы - современный финтех банк, который сочетает традиции банковского дела с инновационными технологиями.
                Наша миссия - сделать финансовые услуги доступными, простыми и безопасными для каждого.
              </p>

              <div class="card" style="padding: 2rem; margin-bottom: 2rem; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
                <h3 style="margin-top: 0; margin-bottom: 1rem;">Наши ценности</h3>
                <ul style="margin: 0; padding-left: 1.2rem;">
                  <li><strong>Надежность:</strong> Ваши деньги в безопасности</li>
                  <li><strong>Инновации:</strong> Используем передовые технологии</li>
                  <li><strong>Прозрачность:</strong> Честные условия и комиссии</li>
                  <li><strong>Доступность:</strong> Финансы для всех</li>
                </ul>
              </div>
            </div>

            <div>
              <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
                <h3 style="margin-top: 0; margin-bottom: 1rem; color: var(--text-dark);">Статистика</h3>
                <div class="grid grid-2" style="gap: 1rem;">
                  <div style="text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--primary-color); margin-bottom: 0.5rem;">500K+</div>
                    <div style="color: var(--text-light); font-size: 0.9rem;">Клиентов</div>
                  </div>
                  <div style="text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--primary-color); margin-bottom: 0.5rem;">₸2.5T</div>
                    <div style="color: var(--text-light); font-size: 0.9rem;">Активов</div>
                  </div>
                  <div style="text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--primary-color); margin-bottom: 0.5rem;">99.9%</div>
                    <div style="color: var(--text-light); font-size: 0.9rem;">Uptime</div>
                  </div>
                  <div style="text-align: center;">
                    <div style="font-size: 2rem; font-weight: 700; color: var(--primary-color); margin-bottom: 0.5rem;">24/7</div>
                    <div style="color: var(--text-light); font-size: 0.9rem;">Поддержка</div>
                  </div>
                </div>
              </div>

              <div class="card" style="padding: 2rem;">
                <h3 style="margin-top: 0; margin-bottom: 1rem; color: var(--text-dark);">Наша команда</h3>
                <p style="margin-bottom: 1rem; color: var(--text-dark);">
                  Более 200 специалистов в области финансов, технологий и безопасности работают над тем,
                  чтобы сделать ваши финансы проще и безопаснее.
                </p>
                <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                  <span class="badge">Финансисты</span>
                  <span class="badge">Разработчики</span>
                  <span class="badge">Аналитики</span>
                  <span class="badge">Специалисты по безопасности</span>
                </div>
              </div>
            </div>
          </div>

          <div class="card" style="padding: 3rem; margin-top: 3rem; text-align: center; background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%);">
            <h2 style="margin-bottom: 1rem; color: var(--text-dark);">Готовы начать?</h2>
            <p style="margin-bottom: 2rem; color: var(--text-light); max-width: 600px; margin-left: auto; margin-right: auto;">
              Присоединяйтесь к тысячам клиентов, которые уже выбрали FinTech Bank для управления своими финансами.
            </p>
            <button onclick="Router.navigate('/')" class="btn" style="padding: 1rem 2rem; font-size: 1.1rem;">
              Открыть счет
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