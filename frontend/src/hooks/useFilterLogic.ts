import { useState, useEffect, useRef, useCallback } from 'react';
import type { PhoneFilters } from '@/types/phone';

type FilterOnlyFields = Omit<PhoneFilters, 'page' | 'limit'>;

export function useFilterLogic(
  initialFilters: FilterOnlyFields,
  onFiltersChange: (filters: FilterOnlyFields, shouldResetPage?: boolean) => void
) {
  const [localFilters, setLocalFilters] = useState<FilterOnlyFields>(initialFilters);
  const previousFiltersRef = useRef<FilterOnlyFields>(initialFilters);
  const debounceTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setLocalFilters(initialFilters);
  }, [initialFilters]);

  const countActiveFilters = useCallback((filterSet: FilterOnlyFields) => {
    return Object.entries(filterSet).filter(([, value]) =>
      value !== undefined && value !== null && value !== ''
    ).length;
  }, []);

  const applyFilters = useCallback((newFilters: FilterOnlyFields, immediate: boolean = false) => {
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
      debounceTimerRef.current = null;
    }

    const applyNow = () => {
      const filtersChanged = JSON.stringify(previousFiltersRef.current) !== JSON.stringify(newFilters);
      onFiltersChange(newFilters, filtersChanged);
      previousFiltersRef.current = newFilters;
    };

    if (immediate) {
      applyNow();
    } else {
      debounceTimerRef.current = window.setTimeout(applyNow, 800);
    }
  }, [onFiltersChange]);

  useEffect(() => {
    const currentActiveCount = countActiveFilters(localFilters);
    const previousActiveCount = countActiveFilters(previousFiltersRef.current);

    const isRemovingFilters = currentActiveCount < previousActiveCount;

    applyFilters(localFilters, isRemovingFilters);

    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
        debounceTimerRef.current = null;
      }
    };
  }, [localFilters, applyFilters, countActiveFilters]);

  const updateFilter = useCallback((key: keyof FilterOnlyFields, value: string | number | undefined) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value === '' || value === null ? undefined : value,
    }));
  }, []);

  const removeFilter = useCallback((filterKey: string) => {
    setLocalFilters(prev => {
      const updated = { ...prev };

      if (filterKey === 'brand') updated.brand = undefined;
      if (filterKey === 'priceMin') updated.priceMin = undefined;
      if (filterKey === 'priceMax') updated.priceMax = undefined;
      if (filterKey === 'sortBy') {
        updated.sortBy = undefined;
        updated.sortOrder = undefined;
      }
      if (filterKey === 'sortOrder') updated.sortOrder = undefined;

      return updated;
    });
  }, []);

  const resetFilters = useCallback(() => {
    setLocalFilters({});
  }, []);

  return {
    localFilters,
    updateFilter,
    removeFilter,
    resetFilters,
    activeFiltersCount: countActiveFilters(localFilters),
  };
}
