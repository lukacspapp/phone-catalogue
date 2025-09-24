import { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { X, Filter } from 'lucide-react';
import type { PhoneFilters } from '@/types/phone';
import { formatPrice } from '@/lib/utils';

type FilterOnlyFields = Omit<PhoneFilters, 'page' | 'limit'>;

interface FilterPanelProps {
  filters: FilterOnlyFields;
  onFiltersChange: (filters: FilterOnlyFields) => void;
  onReset: () => void;
  totalResults?: number;
}

const BRAND_OPTIONS = [
  'Apple', 'Samsung', 'Google', 'Xiaomi', 'Huawei', 'OnePlus',
  'Honor', 'Asus', 'Sony', 'Motorola', 'Nokia', 'Oppo', 'Vivo', 'Realme',
];

export function FilterPanel({ filters, onFiltersChange, onReset, totalResults }: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<FilterOnlyFields>(filters);
  const previousFiltersRef = useRef<FilterOnlyFields>(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const countActiveFilters = (filterSet: FilterOnlyFields) => {
    return Object.entries(filterSet).filter(([, value]) =>
      value !== undefined && value !== null
    ).length;
  };

  useEffect(() => {
    const currentActiveCount = countActiveFilters(localFilters);
    const previousActiveCount = countActiveFilters(previousFiltersRef.current);

    const isRemovingFilters = currentActiveCount < previousActiveCount;
    const delay = isRemovingFilters ? 0 : 1000;

    const timer = setTimeout(() => {
      console.log('🎯 FilterPanel applying:', localFilters);
      onFiltersChange(localFilters);
      previousFiltersRef.current = localFilters;
    }, delay);

    return () => {
      clearTimeout(timer);
    };
  }, [localFilters, onFiltersChange]);

  const removeIndividualFilter = (filterKey: string) => {
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
  };

  const handleReset = () => {
    const resetFilters: FilterOnlyFields = {};
    setLocalFilters(resetFilters);
    onReset();
  };

  const updateFilter = (key: keyof FilterOnlyFields, value: string | number | undefined) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value === '' || value === null ? undefined : value,
    }));
  };

  const getActiveFilterBadges = () => {
    const badges = [];

    if (localFilters.brand) {
      badges.push({ key: 'brand', label: localFilters.brand });
    }
    if (localFilters.priceMin) {
      badges.push({ key: 'priceMin', label: `Min: ${formatPrice(localFilters.priceMin)}` });
    }
    if (localFilters.priceMax) {
      badges.push({ key: 'priceMax', label: `Max: ${formatPrice(localFilters.priceMax)}` });
    }
    if (localFilters.sortBy) {
      badges.push({ key: 'sortBy', label: `Sort: ${localFilters.sortBy}` });
    }
    if (localFilters.sortOrder && localFilters.sortBy) {
      badges.push({ key: 'sortOrder', label: localFilters.sortOrder.toUpperCase() });
    }

    return badges;
  };

  const activeFiltersCount = getActiveFilterBadges().length;

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            <CardTitle className="text-lg">Filters</CardTitle>
            {activeFiltersCount > 0 && (
              <Badge variant="secondary">{activeFiltersCount}</Badge>
            )}
          </div>
          {totalResults !== undefined && (
            <span className="text-sm text-muted-foreground">{totalResults} results</span>
          )}
        </div>

      </CardHeader>

      <CardContent className="space-y-6">
        {getActiveFilterBadges().length > 0 && (
          <div className="space-y-2">
            <Label className="text-sm font-medium">Active Filters:</Label>
            <div className="flex flex-wrap gap-2">
              {getActiveFilterBadges().map((badge, index) => (
                <div
                  key={`${badge.key}-${index}`}
                  className="inline-flex items-center gap-2 bg-white text-black hover:bg-gray-100 dark:bg-white dark:text-black dark:hover:bg-gray-200 border border-gray-200 rounded-full px-3 py-1 text-sm"
                >
                  <span>{badge.label}</span>
                  <button
                    type="button"
                    onClick={() => removeIndividualFilter(badge.key)}
                    className="hover:text-red-600 transition-colors focus:outline-none rounded-full p-0.5 hover:bg-red-50"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="space-y-2">
          <Label>Brand</Label>
          <Select
            value={localFilters.brand || 'all'}
            onValueChange={(value) => {
              updateFilter('brand', value === 'all' ? undefined : value);
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select brand..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Brands</SelectItem>
              {BRAND_OPTIONS.map((brand) => (
                <SelectItem key={brand} value={brand}>
                  {brand}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Price Range</Label>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label htmlFor="priceMin" className="text-sm text-muted-foreground">
                Min Price (HUF)
              </Label>
              <Input
                id="priceMin"
                type="number"
                placeholder="0"
                value={localFilters.priceMin || ''}
                onChange={(e) => updateFilter('priceMin', e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="priceMax" className="text-sm text-muted-foreground">
                Max Price (HUF)
              </Label>
              <Input
                id="priceMax"
                type="number"
                placeholder="2000"
                value={localFilters.priceMax || ''}
                onChange={(e) => updateFilter('priceMax', e.target.value ? parseInt(e.target.value) : undefined)}
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label>Sort By</Label>
          <div className="grid grid-cols-2 gap-3">
            <Select
              value={localFilters.sortBy || 'none'}
              onValueChange={(value) => {
                if (value === 'none') {
                  updateFilter('sortBy', undefined);
                  updateFilter('sortOrder', undefined);
                } else {
                  updateFilter('sortBy', value as 'name' | 'brand' | 'price');
                }
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Choose field..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Sorting</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="brand">Brand</SelectItem>
                <SelectItem value="price">Price</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={localFilters.sortOrder || 'default'}
              onValueChange={(value) => updateFilter('sortOrder', value === 'default' ? undefined : value as 'asc' | 'desc')}
              disabled={!localFilters.sortBy}
            >
              <SelectTrigger>
                <SelectValue placeholder="Order..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="default">Default</SelectItem>
                <SelectItem value="asc">Ascending ⬆</SelectItem>
                <SelectItem value="desc">Descending ⬇</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="pt-4">
          <Button
            onClick={handleReset}
            variant={activeFiltersCount > 0 ? "default" : "outline"}
            className={`w-full transition-all duration-300 ${activeFiltersCount > 0
              ? "!bg-black !text-white hover:!bg-gray-800 dark:!bg-white dark:!text-black dark:hover:!bg-gray-200 shadow-md font-medium"
              : ""
              }`}
          >
            <X className="h-4 w-4 mr-2" />
            {activeFiltersCount > 0 ? `Clear ${activeFiltersCount} Filter${activeFiltersCount === 1 ? '' : 's'}` : "Reset All Filters"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
