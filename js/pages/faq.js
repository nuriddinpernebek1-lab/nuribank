/**
 * FAQ Page
 */

const FAQPage = {
  render: () => {
    return `
      <section class="section">
        <div class="container">
          <h1 style="margin-bottom: 2rem; color: var(--text-dark);">Часто задаваемые вопросы</h1>

          <div class="card" style="padding: 2rem;">
            <div style="max-width: 800px; margin: 0 auto;">
              <div style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem; color: var(--text-dark);">Регистрация и вход</h3>

                <div style="margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
                  <button onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block'" style="background: none; border: none; color: var(--text-dark); font-weight: 600; cursor: pointer; width: 100%; text-align: left;">
                    Как зарегистрироваться в приложении? →
                  </button>
                  <div style="display: none; margin-top: 0.5rem; color: var(--text-light);">
                    Нажмите "Регистрация" на главной странице, заполните форму с именем, email и телефоном, подтвердите email и установите пароль.
                  </div>
                </div>

                <div style="margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
                  <button onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block'" style="background: none; border: none; color: var(--text-dark); font-weight: 600; cursor: pointer; width: 100%; text-align: left;">
                    Забыл пароль, что делать? →
                  </button>
                  <div style="display: none; margin-top: 0.5rem; color: var(--text-light);">
                    На странице входа нажмите "Забыли пароль?", введите email и следуйте инструкциям в письме.
                  </div>
                </div>
              </div>

              <div style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem; color: var(--text-dark);">Безопасность</h3>

                <div style="margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
                  <button onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block'" style="background: none; border: none; color: var(--text-dark); font-weight: 600; cursor: pointer; width: 100%; text-align: left;">
                    Безопасны ли мои деньги? →
                  </button>
                  <div style="display: none; margin-top: 0.5rem; color: var(--text-light);">
                    Да, мы используем банковские стандарты безопасности, шифрование и соответствуем всем регуляторным требованиям.
                  </div>
                </div>
              </div>

              <div style="margin-bottom: 2rem;">
                <h3 style="margin-bottom: 1rem; color: var(--text-dark);">Услуги</h3>

                <div style="margin-bottom: 1rem; border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
                  <button onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block'" style="background: none; border: none; color: var(--text-dark); font-weight: 600; cursor: pointer; width: 100%; text-align: left;">
                    Как получить кредит? →
                  </button>
                  <div style="display: none; margin-top: 0.5rem; color: var(--text-light);">
                    В разделе "Кредиты" заполните онлайн-заявку. Решение принимается в течение 15 минут.
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div style="text-align: center; margin-top: 3rem;">
            <p style="color: var(--text-light); margin-bottom: 1rem;">Не нашли ответ на свой вопрос?</p>
            <button onclick="Router.navigate('/support')" class="btn btn-primary">
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

// 🔴 ВАЖНО: сделать доступным глобально
window.FAQPage = FAQPage;