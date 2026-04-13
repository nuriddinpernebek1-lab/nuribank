/**
 * API Service
 * Обёртка для fetch запросов с JWT токенами, обработкой ошибок
 */

const API = (() => {
  // API endpoint
  const BASE_URL = 'http://localhost:3000/api'; // Будет работать с backend
  const LOCAL_API = './api'; // Fallback для demo режима

  // Token storage (НЕ localStorage для пароля!)
  const TOKEN_KEY = 'auth_token';
  const USER_KEY = 'user_data';

  /**
   * Получить текущий токен
   * @returns {string|null}
   */
  const getToken = () => {
    // Проверяем sessionStorage (более безопасно)
    return sessionStorage.getItem(TOKEN_KEY) || localStorage.getItem(TOKEN_KEY);
  };

  /**
   * Сохранить токен
   * @param {string} token
   * @param {boolean} persistent - сохранять ли при перезагрузке
   */
  const setToken = (token, persistent = false) => {
    if (persistent) {
      localStorage.setItem(TOKEN_KEY, token);
    }
    sessionStorage.setItem(TOKEN_KEY, token);
  };

  /**
   * Удалить токен
   */
  const clearToken = () => {
    sessionStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(TOKEN_KEY);
  };

  /**
   * Получить пользователя
   * @returns {Object|null}
   */
  const getUser = () => {
    const stored = sessionStorage.getItem(USER_KEY);
    return stored ? JSON.parse(stored) : null;
  };

  /**
   * Сохранить пользователя
   * @param {Object} user
   */
  const setUser = (user) => {
    sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  };

  /**
   * Базовый fetch с обработкой ошибок и JWT
   * @param {string} endpoint
   * @param {Object} options
   * @returns {Promise}
   */
  const request = async (endpoint, options = {}) => {
    const url = endpoint.startsWith('http') ? endpoint : `${BASE_URL}${endpoint}`;
    
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers
    };

    // Добавляем JWT токен если существует и не в auth запросе
    const token = getToken();
    if (token && !options.skipAuth) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers
      });

      // Обработка ответа
      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const error = new Error(data.message || `HTTP ${response.status}`);
        error.status = response.status;
        error.data = data;

        // Если 401 - токен невалиден, очищаем
        if (response.status === 401) {
          clearToken();
          window.dispatchEvent(new CustomEvent('auth:expired'));
        }

        throw error;
      }

      return data;
    } catch (error) {
      console.error('API Error:', error);
      throw error;
    }
  };

  /**
   * GET запрос
   * @param {string} endpoint
   * @param {Object} options
   * @returns {Promise}
   */
  const get = (endpoint, options = {}) => {
    return request(endpoint, { ...options, method: 'GET' });
  };

  /**
   * POST запрос
   * @param {string} endpoint
   * @param {Object} body
   * @param {Object} options
   * @returns {Promise}
   */
  const post = (endpoint, body = {}, options = {}) => {
    return request(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(body)
    });
  };

  /**
   * PUT запрос
   * @param {string} endpoint
   * @param {Object} body
   * @param {Object} options
   * @returns {Promise}
   */
  const put = (endpoint, body = {}, options = {}) => {
    return request(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(body)
    });
  };

  /**
   * DELETE запрос
   * @param {string} endpoint
   * @param {Object} options
   * @returns {Promise}
   */
  const delete_ = (endpoint, options = {}) => {
    return request(endpoint, { ...options, method: 'DELETE' });
  };

  /**
   * PATCH запрос
   * @param {string} endpoint
   * @param {Object} body
   * @param {Object} options
   * @returns {Promise}
   */
  const patch = (endpoint, body = {}, options = {}) => {
    return request(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(body)
    });
  };

  /**
   * Demo API функции (если backend нет)
   * Симулирует задержку и успешный ответ
   */
  const simulateRequest = async (delay = 500) => {
    return new Promise(resolve => setTimeout(resolve, delay));
  };

  return {
    // Токен управление
    getToken,
    setToken,
    clearToken,

    // Пользователь
    getUser,
    setUser,

    // HTTP методы
    request,
    get,
    post,
    put,
    delete: delete_,
    patch,
    
    // Demo
    simulateRequest,
    BASE_URL
  };
})();

// 🔴 ВАЖНО: сделать доступным глобально
window.API = API;

/**
 * Прослушивание событий аутентификации
 */
window.addEventListener('auth:expired', () => {
  // Уведомляем пользователя что сессия истекла
  if (window.Notifications) {
    Notifications.error('Сессия истекла. Пожалуйста, авторизуйтесь заново');
  }
  // Перенаправляем на вход
  if (window.Router) {
    Router.navigate('/login');
  }
});
