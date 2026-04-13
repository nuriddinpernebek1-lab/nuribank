/**
 * Privacy Page
 */

const PrivacyPage = {
  render: () => {
    return `
      <section class="section">
        <div class="container">
          <h1 style="margin-bottom: 2rem; color: var(--text-dark);">Политика конфиденциальности</h1>

          <div class="card" style="padding: 3rem;">
            <h2 style="margin-bottom: 1.5rem; color: var(--text-dark);">1. Общие положения</h2>
            <p style="margin-bottom: 1.5rem; line-height: 1.6; color: var(--text-dark);">
              Настоящая политика конфиденциальности определяет порядок обработки и защиты информации о физических лицах,
              использующих сервисы FinTech Bank.
            </p>

            <h2 style="margin-bottom: 1.5rem; color: var(--text-dark);">2. Собираемая информация</h2>
            <p style="margin-bottom: 1.5rem; line-height: 1.6; color: var(--text-dark);">
              Мы собираем информацию, которую вы предоставляете нам непосредственно: имя, email, телефон,
              данные банковских карт и другую информацию, необходимую для предоставления услуг.
            </p>

            <h2 style="margin-bottom: 1.5rem; color: var(--text-dark);">3. Использование информации</h2>
            <p style="margin-bottom: 1.5rem; line-height: 1.6; color: var(--text-dark);">
              Собранная информация используется для предоставления банковских услуг, улучшения качества сервиса,
              обеспечения безопасности и соблюдения требований законодательства.
            </p>

            <h2 style="margin-bottom: 1.5rem; color: var(--text-dark);">4. Защита данных</h2>
            <p style="margin-bottom: 1.5rem; line-height: 1.6; color: var(--text-dark);">
              Мы применяем современные технические и организационные меры защиты информации,
              включая шифрование данных и многофакторную аутентификацию.
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