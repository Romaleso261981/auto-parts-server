# Auto Parts Server API

Backend API для каталога автозапчастей с TypeScript и модульной архитектурой.

## Структура проекта

```
auto-parts-server/
├── src/                      # TypeScript исходники
│   ├── server.ts             # Entry point
│   ├── routes/               # Маршрутизация
│   │   ├── index.ts         # Главный роутер
│   │   ├── test.ts          # /, /test
│   │   ├── products.ts      # /products
│   │   └── brands.ts        # /brands
│   ├── controllers/          # Контроллеры (обработка HTTP)
│   │   ├── productsController.ts
│   │   └── testController.ts
│   ├── services/             # Сервисы (бизнес-логика)
│   │   ├── productsService.ts
│   │   └── testService.ts
│   ├── data/                 # Данные
│   │   └── products.ts      # Массив продуктов
│   └── types/                # TypeScript типы
│       ├── product.ts
│       └── index.ts
├── dist/                     # Скомпилированный JavaScript
├── tsconfig.json             # Настройки TypeScript
├── package.json
└── .gitignore
```

## Архитектура

### 🔹 TypeScript типы (types/)
- `Product` - интерфейс продукта
- `ProductFilters` - фильтры для поиска

### 🔹 Service слой (services/)
Содержит бизнес-логику и работу с данными:
- `productsService.ts` - получение и фильтрация продуктов
- `testService.ts` - информация о сервере

### 🔹 Controller слой (controllers/)
Обрабатывает HTTP запросы и ответы:
- `productsController.ts` - обработка запросов продуктов
- `testController.ts` - обработка тестовых запросов

### 🔹 Route слой (routes/)
Определяет маршруты API:
- `routes/index.ts` - монтирует все роуты
- `routes/test.ts` - /, /test
- `routes/products.ts` - /products, /products/:id
- `routes/brands.ts` - /brands

## API Endpoints

### Base
- `GET /api/` - Информация о сервере
- `GET /api/test` - Тестовый эндпоинт

### Products
- `GET /api/products` - Получить все продукты (query: ?brand=&search=)
- `GET /api/products/:id` - Получить продукт по ID

### Brands
- `GET /api/brands` - Получить все бренды

## Разработка

```bash
# Установка зависимостей
npm install

# Запуск в режиме разработки (с автоматической перекомпиляцией)
npm run dev

# Компиляция TypeScript
npm run build

# Проверка типов (без компиляции)
npm run type-check

# Запуск скомпилированного кода
npm start
```

## Production Build

```bash
# Скомпилировать TypeScript в JavaScript
npm run build

# Запустить скомпилированное приложение
npm start
```

## Деплой на Railway

1. Railway автоматически определит TypeScript проект
2. Будет выполнен `npm run build`
3. Затем `npm start`

## CORS

CORS настроен для разрешения запросов со всех origins:
- Production: `https://auto-parts-client.vercel.app`
- Development: `http://localhost:3000`, `http://localhost:5173`

## Примеры запросов

```bash
# Получить все продукты
curl https://auto-parts-server-test.up.railway.app/api/products

# Фильтр по бренду
curl https://auto-parts-server-test.up.railway.app/api/products?brand=Mann

# Поиск по названию
curl https://auto-parts-server-test.up.railway.app/api/products?search=колодки

# Получить продукт по ID
curl https://auto-parts-server-test.up.railway.app/api/products/1

# Получить все бренды
curl https://auto-parts-server-test.up.railway.app/api/brands
```

## Технологии

- **TypeScript** - типизированный JavaScript
- **Express** - веб-фреймворк
- **CORS** - Cross-Origin Resource Sharing
- **tsx** - быстрый запуск TypeScript (dev mode)
