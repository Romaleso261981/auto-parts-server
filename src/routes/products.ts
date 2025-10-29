import express from 'express';
import productsController from '../controllers/productsController.js';

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.post('/', productsController.createProduct);
router.get('/:id', productsController.getProductById);
router.put('/:id', productsController.updateProduct);

export default router;

