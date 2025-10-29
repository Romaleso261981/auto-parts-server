import products from '../data/products.js';
import { Product, ProductFilters } from '../types/index.js';

class ProductsService {
  getAllProducts(): Product[] {
    return products;
  }

  getProductById(id: string): Product | undefined {
    return products.find(p => p.id === id);
  }

  filterProducts(filters: ProductFilters): Product[] {
    let filteredProducts = [...products];

    if (filters.brand) {
      filteredProducts = filteredProducts.filter(
        product => product.brand.toLowerCase() === filters.brand!.toLowerCase()
      );
    }

    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredProducts = filteredProducts.filter(
        product => product.name.toLowerCase().includes(searchLower)
      );
    }

    return filteredProducts;
  }

  getAllBrands(): string[] {
    const brands = [...new Set(products.map(p => p.brand))];
    return brands.sort();
  }
}

export default new ProductsService();

