import { useState, useCallback } from 'react';
import type { PhoneFilters } from '@/types/phone';

type FilterCriteria = Omit<PhoneFilters, 'page' | 'limit'>;

export function usePhoneFilters(initialFilters: FilterCriteria = {}) {
  const [filters, setFilters] = useState<FilterCriteria>(initialFilters);

  const updateFilters = useCallback((newFilters: FilterCriteria) => {
    setFilters(newFilters);
  }, []);

  const resetFilters = useCallback(() => {
    setFilters({});
  }, []);

  return {
    filters,
    updateFilters,
    resetFilters,
  };
}