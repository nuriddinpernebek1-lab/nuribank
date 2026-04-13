/**
 * Register Page
 */

const RegisterPage = {
  render: () => {
    return `
      <section class="section" style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <div class="container" style="max-width: 420px;">
          <div class="card" style="padding: 2rem;">
            <h1 style="text-align: center; margin-bottom: 0.5rem; color: var(--text-dark);">Регистрация</h1>
            <p style="text-align: center; color: var(--text-light); margin-bottom: 2rem;">в ILYAS BANK</p>

            <form id="register-form">
              ${Components.input('text', 'Иван Иванов', {
                label: 'Полное имя',
                name: 'name',
                id: 'name-input',
                required: true
              })}

              ${Components.input('email', 'user@example.com', {
                label: 'Email',
                name: 'email',
                id: 'email-input',
                required: true
              })}

              ${Components.input('tel', '+7 700 000 0000', {
                label: 'Номер телефона',
                name: 'phone',
                id: 'phone-input',
                pattern: '^\\+?7[0-9]{10}$',
                required: true
              })}

              ${Components.input('password', '', {
                label: 'Пароль',
                type: 'password',
                name: 'password',
                id: 'password-input',
                required: true
              })}

              <div style="background: #F9FAFB; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.85rem; color: var(--text-light);">
                <p style="margin-top: 0;"><strong>Требования к паролю:</strong></p>
                <ul style="margin: 0; padding-left: 1.2rem;">
                  <li>Минимум 8 символов</li>
                  <li>Англ. буквы (a-z, A-Z)</li>
                  <li>Цифры (0-9)</li>
                  <li>Спецсимволы (!@#$%^&*)</li>
                </ul>
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.75rem; font-size: 1rem; margin-bottom: 1rem;">
                Создать аккаунт
              </button>

              <div style="text-align: center; color: var(--text-light);">
                Уже есть аккаунт? 
                <a href="#/login" style="color: var(--primary-color); text-decoration: none; font-weight: 600;">Войдите</a>
              </div>
            </form>

            <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color); font-size: 0.85rem; color: var(--text-light);">
              <p style="margin: 0 0 0.5rem 0;"><strong>Согласие на обработку данных:</strong></p>
              <p style="margin: 0; opacity: 0.8;">Регистрируясь, вы согласны с <a href="#" style="color: var(--primary-color); text-decoration: none;">офертой</a> и <a href="#" style="color: var(--primary-color); text-decoration: none;">политикой конфиденциальности</a></p>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init: () => {
    const form = document.getElementById('register-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = form.querySelector('[name="name"]').value;
      const email = form.querySelector('[name="email"]').value;
      const phone = form.querySelector('[name="phone"]').value;
      const password = form.querySelector('[name="password"]').value;

      try {
        await AuthModule.register(name, email, phone, password);
        setTimeout(() => Router.navigate('/dashboard'), 500);
      } catch (error) {
        // Ошибка уже выведена
      }
    });
  }
};

// 🔴 ВАЖНО: сделать доступным глобально
window.RegisterPage = RegisterPage;
