/**
 * Credits Module
 * Управление кредитами с графиком платежей
 */

const CreditsModule = (() => {
  const CONFIG = {
    MIN_AMOUNT: 50000,     // Минимум 50K
    MAX_AMOUNT: 5000000,   // Максимум 5M
    RATES: {
      3: 5,    // 5% за 3 месяца
      6: 8,    // 8% за 6 месяцев
      12: 10,  // 10% за 12 месяцев
      24: 12   // 12% за 24 месяца
    }
  };

  /**
   * Получить кредит
   * @param {number} amount - сумма
   * @param {number} termMonths - срок (3, 6, 12, 24)
   */
  const getCredit = async (amount, termMonths) => {
    try {
      const user = AuthModule.getCurrentUser();
      if (!user) {
        throw new Error('Необходимо авторизоваться');
      }

      // Валидация  
      if (!Validator.isValidAmount(amount, CONFIG.MIN_AMOUNT, CONFIG.MAX_AMOUNT)) {
        throw new Error(`Сумма должна быть от ${formatPrice(CONFIG.MIN_AMOUNT)} до ${formatPrice(CONFIG.MAX_AMOUNT)} ₸`);
      }

      if (!Object.keys(CONFIG.RATES).includes(String(termMonths))) {
        throw new Error('Некорректный срок кредита');
      }

      // Проверяем нет ли активного кредита
      if (user.credit && user.credit.status === 'ACTIVE') {
        throw new Error('У вас уже есть активный кредит');
      }

      // Создаём график платежей
      const schedule = generatePaymentSchedule(amount, termMonths);
      const rate = CONFIG.RATES[termMonths];

      // Создаём объект кредита
      const credit = {
        id: 'credit_' + Date.now(),
        principalAmount: amount,
        rate,
        termMonths,
        status: 'ACTIVE',
        startDate: new Date().toISOString(),
        nextPaymentDate: schedule[0].dueDate,
        schedule,
        totalAmountToRepay: schedule.reduce((sum, p) => sum + p.totalPayment, 0),
        amountPaid: 0,
        paymentsMade: 0
      };

      Store.dispatch('ui:loading', true);

      // Симулируем обработку
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Пополняем баланс пользователя
      user.balance += amount;
      user.credit = credit;

      Store.setState({ user });
      API.setUser(user);

      Store.dispatch('ui:loading', false);

      Notifications.success(`✓ Кредит на сумму ${formatPrice(amount)} ₸ выдан`);

      // Создаём транзакцию CREDIT
      await TransactionsModule.createTransaction('CREDIT', amount, {
        description: `Кредит на ${termMonths} месяцев (${rate}% годовых)`
      });

      return credit;
    } catch (error) {
      Store.dispatch('ui:loading', false);
      Notifications.error(error.message);
      throw error;
    }
  };

  /**
   * Сгенерировать график платежей
   * @param {number} amount - основная сумма
   * @param {number} months - количество месяцев
   */
  const generatePaymentSchedule = (amount, months) => {
    const rate = CONFIG.RATES[months];
    const monthlyRate = (rate / 100) / 12; // Месячная ставка
    
    const monthlyPayment = Math.ceil(
      amount / months * (1 + monthlyRate * months)
    );

    const schedule = [];
    const startDate = new Date();

    let remainingPrincipal = amount;

    for (let i = 1; i <= months; i++) {
      const dueDate = new Date(startDate);
      dueDate.setMonth(dueDate.getMonth() + i);

      const interestPayment = Math.ceil(remainingPrincipal * monthlyRate);
      const principalPayment = Math.ceil(monthlyPayment - interestPayment);

      const payment = {
        paymentNumber: i,
        dueDate: dueDate.toISOString(),
        principalPayment,
        interestPayment,
        totalPayment: principalPayment + interestPayment,
        paid: false,
        paidDate: null,
        status: 'PENDING'
      };

      schedule.push(payment);
      remainingPrincipal -= principalPayment;
    }

    return schedule;
  };

  /**
   * Сделать платёж по кредиту
   * @param {string} creditId
   */
  const makePayment = async (creditId) => {
    try {
      const user = AuthModule.getCurrentUser();
      if (!user || !user.credit || user.credit.id !== creditId) {
        throw new Error('Кредит не найден');
      }

      const credit = user.credit;
      if (credit.status !== 'ACTIVE') {
        throw new Error('Кредит не активен');
      }

      // Находим следующий платёж
      const nextPayment = credit.schedule.find(p => !p.paid);
      if (!nextPayment) {
        throw new Error('Нет платежей к выплате');
      }

      // Проверяем баланс
      if (user.balance < nextPayment.totalPayment) {
        throw new Error(`Недостаточно средств. Нужно: ${formatPrice(nextPayment.totalPayment)} ₸`);
      }

      // Обновляем баланс
      user.balance -= nextPayment.totalPayment;

      // Отмечаем платёж как выполненный
      nextPayment.paid = true;
      nextPayment.paidDate = new Date().toISOString();
      nextPayment.status = 'SUCCESS';

      // Обновляем статистику кредита
      credit.amountPaid += nextPayment.principalPayment;
      credit.paymentsMade += 1;

      // Проверяем полностью ли кредит погашен
      const allPaid = credit.schedule.every(p => p.paid);
      if (allPaid) {
        credit.status = 'PAID_OFF';
        user.credit = null; // Кредит закрыт
      } else {
        // Обновляем дату следующего платежа
        const futurePayment = credit.schedule.find(p => !p.paid);
        credit.nextPaymentDate = futurePayment?.dueDate || null;
      }

      // Обновляем User
      Store.setState({ user });
      API.setUser(user);

      // Создаём транзакцию PAYMENT
      await TransactionsModule.createTransaction('PAYMENT', nextPayment.totalPayment, {
        description: `Платёж по кредиту (${credit.paymentsMade}/${credit.termMonths})`
      });

      Notifications.success(`✓ Платёж ${formatPrice(nextPayment.totalPayment)} ₸ выполнен`);

      if (allPaid) {
        Notifications.success('🎉 Кредит полностью погашен!');
      }

      return nextPayment;
    } catch (error) {
      Notifications.error(error.message);
      throw error;
    }
  };

  /**
   * Автоматический платёж каждый месяц (если включено)
   */
  const enableAutoPayment = (creditId) => {
    const user = AuthModule.getCurrentUser();
    if (user && user.credit && user.credit.id === creditId) {
      user.credit.autoPayment = true;
      Store.setState({ user });
      Notifications.success('✓ Автоматический платёж включен');
    }
  };

  /**
   * Досрочное погашение кредита
   * @param {string} creditId
   */
  const earlyRepayment = async (creditId) => {
    try {
      const user = AuthModule.getCurrentUser();
      if (!user || !user.credit || user.credit.id !== creditId) {
        throw new Error('Кредит не найден');
      }

      const credit = user.credit;
      const remainingPayments = credit.schedule.filter(p => !p.paid);
      
      if (remainingPayments.length === 0) {
        throw new Error('Нет активных платежей');
      }

      // Сумма всех оставшихся платежей
      const totalRemaining = remainingPayments.reduce((sum, p) => sum + p.totalPayment, 0);

      if (user.balance < totalRemaining) {
        throw new Error(`Недостаточно средств для досрочного погашения. Нужно: ${formatPrice(totalRemaining)} ₸`);
      }

      Store.dispatch('ui:loading', true);

      // Отмечаем все оставшиеся платежи как выполненные
      remainingPayments.forEach(payment => {
        payment.paid = true;
        payment.paidDate = new Date().toISOString();
        payment.status = 'SUCCESS';
      });

      // Обновляем баланс и кредит
      user.balance -= totalRemaining;
      credit.amountPaid = credit.principalAmount;
      credit.paymentsMade = credit.schedule.length;
      credit.status = 'PAID_OFF';
      user.credit = null;

      await new Promise(resolve => setTimeout(resolve, 1000));

      Store.setState({ user });
      API.setUser(user);
      Store.dispatch('ui:loading', false);

      // Создаём транзакцию
      await TransactionsModule.createTransaction('PAYMENT', totalRemaining, {
        description: 'Досрочное погашение кредита'
      });

      Notifications.success('🎉 Кредит полностью погашен досрочно!');

      return credit;
    } catch (error) {
      Store.dispatch('ui:loading', false);
      Notifications.error(error.message);
      throw error;
    }
  };

  /**
   * Получить информацию о кредите
   */
  const getCurrentCredit = (creditId = null) => {
    const user = AuthModule.getCurrentUser();
    if (!user) return null;

    if (creditId) {
      return user.credit && user.credit.id === creditId ? user.credit : null;
    }

    return user.credit || null;
  };

  /**
   * Получить статистику по кредитам (всех и текущего)
   */
  const getCreditStats = () => {
    const user = AuthModule.getCurrentUser();
    const transactions = Store.getValue('transactions') || [];

    const creditTransactions = transactions.filter(tx => tx.type === 'CREDIT');
    const paymentTransactions = transactions.filter(tx => 
      tx.type === 'PAYMENT' && 
      tx.description.includes('кредит')
    );

    return {
      totalCreditsReceived: creditTransactions.length,
      totalCreditAmount: creditTransactions.reduce((sum, tx) => sum + tx.amount, 0),
      totalPaymentsToCredits: paymentTransactions.reduce((sum, tx) => sum + tx.amount, 0),
      hasActiveCredit: user?.credit?.status === 'ACTIVE',
      activeCredit: user?.credit || null
    };
  };

  return {
    getCredit,
    getCurrentCredit,
    generatePaymentSchedule,
    makePayment,
    enableAutoPayment,
    earlyRepayment,
    getCreditStats,
    CONFIG
  };
})();
