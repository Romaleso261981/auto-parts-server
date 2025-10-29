import products from '../data/products.js';

class ProductsService {
  getAllProducts() {
    return products;
  }

  getProductById(id) {
    return products.find(p => p.id === id);
  }

  filterProducts(filters) {
    let filteredProducts = [...products];

    if (filters.brand) {
      filteredProducts = filteredProducts.filter(
        product => product.brand.toLowerCase() === filters.brand.toLowerCase()
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

  getAllBrands() {
    const brands = [...new Set(products.map(p => p.brand))];
    return brands.sort();
  }
}

export default new ProductsService();

