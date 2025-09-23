import { Request, Response, NextFunction } from 'express';
import { phoneService } from '../services/PhoneService';
import { PaginationQuery } from '../types/phone';
import { createApiResponse, createApiError, parseIntSafe } from '../utils';

export const getPhones = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const query = req.query as PaginationQuery;
    const result = phoneService.getFilteredPhones(query);

    const response = createApiResponse(result);
    res.json(response);
  } catch (error) {
    next(error);
  }
};

export const getPhoneById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const phoneId = parseIntSafe(req.params.id, 0);

    if (phoneId === 0) {
      const response = createApiError('Invalid phone ID');
      return res.status(400).json(response);
    }

    const phone = phoneService.getPhoneById(phoneId);

    if (!phone) {
      const response = createApiError('Phone not found');

      return res.status(404).json(response);
    }

    const response = createApiResponse(phone);
    res.json(response);
  } catch (error) {
    next(error);
  }
};
