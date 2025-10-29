import { Request } from 'express';

class TestService {
  getTestInfo(req: Request) {
    return {
      message: 'Backend is working!',
      timestamp: new Date().toISOString(),
      origin: req.get('origin') || 'no origin',
      userAgent: req.get('user-agent'),
      cors: 'enabled with origin: *'
    };
  }

  getServerInfo() {
    return {
      message: 'Auto Parts API Server',
      version: '1.0.0',
      status: 'running',
      endpoints: {
        test: '/api/test',
        products: '/api/products',
        brands: '/api/brands'
      }
    };
  }
}

export default new TestService();

