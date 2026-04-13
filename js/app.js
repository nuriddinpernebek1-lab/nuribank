// ==================== CONFIGURATION ====================
const CONFIG = {
    INITIAL_BALANCE: 100000,
    TRANSFER_COMMISSION: 0, // Без комиссии
    CREDIT_RATES: {
        3: 5,    // 5% за 3 месяца
        6: 8,    // 8% за 6 месяцев
        12: 10,  // 10% за 12 месяцев
        24: 12   // 12% за 24 месяца
    }
};

// ==================== GLOBAL APP STATE ====================
const app = {
    currentPage: 'home',
    currentUser: null,
    selectedProductId: null,
    products: [
        { id: 1, name: 'iPhone 16 Pro Max', category: 'electronics', price: 559999, image: 'https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', rating: 4.9, reviews: 891, description: 'Самый мощный iPhone с A18 Pro', color: '#000', bgColor: '#f5f5f5', icon: '🍎', video: 'https://www.youtube.com/embed/MNWzxDMYLOQ', specs: { screen: '6.7" AMOLED Pro', chip: 'A18 Pro', memory: '8GB RAM', storage: '256GB', camera: '48MP', battery: '4,685 mAh' }, userReviews: [{ name: 'Дима', rating: 5, text: 'Шикарный телефон! Камера супер' }, { name: 'Мария', rating: 4.5, text: 'Очень быстрый, только цена кусается' }] },
        { id: 2, name: 'Samsung Galaxy S24', category: 'electronics', price: 449999, image: 'https://images.pexels.com/photos/1092671/pexels-photo-1092671.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', rating: 4.8, reviews: 756, description: 'Флагман на Android с AI', color: '#1830db', bgColor: '#e8effe', icon: '📱', video: 'https://www.youtube.com/embed/MNWzxDMYLOQ', specs: { screen: '6.1" AMOLED', chip: 'Snapdragon 8 Gen 3', memory: '12GB RAM', storage: '256GB', camera: '50MP', battery: '4,000 mAh' }, userReviews: [{ name: 'Айдар', rating: 5, text: 'Лучший Galaxy на данный момент!' }, { name: 'Алина', rating: 4, text: 'Хорош, но дороговато' }] },
        { id: 3, name: 'MacBook Pro 16" (11А)', category: 'electronics', price: 1299999, image: 'https://images.pexels.com/photos/18105/pexels-photo.jpg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', rating: 4.9, reviews: 542, description: 'Ноут для чемпионов класса 11А', color: '#2d2d2d', bgColor: '#f0f0f0', icon: '💻', video: 'https://www.youtube.com/embed/MNWzxDMYLOQ', specs: { screen: '16" Retina XDR', chip: 'M3 Max', memory: '36GB RAM', storage: '512GB SSD', gpu: '40-core GPU', battery: '140W' }, userReviews: [{ name: 'Илияс', rating: 5, text: 'Мачу-мачу!' }, { name: 'Влад', rating: 5, text: 'Для работы лучший выбор' }] },
        { id: 4, name: 'Sony WH-1000XM5', category: 'electronics', price: 49999, image: 'https://images.pexels.com/photos/3394669/pexels-photo-3394669.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', rating: 4.8, reviews: 1203, description: 'Лучшие наушники с шумоподавлением', color: '#000', bgColor: '#fff9e6', icon: '🎧', video: 'https://www.youtube.com/embed/MNWzxDMYLOQ', specs: { driver: '30mm', noise_canceling: 'Active', battery: '8 часов', weight: '250г', frequency: '4Hz-40kHz' }, userReviews: [{ name: 'Карим', rating: 5, text: 'Тишина - это золото!' }, { name: 'Лена', rating: 5, text: 'Идеальны для trabalho' }] },
        { id: 5, name: 'Apple Watch Ultra', category: 'accessories', price: 99999, image: 'https://images.pexels.com/photos/267394/pexels-photo-267394.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', rating: 4.7, reviews: 634, description: 'Часы для экстремалов', color: '#ff6b00', bgColor: '#ffe6cc', icon: '⌚', video: 'https://www.youtube.com/embed/MNWzxDMYLOQ', specs: { screen: '1.9" Retina', battery: '36 часов', water_resistance: '100м', weight: '61г', materials: 'Titanium' }, userReviews: [{ name: 'Саша', rating: 5, text: 'Крайне прочные часы!' }, { name: 'Оля', rating: 4, text: 'Хороши, но дорого' }] },
        { id: 6, name: 'Anker 65W Powerbank', category: 'accessories', price: 24999, image: 'https://images.pexels.com/photos/106795/pexels-photo-106795.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', rating: 4.6, reviews: 876, description: 'Рекомендовано Илиясом', color: '#333', bgColor: '#fffacd', icon: '🔋', video: 'https://www.youtube.com/embed/MNWzxDMYLOQ', specs: { capacity: '20000 mAh', output: '65W', weight: '360г', ports: 'USB-C x2, USB-A' }, userReviews: [{ name: 'Эмиль', rating: 5, text: 'Мощная штука!' }, { name: 'Зина', rating: 5, text: 'Рекомендую!' }] },
        { id: 7, name: 'Premium Jeans Gucci', category: 'fashion', price: 29999, image: 'https://images.pexels.com/photos/2983464/pexels-photo-2983464.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', rating: 4.5, reviews: 421, description: 'Итальянское качество', color: '#1a1a1a', bgColor: '#fffafa', icon: '👖', video: 'https://www.youtube.com/embed/MNWzxDMYLOQ', specs: { material: '100% Cotton', fit: 'Slim', sizes: '26-38', color_options: 'Black, Blue', care: 'Machine wash' }, userReviews: [{ name: 'Нияз', rating: 5, text: 'Очень удобные!' }, { name: 'Гульнара', rating: 4, text: 'Качество супер' }] },
        { id: 8, name: 'Nike Air Jordan 1', category: 'fashion', price: 18999, image: 'https://images.pexels.com/photos/2529148/pexels-photo-2529148.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260', rating: 4.7, reviews: 1045, description: 'Легендарные кроссовки', color: '#c41e3a', bgColor: '#ffe6e6', icon: '👟', video: 'https://www.youtube.com/embed/MNWzxDMYLOQ', specs: { type: 'Basketball', material: 'Leather, Canvas', sizes: '36-48', weight: '375г per shoe', technology: 'Air cushioning' }, userReviews: [{ name: 'Коля', rating: 5, text: 'Легенда!' }, { name: 'Ирина', rating: 5, text: 'Стиль и комфорт' }] }
    ]
};

// ==================== STORAGE SYSTEM ====================
class Storage {
    static getUser() {
        const user = localStorage.getItem('finflow_user');
        return user ? JSON.parse(user) : null;
    }

    static saveUser(user) {
        localStorage.setItem('finflow_user', JSON.stringify(user));
    }

    static deleteUser() {
        localStorage.removeItem('finflow_user');
    }

    static addTransaction(tx) {
        const txs = JSON.parse(localStorage.getItem('finflow_transactions') || '[]');
        txs.push({ ...tx, id: Date.now(), date: new Date().toLocaleString('ru-RU') });
        localStorage.setItem('finflow_transactions', JSON.stringify(txs));
    }

    static getTransactions() {
        return JSON.parse(localStorage.getItem('finflow_transactions') || '[]');
    }

    static addPayment(payment) {
        const payments = JSON.parse(localStorage.getItem('finflow_payments') || '[]');
        payments.push({ ...payment, id: Date.now(), date: new Date().toLocaleString('ru-RU') });
        localStorage.setItem('finflow_payments', JSON.stringify(payments));
    }

    static getPayments() {
        return JSON.parse(localStorage.getItem('finflow_payments') || '[]');
    }

    static addTransfer(transfer) {
        const transfers = JSON.parse(localStorage.getItem('finflow_transfers') || '[]');
        transfers.push({ ...transfer, id: Date.now(), date: new Date().toLocaleString('ru-RU') });
        localStorage.setItem('finflow_transfers', JSON.stringify(transfers));
    }

    static getTransfers() {
        return JSON.parse(localStorage.getItem('finflow_transfers') || '[]');
    }

    static addMessage(msg) {
        const messages = JSON.parse(localStorage.getItem('finflow_messages') || '[]');
        messages.push({ ...msg, id: Date.now(), timestamp: new Date().toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }) });
        localStorage.setItem('finflow_messages', JSON.stringify(messages));
    }

    static getMessages() {
        return JSON.parse(localStorage.getItem('finflow_messages') || '[]');
    }
}

// ==================== UTILITIES ====================
function formatPrice(price) {
    return new Intl.NumberFormat('ru-RU').format(Math.round(price));
}

function showNotification(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.textContent = message;
    Object.assign(alertDiv.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        zIndex: '2000',
        minWidth: '300px',
        maxWidth: '500px',
        animation: 'slideIn 0.3s ease-out'
    });
    document.body.appendChild(alertDiv);
    
    setTimeout(() => {
        alertDiv.style.animation = 'slideOut 0.3s ease-out';
        setTimeout(() => alertDiv.remove(), 300);
    }, 4000);
}

function getServiceName(service) {
    const services = {
        'electricity': '⚡ Электричество',
        'water': '💧 Вода',
        'gas': '🔥 Газ',
        'internet': '📡 Интернет',
        'phone': '📞 Мобильная сеть',
        'tv': '📺 Телевидение'
    };
    return services[service] || service;
}

// ==================== USER MANAGEMENT ====================
function initializeApp() {
    app.currentUser = Storage.getUser();
    setupNavigationListeners();
    setupFooterListeners();
    displayUserInfo();
    loadPage('home');
}

