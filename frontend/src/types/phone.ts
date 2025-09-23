import { z } from 'zod';

export const PhoneSpecsSchema = z.object({
  display: z.string(),
  storage: z.string(),
  camera: z.string(),
  battery: z.string(),
});

export const PhoneSchema = z.object({
  id: z.number(),
  name: z.string(),
  brand: z.string(),
  price: z.number(),
  description: z.string(),
  specs: PhoneSpecsSchema,
  image: z.string(),
  inStock: z.boolean(),
});

export const PaginationSchema = z.object({
  currentPage: z.number(),
  totalPages: z.number(),
  totalItems: z.number(),
  itemsPerPage: z.number(),
  hasNext: z.boolean(),
  hasPrevious: z.boolean(),
});

export const PaginatedResponseSchema = z.object({
  data: z.array(PhoneSchema),
  pagination: PaginationSchema,
});

export const PhoneFiltersSchema = z.object({
  brand: z.string().optional(),
  priceMin: z.number().optional(),
  priceMax: z.number().optional(),
  sortBy: z.enum(['name', 'brand', 'price']).optional(),
  sortOrder: z.enum(['asc', 'desc']).optional(),
  page: z.number().optional(),
  limit: z.number().optional(),
});

export const ApiResponseSchema = <T extends z.ZodTypeAny>(dataSchema: T) =>
  z.object({
    success: z.boolean(),
    data: dataSchema,
    timestamp: z.string(),
  });

export type Phone = z.infer<typeof PhoneSchema>;
export type PhoneSpecs = z.infer<typeof PhoneSpecsSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;
export type PaginatedResponse = z.infer<typeof PaginatedResponseSchema>;
export type PhoneFilters = z.infer<typeof PhoneFiltersSchema>;
export type ApiResponse<T> = {
  success: boolean;
  data: T;
  timestamp: string;
};
