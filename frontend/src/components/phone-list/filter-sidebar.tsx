import type { PhoneFilters } from '@/types/phone';
import { FilterPanel } from './filter-panel';

interface FilterSidebarProps {
  filters: Omit<PhoneFilters, 'page' | 'limit'>;
  onFiltersChange: (filters: Omit<PhoneFilters, 'page' | 'limit'>) => void;
  onReset: () => void;
  totalResults?: number;
}

export function FilterSidebar({ filters, onFiltersChange, onReset, totalResults }: FilterSidebarProps) {
  return (
    <div className="lg:col-span-1">
      <div className="sticky top-8">
        <FilterPanel
          filters={filters}
          onFiltersChange={onFiltersChange}
          onReset={onReset}
          totalResults={totalResults}
        />
      </div>
    </div>
  );
}
