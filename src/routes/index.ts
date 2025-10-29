import express from 'express';
import testRoutes from './test.js';
import productsRoutes from './products.js';
import brandsRoutes from './brands.js';

const router = express.Router();

router.use('/', testRoutes);
router.use('/products', productsRoutes);
router.use('/brands', brandsRoutes);

export default router;

