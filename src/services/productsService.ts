import productModel from '../models/ProductModel.js';
import { Product, ProductFilters, CreateProductDto } from '../types/index.js';

class ProductsService {
  async getAllProducts(): Promise<Product[]> {
    return await productModel.findAll();
  }

  async getProductById(id: string): Promise<Product | undefined> {
    const product = await productModel.findById(id);
    return product || undefined;
  }

  async filterProducts(filters: ProductFilters): Promise<Product[]> {
    let products: Product[];

    if (filters.brand) {
      products = await productModel.findByBrand(filters.brand);
    } else {
      products = await productModel.findAll();
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      products = products.filter(
        product => product.name.toLowerCase().includes(searchLower)
      );
    }

    return products;
  }

  async getAllBrands(): Promise<string[]> {
    try {
      const products = await productModel.findAll();
      const brands = [...new Set(products.map(p => p.brand))];
      return brands.sort();
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  }

  async createProduct(productData: CreateProductDto): Promise<Product> {
    return await productModel.create(productData);
  }
}

export default new ProductsService();
