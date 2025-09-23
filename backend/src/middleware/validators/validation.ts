import { NextFunction, Request, Response } from 'express';
import { TSchema } from '@sinclair/typebox';
import { TypeCheck } from '@sinclair/typebox/compiler';
import { createApiError, getValidatorErrors, formatValidationErrors } from '../../utils';

export const createValidator = <T extends TSchema>(
  target: 'query' | 'params' | 'body',
  validator: TypeCheck<T>,
  schema: T,
  errorMessage?: string
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    try {
      const data = req[target];
      const defaultMessage = `Invalid ${target}`;

      if (!data || typeof data !== 'object') {
        res.status(400).json(createApiError(errorMessage || defaultMessage));
        return;
      }

      if (!validator.Check(data)) {
        const errors = getValidatorErrors(data, schema);
        const formattedErrors = formatValidationErrors(errors);
        const message = `${errorMessage || defaultMessage}. Errors: ${formattedErrors}`;

        res.status(400).json(createApiError(message, errors));
        return;
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};
