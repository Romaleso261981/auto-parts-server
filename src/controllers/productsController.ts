import { Request, Response } from 'express';
import productsService from '../services/productsService.js';

const productsController = {
  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const { brand, search } = req.query;
      const filteredProducts = await productsService.filterProducts({ brand, search } as { brand?: string; search?: string });
      res.json(filteredProducts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error: (error as Error).message });
    }
  },

  async getProductById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const product = await productsService.getProductById(id);

      if (!product) {
        res.status(404).json({ message: 'Product not found' });
        return;
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product', error: (error as Error).message });
    }
  },

  async getAllBrands(req: Request, res: Response): Promise<void> {
    try {
      const brands = await productsService.getAllBrands();
      res.json(brands);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching brands', error: (error as Error).message });
    }
  },

  async createProduct(req: Request, res: Response): Promise<void> {
    try {
      const productData = req.body;

      if (!productData.name || !productData.brand || !productData.price || !productData.image || !productData.description || !productData.articleNumber || !productData.country || !productData.code) {
        res.status(400).json({ message: 'Missing required fields' });
        return;
      }

      if (typeof productData.price !== 'number' || productData.price <= 0) {
        res.status(400).json({ message: 'Price must be a positive number' });
        return;
      }

      const newProduct = await productsService.createProduct(productData);
      res.status(201).json(newProduct);
    } catch (error) {
      res.status(500).json({ message: 'Error creating product', error: (error as Error).message });
    }
  },

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const productData = req.body;

      if (Object.keys(productData).length === 0) {
        res.status(400).json({ message: 'No fields to update' });
        return;
      }

      if (productData.price !== undefined && (typeof productData.price !== 'number' || productData.price <= 0)) {
        res.status(400).json({ message: 'Price must be a positive number' });
        return;
      }

      if (productData.rating !== undefined && (typeof productData.rating !== 'number' || productData.rating < 0 || productData.rating > 5)) {
        res.status(400).json({ message: 'Rating must be between 0 and 5' });
        return;
      }

      if (productData.reviewCount !== undefined && (typeof productData.reviewCount !== 'number' || productData.reviewCount < 0)) {
        res.status(400).json({ message: 'Review count must be a non-negative number' });
        return;
      }

      const updatedProduct = await productsService.updateProduct(id, productData);
      res.json(updatedProduct);
    } catch (error) {
      const errorMessage = (error as Error).message;
      if (errorMessage === 'Product not found') {
        res.status(404).json({ message: 'Product not found' });
        return;
      }
      res.status(500).json({ message: 'Error updating product', error: errorMessage });
    }
  }
};

export default productsController;