function setupFooterListeners() {
    document.querySelectorAll('footer a[data-page]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo(this.dataset.page);
        });
    });
}

function registerUser(name, email, phone, password) {
    if (!name || !email || !phone || !password) {
        showNotification('Заполните все поля!', 'danger');
        return false;
    }
    if (password.length < 6) {
        showNotification('Пароль должен содержать минимум 6 символов', 'danger');
        return false;
    }

    const newUser = {
        id: Date.now(),
        name, email, phone, password,
        balance: CONFIG.INITIAL_BALANCE,
        credit: 0,
        createdAt: new Date().toLocaleString('ru-RU')
    };

    Storage.saveUser(newUser);
    app.currentUser = newUser;
    displayUserInfo();
    showNotification(`✓ Добро пожаловать в Илияс Банк 🏦! Твой баланс: ${formatPrice(CONFIG.INITIAL_BALANCE)} ₸`, 'success');
    setTimeout(() => navigateTo('home'), 1000);
    return true;
}

function loginUser(email, password) {
    if (!email || !password) {
        showNotification('Заполните все поля!', 'danger');
        return false;
    }

    const user = Storage.getUser();
    if (!user) {
        showNotification('Пользователь не найден!', 'danger');
        return false;
    }
    if (user.email !== email || user.password !== password) {
        showNotification('Неверные данные!', 'danger');
        return false;
    }

    app.currentUser = user;
    displayUserInfo();
    showNotification(`✓ Добро пожаловать в Илияс Банк, ${user.name}! 🏦`, 'success');
    setTimeout(() => navigateTo('home'), 800);
    return true;
}

function logoutUser() {
    if (confirm('Вы уверены? Илияс будет расстроен 😢')) {
        app.currentUser = null;
        Storage.deleteUser();
        displayUserInfo();
        showNotification('До встречи! Илияс скучает по тебе 👋', 'info');
        navigateTo('home');
    }
}

function displayUserInfo() {
    const userInfo = document.getElementById('user-info');
    const balanceInfo = document.getElementById('balance-info');
    const loginBtn = document.getElementById('login-btn');
    const signupBtn = document.getElementById('signup-btn');

    if (app.currentUser) {
        userInfo.innerHTML = `<span>Привет, <strong>${app.currentUser.name}</strong>!</span>`;
        const balanceDisplay = typeof app.currentUser.balance === 'number' 
            ? `💰 ${formatPrice(app.currentUser.balance)} ₸`
            : `💰 ${app.currentUser.balance}`;
        balanceInfo.innerHTML = `<div class="balance-display" style="color: white; font-weight: 600;">${balanceDisplay}</div>`;
        if (loginBtn) loginBtn.style.display = 'none';
        if (signupBtn) { signupBtn.textContent = 'Выход'; signupBtn.onclick = logoutUser; }
    } else {
        userInfo.innerHTML = '';
        balanceInfo.innerHTML = '';
        if (loginBtn) loginBtn.style.display = 'block';
        if (signupBtn) { signupBtn.textContent = 'Регистрация'; signupBtn.onclick = () => navigateTo('profile'); }
    }
}

// ==================== NAVIGATION ====================
function setupNavigationListeners() {
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo(this.dataset.page);
        });
    });
}

function navigateTo(page, productId = null) {
    app.currentPage = page;
    if (productId) app.selectedProductId = productId;
    updateActiveLink(page);
    loadPage(page);
    window.scrollTo(0, 0);
}

function updateActiveLink(page) {
    document.querySelectorAll('nav a').forEach(l => l.classList.remove('active'));
    const link = document.querySelector(`nav a[data-page="${page}"]`);
    if (link) link.classList.add('active');
}

function loadPage(page) {
    const main = document.getElementById('main-content');
    const renders = {
        'home': renderHome,
        'shop': renderShop,
        'product': renderProductDetail,
        'payments': renderPayments,
        'transfers': renderTransfers,
        'credits': renderCredits,
        'profile': renderProfile,
        'faq': renderFaq,
        'support': renderSupport,
        'terms': renderTerms,
        'privacy': renderPrivacy,
        'cookies': renderCookies,
        'security': renderSecurity,
        'about': renderAbout,
        'careers': renderCareers,
        'news': renderNews,
        'blog': renderBlog
    };

    main.innerHTML = renders[page] ? renders[page]() : renderHome();

    // Initialize form handlers
    const inits = {
        'shop': initShopFilters,
        'product': initProductDetail,
        'payments': initPaymentForm,
        'transfers': initTransferForm,
        'credits': initCreditsForm,
        'profile': initProfileForm,
        'faq': initFaq,
        'support': initSupportChat,
        'careers': initCareerForm
    };

    if (inits[page]) inits[page]();
}

// ==================== PAGE RENDERERS ====================

