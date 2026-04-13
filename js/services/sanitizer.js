/**
 * Sanitizer Service
 * Защита от XSS атак, санитайзинг пользовательского ввода
 */

const Sanitizer = (() => {
  /**
   * Экранирование HTML специальных символов
   * @param {string} input
   * @returns {string}
   */
  const escapeHTML = (input) => {
    if (!input || typeof input !== 'string') return '';
    
    const map = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    
    return input.replace(/[&<>"']/g, (char) => map[char]);
  };

  /**
   * Удаление опасных атрибутов и тегов
   * @param {string} html
   * @returns {string}
   */
  const sanitizeHTML = (html) => {
    if (!html || typeof html !== 'string') return '';
    
    // Создаём временный парсер DOM
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    
    // Опасные теги
    const dangerousTags = ['script', 'iframe', 'object', 'embed', 'form'];
    dangerousTags.forEach(tag => {
      doc.querySelectorAll(tag).forEach(element => element.remove());
    });
    
    // Опасные атрибуты
    const dangerousAttrs = ['onclick', 'onload', 'onerror', 'onmouseover', 'onkeydown'];
    doc.querySelectorAll('*').forEach(element => {
      dangerousAttrs.forEach(attr => element.removeAttribute(attr));
    });
    
    return doc.body.innerHTML;
  };

  /**
   * Безопасное добавление текста в элемент (не HTML!)
   * @param {Element} element
   * @param {string} text
   */
  const safeSetText = (element, text) => {
    if (!element) return;
    element.textContent = text; // textContent = безопасно!
  };

  /**
   * Безопасное добавление HTML (если контент от сервера)
   * @param {Element} element
   * @param {string} html
   */
  const safeSetHTML = (element, html) => {
    if (!element) return;
    const clean = sanitizeHTML(html);
    element.innerHTML = clean;
  };

  /**
   * Методы для очистки формы
   * @param {Object} formData
   * @returns {Object} чистые данные
   */
  const sanitizeFormData = (formData) => {
    const cleaned = {};
    
    for (const [key, value] of Object.entries(formData)) {
      if (typeof value === 'string') {
        cleaned[key] = escapeHTML(value.trim());
      } else {
        cleaned[key] = value;
      }
    }
    
    return cleaned;
  };

  /**
   * Проверка URL (только http/https)
   * @param {string} url
   * @returns {boolean}
   */
  const isValidURL = (url) => {
    if (!url || typeof url !== 'string') return false;
    try {
      const urlObj = new URL(url);
      return ['http:', 'https:'].includes(urlObj.protocol);
    } catch {
      return false;
    }
  };

  return {
    escapeHTML,
    sanitizeHTML,
    safeSetText,
    safeSetHTML,
    sanitizeFormData,
    isValidURL
  };
})();

// 🔴 ВАЖНО: сделать доступным глобально
window.Sanitizer = Sanitizer;
