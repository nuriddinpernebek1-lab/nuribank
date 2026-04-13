/**
 * Credits Page
 */

const CreditsPage = {
  render: () => {
    const user = Store.getValue('user');
    const hasActiveCredit = user?.credit?.status === 'ACTIVE';
    const credit = user?.credit;

    return `
      <section class="section">
        <div class="container">
          <h1 style="margin-bottom: 2rem; color: var(--text-dark);">Кредиты</h1>

          ${hasActiveCredit ? `
            <!-- Активный кредит -->
            <div class="grid grid-2" style="gap: 2rem; margin-bottom: 2rem;">
              <!-- Информация о кредите -->
              <div class="card" style="padding: 2rem; border-left: 4px solid var(--warning-color);">
                <h2 style="margin-top: 0; margin-bottom: 1.5rem; color: var(--text-dark);">Ваш кредит</h2>
                
                <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                  <p style="margin: 0 0 0.25rem 0; color: var(--text-light); font-size: 0.9rem;">Основная сумма</p>
                  <p style="margin: 0; font-size: 1.5rem; font-weight: 700; color: var(--text-dark);">
                    ${formatPrice(credit.principalAmount)} ₸
                  </p>
                </div>

                <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                  <p style="margin: 0 0 0.25rem 0; color: var(--text-light); font-size: 0.9rem;">Процентная ставка</p>
                  <p style="margin: 0; font-size: 1.3rem; font-weight: 600; color: var(--text-dark);">
                    ${credit.rate}% годовых
                  </p>
                </div>

                <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                  <p style="margin: 0 0 0.25rem 0; color: var(--text-light); font-size: 0.9rem;">Всего к возврату</p>
                  <p style="margin: 0; font-size: 1.3rem; font-weight: 600; color: var(--success-color);">
                    ${formatPrice(credit.totalAmountToRepay)} ₸
                  </p>
                </div>

                <div>
                  <p style="margin: 0 0 0.25rem 0; color: var(--text-light); font-size: 0.9rem;">Выплачено платежей</p>
                  <div style="display: flex; align-items: center; gap: 1rem;">
                    <div style="flex: 1; height: 8px; background: var(--border-color); border-radius: 4px;">
                      <div style="
                        height: 100%;
                        background: var(--success-color);
                        border-radius: 4px;
                        width: ${(credit.paymentsMade / credit.termMonths) * 100}%;
                      "></div>
                    </div>
                    <span style="font-weight: 600; color: var(--text-dark);">
                      ${credit.paymentsMade}/${credit.termMonths}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Следующий платёж -->
              <div class="card" style="padding: 2rem; background: linear-gradient(135deg, #F9FAFB 0%, #F3F4F6 100%);">
                <h2 style="margin-top: 0; margin-bottom: 1.5rem; color: var(--text-dark);">Следующий платёж</h2>
                
                ${(() => {
                  const nextPayment = credit.schedule.find(p => !p.paid);
                  if (!nextPayment) {
                    return '<p style="color: var(--text-light);">Все платежи выполнены! ✓</p>';
                  }

                  const dueDate = new Date(nextPayment.dueDate);
                  const daysUntil = Math.ceil((dueDate - new Date()) / (1000 * 60 * 60 * 24));

                  return `
                    <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                      <p style="margin: 0 0 0.25rem 0; color: var(--text-light); font-size: 0.9rem;">Размер платежа</p>
                      <p style="margin: 0; font-size: 1.8rem; font-weight: 700; color: var(--primary-color);">
                        ${formatPrice(nextPayment.totalPayment)} ₸
                      </p>
                    </div>

                    <div style="margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                      <p style="margin: 0 0 0.25rem 0; color: var(--text-light); font-size: 0.9rem;">Срок платежа</p>
                      <p style="margin: 0; font-size: 1rem; font-weight: 600; color: var(--text-dark);">
                        ${dueDate.toLocaleDateString('ru-RU')}
                      </p>
                      <p style="margin: 0.5rem 0 0 0; font-size: 0.85rem; color: var(--text-light);">
                        Осталось: ${daysUntil} дней
                      </p>
                    </div>

                    <div style="background: white; padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                      <p style="margin: 0 0 0.5rem 0; font-size: 0.85rem; color: var(--text-light);">Из них:</p>
                      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: var(--text-dark);">
                        • Основной долг: <strong>${formatPrice(nextPayment.principalPayment)} ₸</strong>
                      </p>
                      <p style="margin: 0.25rem 0; font-size: 0.9rem; color: var(--text-dark);">
                        • Проценты: <strong>${formatPrice(nextPayment.interestPayment)} ₸</strong>
                      </p>
                    </div>

                    <button id="make-payment-btn" class="btn btn-success" style="width: 100%; padding: 12px; font-weight: 600;">
                      Оплатить ${formatPrice(nextPayment.totalPayment)} ₸
                    </button>
                  `;
                })()}

                <div style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--border-color); font-size: 0.9rem;">
                  <button id="early-repayment-btn" class="btn btn-outline" style="width: 100%; padding: 10px; margin-bottom: 0.5rem;">
                    Досрочное погашение
                  </button>
                </div>
              </div>
            </div>

            <!-- График платежей -->
            <div class="card" style="padding: 2rem;">
              <h2 style="margin-top: 0; margin-bottom: 1rem; color: var(--text-dark);">График платежей</h2>
              <div style="overflow-x: auto;">
                <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                  <thead>
                    <tr style="background: #F9FAFB;">
                      <th style="padding: 0.75rem; text-align: left; font-weight: 600; border-bottom: 2px solid var(--border-color);">№</th>
                      <th style="padding: 0.75rem; text-align: left; font-weight: 600; border-bottom: 2px solid var(--border-color);">Срок</th>
                      <th style="padding: 0.75rem; text-align: right; font-weight: 600; border-bottom: 2px solid var(--border-color);">Основной долг</th>
                      <th style="padding: 0.75rem; text-align: right; font-weight: 600; border-bottom: 2px solid var(--border-color);">Проценты</th>
                      <th style="padding: 0.75rem; text-align: right; font-weight: 600; border-bottom: 2px solid var(--border-color);">Всего</th>
                      <th style="padding: 0.75rem; text-align: center; font-weight: 600; border-bottom: 2px solid var(--border-color);">Статус</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${credit.schedule.map(payment => `
                      <tr style="border-bottom: 1px solid var(--border-color);">
                        <td style="padding: 0.75rem;">${payment.paymentNumber}</td>
                        <td style="padding: 0.75rem;">${new Date(payment.dueDate).toLocaleDateString('ru-RU')}</td>
                        <td style="padding: 0.75rem; text-align: right;">${formatPrice(payment.principalPayment)} ₸</td>
                        <td style="padding: 0.75rem; text-align: right;">${formatPrice(payment.interestPayment)} ₸</td>
                        <td style="padding: 0.75rem; text-align: right; font-weight: 600;">${formatPrice(payment.totalPayment)} ₸</td>
                        <td style="padding: 0.75rem; text-align: center;">
                          <span style="
                            display: inline-block;
                            padding: 4px 12px;
                            border-radius: 20px;
                            font-size: 0.8rem;
                            font-weight: 600;
                            ${payment.paid ? 'background: #ECFDF5; color: #10B981;' : 'background: #FEF3C7; color: #D97706;'}
                          ">
                            ${payment.paid ? '✓ Выплачено' : '⏳ Ожидание'}
                          </span>
                        </td>
                      </tr>
                    `).join('')}
                  </tbody>
                </table>
              </div>
            </div>
          ` : `
            <!-- Нет активного кредита -->
            <div class="card" style="padding: 3rem; text-align: center;">
              <div style="font-size: 3rem; margin-bottom: 1rem; opacity: 0.3;">💰</div>
              <h2 style="color: var(--text-dark); margin-bottom: 0.5rem;">Нет активного кредита</h2>
              <p style="color: var(--text-light); margin-bottom: 2rem; font-size: 1.05rem;">
                Получите кредит до 5 млн ₸ с гибким графиком платежей
              </p>

              <div class="card" style="padding: 2rem; margin-bottom: 2rem; background: linear-gradient(135deg, #F0F4FF 0%, #F9F5FF 100%);">
                <h3 style="margin-top: 0; margin-bottom: 1.5rem; color: var(--text-dark);">Условия кредита</h3>
                <div class="grid grid-3" style="gap: 1rem; margin-bottom: 1rem;">
                  <div style="text-align: center;">
                    <p style="margin: 0 0 0.5rem 0; color: var(--text-light); font-size: 0.9rem;">Минимум</p>
                    <p style="margin: 0; font-size: 1.3rem; font-weight: 700; color: var(--text-dark);">50К ₸</p>
                  </div>
                  <div style="text-align: center;">
                    <p style="margin: 0 0 0.5rem 0; color: var(--text-light); font-size: 0.9rem;">Максимум</p>
                    <p style="margin: 0; font-size: 1.3rem; font-weight: 700; color: var(--text-dark);">5М ₸</p>
                  </div>
                  <div style="text-align: center;">
                    <p style="margin: 0 0 0.5rem 0; color: var(--text-light); font-size: 0.9rem;">Сроки</p>
                    <p style="margin: 0; font-size: 1.3rem; font-weight: 700; color: var(--text-dark);">3-24 м</p>
                  </div>
                </div>
              </div>

              <div class="card" style="padding: 1.5rem; margin-bottom: 2rem; background: #FEF3C7;">
                <h4 style="margin-top: 0; color: var(--text-dark);">Процентные ставки:</h4>
                <ul style="margin: 0; padding-left: 1.2rem; color: var(--text-dark);">
                  <li>3 месяца: 5%</li>
                  <li>6 месяцев: 8%</li>
                  <li>12 месяцев: 10%</li>
                  <li>24 месяца: 12%</li>
                </ul>
              </div>

              <button id="get-credit-btn" class="btn" style="
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 14px 40px;
                font-size: 1rem;
                font-weight: 600;
                border-radius: 8px;
                border: none;
                cursor: pointer;
              " onmouseover="this.style.boxShadow='0 10px 30px rgba(102, 126, 234, 0.3)'"
              onmouseout="this.style.boxShadow='none'">
                Получить кредит →
              </button>
            </div>

            <!-- Калькулятор -->
            <div class="card" style="padding: 2rem; margin-top: 2rem;">
              <h3 style="margin-top: 0; margin-bottom: 1.5rem; color: var(--text-dark);">Калькулятор кредита</h3>
              
              <div class="grid grid-2" style="gap: 2rem;">
                <div>
                  <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Сумма (₸)</label>
                  <input id="calc-amount" type="number" min="50000" max="5000000" step="50000" value="500000" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--border-color); font-size: 1rem;" placeholder="Сумма">
                </div>

                <div>
                  <label style="display: block; margin-bottom: 0.5rem; font-weight: 500;">Срок</label>
                  <select id="calc-term" style="width: 100%; padding: 10px; border-radius: 6px; border: 1px solid var(--border-color); font-size: 1rem;">
                    <option value="3">3 месяца (5%)</option>
                    <option value="6">6 месяцев (8%)</option>
                    <option value="12" selected>12 месяцев (10%)</option>
                    <option value="24">24 месяца (12%)</option>
                  </select>
                </div>
              </div>

              <div id="calc-result" style="margin-top: 2rem; padding: 1.5rem; background: #F9FAFB; border-radius: 8px; display: none;">
                <div class="grid grid-2" style="gap: 1.5rem;">
                  <div>
                    <p style="margin: 0 0 0.5rem 0; color: var(--text-light); font-size: 0.9rem;">Ежемесячный платёж</p>
                    <p id="calc-monthly" style="margin: 0; font-size: 1.5rem; font-weight: 700; color: var(--text-dark);">-</p>
                  </div>
                  <div>
                    <p style="margin: 0 0 0.5rem 0; color: var(--text-light); font-size: 0.9rem;">Всего к возврату</p>
                    <p id="calc-total" style="margin: 0; font-size: 1.5rem; font-weight: 700; color: var(--success-color);">-</p>
                  </div>
                </div>
              </div>
            </div>
          `}
        </div>
      </section>
    `;
  },

  init: () => {
    const makePaymentBtn = document.getElementById('make-payment-btn');
    if (makePaymentBtn) {
      makePaymentBtn.addEventListener('click', async () => {
        try {
          const user = Store.getValue('user');
          if (user?.credit) {
            await CreditsModule.makePayment(user.credit.id);
            // Перезагружаем страницу
            Router.navigate('/credits');
          }
        } catch (error) {
          // Ошибка выведена в Notifications
        }
      });
    }

    const earlyRepaymentBtn = document.getElementById('early-repayment-btn');
    if (earlyRepaymentBtn) {
      earlyRepaymentBtn.addEventListener('click', async () => {
        if (confirm('Вы уверены? Будут выплачены все оставшиеся платежи')) {
          try {
            const user = Store.getValue('user');
            if (user?.credit) {
              await CreditsModule.earlyRepayment(user.credit.id);
              Router.navigate('/credits');
            }
          } catch (error) {
            // Ошибка выведена
          }
        }
      });
    }

    const getCreditBtn = document.getElementById('get-credit-btn');
    if (getCreditBtn) {
      getCreditBtn.addEventListener('click', () => {
        // TODO: Показать модальное окно для получения кредита
        Notifications.info('Окно получения кредита откроется');
      });
    }

    // Калькулятор
    const calcAmount = document.getElementById('calc-amount');
    const calcTerm = document.getElementById('calc-term');
    const calcResult = document.getElementById('calc-result');

    const updateCalculator = () => {
      if (calcAmount && calcTerm) {
        const amount = Number(calcAmount.value);
        const term = Number(calcTerm.value);
        const rates = { 3: 5, 6: 8, 12: 10, 24: 12 };
        const rate = rates[term] || 10;

        const monthlyRate = (rate / 100) / 12;
        const monthlyPayment = Math.ceil(amount / term * (1 + monthlyRate * term));
        const totalRepay = monthlyPayment * term;

        document.getElementById('calc-monthly').textContent = formatPrice(monthlyPayment) + ' ₸';
        document.getElementById('calc-total').textContent = formatPrice(totalRepay) + ' ₸';

        if (calcResult) calcResult.style.display = 'block';
      }
    };

    if (calcAmount) calcAmount.addEventListener('input', updateCalculator);
    if (calcTerm) calcTerm.addEventListener('change', updateCalculator);

    // Инициальный расчёт
    updateCalculator();
  }
};
