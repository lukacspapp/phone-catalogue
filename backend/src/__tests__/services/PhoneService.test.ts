import { parsePhoneFilters } from '../../parser/phoneFiltersParser';
import { sanitizeFilters } from '../../utils/filterSanitizer';
import { Phone, PaginationQuery } from '../../types/phone';
import { dataLoader } from '../../services/DataLoader';
import { PhoneService } from '../../services/PhoneService';

jest.mock('../../services/DataLoader');
jest.mock('../../parser/phoneFiltersParser');
jest.mock('../../utils/filterSanitizer');

const mockDataLoader = dataLoader as jest.Mocked<typeof dataLoader>;
const mockParsePhoneFilters = parsePhoneFilters as jest.MockedFunction<typeof parsePhoneFilters>;
const mockSanitizeFilters = sanitizeFilters as jest.MockedFunction<typeof sanitizeFilters>;

describe('PhoneService', () => {
  let phoneService: PhoneService;

  const mockPhones: Phone[] = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      brand: 'Apple',
      price: 1199,
      description: 'Latest iPhone',
      specs: { display: '6.1-inch', storage: '256GB', camera: '48MP', battery: '3274mAh' },
      image: 'iphone.jpg',
      inStock: true
    },
    {
      id: 2,
      name: 'Galaxy S24 Ultra',
      brand: 'Samsung',
      price: 1299,
      description: 'Samsung flagship',
      specs: { display: '6.8-inch', storage: '512GB', camera: '200MP', battery: '5000mAh' },
      image: 'galaxy.jpg',
      inStock: true
    },
    {
      id: 3,
      name: 'Pixel 8 Pro',
      brand: 'Google',
      price: 999,
      description: 'Google phone',
      specs: { display: '6.7-inch', storage: '128GB', camera: '50MP', battery: '5050mAh' },
      image: 'pixel.jpg',
      inStock: false
    }
  ];

  const defaultParsedFilters = {
    sortBy: 'name' as const,
    sortOrder: 'asc' as const,
    page: 0,
    limit: 0
  };

  const defaultSanitizedFilters = {
    sortBy: 'name' as const,
    sortOrder: 'asc' as const,
    page: 1,
    limit: 10
  };

  const setupMockFilters = (overrides = {}) => {
    mockParsePhoneFilters.mockReturnValue({ ...defaultParsedFilters, ...overrides });
    mockSanitizeFilters.mockReturnValue({ ...defaultSanitizedFilters, ...overrides });
  };

  beforeEach(() => {
    phoneService = new PhoneService();
    jest.clearAllMocks();
  });

  describe('getFilteredPhones', () => {
    beforeEach(() => {
      mockDataLoader.getPhones.mockReturnValue(mockPhones);
    });

    it('should return all phones with default pagination when no filters are applied', () => {
      const query: PaginationQuery = {};
      setupMockFilters();

      const result = phoneService.getFilteredPhones(query);

      expect(result.data).toHaveLength(3);
      expect(result.pagination).toEqual({
        currentPage: 1,
        totalPages: 1,
        totalItems: 3,
        itemsPerPage: 10,
        hasNext: false,
        hasPrevious: false
      });
      expect(mockDataLoader.getPhones).toHaveBeenCalledTimes(1);
      expect(mockParsePhoneFilters).toHaveBeenCalledWith(query);
      expect(mockSanitizeFilters).toHaveBeenCalled();
    });

    it('should filter phones by brand', () => {
      const query: PaginationQuery = { brand: 'Apple' };
      setupMockFilters({ brand: 'Apple' });

      const result = phoneService.getFilteredPhones(query);

      expect(result.data).toHaveLength(1);
      expect(result.data[0].brand).toBe('Apple');
      expect(result.pagination.totalItems).toBe(1);
    });

    it('should filter phones by price range', () => {
      const query: PaginationQuery = { priceMin: '1000', priceMax: '1200' };
      setupMockFilters({ priceMin: 1000, priceMax: 1200 });

      const result = phoneService.getFilteredPhones(query);

      expect(result.data).toHaveLength(1);
      expect(result.data[0].price).toBe(1199);
      expect(result.data[0].brand).toBe('Apple');
    });

    it('should sort phones by price descending', () => {
      const query: PaginationQuery = { sortBy: 'price', sortOrder: 'desc' };
      setupMockFilters({ sortBy: 'price', sortOrder: 'desc' });

      const result = phoneService.getFilteredPhones(query);

      expect(result.data).toHaveLength(3);
      expect(result.data[0].price).toBe(1299);
      expect(result.data[1].price).toBe(1199);
      expect(result.data[2].price).toBe(999);
    });

    it('should sort phones by name ascending', () => {
      const query: PaginationQuery = { sortBy: 'name', sortOrder: 'asc' };
      setupMockFilters({ sortBy: 'name', sortOrder: 'asc' });

      const result = phoneService.getFilteredPhones(query);

      expect(result.data).toHaveLength(3);
      expect(result.data[0].name).toBe('Galaxy S24 Ultra');
      expect(result.data[1].name).toBe('iPhone 15 Pro');
      expect(result.data[2].name).toBe('Pixel 8 Pro');
    });

    it('should paginate results correctly', () => {
      const query: PaginationQuery = { page: '2', limit: '2' };
      setupMockFilters({ page: 2, limit: 2 });

      const result = phoneService.getFilteredPhones(query);

      expect(result.data).toHaveLength(1);
      expect(result.data[0].name).toBe('Pixel 8 Pro');
      expect(result.pagination).toEqual({
        currentPage: 2,
        totalPages: 2,
        totalItems: 3,
        itemsPerPage: 2,
        hasNext: false,
        hasPrevious: true
      });
    });

    it('should return empty results when no phones match filters', () => {
      const query: PaginationQuery = { brand: 'NonExistent' };
      setupMockFilters({ brand: 'NonExistent' });

      const result = phoneService.getFilteredPhones(query);

      expect(result.data).toHaveLength(0);
      expect(result.pagination.totalItems).toBe(0);
      expect(result.pagination.totalPages).toBe(0);
    });

    it('should handle complex filtering and sorting', () => {
      const query: PaginationQuery = {
        brand: 'Samsung',
        priceMin: '1000',
        sortBy: 'price',
        sortOrder: 'desc'
      };
      setupMockFilters({
        brand: 'Samsung',
        priceMin: 1000,
        sortBy: 'price',
        sortOrder: 'desc'
      });

      const result = phoneService.getFilteredPhones(query);

      expect(result.data).toHaveLength(1);
      expect(result.data[0].brand).toBe('Samsung');
      expect(result.data[0].price).toBeGreaterThanOrEqual(1000);
    });
  });

  describe('getPhoneById', () => {
    it('should return phone when found', () => {
      const mockPhone = mockPhones[0];
      mockDataLoader.getPhoneById.mockReturnValue(mockPhone);

      const result = phoneService.getPhoneById(1);

      expect(result).toEqual(mockPhone);
      expect(mockDataLoader.getPhoneById).toHaveBeenCalledWith(1);
    });

    it('should return null when phone not found', () => {
      mockDataLoader.getPhoneById.mockReturnValue(undefined);

      const result = phoneService.getPhoneById(999);

      expect(result).toBeNull();
      expect(mockDataLoader.getPhoneById).toHaveBeenCalledWith(999);
    });

    it('should handle edge case IDs', () => {
      mockDataLoader.getPhoneById.mockReturnValue(undefined);

      expect(phoneService.getPhoneById(0)).toBeNull();
      expect(phoneService.getPhoneById(-1)).toBeNull();
    });
  });

  describe('getTotalCount', () => {
    it('should return total phones count', () => {
      mockDataLoader.getPhonesCount.mockReturnValue(15);

      const result = phoneService.getTotalCount();

      expect(result).toBe(15);
      expect(mockDataLoader.getPhonesCount).toHaveBeenCalledTimes(1);
    });

    it('should return 0 when no phones exist', () => {
      mockDataLoader.getPhonesCount.mockReturnValue(0);

      const result = phoneService.getTotalCount();

      expect(result).toBe(0);
    });
  });

  describe('getFilteredCount', () => {
    beforeEach(() => {
      mockDataLoader.getPhones.mockReturnValue(mockPhones);
    });

    it('should return count of filtered results', () => {
      const query: PaginationQuery = { brand: 'Apple' };
      setupMockFilters({ brand: 'Apple' });

      const result = phoneService.getFilteredCount(query);

      expect(result).toBe(1);
      expect(mockParsePhoneFilters).toHaveBeenCalledWith(query);
    });

    it('should return 0 when no phones match filter', () => {
      const query: PaginationQuery = { brand: 'NonExistent' };
      setupMockFilters({ brand: 'NonExistent' });

      const result = phoneService.getFilteredCount(query);

      expect(result).toBe(0);
    });

    it('should return total count when no filters applied', () => {
      const query: PaginationQuery = {};
      setupMockFilters();

      const result = phoneService.getFilteredCount(query);

      expect(result).toBe(3);
    });
  });

  describe('getAvailableBrands', () => {
    it('should return sorted unique brands', () => {
      mockDataLoader.getPhones.mockReturnValue(mockPhones);

      const result = phoneService.getAvailableBrands();

      expect(result).toEqual(['Apple', 'Google', 'Samsung']);
      expect(result).toHaveLength(3);
    });

    it('should handle duplicate brands', () => {
      const phonesWithDuplicates = [...mockPhones, { ...mockPhones[0], id: 4, name: 'iPhone 14' }];
      mockDataLoader.getPhones.mockReturnValue(phonesWithDuplicates);

      const result = phoneService.getAvailableBrands();

      expect(result).toEqual(['Apple', 'Google', 'Samsung']);
      expect(result).toHaveLength(3);
    });

    it('should return empty array when no phones exist', () => {
      mockDataLoader.getPhones.mockReturnValue([]);

      const result = phoneService.getAvailableBrands();

      expect(result).toEqual([]);
    });
  });

  describe('getPriceRange', () => {
    it('should return correct price range', () => {
      mockDataLoader.getPhones.mockReturnValue(mockPhones);

      const result = phoneService.getPriceRange();

      expect(result).toEqual({ min: 999, max: 1299 });
    });

    it('should return same min/max for single phone', () => {
      mockDataLoader.getPhones.mockReturnValue([mockPhones[0]]);

      const result = phoneService.getPriceRange();

      expect(result).toEqual({ min: 1199, max: 1199 });
    });

    it('should return 0,0 when no phones exist', () => {
      mockDataLoader.getPhones.mockReturnValue([]);

      const result = phoneService.getPriceRange();

      expect(result).toEqual({ min: 0, max: 0 });
    });
  });

  describe('Integration Tests', () => {
    it('should handle complete filtering workflow', () => {
      mockDataLoader.getPhones.mockReturnValue(mockPhones);

      const query: PaginationQuery = {
        brand: 'Samsung',
        priceMin: '1000',
        sortBy: 'price',
        sortOrder: 'desc',
        page: '1',
        limit: '5'
      };

      setupMockFilters({
        brand: 'Samsung',
        priceMin: 1000,
        sortBy: 'price',
        sortOrder: 'desc',
        page: 1,
        limit: 5
      });

      const result = phoneService.getFilteredPhones(query);

      expect(result.data).toHaveLength(1);
      expect(result.data[0].brand).toBe('Samsung');
      expect(result.data[0].price).toBeGreaterThanOrEqual(1000);
      expect(result.pagination.totalItems).toBe(1);

      expect(mockDataLoader.getPhones).toHaveBeenCalled();
      expect(mockParsePhoneFilters).toHaveBeenCalledWith(query);
      expect(mockSanitizeFilters).toHaveBeenCalled();
    });
  });
});
