/**
 * Dashboard Page
 * Главная страница личного кабинета
 */

const DashboardPage = {
  render: () => {
    const user = Store.getValue('user');
    const transactions = TransactionsModule.getTransactions().slice(0, 5);
    const stats = TransactionsModule.getStatistics();
    const creditStats = CreditsModule.getCreditStats();

    return `
      <section class="section">
        <div class="container">
          <h1 style="margin-bottom: 2rem; color: var(--text-dark);">Добро пожаловать, ${Sanitizer.escapeHTML(user?.name || 'пользователь')}!</h1>

          <div class="grid grid-3" style="gap: 2rem; margin-bottom: 2rem;">
            <!-- Основной баланс -->
            <div class="card" style="
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              padding: 2rem;
              border-radius: 12px;
              grid-column: span 1;
            ">
              <p style="margin: 0 0 0.5rem 0; opacity: 0.9; font-size: 0.9rem;">Основной баланс</p>
              <h2 style="margin: 0 0 1.5rem 0; font-size: 2.5rem; font-weight: 700;">
                ${formatPrice(user?.balance || 0)} ₸
              </h2>
              <div style="display: flex; gap: 1rem; flex-wrap: wrap;">
                <button class="btn" style="
                  background: white;
                  color: #667eea;
                  padding: 8px 16px;
                  border-radius: 6px;
                  border: none;
                  cursor: pointer;
                  font-weight: 600;
                  font-size: 0.9rem;
                  transition: all 0.2s ease;
                " 
                onmouseover="this.style.opacity='0.9'"
                onmouseout="this.style.opacity='1'"
                onclick="Router.navigate('/transfers')">
                  Отправить
                </button>
                <button class="btn" style="
                  background: rgba(255,255,255,0.2);
                  color: white;
                  padding: 8px 16px;
                  border-radius: 6px;
                  border: 1px solid white;
                  cursor: pointer;
                  font-weight: 600;
                  font-size: 0.9rem;
                  transition: all 0.2s ease;
                "
                onmouseover="this.style.background='rgba(255,255,255,0.3)'"
                onmouseout="this.style.background='rgba(255,255,255,0.2)'"
                onclick="Router.navigate('/credits')">
                  Кредит
                </button>
              </div>
            </div>

            <!-- Статистика -->
            ${[
              { title: 'Операций выполнено', value: stats.successTransactions, icon: '✓' },
              { title: 'Потрачено всего', value: formatPrice(stats.totalSpent) + ' ₸', icon: '💸' }
            ].map(item => `
              <div class="card" style="padding: 1.5rem; border-radius: 12px;">
                <p style="margin: 0 0 0.5rem 0; color: var(--text-light); font-size: 0.9rem;">${item.title}</p>
                <div style="display: flex; align-items: baseline; gap: 0.5rem;">
                  <h3 style="margin: 0; font-size: 1.8rem; color: var(--text-dark); font-weight: 700;">
                    ${item.value}
                  </h3>
                  <span style="font-size: 1.5rem; opacity: 0.5;">${item.icon}</span>
                </div>
              </div>
            `).join('')}

            <!-- Кредит -->
            ${creditStats.hasActiveCredit ? `
              <div class="card" style="padding: 1.5rem; border-radius: 12px; border-left: 4px solid var(--warning-color);">
                <p style="margin: 0 0 0.5rem 0; color: var(--text-light); font-size: 0.9rem;">Активный кредит</p>
                <div style="display: flex; align-items: baseline; gap: 0.5rem;">
                  <h3 style="margin: 0; font-size: 1.8rem; color: var(--text-dark); font-weight: 700;">
                    ${formatPrice(creditStats.activeCredit.principalAmount)} ₸
                  </h3>
                  <span style="font-size: 0.85rem; color: var(--text-light);">${creditStats.activeCredit.rate}%</span>
                </div>
                <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem; color: var(--text-light);">
                  Платежей: ${creditStats.activeCredit.paymentsMade}/${creditStats.activeCredit.termMonths}
                </p>
              </div>
            ` : ''}
          </div>

          <!-- Быстрые действия -->
          <div class="card" style="padding: 2rem; margin-bottom: 2rem;">
            <h2 style="margin-top: 0; margin-bottom: 1.5rem; color: var(--text-dark);">Быстрые действия</h2>
            <div class="grid grid-4" style="gap: 1rem;">
              <button class="card" onclick="Router.navigate('/transfers')" style="
                padding: 1rem;
                text-align: center;
                cursor: pointer;
                transition: all 0.2s ease;
                border: 1px solid var(--border-color);
              "
              onmouseover="this.style.background='#F9FAFB'; this.style.transform='translateY(-4px)'"
              onmouseout="this.style.background='white'; this.style.transform='translateY(0)'">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">💸</div>
                <p style="margin: 0; font-size: 0.9rem; font-weight: 600; color: var(--text-dark);">Перевод</p>
              </button>

              <button class="card" onclick="Router.navigate('/credits')" style="
                padding: 1rem;
                text-align: center;
                cursor: pointer;
                transition: all 0.2s ease;
                border: 1px solid var(--border-color);
              "
              onmouseover="this.style.background='#F9FAFB'; this.style.transform='translateY(-4px)'"
              onmouseout="this.style.background='white'; this.style.transform='translateY(0)'">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">💰</div>
                <p style="margin: 0; font-size: 0.9rem; font-weight: 600; color: var(--text-dark);">Кредит</p>
              </button>

              <button class="card" onclick="Router.navigate('/transactions')" style="
                padding: 1rem;
                text-align: center;
                cursor: pointer;
                transition: all 0.2s ease;
                border: 1px solid var(--border-color);
              "
              onmouseover="this.style.background='#F9FAFB'; this.style.transform='translateY(-4px)'"
              onmouseout="this.style.background='white'; this.style.transform='translateY(0)'">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">📊</div>
                <p style="margin: 0; font-size: 0.9rem; font-weight: 600; color: var(--text-dark);">История</p>
              </button>

              <button class="card" onclick="Router.navigate('/profile')" style="
                padding: 1rem;
                text-align: center;
                cursor: pointer;
                transition: all 0.2s ease;
                border: 1px solid var(--border-color);
              "
              onmouseover="this.style.background='#F9FAFB'; this.style.transform='translateY(-4px)'"
              onmouseout="this.style.background='white'; this.style.transform='translateY(0)'">
                <div style="font-size: 2rem; margin-bottom: 0.5rem;">👤</div>
                <p style="margin: 0; font-size: 0.9rem; font-weight: 600; color: var(--text-dark);">Профиль</p>
              </button>
            </div>
          </div>

          <!-- История последних операций -->
          <div class="card" style="padding: 2rem;">
            <h2 style="margin-top: 0; margin-bottom: 1rem; color: var(--text-dark);">Последние операции</h2>
            
            ${transactions.length > 0 ? `
              <div style="border-radius: 8px; overflow: hidden;">
                ${transactions.map(tx => Components.transactionItem(tx)).join('')}
              </div>
              <div style="text-align: center; margin-top: 1.5rem;">
                <a href="#" onclick="Router.navigate('/transactions'); return false;" style="
                  color: var(--primary-color);
                  text-decoration: none;
                  font-weight: 600;
                  font-size: 0.95rem;
                ">Смотреть всё →</a>
              </div>
            ` : Components.emptyState('📭', 'Нет операций', 'Начните с первого перевода или платежа')}
          </div>
        </div>
      </section>
    `;
  },

  init: () => {
    // Dashboard не требует особой инициализации
  }
};