function renderHome() {
    return `
        <section class="hero">
            <div class="hero-container">
                <h1>🏦 Илияс Банк</h1>
                <p>Надёжное банковское обслуживание для студентов. Переводы без комиссий, платежи, кредиты и покупки в одном месте</p>
                <div class="hero-buttons">
                    <button class="btn-hero-primary" onclick="navigateTo('shop')">🛍️ Начать покупки</button>
                    ${!app.currentUser ? `<button class="btn-hero-secondary" onclick="navigateTo('profile')">📱 Создать аккаунт</button>` : ''}
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <h2 class="section-title">Наши услуги</h2>
                <div class="services-grid">
                    <div class="service-card" onclick="navigateTo('shop')" style="cursor: pointer;"><div class="service-icon">🛍️</div><h3>Магазин</h3><p>Электроника, одежда и аксессуары с реальными фото и видео</p></div>
                    <div class="service-card" onclick="navigateTo('payments')" style="cursor: pointer;"><div class="service-icon">💳</div><h3>Платежи</h3><p>Быстрые и безопасные платежи всех видов</p></div>
                    <div class="service-card" onclick="navigateTo('transfers')" style="cursor: pointer;"><div class="service-icon">💸</div><h3>Переводы</h3><p>Без комиссий между друзьями и семьей</p></div>
                    <div class="service-card" onclick="navigateTo('credits')" style="cursor: pointer;"><div class="service-icon">📊</div><h3>Кредиты</h3><p>Кредиты с низким процентом 10%</p></div>
                </div>
            </div>
        </section>

        <section class="section" style="background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
            <div class="container">
                <h2 class="section-title" style="color: #0f172a;">📹 Видеодемонстрации товаров</h2>
                <p class="section-subtitle" style="color: #0f172a;">Посмотрите качество и особенности товаров перед покупкой</p>
                <div class="grid grid-3">
                    <div class="card" style="cursor: pointer; text-align: center; transition: all 0.3s ease;" onclick="navigateTo('shop')">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">📱</div>
                        <h4>iPhone 16 Pro Max</h4>
                        <p style="color: var(--text-light); font-size: 0.9rem; margin: 0.5rem 0;">Смотрите видео демо с полным обзором возможностей</p>
                        <p style="color: var(--primary-color); font-weight: 600; margin-top: 1rem;">559,999 ₸</p>
                    </div>
                    <div class="card" style="cursor: pointer; text-align: center; transition: all 0.3s ease;" onclick="navigateTo('shop')">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">💻</div>
                        <h4>MacBook Pro 16"</h4>
                        <p style="color: var(--text-light); font-size: 0.9rem; margin: 0.5rem 0;">Профессиональный ноутбук с видеообзором</p>
                        <p style="color: var(--primary-color); font-weight: 600; margin-top: 1rem;">1,299,999 ₸</p>
                    </div>
                    <div class="card" style="cursor: pointer; text-align: center; transition: all 0.3s ease;" onclick="navigateTo('shop')">
                        <div style="font-size: 4rem; margin-bottom: 1rem;">🎧</div>
                        <h4>Sony WH-1000XM5</h4>
                        <p style="color: var(--text-light); font-size: 0.9rem; margin: 0.5rem 0;">Премиум наушники с демонстрацией звука</p>
                        <p style="color: var(--primary-color); font-weight: 600; margin-top: 1rem;">49,999 ₸</p>
                    </div>
                </div>
                <div style="text-align: center; margin-top: 2rem;">
                    <button class="btn btn-primary btn-large" onclick="navigateTo('shop')">Смотреть все товары с видео →</button>
                </div>
            </div>
        </section>

        <section class="section">
            <div class="container">
                <h2 class="section-title">Наши партнёры</h2>
                <div class="meme-grid">
                    <div class="meme-card">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/Hayden_Christensen_as_Anakin_Skywalker.jpg/500px-Hayden_Christensen_as_Anakin_Skywalker.jpg" alt="Энакин Скайуокер" onerror="this.src='https://via.placeholder.com/420x280?text=%D0%9D%D0%B5%D1%82+%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F'">
                        <div class="meme-card-body">
                            <h4>Энакин Скайуокер</h4>
                            <p>Партнёр премиального сервиса и официальный спонсор.</p>
                        </div>
                    </div>
                    <div class="meme-card">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Andrew_Garfield_82nd_Venice_Film_Festival_%28cropped%29.jpg/500px-Andrew_Garfield_82nd_Venice_Film_Festival_%28cropped%29.jpg" alt="Эндрю Гарфилд" onerror="this.src='https://via.placeholder.com/420x280?text=%D0%9D%D0%B5%D1%82+%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F'">
                        <div class="meme-card-body">
                            <h4>Эндрю Гарфилд</h4>
                            <p>Партнёр финансовых услуг и официальный корпоративный спонсор.</p>
                        </div>
                    </div>
                    <div class="meme-card">
                        <img src="https://upload.wikimedia.org/wikipedia/commons/0/07/Francisco_Lachowski_2011.jpg" alt="Francisco 'Chico' Lachowski" onerror="this.src='https://via.placeholder.com/420x280?text=%D0%9D%D0%B5%D1%82+%D1%84%D0%BE%D1%82%D0%BE'">
                        <div class="meme-card-body">
                            <h4>Francisco "Chico" Lachowski</h4>
                            <p>Бразильский супермодель, известный как Чико Лачовский.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <section class="section" style="background: #f8fafc;">
            <div class="container">
                <h2 class="section-title">Почему выбирают Илияс Банк</h2>
                <div class="features-list">
                    <div class="feature-item">
                        <div class="feature-icon">🔒</div>
                        <div class="feature-content">
                            <h4>Безопасность</h4>
                            <p>Все транзакции защищены современными стандартами безопасности</p>
                        </div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">⚡</div>
                        <div class="feature-content">
                            <h4>Быстро</h4>
                            <p>Переводы и платежи моментально обрабатываются</p>
                        </div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">💰</div>
                        <div class="feature-content">
                            <h4>Нет комиссий</h4>
                            <p>Переводы и большинство операций совершенно бесплатны</p>
                        </div>
                    </div>
                    <div class="feature-item">
                        <div class="feature-icon">📸</div>
                        <div class="feature-content">
                            <h4>Реальные фото и видео</h4>
                            <p>Все товары с настоящими фотографиями и видеодемонстрациями</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

function renderShop() {
    const categories = ['all', 'electronics', 'accessories', 'fashion'];
    let html = '<section class="section"><div class="container">';
    html += '<div style="margin-bottom: 2rem;"><h1 class="mb-2">🛒 Магазин Илияса</h1><p style="color: var(--text-light); font-size: 1.1rem;">Лучшие товары с реальными фотографиями и видеодемонстрациями</p></div>';
    
    // Фильтры
    html += '<div style="background: white; padding: 1.5rem; border-radius: 12px; margin-bottom: 2rem; border: 1px solid #e2e8f0;">';
    html += '<div class="flex" style="flex-wrap: wrap; gap: 0.5rem;">';
    categories.forEach(cat => {
        html += `<button class="btn btn-small ${cat === 'all' ? 'btn-primary' : 'btn-outline'}" onclick="filterProducts('${cat}')" data-category="${cat}" style="border-radius: 20px;">${cat === 'all' ? '✓ Все товары' : cat === 'electronics' ? '💻 Электроника' : cat === 'accessories' ? '⌚ Аксессуары' : '👕 Одежда'}</button>`;
    });
    html += '</div></div>';
    
    // Главная видео-карточка (Рекомендуется)
    html += '<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); border-radius: 16px; overflow: hidden; margin-bottom: 2rem; color: white; display: grid; grid-template-columns: 1fr 1fr; gap: 0; cursor: pointer;" onclick="navigateTo(\'product\', 1)">';
    html += '<div style="padding: 2rem; display: flex; flex-direction: column; justify-content: center;">';
    html += '<p style="opacity: 0.9; font-size: 0.9rem; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.5rem;">⭐ РЕКОМЕНДУЕМ</p>';
    html += '<h2 style="font-size: 2rem; margin-bottom: 1rem;">iPhone 16 Pro Max</h2>';
    html += '<p style="margin-bottom: 1.5rem; opacity: 0.95;">Смотрите полный обзор, характеристики и видео демонстрацию.</p>';
    html += '<button class="btn" style="background: white; color: #667eea; font-weight: 600; width: fit-content; border-radius: 8px;">👁️ Смотреть товар</button>';
    html += '</div>';
    html += '<div style="background: linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0)); display: flex; align-items: center; justify-content: center;">';
    html += '<img src="https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" style="height: 100%; object-fit: cover; opacity: 0.9;" alt="iPhone">';
    html += '</div></div>';
    
    // Товары в сетке
    html += '<div class="grid grid-3">';
    app.products.forEach(p => {
        html += `
            <div class="card" data-product-id="${p.id}" data-category="${p.category}" data-price="${p.price}" style="overflow: hidden; transition: all 0.3s ease; cursor: pointer; position: relative;" onclick="navigateTo('product', ${p.id})">
                <div style="position: relative; height: 220px; overflow: hidden; background: #f0f0f0;">
                    <img src="${p.image}" alt="${p.name}" class="product-image" style="width: 100%; height: 100%; object-fit: cover;" onerror="this.src='https://via.placeholder.com/420x280?text=Фото'">
                    <div style="position: absolute; top: 8px; right: 8px; background: rgba(0,0,0,0.7); color: white; padding: 4px 12px; border-radius: 20px; font-size: 0.85rem; font-weight: 600;">⭐ ${p.rating}</div>
                </div>
                <div style="padding: 1rem;">
                    <h4 style="margin: 0.5rem 0; font-weight: 600; text-align: center;">${p.name}</h4>
                    <p style="color: var(--text-light); font-size: 0.85rem; margin: 0.5rem 0; text-align: center;">${p.description}</p>
                    <div style="color: var(--text-light); font-size: 0.8rem; margin: 0.5rem 0; text-align: center;">(${p.reviews} отзывов)</div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 1rem; padding-top: 1rem; border-top: 1px solid var(--border-color);">
                        <div style="font-size: 1.2rem; font-weight: 700; background: linear-gradient(135deg, ${p.color}, #333); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">${formatPrice(p.price)} ₸</div>
                        <button class="btn btn-small btn-primary" onclick="buyProduct(${p.id}); event.stopPropagation();" style="transition: all 0.2s;">Купить</button>
                    </div>
                </div>
            </div>
        `;
    });
    html += '</div></div></section>';
    
    return html;
}

function renderProductDetail() {
    const product = app.products.find(p => p.id === app.selectedProductId);
    if (!product) return '<section class="section"><div class="container"><p>Товар не найден</p></div></section>';
    
    let html = `<section class="section"><div class="container"><button class="btn btn-outline" onclick="navigateTo('shop')" style="margin-bottom: 2rem;">← Вернуться в магазин</button>`;
    
    html += `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; margin-bottom: 2rem;">`;
    
    // Изображение и видео
    html += `<div>
        <div style="position: relative; height: 400px; overflow: hidden; background: #f0f0f0; border-radius: 12px; margin-bottom: 1rem;">
            <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
            <div style="position: absolute; top: 16px; right: 16px; background: rgba(0,0,0,0.7); color: white; padding: 8px 16px; border-radius: 20px; font-size: 1rem; font-weight: 600;">⭐ ${product.rating}</div>
        </div>
        <button class="btn btn-primary btn-block" onclick="showProductVideoDetail(${product.id})" style="margin-top: 1rem;">📹 Смотреть видеообзор</button>
    </div>`;
    
    // Информация о товаре
    html += `<div>
        <h1 style="margin-bottom: 0.5rem;">${product.name}</h1>
        <p style="color: var(--text-light); font-size: 1.1rem; margin-bottom: 1.5rem;">${product.description}</p>
        
        <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.5rem; border-radius: 12px; margin-bottom: 1.5rem; text-align: center;">
            <p style="opacity: 0.9; margin-bottom: 0.5rem;">Цена</p>
            <h2 style="font-size: 2rem; margin: 0;">${formatPrice(product.price)} ₸</h2>
        </div>
        
        <h3 style="margin-bottom: 1rem;">Характеристики</h3>
        <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1.5rem;">`;
    
    Object.entries(product.specs).forEach(([key, value]) => {
        html += `<div style="display: flex; justify-content: space-between; padding: 0.5rem 0; border-bottom: 1px solid #e2e8f0;">
            <span style="color: var(--text-light);">${key.replace(/_/g, ' ')}</span>
            <strong>${value}</strong>
        </div>`;
    });
    
    html += `</div>
        <button class="btn btn-success btn-block" onclick="buyProduct(${product.id}); navigateTo('shop');" style="font-size: 1.05rem; padding: 0.9rem;">🛒 Добавить в корзину за ${formatPrice(product.price)} ₸</button>
    </div></div>`;
    
    // Отзывы пользователей
    html += `<div style="margin-top: 2rem; padding-top: 2rem; border-top: 2px solid #e2e8f0;">
        <h2 style="margin-bottom: 1.5rem;">Отзывы пользователей</h2>
        <div class="grid" style="gap: 1rem;">`;
    
    product.userReviews.forEach(review => {
        html += `<div class="card">
            <div style="display: flex; justify-content: space-between; align-items: flex-start; margin-bottom: 0.5rem;">
                <strong>${review.name}</strong>
                <span style="color: #ffc107;">${'⭐'.repeat(Math.round(review.rating))}</span>
            </div>
            <p>${review.text}</p>
        </div>`;
    });
    
    html += `</div></div></div></section>`;
    
    // Видео модальное окно
    html += `
    <div id="video-modal-detail" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.95); z-index: 3000; display: flex; align-items: center; justify-content: center; padding: 1rem;">
        <div style="position: relative; width: 100%; max-width: 900px; aspect-ratio: 16/9;">
            <button onclick="closeProductVideoDetail()" style="position: absolute; top: -50px; right: 0; background: white; border: none; border-radius: 50%; width: 45px; height: 45px; font-size: 1.5rem; cursor: pointer; font-weight: bold; z-index: 3001;">✕</button>
            <iframe id="video-frame-detail" width="100%" height="100%" src="" style="border: none; border-radius: 12px;" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
    </div>
    `;
    
    return html;
}

