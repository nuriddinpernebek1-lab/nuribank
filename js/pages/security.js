/**
 * Security Page
 */

const SecurityPage = {
  render: () => {
    return `
      <section class="section">
        <div class="container">
          <h1 style="margin-bottom: 2rem; color: var(--text-dark);">Безопасность</h1>

          <div class="grid grid-2" style="gap: 3rem;">
            <div>
              <h2 style="margin-bottom: 1.5rem; color: var(--text-dark);">Ваша безопасность - наш приоритет</h2>

              <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
                <h3 style="margin-top: 0; margin-bottom: 1rem; color: var(--text-dark);">🛡️ Защита данных</h3>
                <p style="margin-bottom: 1rem; color: var(--text-light);">
                  Все данные шифруются с использованием 256-битного SSL/TLS шифрования.
                </p>
              </div>

              <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
                <h3 style="margin-top: 0; margin-bottom: 1rem; color: var(--text-dark);">🔐 Аутентификация</h3>
                <p style="margin-bottom: 1rem; color: var(--text-light);">
                  Многофакторная аутентификация и биометрическая верификация.
                </p>
              </div>

              <div class="card" style="padding: 2rem;">
                <h3 style="margin-top: 0; margin-bottom: 1rem; color: var(--text-dark);">👁️ Мониторинг</h3>
                <p style="margin-bottom: 1rem; color: var(--text-light);">
                  Круглосуточный мониторинг транзакций на предмет подозрительной активности.
                </p>
              </div>
            </div>

            <div>
              <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
                <h3 style="margin-top: 0; margin-bottom: 1.5rem; color: var(--text-dark);">Советы по безопасности</h3>

                <div style="margin-bottom: 1.5rem;">
                  <h4 style="margin-bottom: 0.5rem; color: var(--text-dark);">Не делитесь паролем</h4>
                  <p style="margin: 0; color: var(--text-light); font-size: 0.9rem;">
                    Никогда не сообщайте пароль от аккаунта третьим лицам.
                  </p>
                </div>

                <div style="margin-bottom: 1.5rem;">
                  <h4 style="margin-bottom: 0.5rem; color: var(--text-dark);">Используйте сложные пароли</h4>
                  <p style="margin: 0; color: var(--text-light); font-size: 0.9rem;">
                    Комбинируйте буквы, цифры и специальные символы.
                  </p>
                </div>

                <div style="margin-bottom: 1.5rem;">
                  <h4 style="margin-bottom: 0.5rem; color: var(--text-dark);">Проверяйте URL</h4>
                  <p style="margin: 0; color: var(--text-light); font-size: 0.9rem;">
                    Убедитесь, что вы находитесь на официальном сайте банка.
                  </p>
                </div>

                <div>
                  <h4 style="margin-bottom: 0.5rem; color: var(--text-dark);">Выходите из аккаунта</h4>
                  <p style="margin: 0; color: var(--text-light); font-size: 0.9rem;">
                    Всегда выходите из аккаунта на общественных устройствах.
                  </p>
                </div>
              </div>

              <div class="card" style="padding: 2rem;">
                <h3 style="margin-top: 0; margin-bottom: 1rem; color: var(--text-dark);">Сообщить о проблеме</h3>
                <p style="margin-bottom: 1.5rem; color: var(--text-light);">
                  Если вы подозреваете мошенничество или обнаружили уязвимость, немедленно свяжитесь с нами.
                </p>
                <button onclick="Router.navigate('/support')" class="btn btn-primary" style="width: 100%;">
                  Сообщить о проблеме
                </button>
              </div>
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