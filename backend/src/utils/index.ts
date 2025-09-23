export const parseIntSafe = (value: string | undefined, fallback: number): number => {
  if (!value) return fallback;
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
};

export const parseFloatSafe = (value: string | undefined): number | undefined => {
  if (!value || value.trim() === '') return undefined;
  const parsed = parseFloat(value);
  return isNaN(parsed) ? undefined : parsed;
};

export const parseQueryFilters = (query: {
  brand?: string;
  priceMin?: string;
  priceMax?: string;
  sortBy?: string;
  sortOrder?: string;
  page?: string;
  limit?: string;
}) => ({
  brand: query.brand,
  priceMin: parseFloatSafe(query.priceMin),
  priceMax: parseFloatSafe(query.priceMax),
  sortBy: (query.sortBy as 'name' | 'brand' | 'price') || 'name',
  sortOrder: (query.sortOrder as 'asc' | 'desc') || 'asc',
  page: parseIntSafe(query.page, 1),
  limit: parseIntSafe(query.limit, 10),
});

export const createApiResponse = <T>(data: T, message?: string) => ({
  success: true,
  data,
  message,
  timestamp: new Date().toISOString(),
});

export const createApiError = (message: string, details?: unknown) => ({
  success: false,
  error: message,
  details,
  timestamp: new Date().toISOString(),
});

export * from './validation';