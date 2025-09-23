import { businessConfig } from '../config/index';

export interface SanitizedFilters {
  brand?: string;
  priceMin?: number;
  priceMax?: number;
  sortBy: 'name' | 'brand' | 'price';
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
}

export const sanitizeFilters = (filters: ParsedFilters): SanitizedFilters => {
  const sanitized: SanitizedFilters = {
    brand: filters.brand,
    priceMin: filters.priceMin,
    priceMax: filters.priceMax,
    sortBy: filters.sortBy || businessConfig.sorting.defaultSortBy,
    sortOrder: filters.sortOrder || businessConfig.sorting.defaultSortOrder,
    page: filters.page || businessConfig.pagination.defaultPage,
    limit: filters.limit || businessConfig.pagination.defaultLimit,
  };

  if (businessConfig.price.validateRange) {
    if (sanitized.priceMin && sanitized.priceMin < businessConfig.price.minAllowed) {
      console.warn(`Price minimum ${sanitized.priceMin} below allowed ${businessConfig.price.minAllowed}, using minimum`);
      sanitized.priceMin = businessConfig.price.minAllowed;
    }

    if (sanitized.priceMax && sanitized.priceMax > businessConfig.price.maxRange) {
      console.warn(`Price maximum ${sanitized.priceMax} exceeds limit ${businessConfig.price.maxRange}, using maximum`);
      sanitized.priceMax = businessConfig.price.maxRange;
    }

    if (sanitized.priceMin && sanitized.priceMax && sanitized.priceMin > sanitized.priceMax) {
      console.warn(`Price minimum ${sanitized.priceMin} > maximum ${sanitized.priceMax}, swapping values`);
      [sanitized.priceMin, sanitized.priceMax] = [sanitized.priceMax, sanitized.priceMin];
    }
  }

  if (!businessConfig.search.allowEmptyBrandFilter && sanitized.brand === '') {
    console.warn('Empty brand filter not allowed, removing filter');
    sanitized.brand = undefined;
  }

  if (sanitized.page < 1) {
    console.warn(`Invalid page ${sanitized.page}, using page 1`);
    sanitized.page = 1;
  }

  if (sanitized.limit > businessConfig.pagination.maxLimit) {
    console.warn(`Limit ${sanitized.limit} exceeds maximum ${businessConfig.pagination.maxLimit}, using maximum`);
    sanitized.limit = businessConfig.pagination.maxLimit;
  }

  if (sanitized.limit < 1) {
    console.warn(`Invalid limit ${sanitized.limit}, using default`);
    sanitized.limit = businessConfig.pagination.defaultLimit;
  }

  return sanitized;
};
