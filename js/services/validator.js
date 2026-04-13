/**
 * Validator Service
 * Валидация форм: email, телефон, пароль, сумма
 */

const Validator = (() => {
  // Регулярные выражения
  const PATTERNS = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
    phone: /^\+?7[0-9]{10}$/,
    cardNumber: /^[0-9]{16}$/,
    cardCVC: /^[0-9]{3,4}$/,
  };

  /**
   * Email валидация
   * @param {string} email
   * @returns {boolean}
   */
  const isValidEmail = (email) => {
    if (!email || typeof email !== 'string') return false;
    return PATTERNS.email.test(email.trim());
  };

  /**
   * Телефон валидация
   * @param {string} phone
   * @returns {boolean}
   */
  const isValidPhone = (phone) => {
    if (!phone || typeof phone !== 'string') return false;
    return PATTERNS.phone.test(phone.replace(/[\s\-()]/g, ''));
  };

  /**
   * Пароль валидация (минимум 8 символов, буквы + цифры)
   * @param {string} password
   * @returns {{valid: boolean, errors: string[]}}
   */
  const validatePassword = (password) => {
    const errors = [];
    
    if (!password || typeof password !== 'string') {
      return { valid: false, errors: ['Пароль обязателен'] };
    }

    if (password.length < 8) {
      errors.push('Минимум 8 символов');
    }

    if (!/[a-zA-Z]/.test(password)) {
      errors.push('Содержать англ. буквы');
    }

    if (!/[0-9]/.test(password)) {
      errors.push('Содержать цифры');
    }

    if (!/[!@#$%^&*]/.test(password)) {
      errors.push('Содержать спецсимволы (!@#$%^&*)');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  };

  /**
   * Имя валидация (2-50 символов, только буквы и пробелы)
   * @param {string} name
   * @returns {boolean}
   */
  const isValidName = (name) => {
    if (!name || typeof name !== 'string') return false;
    const trimmed = name.trim();
    return trimmed.length >= 2 && trimmed.length <= 50 && /^[а-яА-ЯёЁa-zA-Z\s]+$/.test(trimmed);
  };

  /**
   * Сумма валидация (число, положительное, в диапазоне)
   * @param {number|string} amount
   * @param {number} min
   * @param {number} max
   * @returns {boolean}
   */
  const isValidAmount = (amount, min = 100, max = 5000000) => {
    const num = Number(amount);
    return !isNaN(num) && num >= min && num <= max;
  };

  /**
   * Номер счёта (10 цифр для примера)
   * @param {string} accountNumber
   * @returns {boolean}
   */
  const isValidAccountNumber = (accountNumber) => {
    if (!accountNumber || typeof accountNumber !== 'string') return false;
    return /^[0-9]{10,20}$/.test(accountNumber.trim());
  };

  /**
   * Номер карты (16 цифр)
   * @param {string} cardNumber
   * @returns {boolean}
   */
  const isValidCardNumber = (cardNumber) => {
    if (!cardNumber || typeof cardNumber !== 'string') return false;
    return PATTERNS.cardNumber.test(cardNumber.replace(/\s/g, ''));
  };

  /**
   * Валидация формы (объект полей)
   * @param {Object} fields - { email: '', password: '', ... }
   * @param {Object} rules - { email: 'email', password: 'password', ... }
   * @returns {{valid: boolean, errors: Object}}
   */
  const validateForm = (fields, rules) => {
    const errors = {};

    Object.entries(rules).forEach(([fieldName, rule]) => {
      const value = fields[fieldName];

      if (rule === 'email' && !isValidEmail(value)) {
        errors[fieldName] = 'Некорректный email';
      } else if (rule === 'phone' && !isValidPhone(value)) {
        errors[fieldName] = 'Некорректный номер телефона';
      } else if (rule === 'password') {
        const passwordValidation = validatePassword(value);
        if (!passwordValidation.valid) {
          errors[fieldName] = passwordValidation.errors[0];
        }
      } else if (rule === 'name' && !isValidName(value)) {
        errors[fieldName] = 'Имя должно быть 2-50 символов, только буквы';
      } else if (rule === 'required' && !value) {
        errors[fieldName] = 'Обязательное поле';
      }
    });

    return {
      valid: Object.keys(errors).length === 0,
      errors
    };
  };

  return {
    isValidEmail,
    isValidPhone,
    validatePassword,
    isValidName,
    isValidAmount,
    isValidAccountNumber,
    isValidCardNumber,
    validateForm
  };
})();

// 🔴 ВАЖНО: сделать доступным глобально
window.Validator = Validator;
