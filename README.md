# ILYAS BANK 2.0

Production-style monorepo для fintech-стартапа: `Next.js` frontend, `NestJS` backend, `PostgreSQL` + `Prisma`, mobile-first UX, PWA, JWT auth, 2FA, admin-панель и демонстрационные банковские данные.

## Архитектура

```text
fintech-website/
├─ apps/
│  ├─ web/                    # Next.js 15 App Router, PWA, mobile-first UI
│  └─ api/                    # NestJS API, Prisma, auth, banking domain
├─ legacy/                    # исходный статический прототип
├─ docker-compose.yml         # PostgreSQL + Redis
├─ package.json               # workspace scripts
├─ pnpm-workspace.yaml
└─ .env.example
```

### Frontend

- `Next.js App Router` для SSR/streaming/loading states
- mobile-first dashboard с нижним `tab bar`
- тёмная и светлая тема
- аналитика, графики, списки операций
- PWA: manifest, service worker, installable shell

### Backend

- `NestJS` как enterprise-ready API
- `JWT access` + `refresh token rotation`
- `bcrypt` для паролей
- TOTP 2FA
- RBAC: `user` / `admin`
- модули: `auth`, `users`, `accounts`, `transactions`, `fx`, `notifications`, `admin`

### Data layer

- `PostgreSQL` для транзакционных данных
- `Prisma ORM` для typed-доступа к БД
- demo seed с 1200+ транзакциями
- журнал аудита, лимиты, простая антифрод-эвристика

## Безопасность

- `helmet`, CORS whitelist, secure cookies
- глобальная валидация DTO через `class-validator`
- Prisma защищает от raw SQL в обычных запросах
- пароли только в виде bcrypt hash
- refresh token хранится как hash
- CSRF strategy: refresh/logout через `httpOnly` cookie + `x-csrf-token`
- XSS strategy: React escaping + санитизация строк + CSP/helmet
- rate limiting, audit log, suspicious transaction flags

## Мобильная версия

- mobile-first layout
- sticky bottom navigation как в banking apps
- touch-friendly controls >= 44px
- быстрые карточки действий, компактные аналитические блоки
- PWA install banner / offline shell / push-ready service worker
- оптимизация под медленные сети: code splitting, server components, lazy charts

## React Native roadmap

Если нужен нативный мобильный клиент:

1. Использовать тот же `NestJS API`.
2. Вынести domain contract в общий пакет `packages/contracts`.
3. Собрать приложение на `React Native + Expo`.
4. Хранить access token в memory, refresh token в secure storage.
5. Подключить biometric auth, native push, deep links и device binding.

## Быстрый старт

```bash
pnpm install
docker compose up -d
cp .env.example .env
pnpm db:push
pnpm db:seed
pnpm dev
```

## Основные сценарии

- регистрация, вход, refresh, 2FA
- мультивалютные счета
- пополнение, снятие, peer-to-peer переводы
- история операций и аналитика
- admin-панель для пользователей и транзакций
- уведомления и аудит действий

## Что осталось сделать перед реальным production

- вынести секреты в vault
- подключить реальный email/SMS provider
- добавить Redis для очередей и rate limiting storage
- включить Sentry, OpenTelemetry и SIEM
- добавить полноценные e2e и contract tests
