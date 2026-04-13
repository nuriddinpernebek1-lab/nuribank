/**
 * Router
 * Simple SPA Router для управления навигацией без #hash
 */

const Router = (() => {
  let routes = {};
  let currentPath = '/';
  const mainElement = document.getElementById('main-content');
  const usesHashRouting = true;

  const normalizePath = (path = '/') => {
    if (!path || path === '#') return '/';
    const cleanPath = String(path).replace(/^#/, '');
    return cleanPath.startsWith('/') ? cleanPath : `/${cleanPath}`;
  };

  /**
   * Регистрация маршрута
   * @param {string} path - '/dashboard', '/credits', '/profile'
   * @param {Function|Object} component - render функция или объект с render/init
   * @param {Object} options
   */
  const register = (path, component, options = {}) => {
    routes[path] = {
      component: typeof component === 'function' 
        ? { render: component } 
        : component,
      requiresAuth: options.requiresAuth !== false,
      title: options.title || 'Ilyas Bank'
    };
  };

  /**
   * Перейти на маршрут
   * @param {string} path
   * @param {Object} params
   */
  const navigate = (path, params = {}) => {
    path = normalizePath(path);
    const route = routes[path];

    // Если маршрута нет, идём на главную
    if (!route) {
      console.warn(`Route not found: ${path}, defaulting to /`);
      return navigate('/');
    }

    // Проверка авторизации
    if (route.requiresAuth && !Store.getValue('isAuthenticated')) {
      return navigate('/login', { redirect: path });
    }

    // Обновляем хисторию
    if (usesHashRouting) {
      const nextHash = `#${path}`;
      if (window.location.hash !== nextHash) {
        window.location.hash = nextHash;
      }
    } else {
      try {
        window.history.pushState({ path, params }, route.title, path);
      } catch (error) {
        console.warn('History navigation failed, falling back to hash routing:', error);
        window.location.hash = `#${path}`;
      }
    }
    currentPath = path;

    // Обновляем Store
    Store.dispatch('ui:navigate', path);

    // Обновляем title документа
    document.title = `${route.title} - Ilyas Bank`;

    // Скролл в начало
    window.scrollTo(0, 0);

    // Рендер компонента
    renderRoute(route, params);
  };

  /**
   * Рендер маршрута
   * @param {Object} route
   * @param {Object} params
   */
  const renderRoute = async (route, params = {}) => {
    try {
      Store.dispatch('ui:loading', true);

      if (!mainElement) {
        console.error('main-content element not found');
        return;
      }

      // Вызываем render
      const html = await Promise.resolve(route.component.render(params));
      mainElement.innerHTML = html;

      // Вызываем init если существует
      if (route.component.init && typeof route.component.init === 'function') {
        route.component.init(params);
      }

      Store.dispatch('ui:loading', false);
    } catch (error) {
      console.error('Route render error:', error);
      mainElement.innerHTML = `
        <div class="container" style="padding: 2rem; text-align: center;">
          <h1>❌ Ошибка загрузки страницы</h1>
          <p style="color: var(--text-light); margin: 1rem 0;">${error.message}</p>
          <button class="btn btn-primary" onclick="Router.navigate('/')">На главную</button>
        </div>
      `;
      Store.dispatch('ui:loading', false);
    }
  };

  /**
   * Получить текущий маршрут
   */
  const getCurrentPath = () => currentPath;

  /**
   * Поддержка browser back/forward
   */
  const setupHistoryListener = () => {
    window.addEventListener('popstate', (event) => {
      const path = normalizePath(event.state?.path || '/');
      const route = routes[path];
      if (route) {
        currentPath = path;
        renderRoute(route, event.state?.params || {});
      }
    });

    window.addEventListener('hashchange', () => {
      if (!usesHashRouting) return;
      const path = normalizePath(window.location.hash || '/');
      const route = routes[path] || routes['/'];
      currentPath = routes[path] ? path : '/';
      renderRoute(route);
    });
  };

  /**
   * Инициализировать роутер
   * @param {Object} routeMap - { '/': HomePage, '/dashboard': DashboardPage, ... }
   */
  const init = (routeMap) => {
    // Регистрируем все маршруты
    Object.entries(routeMap).forEach(([path, config]) => {
      register(path, config.component, config.options);
    });

    // Слушаем история
    setupHistoryListener();

    // Начальная навигация
    const initialPath = usesHashRouting
      ? normalizePath(window.location.hash || '/')
      : normalizePath(window.location.pathname || '/');
    const fallbackPath = routes[initialPath] ? initialPath : '/';
    navigate(fallbackPath);
  };

  /**
   * Получить ссылку для маршрута (для <a> тегов)
   */
  const link = (path, text = path) => {
    const routePath = normalizePath(path);
    return `<a href="#${routePath}" onclick="Router.navigate('${routePath}'); return false;">${text}</a>`;
  };

  return {
    register,
    navigate,
    getCurrentPath,
    init,
    link
  };
})();

// 🔴 ВАЖНО: сделать доступным глобально
window.Router = Router;

/**
 * Перехватываем клики на внутренние ссылки
 */
document.addEventListener('click', (event) => {
  const link = event.target.closest('a');
  if (link && link.href && !link.target && !link.download) {
    const href = link.getAttribute('href');
    
    // Игнорируем якоря и внешние ссылки
    if (!href || href === '#' || href.startsWith('#') || href.includes('://')) {
      return;
    }

    // Если это внутренняя ссылка
    if (href.startsWith('/')) {
      event.preventDefault();
      Router.navigate(href);
    }
  }
});
