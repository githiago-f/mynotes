import { ErrorRequestHandler } from 'express';
import { Unauthorized } from './errors/AuthErrors';

export const errorHandleController: ErrorRequestHandler = (error: Error, req, res, next) => {
  let statusCode = 500;

  if(error instanceof Unauthorized) {
    statusCode = 401;
  }

  return res.status(statusCode)
    .json({
      message: error.message
    });
};
