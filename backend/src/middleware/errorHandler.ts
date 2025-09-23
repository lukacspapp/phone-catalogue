import { Request, Response, NextFunction } from 'express';

import { createApiError } from '../utils';
import { appConfig } from '../config';

export const errorHandler = (error: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(`Error processing request to ${req.path}:`, error);

  if (res.headersSent) {
    return next(error);
  }

  const response = createApiError(
    'Internal server error',
    appConfig.isDevelopment ? error.message : undefined
  );

  res.status(500).json(response);
};

export const notFoundHandler = (req: Request, res: Response) => {
  const response = createApiError(`Route ${req.originalUrl} not found`);
  res.status(404).json(response);
};