function showProductVideoDetail(productId) {
    const product = app.products.find(p => p.id === productId);
    if (product && product.video) {
        const modal = document.getElementById('video-modal-detail');
        const iframe = document.getElementById('video-frame-detail');
        if (modal && iframe) {
            iframe.src = product.video + '?autoplay=1';
            modal.style.display = 'flex';
        }
    }
}

function closeProductVideoDetail() {
    const modal = document.getElementById('video-modal-detail');
    const iframe = document.getElementById('video-frame-detail');
    if (modal && iframe) {
        modal.style.display = 'none';
        iframe.src = '';
    }
}

function initProductDetail() {
    // Клик вне модального окна закрывает его
    const modal = document.getElementById('video-modal-detail');
    if (modal) {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) closeProductVideoDetail();
        });
    }
}

function renderPayments() {
    const payments = Storage.getPayments();
    return `
        <section class="section">
            <div class="container">
                <h1 class="mb-4">Платежи</h1>
                <div class="grid grid-2">
                    <div class="card">
                        <h3>Оплатить услугу</h3>
                        <form id="payment-form">
                            <div class="form-group">
                                <label>Тип услуги</label>
                                <select id="service-type" required>
                                    <option value="">Выберите</option>
                                    <option value="electricity">Электричество</option>
                                    <option value="water">Вода</option>
                                    <option value="gas">Газ</option>
                                    <option value="internet">Интернет</option>
                                    <option value="phone">Мобильная сеть</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Номер счета</label>
                                <input type="text" id="account-number" placeholder="Введите номер" required>
                            </div>
                            <div class="form-group">
                                <label>Сумма (₸)</label>
                                <input type="number" id="payment-amount" placeholder="Сумма" min="100" required>
                            </div>
                            <button type="submit" class="btn btn-primary btn-block" ${!app.currentUser ? 'disabled' : ''}>Оплатить</button>
                        </form>
                    </div>
                    <div>
                        <h3>Популярные услуги</h3>
                        <div class="grid grid-2" style="gap: 1rem;">
                            <div class="card" style="cursor: pointer; text-align: center;" onClick="selectService('electricity')"><div style="font-size: 2.5rem;">⚡</div><h5>Электро</h5></div>
                            <div class="card" style="cursor: pointer; text-align: center;" onClick="selectService('water')"><div style="font-size: 2.5rem;">💧</div><h5>Вода</h5></div>
                            <div class="card" style="cursor: pointer; text-align: center;" onClick="selectService('internet')"><div style="font-size: 2.5rem;">📡</div><h5>Интернет</h5></div>
                            <div class="card" style="cursor: pointer; text-align: center;" onClick="selectService('phone')"><div style="font-size: 2.5rem;">📞</div><h5>Мобильный</h5></div>
                        </div>
                    </div>
                </div>
                ${payments.length > 0 ? `<div class="card mt-3"><h3>История (${payments.length})</h3><div style="max-height: 300px; overflow-y: auto;">${payments.slice(-5).reverse().map(p => `<div style="display: flex; justify-content: space-between; padding: 0.75rem; border-bottom: 1px solid var(--border-color);"><div><h5>${getServiceName(p.service)}</h5><p style="font-size: 0.85rem; color: var(--text-light);">${p.date}</p></div><div style="color: var(--danger-color); font-weight: 600;">-${formatPrice(p.amount)} ₸</div></div>`).join('')}</div></div>` : ''}
            </div>
        </section>
    `;
}

function renderTransfers() {
    const transfers = Storage.getTransfers();
    return `
        <section class="section">
            <div class="container">
                <h1 class="mb-4">Переводы</h1>
                <p style="color: var(--text-light); margin-bottom: 1.5rem;">Безкомиссионные переводы между пользователями</p>
                <div class="grid grid-2">
                    <div class="card">
                        <h3>Отправить деньги</h3>
                        <form id="transfer-form">
                            <div class="form-group"><label>Номер получателя</label><input type="tel" id="recipient-phone" placeholder="+7 700..." required></div>
                            <div class="form-group"><label>Имя</label><input type="text" id="recipient-name" placeholder="Иван" required></div>
                            <div class="form-group"><label>Сумма (₸)</label><input type="number" id="transfer-amount" placeholder="Минимум 100" min="100" required></div>
                            <div class="form-group"><label>Сообщение</label><textarea id="transfer-message" placeholder="Опционально..." rows="3"></textarea></div>
                            <button type="submit" class="btn btn-primary btn-block" ${!app.currentUser ? 'disabled' : ''}>Отправить</button>
                        </form>
                    </div>
                    <div><h3>Последние переводы</h3>${transfers.length ? '<div class="grid" style="gap: 1rem;">' + transfers.slice(-5).reverse().map(t => `<div class="card" style="padding: 1rem;"><h5>${t.recipientName}</h5><p style="font-size: 0.85rem; color: var(--text-light);">${t.recipientPhone}</p><div style="margin-top: 0.5rem; color: var(--primary-color); font-weight: 600;">-${formatPrice(t.amount)} ₸</div><p style="font-size: 0.75rem; color: var(--text-light);">${t.date}</p></div>`).join('') + '</div>' : '<div class="card"><p style="color: var(--text-light); text-align: center;">Переводов еще нет</p></div>'}</div>
                </div>
            </div>
        </section>
    `;
}

function renderCredits() {
    if (!app.currentUser) {
        return `<section class="section"><div class="container"><div class="alert alert-info">Авторизуйтесь для получения кредита</div></div></section>`;
    }

    const hasCredit = app.currentUser.credit && app.currentUser.credit.amount > 0;
    const creditData = hasCredit ? app.currentUser.credit : null;
    
    let html = `
        <section class="section">
            <div class="container">
                <h1 class="mb-4">💳 Получение кредитов</h1>
                <div class="grid grid-2">
                    <div class="card">
                        <h3>Получить кредит</h3>
                        <form id="credit-form">
                            <div class="form-group">
                                <label>Сумма (5 тыс - 5 млн ₸)</label>
                                <input type="number" id="credit-amount" min="5000" max="5000000" step="5000" placeholder="Сумма" value="100000" required>
                            </div>
                            <div class="form-group">
                                <label>Срок погашения</label>
                                <select id="credit-term" onchange="calculateCreditDetails()">
                                    <option value="3">3 месяца (5% ставка)</option>
                                    <option value="6">6 месяцев (8% ставка)</option>
                                    <option value="12">12 месяцев (10% ставка)</option>
                                    <option value="24">24 месяца (12% ставка)</option>
                                </select>
                            </div>
                            <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 1.25rem; border-radius: 8px; margin-bottom: 1rem;">
                                <p style="font-size: 0.85rem; opacity: 0.9; margin-bottom: 0.5rem;">Ежемесячный платеж</p>
                                <div style="font-size: 1.4rem; font-weight: 700; margin-bottom: 1rem;"><span id="monthly-payment">-</span> ₸</div>
                                <p style="font-size: 0.85rem; opacity: 0.9; margin-bottom: 0.5rem;">Общая сумма к возврату</p>
                                <div style="font-size: 1.1rem; font-weight: 600;"><span id="total-repay">-</span> ₸</div>
                            </div>
                            <button type="submit" class="btn btn-success btn-block" ${hasCredit ? 'disabled' : ''}>Получить кредит 💸</button>
                        </form>
                    </div>
                    `;
    
    if (hasCredit) {
        const payments = creditData.schedule || [];
        const remainingPayments = payments.filter(p => !p.paid);
        const nextPayment = remainingPayments[0];
        
        html += `<div>
            <div class="card" style="border-left: 4px solid var(--warning-color);">
                <h3>📊 Информация о кредите</h3>
                <div style="margin-top: 1.5rem;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                        <span style="color: var(--text-light);">Сумма кредита:</span>
                        <strong>${formatPrice(creditData.amount)} ₸</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                        <span style="color: var(--text-light);">Выплачено платежей:</span>
                        <strong>${payments.filter(p => p.paid).length} / ${payments.length}</strong>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                        <span style="color: var(--text-light);">Осталось платежей:</span>
                        <strong>${remainingPayments.length}</strong>
                    </div>
                    ${nextPayment ? `
                    <div style="display: flex; justify-content: space-between; padding-bottom: 1rem; border-bottom: 1px solid var(--border-color);">
                        <span style="color: var(--text-light);">Следующий платеж:</span>
                        <strong>${nextPayment.dueDate}</strong>
                    </div>
                    ` : ''}
                </div>
                ${nextPayment ? `
                <form id="repay-form" style="margin-top: 1.5rem;">
                    <div style="background: #f8fafc; padding: 1rem; border-radius: 8px; margin-bottom: 1rem; text-align: center;">
                        <p style="color: var(--text-light); font-size: 0.9rem; margin-bottom: 0.5rem;">Ежемесячный платеж</p>
                        <div style="font-size: 1.3rem; font-weight: 700; color: var(--danger-color);">${formatPrice(nextPayment.amount)} ₸</div>
                    </div>
                    <button type="submit" class="btn btn-primary btn-block">Произвести платеж</button>
                </form>
                ` : `<div style="text-align: center; padding: 1rem; background: #d4edda; border-radius: 8px; color: #155724;">
                    ✓ Кредит полностью погашен!
                </div>`}
            </div>
            ${payments.length > 0 ? `
            <div class="card mt-3">
                <h4>📅 График платежей</h4>
                <div style="max-height: 300px; overflow-y: auto; margin-top: 1rem;">
                    ${payments.map((p, i) => `<div style="display: flex; justify-content: space-between; padding: 0.75rem; border-bottom: 1px solid var(--border-color); ${p.paid ? 'opacity: 0.6;' : ''}">
                        <span>${i+1}. ${p.dueDate}</span>
                        <span>${formatPrice(p.amount)} ₸</span>
                        <span>${p.paid ? '✓ Оплачено' : '⏳ Ожидает'}</span>
                    </div>`).join('')}
                </div>
            </div>
            ` : ''}
        </div>`;
    } else {
        html += `<div class="card"><div style="text-align: center; padding: 2rem;"><div style="font-size: 3rem; margin-bottom: 1rem;">✨</div><h4>Кредитов нет</h4><p style="color: var(--text-light); margin-top: 1rem;">Получите кредит и начните погашать его ежемесячно</p></div></div>`;
    }
    
    html += `</div></div></section>`;
    return html;
}

