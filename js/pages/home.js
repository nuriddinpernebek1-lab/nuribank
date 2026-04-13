/**
 * Home Page
 * Главная страница ILYAS BANK
 */

const HomePage = {
  render: () => {
    const isAuth = Store.getValue('isAuthenticated');

    if (isAuth) {
      // Если авторизован, показываем Dashboard вместо Home
      return DashboardPage.render();
    }

    return `
      <section class="hero" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4rem 2rem; text-align: center;">
        <div class="container" style="max-width: 800px;">
          <h1 style="font-size: 3rem; margin-bottom: 1rem; font-weight: 700;">
            ILYAS BANK
          </h1>
          <p style="font-size: 1.25rem; margin-bottom: 2rem; opacity: 0.95;">
            Современный финтех-банк для современных людей.
            Платежи, переводы, карты и кредиты в одном приложении.
          </p>
          
          <div class="hero-buttons" style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
            <button class="btn" style="
              background: white;
              color: #667eea;
              padding: 12px 32px;
              font-size: 1rem;
              font-weight: 600;
              border-radius: 8px;
              border: none;
              cursor: pointer;
              transition: all 0.2s ease;
            " 
            onmouseover="this.style.transform='scale(1.05)'"
            onmouseout="this.style.transform='scale(1)'"
            onclick="Router.navigate('/register')">
              Создать аккаунт →
            </button>
            <button class="btn" style="
              background: transparent;
              color: white;
              border: 2px solid white;
              padding: 10px 30px;
              font-size: 1rem;
              font-weight: 600;
              border-radius: 8px;
              cursor: pointer;
              transition: all 0.2s ease;
            "
            onmouseover="this.style.background='rgba(255,255,255,0.1)'"
            onmouseout="this.style.background='transparent'"
            onclick="Router.navigate('/login')">
              Войти
            </button>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container">
          <h2 style="font-size: 2rem; text-align: center; margin-bottom: 3rem; color: var(--text-dark);">
            💡 Возможности
          </h2>

          <div class="grid grid-3" style="gap: 2rem; margin-bottom: 3rem;">
            ${[
              {
                icon: '💳',
                title: 'Быстрые платежи',
                description: 'Оплачивайте коммунальные услуги, мобильную сеть и другие сервисы в секунды'
              },
              {
                icon: '💸',
                title: 'Переводы без комиссий',
                description: 'Отправляйте деньги друзьям и семье бесплатно, когда угодно'
              },
              {
                icon: '⚡',
                title: 'Интеллектуальные сервисы',
                description: 'Управляйте счетами, картами и кредитами в одном месте'
              },
              {
                icon: '📊',
                title: 'Полная история',
                description: 'Отслеживайте все операции с детальным описанием и статусами'
              },
              {
                icon: '🔒',
                title: 'Банковская безопасность',
                description: 'JWT токены, шифрование данных, защита от XSS атак'
              },
              {
                icon: '📱',
                title: 'Везде с собой',
                description: 'Полностью адаптивный интерфейс для мобильных устройств'
              }
            ].map(item => `
              <div class="card" style="padding: 2rem; text-align: center; border-radius: 12px; transition: all 0.3s ease; ${item.title === 'Интеллектуальные сервисы' ? 'cursor: pointer;' : ''}"
              onmouseover="this.style.boxShadow='0 20px 40px rgba(0,0,0,0.15)'; this.style.transform='translateY(-8px)'"
              onmouseout="this.style.boxShadow='0 1px 3px rgba(0,0,0,0.1)'; this.style.transform='translateY(0)'"
              ${item.title === 'Интеллектуальные сервисы' ? 'onclick="Router.navigate(\'/services\')"' : ''}>
                <div style="font-size: 3rem; margin-bottom: 1rem;">${item.icon}</div>
                <h3 style="margin: 0 0 0.5rem 0; color: var(--text-dark);">${item.title}</h3>
                <p style="margin: 0; color: var(--text-light); line-height: 1.5;">${item.description}</p>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <section class="section" style="background: #F9FAFB;">
        <div class="container">
          <h2 style="font-size: 2rem; text-align: center; margin-bottom: 3rem; color: var(--text-dark);">
            📊 Статистика
          </h2>

          <div class="grid grid-3" style="gap: 2rem; margin-bottom: 2rem;">
            <div class="card" style="padding: 2rem; text-align: center;">
              <div style="font-size: 2.5rem; font-weight: 700; color: var(--primary-color); margin-bottom: 0.5rem;">50K+</div>
              <p style="margin: 0; color: var(--text-light);">Активных пользователей</p>
            </div>
            <div class="card" style="padding: 2rem; text-align: center;">
              <div style="font-size: 2.5rem; font-weight: 700; color: var(--success-color); margin-bottom: 0.5rem;">5M+</div>
              <p style="margin: 0; color: var(--text-light);">Операций в месяц</p>
            </div>
            <div class="card" style="padding: 2rem; text-align: center;">
              <div style="font-size: 2.5rem; font-weight: 700; color: var(--warning-color); margin-bottom: 0.5rem;">99.9%</div>
              <p style="margin: 0; color: var(--text-light);">Доступность сервиса</p>
            </div>
          </div>
        </div>
      </section>

      <section class="section">
        <div class="container" style="max-width: 600px; text-align: center;">
          <h2 style="font-size: 2rem; margin-bottom: 1rem; color: var(--text-dark);">
            Готовы начать?
          </h2>
          <p style="font-size: 1.1rem; color: var(--text-light); margin-bottom: 2rem;">
            Создавайте аккаунт за 2 минуты и получите 100,000 ₸ на счёт для тестирования
          </p>
          
          <button class="btn" style="
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 14px 40px;
            font-size: 1.05rem;
            font-weight: 600;
            border-radius: 8px;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
          "
          onmouseover="this.style.boxShadow='0 10px 30px rgba(102, 126, 234, 0.3)'; this.style.transform='scale(1.05)'"
          onmouseout="this.style.boxShadow='none'; this.style.transform='scale(1)'"
          onclick="Router.navigate('/register')">
            Начать →
          </button>
        </div>
      </section>
    `;
  },

  init: () => {
    // Страница не требует инициализации
  }
};

// 🔴 ВАЖНО: сделать доступным глобально
window.HomePage = HomePage;
