import { Request, Response } from 'express';
import testService from '../services/testService.js';

const testController = {
  async getTestInfo(req: Request, res: Response): Promise<void> {
    try {
      const info = testService.getTestInfo(req);
      res.json(info);
    } catch (error) {
      res.status(500).json({ message: 'Error getting test info', error: (error as Error).message });
    }
  },

  async getServerInfo(req: Request, res: Response): Promise<void> {
    try {
      const info = testService.getServerInfo();
      res.json(info);
    } catch (error) {
      res.status(500).json({ message: 'Error getting server info', error: (error as Error).message });
    }
  }
};

export default testController;

