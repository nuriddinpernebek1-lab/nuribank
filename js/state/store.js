/**
 * State Store
 * Простой Event-based Store для управления состоянием
 * Альтернатива Redux для vanilla JS
 */

const Store = (() => {
  // Слушатели изменений
  const listeners = {};
  
  // Состояние приложения
  const createInitialState = () => ({
    // Auth
    isAuthenticated: false,
    user: null,
    token: null,

    // UI State
    currentPage: 'home',
    isLoading: false,
    notification: null,

    // Data
    transactions: [],
    credits: [],
    products: [],

    // Settings
    userPreferences: {
      theme: 'light',
      language: 'ru'
    }
  });

  let state = createInitialState();

  /**
   * Получить всё состояние
   * @returns {Object}
   */
  const getState = () => ({ ...state });

  /**
   * Получить часть состояния
   * @param {string} path - 'user.name' или 'isAuthenticated'
   * @returns {any}
   */
  const getValue = (path) => {
    return path.split('.').reduce((obj, key) => obj?.[key], state);
  };

  /**
   * Обновить состояние (partial update)
   * @param {Object} newState
   */
  const setState = (newState) => {
    const oldState = { ...state };
    state = { ...state, ...newState };

    // Вызываем слушателей
    Object.keys(newState).forEach(key => {
      if (listeners[key]) {
        listeners[key].forEach(callback => {
          callback(newState[key], oldState[key]);
        });
      }
    });

    // Глобальный слушатель на все изменения
    if (listeners['*']) {
      listeners['*'].forEach(callback => {
        callback(state, oldState);
      });
    }

    return state;
  };

  /**
   * Подписаться на изменения состояния
   * @param {string} key - 'user', 'isLoading', '*' для всех
   * @param {Function} callback
   * @returns {Function} unsubscribe
   */
  const subscribe = (key, callback) => {
    if (!listeners[key]) {
      listeners[key] = [];
    }

    listeners[key].push(callback);

    // Возвращаем функцию отписки
    return () => {
      listeners[key] = listeners[key].filter(cb => cb !== callback);
    };
  };

  /**
   * Одноразовая подписка
   * @param {string} key
   * @param {Function} callback
   */
  const once = (key, callback) => {
    const unsubscribe = subscribe(key, (value, oldValue) => {
      callback(value, oldValue);
      unsubscribe();
    });
  };

  /**
   * Отписаться от всех слушателей ключа
   * @param {string} key
   */
  const unsubscribeAll = (key) => {
    if (listeners[key]) {
      listeners[key] = [];
    }
  };

  /**
   * Dispatch действия (для более сложной логики)
   * @param {string} action
   * @param {any} payload
   */
  const dispatch = (action, payload) => {
    const handlers = {
      // Auth actions
      'auth:login': () => {
        setState({
          isAuthenticated: true,
          user: payload.user,
          token: payload.token
        });
      },
      'auth:logout': () => {
        setState({
          isAuthenticated: false,
          user: null,
          token: null
        });
      },

      // UI actions
      'ui:loading': () => {
        setState({ isLoading: payload });
      },
      'ui:showNotification': () => {
        setState({ notification: payload });
      },
      'ui:navigate': () => {
        setState({ currentPage: payload });
      },

      // Data actions
      'data:setTransactions': () => {
        setState({ transactions: payload });
      },
      'data:addTransaction': () => {
        const transactions = [...state.transactions, payload];
        setState({ transactions });
      }
    };

    if (handlers[action]) {
      handlers[action]();
    } else {
      console.warn(`Unknown action: ${action}`);
    }
  };

  /**
   * Очистить состояние (при logout)
   */
  const reset = () => {
    setState(createInitialState());
  };

  return {
    getState,
    getValue,
    setState,
    subscribe,
    once,
    unsubscribeAll,
    dispatch,
    reset
  };
})();

// 🔴 ВАЖНО: сделать доступным глобально
window.Store = Store;

/**
 * Помощник для работы со Store в компонентах
 * Автоматически подписывается и обновляет элемент
 */
const useStore = (key, selector = null) => {
  return {
    subscribe(element, render) {
      const unsubscribe = Store.subscribe(key, (value) => {
        const data = selector ? selector(value) : value;
        render(element, data);
      });

      // Initial render
      const value = Store.getValue(key);
      const data = selector ? selector(value) : value;
      render(element, data);

      return unsubscribe;
    }
  };
};
