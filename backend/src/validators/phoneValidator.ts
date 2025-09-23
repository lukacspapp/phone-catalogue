import { TypeCompiler } from '@sinclair/typebox/compiler';
import {
  PaginationQuerySchema,
  PhoneSchema,
  PhoneParamsSchema
} from '../types/phone';

export const paginationQueryValidator = TypeCompiler.Compile(PaginationQuerySchema);
export const phoneValidator = TypeCompiler.Compile(PhoneSchema);
export const phoneParamsValidator = TypeCompiler.Compile(PhoneParamsSchema);