import express from 'express';
import productsController from '../controllers/productsController.js';

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);

export default router;

