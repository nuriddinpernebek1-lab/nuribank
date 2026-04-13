/**
 * UI Components
 * Переиспользуемые компоненты для интерфейса
 */

const Components = (() => {
  /**
   * Кнопка
   * @param {string} text
   * @param {string} type - 'primary', 'secondary', 'danger', 'success', 'outline'
   * @param {Function} onClick
   * @param {Object} options
   */
  const button = (text, type = 'primary', onClick = null, options = {}) => {
    const {
      disabled = false,
      fullWidth = false,
      size = 'md', // sm, md, lg
      icon = null,
      className = ''
    } = options;

    const sizeMap = {
      sm: 'padding: 6px 12px; font-size: 0.875rem;',
      md: 'padding: 10px 16px; font-size: 1rem;',
      lg: 'padding: 12px 20px; font-size: 1.1rem;'
    };

    const typeMap = {
      primary: 'background: var(--primary-color); color: white;',
      secondary: 'background: var(--secondary-color); color: white;',
      danger: 'background: var(--danger-color); color: white;',
      success: 'background: var(--success-color); color: white;',
      outline: 'background: transparent; color: var(--primary-color); border: 1px solid var(--primary-color);'
    };

    return `
      <button
        class="btn btn-${type} ${className}"
        style="
          ${typeMap[type] || typeMap.primary}
          ${sizeMap[size] || sizeMap.md}
          ${fullWidth ? 'width: 100%;' : ''}
          border-radius: 8px;
          border: none;
          cursor: ${disabled ? 'not-allowed' : 'pointer'};
          opacity: ${disabled ? '0.5' : '1'};
          font-weight: 500;
          transition: all 0.2s ease;
        "
        ${disabled ? 'disabled' : ''}
        onclick="${onClick || 'void(0)'}"
      >
        ${icon ? `<span style="margin-right: 6px;">${icon}</span>` : ''}
        ${Sanitizer.escapeHTML(text)}
      </button>
    `;
  };

  /**
   * Input поле
   * @param {string} type - 'text', 'email', 'password', 'number', 'tel'
   * @param {string} placeholder
   * @param {Object} options
   */
  const input = (type = 'text', placeholder = '', options = {}) => {
    const {
      id = '',
      name = '',
      value = '',
      error = null,
      required = false,
      disabled = false,
      pattern = null,
      className = ''
    } = options;

    const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

    return `
      <div class="form-group" style="margin-bottom: 1rem;">
        ${options.label ? `<label for="${inputId}" style="display: block; margin-bottom: 6px; font-weight: 500; color: var(--text-dark);">${Sanitizer.escapeHTML(options.label)}</label>` : ''}
        <input
          type="${type}"
          id="${inputId}"
          name="${name}"
          class="form-input ${className}"
          placeholder="${Sanitizer.escapeHTML(placeholder)}"
          value="${Sanitizer.escapeHTML(String(value))}"
          ${required ? 'required' : ''}
          ${disabled ? 'disabled' : ''}
          ${pattern ? `pattern="${pattern}"` : ''}
          style="
            width: 100%;
            padding: 10px 12px;
            border: 1px solid ${error ? 'var(--danger-color)' : 'var(--border-color)'};
            border-radius: 8px;
            font-size: 1rem;
            font-family: inherit;
            transition: all 0.2s ease;
            background: white;
          "
          onkeyup="this.style.borderColor = '${error ? 'var(--danger-color)' : 'var(--primary-color)'}'"
          onblur="this.style.borderColor = '${error ? 'var(--danger-color)' : 'var(--border-color)'}'"
        />
        ${error ? `<p style="color: var(--danger-color); font-size: 0.85rem; margin-top: 4px;">${Sanitizer.escapeHTML(error)}</p>` : ''}
      </div>
    `;
  };

  /**
   * Select поле
   * @param {string} name
   * @param {Object} options - { value: label, ... }
   * @param {Object} htmlOptions
   */
  const select = (name, options = {}, htmlOptions = {}) => {
    const {
      value = '',
      label = '',
      error = null,
      required = false
    } = htmlOptions;

    return `
      <div class="form-group" style="margin-bottom: 1rem;">
        ${label ? `<label style="display: block; margin-bottom: 6px; font-weight: 500; color: var(--text-dark);">${Sanitizer.escapeHTML(label)}</label>` : ''}
        <select
          name="${name}"
          style="
            width: 100%;
            padding: 10px 12px;
            border: 1px solid ${error ? 'var(--danger-color)' : 'var(--border-color)'};
            border-radius: 8px;
            font-size: 1rem;
            font-family: inherit;
            background: white;
            cursor: pointer;
          "
          ${required ? 'required' : ''}
        >
          ${Object.entries(options).map(([key, val]) => `
            <option value="${key}" ${value === key ? 'selected' : ''}>
              ${Sanitizer.escapeHTML(val)}
            </option>
          `).join('')}
        </select>
        ${error ? `<p style="color: var(--danger-color); font-size: 0.85rem; margin-top: 4px;">${Sanitizer.escapeHTML(error)}</p>` : ''}
      </div>
    `;
  };

  /**
   * Card компонент
   * @param {string} content - HTML
   * @param {Object} options
   */
  const card = (content, options = {}) => {
    const {
      title = '',
      className = '',
      shadow = 'md'
    } = options;

    return `
      <div class="card ${className}" style="
        background: white;
        border-radius: 12px;
        padding: 1.5rem;
        ${shadow === 'sm' ? 'box-shadow: 0 1px 3px rgba(0,0,0,0.12);' : ''}
        ${shadow === 'md' ? 'box-shadow: 0 4px 6px rgba(0,0,0,0.1);' : ''}
        ${shadow === 'lg' ? 'box-shadow: 0 20px 25px rgba(0,0,0,0.1);' : ''}
      ">
        ${title ? `<h3 style="margin-top: 0; margin-bottom: 1rem; color: var(--text-dark); font-size: 1.25rem;">${Sanitizer.escapeHTML(title)}</h3>` : ''}
        ${content}
      </div>
    `;
  };

  /**
   * Loading Skeleton
   * @param {number} lines - кол-во линий
   */
  const skeleton = (lines = 3, options = {}) => {
    return `
      <div style="animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;">
        ${Array(lines).fill().map(() => `
          <div style="
            height: 16px;
            background: var(--border-color);
            border-radius: 8px;
            margin-bottom: 12px;
            opacity: 0.6;
          "></div>
        `).join('')}
      </div>
    `;
  };

  /**
   * Empty State
   * @param {string} icon
   * @param {string} title
   * @param {string} description
   */
  const emptyState = (icon, title, description, actionButton = null) => {
    return `
      <div style="
        text-align: center;
        padding: 3rem 1rem;
        color: var(--text-light);
      ">
        <div style="font-size: 4rem; margin-bottom: 1rem; opacity: 0.5;">
          ${icon}
        </div>
        <h3 style="margin-bottom: 0.5rem; color: var(--text-dark);">
          ${Sanitizer.escapeHTML(title)}
        </h3>
        <p style="margin-bottom: 1.5rem; opacity: 0.7;">
          ${Sanitizer.escapeHTML(description)}
        </p>
        ${actionButton ? actionButton : ''}
      </div>
    `;
  };

  /**
   * Alert компонент
   * @param {string} message
   * @param {string} type - 'success', 'error', 'warning', 'info'
   */
  const alert = (message, type = 'info') => {
    const colors = {
      success: { bg: '#ECFDF5', text: '#10B981', border: '#6EE7B7' },
      error: { bg: '#FEF2F2', text: '#EF4444', border: '#FECACA' },
      warning: { bg: '#FFFBEB', text: '#F59E0B', border: '#FCD34D' },
      info: { bg: '#EFF6FF', text: '#3B82F6', border: '#BFDBFE' }
    };

    const config = colors[type] || colors.info;

    return `
      <div style="
        background: ${config.bg};
        border-left: 4px solid ${config.text};
        padding: 1rem;
        border-radius: 8px;
        margin-bottom: 1rem;
        color: ${config.text};
      ">
        ${Sanitizer.escapeHTML(message)}
      </div>
    `;
  };

  /**
   * Transaction Item
   * @param {Object} transaction
   */
  const transactionItem = (tx) => {
    const statusMap = {
      'PENDING': { bg: '#FEF3C7', text: '#D97706', icon: '⏳' },
      'SUCCESS': { bg: '#ECFDF5', text: '#10B981', icon: '✓' },
      'FAILED': { bg: '#FEF2F2', text: '#EF4444', icon: '✕' }
    };

    const config = statusMap[tx.status] || statusMap.PENDING;
    const isExpense = tx.type === 'PAYMENT' || tx.type === 'TRANSFER' || tx.type === 'PURCHASE';

    return `
      <div style="
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid var(--border-color);
        transition: background 0.2s ease;
      "
      onmouseover="this.style.background = '#F9FAFB'"
      onmouseout="this.style.background = 'transparent'">
        <div style="flex: 1;">
          <h5 style="margin: 0 0 0.25rem 0; color: var(--text-dark);">
            ${Sanitizer.escapeHTML(tx.description)}
          </h5>
          <p style="margin: 0; font-size: 0.85rem; color: var(--text-light);">
            ${new Date(tx.createdAt).toLocaleString('ru-RU')}
          </p>
        </div>
        <div style="text-align: right; margin-right: 1rem;">
          <div style="color: ${isExpense ? '#EF4444' : '#10B981'}; font-weight: 600;">
            ${isExpense ? '-' : '+'}${formatPrice(tx.amount)} ₸
          </div>
          <p style="margin: 0.25rem 0 0 0; font-size: 0.8rem; color: var(--text-light);">
            Комиссия: ${formatPrice(tx.commission)} ₸
          </p>
        </div>
        <div style="
          display: flex;
          align-items: center;
          gap: 6px;
          background: ${config.bg};
          color: ${config.text};
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 0.85rem;
          font-weight: 500;
        ">
          ${config.icon} ${Sanitizer.escapeHTML(tx.status)}
        </div>
      </div>
    `;
  };

  /**
   * Форматирование цены
   */
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ru-RU').format(Math.round(price));
  };

  return {
    button,
    input,
    select,
    card,
    skeleton,
    emptyState,
    alert,
    transactionItem,
    formatPrice
  };
})();

// 🔴 ВАЖНО: сделать доступным глобально
window.Components = Components;

// Глобальная функция для форматирования (совместимость)
function formatPrice(price) {
  return Components.formatPrice(price);
}