function renderProfile() {
    if (!app.currentUser) {
        return `
            <section class="section">
                <div class="container">
                    <h1 class="mb-4">Профиль</h1>
                    <div class="grid grid-2">
                        <div class="card">
                            <h3 class="mb-3">Вход</h3>
                            <form id="login-form">
                                <div class="form-group"><label>Email</label><input type="email" id="login-email" placeholder="your@mail.com" required></div>
                                <div class="form-group"><label>Пароль</label><input type="password" id="login-password" placeholder="Минимум 6" required></div>
                                <button type="submit" class="btn btn-primary btn-block">Войти</button>
                            </form>
                        </div>
                        <div class="card">
                            <h3 class="mb-3">Регистрация</h3>
                            <form id="register-form">
                                <div class="form-group"><label>Имя</label><input type="text" id="register-name" placeholder="Ваше имя" required></div>
                                <div class="form-group"><label>Email</label><input type="email" id="register-email" placeholder="your@mail.com" required></div>
                                <div class="form-group"><label>Телефон</label><input type="tel" id="register-phone" placeholder="+7 700..." required></div>
                                <div class="form-group"><label>Пароль</label><input type="password" id="register-password" placeholder="Минимум 6" required></div>
                                <button type="submit" class="btn btn-success btn-block">Создать</button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        `;
    }

    const transactions = Storage.getTransactions();
    return `
        <section class="section">
            <div class="container">
                <h1 class="mb-4">Профиль</h1>
                <div class="grid grid-2">
                    <div class="card">
                        <div style="text-align: center; margin-bottom: 1.5rem;">
                            <div style="font-size: 4rem; margin-bottom: 1rem;">👤</div>
                            <h2>${app.currentUser.name}</h2>
                            <p style="color: var(--text-light);">${app.currentUser.email}</p>
                        </div>
                        <div style="background: linear-gradient(135deg, #667eea, #764ba2); color: white; padding: 1.5rem; border-radius: 8px; text-align: center;">
                            <p style="opacity: 0.9;">Ваш баланс</p>
                            <div style="font-size: 2rem; font-weight: 700;">${formatPrice(app.currentUser.balance)} ₸</div>
                        </div>
                    </div>
                    <div>
                        <div class="card mb-3">
                            <h3>Информация</h3>
                            <div style="margin-top: 1rem;"><p style="color: var(--text-light); font-size: 0.85rem;">Телефон</p><p>${app.currentUser.phone}</p></div>
                            <div style="margin-top: 1rem;"><p style="color: var(--text-light); font-size: 0.85rem;">Активные кредиты</p><p style="font-weight: 600;">${app.currentUser.credit && app.currentUser.credit.amount > 0 ? formatPrice(app.currentUser.credit.amount) + ' ₸' : 'Нет'}</p></div>
                        </div>
                        <div class="card">
                            <button class="btn btn-outline btn-block mb-2" onclick="navigateTo('support')">💬 Поддержка</button>
                            <button class="btn btn-outline btn-block mb-2" onclick="navigateTo('faq')">❓ FAQ</button>
                            <button class="btn btn-danger btn-block" onclick="logoutUser()">Выход</button>
                        </div>
                    </div>
                </div>
                ${transactions.length > 0 ? `<div class="card mt-3"><h3>История операций (${transactions.length})</h3><div style="max-height: 400px; overflow-y: auto;">${transactions.slice(-10).reverse().map(t => `<div style="display: flex; justify-content: space-between; padding: 0.75rem; border-bottom: 1px solid var(--border-color);"><div><h5>${t.type === 'purchase' ? '🛍️ Покупка' : t.type === 'payment' ? '💳 Платеж' : t.type === 'transfer' ? '💸 Перевод' : '📊 Кредит'}</h5><p style="font-size: 0.85rem; color: var(--text-light);">${t.date}</p></div><div style="color: var(--danger-color); font-weight: 600;">-${formatPrice(t.amount)} ₸</div></div>`).join('')}</div></div>` : ''}
            </div>
        </section>
    `;
}

function renderFaq() {
    const faqs = [
        { q: 'Что такое Илияс Банк?', a: 'Это безопасное и удобное банковское приложение для студентов' },
        { q: 'Как зарегистрироваться?', a: 'Перейдите в профиль и заполните форму регистрации' },
        { q: 'Какая комиссия за операции?', a: 'Переводы и платежи полностью без комиссий' },
        { q: 'Как получить кредит?', a: 'Перейдите в раздел кредиты и заполните форму заявки' },
        { q: 'Безопасны ли мои деньги?', a: 'Да, все операции защищены современными алгоритмами безопасности' },
        { q: 'Какая максимальная сумма кредита?', a: 'Лимит кредита зависит от вашей активности в системе' }
    ];

    let html = '<section class="section"><div class="container" style="max-width: 800px;"><h1 class="mb-4">Часто задаваемые вопросы</h1><p style="color: var(--text-light); margin-bottom: 2rem;">Получите ответы на основные вопросы</p>';
    
    faqs.forEach((faq, i) => {
        html += `<div class="card mb-2"><button onclick="this.nextElementSibling.style.maxHeight = this.nextElementSibling.style.maxHeight === '0px' ? '500px' : '0px'; this.querySelector('.faq-arrow').style.transform = this.nextElementSibling.style.maxHeight === '0px' ? 'rotate(0deg)' : 'rotate(180deg)'; this.querySelector('.faq-arrow').style.transition = 'transform 0.3s';" style="width: 100%; padding: 1rem; text-align: left; display: flex; justify-content: space-between; align-items: center; background: none; border: none; font-weight: 600; cursor: pointer;"><span style="flex: 1; text-align: left;">${faq.q}</span><span class="faq-arrow" style="transition: transform 0.3s; flex-shrink: 0;">▼</span></button><div style="max-height: 0px; overflow: hidden; transition: max-height 0.3s;"><div style="padding: 1rem; border-top: 1px solid var(--border-color); color: var(--text-light);">${faq.a}</div></div></div>`;
    });

    html += '<div class="card mt-3" style="text-align: center;"><h3>Остались вопросы?</h3><p style="color: var(--text-light);">Обратитесь в службу поддержки</p><button class="btn btn-primary mt-2" onclick="navigateTo(\'support\')">Служба поддержки</button></div></div></section>';
    return html;
}

function renderSupport() {
    if (!app.currentUser) {
        return `<section class="section"><div class="container"><div class="alert alert-info">Авторизуйтесь для чата с поддержкой</div></div></section>`;
    }

    const messages = Storage.getMessages();
    let html = '<section class="section"><div class="container"><h1 class="mb-4">Служба поддержки</h1><div class="grid"><div class="card" style="display: grid; grid-template-rows: 1fr auto; height: 500px;"><div id="chat-messages" style="overflow-y: auto; padding: 1.5rem; border-bottom: 1px solid var(--border-color); display: flex; flex-direction: column; gap: 1rem;">';

    messages.forEach(msg => {
        html += `<div style="display: flex; ${msg.sender === 'user' ? 'justify-content: flex-end;' : 'justify-content: flex-start;'}"><div style="max-width: 70%; padding: 0.75rem 1rem; border-radius: 12px; ${msg.sender === 'user' ? 'background: var(--primary-color); color: white;' : 'background: var(--light-bg);'}"><div>${msg.text}</div><div style="font-size: 0.75rem; opacity: 0.7; margin-top: 0.25rem;">${msg.timestamp}</div></div></div>`;
    });

    html += '</div><form id="support-form" style="padding: 1rem; display: flex; gap: 0.5rem;"><input type="text" id="support-message" placeholder="Введите сообщение..." style="flex: 1; padding: 0.75rem; border: 1px solid var(--border-color); border-radius: 6px;"><button type="submit" class="btn btn-primary">Отправить</button></form></div></div></section>';
    return html;
}

function renderTerms() {
    return `
        <section class="section">
            <div class="container">
                <h1 class="mb-4">Условия использования</h1>
                <div class="card">
                    <p>Добро пожаловать в Илияс Банк. Используя наш сервис, вы соглашаетесь с правилами, изложенными ниже.</p>
                    <ul>
                        <li>Вы обязуетесь указывать актуальные данные при регистрации.</li>
                        <li>Сервис предоставляется на бесплатной основе для учебных операций.</li>
                        <li>Мы не несем ответственности за данные, введенные пользователем.</li>
                        <li>Илияс Банк оставляет за собой право изменять условия использования.</li>
                    </ul>
                </div>
            </div>
        </section>
    `;
}

function renderPrivacy() {
    return `
        <section class="section">
            <div class="container">
                <h1 class="mb-4">Политика приватности</h1>
                <div class="card">
                    <p>В Илияс Банке мы заботимся о конфиденциальности ваших данных.</p>
                    <p>Мы собираем только необходимую информацию для работы сервиса и не передаем её третьим лицам.</p>
                    <p>Все данные хранятся безопасно и используются только для управления счётом, платежами и покупками.</p>
                </div>
            </div>
        </section>
    `;
}

