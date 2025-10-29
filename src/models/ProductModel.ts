import { db } from '../config/firebase.js';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { Product } from '../types/index.js';

class ProductModel {
  private readonly collectionName = 'products';

  async findAll(): Promise<Product[]> {
    try {
      const productsRef = collection(db, this.collectionName);
      const snapshot = await getDocs(productsRef);
      const products: Product[] = [];
      
      snapshot.forEach((doc) => {
        products.push({ id: doc.id, ...doc.data() } as Product);
      });
      
      return products;
    } catch (error) {
      console.error('Error fetching all products:', error);
      throw error;
    }
  }

  async findById(id: string): Promise<Product | null> {
    try {
      const productRef = doc(db, this.collectionName, id);
      const productSnap = await getDoc(productRef);
      
      if (productSnap.exists()) {
        return { id: productSnap.id, ...productSnap.data() } as Product;
      }
      
      return null;
    } catch (error) {
      console.error('Error fetching product by id:', error);
      throw error;
    }
  }

  async findByBrand(brand: string): Promise<Product[]> {
    try {
      const allProducts = await this.findAll();
      return allProducts.filter(
        product => product.brand.toLowerCase() === brand.toLowerCase()
      );
    } catch (error) {
      console.error('Error fetching products by brand:', error);
      throw error;
    }
  }
}

export default new ProductModel();
