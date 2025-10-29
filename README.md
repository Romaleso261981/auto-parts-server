# Auto Parts Server API

Backend API for auto parts catalog with TypeScript and modular architecture.

## Project Structure

```
auto-parts-server/
├── src/                      # TypeScript source files
│   ├── server.ts             # Entry point
│   ├── routes/               # Routing
│   │   ├── index.ts         # Main router
│   │   ├── test.ts          # /, /test
│   │   ├── products.ts      # /products
│   │   └── brands.ts        # /brands
│   ├── controllers/          # Controllers (HTTP request handling)
│   │   ├── productsController.ts
│   │   └── testController.ts
│   ├── services/             # Services (business logic)
│   │   ├── productsService.ts
│   │   └── testService.ts
│   ├── models/               # Models (database operations)
│   │   └── ProductModel.ts  # Product data access layer
│   ├── config/               # Configuration
│   │   └── firebase.ts      # Firebase configuration
│   └── types/                # TypeScript types
│       ├── product.ts
│       └── index.ts
├── dist/                     # Compiled JavaScript
├── tsconfig.json             # TypeScript configuration
├── package.json
└── .gitignore
```

## Architecture

### 🔹 TypeScript Types (types/)
- `Product` - product interface
- `ProductFilters` - search filters

### 🔹 Model Layer (models/)
Data access layer - direct database operations:
- `ProductModel.ts` - CRUD operations for products in Firestore

### 🔹 Service Layer (services/)
Business logic layer - orchestrates models and applies business rules:
- `productsService.ts` - product business logic, filtering, and aggregation
- `testService.ts` - server information

### 🔹 Controller Layer (controllers/)
Handles HTTP requests and responses:
- `productsController.ts` - product request handling
- `testController.ts` - test request handling

### 🔹 Route Layer (routes/)
Defines API routes:
- `routes/index.ts` - mounts all routes
- `routes/test.ts` - /, /test
- `routes/products.ts` - /products, /products/:id
- `routes/brands.ts` - /brands

## API Endpoints

### Base
- `GET /api/` - Server information
- `GET /api/test` - Test endpoint

### Products
- `GET /api/products` - Get all products (query: ?brand=&search=)
- `POST /api/products` - Create a new product
- `GET /api/products/:id` - Get product by ID

### Brands
- `GET /api/brands` - Get all brands

## Development

```bash
# Install dependencies
npm install

# Run in development mode (with auto-compilation)
npm run dev

# Compile TypeScript
npm run build

# Type checking (without compilation)
npm run type-check

# Run compiled code
npm start
```

## Production Build

```bash
# Compile TypeScript to JavaScript
npm run build

# Run compiled application
npm start
```

## Railway Deployment

1. Railway will automatically detect TypeScript project
2. Will run `npm run build`
3. Then `npm start`

## CORS

CORS configured to allow requests from all origins:
- Production: `https://auto-parts-client.vercel.app`
- Development: `http://localhost:3000`, `http://localhost:5173`

## Request Examples

```bash
# Get all products
curl https://auto-parts-server-test.up.railway.app/api/products

# Filter by brand
curl https://auto-parts-server-test.up.railway.app/api/products?brand=Mann

# Search by name
curl https://auto-parts-server-test.up.railway.app/api/products?search=колодки

# Get product by ID
curl https://auto-parts-server-test.up.railway.app/api/products/1

# Create a new product
curl -X POST https://auto-parts-server-test.up.railway.app/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Product",
    "brand": "TestBrand",
    "price": 1000,
    "originalPrice": 1200,
    "image": "/images/test.jpg",
    "description": "Test description",
    "articleNumber": "TEST123",
    "country": "Test Country",
    "code": "TEST-001",
    "inStock": true
  }'

# Get all brands
curl https://auto-parts-server-test.up.railway.app/api/brands
```

## Technologies

- **TypeScript** - typed JavaScript
- **Express** - web framework
- **Firebase Firestore** - NoSQL database
- **CORS** - Cross-Origin Resource Sharing
- **tsx** - fast TypeScript execution (dev mode)

## Firebase Setup

1. The Firebase configuration is already set up in `src/config/firebase.ts`
2. Data is stored in Firebase Firestore in the `products` collection
3. Make sure Firestore Security Rules are configured properly for your use case
