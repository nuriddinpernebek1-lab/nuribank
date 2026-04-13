/**
 * Profile Page
 */

const ProfilePage = {
  render: () => {
    const user = Store.getValue('user');
    
    return `
      <section class="section">
        <div class="container" style="max-width: 600px;">
          <h1 style="margin-bottom: 2rem; color: var(--text-dark);">Мой профиль</h1>

          <!-- Основная информация -->
          <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
            <h2 style="margin-top: 0; margin-bottom: 1.5rem; color: var(--text-dark);">Основная информация</h2>

            <form id="profile-form">
              ${Components.input('text', user?.name || '', {
                label: 'Полное имя',
                name: 'name',
                value: user?.name || '',
                required: true
              })}

              ${Components.input('email', user?.email || '', {
                label: 'Email (не может быть изменён)',
                name: 'email',
                value: user?.email || '',
                disabled: true
              })}

              ${Components.input('tel', user?.phone || '', {
                label: 'Номер телефона',
                name: 'phone',
                value: user?.phone || '',
                required: true
              })}

              <button type="submit" class="btn btn-primary" style="width: 100%; padding: 10px; font-weight: 600;">
                Сохранить изменения
              </button>
            </form>
          </div>

          <!-- Безопасность -->
          <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
            <h2 style="margin-top: 0; margin-bottom: 1.5rem; color: var(--text-dark);">Безопасность</h2>

            <form id="password-form">
              ${Components.input('password', '', {
                label: 'Старый пароль',
                name: 'oldPassword',
                required: true
              })}

              ${Components.input('password', '', {
                label: 'Новый пароль',
                name: 'newPassword',
                required: true
              })}

              <div style="background: #F9FAFB; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem; font-size: 0.85rem; color: var(--text-light);">
                <p style="margin-top: 0;"><strong>Требования к пароли:</strong></p>
                <ul style="margin: 0; padding-left: 1.2rem;">
                  <li>Минимум 8 символов</li>
                  <li>Англ. буквы, цифры, спецсимволы</li>
                </ul>
              </div>

              <button type="submit" class="btn btn-primary" style="width: 100%; padding: 10px; font-weight: 600;">
                Изменить пароль
              </button>
            </form>
          </div>

          <!-- Активная сессия -->
          <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
            <h2 style="margin-top: 0; margin-bottom: 1rem; color: var(--text-dark);">Активная сессия</h2>

            <div style="padding: 1rem; background: #ECFDF5; border-radius: 8px; border-left: 4px solid var(--success-color);">
              <p style="margin: 0 0 0.5rem 0; font-weight: 600; color: var(--text-dark);">
                ✓ Вы авторизованы
              </p>
              <p style="margin: 0; font-size: 0.9rem; color: var(--text-light);">
                Последний вход: только что
              </p>
            </div>

            <div style="margin-top: 1.5rem;">
              <button id="logout-profile-btn" class="btn" style="
                width: 100%;
                padding: 10px;
                background: var(--danger-color);
                color: white;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
              ">
                Выход из аккаунта
              </button>
            </div>
          </div>

          <!-- Информация об аккаунте -->
          <div class="card" style="padding: 2rem; background: #F9FAFB;">
            <h2 style="margin-top: 0; margin-bottom: 1rem; color: var(--text-dark);">Информация об аккаунте</h2>

            <div style="font-size: 0.9rem; color: var(--text-light);">
              <p style="margin: 0.5rem 0;">
                <strong>ID:</strong> ${Sanitizer.escapeHTML(user?.id || '-')}
              </p>
              <p style="margin: 0.5rem 0;">
                <strong>Дата создания:</strong> ${user?.createdAt ? new Date(user.createdAt).toLocaleDateString('ru-RU') : '-'}
              </p>
              <p style="margin: 0.5rem 0;">
                <strong>Статус:</strong> <span style="color: var(--success-color);">Активный</span>
              </p>
            </div>
          </div>
        </div>
      </section>
    `;
  },

  init: () => {
    const profileForm = document.getElementById('profile-form');
    if (profileForm) {
      profileForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = profileForm.querySelector('[name="name"]').value;
        const phone = profileForm.querySelector('[name="phone"]').value;

        try {
          await AuthModule.updateProfile(name, phone);
        } catch (error) {
          // Ошибка выведена
        }
      });
    }

    const passwordForm = document.getElementById('password-form');
    if (passwordForm) {
      passwordForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const oldPassword = passwordForm.querySelector('[name="oldPassword"]').value;
        const newPassword = passwordForm.querySelector('[name="newPassword"]').value;

        try {
          await AuthModule.changePassword(oldPassword, newPassword);
          passwordForm.reset();
        } catch (error) {
          // Ошибка выведена
        }
      });
    }

    const logoutBtn = document.getElementById('logout-profile-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        if (confirm('Вы уверены? Вы выйдете из аккаунта')) {
          AuthModule.logout();
          Router.navigate('/');
        }
      });
    }
  }
};
