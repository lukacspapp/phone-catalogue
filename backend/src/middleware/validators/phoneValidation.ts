import { PaginationQuerySchema, PhoneParamsSchema } from "../../types/phone";
import { paginationQueryValidator, phoneParamsValidator } from "../../validators/phoneValidator";
import { createValidator } from "./validation";


export const validatePhoneQuery = createValidator(
  'query',
  paginationQueryValidator,
  PaginationQuerySchema,
  'Invalid query parameters'
);

export const validatePhoneParams = createValidator(
  'params',
  phoneParamsValidator,
  PhoneParamsSchema,
  'Invalid phone ID'
);