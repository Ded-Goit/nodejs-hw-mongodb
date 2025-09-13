import { SWAGGER_PATH } from '../constants/index.js';
import fs from 'node:fs';
import swaggerUI from 'swagger-ui-express';

export const swaggerDocs = () => {
  try {
    const swaggerDoc = JSON.parse(fs.readFileSync(SWAGGER_PATH).toString());
    return [...swaggerUI.serve, swaggerUI.setup(swaggerDoc)];
  } catch {
    return (req, res) =>
      res.status(500).json({
        status: 500,
        message: 'Internal Server Error',
        errors: 'Failed to load swagger specs',
      });
  }
};
