import { useState, useEffect } from 'react';
import type { PhoneFilters } from '@/types/phone';

type FilterOnlyFields = Omit<PhoneFilters, 'page' | 'limit'>;

export function useFilterLogic(
  initialFilters: FilterOnlyFields,
  onFiltersChange: (filters: FilterOnlyFields) => void
) {
  const [localFilters, setLocalFilters] = useState<FilterOnlyFields>(initialFilters);

  useEffect(() => {
    setLocalFilters(initialFilters);
  }, [initialFilters]);

  const countActiveFilters = (filterSet: FilterOnlyFields) => {
    return Object.entries(filterSet).filter(([, value]) =>
      value !== undefined && value !== null && value !== ''
    ).length;
  };

  const updateFilter = (key: keyof FilterOnlyFields, value: string | number | undefined) => {
    const newFilters = {
      ...localFilters,
      [key]: value === '' || value === null ? undefined : value,
    };
    setLocalFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const removeFilter = (filterKey: string) => {
    const updated = { ...localFilters };

    if (filterKey === 'brand') updated.brand = undefined;
    if (filterKey === 'priceMin') updated.priceMin = undefined;
    if (filterKey === 'priceMax') updated.priceMax = undefined;
    if (filterKey === 'sortBy') {
      updated.sortBy = undefined;
      updated.sortOrder = undefined;
    }
    if (filterKey === 'sortOrder') updated.sortOrder = undefined;

    setLocalFilters(updated);
    onFiltersChange(updated);
  };

  const resetFilters = () => {
    setLocalFilters({});
    onFiltersChange({});
  };

  return {
    localFilters,
    updateFilter,
    removeFilter,
    resetFilters,
    activeFiltersCount: countActiveFilters(localFilters),
  };
}
