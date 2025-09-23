export const businessConfig = {
  pagination: {
    defaultPage: parseInt(process.env.PHONE_CATALOGUE_PAGINATION_DEFAULT_PAGE || '1', 10),
    defaultLimit: parseInt(process.env.PHONE_CATALOGUE_PAGINATION_DEFAULT_LIMIT || '10', 10),
    maxLimit: parseInt(process.env.PHONE_CATALOGUE_PAGINATION_MAX_LIMIT || '100', 10),
  },

  sorting: {
    defaultSortBy: (process.env.PHONE_CATALOGUE_SORT_DEFAULT_BY || 'name') as 'name' | 'brand' | 'price',
    defaultSortOrder: (process.env.PHONE_CATALOGUE_SORT_DEFAULT_ORDER || 'asc') as 'asc' | 'desc',
  },

  search: {
    brandCaseSensitive: process.env.PHONE_CATALOGUE_SEARCH_BRAND_CASE_SENSITIVE === 'true',
    brandPartialMatch: process.env.PHONE_CATALOGUE_SEARCH_BRAND_PARTIAL_MATCH !== 'false',
    allowEmptyBrandFilter: process.env.PHONE_CATALOGUE_SEARCH_ALLOW_EMPTY_BRAND !== 'false',
  },

  price: {
    validateRange: process.env.PHONE_CATALOGUE_PRICE_VALIDATE_RANGE === 'true',
    maxRange: parseFloat(process.env.PHONE_CATALOGUE_PRICE_MAX_RANGE || '50000'),
    minAllowed: parseFloat(process.env.PHONE_CATALOGUE_PRICE_MIN_ALLOWED || '0'),
  },

} as const;
