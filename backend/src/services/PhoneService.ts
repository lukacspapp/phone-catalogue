import { Phone, PaginationQuery } from '../types/phone';
import { businessConfig } from '../config/index';
import { sanitizeFilters, SanitizedFilters } from '../utils/filterSanitizer';
import { parsePhoneFilters } from '../parser/phoneFiltersParser';
import { dataLoader } from './DataLoader';

export class PhoneService {
  public getFilteredPhones(query: PaginationQuery) {
    const allPhones = dataLoader.getPhones();

    const parsedFilters = parsePhoneFilters(query);
    const filters = sanitizeFilters(parsedFilters);

    let filteredPhones = this.applyFilters(allPhones, filters);
    filteredPhones = this.applySorting(filteredPhones, filters);

    return this.paginateResults(filteredPhones, filters.page, filters.limit);
  }

  public getPhoneById(id: number): Phone | null {
    return dataLoader.getPhoneById(id) || null;
  }

  private applyFilters(phones: Phone[], filters: SanitizedFilters): Phone[] {
    let filtered = [...phones];

    filtered = this.filterByBrand(filtered, filters.brand);
    filtered = this.filterByPriceRange(filtered, filters.priceMin, filters.priceMax);

    return filtered;
  }

  private filterByBrand(phones: Phone[], brandFilter?: string): Phone[] {
    if (!brandFilter) return phones;
    return phones.filter(phone => this.isBrandMatch(phone.brand, brandFilter));
  }

  private filterByPriceRange(phones: Phone[], minPrice?: number, maxPrice?: number): Phone[] {
    if (minPrice === undefined && maxPrice === undefined) return phones;

    return phones.filter(phone =>
      this.isWithinPriceRange(phone.price, minPrice, maxPrice)
    );
  }

  private isBrandMatch(phoneBrand: string, searchBrand: string): boolean {
    const { brandCaseSensitive, brandPartialMatch } = businessConfig.search;

    const phoneValue = brandCaseSensitive ? phoneBrand : phoneBrand.toLowerCase();
    const searchValue = brandCaseSensitive ? searchBrand : searchBrand.toLowerCase();

    return brandPartialMatch
      ? phoneValue.includes(searchValue)
      : phoneValue === searchValue;
  }

  private isWithinPriceRange(price: number, minPrice?: number, maxPrice?: number): boolean {
    if (minPrice !== undefined && price < minPrice) return false;
    if (maxPrice !== undefined && price > maxPrice) return false;
    return true;
  }

  private applySorting(phones: Phone[], filters: SanitizedFilters): Phone[] {
    return phones.sort((a, b) => {
      const comparison = this.comparePhoneValues(a, b, filters.sortBy);
      return filters.sortOrder === 'desc' ? -comparison : comparison;
    });
  }

  private comparePhoneValues(phoneA: Phone, phoneB: Phone, sortBy: string): number {
    const aVal = phoneA[sortBy as keyof Phone];
    const bVal = phoneB[sortBy as keyof Phone];

    if (typeof aVal === 'string' && typeof bVal === 'string') {
      return aVal.localeCompare(bVal);
    }

    if (typeof aVal === 'number' && typeof bVal === 'number') {
      return aVal - bVal;
    }

    return 0;
  }

  private paginateResults(phones: Phone[], page: number, limit: number) {
    const paginationInfo = this.calculatePagination(phones.length, page, limit);
    const paginatedPhones = this.sliceResultsForPage(phones, page, limit);

    return {
      data: paginatedPhones,
      pagination: paginationInfo,
    };
  }

  private calculatePagination(totalItems: number, currentPage: number, itemsPerPage: number) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    return {
      currentPage,
      totalPages,
      totalItems,
      itemsPerPage,
      hasNext: currentPage < totalPages,
      hasPrevious: currentPage > 1,
    };
  }

  private sliceResultsForPage(phones: Phone[], page: number, limit: number): Phone[] {
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    return phones.slice(startIndex, endIndex);
  }

  public getTotalCount(): number {
    return dataLoader.getPhonesCount();
  }

  public getFilteredCount(query: PaginationQuery): number {
    const allPhones = dataLoader.getPhones();
    const parsedFilters = parsePhoneFilters(query);
    const filters = sanitizeFilters(parsedFilters);
    const filteredPhones = this.applyFilters(allPhones, filters);
    return filteredPhones.length;
  }

  public getAvailableBrands(): string[] {
    return this.extractUniqueValues(dataLoader.getPhones(), 'brand');
  }

  public getPriceRange(): { min: number; max: number } {
    const prices = dataLoader.getPhones().map(phone => phone.price);
    return this.calculateRange(prices);
  }

  private extractUniqueValues<K extends keyof Phone>(phones: Phone[], field: K): string[] {
    const values = phones.map(phone => String(phone[field]));
    return [...new Set(values)].sort();
  }

  private calculateRange(numbers: number[]): { min: number; max: number } {
    if (numbers.length === 0) return { min: 0, max: 0 };

    return {
      min: Math.min(...numbers),
      max: Math.max(...numbers),
    };
  }
}

export const phoneService = new PhoneService();
