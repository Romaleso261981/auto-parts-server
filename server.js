import express from 'express';
import cors from 'cors';
import products from './data/products.js';

const app = express();
const PORT = process.env.PORT || 5000;

// Configure CORS to allow requests from the Vercel frontend
app.use(cors({
  origin: [
    'https://auto-parts-client.vercel.app',
    'http://localhost:3000',
    'http://localhost:5173',
    'http://localhost:5174'
  ],
  credentials: true
}));
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

