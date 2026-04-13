/**
 * Support Page
 */

const SupportPage = {
  render: () => {
    return `
      <section class="section">
        <div class="container">
          <h1 style="margin-bottom: 2rem; color: var(--text-dark);">Поддержка</h1>

          <div class="grid grid-2" style="gap: 3rem;">
            <div>
              <h2 style="margin-bottom: 1.5rem; color: var(--text-dark);">Как мы можем помочь?</h2>

              <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
                <h3 style="margin-top: 0; margin-bottom: 1rem; color: var(--text-dark);">Популярные вопросы</h3>
                <div style="space-y: 1rem;">
                  <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
                    <button onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block'" style="background: none; border: none; color: var(--text-dark); font-weight: 600; cursor: pointer; width: 100%; text-align: left;">
                      Как открыть счет? →
                    </button>
                    <div style="display: none; margin-top: 0.5rem; color: var(--text-light);">
                      Зарегистрируйтесь в приложении и следуйте инструкциям верификации.
                    </div>
                  </div>

                  <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
                    <button onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block'" style="background: none; border: none; color: var(--text-dark); font-weight: 600; cursor: pointer; width: 100%; text-align: left;">
                      Как получить кредит? →
                    </button>
                    <div style="display: none; margin-top: 0.5rem; color: var(--text-light);">
                      Перейдите в раздел "Кредиты" и заполните заявку онлайн.
                    </div>
                  </div>

                  <div style="border-bottom: 1px solid var(--border-color); padding-bottom: 1rem;">
                    <button onclick="this.nextElementSibling.style.display = this.nextElementSibling.style.display === 'block' ? 'none' : 'block'" style="background: none; border: none; color: var(--text-dark); font-weight: 600; cursor: pointer; width: 100%; text-align: left;">
                      Безопасны ли переводы? →
                    </button>
                    <div style="display: none; margin-top: 0.5rem; color: var(--text-light);">
                      Все переводы защищены шифрованием и соответствуют стандартам безопасности.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
                <h3 style="margin-top: 0; margin-bottom: 1rem; color: var(--text-dark);">Связаться с нами</h3>

                <div style="margin-bottom: 1.5rem;">
                  <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                    <div style="font-size: 1.5rem; margin-right: 1rem;">📞</div>
                    <div>
                      <div style="font-weight: 600; color: var(--text-dark);">Телефон</div>
                      <div style="color: var(--text-light);">+7 (727) 123-45-67</div>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; margin-bottom: 1rem;">
                    <div style="font-size: 1.5rem; margin-right: 1rem;">✉️</div>
                    <div>
                      <div style="font-weight: 600; color: var(--text-dark);">Email</div>
                      <div style="color: var(--text-light);">support@fintech.kz</div>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center;">
                    <div style="font-size: 1.5rem; margin-right: 1rem;">💬</div>
                    <div>
                      <div style="font-weight: 600; color: var(--text-dark);">Чат</div>
                      <div style="color: var(--text-light);">Онлайн 24/7</div>
                    </div>
                  </div>
                </div>

                <button onclick="Router.navigate('/contacts')" class="btn btn-primary" style="width: 100%;">
                  Подробные контакты
                </button>
              </div>

              <div class="card" style="padding: 2rem;">
                <h3 style="margin-top: 0; margin-bottom: 1rem; color: var(--text-dark);">Часто задаваемые вопросы</h3>
                <p style="margin-bottom: 1.5rem; color: var(--text-light);">
                  Найдите ответы на популярные вопросы в нашем разделе FAQ.
                </p>
                <button onclick="Router.navigate('/faq')" class="btn btn-outline" style="width: 100%;">
                  Перейти к FAQ
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