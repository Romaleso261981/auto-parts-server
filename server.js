import express from 'express';
import cors from 'cors';
import products from './data/products.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from the Vercel frontend
const corsOptions = {
  origin: function (origin, callback) {
    console.log('Request from origin:', origin);
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    const allowedOrigins = [
      'https://auto-parts-client.vercel.app',
      'http://localhost:3000',
      'http://localhost:5173',
      'http://localhost:5174',
      'http://127.0.0.1:5173'
    ];
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Handle preflight requests
app.options('*', cors(corsOptions));

// Log all requests for debugging
app.use((req, res, next) => {
  console.log(`${req.method} ${req.path} - Origin: ${req.get('origin') || 'no origin'}`);
  next();
});

app.use(express.json());

// Get all products with filtering
app.get('/api/products', (req, res) => {
  const { brand, search } = req.query;
  let filteredProducts = [...products];

  // Filter by brand
  if (brand) {
    filteredProducts = filteredProducts.filter(
      product => product.brand.toLowerCase() === brand.toLowerCase()
    );
  }

  // Filter by search (name)
  if (search) {
    const searchLower = search.toLowerCase();
    filteredProducts = filteredProducts.filter(
      product => product.name.toLowerCase().includes(searchLower)
    );
  }

  res.json(filteredProducts);
});

// Get product by ID
app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const product = products.find(p => p.id === id);

  if (!product) {
    return res.status(404).json({ message: 'Product not found' });
  }

  res.json(product);
});

// Get all brands
app.get('/api/brands', (req, res) => {
  const brands = [...new Set(products.map(p => p.brand))];
  res.json(brands.sort());
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}/api`);
});

