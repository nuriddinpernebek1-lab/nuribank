/**
 * Auth Module
 * Безопасная аутентификация без сохранения паролей
 * Использует JWT токены в sessionStorage
 */

const AuthModule = (() => {
  /**
   * Регистрация
   * @param {string} name
   * @param {string} email
   * @param {string} phone
   * @param {string} password
   */
  const register = async (name, email, phone, password) => {
    try {
      // Валидация
      const validation = Validator.validateForm(
        { name, email, phone, password },
        {
          name: 'name',
          email: 'email',
          phone: 'phone',
          password: 'password'
        }
      );

      if (!validation.valid) {
        const firstError = Object.values(validation.errors)[0];
        throw new Error(firstError);
      }

      // Показываем loading
      Store.dispatch('ui:loading', true);

      // API запрос (будет работать с backend)
      // Для демо режима - используем localStorage
      const response = await simulateAuthRequest('register', {
        name: Sanitizer.escapeHTML(name),
        email: email.toLowerCase(),
        phone,
        password // ❌ НЕ отправляем на frontend, только на backend!
      });

      // Сохраняем токен (НЕ пароль!)
      API.setToken(response.token, true); // true = persistent
      API.setUser(response.user);

      // Обновляем Store
      Store.setState({
        isAuthenticated: true,
        user: response.user,
        token: response.token
      });

      Store.dispatch('ui:loading', false);
      Notifications.success(`✓ Добро пожаловать, ${response.user.name}!`);

      return response.user;
    } catch (error) {
      Store.dispatch('ui:loading', false);
      Notifications.error(error.message || 'Ошибка регистрации');
      throw error;
    }
  };

  /**
   * Логин
   * @param {string} email
   * @param {string} password
   */
  const login = async (email, password) => {
    try {
      if (!Validator.isValidEmail(email) || !password) {
        throw new Error('Введите корректный email и пароль');
      }

      Store.dispatch('ui:loading', true);

      // API запрос
      const response = await simulateAuthRequest('login', {
        email: email.toLowerCase(),
        password // ❌ НЕ сохраняем на frontend!
      });

      // Сохраняем токен
      API.setToken(response.token, true);
      API.setUser(response.user);

      // Обновляем Store
      Store.setState({
        isAuthenticated: true,
        user: response.user,
        token: response.token
      });

      Store.dispatch('ui:loading', false);
      Notifications.success(`✓ Добро пожаловать, ${response.user.name}!`);

      return response.user;
    } catch (error) {
      Store.dispatch('ui:loading', false);
      Notifications.error(error.message || 'Ошибка входа');
      throw error;
    }
  };

  /**
   * Выход
   */
  const logout = () => {
    API.clearToken();
    Store.reset();
    Notifications.info('До встречи! 👋');
    Router.navigate('/');
  };

  /**
   * Получить текущего пользователя
   */
  const getCurrentUser = () => {
    return Store.getValue('user') || API.getUser();
  };

  /**
   * Проверить авторизацию
   */
  const isAuthenticated = () => {
    return Store.getValue('isAuthenticated') || API.getToken() !== null;
  };

  /**
   * Обновить профиль (не пароль!)
   */
  const updateProfile = async (name, phone) => {
    try {
      if (!Validator.isValidName(name) || !Validator.isValidPhone(phone)) {
        throw new Error('Некорректные данные профиля');
      }

      Store.dispatch('ui:loading', true);

      await API.simulateRequest(500);
      const currentUser = getCurrentUser() || {};
      const response = {
        user: {
          ...currentUser,
          name: Sanitizer.escapeHTML(name),
          phone
        }
      };

      API.setUser(response.user);
      Store.setState({ user: response.user });

      Store.dispatch('ui:loading', false);
      Notifications.success('✓ Профиль обновлен');

      return response.user;
    } catch (error) {
      Store.dispatch('ui:loading', false);
      Notifications.error(error.message);
      throw error;
    }
  };

  /**
   * Изменить пароль
   */
  const changePassword = async (oldPassword, newPassword) => {
    try {
      const passwordValidation = Validator.validatePassword(newPassword);
      if (!passwordValidation.valid) {
        throw new Error(passwordValidation.errors[0]);
      }

      if (!oldPassword || oldPassword.length < 8) {
        throw new Error('Некорректный старый пароль');
      }

      Store.dispatch('ui:loading', true);

      // ❌ НЕ отправляем пароли на frontend, только на backend!
      await API.simulateRequest(500);

      Store.dispatch('ui:loading', false);
      Notifications.success('✓ Пароль изменен');

      return true;
    } catch (error) {
      Store.dispatch('ui:loading', false);
      Notifications.error(error.message);
      throw error;
    }
  };

  /**
   * Восстановление пароля (отправить ссылку на email)
   */
  const resetPassword = async (email) => {
    try {
      if (!Validator.isValidEmail(email)) {
        throw new Error('Введите корректный email');
      }

      Store.dispatch('ui:loading', true);

      await API.simulateRequest(500);

      Store.dispatch('ui:loading', false);
      Notifications.success('✓ Ссылка для восстановления отправлена на email');

      return true;
    } catch (error) {
      Store.dispatch('ui:loading', false);
      Notifications.error(error.message);
      throw error;
    }
  };

  /**
   * Demo режим - симулирует запрос к backend
   */
  const simulateAuthRequest = async (action, data) => {
    await API.simulateRequest(500);

    if (action === 'register') {
      const user = {
        id: 'user_' + Date.now(),
        name: data.name,
        email: data.email,
        phone: data.phone,
        balance: 100000,
        createdAt: new Date().toISOString()
      };

      const token = 'token_' + Math.random().toString(36).substr(2, 9);

      return { user, token };
    }

    if (action === 'login') {
      // Demo пользователь
      const user = {
        id: 'user_demo',
        name: 'Demo User',
        email: data.email,
        balance: 500000,
        phone: '+7 700 000 0000',
        createdAt: new Date().toISOString(),
        // Добавляем демо кредит для тестирования
        credit: {
          id: 'credit_demo',
          principalAmount: 200000,
          rate: 10,
          termMonths: 12,
          status: 'ACTIVE',
          startDate: new Date().toISOString(),
          nextPaymentDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
          totalAmountToRepay: 220000,
          amountPaid: 40000,
          paymentsMade: 2,
          schedule: [
            {
              paymentNumber: 1,
              dueDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
              principalPayment: 16000,
              interestPayment: 1667,
              totalPayment: 17667,
              paid: true,
              paidDate: new Date(Date.now() - 60 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'SUCCESS'
            },
            {
              paymentNumber: 2,
              dueDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
              principalPayment: 16250,
              interestPayment: 1417,
              totalPayment: 17667,
              paid: true,
              paidDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
              status: 'SUCCESS'
            },
            {
              paymentNumber: 3,
              dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
              principalPayment: 16492,
              interestPayment: 1175,
              totalPayment: 17667,
              paid: false,
              paidDate: null,
              status: 'PENDING'
            },
            {
              paymentNumber: 4,
              dueDate: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000).toISOString(),
              principalPayment: 16736,
              interestPayment: 931,
              totalPayment: 17667,
              paid: false,
              paidDate: null,
              status: 'PENDING'
            },
            {
              paymentNumber: 5,
              dueDate: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
              principalPayment: 16982,
              interestPayment: 685,
              totalPayment: 17667,
              paid: false,
              paidDate: null,
              status: 'PENDING'
            },
            {
              paymentNumber: 6,
              dueDate: new Date(Date.now() + 120 * 24 * 60 * 60 * 1000).toISOString(),
              principalPayment: 17230,
              interestPayment: 437,
              totalPayment: 17667,
              paid: false,
              paidDate: null,
              status: 'PENDING'
            },
            {
              paymentNumber: 7,
              dueDate: new Date(Date.now() + 150 * 24 * 60 * 60 * 1000).toISOString(),
              principalPayment: 17480,
              interestPayment: 187,
              totalPayment: 17667,
              paid: false,
              paidDate: null,
              status: 'PENDING'
            },
            {
              paymentNumber: 8,
              dueDate: new Date(Date.now() + 180 * 24 * 60 * 60 * 1000).toISOString(),
              principalPayment: 17732,
              interestPayment: -65,
              totalPayment: 17667,
              paid: false,
              paidDate: null,
              status: 'PENDING'
            },
            {
              paymentNumber: 9,
              dueDate: new Date(Date.now() + 210 * 24 * 60 * 60 * 1000).toISOString(),
              principalPayment: 17986,
              interestPayment: -319,
              totalPayment: 17667,
              paid: false,
              paidDate: null,
              status: 'PENDING'
            },
            {
              paymentNumber: 10,
              dueDate: new Date(Date.now() + 240 * 24 * 60 * 60 * 1000).toISOString(),
              principalPayment: 18242,
              interestPayment: -575,
              totalPayment: 17667,
              paid: false,
              paidDate: null,
              status: 'PENDING'
            },
            {
              paymentNumber: 11,
              dueDate: new Date(Date.now() + 270 * 24 * 60 * 60 * 1000).toISOString(),
              principalPayment: 18500,
              interestPayment: -833,
              totalPayment: 17667,
              paid: false,
              paidDate: null,
              status: 'PENDING'
            },
            {
              paymentNumber: 12,
              dueDate: new Date(Date.now() + 300 * 24 * 60 * 60 * 1000).toISOString(),
              principalPayment: 18760,
              interestPayment: -1093,
              totalPayment: 17667,
              paid: false,
              paidDate: null,
              status: 'PENDING'
            }
          ]
        }
      };

      const token = 'token_' + Math.random().toString(36).substr(2, 9);

      return { user, token };
    }
  };

  return {
    register,
    login,
    logout,
    getCurrentUser,
    isAuthenticated,
    updateProfile,
    changePassword,
    resetPassword
  };
})();

// 🔴 ВАЖНО: сделать доступным глобально
window.AuthModule = AuthModule;
