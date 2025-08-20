import { isHttpError } from 'http-errors';
import { MongooseError } from 'mongoose';

export const errorHandler = (err, req, res, next) => {
  if (isHttpError(err)) {
    return res.status(err.status).json({
      status: err.status,
      message: err.message,
      data: err.errors || [],
    });
  }

  if (err instanceof MongooseError) {
    return res.status(500).json({
      status: 500,
      message: 'Database error',
      data: [err.message],
    });
  }

  res.status(500).json({
    status: 500,
    message: 'Internal Server Error',
    data: [err.message],
  });
};
