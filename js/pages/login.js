/**
 * Login Page
 */

const LoginPage = {
  render: () => {
    return `
      <section class="section" style="min-height: 100vh; display: flex; align-items: center; justify-content: center; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);">
        <div class="container" style="max-width: 420px;">
          <div class="card" style="padding: 2rem;">
            <h1 style="text-align: center; margin-bottom: 0.5rem; color: var(--text-dark);">Вход</h1>
            <p style="text-align: center; color: var(--text-light); margin-bottom: 2rem;">в ILYAS BANK</p>

            ${Components.alert('Тестовые данные: любой email, пароль Test1234!', 'info')}

            <form id="login-form">
              ${Components.input('email', 'user@example.com', {
                label: 'Email',
                name: 'email',
                required: true
              })}

              ${Components.input('password', '', {
                label: 'Пароль',
                type: 'password',
                name: 'password',
                required: true
              })}

              <div style="margin-bottom: 1.5rem;">
                <button type="submit" class="btn btn-primary" style="width: 100%; padding: 0.75rem; font-size: 1rem;">
                  Войти
                </button>
              </div>

              <div style="text-align: center; color: var(--text-light);">
                Нет аккаунта? 
                <a href="#/register" style="color: var(--primary-color); text-decoration: none; font-weight: 600;">Создайте</a>
              </div>
            </form>

            <div style="margin-top: 1.5rem; padding-top: 1.5rem; border-top: 1px solid var(--border-color); font-size: 0.9rem; color: var(--text-light);">
              <p><strong>🔒 Безопасность:</strong></p>
              <ul style="margin: 0; padding-left: 1.2rem;">
                <li>Пароли никогда не сохраняются</li>
                <li>Используется JWT аутентификация</li>
                <li>Все данные защищены</li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init: () => {
    const form = document.getElementById('login-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const email = form.querySelector('[name="email"]').value;
      const password = form.querySelector('[name="password"]').value;

      try {
        await AuthModule.login(email, password);
        setTimeout(() => Router.navigate('/dashboard'), 500);
      } catch (error) {
        // Ошибка уже выведена в AuthModule
      }
    });
  }
};

// 🔴 ВАЖНО: сделать доступным глобально
window.LoginPage = LoginPage;
