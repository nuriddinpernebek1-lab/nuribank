/**
 * Contacts Page
 */

const ContactsPage = {
  render: () => {
    return `
      <section class="section">
        <div class="container">
          <h1 style="margin-bottom: 2rem; color: var(--text-dark);">Контакты</h1>

          <div class="grid grid-2" style="gap: 3rem;">
            <div>
              <h2 style="margin-bottom: 1.5rem; color: var(--text-dark);">Свяжитесь с нами</h2>

              <div class="card" style="padding: 2rem;">
                <div style="margin-bottom: 2rem;">
                  <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div style="font-size: 2rem; margin-right: 1rem;">📍</div>
                    <div>
                      <div style="font-weight: 600; color: var(--text-dark);">Адрес офиса</div>
                      <div style="color: var(--text-light);">г. Алматы, ул. Абая 123, БЦ "Нурлы Тау"</div>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div style="font-size: 2rem; margin-right: 1rem;">📞</div>
                    <div>
                      <div style="font-weight: 600; color: var(--text-dark);">Телефон</div>
                      <div style="color: var(--text-light);">+7 (727) 123-45-67</div>
                      <div style="color: var(--text-light); font-size: 0.9rem;">Пн-Пт: 9:00-18:00</div>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center; margin-bottom: 1.5rem;">
                    <div style="font-size: 2rem; margin-right: 1rem;">✉️</div>
                    <div>
                      <div style="font-weight: 600; color: var(--text-dark);">Email</div>
                      <div style="color: var(--text-light);">info@fintech.kz</div>
                      <div style="color: var(--text-light); font-size: 0.9rem;">support@fintech.kz</div>
                    </div>
                  </div>

                  <div style="display: flex; align-items: center;">
                    <div style="font-size: 2rem; margin-right: 1rem;">💬</div>
                    <div>
                      <div style="font-weight: 600; color: var(--text-dark);">Онлайн чат</div>
                      <div style="color: var(--text-light);">Доступен 24/7 на сайте</div>
                    </div>
                  </div>
                </div>

                <div style="background: #F9FAFB; padding: 1.5rem; border-radius: 8px;">
                  <h4 style="margin-top: 0; margin-bottom: 1rem; color: var(--text-dark);">Социальные сети</h4>
                  <div style="display: flex; gap: 1rem;">
                    <a href="#" style="color: var(--primary-color); text-decoration: none;">📘 Facebook</a>
                    <a href="#" style="color: var(--primary-color); text-decoration: none;">📷 Instagram</a>
                    <a href="#" style="color: var(--primary-color); text-decoration: none;">🐦 Twitter</a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div class="card" style="padding: 2rem;">
                <h3 style="margin-top: 0; margin-bottom: 1.5rem; color: var(--text-dark);">Напишите нам</h3>

                <form id="contact-form">
                  <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text-dark);">Имя</label>
                    <input type="text" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 6px; font-size: 1rem;">
                  </div>

                  <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text-dark);">Email</label>
                    <input type="email" required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 6px; font-size: 1rem;">
                  </div>

                  <div style="margin-bottom: 1rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text-dark);">Тема</label>
                    <select required style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 6px; font-size: 1rem;">
                      <option value="">Выберите тему</option>
                      <option value="support">Техническая поддержка</option>
                      <option value="credit">Вопросы по кредитам</option>
                      <option value="account">Проблемы со счетом</option>
                      <option value="other">Другое</option>
                    </select>
                  </div>

                  <div style="margin-bottom: 1.5rem;">
                    <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text-dark);">Сообщение</label>
                    <textarea required rows="5" style="width: 100%; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 6px; font-size: 1rem; resize: vertical;"></textarea>
                  </div>

                  <button type="submit" class="btn btn-primary" style="width: 100%; padding: 1rem;">
                    Отправить сообщение
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init: () => {
    const form = document.getElementById('contact-form');
    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        Notifications.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
        form.reset();
      });
    }
  }
};