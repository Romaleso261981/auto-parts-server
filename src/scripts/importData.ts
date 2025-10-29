import { db } from '../config/firebase.js';
import { collection, doc, setDoc } from 'firebase/firestore';
import products from '../data/products.js';

async function importProducts() {
  console.log('Starting data import to Firestore...');
  
  try {
    const productsRef = collection(db, 'products');
    
    for (const product of products) {
      await setDoc(doc(productsRef, product.id), product);
      console.log(`Imported product: ${product.name}`);
    }
    
    console.log(`Successfully imported ${products.length} products to Firestore!`);
    process.exit(0);
  } catch (error) {
    console.error('Error importing products:', error);
    process.exit(1);
  }
}

importProducts();