function renderCookies() {
    return `
        <section class="section">
            <div class="container">
                <h1 class="mb-4">Куки</h1>
                <div class="card">
                    <p>Сайт использует куки-файлы для улучшения пользовательского опыта.</p>
                    <p>Куки помогают сохранять настройки, поддерживать авторизацию и оптимизировать работу интерфейса.</p>
                    <p>Вы можете управлять настройками куки в своём браузере.</p>
                </div>
            </div>
        </section>
    `;
}

function renderSecurity() {
    return `
        <section class="section">
            <div class="container">
                <h1 class="mb-4">Безопасность</h1>
                <div class="card">
                    <p>Мы применяем современные подходы к сохранению безопасности данных.</p>
                    <ul>
                        <li>Защита подключений через HTTPS.</li>
                        <li>Хранение пользовательских данных в пределах браузера.</li>
                        <li>Минимизация передачи чувствительной информации.</li>
                        <li>Рекомендуем использовать уникальный пароль и не делиться им.</li>
                    </ul>
                </div>
            </div>
        </section>
    `;
}

function renderAbout() {
    return `
        <section class="section">
            <div class="container">
                <h1 class="mb-4">О нас</h1>
                <div class="card">
                    <p>Илияс Банк — это современный банковский сервис для студентов и молодых профессионалов.</p>
                    <p>Мы объединяем платежи, переводы, кредиты и покупки в удобном приложении.</p>
                    <p>Наша миссия — сделать финансовые операции понятными, быстрыми и безопасными.</p>
                </div>
                <div class="card mt-3">
                    <h3>Почему выбирают нас</h3>
                    <ul>
                        <li>Интуитивный интерфейс и надёжные сервисы</li>
                        <li>Переводы без комиссий</li>
                        <li>Полная поддержка клиентов</li>
                        <li>Премиальные партнёрские предложения</li>
                    </ul>
                </div>
            </div>
        </section>
    `;
}

function renderCareers() {
    return `
        <section class="section">
            <div class="container">
                <h1 class="mb-4">Вакансии</h1>
                <div class="card mb-3">
                    <p>Мы растём и ищем талантливых людей в команду: менеджеров, маркетологов, разработчиков и специалистов по поддержке.</p>
                    <p>Присылайте резюме, и мы свяжемся с вами в течение 48 часов.</p>
                </div>
                <div class="card">
                    <h3>Отправить резюме</h3>
                    <form id="career-form">
                        <div class="form-group"><label>Имя</label><input type="text" id="career-name" placeholder="Ваше имя" required></div>
                        <div class="form-group"><label>Почта</label><input type="email" id="career-email" placeholder="your@mail.com" required></div>
                        <div class="form-group"><label>Телефон</label><input type="tel" id="career-phone" placeholder="+7 700 ..." required></div>
                        <div class="form-group"><label>Резюме (PDF/DOCX)</label><input type="file" id="career-resume" accept=".pdf,.doc,.docx" required></div>
                        <div class="form-group"><label>Комментарий</label><textarea id="career-message" placeholder="Кратко о себе" rows="4"></textarea></div>
                        <button type="submit" class="btn btn-primary btn-block">Отправить резюме</button>
                    </form>
                </div>
                <div class="card mt-3" style="background: var(--light-bg);">
                    <h4>Что важно</h4>
                    <ul>
                        <li>Резюме принимаются в формате PDF или DOCX.</li>
                        <li>Мы отвечаем в течение 2 рабочих дней.</li>
                        <li>Все заявки проходят внутренний отбор.</li>
                    </ul>
                </div>
            </div>
        </section>
    `;
}

function renderNews() {
    return `
        <section class="section">
            <div class="container">
                <h1 class="mb-4">Новости</h1>
                <div class="card">
                    <article class="mb-3">
                        <h4>Илияс Банк запускает новую программу лояльности</h4>
                        <p>С 2026 года все активные клиенты получают повышенный кэшбэк и персональные предложения.</p>
                    </article>
                    <article class="mb-3">
                        <h4>Платежи без комиссии теперь доступны 24/7</h4>
                        <p>Мы улучшили работу сервиса, чтобы переводы проходили быстрее и стабильнее.</p>
                    </article>
                </div>
            </div>
        </section>
    `;
}

function renderBlog() {
    return `
        <section class="section">
            <div class="container">
                <h1 class="mb-4">Блог</h1>
                <div class="card">
                    <article class="mb-3">
                        <h4>Как управлять студентческим бюджетом</h4>
                        <p>Советы по планированию расходов и сохранению баланса.</p>
                    </article>
                    <article>
                        <h4>5 способов оплачивать услуги быстрее</h4>
                        <p>Узнайте, как использовать мобильный банк и автоматические платежи.</p>
                    </article>
                </div>
            </div>
        </section>
    `;
}

function initCareerForm() {
    const form = document.getElementById('career-form');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        const name = document.getElementById('career-name').value.trim();
        const email = document.getElementById('career-email').value.trim();
        const phone = document.getElementById('career-phone').value.trim();
        const resumeInput = document.getElementById('career-resume');
        const message = document.getElementById('career-message').value.trim();

        if (!name || !email || !phone || !resumeInput.files.length) {
            showNotification('Заполните все обязательные поля и прикрепите резюме.', 'danger');
            return;
        }

        const resumeFile = resumeInput.files[0];
        showNotification(`Резюме ${resumeFile.name} успешно отправлено! Мы свяжемся с вами на ${email}.`, 'success');
        form.reset();
    });
}

// ==================== FORM HANDLERS ====================

function initShopFilters() {
    document.querySelectorAll('[data-category]').forEach(btn => {
        btn.addEventListener('click', function() {
            const category = this.dataset.category;
            document.querySelectorAll('[data-product-id]').forEach(card => {
                const cardCat = card.dataset.category;
                card.style.display = (!category || category === 'all' || cardCat === category) ? 'block' : 'none';
            });
            document.querySelectorAll('[data-category]').forEach(b => b.classList.toggle('btn-primary', false));
            this.classList.toggle('btn-primary', true);
        });
    });
}

function filterProducts(category) {
    // Already handled by initShopFilters
}

function buyProduct(productId) {
    if (!app.currentUser) {
        showNotification('Сначала авторизуйтесь через Илияс Банк! 🏦', 'danger');
        navigateTo('profile');
        return;
    }

    const product = app.products.find(p => p.id === productId);
    if (!product) return;

    if (app.currentUser.balance < product.price) {
        showNotification(`Недостаточно средств! Не хватает ${formatPrice(product.price - app.currentUser.balance)} ₸`, 'danger');
        return;
    }

    app.currentUser.balance -= product.price;
    Storage.saveUser(app.currentUser);
    Storage.addTransaction({
        type: 'purchase',
        description: product.name,
        amount: product.price
    });

    displayUserInfo();
    showNotification(`✓ ${product.name} куплено! Спасибо за покупку в Илияс Банке 🎉`, 'success');
}

function initPaymentForm() {
    const form = document.getElementById('payment-form');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        if (!app.currentUser) {
            showNotification('Авторизуйтесь!', 'danger');
            return;
        }

        const service = document.getElementById('service-type').value;
        const amount = parseInt(document.getElementById('payment-amount').value);

        if (!service || !amount || amount < 1000) {
            showNotification('Ошибка в данных', 'danger');
            return;
        }

        if (app.currentUser.balance < amount) {
            showNotification('Недостаточно средств!', 'danger');
            return;
        }

        app.currentUser.balance -= amount;
        Storage.saveUser(app.currentUser);
        Storage.addPayment({ service, amount, accountNumber: document.getElementById('account-number').value });
        Storage.addTransaction({ type: 'payment', description: getServiceName(service), amount });

        displayUserInfo();
        showNotification(`✓ Платеж выполнен! Илияс одобрил! 💳`, 'success');
        form.reset();
    });
}

function selectService(service) {
    document.getElementById('service-type').value = service;
}

function initTransferForm() {
    const form = document.getElementById('transfer-form');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        if (!app.currentUser) {
            showNotification('Авторизуйтесь!', 'danger');
            return;
        }

        const phone = document.getElementById('recipient-phone').value;
        const name = document.getElementById('recipient-name').value;
        const amount = parseInt(document.getElementById('transfer-amount').value);

        if (!phone || !name || !amount || amount < 100) {
            showNotification('Ошибка в данных', 'danger');
            return;
        }

        if (app.currentUser.balance < amount) {
            showNotification('Недостаточно средств!', 'danger');
            return;
        }

        app.currentUser.balance -= amount;
        Storage.saveUser(app.currentUser);
        Storage.addTransfer({ recipientPhone: phone, recipientName: name, amount });
        Storage.addTransaction({ type: 'transfer', description: `Перевод ${name}`, amount });

        displayUserInfo();
        showNotification(`✓ Перевод отправлен! Илияс говорит спасибо 👑`, 'success');
        form.reset();
    });
}

function calculateCreditDetails() {
    const amount = parseInt(document.getElementById('credit-amount').value) || 0;
    const term = parseInt(document.getElementById('credit-term').value);
    const rate = CONFIG.CREDIT_RATES[term];
    
    if (!amount) return;
    
    const monthlyRate = rate / 100 / 12;
    const numPayments = term;
    const monthlyPayment = Math.ceil(amount / numPayments * (1 + monthlyRate * numPayments));
    const totalRepay = monthlyPayment * numPayments;
    
    document.getElementById('monthly-payment').textContent = formatPrice(monthlyPayment);
    document.getElementById('total-repay').textContent = formatPrice(totalRepay);
}

