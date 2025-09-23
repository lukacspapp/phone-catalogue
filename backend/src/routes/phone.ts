import { Router } from 'express';
import { getPhones, getPhoneById } from '../controllers/phone';
import { validatePhoneParams, validatePhoneQuery } from '../middleware';

const phoneRouter = Router();

phoneRouter.get('/', validatePhoneQuery, getPhones);

phoneRouter.get('/:id', validatePhoneParams, getPhoneById);

export default phoneRouter;
