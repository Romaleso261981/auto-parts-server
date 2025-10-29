# Auto Parts Server API

Backend API для каталога автозапчастей с модульной архитектурой.

## Структура проекта

```
auto-parts-server/
├── server.js              # Entry point, настройка Express
├── routes/                # Маршрутизация
│   ├── index.js          # Главный роутер, монтирует все роуты
│   ├── test.js           # Тестовые роуты (/)
│   ├── products.js       # Роуты для продуктов (/products)
│   └── brands.js         # Роуты для брендов (/brands)
├── controllers/          # Контроллеры (обработка HTTP запросов)
│   ├── productsController.js
│   └── testController.js
├── services/              # Сервисы (бизнес-логика)
│   ├── productsService.js
│   └── testService.js
└── data/                  # Данные
    └── products.js        # Массив продуктов
```

## Архитектура

### 🔹 Слой Service (services/)
Содержит бизнес-логику и работу с данными:
- `productsService.js` - получение и фильтрация продуктов
- `testService.js` - информация о сервере

### 🔹 Слой Controller (controllers/)
Обрабатывает HTTP запросы и ответы:
- `productsController.js` - обработка запросов продуктов
- `testController.js` - обработка тестовых запросов

### 🔹 Слой Route (routes/)
Определяет маршруты API:
- `routes/index.js` - монтирует все роуты
- `routes/test.js` - /, /test
- `routes/products.js` - /products, /products/:id
- `routes/brands.js` - /brands

## API Endpoints

### Base
- `GET /api/` - Информация о сервере
- `GET /api/test` - Тестовый эндпоинт

### Products
- `GET /api/products` - Получить все продукты (query: ?brand=&search=)
- `GET /api/products/:id` - Получить продукт по ID

### Brands
- `GET /api/brands` - Получить все бренды

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

## Разработка

```bash
# Установка зависимостей
npm install

# Запуск сервера
npm start

# Запуск в режиме разработки
npm run dev
```

## Деплой на Railway

1. Push в GitHub
2. Railway автоматически деплоит изменения
3. Порт: 5000

## CORS

CORS настроен для разрешения запросов со всех origins:
- Production: `https://auto-parts-client.vercel.app`
- Development: `http://localhost:3000`, `http://localhost:5173`

