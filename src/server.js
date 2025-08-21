import express from 'express';
import crypto from 'node:crypto';
import pino from 'pino-http';
import cors from 'cors';
import router from './routers/index.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
import { requestIdMiddleware } from './middlewares/requestIdMiddleware.js';

export const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use([requestIdMiddleware, pino(), cors(), cookieParser()]);

  app.use([
    (req, res, next) => {
      req.id = crypto.randomUUID();
      next();
    },
    pino(),
    cors(),
    express.json(),
  ]);

  app.use(router);

  // 404 handler
  app.use(notFoundHandler);

  // Error handler
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
