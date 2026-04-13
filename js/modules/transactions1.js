/**
 * Transactions Module
 * Управление историей транзакций с реалистичными статусами
 */

const TransactionsModule = (() => {
  /**
   * Создать транзакцию
   * @param {string} type - 'PAYMENT', 'TRANSFER', 'PURCHASE', 'CREDIT', 'DEPOSIT'
   * @param {number} amount
   * @param {Object} data - дополнительные данные { toUser, description, productId, ... }
   */
  const createTransaction = async (type, amount, data = {}) => {
    try {
      // Валидация
      if (!Validator.isValidAmount(amount)) {
        throw new Error('Некорректная сумма');
      }

      const user = AuthModule.getCurrentUser();
      if (!user || user.balance < amount) {
        throw new Error('Недостаточно средств');
      }

      // Расчет комиссии
      const commission = calculateCommission(type, amount);
      const totalAmount = amount + commission;

      // Проверяем баланс с комиссией
      if (user.balance < totalAmount) {
        throw new Error(`Недостаточно средств. Нужно: ${formatPrice(totalAmount)} ₸`);
      }

      // Создаём транзакцию
      const transaction = {
        id: 'tx_' + Date.now(),
        type,
        status: 'PENDING', // Будет SUCCESS после 1-2 сек
        amount,
        commission,
        totalAmount,
        from: user.id,
        to: data.toUser || null,
        description: data.description || getDescription(type),
        createdAt: new Date().toISOString(),
        completedAt: null,
        metadata: data.metadata || {}
      };

      // Сохраняем в Store
      const transactions = Store.getValue('transactions') || [];
      transactions.unshift(transaction);
      Store.dispatch('data:setTransactions', transactions);

      // Обновляем баланс пользователя
      await updateUserBalance(user.id, -totalAmount);

      // Показываем loading
      Store.dispatch('ui:loading', true);

      // Симулируем обработку (1-2 сек)
      await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));

      // Обновляем статус транзакции
      transaction.status = 'SUCCESS';
      transaction.completedAt = new Date().toISOString();

      // Обновляем в Store
      const updatedTransactions = transactions.map(tx => 
        tx.id === transaction.id ? transaction : tx
      );
      Store.dispatch('data:setTransactions', updatedTransactions);

      Store.dispatch('ui:loading', false);

      // Уведомляем пользователя
      const message = getSuccessMessage(type, amount);
      Notifications.success(message);

      return transaction;
    } catch (error) {
      Store.dispatch('ui:loading', false);
      Notifications.error(error.message);
      throw error;
    }
  };

  /**
   * Расчет комиссии
   * @param {string} type
   * @param {number} amount
   */
  const calculateCommission = (type, amount) => {
    const rates = {
      'TRANSFER': 0, // Без комиссии
      'PAYMENT': 0.015, // 1.5%
      'PURCHASE': 0, // Без комиссии (включено в цену)
      'CREDIT': 0, // Без комиссии
      'DEPOSIT': 0 // Без комиссии
    };

    const rate = rates[type] || 0;
    const commission = Math.ceil(amount * rate);

    // Минимум 100 ₸ если есть комиссия
    return commission > 0 ? Math.max(commission, 100) : 0;
  };

  /**
   * Обновить баланс пользователя
   */
  const updateUserBalance = async (userId, delta) => {
    const user = Store.getValue('user');
    if (user && user.id === userId) {
      user.balance += delta;
      Store.setState({ user });
      API.setUser(user);
    }
  };

  /**
   * Получить описание операции
   */
  const getDescription = (type) => {
    const descriptions = {
      'TRANSFER': 'Перевод средств',
      'PAYMENT': 'Оплата услуги',
      'PURCHASE': 'Покупка товара',
      'CREDIT': 'Получение кредита',
      'DEPOSIT': 'Пополнение счета'
    };
    return descriptions[type] || 'Операция';
  };

  /**
   * Сообщение об успехе операции
   */
  const getSuccessMessage = (type, amount) => {
    return `✓ ${type === 'TRANSFER' ? 'Перевод' : 
            type === 'PAYMENT' ? 'Оплата' : 
            type === 'PURCHASE' ? 'Покупка' : 
            'Операция'} на сумму ${formatPrice(amount)} ₸ выполнена`;
  };

  /**
   * Получить историю транзакций
   * @param {Object} filters - { type, status, dateFrom, dateTo }
   */
  const getTransactions = (filters = {}) => {
    let transactions = Store.getValue('transactions') || [];

    // Фильтрация по типу
    if (filters.type) {
      transactions = transactions.filter(tx => tx.type === filters.type);
    }

    // Фильтрация по статусу
    if (filters.status) {
      transactions = transactions.filter(tx => tx.status === filters.status);
    }

    // Фильтрация по дате
    if (filters.dateFrom) {
      const from = new Date(filters.dateFrom);
      transactions = transactions.filter(tx => new Date(tx.createdAt) >= from);
    }

    if (filters.dateTo) {
      const to = new Date(filters.dateTo);
      to.setHours(23, 59, 59);
      transactions = transactions.filter(tx => new Date(tx.createdAt) <= to);
    }

    return transactions;
  };

  /**
   * Получить статистику
   */
  const getStatistics = () => {
    const transactions = Store.getValue('transactions') || [];
    const user = AuthModule.getCurrentUser();

    const stats = {
      totalTransactions: transactions.length,
      successTransactions: transactions.filter(tx => tx.status === 'SUCCESS').length,
      failedTransactions: transactions.filter(tx => tx.status === 'FAILED').length,
      totalSpent: transactions
        .filter(tx => tx.status === 'SUCCESS' && ['PAYMENT', 'PURCHASE', 'TRANSFER'].includes(tx.type))
        .reduce((sum, tx) => sum + tx.totalAmount, 0),
      currentBalance: user?.balance || 0,
      averageTransaction: 0
    };

    if (stats.successTransactions > 0) {
      stats.averageTransaction = Math.round(stats.totalSpent / stats.successTransactions);
    }

    return stats;
  };

  /**
   * Отменить ещё не обработанную транзакцию
   */
  const cancelTransaction = async (transactionId) => {
    const transactions = Store.getValue('transactions') || [];
    const transaction = transactions.find(tx => tx.id === transactionId);

    if (!transaction) {
      throw new Error('Транзакция не найдена');
    }

    if (transaction.status !== 'PENDING') {
      throw new Error('Можно отменить только ожидающую транзакцию');
    }

    // Возвращаем средства
    await updateUserBalance(transaction.from, transaction.totalAmount);

    // Обновляем статус
    transaction.status = 'FAILED';
    transaction.completedAt = new Date().toISOString();

    const updated = transactions.map(tx => 
      tx.id === transactionId ? transaction : tx
    );
    Store.dispatch('data:setTransactions', updated);

    Notifications.info('✓ Транзакция отменена');
    return transaction;
  };

  /**
   * Скачать выписку (для примера - JSON)
   */
  const downloadStatement = (filters = {}) => {
    const transactions = getTransactions(filters);
    const user = AuthModule.getCurrentUser();

    const statement = {
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      },
      exportedAt: new Date().toISOString(),
      transactionCount: transactions.length,
      transactions
    };

    const blob = new Blob([JSON.stringify(statement, null, 2)], {
      type: 'application/json'
    });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `statement-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return {
    createTransaction,
    getTransactions,
    getStatistics,
    cancelTransaction,
    downloadStatement,
    calculateCommission
  };
})();
