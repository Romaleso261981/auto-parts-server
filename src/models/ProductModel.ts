import { db } from '../config/firebase.js';
import { collection, getDocs, getDoc, doc, setDoc, updateDoc } from 'firebase/firestore';
import { Product, CreateProductDto, UpdateProductDto } from '../types/index.js';

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

  async create(productData: CreateProductDto): Promise<Product> {
    try {
      const productsRef = collection(db, this.collectionName);
      const newProductRef = doc(productsRef);
      const productId = newProductRef.id;

      const product: Product = {
        id: productId,
        name: productData.name,
        brand: productData.brand,
        price: productData.price,
        originalPrice: productData.originalPrice,
        image: productData.image,
        description: productData.description,
        articleNumber: productData.articleNumber,
        country: productData.country,
        code: productData.code,
        inStock: productData.inStock,
        rating: productData.rating || 0,
        reviewCount: productData.reviewCount || 0,
        discount: productData.discount,
      };

      if (productData.originalPrice && productData.price < productData.originalPrice) {
        const discountAmount = productData.originalPrice - productData.price;
        product.discount = Math.round((discountAmount / productData.originalPrice) * 100);
      }

      await setDoc(newProductRef, product);
      return product;
    } catch (error) {
      console.error('Error creating product:', error);
      throw error;
    }
  }

  async update(id: string, productData: UpdateProductDto): Promise<Product> {
    try {
      const productRef = doc(db, this.collectionName, id);
      const existingProduct = await this.findById(id);

      if (!existingProduct) {
        throw new Error('Product not found');
      }

      const updateData: Partial<Product> = { ...productData };

      if (productData.originalPrice !== undefined && productData.price !== undefined) {
        if (productData.price < productData.originalPrice) {
          const discountAmount = productData.originalPrice - productData.price;
          updateData.discount = Math.round((discountAmount / productData.originalPrice) * 100);
        } else if (productData.price >= productData.originalPrice) {
          updateData.discount = undefined;
        }
      } else if (productData.price !== undefined && existingProduct.originalPrice) {
        if (productData.price < existingProduct.originalPrice) {
          const discountAmount = existingProduct.originalPrice - productData.price;
          updateData.discount = Math.round((discountAmount / existingProduct.originalPrice) * 100);
        } else {
          updateData.discount = undefined;
        }
      } else if (productData.originalPrice !== undefined && existingProduct.price) {
        if (existingProduct.price < productData.originalPrice) {
          const discountAmount = productData.originalPrice - existingProduct.price;
          updateData.discount = Math.round((discountAmount / productData.originalPrice) * 100);
        } else {
          updateData.discount = undefined;
        }
      }

      await updateDoc(productRef, updateData);

      const updatedProduct = await this.findById(id);
      if (!updatedProduct) {
        throw new Error('Failed to fetch updated product');
      }

      return updatedProduct;
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  }
}

export default new ProductModel();
