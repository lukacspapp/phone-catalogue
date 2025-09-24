import { X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { formatPrice } from '@/lib/utils';
import type { PhoneFilters } from '@/types/phone';

type FilterOnlyFields = Omit<PhoneFilters, 'page' | 'limit'>;

interface ActiveFilterBadgesProps {
  filters: FilterOnlyFields;
  onRemoveFilter: (filterKey: string) => void;
}

export function ActiveFilterBadges({ filters, onRemoveFilter }: ActiveFilterBadgesProps) {
  const getActiveFilterBadges = () => {
    const badges = [];

    if (filters.brand) {
      badges.push({ key: 'brand', label: filters.brand });
    }
    if (filters.priceMin) {
      badges.push({ key: 'priceMin', label: `Min: ${formatPrice(filters.priceMin)}` });
    }
    if (filters.priceMax) {
      badges.push({ key: 'priceMax', label: `Max: ${formatPrice(filters.priceMax)}` });
    }
    if (filters.sortBy) {
      badges.push({ key: 'sortBy', label: `Sort: ${filters.sortBy}` });
    }
    if (filters.sortOrder && filters.sortBy) {
      badges.push({ key: 'sortOrder', label: filters.sortOrder.toUpperCase() });
    }

    return badges;
  };

  const badges = getActiveFilterBadges();

  if (badges.length === 0) return null;

  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">Active Filters:</Label>
      <div className="flex flex-wrap gap-2">
        {badges.map((badge, index) => (
          <div
            key={`${badge.key}-${index}`}
            className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-100 dark:bg-white dark:text-black dark:hover:bg-gray-200 border border-gray-200 rounded-full px-3 py-1 text-sm"
          >
            <span>{badge.label}</span>
            <button
              type="button"
              onClick={() => onRemoveFilter(badge.key)}
              className="hover:text-red-600 transition-colors focus:outline-none rounded-full p-0.5 hover:bg-red-50"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
