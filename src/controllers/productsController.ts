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
  }
};

export default productsController;

