/**
 * Terms Page
 */

const TermsPage = {
  render: () => {
    return `
      <section class="section">
        <div class="container">
          <h1 style="margin-bottom: 2rem; color: var(--text-dark);">Пользовательское соглашение</h1>

          <div class="card" style="padding: 3rem;">
            <h2 style="margin-bottom: 1.5rem; color: var(--text-dark);">1. Общие условия</h2>
            <p style="margin-bottom: 1.5rem; line-height: 1.6; color: var(--text-dark);">
              Используя сервисы FinTech Bank, вы соглашаетесь с настоящими условиями использования.
              Пожалуйста, внимательно прочитайте соглашение перед использованием услуг.
            </p>

            <h2 style="margin-bottom: 1.5rem; color: var(--text-dark);">2. Услуги банка</h2>
            <p style="margin-bottom: 1.5rem; line-height: 1.6; color: var(--text-dark);">
              Банк предоставляет услуги открытия счетов, переводов, кредитования, платежей и другие
              финансовые услуги в соответствии с законодательством Республики Казахстан.
            </p>

            <h2 style="margin-bottom: 1.5rem; color: var(--text-dark);">3. Обязанности пользователя</h2>
            <p style="margin-bottom: 1.5rem; line-height: 1.6; color: var(--text-dark);">
              Пользователь обязуется предоставлять достоверную информацию, соблюдать правила безопасности,
              своевременно погашать кредиты и не использовать сервисы для незаконных целей.
            </p>

            <h2 style="margin-bottom: 1.5rem; color: var(--text-dark);">4. Ответственность</h2>
            <p style="margin-bottom: 1.5rem; line-height: 1.6; color: var(--text-dark);">
              Банк несет ответственность за надлежащее предоставление услуг в соответствии с договорами.
              Пользователь несет ответственность за сохранность своих учетных данных.
            </p>

            <div style="margin-top: 3rem; padding-top: 2rem; border-top: 1px solid var(--border-color); text-align: center;">
              <p style="color: var(--text-light);">
                Последнее обновление: ${new Date().toLocaleDateString('ru-RU')}
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init: () => {
    // Ничего не нужно инициализировать
  }
};