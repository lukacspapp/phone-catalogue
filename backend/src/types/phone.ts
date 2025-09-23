import { Type, Static } from '@sinclair/typebox';
import { StrictObject } from './utils';


export const PhoneSpecsSchema = StrictObject({
  display: Type.String(),
  storage: Type.String(),
  camera: Type.String(),
  battery: Type.String(),
});

export const PhoneSchema = StrictObject({
  id: Type.Number(),
  name: Type.String(),
  brand: Type.String(),
  price: Type.Number(),
  description: Type.String(),
  specs: PhoneSpecsSchema,
  image: Type.String(),
  inStock: Type.Boolean(),
});

export const PhoneParamsSchema = Type.Object({
  id: Type.String({
    pattern: '^[0-9]+$',
    minLength: 1,
    maxLength: 10,
    description: 'Phone ID must be a numeric string'
  })
});

export const PaginationQuerySchema = StrictObject({
  page: Type.Optional(Type.String({ default: '1' })),
  limit: Type.Optional(Type.String({ default: '10' })),
  sortBy: Type.Optional(Type.Union([
    Type.Literal('name'),
    Type.Literal('brand'),
    Type.Literal('price')
  ], { default: 'name' })),
  sortOrder: Type.Optional(Type.Union([
    Type.Literal('asc'),
    Type.Literal('desc')
  ], { default: 'asc' })),
  brand: Type.Optional(Type.String()),
  priceMin: Type.Optional(Type.String()),
  priceMax: Type.Optional(Type.String()),
});

export const PaginationResponseSchema = StrictObject({
  currentPage: Type.Number(),
  totalPages: Type.Number(),
  totalItems: Type.Number(),
  itemsPerPage: Type.Number(),
  hasNext: Type.Boolean(),
  hasPrevious: Type.Boolean(),
});

export const PaginatedPhonesResponseSchema = StrictObject({
  data: Type.Array(PhoneSchema),
  pagination: PaginationResponseSchema,
});

export type Phone = Static<typeof PhoneSchema>;
export type PhoneSpecs = Static<typeof PhoneSpecsSchema>;
export type PhoneParams = Static<typeof PhoneParamsSchema>;
export type PaginationQuery = Static<typeof PaginationQuerySchema>;
export type PaginationResponse = Static<typeof PaginationResponseSchema>;
export type PaginatedPhonesResponse = Static<typeof PaginatedPhonesResponseSchema>;
