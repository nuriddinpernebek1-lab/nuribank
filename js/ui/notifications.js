/**
 * Notifications Service
 * Toast/Alert уведомления с разными типами
 */

const Notifications = (() => {
  const container = document.createElement('div');
  container.id = 'notifications-container';
  container.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    z-index: 3000;
    max-width: 400px;
    display: flex;
    flex-direction: column;
    gap: 12px;
  `;
  document.body.appendChild(container);

  /**
   * Показать уведомление
   * @param {string} message
   * @param {string} type - 'success', 'error', 'warning', 'info'
   * @param {number} duration - в миллисекундах
   */
  const show = (message, type = 'info', duration = 4000) => {
    const notification = document.createElement('div');
    
    const colors = {
      success: { bg: '#10B981', icon: '✓' },
      error: { bg: '#EF4444', icon: '✕' },
      warning: { bg: '#F59E0B', icon: '⚠' },
      info: { bg: '#3B82F6', icon: 'ℹ' }
    };

    const config = colors[type] || colors.info;

    notification.style.cssText = `
      background: ${config.bg};
      color: white;
      padding: 12px 16px;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
      display: flex;
      align-items: center;
      gap: 12px;
      animation: slideInRight 0.3s ease-out;
      font-size: 14px;
      font-weight: 500;
      line-height: 1.4;
      max-width: 100%;
      word-break: break-word;
    `;

    notification.innerHTML = `
      <span style="font-size: 18px; flex-shrink: 0;">${config.icon}</span>
      <span>${Sanitizer.escapeHTML(message)}</span>
      <button onclick="this.parentElement.remove()" style="
        margin-left: auto;
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        font-size: 18px;
        padding: 0;
        flex-shrink: 0;
      ">×</button>
    `;

    container.appendChild(notification);

    // Автоматическое удаление
    if (duration > 0) {
      setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease-out';
        setTimeout(() => notification.remove(), 300);
      }, duration);
    }

    return notification;
  };

  // Методы для каждого типа
  const success = (message, duration = 4000) => show(message, 'success', duration);
  const error = (message, duration = 5000) => show(message, 'error', duration);
  const warning = (message, duration = 4500) => show(message, 'warning', duration);
  const info = (message, duration = 4000) => show(message, 'info', duration);

  /**
   * Очистить все уведомления
   */
  const clearAll = () => {
    container.innerHTML = '';
  };

  return {
    show,
    success,
    error,
    warning,
    info,
    clearAll
  };
})();

// 🔴 ВАЖНО: сделать доступным глобально
window.Notifications = Notifications;

/**
 * Добавляем CSS анимации если их нет
 */
if (!document.getElementById('notifications-styles')) {
  const style = document.createElement('style');
  style.id = 'notifications-styles';
  style.textContent = `
    @keyframes slideInRight {
      from {
        transform: translateX(400px);
        opacity: 0;
      }
      to {
        transform: translateX(0);
        opacity: 1;
      }
    }

    @keyframes slideOutRight {
      from {
        transform: translateX(0);
        opacity: 1;
      }
      to {
        transform: translateX(400px);
        opacity: 0;
      }
    }

    @keyframes slideInUp {
      from {
        transform: translateY(20px);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }

    @keyframes fadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }

    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }

    @keyframes pulse {
      0%, 100% { opacity: 1; }
      50% { opacity: 0.5; }
    }

    @keyframes skeleton-loading {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
  `;
  document.head.appendChild(style);
}
