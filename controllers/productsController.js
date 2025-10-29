import productsService from '../services/productsService.js';

const productsController = {
  async getAllProducts(req, res) {
    try {
      const { brand, search } = req.query;
      const filteredProducts = productsService.filterProducts({ brand, search });
      res.json(filteredProducts);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching products', error: error.message });
    }
  },

  async getProductById(req, res) {
    try {
      const { id } = req.params;
      const product = productsService.getProductById(id);

      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }

      res.json(product);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching product', error: error.message });
    }
  },

  async getAllBrands(req, res) {
    try {
      const brands = productsService.getAllBrands();
      res.json(brands);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching brands', error: error.message });
    }
  }
};

export default productsController;

