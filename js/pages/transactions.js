/**
 * Transactions Page
 */

const TransactionsPage = {
  render: () => {
    const transactions = TransactionsModule.getTransactions();

    return `
      <section class="section">
        <div class="container">
          <h1 style="margin-bottom: 2rem; color: var(--text-dark);">История операций</h1>

          <div class="card" style="padding: 1.5rem; margin-bottom: 2rem;">
            <div class="grid grid-3" style="gap: 1rem; margin-bottom: 1.5rem;">
              <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text-light); font-size: 0.9rem;">Тип операции</label>
                <select id="filter-type" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border-color); font-size: 0.9rem;">
                  <option value="">Все типы</option>
                  <option value="TRANSFER">Переводы</option>
                  <option value="PAYMENT">Платежи</option>
                  <option value="CREDIT">Кредиты</option>
                  <option value="CARD">Карты</option>
                </select>
              </div>
              
              <div>
                <label style="display: block; margin-bottom: 0.5rem; font-weight: 500; color: var(--text-light); font-size: 0.9rem;">Статус</label>
                <select id="filter-status" style="width: 100%; padding: 8px; border-radius: 6px; border: 1px solid var(--border-color); font-size: 0.9rem;">
                  <option value="">Все статусы</option>
                  <option value="SUCCESS">Успешные</option>
                  <option value="PENDING">В ожидании</option>
                  <option value="FAILED">Отклонённые</option>
                </select>
              </div>

              <div>
                <button id="download-btn" class="btn btn-primary" style="width: 100%; padding: 8px; font-size: 0.9rem;">📥 Выписка</button>
              </div>
            </div>
          </div>

          <div class="card" style="padding: 0; border-radius: 12px; overflow: hidden;">
            ${transactions.length > 0 ? `
              <div style="overflow-y: auto; max-height: 600px;">
                ${transactions.map(tx => Components.transactionItem(tx)).join('')}
              </div>
            ` : Components.emptyState('📭', 'Нет операций', 'Когда вы сделаете первую операцию, она появится здесь')}
          </div>
        </div>
      </section>
    `;
  },

  init: () => {
    const filterType = document.getElementById('filter-type');
    const filterStatus = document.getElementById('filter-status');
    const downloadBtn = document.getElementById('download-btn');

    const updateFilters = () => {
      const type = filterType.value;
      const status = filterStatus.value;
      // TODO: Обновить фильтр в UI
    };

    if (filterType) filterType.addEventListener('change', updateFilters);
    if (filterStatus) filterStatus.addEventListener('change', updateFilters);

    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        const type = filterType?.value || undefined;
        const status = filterStatus?.value || undefined;
        TransactionsModule.downloadStatement({ type, status });
      });
    }
  }
};
