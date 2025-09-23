
import { businessConfig } from '../config/index';
import { PaginationQuery } from '../types/phone';
import { parseStringFilter, parseNumberFilter, parseIntWithDefault, validatePageLimit } from '../utils/queryParsers';

export const parsePhoneFilters = (query: PaginationQuery): ParsedFilters => {
  const { brand, priceMin, priceMax, sortBy, sortOrder, page, limit } = query;

  return {
    brand: parseStringFilter(brand),
    priceMin: parseNumberFilter(priceMin),
    priceMax: parseNumberFilter(priceMax),
    sortBy: sortBy || businessConfig.sorting.defaultSortBy,
    sortOrder: sortOrder || businessConfig.sorting.defaultSortOrder,
    page: parseIntWithDefault(page, businessConfig.pagination.defaultPage),
    limit: validatePageLimit(
      parseIntWithDefault(limit, businessConfig.pagination.defaultLimit),
      businessConfig.pagination.maxLimit
    ),
  };
};