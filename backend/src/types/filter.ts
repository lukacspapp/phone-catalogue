interface ParsedFilters {
  brand?: string;
  priceMin?: number;
  priceMax?: number;
  sortBy: 'name' | 'brand' | 'price';
  sortOrder: 'asc' | 'desc';
  page: number;
  limit: number;
}