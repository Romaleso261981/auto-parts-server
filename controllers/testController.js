import testService from '../services/testService.js';

const testController = {
  async getTestInfo(req, res) {
    try {
      const info = testService.getTestInfo(req);
      res.json(info);
    } catch (error) {
      res.status(500).json({ message: 'Error getting test info', error: error.message });
    }
  },

  async getServerInfo(req, res) {
    try {
      const info = testService.getServerInfo();
      res.json(info);
    } catch (error) {
      res.status(500).json({ message: 'Error getting server info', error: error.message });
    }
  }
};

export default testController;