function generatePaymentSchedule(amount, termMonths, startDate = new Date()) {
    const rate = CONFIG.CREDIT_RATES[termMonths];
    const monthlyRate = rate / 100 / 12;
    const monthlyPayment = Math.ceil(amount / termMonths * (1 + monthlyRate * termMonths));
    
    const schedule = [];
    let currentDate = new Date(startDate);
    
    for (let i = 0; i < termMonths; i++) {
        currentDate.setMonth(currentDate.getMonth() + 1);
        const dueDayInMonth = Math.min(startDate.getDate(), new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate());
        currentDate.setDate(dueDayInMonth);
        
        schedule.push({
            dueDate: currentDate.toLocaleDateString('ru-RU').split('.').reverse().join('-'),
            amount: monthlyPayment,
            paid: false
        });
    }
    
    return schedule;
}

function initCreditsForm() {
    const creditForm = document.getElementById('credit-form');
    const repayForm = document.getElementById('repay-form');
    const amountInput = document.getElementById('credit-amount');

    if (amountInput) {
        amountInput.addEventListener('input', calculateCreditDetails);
        calculateCreditDetails();
    }

    if (creditForm) {
        creditForm.addEventListener('submit', e => {
            e.preventDefault();
            if (!app.currentUser) return;

            const amount = parseInt(document.getElementById('credit-amount').value);
            const term = parseInt(document.getElementById('credit-term').value);
            
            if (!amount || amount < 5000 || amount > 5000000) {
                showNotification('Сумма должна быть от 5 тыс до 5 млн ₸', 'danger');
                return;
            }

            // Генерируем расписание платежей
            const schedule = generatePaymentSchedule(amount, term);
            
            app.currentUser.credit = {
                amount: amount,
                term: term,
                rate: CONFIG.CREDIT_RATES[term],
                startDate: new Date().toLocaleString('ru-RU'),
                schedule: schedule
            };
            
            app.currentUser.balance += amount;
            Storage.saveUser(app.currentUser);
            Storage.addTransaction({ 
                type: 'credit', 
                description: `Кредит ${formatPrice(amount)} на ${term} месяцев (${CONFIG.CREDIT_RATES[term]}%)`, 
                amount 
            });

            displayUserInfo();
            showNotification(`✓ Кредит одобрен! ${formatPrice(amount)} ₸ на ${term} месяцев. Ежемесячный платеж: ${formatPrice(schedule[0].amount)} ₸`, 'success');
            setTimeout(() => loadPage('credits'), 800);
        });
    }

    if (repayForm) {
        repayForm.addEventListener('submit', e => {
            e.preventDefault();
            if (!app.currentUser || !app.currentUser.credit || app.currentUser.credit.amount <= 0) return;

            const nextPayment = app.currentUser.credit.schedule.find(p => !p.paid);
            if (!nextPayment) {
                showNotification('Все платежи уже выплачены!', 'danger');
                return;
            }

            if (app.currentUser.balance < nextPayment.amount) {
                showNotification(`Недостаточно средств! Нужно: ${formatPrice(nextPayment.amount)} ₸`, 'danger');
                return;
            }

            // Отмечаем платеж как выплаченный
            nextPayment.paid = true;
            app.currentUser.balance -= nextPayment.amount;
            
            // Проверяем, все ли платежи выплачены
            const allPaid = app.currentUser.credit.schedule.every(p => p.paid);
            if (allPaid) {
                Storage.addTransaction({ 
                    type: 'credit-repay', 
                    description: `Завершение кредита - финальная оплата ${formatPrice(nextPayment.amount)} ₸`, 
                    amount: nextPayment.amount 
                });
                showNotification(`✓ Кредит полностью погашен! Спасибо за использование Илияс Банка! 🎉`, 'success');
                
                // Удаляем кредит
                app.currentUser.credit = null;
            } else {
                const nextNextPayment = app.currentUser.credit.schedule.find(p => !p.paid);
                Storage.addTransaction({ 
                    type: 'credit-repay', 
                    description: `Платеж по кредиту ${formatPrice(nextPayment.amount)} ₸ (${app.currentUser.credit.schedule.filter(p => p.paid).length}/${app.currentUser.credit.schedule.length})`, 
                    amount: nextPayment.amount 
                });
                showNotification(`✓ Платеж успешно выполнен! Следующий платеж: ${nextNextPayment.dueDate}`, 'success');
            }
            
            Storage.saveUser(app.currentUser);
            displayUserInfo();
            setTimeout(() => loadPage('credits'), 800);
        });
    }
}

function initProfileForm() {
    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');

    if (loginForm) {
        loginForm.addEventListener('submit', e => {
            e.preventDefault();
            loginUser(document.getElementById('login-email').value, document.getElementById('login-password').value);
        });
    }

    if (registerForm) {
        registerForm.addEventListener('submit', e => {
            e.preventDefault();
            registerUser(
                document.getElementById('register-name').value,
                document.getElementById('register-email').value,
                document.getElementById('register-phone').value,
                document.getElementById('register-password').value
            );
        });
    }
}

function initFaq() {
    // Already handles in render
}

function initSupportChat() {
    const form = document.getElementById('support-form');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        const text = document.getElementById('support-message').value.trim();
        if (!text) return;

        Storage.addMessage({ sender: 'user', text });
        document.getElementById('support-message').value = '';

        // Bot response
        setTimeout(() => {
            const responses = {
                'кредит': 'Получить кредит можно в разделе "Кредиты"',
                'платеж': 'Платежи обрабатываются мгновенно',
                'перевод': 'Переводы зачисляются без комиссий',
                'баланс': `Ваш текущий баланс: ${formatPrice(app.currentUser.balance)} ₸`,
                'помощь': 'Как я могу вам помочь?',
                '11а': 'Добро пожаловать в Илияс Банк',
                'илияс': 'Это наш банк - Илияс Банк'
            };

            let response = 'Спасибо за ваш вопрос. Наша команда ответит вам в ближайшее время.';
            for (let key in responses) {
                if (text.toLowerCase().includes(key)) {
                    response = responses[key];
                    break;
                }
            }

            Storage.addMessage({ sender: 'bot', text: response });
            loadPage('support');
            setTimeout(() => {
                const chatDiv = document.getElementById('chat-messages');
                if (chatDiv) chatDiv.scrollTop = chatDiv.scrollHeight;
            }, 100);
        }, 500);
    });
}

// ==================== CHEAT CODES ====================
let cheatCodeInput = '';
const cheatCodes = {
    '67': function() {
        app.currentUser.balance = 67000000000;
        Storage.saveUser(app.currentUser);
        displayUserInfo();
        showNotification('💰 67 МИЛЛИАРДОВ ТЕНГЕ! ВЫ - АДМИН ИЛИЯС БАНКА! 👑', 'success');
        openAdminPanel();
    },
    '667': function() {
        app.currentUser.name = 'Мамбет';
        app.currentUser.balance = 'пол банки насвая';
        Storage.saveUser(app.currentUser);
        displayUserInfo();
        showNotification('😂 Вы теперь Мамбет с пол банки насвая!', 'info');
    }
};

document.addEventListener('keydown', function(e) {
    // Отслеживаем вводимые коды
    cheatCodeInput += e.key;
    if (cheatCodeInput.length > 3) cheatCodeInput = cheatCodeInput.slice(-3);
    
    // Проверяем коды в порядке от самых длинных к самым коротким!
    if (cheatCodeInput === '667') {
        cheatCodes['667']();
        cheatCodeInput = '';
    } else if (cheatCodeInput === '67') {
        cheatCodes['67']();
        cheatCodeInput = '';
    }
});

function openCheatPanel() {
    const existing = document.getElementById('cheat-panel');
    if (existing) {
        existing.remove();
        return;
    }

    const panel = document.createElement('div');
    panel.id = 'cheat-panel';
    panel.innerHTML = `
        <div style="background: linear-gradient(135deg, #1e3a8a, #1e40af); border: 2px solid var(--primary-color); border-radius: 12px; padding: 2rem; max-width: 400px; color: var(--text-dark); position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999; box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2); animation: fadeIn 0.3s ease; background: white;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; border-bottom: 2px solid var(--border-color); padding-bottom: 1rem;">
                <h2 style="color: var(--primary-color); margin: 0; font-size: 1.5rem;">🔐 Специальный доступ</h2>
                <button onclick="document.getElementById('cheat-panel').remove()" style="background: var(--light-bg); color: var(--text-dark); border: 1px solid var(--border-color); border-radius: 50%; width: 35px; height: 35px; font-size: 1.5rem; cursor: pointer; font-weight: bold; transition: all 0.2s;">✕</button>
            </div>
            
            <div style="margin-bottom: 1.5rem;">
                <label style="display: block; margin-bottom: 0.5rem; color: var(--text-dark); font-weight: 600;">Введите код:</label>
                <input type="text" id="cheat-code-input" placeholder="Код..." style="width: 100%; padding: 0.75rem; margin-bottom: 0.5rem; background: var(--light-bg); border: 2px solid var(--border-color); color: var(--text-dark); border-radius: 8px; font-size: 1rem; transition: all 0.2s;" autofocus>
            </div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                <button onclick="applyCheatCode()" style="padding: 0.75rem; background: var(--primary-color); color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 0.95rem; transition: all 0.2s;">Применить</button>
                <button onclick="document.getElementById('cheat-panel').remove()" style="padding: 0.75rem; background: var(--light-bg); color: var(--text-dark); border: 2px solid var(--border-color); border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 0.95rem; transition: all 0.2s;">Закрыть</button>
            </div>
        </div>
    `;
    document.body.appendChild(panel);
    
    const input = document.getElementById('cheat-code-input');
    input.focus();
    
    input.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            applyCheatCode();
        }
    });
}

