import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useFilterLogic } from '@/hooks/useFilterLogic';
import type { PhoneFilters } from '@/types/phone';
import { FilterHeader } from './filter-header';
import { ActiveFilterBadges } from './active-filter-badges';
import { BrandFilter } from './brand-filter';
import { PriceRangeFilter } from './price-range-filter';
import { ResetButton } from './reset-button';
import { SortFilter } from './sort-filter';

type FilterOnlyFields = Omit<PhoneFilters, 'page' | 'limit'>;

interface FilterPanelProps {
  filters: FilterOnlyFields;
  onFiltersChange: (filters: FilterOnlyFields) => void;
  onReset: () => void;
  totalResults?: number;
}

export function FilterPanel({ filters, onFiltersChange, onReset, totalResults }: FilterPanelProps) {
  const {
    localFilters,
    updateFilter,
    removeFilter,
    resetFilters,
    activeFiltersCount,
  } = useFilterLogic(filters, onFiltersChange);

  const handleReset = () => {
    resetFilters();
    onReset();
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <FilterHeader
          activeFiltersCount={activeFiltersCount}
          totalResults={totalResults}
        />
      </CardHeader>

      <CardContent className="space-y-6">
        <ActiveFilterBadges
          filters={localFilters}
          onRemoveFilter={removeFilter}
        />

        <BrandFilter
          value={localFilters.brand}
          onValueChange={(value) => updateFilter('brand', value)}
        />

        <PriceRangeFilter
          priceMin={localFilters.priceMin}
          priceMax={localFilters.priceMax}
          onPriceMinChange={(value) => updateFilter('priceMin', value)}
          onPriceMaxChange={(value) => updateFilter('priceMax', value)}
        />

        <SortFilter
          sortBy={localFilters.sortBy}
          sortOrder={localFilters.sortOrder}
          onSortByChange={(value) => updateFilter('sortBy', value)}
          onSortOrderChange={(value) => updateFilter('sortOrder', value)}
        />

        <ResetButton
          activeFiltersCount={activeFiltersCount}
          onReset={handleReset}
        />
      </CardContent>
    </Card>
  );
}
