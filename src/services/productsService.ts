import { db } from '../config/firebase.js';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { Product, ProductFilters } from '../types/index.js';

class ProductsService {
  async getAllProducts(): Promise<Product[]> {
    try {
      const productsRef = collection(db, 'products');
      const snapshot = await getDocs(productsRef);
      const products: Product[] = [];
      
      snapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() } as Product);
      });
      
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw error;
    }
  }

  async getProductById(id: string): Promise<Product | undefined> {
    try {
      const productRef = doc(db, 'products', id);
      const productSnap = await getDoc(productRef);
      
      if (productSnap.exists()) {
        return { id: productSnap.id, ...productSnap.data() } as Product;
      }
      
      return undefined;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw error;
    }
  }

  async filterProducts(filters: ProductFilters): Promise<Product[]> {
    try {
      const allProducts = await this.getAllProducts();
      let filteredProducts = [...allProducts];

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
    } catch (error) {
      console.error('Error filtering products:', error);
      throw error;
    }
  }

  async getAllBrands(): Promise<string[]> {
    try {
      const products = await this.getAllProducts();
      const brands = [...new Set(products.map(p => p.brand))];
      return brands.sort();
    } catch (error) {
      console.error('Error fetching brands:', error);
      throw error;
    }
  }
}

export default new ProductsService();