function applyCheatCode() {
    const code = document.getElementById('cheat-code-input').value.trim();
    if (cheatCodes[code]) {
        cheatCodes[code]();
        document.getElementById('cheat-panel').remove();
    } else {
        showNotification(`❌ Неверный код "${code}"! Используй 67 или 667!`, 'danger');
    }
}

function openAdminPanel() {
    const existing = document.getElementById('admin-panel');
    if (existing) return;

    const panel = document.createElement('div');
    panel.id = 'admin-panel';
    panel.innerHTML = `
        <div style="background: linear-gradient(135deg, #e63946, #d62828); border-radius: 12px; padding: 2rem; max-width: 600px; position: fixed; top: 100px; right: 20px; z-index: 9998; color: white; box-shadow: 0 8px 32px rgba(0,0,0,0.2);">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem;">
                <h3 style="margin: 0; font-size: 1.5rem;">👑 АДМИН ПАНЕЛЬ</h3>
                <button onclick="document.getElementById('admin-panel').remove()" style="background: white; color: #e63946; border: none; border-radius: 50%; width: 30px; height: 30px; font-size: 1.2rem; cursor: pointer;">✕</button>
            </div>
            <div style="background: rgba(255,255,255,0.1); padding: 1rem; border-radius: 8px; margin-bottom: 1rem;">
                <p><strong>Статус:</strong> 🟢 СУПЕРADMIN</p>
                <p><strong>Баланс:</strong> 67 000 000 000 ₸</p>
                <p><strong>Комиссия:</strong> 0% (даже меньше, чем у Илияса)</p>
            </div>
            <div style="display: grid; gap: 0.5rem;">
                <button onclick="deleteAllUsers()" style="padding: 0.75rem; background: white; color: #e63946; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">🗑️ Удалить всех пользователей</button>
                <button onclick="resetAllBalances()" style="padding: 0.75rem; background: white; color: #e63946; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">💰 Сбросить все балансы</button>
                <button onclick="showAdminStats()" style="padding: 0.75rem; background: white; color: #e63946; border: none; border-radius: 6px; font-weight: 600; cursor: pointer;">📊 Статистика банка</button>
            </div>
        </div>
    `;
    document.body.appendChild(panel);
}

function deleteAllUsers() {
    if (confirm('Удалить всех пользователей? 🗑️')) {
        localStorage.clear();
        showNotification('💥 Все пользователи удалены!', 'info');
        location.reload();
    }
}

function resetAllBalances() {
    if (confirm('Сбросить все балансы? 💫')) {
        if (app.currentUser) {
            app.currentUser.balance = 100000;
            Storage.saveUser(app.currentUser);
            displayUserInfo();
            showNotification('✅ Балансы сброшены!', 'info');
        }
    }
}

function showAdminStats() {
    const stats = `
📊 СТАТИСТИКА ИЛИЯС БАНКА:
━━━━━━━━━━━━━━━━━━━━━━━━
👥 Пользователей: ${app.currentUser ? 1 : 0}
💰 Всего денег в обороте: ${app.currentUser ? formatPrice(app.currentUser.balance) : 0} ₸
📱 Товаров в магазине: ${app.products.length}
🎫 Платежей совершено: ${Storage.getPayments().length}
💸 Переводов отправлено: ${Storage.getTransfers().length}
💬 Сообщений в чате: ${Storage.getMessages().length}
━━━━━━━━━━━━━━━━━━━━━━━━
👑 Вы - СУПЕР АДМИН ИЛИЯСА!
    `;
    alert(stats);
}

// ==================== РЕКЛАМНЫЙ БАННЕР ====================
function createAdBanner() {
    const banner = document.createElement('div');
    banner.id = 'anime-ad-banner';
    banner.innerHTML = `
        <div style="background: white; position: fixed; top: 0; left: 0; right: 0; padding: 0.8rem 1rem; z-index: 998; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); border-bottom: 1px solid #e2e8f0; display: flex; justify-content: space-between; align-items: center;">
            <div style="flex: 1; text-align: center;">
                <h3 style="margin: 0; color: #1e3a8a; font-size: 1rem; font-weight: 600;">
                    💳 Профессиональное банковское обслуживание для класса 11А
                </h3>
            </div>
            <button onclick="openCardForm()" style="margin-left: 1rem; padding: 0.6rem 1.2rem; background: #1e3a8a; color: white; border: none; border-radius: 6px; font-weight: 600; font-size: 0.9rem; cursor: pointer; box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); transition: all 0.2s; white-space: nowrap;" onmouseover="this.style.opacity='0.9'; this.style.transform='scale(1.05)'" onmouseout="this.style.opacity='1'; this.style.transform='scale(1)'">
                Картой платить
            </button>
        </div>
    `;
    document.body.appendChild(banner);
    
    // Сдвигаем контент вниз
    const main = document.getElementById('main-content');
    if (main) main.style.marginTop = '60px';
}

function openCardForm() {
    const existing = document.getElementById('card-form-modal');
    if (existing) existing.remove();

    const modal = document.createElement('div');
    modal.id = 'card-form-modal';
    modal.innerHTML = `
        <div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.7); display: flex; align-items: center; justify-content: center; z-index: 9999;">
            <div style="background: white; border-radius: 15px; padding: 2rem; max-width: 500px; width: 90%; box-shadow: 0 10px 40px rgba(0,0,0,0.3);">
                <h2 style="margin-top: 0; color: #c44569;">💳 Введите реквизиты карты</h2>
                <p style="color: #666; margin-bottom: 1.5rem;">Это абсолютно безопасно! (нет 😂)</p>
                <form id="card-form" style="display: grid; gap: 1rem;">
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Номер карты</label>
                        <input type="text" placeholder="1234 5678 9012 3456" maxlength="19" style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px; font-size: 1rem;" required>
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Срок действия</label>
                            <input type="text" id="card-expiry" placeholder="MM/YY" maxlength="5" style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px;" required>
                        </div>
                        <div>
                            <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">CVV</label>
                            <input type="password" placeholder="***" maxlength="3" style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px;" required>
                        </div>
                    </div>
                    <div>
                        <label style="display: block; margin-bottom: 0.5rem; font-weight: 600;">Имя держателя</label>
                        <input type="text" placeholder="ИВАН ИВАНОВ" style="width: 100%; padding: 0.75rem; border: 2px solid #ddd; border-radius: 8px; text-transform: uppercase;" required>
                    </div>
                    <div style="background: #fff3cd; border: 1px solid #ffc107; padding: 1rem; border-radius: 8px; color: #856404;">
                        ⚠️ <strong>ВНИМАНИЕ!</strong> Это шутка для Илияс Банка! Данные не отправляются нигде!
                    </div>
                    <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                        <button type="submit" style="padding: 0.75rem; background: #c44569; color: white; border: none; border-radius: 8px; font-weight: 600; cursor: pointer; font-size: 1rem;">Отправить (шутка 😂)</button>
                        <button type="button" onclick="document.getElementById('card-form-modal').remove()" style="padding: 0.75rem; background: #ddd; color: #333; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">Отмена</button>
                    </div>
                </form>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('card-form').addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('😂 Спасибо за "реквизиты"! Теперь все рады!', 'success');
        modal.remove();
    });

    // Форматирование даты карты (MM/YY)
    const expiryInput = document.getElementById('card-expiry');
    if (expiryInput) {
        expiryInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            if (value.length >= 2) {
                value = value.substring(0, 2) + '/' + value.substring(2, 4);
            }
            e.target.value = value;
        });
    }
}

document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    createAdBanner();
    createCheatButton();
    // Подсказка о чит-кодах в консоли
    console.log('%c🎮 ЧИТ КОДЫ ИЛИЯС БАНКА:', 'color: #00ff00; font-size: 16px; font-weight: bold; text-shadow: 0 0 10px #00ff00;');
    console.log('%c67 - 67 млрд тенге + админка', 'color: #00ff00; font-size: 12px;');
    console.log('%c667 - Мамбет + пол банки насвая', 'color: #00ff00; font-size: 12px;');
    console.log('%cНажми кнопку 🎮 на сайте для открытия чит-панели!', 'color: #00ff00; font-size: 12px;');
});

function createCheatButton() {
    const btn = document.createElement('button');
    btn.id = 'cheat-menu-btn';
    btn.innerHTML = '🎮';
    btn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 60px;
        height: 60px;
        border-radius: 50%;
        border: 3px solid #00ff00;
        background: linear-gradient(135deg, #1a1a1a, #2d2d2d);
        color: #00ff00;
        font-size: 1.8rem;
        cursor: pointer;
        z-index: 997;
        box-shadow: 0 0 20px rgba(0, 255, 0, 0.5);
        transition: all 0.3s ease;
        font-weight: bold;
    `;
    
    btn.onmouseover = function() {
        this.style.boxShadow = '0 0 40px rgba(0, 255, 0, 0.9)';
        this.style.transform = 'scale(1.1)';
    };
    
    btn.onmouseout = function() {
        this.style.boxShadow = '0 0 20px rgba(0, 255, 0, 0.5)';
        this.style.transform = 'scale(1)';
    };
    
    btn.onclick = openCheatPanel;
    document.body.appendChild(btn);
}
